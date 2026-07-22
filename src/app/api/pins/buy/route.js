import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import Transaction from '@/models/Transaction';
import { processExamPin } from '@/lib/vtu-service';

export async function POST(req) {
  try {
    const { userId, examType, quantity, amount } = await req.json();

    if (!userId || !examType || !quantity || !amount) {
      return NextResponse.json({ success: false, message: 'Missing parameters' }, { status: 400 });
    }

    await connectToDatabase();
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const price = parseFloat(amount);

    if (user.walletBalance < price) {
      return NextResponse.json({
        success: false,
        message: `Insufficient wallet balance. Required: ₦${price}, Balance: ₦${user.walletBalance}`,
      }, { status: 400 });
    }

    const previousBalance = user.walletBalance;
    const newBalance = previousBalance - price;

    user.walletBalance = newBalance;
    await user.save();

    const requestId = `ST_PIN_${Date.now()}`;
    const vtuResult = await processExamPin({ examType, quantity: parseInt(quantity), amount: price, requestId });

    const tx = await Transaction.create({
      userId: user._id,
      type: 'exam_pin',
      reference: requestId,
      serviceName: `${examType} Result Pin (${quantity}x)`,
      networkOrProvider: examType,
      recipient: user.phone,
      amount: price,
      previousBalance,
      newBalance,
      status: 'success',
      details: vtuResult,
    });

    return NextResponse.json({
      success: true,
      newBalance: user.walletBalance,
      transaction: tx,
      pins: vtuResult.pins,
      message: `${quantity} x ${examType} PIN(s) generated successfully!`,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message || 'Server error' }, { status: 500 });
  }
}
