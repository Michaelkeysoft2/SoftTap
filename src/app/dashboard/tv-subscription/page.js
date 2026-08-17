'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Tv, CreditCard, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

const tvProviders = [
  { 
    id: 'DSTV', 
    name: 'DSTV', 
    logo: '/logos/dstv.jpg',
    plans: [
      { name: 'DSTV Padi', price: 3600 }, 
      { name: 'DSTV Yanga', price: 5100 }, 
      { name: 'DSTV Confam', price: 9300 }, 
      { name: 'DSTV Compact', price: 15700 },
      { name: 'DSTV Compact Plus', price: 25000 },
      { name: 'DSTV Premium', price: 37000 }
    ] 
  },
  { 
    id: 'GOTV', 
    name: 'GOTV', 
    logo: '/logos/gotv.jpg',
    plans: [
      { name: 'GOTV Smallie', price: 1500 }, 
      { name: 'GOTV Jinja', price: 3300 }, 
      { name: 'GOTV Jolli', price: 4850 }, 
      { name: 'GOTV Max', price: 7200 }, 
      { name: 'GOTV Supa', price: 10500 },
      { name: 'GOTV Supa+', price: 15700 }
    ] 
  },
  { 
    id: 'STARTIMES', 
    name: 'StarTimes', 
    logo: null,
    plans: [
      { name: 'Nova Bouquet', price: 1700 }, 
      { name: 'Basic Bouquet', price: 3300 }, 
      { name: 'Smart Bouquet', price: 4300 }, 
      { name: 'Classic Bouquet', price: 5500 },
      { name: 'Super Bouquet', price: 7500 }
    ] 
  },
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
        <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-900 flex items-center gap-3">
          <Tv className="w-8 h-8 text-blue-600" /> Cable TV Subscription
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Renew & Subscribe your DSTV, GOTV, and StarTimes decoders instantly.
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

      <form onSubmit={handleSubscribe} className="bg-white p-6 sm:p-8 rounded-3xl space-y-6 border border-gray-200 shadow-sm">
        <div className="space-y-3">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            1. Select TV Provider
          </label>
          <div className="grid grid-cols-3 gap-3">
            {tvProviders.map((p) => {
              const isSelected = selectedProvider.id === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setSelectedProvider(p);
                    setSelectedPlan(p.plans[0]);
                  }}
                  className={`p-3 rounded-2xl border flex flex-col items-center gap-2 font-bold text-sm transition ${
                    isSelected
                      ? 'border-orange-500 bg-orange-50 text-blue-900 shadow-sm border-2'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm bg-white flex items-center justify-center p-1">
                    {p.logo ? (
                      <Image src={p.logo} alt={p.name} width={48} height={48} className="w-full h-full object-contain" />
                    ) : (
                      <div className="w-full h-full bg-red-600 rounded-lg flex items-center justify-center">
                        <svg viewBox="0 0 60 60" className="w-6 h-6">
                          <polygon points="30,5 37,22 55,22 41,34 46,52 30,40 14,52 19,34 5,22 23,22" fill="gold" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <span>{p.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            2. Choose Bouquet Package
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1">
            {selectedProvider.plans.map((plan, idx) => {
              const isSelected = selectedPlan?.name === plan.name;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedPlan(plan)}
                  className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition ${
                    isSelected
                      ? 'bg-orange-50 border-orange-500 text-blue-900 shadow-sm'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <span className="font-bold text-sm">{plan.name}</span>
                  <span className="font-extrabold text-orange-600 text-base">₦{plan.price.toLocaleString()}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            3. Smartcard / IUC Number
          </label>
          <div className="relative">
            <CreditCard className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="e.g. 1029384756"
              value={smartcardNo}
              onChange={(e) => setSmartcardNo(e.target.value)}
              required
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 text-base font-medium placeholder-gray-400 focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 space-y-4">
          {selectedPlan && (
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-gray-500">Bouquet Price:</span>
              <span className="text-2xl font-extrabold text-orange-600">₦{selectedPlan.price.toLocaleString()}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl btn-orange text-base flex items-center justify-center gap-2 disabled:opacity-50 transition shadow-lg"
          >
            {loading ? 'Processing Subscription...' : 'Confirm & Renew Subscription'} <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
