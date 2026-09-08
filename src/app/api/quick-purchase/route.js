import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Transaction from '@/models/Transaction';
import { 
  processDataPurchase, 
  processAirtimePurchase, 
  processTVSubscription, 
  processElectricityBill, 
  processExamPin 
} from '@/lib/vtu-service';

export async function POST(req) {
  try {
    const body = await req.json();
    const { 
      serviceType, 
      amount, 
      customerEmail, 
      customerPhone,
      paymentReference,
      // specific fields
      network,
      phone,
      planId,
      planName,
      provider,
      smartcardNo,
      meterNo,
      meterType,
      examType,
      quantity
    } = body;

    if (!serviceType || !amount) {
      return NextResponse.json({ success: false, message: 'Missing required parameters' }, { status: 400 });
    }

    const price = parseFloat(amount);
    const requestId = paymentReference || ST_QP_;
    let result = null;
    let serviceDisplayName = '';
    let recipientIdentifier = '';
    let providerName = '';

    switch (serviceType) {
      case 'data':
        recipientIdentifier = phone;
        providerName = network;
        serviceDisplayName = `${network} Data (${planName || planId})`;
        result = await processDataPurchase({ network, phone, planId, amount: price, requestId });
        break;

      case 'airtime':
        recipientIdentifier = phone;
        providerName = network;
        serviceDisplayName = `${network} Airtime Topup`;
        result = await processAirtimePurchase({ network, phone, amount: price, requestId });
        break;

      case 'tv':
        recipientIdentifier = smartcardNo;
        providerName = provider;
        serviceDisplayName = `${provider} TV (${planName || planId})`;
        result = await processTVSubscription({ provider, smartcardNo, planId: planName || planId, amount: price, requestId });
        break;

      case 'electricity':
        recipientIdentifier = meterNo;
        providerName = provider;
        serviceDisplayName = `${provider} Electricity (${meterType})`;
        result = await processElectricityBill({ provider, meterNo, amount: price, meterType, requestId });
        break;

      case 'exam_pin':
        recipientIdentifier = customerPhone || customerEmail || 'N/A';
        providerName = examType;
        serviceDisplayName = `${examType} Result Checker Pin(s)`;
        result = await processExamPin({ examType, quantity: parseInt(quantity) || 1, amount: price, requestId });
        break;

      default:
        return NextResponse.json({ success: false, message: 'Invalid service type' }, { status: 400 });
    }

    if (!result || !result.success) {
      return NextResponse.json({ 
        success: false, 
        message: result?.error || 'Service delivery failed. Please try again.' 
      }, { status: 500 });
    }

    // Save transaction to DB
    try {
      await connectToDatabase();
      await Transaction.create({
        type: serviceType,
        reference: requestId,
        serviceName: serviceDisplayName,
        networkOrProvider: providerName,
        recipient: recipientIdentifier,
        amount: price,
        costPrice: result.costPrice || 0,
        profit: result.profit || 0,
        paymentMethod: 'paystack_direct',
        customerEmail: customerEmail || 'guest@softtap.com',
        customerPhone: customerPhone || phone || recipientIdentifier,
        status: 'success',
        details: result,
      });
    } catch (dbErr) {
      console.error('Failed to log transaction in DB:', dbErr);
    }

    return NextResponse.json({
      success: true,
      message: result.message || `${serviceDisplayName} processed successfully!`,
      reference: requestId,
      data: result,
    });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message || 'Server error' }, { status: 500 });
  }
}
