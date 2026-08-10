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
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
          <Wallet className="w-8 h-8 text-emerald-400" /> Fund Your Wallet
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Choose online card payment or instant bank transfer to credit your wallet 24/7.
        </p>
      </div>

      {statusMsg.text && (
        <div
          className={`p-4 rounded-2xl border text-sm font-semibold flex items-center gap-3 ${
            statusMsg.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}
        >
          {statusMsg.type === 'success' ? <ShieldCheck className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          {statusMsg.text}
        </div>
      )}

      {/* Option 1: Automated Bank Transfer Virtual Account */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/30 space-y-4 relative overflow-hidden bg-gradient-to-br from-[#0a1524] to-[#0b0914]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-white">Automated Bank Transfer (Instant Auto-Credit)</h2>
            <p className="text-xs text-slate-400">Transfer any amount to this bank account and your wallet will be credited automatically within seconds.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <p className="text-xs text-slate-400 font-medium">Bank Name</p>
            <p className="text-base font-bold text-white">Moniepoint Microfinance</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1 relative">
            <p className="text-xs text-slate-400 font-medium">Account Number</p>
            <div className="flex items-center justify-between">
              <p className="text-base font-bold text-emerald-400 font-mono">8039579410</p>
              <button
                type="button"
                onClick={handleCopyBank}
                className="p-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                title="Copy Account Number"
              >
                {copiedBank ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
            <p className="text-xs text-slate-400 font-medium">Account Name</p>
            <p className="text-base font-bold text-white truncate">SoftTap - {user?.firstName || 'User'}</p>
          </div>
        </div>
      </div>

      {/* Option 2: Paystack Card/USSD Funding */}
      <form onSubmit={handleFundOnline} className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6 border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-white">Online Paystack Card & USSD Funding</h2>
            <p className="text-xs text-slate-400">Fund instantly using Master/Visa Card, Bank App, or USSD.</p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
            Enter Amount (₦)
          </label>
          <input
            type="number"
            placeholder="e.g. 2000"
            min="100"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full px-4 py-3.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-bold text-lg placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl gradient-btn-primary text-slate-950 font-bold text-base flex items-center justify-center gap-2 disabled:opacity-50 transition shadow-xl"
          >
            {loading ? 'Processing Paystack...' : 'Pay Online Now'} <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
