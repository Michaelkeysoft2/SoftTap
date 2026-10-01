import { NextResponse } from 'next/server';

const NETWORK_SERVICE_MAP = {
  mtn: 'mtn-data',
  airtel: 'airtel-data',
  glo: 'glo-data',
  '9mobile': 'etisalat-data',
  etisalat: 'etisalat-data',
};

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const networkParam = (searchParams.get('network') || 'mtn').toLowerCase().trim();

    const serviceID = NETWORK_SERVICE_MAP[networkParam] || `${networkParam}-data`;

    const baseUrl = process.env.VTPASS_API_URL || 'https://sandbox.vtpass.com/api';
    const targetUrl = `${baseUrl}/service-variations?serviceID=${encodeURIComponent(serviceID)}`;

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

    const response = await fetch(targetUrl, {
      method: 'GET',
      headers,
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: `VTpass returned HTTP status ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (data.response_description !== '000' && data.code !== '000') {
      return NextResponse.json(
        { success: false, message: data.response_description || 'Failed to retrieve plans from VTpass' },
        { status: 502 }
      );
    }

    const rawVariations = data.content?.variations || [];

    const plans = rawVariations.map((v) => ({
      variation_code: v.variation_code,
      name: v.name,
      variation_amount: v.variation_amount,
      fixedPrice: v.fixedPrice,
    }));

    return NextResponse.json({
      success: true,
      serviceID,
      plans,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message || 'Server error fetching data plans' },
      { status: 500 }
    );
  }
}
