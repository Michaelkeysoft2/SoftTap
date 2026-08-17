'use client';

import { useState, useEffect } from 'react';
import { Wallet, CreditCard, Landmark, Check, ShieldCheck, AlertCircle, Copy, ArrowRight } from 'lucide-react';

export default function FundWalletPage() {
  const [user, setUser] = useState(null);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
  const [copiedBank, setCopiedBank] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('softtap_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleFundOnline = async (e) => {
    e.preventDefault();
    setStatusMsg({ type: '', text: '' });

    if (!amount || parseFloat(amount) < 100) {
      setStatusMsg({ type: 'error', text: 'Minimum funding amount is ₦100' });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/wallet/fund', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          amount: parseFloat(amount),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatusMsg({ type: 'success', text: data.message });
        setAmount('');
        const updatedUser = { ...user, walletBalance: data.newBalance };
        setUser(updatedUser);
        localStorage.setItem('softtap_user', JSON.stringify(updatedUser));
      } else {
        setStatusMsg({ type: 'error', text: data.message || 'Funding failed' });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Transaction error occurred' });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyBank = () => {
    navigator.clipboard.writeText('8039579410');
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-900 flex items-center gap-3">
          <Wallet className="w-8 h-8 text-orange-500" /> Fund Your Wallet
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Choose online card payment or instant bank transfer to credit your wallet 24/7.
        </p>
      </div>

      {statusMsg.text && (
        <div
          className={`p-4 rounded-2xl border text-sm font-semibold flex items-center gap-3 ${
            statusMsg.type === 'success'
              ? 'bg-green-50 border-green-300 text-green-700'
              : 'bg-red-50 border-red-300 text-red-700'
          }`}
        >
          {statusMsg.type === 'success' ? <ShieldCheck className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          {statusMsg.text}
        </div>
      )}

      {/* Option 1: Automated Bank Transfer Virtual Account */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-blue-200 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-blue-900">Automated Bank Transfer (Instant Auto-Credit)</h2>
            <p className="text-xs text-gray-500">Transfer any amount to this bank account and your wallet will be credited automatically within seconds.</p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
          <div className="flex justify-between items-center text-sm border-b border-gray-200 pb-2">
            <span className="text-gray-500">Bank Name</span>
            <span className="font-bold text-blue-900">Opay / Moniepoint</span>
          </div>
          <div className="flex justify-between items-center text-sm border-b border-gray-200 pb-2">
            <span className="text-gray-500">Account Number</span>
            <div className="flex items-center gap-2">
              <span className="font-mono font-black text-orange-600 text-base">8039579410</span>
              <button
                onClick={handleCopyBank}
                className="p-1.5 rounded-lg bg-white border border-gray-200 text-gray-700 hover:text-orange-500 transition shadow-sm"
                title="Copy Account Number"
              >
                {copiedBank ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-500">Account Name</span>
            <span className="font-bold text-blue-900">SoftTap / Michael Olayiwola</span>
          </div>
        </div>
      </div>

      {/* Option 2: Paystack Instant Card/USSD Gateway */}
      <form onSubmit={handleFundOnline} className="bg-white p-6 sm:p-8 rounded-3xl space-y-6 border border-gray-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-500">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-blue-900">Instant Online Payment (Paystack)</h2>
            <p className="text-xs text-gray-500">Pay securely with Debit Card, USSD, Apple Pay or Bank Transfer via Paystack.</p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            Funding Amount (₦)
          </label>
          <input
            type="number"
            min="100"
            placeholder="e.g. 5000 (Min: ₦100)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 text-base font-medium placeholder-gray-400 focus:outline-none focus:border-orange-500"
          />
          <div className="flex gap-2 pt-1">
            {[500, 1000, 2000, 5000, 10000].map((quickAmt) => (
              <button
                key={quickAmt}
                type="button"
                onClick={() => setAmount(quickAmt.toString())}
                className="px-3 py-1.5 rounded-lg bg-gray-100 border border-gray-200 text-xs font-bold text-gray-700 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition"
              >
                ₦{quickAmt.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 space-y-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl btn-orange text-base flex items-center justify-center gap-2 disabled:opacity-50 transition shadow-lg"
          >
            {loading ? 'Initiating Gateway...' : 'Pay & Fund Wallet Now'} <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
