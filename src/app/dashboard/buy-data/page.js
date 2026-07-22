'use client';

import { useState, useEffect } from 'react';
import { Wifi, Phone, Check, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

const networks = [
  { id: 'MTN', name: 'MTN', color: 'border-amber-400 text-amber-400 bg-amber-400/10' },
  { id: 'AIRTEL', name: 'Airtel', color: 'border-red-500 text-red-400 bg-red-500/10' },
  { id: 'GLO', name: 'Glo', color: 'border-emerald-500 text-emerald-400 bg-emerald-500/10' },
  { id: '9MOBILE', name: '9mobile', color: 'border-[#82c91e] text-[#82c91e] bg-[#82c91e]/10' },
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
        // Update local user wallet balance
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
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
          <Wifi className="w-8 h-8 text-emerald-400" /> Buy Data Bundles
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Select network, pick a plan, and enter phone number for instant delivery.
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
        {/* Step 1: Select Network */}
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
                  onClick={() => {
                    setSelectedNetwork(net.id);
                    setSelectedPlan(null);
                  }}
                  className={`p-4 rounded-2xl border text-center font-extrabold transition text-base ${
                    isSelected
                      ? `${net.color} border-2 shadow-lg shadow-emerald-950/40`
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {net.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Select Data Plan */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
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
                      ? 'bg-emerald-500/10 border-emerald-500 text-white shadow-md'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <p className="font-bold text-sm text-white">{plan.name}</p>
                    <p className="text-xs text-slate-400">Validity: {plan.validity}</p>
                  </div>
                  <span className="text-base font-extrabold text-emerald-400">₦{plan.price}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 3: Phone Number */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
            3. Recipient Phone Number
          </label>
          <div className="relative">
            <Phone className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="tel"
              placeholder="e.g. 08039579410"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-base font-medium placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Summary & Submit */}
        <div className="pt-4 border-t border-slate-800/80 space-y-4">
          {selectedPlan && (
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-slate-400">Total Amount:</span>
              <span className="text-2xl font-extrabold text-emerald-400">₦{selectedPlan.price}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-xl gradient-btn-primary text-slate-950 font-bold text-base flex items-center justify-center gap-2 disabled:opacity-50 transition shadow-xl"
          >
            {loading ? 'Processing Data Top-Up...' : 'Confirm & Buy Data'} <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
