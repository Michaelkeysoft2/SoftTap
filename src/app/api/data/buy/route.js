import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import Transaction from '@/models/Transaction';
import { processDataPurchase } from '@/lib/vtu-service';

export async function POST(req) {
  try {
    const { userId, network, phone, planName, planId, amount } = await req.json();

    if (!userId || !network || !phone || !amount) {
      return NextResponse.json({ success: false, message: 'Missing required parameters' }, { status: 400 });
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
        message: `Insufficient wallet balance. You need ₦${price.toLocaleString()} but your balance is ₦${user.walletBalance.toLocaleString()}`,
      }, { status: 400 });
    }

    const previousBalance = user.walletBalance;
    const newBalance = previousBalance - price;

    user.walletBalance = newBalance;
    await user.save();

    const requestId = `ST_DATA_${Date.now()}`;
    const vtuResult = await processDataPurchase({
      network,
      phone,
      planId: planId || planName,
      amount: price,
      requestId,
    });

    const status = vtuResult.success ? 'success' : 'failed';

    // Refund if failed
    if (!vtuResult.success) {
      user.walletBalance = previousBalance;
      await user.save();
    }

    const tx = await Transaction.create({
      userId: user._id,
      type: 'data',
      reference: requestId,
      serviceName: `${network} ${planName || 'Data Bundle'}`,
      networkOrProvider: network,
      recipient: phone,
      amount: price,
      previousBalance,
      newBalance: vtuResult.success ? newBalance : previousBalance,
      status: status,
      details: vtuResult,
    });

    if (!vtuResult.success) {
      return NextResponse.json({
        success: false,
        message: vtuResult.error || 'VTU transaction failed. Your wallet was not debited.',
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      newBalance: user.walletBalance,
      transaction: tx,
      message: `Successfully purchased ${planName || 'Data'} for ${phone}!`,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message || 'Server error' }, { status: 500 });
  }
}
