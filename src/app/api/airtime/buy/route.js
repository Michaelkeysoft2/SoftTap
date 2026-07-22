import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import Transaction from '@/models/Transaction';
import { processAirtimePurchase } from '@/lib/vtu-service';

export async function POST(req) {
  try {
    const { userId, network, phone, amount } = await req.json();

    if (!userId || !network || !phone || !amount) {
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
        message: `Insufficient wallet balance. Balance: ₦${user.walletBalance.toLocaleString()}`,
      }, { status: 400 });
    }

    const previousBalance = user.walletBalance;
    const newBalance = previousBalance - price;

    user.walletBalance = newBalance;
    await user.save();

    const requestId = `ST_AIR_${Date.now()}`;
    const vtuResult = await processAirtimePurchase({ network, phone, amount: price, requestId });

    if (!vtuResult.success) {
      user.walletBalance = previousBalance;
      await user.save();
    }

    const tx = await Transaction.create({
      userId: user._id,
      type: 'airtime',
      reference: requestId,
      serviceName: `${network} Airtime Top-Up`,
      networkOrProvider: network,
      recipient: phone,
      amount: price,
      previousBalance,
      newBalance: vtuResult.success ? newBalance : previousBalance,
      status: vtuResult.success ? 'success' : 'failed',
      details: vtuResult,
    });

    if (!vtuResult.success) {
      return NextResponse.json({ success: false, message: vtuResult.error || 'Failed to process airtime' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      newBalance: user.walletBalance,
      transaction: tx,
      message: `₦${price} Airtime successfully sent to ${phone} (${network})!`,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message || 'Server error' }, { status: 500 });
  }
}
