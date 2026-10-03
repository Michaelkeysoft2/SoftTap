import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import Transaction from '@/models/Transaction';
import { processTVSubscription, getValidatedTVPlan } from '@/lib/vtu-service';

export async function POST(req) {
  try {
    const { userId, provider, smartcardNo, planName, planId, amount } = await req.json();

    if (!userId || !provider || !smartcardNo || (!planId && !planName)) {
      return NextResponse.json({ success: false, message: 'Missing required parameters' }, { status: 400 });
    }

    // 1. Authoritative server-side price validation against live VTpass variations
    const targetPlanId = planId || planName;
    const planValidation = await getValidatedTVPlan(provider, targetPlanId);

    if (!planValidation.valid) {
      return NextResponse.json({
        success: false,
        message: planValidation.error || 'Invalid TV bouquet selected.',
      }, { status: 400 });
    }

    const price = planValidation.authoritativePrice;
    const resolvedPlanName = planValidation.planName || planName || targetPlanId;

    await connectToDatabase();
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    if (user.walletBalance < price) {
      return NextResponse.json({
        success: false,
        message: `Insufficient wallet balance. Required: ₦${price.toLocaleString()}, Balance: ₦${user.walletBalance.toLocaleString()}`,
      }, { status: 400 });
    }

    const previousBalance = user.walletBalance;
    const newBalance = previousBalance - price;

    user.walletBalance = newBalance;
    await user.save();

    const requestId = `ST_TV_${Date.now()}`;
    const vtuResult = await processTVSubscription({
      provider,
      smartcardNo,
      planId: targetPlanId,
      amount: price,
      requestId,
    });

    const isSuccess = vtuResult.success === true;
    const status = isSuccess ? 'success' : 'failed';

    // Refund immediately if provider fails
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
      type: 'tv',
      reference: requestId,
      serviceName: `${provider} (${resolvedPlanName})`,
      networkOrProvider: provider,
      recipient: smartcardNo,
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
      variationCode: targetPlanId,
      commissionDetails,
    });

    if (!isSuccess) {
      return NextResponse.json({
        success: false,
        message: vtuResult.error || 'TV subscription renewal failed. Your wallet balance has been refunded.',
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      newBalance: user.walletBalance,
      transaction: tx,
      message: `${provider} subscription renewal for Smartcard ${smartcardNo} successful!`,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message || 'Server error' }, { status: 500 });
  }
}
