'use client';

import { useState, useEffect } from 'react';
import { Signal, Phone, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

const networks = [
  { id: 'MTN', name: 'MTN', color: 'border-amber-400 text-amber-400 bg-amber-400/10' },
  { id: 'AIRTEL', name: 'Airtel', color: 'border-red-500 text-red-400 bg-red-500/10' },
  { id: 'GLO', name: 'Glo', color: 'border-emerald-500 text-emerald-400 bg-emerald-500/10' },
  { id: '9MOBILE', name: '9mobile', color: 'border-[#82c91e] text-[#82c91e] bg-[#82c91e]/10' },
];

export default function BuyAirtimePage() {
  const [selectedNetwork, setSelectedNetwork] = useState('MTN');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  useEffect(() => {
    const stored = localStorage.getItem('softtap_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handlePurchase = async (e) => {
    e.preventDefault();
    setStatusMsg({ type: '', text: '' });

    if (!amount || parseFloat(amount) < 50) {
      setStatusMsg({ type: 'error', text: 'Minimum airtime amount is ₦50' });
      return;
    }

    if (!phone || phone.length < 11) {
      setStatusMsg({ type: 'error', text: 'Please enter a valid 11-digit phone number' });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/airtime/buy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          network: selectedNetwork,
          phone,
          amount: parseFloat(amount),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatusMsg({ type: 'success', text: data.message });
        setPhone('');
        setAmount('');
        const updatedUser = { ...user, walletBalance: data.newBalance };
        setUser(updatedUser);
        localStorage.setItem('softtap_user', JSON.stringify(updatedUser));
      } else {
        setStatusMsg({ type: 'error', text: data.message || 'Airtime purchase failed' });
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
          <Signal className="w-8 h-8 text-violet-400" /> Buy Airtime Top-Up
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Instant recharge for MTN, Airtel, Glo, and 9mobile at wholesale rates.
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

      <form onSubmit={handlePurchase} className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6 border border-slate-800">
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
            1. Select Network
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {networks.map((net) => {
              const isSelected = selectedNetwork === net.id;
              return (
                <button
                  key={net.id}
                  type="button"
                  onClick={() => setSelectedNetwork(net.id)}
                  className={`p-4 rounded-2xl border text-center font-extrabold transition text-base ${
                    isSelected
                      ? `${net.color} border-2 shadow-lg shadow-violet-950/40`
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {net.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
            2. Phone Number
          </label>
          <div className="relative">
            <Phone className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="tel"
              placeholder="e.g. 08039579410"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-base font-medium placeholder-slate-500 focus:outline-none focus:border-violet-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
            3. Airtime Amount (₦)
          </label>
          <input
            type="number"
            placeholder="e.g. 500"
            min="50"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full px-4 py-3.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-base font-semibold placeholder-slate-500 focus:outline-none focus:border-violet-500"
          />
        </div>

        <div className="pt-4 border-t border-slate-800/80">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl gradient-btn-secondary text-white font-bold text-base flex items-center justify-center gap-2 disabled:opacity-50 transition shadow-xl"
          >
            {loading ? 'Processing Airtime...' : 'Recharge Airtime Now'} <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
