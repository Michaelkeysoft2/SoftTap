import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import Transaction from '@/models/Transaction';
import { initializePaystackPayment, verifyPaystackPayment } from '@/lib/paystack-service';

export async function POST(req) {
  try {
    const { userId, amount, reference, action } = await req.json();

    if (!action) {
      return NextResponse.json({ success: false, message: 'Action is required (initialize or verify)' }, { status: 400 });
    }

    await connectToDatabase();

    // ─── ACTION: Initialize Paystack Payment ───
    if (action === 'initialize') {
      if (!userId || !amount) {
        return NextResponse.json({ success: false, message: 'userId and amount are required' }, { status: 400 });
      }
      const user = await User.findById(userId);
      if (!user) {
        return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
      }

      const fundAmount = parseFloat(amount);
      if (isNaN(fundAmount) || fundAmount < 100) {
        return NextResponse.json({ success: false, message: 'Minimum funding amount is ₦100' }, { status: 400 });
      }

      const ref = `ST_FUND_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
      const callbackUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/dashboard/fund-wallet?reference=${ref}&userId=${userId}&amount=${fundAmount}`;

      const result = await initializePaystackPayment({
        email: user.email,
        amount: fundAmount,
        reference: ref,
        callbackUrl,
        metadata: { userId: user._id.toString(), email: user.email, phone: user.phone },
      });

      return NextResponse.json({ success: true, paystack: result, reference: ref });
    }

    // ─── ACTION: Verify & Credit Wallet ───
    if (action === 'verify') {
      if (!userId || !reference) {
        return NextResponse.json({ success: false, message: 'userId and reference are required' }, { status: 400 });
      }

      // Prevent duplicate crediting — check if this reference was already processed
      const existingTx = await Transaction.find({ reference }).then
        ? await Transaction.find({ reference })
        : null;

      // Handle both Mongoose array and local array
      const txList = Array.isArray(existingTx) ? existingTx : [];
      const alreadyProcessed = txList.some
        ? txList.some((t) => t.status === 'success')
        : false;

      if (alreadyProcessed) {
        const user = await User.findById(userId);
        return NextResponse.json({
          success: true,
          alreadyCredited: true,
          newBalance: user ? user.walletBalance : 0,
          message: 'Payment was already verified and credited.',
        });
      }

      // Verify with Paystack
      const verification = await verifyPaystackPayment(reference);

      if (!verification?.data || verification.data.status !== 'success') {
        return NextResponse.json({
          success: false,
          message: 'Payment verification failed. If you paid, contact support.',
        }, { status: 400 });
      }

      const user = await User.findById(userId);
      if (!user) {
        return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
      }

      // If Paystack returns amount in kobo, use it; otherwise fall back to amount passed in request
      const paystackKobo = verification.data.amount;
      const verifiedAmount = paystackKobo ? paystackKobo / 100 : null;
      const fundAmount = verifiedAmount || (amount ? parseFloat(amount) : 0);

      if (!fundAmount || isNaN(fundAmount) || fundAmount < 100) {
        return NextResponse.json({ success: false, message: 'Invalid funding amount' }, { status: 400 });
      }

      const previousBalance = user.walletBalance;
      const newBalance = previousBalance + fundAmount;

      user.walletBalance = newBalance;
      await user.save();

      await Transaction.create({
        userId: user._id,
        type: 'wallet_funding',
        reference,
        serviceName: 'Wallet Credit via Paystack',
        networkOrProvider: 'Paystack',
        recipient: user.phone,
        amount: fundAmount,
        previousBalance,
        newBalance,
        paymentMethod: 'paystack_direct',
        customerEmail: user.email,
        customerPhone: user.phone,
        status: 'success',
        details: { verifiedAt: new Date(), paystackData: verification.data },
      });

      return NextResponse.json({
        success: true,
        newBalance,
        message: `₦${fundAmount.toLocaleString('en-NG')} successfully credited to your wallet.`,
      });
    }

    return NextResponse.json({ success: false, message: 'Invalid action' }, { status: 400 });

  } catch (error) {
    console.error('[Wallet Fund Error]', error);
    return NextResponse.json({ success: false, message: error.message || 'Funding failed' }, { status: 500 });
  }
}
