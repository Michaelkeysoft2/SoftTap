import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import Transaction from '@/models/Transaction';
import { processDataPurchase, getValidatedDataPlan } from '@/lib/vtu-service';

function generateRequestId() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Lagos',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(new Date());

  const map = {};
  for (const { type, value } of parts) {
    map[type] = value;
  }

  const timestamp = `${map.year}${map.month}${map.day}${map.hour}${map.minute}`;
  const randomSuffix = Math.random().toString(36).substring(2, 8).padEnd(6, '0');
  return `${timestamp}${randomSuffix}`;
}

export async function POST(req) {
  try {
    const { userId, network, phone, planName, planId } = await req.json();

    if (!userId || !network || !phone || !planId) {
      return NextResponse.json({ success: false, message: 'Missing required parameters' }, { status: 400 });
    }

    // 1-9: Server-side validation against VTpass variations (never trust browser-supplied amount)
    const planValidation = await getValidatedDataPlan(network, planId);
    if (!planValidation.valid) {
      return NextResponse.json({
        success: false,
        message: planValidation.error || 'Invalid data plan selected.',
      }, { status: 400 });
    }

    // Authoritative price comes strictly from VTpass variation_amount
    const price = planValidation.authoritativePrice;
    const finalPlanName = planValidation.planName || planName || 'Data Bundle';

    await connectToDatabase();
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

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

    const requestId = generateRequestId();
    const vtuResult = await processDataPurchase({
      network,
      phone,
      planId,
      amount: price,
      requestId,
    });

    const isSuccess = vtuResult.success === true;
    const status = isSuccess ? 'success' : 'failed';

    // Refund if failed
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
      type: 'data',
      reference: requestId,
      serviceName: `${network} ${finalPlanName}`,
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
      variationCode: planId || '',
      commissionDetails,
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
      message: `Successfully purchased ${finalPlanName} for ${phone}!`,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message || 'Server error' }, { status: 500 });
  }
}
