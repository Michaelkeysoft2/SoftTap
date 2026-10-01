'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  X, Check, AlertCircle, ShieldCheck, ArrowRight, Copy, 
  Wifi, Signal, Tv, Lightbulb, BookOpen, CreditCard, Sparkles 
} from 'lucide-react';

const networks = [
  { id: 'MTN', name: 'MTN', logo: '/logos/mtn.jpg' },
  { id: 'Airtel', name: 'Airtel', logo: '/logos/airtel.jpg' },
  { id: 'Glo', name: 'Glo', logo: '/logos/glo.jpg' },
  { id: '9mobile', name: '9mobile', logo: '/logos/9mobile.jpg' },
];

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
      { id: 'dstv_premium', name: 'DSTV Premium', price: 37000 }
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
      { id: 'gotv_supa', name: 'GOTV Supa+', price: 15700 }
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
      { id: 'st_classic', name: 'Classic Bouquet', price: 5500 },
      { id: 'st_super', name: 'Super Bouquet', price: 7500 }
    ]
  },
];

const discos = [
  { id: 'IKEDC', name: 'Ikeja Electric (IKEDC)', logo: '/logos/ikedc.svg' },
  { id: 'EKEDC', name: 'Eko Electric (EKEDC)', logo: '/logos/ekedc.svg' },
  { id: 'AEDC', name: 'Abuja Electric (AEDC)', logo: '/logos/aedc.svg' },
  { id: 'IBEDC', name: 'Ibadan Electric (IBEDC)', logo: '/logos/ibedc.svg' },
  { id: 'EEDC', name: 'Enugu Electric (EEDC)', logo: '/logos/eedc.svg' },
  { id: 'KEDCO', name: 'Kano Electric (KEDCO)', logo: '/logos/kedco.svg' },
  { id: 'PHED', name: 'Port Harcourt (PHED)', logo: '/logos/phed.svg' },
  { id: 'JED', name: 'Jos Electric (JED)', logo: '/logos/jed.svg' },
  { id: 'KAEDCO', name: 'Kaduna Electric (KAEDCO)', logo: '/logos/kaedco.svg' },
];

const examTypes = [
  { id: 'WAEC', name: 'WAEC Result Checker', price: 3320, logo: '/logos/waec.svg' },
  { id: 'NECO', name: 'NECO Result Token', price: 1170, logo: '/logos/neco.svg' },
  { id: 'NABTEB', name: 'NABTEB Result Checker', price: 850, logo: '/logos/nabteb.svg' },
  { id: 'NBAIS', name: 'NBAIS e-Pin', price: 920, logo: '/logos/nbais.svg' },
];

