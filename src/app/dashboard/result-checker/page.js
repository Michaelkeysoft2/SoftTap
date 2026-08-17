'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Copy, Check, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

const examTypes = [
  { id: 'WAEC', name: 'WAEC Result Checker', price: 3320, color: 'bg-blue-900', label: 'WAEC' },
  { id: 'NECO', name: 'NECO Result Token', price: 1170, color: 'bg-green-700', label: 'NECO' },
  { id: 'NABTEB', name: 'NABTEB Result Checker', price: 850, color: 'bg-red-700', label: 'NABTEB' },
  { id: 'NBAIS', name: 'NBAIS e-Pin', price: 920, color: 'bg-purple-700', label: 'NBAIS' },
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
        <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-900 flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-purple-600" /> Result Checker Pins
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Purchase WAEC, NECO, NABTEB &amp; NBAIS Result Checker Pins &amp; Tokens instantly.
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

      {/* Generated Pins Box */}
      {purchasedPins.length > 0 && (
        <div className="p-6 rounded-3xl bg-purple-50 border-2 border-purple-300 space-y-4 shadow-md">
          <h3 className="text-sm font-bold text-purple-800 uppercase tracking-wider text-center">Your Generated Pins</h3>
          <div className="space-y-2">
            {purchasedPins.map((p, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-white border border-purple-200 flex justify-between items-center text-sm font-mono shadow-sm">
                <div>
                  <p className="text-gray-600 text-xs">Serial: <span className="text-gray-900 font-bold">{p.serialNumber}</span></p>
                  <p className="text-gray-600 text-xs">PIN: <span className="text-purple-700 font-bold">{p.pin}</span></p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleBuy} className="bg-white p-6 sm:p-8 rounded-3xl space-y-6 border border-gray-200 shadow-sm">
        <div className="space-y-3">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            1. Select Examination Body
          </label>
          <div className="grid grid-cols-2 gap-3">
            {examTypes.map((exam) => {
              const isSelected = selectedExam.id === exam.id;
              return (
                <button
                  key={exam.id}
                  type="button"
                  onClick={() => setSelectedExam(exam)}
                  className={`p-4 rounded-2xl border flex items-center gap-3 transition ${
                    isSelected
                      ? 'border-orange-500 bg-orange-50 text-blue-900 border-2 shadow-sm'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl ${exam.color} flex items-center justify-center text-white font-bold text-xs shadow-sm`}>
                    {exam.label}
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-sm text-blue-900">{exam.id}</p>
                    <p className="text-xs font-extrabold text-orange-600">₦{exam.price.toLocaleString()}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            2. Quantity of Pins
          </label>
          <select
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 text-base font-medium focus:outline-none focus:border-orange-500"
          >
            {[1, 2, 3, 4, 5, 10].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'Pin' : 'Pins'}
              </option>
            ))}
          </select>
        </div>

        <div className="pt-4 border-t border-gray-100 space-y-4">
          <div className="flex justify-between items-center text-sm font-semibold">
            <span className="text-gray-500">Total Price:</span>
            <span className="text-2xl font-extrabold text-orange-600">
              ₦{(selectedExam.price * parseInt(quantity)).toLocaleString()}
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl btn-orange text-base flex items-center justify-center gap-2 disabled:opacity-50 transition shadow-lg"
          >
            {loading ? 'Generating Pins...' : 'Confirm & Purchase Pins'} <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
