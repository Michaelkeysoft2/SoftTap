'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Wallet, CreditCard, Landmark, Check, ShieldCheck,
  AlertCircle, Copy, ArrowRight, Loader2, RefreshCw
} from 'lucide-react';

export default function FundWalletPage() {
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
  const [copiedBank, setCopiedBank] = useState(false);
  const searchParams = useSearchParams();
  const verifiedRef = useRef(false);

  // Load user from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('softtap_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  // Handle Paystack callback: verify payment when we return from Paystack
  useEffect(() => {
    const reference = searchParams.get('reference');
    const stored = typeof window !== 'undefined' ? localStorage.getItem('softtap_user') : null;
    const localUser = stored ? JSON.parse(stored) : null;
    const callbackUserId = searchParams.get('userId') || user?.id || localUser?.id;
    const callbackAmount = searchParams.get('amount');

    if (reference && callbackUserId && !verifiedRef.current) {
      verifiedRef.current = true;
      handleVerifyPayment(reference, callbackUserId, callbackAmount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, user]);

  const handleVerifyPayment = async (reference, userId, amount) => {
    setVerifying(true);
    setStatusMsg({ type: '', text: '' });
    try {
      const payload = { action: 'verify', userId, reference };
      if (amount) payload.amount = parseFloat(amount);

      const res = await fetch('/api/wallet/fund', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatusMsg({
          type: 'success',
          text: data.alreadyCredited
            ? 'This payment was already credited to your wallet.'
            : data.message,
        });
        // Update stored user balance
        const stored = localStorage.getItem('softtap_user');
        if (stored) {
          const u = JSON.parse(stored);
          const updatedUser = { ...u, walletBalance: data.newBalance };
          setUser(updatedUser);
          localStorage.setItem('softtap_user', JSON.stringify(updatedUser));
        }
        // Clean URL params
        window.history.replaceState({}, '', '/dashboard/fund-wallet');
      } else {
        setStatusMsg({ type: 'error', text: data.message || 'Payment verification failed.' });
      }
    } catch {
      setStatusMsg({ type: 'error', text: 'Connection error during verification. Please contact support.' });
    } finally {
      setVerifying(false);
    }
  };

  const handleFundOnline = async (e) => {
    e.preventDefault();
    setStatusMsg({ type: '', text: '' });

    const fundAmount = parseFloat(amount);
    if (!amount || isNaN(fundAmount) || fundAmount < 100) {
      setStatusMsg({ type: 'error', text: 'Minimum funding amount is ₦100' });
      return;
    }

    if (!user?.id) {
      setStatusMsg({ type: 'error', text: 'You must be logged in to fund your wallet.' });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/wallet/fund', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'initialize',
          userId: user.id,
          amount: fundAmount,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const authUrl = data.paystack?.data?.authorization_url;
        if (authUrl) {
          // Redirect to Paystack (or simulated page)
          window.location.href = authUrl;
        } else {
          setStatusMsg({ type: 'error', text: 'Could not get Paystack payment link. Please try again.' });
        }
      } else {
        setStatusMsg({ type: 'error', text: data.message || 'Failed to initialize payment.' });
      }
    } catch {
      setStatusMsg({ type: 'error', text: 'A network error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyBank = () => {
    navigator.clipboard.writeText('0082747029');
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  const quickAmounts = [500, 1000, 2000, 5000, 10000];

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300 pb-10">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-900 flex items-center gap-3">
          <Wallet className="w-7 h-7 sm:w-8 sm:h-8 text-orange-500 shrink-0" /> Fund Your Wallet
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Choose instant online card/USSD payment or direct bank transfer to credit your wallet 24/7.
        </p>
        {user && (
          <p className="text-xs text-gray-400 mt-1">
            Current balance:{' '}
            <span className="font-bold text-orange-600">
              ₦{(user.walletBalance || 0).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
            </span>
          </p>
        )}
      </div>

      {/* Verifying overlay */}
      {verifying && (
        <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 text-blue-700 text-sm font-semibold flex items-center gap-3">
          <Loader2 className="w-5 h-5 animate-spin shrink-0" />
          Verifying your payment with Paystack… Please wait.
        </div>
      )}

      {/* Status message */}
      {!verifying && statusMsg.text && (
        <div
          className={`p-4 rounded-2xl border text-sm font-semibold flex items-start gap-3 ${
            statusMsg.type === 'success'
              ? 'bg-green-50 border-green-300 text-green-700'
              : 'bg-red-50 border-red-300 text-red-700'
          }`}
        >
          {statusMsg.type === 'success' ? (
            <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          )}
          {statusMsg.text}
        </div>
      )}

      {/* Option 1: Direct Bank Transfer */}
      <div className="bg-white p-5 sm:p-8 rounded-3xl border border-blue-200 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-blue-900">Direct Bank Transfer</h2>
            <p className="text-xs text-gray-500">Transfer directly to our official business account below from any banking app.</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
          <div className="flex justify-between items-center text-sm border-b border-gray-200 pb-2">
            <span className="text-gray-500">Bank Name</span>
            <span className="font-bold text-blue-900">Stanbic Bank (IBTC)</span>
          </div>
          <div className="flex justify-between items-center text-sm border-b border-gray-200 pb-2">
            <span className="text-gray-500">Account Number</span>
            <div className="flex items-center gap-2">
              <span className="font-mono font-black text-orange-600 text-base sm:text-lg tracking-widest">0082747029</span>
              <button
                onClick={handleCopyBank}
                className="p-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 hover:text-orange-500 transition shadow-sm touch-manipulation"
                title="Copy Account Number"
              >
                {copiedBank ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center text-sm border-b border-gray-200 pb-2">
            <span className="text-gray-500">Account Name</span>
            <span className="font-bold text-blue-900 text-right">Michaelkeysoft Enterprises</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 text-xs text-gray-500 pt-1">
            <span>Payment Proof &amp; Support:</span>
            <a
              href="https://wa.me/2348039579410"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-orange-600 hover:underline"
            >
              WhatsApp 08039579410
            </a>
          </div>
        </div>
      </div>

      {/* Option 2: Paystack Instant Card/USSD Gateway */}
      <form onSubmit={handleFundOnline} className="bg-white p-5 sm:p-8 rounded-3xl space-y-6 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-500 shrink-0">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-blue-900">Instant Online Payment (Paystack)</h2>
            <p className="text-xs text-gray-500">Pay securely with Debit Card, USSD, Bank Transfer via Paystack.</p>
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            Funding Amount (₦)
          </label>
          <input
            type="number"
            inputMode="numeric"
            min="100"
            placeholder="e.g. 5000 (Min: ₦100)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 text-base font-medium placeholder-gray-400 focus:outline-none focus:border-orange-500 transition"
          />
          {/* Quick amount buttons */}
          <div className="flex flex-wrap gap-2 pt-1">
            {quickAmounts.map((quickAmt) => (
              <button
                key={quickAmt}
                type="button"
                onClick={() => setAmount(quickAmt.toString())}
                className={`px-3 py-2 rounded-lg border text-xs font-bold transition touch-manipulation ${
                  amount === quickAmt.toString()
                    ? 'bg-orange-500 text-white border-orange-500'
                    : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200'
                }`}
              >
                ₦{quickAmt.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl btn-orange text-base flex items-center justify-center gap-2 disabled:opacity-50 transition shadow-lg touch-manipulation"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Redirecting to Paystack…
              </>
            ) : (
              <>
                Pay &amp; Fund Wallet <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
          <p className="text-center text-xs text-gray-400 mt-3 flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
            Secured by Paystack — Nigeria&apos;s most trusted payment gateway.
          </p>
        </div>
      </form>

      {/* Re-verify button for users who came back but verification failed */}
      {searchParams.get('reference') && !verifying && statusMsg.type === 'error' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 shrink-0" />
          <div className="flex-1 text-xs text-yellow-800">
            <p className="font-bold">Verification failed?</p>
            <p>If you completed payment, try verifying again or contact support on WhatsApp.</p>
          </div>
          <button
            onClick={() => {
              verifiedRef.current = false;
              const ref = searchParams.get('reference');
              const uid = searchParams.get('userId') || user?.id || (typeof window !== 'undefined' && JSON.parse(localStorage.getItem('softtap_user') || '{}')?.id);
              const amt = searchParams.get('amount');
              if (ref && uid) handleVerifyPayment(ref, uid, amt);
            }}
            className="px-4 py-2 rounded-xl bg-yellow-500 text-white text-xs font-bold flex items-center gap-1.5 shrink-0 touch-manipulation"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Retry Verify
          </button>
        </div>
      )}
    </div>
  );
}
