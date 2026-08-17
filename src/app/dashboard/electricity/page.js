'use client';

import { useState, useEffect } from 'react';
import { Lightbulb, Zap, ArrowRight, ShieldCheck, AlertCircle, Copy, Check } from 'lucide-react';

const discos = [
  { id: 'IKEDC', name: 'Ikeja Electric (IKEDC)', color: 'bg-yellow-500' },
  { id: 'EKEDC', name: 'Eko Electric (EKEDC)', color: 'bg-blue-600' },
  { id: 'AEDC', name: 'Abuja Electric (AEDC)', color: 'bg-red-600' },
  { id: 'IBEDC', name: 'Ibadan Electric (IBEDC)', color: 'bg-green-600' },
  { id: 'KEDCO', name: 'Kano Electric (KEDCO)', color: 'bg-purple-600' },
  { id: 'PHED', name: 'Port Harcourt (PHED)', color: 'bg-teal-600' },
  { id: 'JED', name: 'Jos Electric (JED)', color: 'bg-indigo-600' },
  { id: 'KAEDCO', name: 'Kaduna Electric (KAEDCO)', color: 'bg-orange-600' },
];

export default function ElectricityPage() {
  const [selectedDisco, setSelectedDisco] = useState('IBEDC');
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
        <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-900 flex items-center gap-3">
          <Lightbulb className="w-8 h-8 text-yellow-500" /> Pay Electricity Bills
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Instant prepaid meter tokens &amp; bill payments for all DISCOs in Nigeria.
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

      {/* Generated Token Alert */}
      {generatedToken && (
        <div className="p-6 rounded-3xl bg-green-50 border-2 border-green-400 space-y-3 shadow-md animate-in slide-in-from-top">
          <p className="text-xs font-bold text-green-700 uppercase tracking-wider">Your Prepaid Meter Token</p>
          <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-green-200">
            <span className="text-xl sm:text-2xl font-black font-mono text-green-700 tracking-wider">
              {generatedToken}
            </span>
            <button
              onClick={handleCopyToken}
              className="p-2 rounded-lg bg-green-100 hover:bg-green-200 text-green-700 transition"
              title="Copy Token"
            >
              {copiedToken ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
          <p className="text-xs text-green-700">Enter this 20-digit token into your prepaid meter to recharge units.</p>
        </div>
      )}

      <form onSubmit={handlePay} className="bg-white p-6 sm:p-8 rounded-3xl space-y-6 border border-gray-200 shadow-sm">
        <div className="space-y-3">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            1. Select Electricity DISCO
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {discos.map((d) => {
              const isSelected = selectedDisco === d.id;
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setSelectedDisco(d.id)}
                  className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition font-bold text-xs ${
                    isSelected
                      ? 'border-orange-500 bg-orange-50 text-blue-900 shadow-sm border-2'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg ${d.color} flex items-center justify-center text-white shadow-sm`}>
                    <Zap className="w-4 h-4" />
                  </div>
                  <span className="truncate w-full text-center">{d.id}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            2. Meter Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            {['prepaid', 'postpaid'].map((type) => {
              const isSelected = meterType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setMeterType(type)}
                  className={`p-3.5 rounded-xl border text-center font-bold text-sm capitalize transition ${
                    isSelected
                      ? 'bg-orange-50 border-orange-500 text-blue-900 border-2 shadow-sm'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {type} Meter
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            3. Meter Number
          </label>
          <input
            type="text"
            placeholder="e.g. 01429482910"
            value={meterNo}
            onChange={(e) => setMeterNo(e.target.value)}
            required
            className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 text-base font-medium placeholder-gray-400 focus:outline-none focus:border-orange-500"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            4. Payment Amount (₦)
          </label>
          <input
            type="number"
            min="1000"
            placeholder="e.g. 3000 (Min: ₦1,000)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 text-base font-medium placeholder-gray-400 focus:outline-none focus:border-orange-500"
          />
        </div>

        <div className="pt-4 border-t border-gray-100 space-y-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl btn-orange text-base flex items-center justify-center gap-2 disabled:opacity-50 transition shadow-lg"
          >
            {loading ? 'Generating Electricity Token...' : 'Confirm & Pay Electricity'} <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
