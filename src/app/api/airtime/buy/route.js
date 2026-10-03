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

    const isSuccess = vtuResult.success === true;
    const status = isSuccess ? 'success' : 'failed';

    if (!isSuccess) {
      user.walletBalance = previousBalance;
      await user.save();
    }

    const vtpassAmount = isSuccess ? Number(vtuResult.vtpassAmount ?? price) : 0;
    const vtpassCommission = isSuccess ? Number(vtuResult.vtpassCommission ?? 0) : 0;
    const vtpassTotalAmount = isSuccess ? Number(vtuResult.vtpassTotalAmount ?? (vtpassAmount - vtpassCommission)) : 0;
    const vtpassTransactionId = isSuccess ? (vtuResult.vtpassTransactionId || requestId) : requestId;
    const commissionDetails = isSuccess ? (vtuResult.commissionDetails || null) : null;
    const costPrice = isSuccess ? vtpassTotalAmount : 0;
    const profit = isSuccess ? vtpassCommission : 0;

    const tx = await Transaction.create({
      userId: user._id,
      type: 'airtime',
      reference: requestId,
      serviceName: `${network} Airtime Top-Up`,
      networkOrProvider: network,
      recipient: phone,
      amount: price,
      costPrice,
      profit,
      paymentMethod: 'wallet',
      customerEmail: user.email,
      customerPhone: user.phone,
      previousBalance,
      newBalance: isSuccess ? newBalance : previousBalance,
      status,
      details: vtuResult,
      vtpassAmount,
      vtpassCommission,
      vtpassTotalAmount,
      vtpassTransactionId,
      commissionDetails,
    });

    if (!isSuccess) {
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
