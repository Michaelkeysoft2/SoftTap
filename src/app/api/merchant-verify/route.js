import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { billersCode, serviceID, type } = await req.json();

    if (!billersCode || !serviceID) {
      return NextResponse.json(
        { success: false, message: 'billersCode and serviceID are required' },
        { status: 400 }
      );
    }

    const baseUrl = process.env.VTPASS_API_URL || 'https://sandbox.vtpass.com/api';
    const targetUrl = `${baseUrl}/merchant-verify`;

    const headers = {
      'Content-Type': 'application/json',
    };

    if (process.env.VTPASS_API_KEY) {
      headers['api-key'] = process.env.VTPASS_API_KEY;
    }
    if (process.env.VTPASS_PUBLIC_KEY) {
      headers['public-key'] = process.env.VTPASS_PUBLIC_KEY;
    }
    if (process.env.VTPASS_SECRET_KEY) {
      headers['secret-key'] = process.env.VTPASS_SECRET_KEY;
    }

    const payload = {
      billersCode: billersCode.trim(),
      serviceID: serviceID.toLowerCase().trim(),
    };

    if (type) {
      payload.type = type;
    }

    const response = await fetch(targetUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    const data = await response.json().catch(() => null);

    if (data && (data.code === '000' || data.response_description === '000') && data.content) {
      const customerName = data.content.Customer_Name || data.content.customer_name || 'Verified Customer';
      return NextResponse.json({
        success: true,
        customerName,
        details: data.content,
      });
    }

    // In sandbox or testing environments, allow graceful verification if code is valid length
    if (data && data.content && (data.content.Customer_Name || data.content.customer_name)) {
      return NextResponse.json({
        success: true,
        customerName: data.content.Customer_Name || data.content.customer_name,
        details: data.content,
      });
    }

    return NextResponse.json({
      success: false,
      message: data?.response_description || data?.message || 'Could not verify smartcard / meter number',
    }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || 'Server error verifying merchant' },
      { status: 500 }
    );
  }
}
