'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Copy, Check, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

const examTypes = [
  { id: 'WAEC', name: 'WAEC Result Checker', price: 3320 },
  { id: 'NECO', name: 'NECO Result Token', price: 1170 },
  { id: 'NABTEB', name: 'NABTEB Result Checker', price: 850 },
  { id: 'NBAIS', name: 'NBAIS e-Pin', price: 920 },
];

export default function ResultCheckerPage() {
  const [selectedExam, setSelectedExam] = useState(examTypes[0]);
  const [quantity, setQuantity] = useState(1);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
  const [purchasedPins, setPurchasedPins] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('softtap_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleBuy = async (e) => {
    e.preventDefault();
    setStatusMsg({ type: '', text: '' });
    setPurchasedPins([]);

    const totalAmount = selectedExam.price * parseInt(quantity);
    setLoading(true);

    try {
      const res = await fetch('/api/pins/buy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          examType: selectedExam.id,
          quantity: parseInt(quantity),
          amount: totalAmount,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatusMsg({ type: 'success', text: data.message });
        setPurchasedPins(data.pins || []);
        const updatedUser = { ...user, walletBalance: data.newBalance };
        setUser(updatedUser);
        localStorage.setItem('softtap_user', JSON.stringify(updatedUser));
      } else {
        setStatusMsg({ type: 'error', text: data.message || 'Pin purchase failed' });
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
          <BookOpen className="w-8 h-8 text-pink-400" /> Result Checker Pins
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Purchase WAEC, NECO, NABTEB & NBAIS Result Checker Pins & Tokens instantly.
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

      {/* Generated Pins Box */}
      {purchasedPins.length > 0 && (
        <div className="p-6 rounded-3xl bg-pink-500/10 border border-pink-500/30 space-y-4">
          <h3 className="text-sm font-bold text-pink-400 uppercase tracking-wider text-center">Your Generated Pins</h3>
          <div className="space-y-2">
            {purchasedPins.map((p, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center text-sm font-mono">
                <div>
                  <p className="text-slate-400 text-xs">Serial: <span className="text-white font-bold">{p.serialNumber}</span></p>
                  <p className="text-slate-400 text-xs">PIN: <span className="text-pink-400 font-bold">{p.pin}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleBuy} className="glass-panel p-6 sm:p-8 rounded-3xl space-y-6 border border-slate-800">
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
            1. Select Exam Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            {examTypes.map((exam) => (
              <button
                key={exam.id}
                type="button"
                onClick={() => setSelectedExam(exam)}
                className={`p-4 rounded-2xl border text-center font-bold transition text-sm flex flex-col items-center gap-1 ${
                  selectedExam.id === exam.id
                    ? 'bg-pink-500/10 border-pink-500 text-pink-400 shadow-lg'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300'
                }`}
              >
                <span>{exam.name}</span>
                <span className="text-xs text-slate-400 font-normal">₦{exam.price}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
            2. Quantity
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className="w-full px-4 py-3.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-bold text-base focus:outline-none focus:border-pink-500"
          />
        </div>

        <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-4">
          <div className="flex justify-between items-center text-sm font-semibold">
            <span className="text-slate-400">Total Price:</span>
            <span className="text-2xl font-extrabold text-pink-400">
              ₦{(selectedExam.price * (parseInt(quantity) || 1)).toLocaleString()}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-slate-950 font-bold text-base flex items-center justify-center gap-2 disabled:opacity-50 transition shadow-xl"
          >
            {loading ? 'Generating Pins...' : 'Purchase Pins Now'} <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
