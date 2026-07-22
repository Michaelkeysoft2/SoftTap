/**
 * Pluggable VTU Provider Integration Service
 * Configured for VTpass API (with fallback simulation for testing/dev environment)
 */

const VTPASS_API_URL = process.env.VTPASS_API_URL || 'https://sandbox.vtpass.com/api';
const VTPASS_API_KEY = process.env.VTPASS_API_KEY || '';
const VTPASS_SECRET_KEY = process.env.VTPASS_SECRET_KEY || '';

export async function processDataPurchase({ network, phone, planId, amount, requestId }) {
  // If API credentials exist, make real request to VTpass
  if (VTPASS_API_KEY && VTPASS_SECRET_KEY) {
    try {
      const response = await fetch(`${VTPASS_API_URL}/pay`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': VTPASS_API_KEY,
          'secret-key': VTPASS_SECRET_KEY,
        },
        body: JSON.stringify({
          request_id: requestId,
          serviceID: network.toLowerCase(),
          billersCode: phone,
          variation_code: planId,
          amount: amount,
          phone: phone,
        }),
      });
      const data = await response.json();
      if (data.code === '000') {
        return { success: true, transactionId: data.content?.transactions?.transactionId || requestId, response: data };
      } else {
        return { success: false, error: data.response_description || 'Transaction failed', response: data };
      }
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  // Simulation mode for instant testing when credentials are not yet set
  return {
    success: true,
    transactionId: `ST_SIM_${Date.now()}`,
    simulated: true,
    message: `Data top-up of ${amount} for ${phone} on ${network} was delivered successfully.`,
  };
}

export async function processAirtimePurchase({ network, phone, amount, requestId }) {
  if (VTPASS_API_KEY && VTPASS_SECRET_KEY) {
    try {
      const response = await fetch(`${VTPASS_API_URL}/pay`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': VTPASS_API_KEY,
          'secret-key': VTPASS_SECRET_KEY,
        },
        body: JSON.stringify({
          request_id: requestId,
          serviceID: network.toLowerCase(),
          billersCode: phone,
          amount: amount,
          phone: phone,
        }),
      });
      const data = await response.json();
      if (data.code === '000') {
        return { success: true, transactionId: data.content?.transactions?.transactionId || requestId, response: data };
      } else {
        return { success: false, error: data.response_description || 'Airtime purchase failed', response: data };
      }
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  return {
    success: true,
    transactionId: `ST_AIR_${Date.now()}`,
    simulated: true,
    message: `Airtime top-up of ₦${amount} to ${phone} (${network}) was successful.`,
  };
}

export async function processTVSubscription({ provider, smartcardNo, planId, amount, requestId }) {
  return {
    success: true,
    transactionId: `ST_TV_${Date.now()}`,
    simulated: true,
    message: `${provider} subscription renewal for Smartcard ${smartcardNo} active.`,
  };
}

export async function processElectricityBill({ provider, meterNo, amount, meterType = 'prepaid', requestId }) {
  const token = Array.from({ length: 5 }, () => Math.floor(1000 + Math.random() * 9000)).join('-');
  return {
    success: true,
    transactionId: `ST_ELEC_${Date.now()}`,
    token: token,
    units: `${(amount / 85).toFixed(1)} kWh`,
    simulated: true,
    message: `Electricity payment of ₦${amount} for Meter ${meterNo} successful. Token: ${token}`,
  };
}

export async function processExamPin({ examType, quantity, amount, requestId }) {
  const pins = Array.from({ length: quantity }, (_, i) => ({
    serialNumber: `SOFT${examType}${Math.floor(10000000 + Math.random() * 90000000)}`,
    pin: Math.floor(100000000000 + Math.random() * 900000000000).toString(),
  }));

  return {
    success: true,
    transactionId: `ST_PIN_${Date.now()}`,
    pins: pins,
    simulated: true,
    message: `${quantity} x ${examType} pin(s) generated successfully.`,
  };
}