export default function QuickPurchaseModal({ isOpen, onClose, initialTab = 'data', initialData = {} }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  
  // Data state
  const [selectedNetwork, setSelectedNetwork] = useState(initialData.selectedNetwork || networks[0]);
  const [dataPlans, setDataPlans] = useState([]);
  const [fetchingPlans, setFetchingPlans] = useState(false);
  const [plansError, setPlansError] = useState('');
  const [selectedDataPlan, setSelectedDataPlan] = useState(initialData.selectedDataPlan || null);
  const [dataPhone, setDataPhone] = useState(initialData.dataPhone || '');

  // Airtime state
  const [airtimeNetwork, setAirtimeNetwork] = useState(initialData.airtimeNetwork || networks[0]);
  const [airtimePhone, setAirtimePhone] = useState(initialData.airtimePhone || '');
  const [airtimeAmount, setAirtimeAmount] = useState(initialData.airtimeAmount || '500');

  // TV state
  const [selectedTvProvider, setSelectedTvProvider] = useState(initialData.selectedTvProvider || tvProviders[0]);
  const [selectedTvPlan, setSelectedTvPlan] = useState(initialData.selectedTvPlan || tvProviders[0].plans[0]);
  const [smartcardNo, setSmartcardNo] = useState(initialData.smartcardNo || '');

  // Electricity state
  const [selectedDisco, setSelectedDisco] = useState(initialData.selectedDisco || discos[0]);
  const [meterType, setMeterType] = useState(initialData.meterType || 'prepaid');
  const [meterNo, setMeterNo] = useState(initialData.meterNo || '');
  const [electricityAmount, setElectricityAmount] = useState(initialData.electricityAmount || '2000');

  // Exam pin state
  const [selectedExam, setSelectedExam] = useState(initialData.selectedExam || examTypes[0]);
  const [pinQuantity, setPinQuantity] = useState(initialData.pinQuantity || 1);

  // Common customer info
  const [customerEmail, setCustomerEmail] = useState(initialData.customerEmail || '');
  
  // Transaction flow state
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [deliveryResult, setDeliveryResult] = useState(null);
  const [copied, setCopied] = useState(false);

  // Sync state when modal is opened or initialData changes
  useEffect(() => {
    if (isOpen) {
      if (initialTab) setActiveTab(initialTab);
      if (initialData.selectedNetwork) setSelectedNetwork(initialData.selectedNetwork);
      if (initialData.selectedDataPlan) setSelectedDataPlan(initialData.selectedDataPlan);
      if (initialData.dataPhone) setDataPhone(initialData.dataPhone);
      if (initialData.airtimeNetwork) setAirtimeNetwork(initialData.airtimeNetwork);
      if (initialData.airtimePhone) setAirtimePhone(initialData.airtimePhone);
      if (initialData.airtimeAmount) setAirtimeAmount(initialData.airtimeAmount);
      if (initialData.selectedTvProvider) setSelectedTvProvider(initialData.selectedTvProvider);
      if (initialData.selectedTvPlan) setSelectedTvPlan(initialData.selectedTvPlan);
      if (initialData.smartcardNo) setSmartcardNo(initialData.smartcardNo);
      if (initialData.selectedDisco) setSelectedDisco(initialData.selectedDisco);
      if (initialData.meterType) setMeterType(initialData.meterType);
      if (initialData.meterNo) setMeterNo(initialData.meterNo);
      if (initialData.electricityAmount) setElectricityAmount(initialData.electricityAmount);
      if (initialData.selectedExam) setSelectedExam(initialData.selectedExam);
      if (initialData.pinQuantity) setPinQuantity(initialData.pinQuantity);
      if (initialData.customerEmail) setCustomerEmail(initialData.customerEmail);
    }
  }, [isOpen, initialTab, initialData]);

  // Fetch live VTpass data plans whenever selected network or modal open status changes
  useEffect(() => {
    if (!isOpen) return;
    let isMounted = true;
    setFetchingPlans(true);
    setPlansError('');

    const netKey = (selectedNetwork.id || selectedNetwork.name || 'mtn').toLowerCase();
    fetch(`/api/data/plans?network=${encodeURIComponent(netKey)}`)
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (data.success && Array.isArray(data.plans) && data.plans.length > 0) {
          const mapped = data.plans.map((p) => ({
            id: p.variation_code,
            variation_code: p.variation_code,
            name: p.name,
            price: parseFloat(p.variation_amount),
            variation_amount: p.variation_amount,
            fixedPrice: p.fixedPrice,
          }));
          setDataPlans(mapped);
          setSelectedDataPlan((prev) => {
            if (prev) {
              const prevCode = prev.variation_code || prev.id;
              const found = mapped.find((p) => (p.variation_code || p.id) === prevCode);
              if (found) return found;
            }
            return mapped[0];
          });
        } else {
          setDataPlans([]);
          setSelectedDataPlan(null);
          setPlansError(data.message || 'No plans available');
        }
      })
      .catch(() => {
        if (!isMounted) return;
        setDataPlans([]);
        setSelectedDataPlan(null);
        setPlansError('Network error loading plans');
      })
      .finally(() => {
        if (isMounted) setFetchingPlans(false);
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, selectedNetwork]);

  if (!isOpen) return null;

  const handleNetworkChange = (net) => {
    setSelectedNetwork(net);
    setSelectedDataPlan(null);
  };

  const handleTvProviderChange = (provider) => {
    setSelectedTvProvider(provider);
    setSelectedTvPlan(provider.plans[0]);
  };

  const handleQuickCheckout = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    let payload = {
      serviceType: activeTab,
      customerEmail: customerEmail || 'guest@softtap.com',
    };

    if (activeTab === 'data') {
      if (!selectedDataPlan) {
        setErrorMsg('Please select a data bundle plan');
        setLoading(false);
        return;
      }
      if (!dataPhone || dataPhone.length < 11) {
        setErrorMsg('Please enter a valid 11-digit phone number');
        setLoading(false);
        return;
      }
      const planCode = selectedDataPlan.variation_code || selectedDataPlan.id;
      payload = {
        ...payload,
        network: selectedNetwork.name,
        phone: dataPhone,
        planId: planCode,
        planName: selectedDataPlan.name,
        amount: selectedDataPlan.price || Number(selectedDataPlan.variation_amount),
      };
    } else if (activeTab === 'airtime') {
      if (!airtimePhone || airtimePhone.length < 11) {
        setErrorMsg('Please enter a valid 11-digit phone number');
        setLoading(false);
        return;
      }
      if (!airtimeAmount || parseFloat(airtimeAmount) < 50) {
        setErrorMsg('Minimum airtime amount is ₦50');
        setLoading(false);
        return;
      }
      payload = {
        ...payload,
        network: airtimeNetwork.name,
        phone: airtimePhone,
        amount: parseFloat(airtimeAmount),
      };
    } else if (activeTab === 'tv') {
      if (!smartcardNo || smartcardNo.length < 8) {
        setErrorMsg('Please enter a valid Smartcard / IUC number');
        setLoading(false);
        return;
      }
      payload = {
        ...payload,
        provider: selectedTvProvider.name,
        smartcardNo: smartcardNo,
        planId: selectedTvPlan.id,
        planName: selectedTvPlan.name,
        amount: selectedTvPlan.price,
      };
    } else if (activeTab === 'electricity') {
      if (!meterNo || meterNo.length < 9) {
        setErrorMsg('Please enter a valid electricity meter number');
        setLoading(false);
        return;
      }
      if (!electricityAmount || parseFloat(electricityAmount) < 1000) {
        setErrorMsg('Minimum electricity payment is ₦1,000');
        setLoading(false);
        return;
      }
      payload = {
        ...payload,
        provider: selectedDisco.id,
        meterNo: meterNo,
        meterType: meterType,
        amount: parseFloat(electricityAmount),
      };
    } else if (activeTab === 'exam_pin') {
      const totalAmt = selectedExam.price * parseInt(pinQuantity);
      payload = {
        ...payload,
        examType: selectedExam.id,
        quantity: parseInt(pinQuantity),
        amount: totalAmt,
      };
    }

    try {
      const res = await fetch('/api/quick-purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setDeliveryResult(data);
      } else {
        setErrorMsg(data.message || 'Payment or delivery failed. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Network or service connection error.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetModal = () => {
    setDeliveryResult(null);
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden my-8 animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-blue-950 p-6 text-white flex justify-between items-center">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5" /> Instant Direct Checkout
            </div>
            <h2 className="text-xl sm:text-2xl font-black">Buy &amp; Subscribe Instantly</h2>
          </div>
          <button 
            onClick={resetModal}
            className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Successful Delivery Screen */}
        {deliveryResult ? (
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 mx-auto flex items-center justify-center shadow-inner">
              <ShieldCheck className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-2xl font-black text-gray-900">Payment &amp; Delivery Successful!</h3>
              <p className="text-sm text-gray-500 mt-1">{deliveryResult.message}</p>
              <p className="text-xs font-mono text-gray-400 mt-0.5">Ref: {deliveryResult.reference}</p>
            </div>

            {/* Generated Prepaid Token Code */}
            {deliveryResult.data?.token && (
              <div className="p-6 rounded-2xl bg-green-50 border-2 border-green-300 space-y-2 text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-green-800">Your 20-Digit Meter Token:</span>
                <div className="flex justify-between items-center bg-white p-3.5 rounded-xl border border-green-200 shadow-sm">
                  <span className="text-xl sm:text-2xl font-black font-mono text-green-700 tracking-wider">
                    {deliveryResult.data.token}
                  </span>
                  <button
                    onClick={() => handleCopy(deliveryResult.data.token)}
                    className="p-2 rounded-lg bg-green-100 hover:bg-green-200 text-green-700 transition"
                  >
                    {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-green-700">Type this token into your prepaid meter interface to load units.</p>
              </div>
            )}

            {/* Generated Exam PINs */}
            {deliveryResult.data?.pins && (
              <div className="p-5 rounded-2xl bg-purple-50 border border-purple-200 space-y-3 text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-800">Generated Exam PIN(s):</span>
                <div className="space-y-2">
                  {deliveryResult.data.pins.map((p, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-xl border border-purple-100 flex justify-between items-center text-xs font-mono shadow-sm">
                      <div>
                        <p className="text-gray-500">Serial: <span className="font-bold text-gray-900">{p.serialNumber}</span></p>
                        <p className="text-gray-500">PIN: <span className="font-bold text-purple-700 text-sm">{p.pin}</span></p>
                      </div>
                      <button
                        onClick={() => handleCopy(`Serial: ${p.serialNumber}, PIN: ${p.pin}`)}
                        className="p-1.5 rounded-lg bg-purple-100 text-purple-700 hover:bg-purple-200"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={resetModal}
              className="w-full py-4 rounded-xl btn-orange text-base font-bold shadow-lg"
            >
              Done / Make Another Purchase
            </button>
          </div>
        ) : (
          /* Purchase Form */
          <div className="p-6 sm:p-8 space-y-6">
            {/* Service Tabs */}
            <div className="flex overflow-x-auto gap-2 p-1.5 bg-gray-100 rounded-2xl border border-gray-200">
              {[
                { id: 'data', label: 'Data', icon: Wifi },
                { id: 'airtime', label: 'Airtime', icon: Signal },
                { id: 'tv', label: 'Cable TV', icon: Tv },
                { id: 'electricity', label: 'Electricity', icon: Lightbulb },
                { id: 'exam_pin', label: 'Exam PINs', icon: BookOpen },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab.id);
                      setErrorMsg('');
                    }}
                    className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 whitespace-nowrap transition ${
                      isActive 
                        ? 'bg-orange-500 text-white shadow-md' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/60'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleQuickCheckout} className="space-y-5">
              {/* ================= DATA TAB ================= */}
              {activeTab === 'data' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-2">1. Select Network</label>
                    <div className="grid grid-cols-4 gap-2">
                      {networks.map((net) => {
                        const isSelected = selectedNetwork.id === net.id;
                        return (
                          <button
                            key={net.id}
                            type="button"
                            onClick={() => handleNetworkChange(net)}
                            className={`p-2 rounded-xl border flex flex-col items-center gap-1.5 transition ${
                              isSelected ? 'border-orange-500 bg-orange-50 border-2' : 'bg-gray-50 border-gray-200'
                            }`}
                          >
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-white p-0.5 border border-gray-100">
                              <Image src={net.logo} alt={net.name} width={40} height={40} className="w-full h-full object-contain" />
                            </div>
                            <span className="text-[11px] font-bold text-gray-800">{net.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">2. Choose Data Plan</label>
                    <select
                      value={selectedDataPlan?.variation_code || selectedDataPlan?.id || ''}
                      onChange={(e) => {
                        const plan = dataPlans.find((p) => (p.variation_code || p.id) === e.target.value);
                        setSelectedDataPlan(plan || null);
                      }}
                      disabled={fetchingPlans || dataPlans.length === 0}
                      className="w-full px-3.5 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-800 focus:outline-none focus:border-orange-500"
                    >
                      {fetchingPlans ? (
                        <option value="">Loading plans from VTpass...</option>
                      ) : dataPlans.length === 0 ? (
                        <option value="">{plansError || 'No plans available'}</option>
                      ) : (
                        dataPlans.map((p) => (
                          <option key={p.variation_code || p.id} value={p.variation_code || p.id}>
                            {p.name} — ₦{Number(p.price || p.variation_amount).toLocaleString()}
                          </option>
                        ))
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">3. Phone Number</label>
                    <input
                      type="tel"
                      placeholder="e.g. 08012345678"
                      value={dataPhone}
                      onChange={(e) => setDataPhone(e.target.value)}
                      required
                      className="w-full px-3.5 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              )}

              {/* ================= AIRTIME TAB ================= */}
              {activeTab === 'airtime' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-2">1. Select Network</label>
                    <div className="grid grid-cols-4 gap-2">
                      {networks.map((net) => {
                        const isSelected = airtimeNetwork.id === net.id;
                        return (
                          <button
                            key={net.id}
                            type="button"
                            onClick={() => setAirtimeNetwork(net)}
                            className={`p-2 rounded-xl border flex flex-col items-center gap-1.5 transition ${
                              isSelected ? 'border-orange-500 bg-orange-50 border-2' : 'bg-gray-50 border-gray-200'
                            }`}
                          >
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-white p-0.5 border border-gray-100">
                              <Image src={net.logo} alt={net.name} width={40} height={40} className="w-full h-full object-contain" />
                            </div>
                            <span className="text-[11px] font-bold text-gray-800">{net.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">2. Phone Number</label>
                    <input
                      type="tel"
                      placeholder="e.g. 08012345678"
                      value={airtimePhone}
                      onChange={(e) => setAirtimePhone(e.target.value)}
                      required
                      className="w-full px-3.5 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">3. Amount (₦)</label>
                    <input
                      type="number"
                      placeholder="e.g. 500"
                      min="50"
                      value={airtimeAmount}
                      onChange={(e) => setAirtimeAmount(e.target.value)}
                      required
                      className="w-full px-3.5 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              )}

              {/* ================= CABLE TV TAB ================= */}
              {activeTab === 'tv' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-2">1. TV Provider</label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {tvProviders.map((p) => {
                        const isSelected = selectedTvProvider.id === p.id;
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => handleTvProviderChange(p)}
                            className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition ${
                              isSelected ? 'border-orange-500 bg-orange-50 border-2' : 'bg-gray-50 border-gray-200'
                            }`}
                          >
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-white p-1 border border-gray-100 flex items-center justify-center">
                              <Image src={p.logo} alt={p.name} width={48} height={48} className="w-full h-full object-contain" />
                            </div>
                            <span className="text-xs font-bold text-gray-800">{p.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">2. Choose Bouquet Plan</label>
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

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">3. Smartcard / IUC Number</label>
                    <input
                      type="text"
                      placeholder="e.g. 1029384756"
                      value={smartcardNo}
                      onChange={(e) => setSmartcardNo(e.target.value)}
                      required
                      className="w-full px-3.5 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              )}

              {/* ================= ELECTRICITY TAB ================= */}
              {activeTab === 'electricity' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-2">1. Select DISCO</label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 max-h-36 overflow-y-auto p-1">
                      {discos.map((d) => {
                        const isSelected = selectedDisco.id === d.id;
                        return (
                          <button
                            key={d.id}
                            type="button"
                            onClick={() => setSelectedDisco(d)}
                            className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition ${
                              isSelected ? 'border-orange-500 bg-orange-50 border-2' : 'bg-gray-50 border-gray-200'
                            }`}
                          >
                            <div className="w-8 h-8 rounded-lg overflow-hidden bg-white p-0.5 border border-gray-100">
                              <Image src={d.logo} alt={d.name} width={32} height={32} className="w-full h-full object-contain" />
                            </div>
                            <span className="text-[10px] font-bold text-gray-800 truncate w-full text-center">{d.id}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {['prepaid', 'postpaid'].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setMeterType(type)}
                        className={`py-2 px-3 rounded-xl text-xs font-bold capitalize border transition ${
                          meterType === type ? 'bg-orange-50 border-orange-500 text-blue-900 border-2' : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">2. Meter Number</label>
                    <input
                      type="text"
                      placeholder="e.g. 01429482910"
                      value={meterNo}
                      onChange={(e) => setMeterNo(e.target.value)}
                      required
                      className="w-full px-3.5 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">3. Amount (₦)</label>
                    <input
                      type="number"
                      min="1000"
                      placeholder="e.g. 2000"
                      value={electricityAmount}
                      onChange={(e) => setElectricityAmount(e.target.value)}
                      required
                      className="w-full px-3.5 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
              )}

              {/* ================= EXAM PINS TAB ================= */}
              {activeTab === 'exam_pin' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-2">1. Select Exam Body</label>
                    <div className="grid grid-cols-2 gap-2.5">
                      {examTypes.map((exam) => {
                        const isSelected = selectedExam.id === exam.id;
                        return (
                          <button
                            key={exam.id}
                            type="button"
                            onClick={() => setSelectedExam(exam)}
                            className={`p-3 rounded-xl border flex items-center gap-2.5 transition ${
                              isSelected ? 'border-orange-500 bg-orange-50 border-2' : 'bg-gray-50 border-gray-200'
                            }`}
                          >
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-white p-0.5 border border-gray-100 shrink-0">
                              <Image src={exam.logo} alt={exam.name} width={40} height={40} className="w-full h-full object-contain" />
                            </div>
                            <div className="text-left">
                              <p className="font-bold text-xs text-blue-900">{exam.id}</p>
                              <p className="text-xs font-black text-orange-600">₦{exam.price.toLocaleString()}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">2. Quantity of PINs</label>
                    <select
                      value={pinQuantity}
                      onChange={(e) => setPinQuantity(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-800 focus:outline-none focus:border-orange-500"
                    >
                      {[1, 2, 3, 4, 5, 10].map((n) => (
                        <option key={n} value={n}>
                          {n} {n === 1 ? 'PIN' : 'PINs'} — ₦{(selectedExam.price * n).toLocaleString()}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Email / Notification Receipt Input */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5">
                  Email Address for Receipt
                </label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-500"
                />
              </div>

              {/* Checkout Submit CTA */}
              <div className="pt-3 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl btn-orange text-base font-bold flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 transition"
                >
                  {loading ? (
                    'Processing Transaction...'
                  ) : (
                    <>
                      Pay &amp; Dispense Instantly <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
