'use client';

import { useState, useEffect } from 'react';
import { Lightbulb, Zap, ArrowRight, ShieldCheck, AlertCircle, Copy, Check } from 'lucide-react';

const discos = [
  { id: 'IKEDC', name: 'Ikeja Electric (IKEDC)' },
  { id: 'EKEDC', name: 'Eko Electric (EKEDC)' },
  { id: 'AEDC', name: 'Abuja Electric (AEDC)' },
  { id: 'IBEDC', name: 'Ibadan Electric (IBEDC)' },
  { id: 'KEDCO', name: 'Kano Electric (KEDCO)' },
  { id: 'PHED', name: 'Port Harcourt (PHED)' },
  { id: 'JED', name: 'Jos Electric (JED)' },
  { id: 'KAEDCO', name: 'Kaduna Electric (KAEDCO)' },
];

export default function ElectricityPage() {
  const [selectedDisco, setSelectedDisco] = useState('IKEDC');
  const [meterType, setMeterType] = useState('prepaid');
  const [meterNo, setMeterNo] = useState('');
  const [amount, setAmount] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
  const [generatedToken, setGeneratedToken] = useState(null);
  const [copiedToken, setCopiedToken] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('softtap_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handlePay = async (e) => {
    e.preventDefault();
    setStatusMsg({ type: '', text: '' });
    setGeneratedToken(null);

    if (!meterNo || meterNo.length < 9) {
      setStatusMsg({ type: 'error', text: 'Please enter a valid meter number' });
      return;
    }

    if (!amount || parseFloat(amount) < 1000) {
      setStatusMsg({ type: 'error', text: 'Minimum electricity payment is ₦1,000' });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/electricity/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          provider: selectedDisco,
          meterNo,
          meterType,
          amount: parseFloat(amount),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatusMsg({ type: 'success', text: 'Electricity payment successful!' });
        setGeneratedToken(data.token);
        setMeterNo('');
        setAmount('');
        const updatedUser = { ...user, walletBalance: data.newBalance };
        setUser(updatedUser);
        localStorage.setItem('softtap_user', JSON.stringify(updatedUser));
      } else {
        setStatusMsg({ type: 'error', text: data.message || 'Electricity payment failed' });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Transaction error occurred' });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyToken = () => {
    if (generatedToken) {
      navigator.clipboard.writeText(generatedToken);
      setCopiedToken(true);
      setTimeout(() => setCopiedToken(false), 2000);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
          <Lightbulb className="w-8 h-8 text-amber-400" /> Pay Electricity Bills
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Instant prepaid meter tokens & bill payments for all DISCOs in Nigeria.
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

      {/* Token Result Box */}
      {generatedToken && (
        <div className="p-6 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-center space-y-3">
          <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">Your Prepaid Meter Token</p>
          <p className="text-3xl sm:text-4xl font-mono font-black text-white tracking-widest">{generatedToken}</p>
          <button
            onClick={handleCopyToken}
            className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs inline-flex items-center gap-1.5 shadow-md"
          >
            {copiedToken ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copiedToken ? 'Token Copied!' : 'Copy Token'}
          </button>
        </div>
      )}

      <form onSubmit={handlePay} className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6 border border-slate-800">
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
            1. Select Electricity Disco
          </label>
          <select
            value={selectedDisco}
            onChange={(e) => setSelectedDisco(e.target.value)}
            className="w-full px-4 py-3.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-semibold focus:outline-none focus:border-amber-500"
          >
            {discos.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
            2. Meter Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setMeterType('prepaid')}
              className={`p-3.5 rounded-xl border text-center font-bold text-sm transition ${
                meterType === 'prepaid'
                  ? 'bg-amber-500/10 border-amber-500 text-amber-400'
                  : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              Prepaid (Token)
            </button>
            <button
              type="button"
              onClick={() => setMeterType('postpaid')}
              className={`p-3.5 rounded-xl border text-center font-bold text-sm transition ${
                meterType === 'postpaid'
                  ? 'bg-amber-500/10 border-amber-500 text-amber-400'
                  : 'bg-slate-900 border-slate-800 text-slate-400'
              }`}
            >
              Postpaid (Bill)
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
            3. Meter Number
          </label>
          <div className="relative">
            <Zap className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="e.g. 45012345678"
              value={meterNo}
              onChange={(e) => setMeterNo(e.target.value)}
              required
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-base font-medium placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
            4. Amount (₦)
          </label>
          <input
            type="number"
            placeholder="e.g. 2000"
            min="1000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full px-4 py-3.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-base font-semibold placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="pt-4 border-t border-slate-800/80">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-base flex items-center justify-center gap-2 disabled:opacity-50 transition shadow-xl"
          >
            {loading ? 'Processing Payment...' : 'Pay Electricity & Get Token'} <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
