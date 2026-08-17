'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Signal, Phone, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

const networks = [
  { id: 'MTN', name: 'MTN', logo: '/logos/mtn.jpg', color: 'border-yellow-400 bg-yellow-50 text-yellow-800' },
  { id: 'AIRTEL', name: 'Airtel', logo: '/logos/airtel.jpg', color: 'border-red-400 bg-red-50 text-red-800' },
  { id: 'GLO', name: 'Glo', logo: '/logos/glo.jpg', color: 'border-green-400 bg-green-50 text-green-800' },
  { id: '9MOBILE', name: '9mobile', logo: '/logos/9mobile.jpg', color: 'border-emerald-400 bg-emerald-50 text-emerald-800' },
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
        <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-900 flex items-center gap-3">
          <Signal className="w-8 h-8 text-green-600" /> Buy Airtime Top-Up
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Instant recharge for MTN, Airtel, Glo, and 9mobile at wholesale rates.
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

      <form onSubmit={handlePurchase} className="bg-white p-6 sm:p-8 rounded-3xl space-y-6 border border-gray-200 shadow-sm">
        <div className="space-y-3">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
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
                  className={`p-3 rounded-2xl border flex flex-col items-center gap-2 transition font-bold text-sm ${
                    isSelected
                      ? `${net.color} border-2 shadow-md`
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm bg-white p-1">
                    <Image src={net.logo} alt={net.name} width={48} height={48} className="w-full h-full object-contain" />
                  </div>
                  <span>{net.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            2. Recipient Phone Number
          </label>
          <div className="relative">
            <Phone className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              placeholder="e.g. 08039579410"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 text-base font-medium placeholder-gray-400 focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            3. Airtime Amount (₦)
          </label>
          <input
            type="number"
            min="50"
            max="50000"
            placeholder="e.g. 500"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 text-base font-medium placeholder-gray-400 focus:outline-none focus:border-orange-500"
          />
          <div className="flex gap-2 pt-1">
            {[100, 200, 500, 1000, 2000].map((quickAmt) => (
              <button
                key={quickAmt}
                type="button"
                onClick={() => setAmount(quickAmt.toString())}
                className="px-3 py-1.5 rounded-lg bg-gray-100 border border-gray-200 text-xs font-bold text-gray-700 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition"
              >
                ₦{quickAmt}
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
            {loading ? 'Recharging Airtime...' : 'Confirm & Recharge Airtime'} <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
