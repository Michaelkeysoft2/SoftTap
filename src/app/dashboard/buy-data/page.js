'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Wifi, Phone, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

const networks = [
  { id: 'MTN', name: 'MTN', logo: '/logos/mtn.jpg', color: 'border-yellow-400 bg-yellow-50 text-yellow-800' },
  { id: 'AIRTEL', name: 'Airtel', logo: '/logos/airtel.jpg', color: 'border-red-400 bg-red-50 text-red-800' },
  { id: 'GLO', name: 'Glo', logo: '/logos/glo.jpg', color: 'border-green-400 bg-green-50 text-green-800' },
  { id: '9MOBILE', name: '9mobile', logo: '/logos/9mobile.jpg', color: 'border-emerald-400 bg-emerald-50 text-emerald-800' },
];

const dataPlans = {
  MTN: [
    { name: '500MB (SME)', price: 485, validity: '7days' },
    { name: '1GB (SME)', price: 776, validity: '7days' },
    { name: '1.5GB (SME)', price: 970, validity: '7days' },
    { name: '2GB (SME)', price: 1455, validity: '30days' },
    { name: '3.5GB (SME)', price: 2425, validity: '30days' },
    { name: '6GB (SME)', price: 2425, validity: '7days' },
    { name: '7GB (SME)', price: 3395, validity: '30days' },
    { name: '10GB (SME)', price: 4365, validity: '30days' },
    { name: '500MB (CG_LITE)', price: 109, validity: '30days' },
    { name: '1GB (CG_LITE)', price: 219, validity: '30days' },
    { name: '2GB (CG_LITE)', price: 438, validity: '30days' },
    { name: '3GB (CG_LITE)', price: 658, validity: '30days' },
    { name: '5GB (CG_LITE)', price: 1097, validity: '30days' },
    { name: '10GB (CG_LITE)', price: 2194, validity: '30days' },
  ],
  AIRTEL: [
    { name: '500MB (CG)', price: 487, validity: '7days' },
    { name: '1GB (CG)', price: 780, validity: '7days' },
    { name: '1.5GB (CG)', price: 975, validity: '7days' },
    { name: '2GB (CG)', price: 1462, validity: '30days' },
    { name: '3GB (CG)', price: 1950, validity: '30days' },
    { name: '4GB (CG)', price: 2437, validity: '30days' },
    { name: '6GB (CG)', price: 2437, validity: '7days' },
    { name: '10GB (CG)', price: 3900, validity: '30days' },
  ],
  GLO: [
    { name: '200MB (CG)', price: 83, validity: '14days' },
    { name: '500MB (CG)', price: 198, validity: '30days' },
    { name: '1GB (CG)', price: 395, validity: '30days' },
    { name: '3GB (CG)', price: 1185, validity: '30days' },
    { name: '5GB (CG)', price: 1975, validity: '30days' },
    { name: '10GB (CG)', price: 3950, validity: '30days' },
  ],
  '9MOBILE': [
    { name: '500MB (SME)', price: 180, validity: '30days' },
    { name: '1GB (SME)', price: 360, validity: '30days' },
    { name: '2GB (SME)', price: 720, validity: '30days' },
    { name: '10GB (SME)', price: 3600, validity: '30days' },
  ],
};

export default function BuyDataPage() {
  const [selectedNetwork, setSelectedNetwork] = useState('MTN');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [phone, setPhone] = useState('');
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

    if (!selectedPlan) {
      setStatusMsg({ type: 'error', text: 'Please select a data bundle plan' });
      return;
    }

    if (!phone || phone.length < 11) {
      setStatusMsg({ type: 'error', text: 'Please enter a valid 11-digit phone number' });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/data/buy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          network: selectedNetwork,
          phone,
          planName: selectedPlan.name,
          amount: selectedPlan.price,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatusMsg({ type: 'success', text: data.message });
        setPhone('');
        const updatedUser = { ...user, walletBalance: data.newBalance };
        setUser(updatedUser);
        localStorage.setItem('softtap_user', JSON.stringify(updatedUser));
      } else {
        setStatusMsg({ type: 'error', text: data.message || 'Data purchase failed' });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Transaction error occurred' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-900 flex items-center gap-3">
          <Wifi className="w-8 h-8 text-orange-500" /> Buy Data Bundles
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Select network, pick a plan, and enter phone number for instant delivery.
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
        {/* Step 1: Select Network */}
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
                  onClick={() => {
                    setSelectedNetwork(net.id);
                    setSelectedPlan(null);
                  }}
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

        {/* Step 2: Select Data Plan */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            2. Choose Data Plan ({selectedNetwork})
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
            {dataPlans[selectedNetwork]?.map((plan, idx) => {
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
                  <div>
                    <p className="font-bold text-sm text-blue-900">{plan.name}</p>
                    <p className="text-xs text-gray-500">Validity: {plan.validity}</p>
                  </div>
                  <span className="text-base font-extrabold text-orange-600">₦{plan.price}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 3: Phone Number */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            3. Recipient Phone Number
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

        {/* Summary & Submit */}
        <div className="pt-4 border-t border-gray-100 space-y-4">
          {selectedPlan && (
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-gray-500">Total Amount:</span>
              <span className="text-2xl font-extrabold text-orange-600">₦{selectedPlan.price}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl btn-orange text-base flex items-center justify-center gap-2 disabled:opacity-50 transition shadow-lg"
          >
            {loading ? 'Processing Data Top-Up...' : 'Confirm & Buy Data'} <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
