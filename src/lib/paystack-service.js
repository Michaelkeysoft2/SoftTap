/**
 * Paystack Integration Service for SoftTap Wallet Funding
 */

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY || '';

export async function initializePaystackPayment({ email, amount, reference, callbackUrl }) {
  if (PAYSTACK_SECRET_KEY) {
    try {
      const response = await fetch('https://api.paystack.co/transaction/initialize', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          amount: Math.round(amount * 100), // Convert NGN to Kobo
          reference: reference,
          callback_url: callbackUrl,
        }),
      });
      return await response.json();
    } catch (err) {
      return { status: false, message: err.message };
    }
  }

  // Simulation mode for instant testing
  return {
    status: true,
    message: 'Authorization URL created',
    data: {
      authorization_url: `/dashboard/fund-wallet?reference=${reference}&simulated=true&amount=${amount}`,
      access_code: `sim_access_${Date.now()}`,
      reference: reference,
    },
  };
}

export async function verifyPaystackPayment(reference) {
  if (PAYSTACK_SECRET_KEY) {
    try {
      const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      });
      return await response.json();
    } catch (err) {
      return { status: false, message: err.message };
    }
  }

  return {
    status: true,
    data: {
      status: 'success',
      reference: reference,
      amount: 100000, // kobo
    },
  };
}
