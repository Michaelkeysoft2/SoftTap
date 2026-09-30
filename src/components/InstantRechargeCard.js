'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  Wifi, Signal, Tv, Lightbulb, BookOpen, ArrowRight, 
  ShieldCheck, Zap, Sparkles, Check 
} from 'lucide-react';

const networks = [
  { id: 'MTN', name: 'MTN', logo: '/logos/mtn.jpg', color: 'border-amber-400 bg-amber-50 text-amber-900' },
  { id: 'Airtel', name: 'Airtel', logo: '/logos/airtel.jpg', color: 'border-red-400 bg-red-50 text-red-900' },
  { id: 'Glo', name: 'Glo', logo: '/logos/glo.jpg', color: 'border-green-400 bg-green-50 text-green-900' },
  { id: '9mobile', name: '9mobile', logo: '/logos/9mobile.jpg', color: 'border-emerald-400 bg-emerald-50 text-emerald-900' },
];

const dataPlans = {
  MTN: [
    { id: 'mtn_sme_500mb', name: '500MB SME (30 Days)', price: 160 },
    { id: 'mtn_sme_1gb', name: '1GB SME (30 Days)', price: 290 },
    { id: 'mtn_sme_2gb', name: '2GB SME (30 Days)', price: 580 },
    { id: 'mtn_sme_3gb', name: '3GB SME (30 Days)', price: 870 },
    { id: 'mtn_sme_5gb', name: '5GB SME (30 Days)', price: 1450 },
    { id: 'mtn_sme_10gb', name: '10GB SME (30 Days)', price: 2900 },
  ],
  Airtel: [
    { id: 'airtel_cg_500mb', name: '500MB Corporate (30 Days)', price: 180 },
    { id: 'airtel_cg_1gb', name: '1GB Corporate (30 Days)', price: 320 },
    { id: 'airtel_cg_2gb', name: '2GB Corporate (30 Days)', price: 640 },
    { id: 'airtel_cg_5gb', name: '5GB Corporate (30 Days)', price: 1600 },
  ],
  Glo: [
    { id: 'glo_cg_1gb', name: '1GB Corporate (30 Days)', price: 280 },
    { id: 'glo_cg_2gb', name: '2GB Corporate (30 Days)', price: 560 },
    { id: 'glo_cg_5gb', name: '5GB Corporate (30 Days)', price: 1400 },
  ],
  '9mobile': [
    { id: '9mob_sme_1gb', name: '1GB SME (30 Days)', price: 260 },
    { id: '9mob_sme_2gb', name: '2GB SME (30 Days)', price: 520 },
    { id: '9mob_sme_5gb', name: '5GB SME (30 Days)', price: 1300 },
  ]
};

const tvProviders = [
  { 
    id: 'DSTV', 
    name: 'DSTV', 
    logo: '/logos/dstv.jpg',
    plans: [
      { id: 'dstv_padi', name: 'DSTV Padi', price: 3600 },
      { id: 'dstv_yanga', name: 'DSTV Yanga', price: 5100 },
      { id: 'dstv_confam', name: 'DSTV Confam', price: 9300 },
      { id: 'dstv_compact', name: 'DSTV Compact', price: 15700 },
    ]
  },
  { 
    id: 'GOTV', 
    name: 'GOTV', 
    logo: '/logos/gotv.jpg',
    plans: [
      { id: 'gotv_smallie', name: 'GOTV Smallie', price: 1500 },
      { id: 'gotv_jinja', name: 'GOTV Jinja', price: 3300 },
      { id: 'gotv_jolli', name: 'GOTV Jolli', price: 4850 },
      { id: 'gotv_max', name: 'GOTV Max', price: 7200 },
    ]
  },
  { 
    id: 'STARTIMES', 
    name: 'StarTimes', 
    logo: '/logos/startimes.svg',
    plans: [
      { id: 'st_nova', name: 'Nova Bouquet', price: 1700 },
      { id: 'st_basic', name: 'Basic Bouquet', price: 3300 },
      { id: 'st_smart', name: 'Smart Bouquet', price: 4300 },
    ]
  },
];

