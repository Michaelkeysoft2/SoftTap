'use client';

import { useState, useEffect } from 'react';
import { Tv, CreditCard, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

const tvProviders = [
  { id: 'DSTV', name: 'DSTV', plans: [{ name: 'DSTV Padi', price: 3600 }, { name: 'DSTV Yanga', price: 5100 }, { name: 'DSTV Confam', price: 9300 }, { name: 'DSTV Compact', price: 15700 }] },
  { id: 'GOTV', name: 'GOTV', plans: [{ name: 'GOTV Smallie', price: 1500 }, { name: 'GOTV Jinja', price: 3300 }, { name: 'GOTV Jolli', price: 4850 }, { name: 'GOTV Max', price: 7200 }, { name: 'GOTV Supa', price: 10500 }] },
  { id: 'STARTIMES', name: 'StarTimes', plans: [{ name: 'Nova Bouquet', price: 1700 }, { name: 'Basic Bouquet', price: 3300 }, { name: 'Smart Bouquet', price: 4300 }, { name: 'Classic Bouquet', price: 5500 }] },
];

export default function TVSubscriptionPage() {
  const [selectedProvider, setSelectedProvider] = useState(tvProviders[0]);
  const [selectedPlan, setSelectedPlan] = useState(tvProviders[0].plans[0]);
  const [smartcardNo, setSmartcardNo] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  useEffect(() => {
    const stored = localStorage.getItem('softtap_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setStatusMsg({ type: '', text: '' });

    if (!smartcardNo || smartcardNo.length < 8) {
      setStatusMsg({ type: 'error', text: 'Please enter a valid Smartcard/IUC Number' });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/tv/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          provider: selectedProvider.name,
          smartcardNo,
          planName: selectedPlan.name,
          amount: selectedPlan.price,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatusMsg({ type: 'success', text: data.message });
        setSmartcardNo('');
        const updatedUser = { ...user, walletBalance: data.newBalance };
        setUser(updatedUser);
        localStorage.setItem('softtap_user', JSON.stringify(updatedUser));
      } else {
        setStatusMsg({ type: 'error', text: data.message || 'TV Subscription failed' });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Transaction error occurred' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
          <Tv className="w-8 h-8 text-cyan-400" /> Cable TV Subscription
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Renew & Subscribe your DSTV, GOTV, and StarTimes decoders instantly.
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

      <form onSubmit={handleSubscribe} className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6 border border-slate-800">
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
            1. Select Provider
          </label>
          <div className="grid grid-cols-3 gap-3">
            {tvProviders.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  setSelectedProvider(p);
                  setSelectedPlan(p.plans[0]);
                }}
                className={`p-4 rounded-2xl border text-center font-extrabold transition ${
                  selectedProvider.id === p.id
                    ? 'bg-cyan-500/10 border-cyan-500 text-cyan-400 shadow-lg'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
            2. Choose Package / Bouquet
          </label>
          <select
            value={selectedPlan?.name}
            onChange={(e) => {
              const plan = selectedProvider.plans.find((pl) => pl.name === e.target.value);
              setSelectedPlan(plan);
            }}
            className="w-full px-4 py-3.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-semibold focus:outline-none focus:border-cyan-500"
          >
            {selectedProvider.plans.map((pl, idx) => (
              <option key={idx} value={pl.name}>
                {pl.name} - ₦{pl.price.toLocaleString()}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
            3. Smartcard / IUC Number
          </label>
          <div className="relative">
            <CreditCard className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="e.g. 1023456789"
              value={smartcardNo}
              onChange={(e) => setSmartcardNo(e.target.value)}
              required
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-base font-medium placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-4">
          <div className="flex justify-between items-center text-sm font-semibold">
            <span className="text-slate-400">Total Payable:</span>
            <span className="text-2xl font-extrabold text-cyan-400">₦{selectedPlan?.price?.toLocaleString()}</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-base flex items-center justify-center gap-2 disabled:opacity-50 transition shadow-xl"
          >
            {loading ? 'Processing Subscription...' : 'Renew TV Subscription'} <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
