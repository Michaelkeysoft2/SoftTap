import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import Transaction from '@/models/Transaction';
import { processElectricityBill } from '@/lib/vtu-service';

export async function POST(req) {
  try {
    const { userId, provider, meterNo, meterType, amount } = await req.json();

    if (!userId || !provider || !meterNo || !amount) {
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

    const requestId = `ST_ELEC_${Date.now()}`;
    const vtuResult = await processElectricityBill({ provider, meterNo, amount: price, meterType, requestId });

    const tx = await Transaction.create({
      userId: user._id,
      type: 'electricity',
      reference: requestId,
      serviceName: `${provider} (${meterType || 'Prepaid'})`,
      networkOrProvider: provider,
      recipient: meterNo,
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
      token: vtuResult.token,
      message: `Electricity payment successful! Token: ${vtuResult.token}`,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message || 'Server error' }, { status: 500 });
  }
}