const discos = [
  { id: 'IKEDC', name: 'Ikeja Electric (IKEDC)' },
  { id: 'EKEDC', name: 'Eko Electric (EKEDC)' },
  { id: 'AEDC', name: 'Abuja Electric (AEDC)' },
  { id: 'IBEDC', name: 'Ibadan Electric (IBEDC)' },
  { id: 'EEDC', name: 'Enugu Electric (EEDC)' },
  { id: 'KEDCO', name: 'Kano Electric (KEDCO)' },
  { id: 'PHED', name: 'Port Harcourt (PHED)' },
];

const examTypes = [
  { id: 'WAEC', name: 'WAEC Result Checker', price: 3320 },
  { id: 'NECO', name: 'NECO Result Token', price: 1170 },
  { id: 'NABTEB', name: 'NABTEB Result Checker', price: 850 },
  { id: 'NBAIS', name: 'NBAIS e-Pin', price: 920 },
];

export default function InstantRechargeCard({ onProceed }) {
  const [activeTab, setActiveTab] = useState('data');

  // Data state
  const [selectedNetwork, setSelectedNetwork] = useState(networks[0]);
  const [selectedDataPlan, setSelectedDataPlan] = useState(dataPlans.MTN[1]);
  const [dataPhone, setDataPhone] = useState('');

  // Airtime state
  const [airtimeNetwork, setAirtimeNetwork] = useState(networks[0]);
  const [airtimePhone, setAirtimePhone] = useState('');
  const [airtimeAmount, setAirtimeAmount] = useState('500');

  // TV state
  const [selectedTvProvider, setSelectedTvProvider] = useState(tvProviders[0]);
  const [selectedTvPlan, setSelectedTvPlan] = useState(tvProviders[0].plans[0]);
  const [smartcardNo, setSmartcardNo] = useState('');

  // Electricity state
  const [selectedDisco, setSelectedDisco] = useState(discos[0]);
  const [meterType, setMeterType] = useState('prepaid');
  const [meterNo, setMeterNo] = useState('');
  const [electricityAmount, setElectricityAmount] = useState('2000');

  // Exam state
  const [selectedExam, setSelectedExam] = useState(examTypes[0]);
  const [pinQuantity, setPinQuantity] = useState(1);
  const [customerEmail, setCustomerEmail] = useState('');

  const handleNetworkChange = (net) => {
    setSelectedNetwork(net);
    const plans = dataPlans[net.id] || [];
    setSelectedDataPlan(plans[0] || null);
  };

  const handleTvProviderChange = (prov) => {
    setSelectedTvProvider(prov);
    setSelectedTvPlan(prov.plans[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onProceed) {
      onProceed({
        tab: activeTab,
        data: {
          selectedNetwork,
          selectedDataPlan,
          dataPhone,
          airtimeNetwork,
          airtimePhone,
          airtimeAmount,
          selectedTvProvider,
          selectedTvPlan,
          smartcardNo,
          selectedDisco,
          meterType,
          meterNo,
          electricityAmount,
          selectedExam,
          pinQuantity,
          customerEmail,
        }
      });
    }
  };

  return (
    <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border-2 border-orange-500/20 text-gray-800 overflow-hidden relative z-20">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 p-4 text-white flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center shadow-md">
            <Zap className="w-4 h-4 text-white fill-white" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm sm:text-base leading-tight flex items-center gap-1.5">
              Direct Quick Recharge
              <span className="bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-500/30">
                LIVE
              </span>
            </h3>
            <p className="text-[11px] text-gray-300">Instant Automated Delivery • No Account Needed</p>
          </div>
        </div>
      </div>

      {/* Service Tabs */}
      <div className="grid grid-cols-5 bg-gray-50 border-b border-gray-200 p-1.5 gap-1 text-center">
        {[
          { id: 'data', label: 'Data', icon: Wifi },
          { id: 'airtime', label: 'Airtime', icon: Signal },
          { id: 'tv', label: 'TV', icon: Tv },
          { id: 'electricity', label: 'Power', icon: Lightbulb },
          { id: 'exam', label: 'Pins', icon: BookOpen },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 rounded-xl flex flex-col items-center gap-1 text-xs font-bold transition-all touch-manipulation ${
                isActive
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30 scale-[1.02]'
                  : 'text-gray-600 hover:text-orange-600 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[11px]">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
        {/* DATA TAB */}
        {activeTab === 'data' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            {/* Network Selector */}
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                1. Select Network
              </label>
              <div className="grid grid-cols-4 gap-2">
                {networks.map((net) => (
                  <button
                    key={net.id}
                    type="button"
                    onClick={() => handleNetworkChange(net)}
                    className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition touch-manipulation ${
                      selectedNetwork.id === net.id
                        ? 'border-orange-500 bg-orange-50/70 shadow-sm ring-2 ring-orange-500/20'
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-100">
                      <Image src={net.logo} alt={net.name} width={32} height={32} className="w-full h-full object-contain" />
                    </div>
                    <span className="text-[11px] font-bold text-gray-800">{net.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Plan Selector */}
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                2. Select Data Bundle
              </label>
              <select
                value={selectedDataPlan?.id || ''}
                onChange={(e) => {
                  const plan = (dataPlans[selectedNetwork.id] || []).find((p) => p.id === e.target.value);
                  setSelectedDataPlan(plan);
                }}
                className="w-full px-3.5 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-800 focus:outline-none focus:border-orange-500"
              >
                {(dataPlans[selectedNetwork.id] || []).map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name} — ₦{plan.price.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                3. Recipient Phone Number
              </label>
              <input
                type="tel"
                inputMode="numeric"
                maxLength={11}
                placeholder="e.g. 08012345678"
                value={dataPhone}
                onChange={(e) => setDataPhone(e.target.value.replace(/\D/g, ''))}
                required
                className="w-full px-3.5 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
        )}

        {/* AIRTIME TAB */}
        {activeTab === 'airtime' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                1. Select Network
              </label>
              <div className="grid grid-cols-4 gap-2">
                {networks.map((net) => (
                  <button
                    key={net.id}
                    type="button"
                    onClick={() => setAirtimeNetwork(net)}
                    className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition touch-manipulation ${
                      airtimeNetwork.id === net.id
                        ? 'border-orange-500 bg-orange-50/70 shadow-sm ring-2 ring-orange-500/20'
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-100">
                      <Image src={net.logo} alt={net.name} width={32} height={32} className="w-full h-full object-contain" />
                    </div>
                    <span className="text-[11px] font-bold text-gray-800">{net.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                2. Phone Number
              </label>
              <input
                type="tel"
                inputMode="numeric"
                maxLength={11}
                placeholder="e.g. 08012345678"
                value={airtimePhone}
                onChange={(e) => setAirtimePhone(e.target.value.replace(/\D/g, ''))}
                required
                className="w-full px-3.5 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-800 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                3. Amount (₦)
              </label>
              <input
                type="number"
                inputMode="numeric"
                min="50"
                placeholder="Amount (Min ₦50)"
                value={airtimeAmount}
                onChange={(e) => setAirtimeAmount(e.target.value)}
                required
                className="w-full px-3.5 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-800 focus:outline-none focus:border-orange-500"
              />
              <div className="flex gap-2 pt-2">
                {[100, 200, 500, 1000, 2000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAirtimeAmount(amt.toString())}
                    className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-orange-50 hover:text-orange-600 text-xs font-bold text-gray-700 transition"
                  >
                    ₦{amt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TV TAB */}
        {activeTab === 'tv' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                1. Cable Provider
              </label>
              <div className="grid grid-cols-3 gap-2">
                {tvProviders.map((prov) => (
                  <button
                    key={prov.id}
                    type="button"
                    onClick={() => handleTvProviderChange(prov)}
                    className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition ${
                      selectedTvProvider.id === prov.id
                        ? 'border-orange-500 bg-orange-50/70 shadow-sm ring-2 ring-orange-500/20'
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg overflow-hidden border border-gray-100">
                      <Image src={prov.logo} alt={prov.name} width={32} height={32} className="w-full h-full object-contain" />
                    </div>
                    <span className="text-[11px] font-bold text-gray-800">{prov.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                2. Smartcard / IUC Number
              </label>
              <input
                type="text"
                placeholder="Enter Decoder / Smartcard No."
                value={smartcardNo}
                onChange={(e) => setSmartcardNo(e.target.value)}
                required
                className="w-full px-3.5 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-800 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                3. Bouquet Package
              </label>
              <select
                value={selectedTvPlan?.id || ''}
                onChange={(e) => {
                  const plan = selectedTvProvider.plans.find((p) => p.id === e.target.value);
                  setSelectedTvPlan(plan);
                }}
                className="w-full px-3.5 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-800 focus:outline-none focus:border-orange-500"
              >
                {selectedTvProvider.plans.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — ₦{p.price.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* ELECTRICITY TAB */}
        {activeTab === 'electricity' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                1. Electricity Disco
              </label>
              <select
                value={selectedDisco.id}
                onChange={(e) => {
                  const disco = discos.find((d) => d.id === e.target.value);
                  setSelectedDisco(disco);
                }}
                className="w-full px-3.5 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-800 focus:outline-none focus:border-orange-500"
              >
                {discos.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                2. Meter Number
              </label>
              <input
                type="text"
                placeholder="Enter Meter Number"
                value={meterNo}
                onChange={(e) => setMeterNo(e.target.value)}
                required
                className="w-full px-3.5 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-800 focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                3. Amount (₦)
              </label>
              <input
                type="number"
                min="500"
                placeholder="e.g. 2000"
                value={electricityAmount}
                onChange={(e) => setElectricityAmount(e.target.value)}
                required
                className="w-full px-3.5 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-800 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
        )}

        {/* EXAM TAB */}
        {activeTab === 'exam' && (
          <div className="space-y-4 animate-in fade-in duration-200">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                1. Exam Body
              </label>
              <div className="grid grid-cols-2 gap-2">
                {examTypes.map((ex) => (
                  <button
                    key={ex.id}
                    type="button"
                    onClick={() => setSelectedExam(ex)}
                    className={`p-3 rounded-xl border text-left transition ${
                      selectedExam.id === ex.id
                        ? 'border-orange-500 bg-orange-50/70 shadow-sm ring-2 ring-orange-500/20'
                        : 'border-gray-200 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <p className="text-xs font-black text-blue-900">{ex.name}</p>
                    <p className="text-xs font-bold text-orange-600">₦{ex.price.toLocaleString()}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                2. Email Address (To receive Pin)
              </label>
              <input
                type="email"
                placeholder="e.g. yourname@gmail.com"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                required
                className="w-full px-3.5 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-800 focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
        )}

        {/* Bottom Action Bar */}
        <div className="pt-2 border-t border-gray-100">
          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500 hover:from-orange-600 hover:to-orange-700 text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30 transition transform active:scale-98 touch-manipulation"
          >
            <Zap className="w-5 h-5 fill-white" />
            {activeTab === 'data' && `Pay & Deliver Data (₦${(selectedDataPlan?.price || 0).toLocaleString()})`}
            {activeTab === 'airtime' && `Recharge Airtime (₦${(parseFloat(airtimeAmount) || 0).toLocaleString()})`}
            {activeTab === 'tv' && `Renew TV Bouquet (₦${(selectedTvPlan?.price || 0).toLocaleString()})`}
            {activeTab === 'electricity' && `Generate Token (₦${(parseFloat(electricityAmount) || 0).toLocaleString()})`}
            {activeTab === 'exam' && `Buy Pin Now (₦${(selectedExam.price * pinQuantity).toLocaleString()})`}
            <ArrowRight className="w-5 h-5" />
          </button>

          <p className="text-center text-[11px] text-gray-400 mt-2.5 flex items-center justify-center gap-1.5 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
            Instant Fulfillment • Pay with Card, USSD or Transfer
          </p>
        </div>
      </form>
    </div>
  );
}
