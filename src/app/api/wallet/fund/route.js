import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import Transaction from '@/models/Transaction';
import { initializePaystackPayment, verifyPaystackPayment } from '@/lib/paystack-service';

export async function POST(req) {
  try {
    const { userId, amount, reference, action } = await req.json();

    if (!userId || !amount) {
      return NextResponse.json({ success: false, message: 'Invalid payload' }, { status: 400 });
    }

    await connectToDatabase();
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    // Action: Initialize Paystack payment
    if (action === 'initialize') {
      const ref = reference || `ST_FUND_${Date.now()}`;
      const result = await initializePaystackPayment({
        email: user.email,
        amount: parseFloat(amount),
        reference: ref,
        callbackUrl: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/dashboard/fund-wallet?reference=${ref}`,
      });

      return NextResponse.json({ success: true, paystack: result });
    }

    // Action: Credit wallet directly (for simulated testing or Paystack callback verification)
    const ref = reference || `ST_FUND_${Date.now()}`;
    const previousBalance = user.walletBalance;
    const fundAmount = parseFloat(amount);
    const newBalance = previousBalance + fundAmount;

    user.walletBalance = newBalance;
    await user.save();

    const tx = await Transaction.create({
      userId: user._id,
      type: 'wallet_funding',
      reference: ref,
      serviceName: 'Wallet Credit',
      networkOrProvider: 'Paystack/Bank Transfer',
      recipient: user.phone,
      amount: fundAmount,
      previousBalance,
      newBalance,
      status: 'success',
      details: { fundedAt: new Date() },
    });

    return NextResponse.json({
      success: true,
      newBalance: user.walletBalance,
      transaction: tx,
      message: `₦${fundAmount.toLocaleString()} successfully credited to your wallet.`,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message || 'Funding failed' }, { status: 500 });
  }
}
