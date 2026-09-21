import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { connectToDatabase } from '@/lib/db';
import User from '@/models/User';
import Transaction from '@/models/Transaction';

export async function POST(req) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-paystack-signature');
    const secret = process.env.PAYSTACK_SECRET_KEY;

    // Verify webhook signature if secret key is configured
    if (secret && signature) {
      const hash = crypto.createHmac('sha512', secret).update(rawBody).digest('hex');
      if (hash !== signature) {
        return NextResponse.json({ message: 'Invalid signature' }, { status: 401 });
      }
    }

    const payload = JSON.parse(rawBody);
    const event = payload.event;
    const data = payload.data;

    // Only process successful charges
    if (event === 'charge.success' && data && data.status === 'success') {
      const reference = data.reference;
      const fundAmount = data.amount ? data.amount / 100 : 0; // Kobo to NGN

      if (fundAmount <= 0) {
        return NextResponse.json({ message: 'Ignored zero amount' }, { status: 200 });
      }

      await connectToDatabase();

      // Check if reference has already been processed to prevent duplicate credits
      const existing = await Transaction.find({ reference }).then
        ? await Transaction.find({ reference })
        : null;

      const txList = Array.isArray(existing) ? existing : [];
      const alreadyProcessed = txList.some
        ? txList.some((t) => t.status === 'success')
        : false;

      if (alreadyProcessed) {
        return NextResponse.json({ message: 'Transaction already credited' }, { status: 200 });
      }

      // Find user by metadata userId or email
      let user = null;
      if (data.metadata?.userId) {
        user = await User.findById(data.metadata.userId);
      }
      if (!user && data.customer?.email) {
        user = await User.findOne({ email: data.customer.email.toLowerCase() });
      }

      if (user) {
        const previousBalance = user.walletBalance || 0;
        const newBalance = previousBalance + fundAmount;

        user.walletBalance = newBalance;
        await user.save();

        await Transaction.create({
          userId: user._id,
          type: 'wallet_funding',
          reference,
          serviceName: 'Wallet Credit via Paystack Webhook',
          networkOrProvider: 'Paystack',
          recipient: user.phone || data.customer?.phone || 'Self',
          amount: fundAmount,
          previousBalance,
          newBalance,
          paymentMethod: 'paystack_direct',
          customerEmail: user.email,
          customerPhone: user.phone,
          status: 'success',
          details: {
            channel: data.channel,
            paidAt: data.paid_at,
            ipAddress: data.ip_address,
          },
        });
      }
    }

    return NextResponse.json({ status: true, message: 'Webhook received' }, { status: 200 });
  } catch (error) {
    console.error('[Paystack Webhook Error]', error);
    return NextResponse.json({ status: false, message: error.message }, { status: 500 });
  }
}
