'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Tv, CreditCard, ArrowRight, ShieldCheck, AlertCircle, Loader2, ChevronDown, Check, Search } from 'lucide-react';

const tvProviders = [
  { id: 'dstv', name: 'DSTV', logo: '/logos/dstv.jpg' },
  { id: 'gotv', name: 'GOTV', logo: '/logos/gotv.jpg' },
  { id: 'startimes', name: 'StarTimes', logo: '/logos/startimes.svg' },
];

export default function TVSubscriptionPage() {
  const [selectedProvider, setSelectedProvider] = useState(tvProviders[0]);
  const [plans, setPlans] = useState([]);
  const [fetchingPlans, setFetchingPlans] = useState(false);
  const [plansError, setPlansError] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [smartcardNo, setSmartcardNo] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
  const dropdownRef = useRef(null);

  useEffect(() => {
    const stored = localStorage.getItem('softtap_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fetch live TV bouquets from backend when selected provider changes
  useEffect(() => {
    let isMounted = true;
    setSelectedPlan(null);
    setIsDropdownOpen(false);
    setSearchTerm('');
    setFetchingPlans(true);
    setPlansError('');

    fetch(`/api/tv/plans?serviceID=${encodeURIComponent(selectedProvider.id)}`)
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (data.success && Array.isArray(data.plans)) {
          setPlans(data.plans);
          if (data.plans.length > 0) {
            setSelectedPlan(data.plans[0]);
          }
        } else {
          setPlans([]);
          setPlansError(data.message || 'Failed to load bouquets from VTpass');
        }
      })
      .catch(() => {
        if (!isMounted) return;
        setPlans([]);
        setPlansError('Network error loading TV bouquets');
      })
      .finally(() => {
        if (isMounted) setFetchingPlans(false);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedProvider]);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setStatusMsg({ type: '', text: '' });

    if (!selectedPlan) {
      setStatusMsg({ type: 'error', text: 'Please select a bouquet package' });
      return;
    }

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
          provider: selectedProvider.id,
          smartcardNo,
          planName: selectedPlan.name,
          planId: selectedPlan.variation_code,
          amount: parseFloat(selectedPlan.variation_amount || 0),
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
          Renew & Subscribe your DSTV, GOTV, and StarTimes decoders instantly at official retail rates.
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
        {/* Step 1: Provider Selection */}
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
                  }}
                  className={`p-3 rounded-2xl border flex flex-col items-center gap-2 font-bold text-sm transition cursor-pointer ${
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

        {/* Step 2: Bouquet Dropdown Selection */}
        <div className="space-y-3" ref={dropdownRef}>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
            2. Choose Bouquet Package ({selectedProvider.name})
          </label>

          {fetchingPlans && (
            <div className="p-4 text-center text-sm text-gray-500 flex items-center justify-center gap-2 bg-gray-50 rounded-2xl border border-gray-200">
              <Loader2 className="w-5 h-5 animate-spin text-orange-500" />
              <span>Loading live {selectedProvider.name} bouquets from VTpass...</span>
            </div>
          )}

          {plansError && !fetchingPlans && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{plansError}</span>
            </div>
          )}

          {!fetchingPlans && !plansError && plans.length === 0 && (
            <div className="p-4 text-center text-xs text-gray-500 bg-gray-50 rounded-2xl border border-gray-200">
              No bouquet packages currently available for {selectedProvider.name}.
            </div>
          )}

          {!fetchingPlans && plans.length > 0 && (
            <div className="relative">
              {/* Dropdown Trigger Button */}
              <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition cursor-pointer ${
                  isDropdownOpen
                    ? 'border-orange-500 ring-2 ring-orange-200 bg-white'
                    : selectedPlan
                    ? 'border-orange-400 bg-orange-50/50'
                    : 'border-gray-200 bg-gray-50 hover:bg-gray-100/70'
                }`}
              >
                <div className="flex-1 pr-2 min-w-0">
                  {selectedPlan ? (
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-sm text-blue-950 truncate">
                        {selectedPlan.name}
                      </span>
                      <span className="text-sm font-extrabold text-orange-600 shrink-0">
                        ₦{parseFloat(selectedPlan.variation_amount || 0).toLocaleString()}
                      </span>
                    </div>
                  ) : (
                    <span className="text-gray-400 text-sm">Select a bouquet package...</span>
                  )}
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${
                    isDropdownOpen ? 'rotate-180 text-orange-500' : ''
                  }`}
                />
              </button>

              {/* Collapsible Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute z-30 mt-2 w-full bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                  {/* Search / Filter Input */}
                  <div className="p-2 border-b border-gray-100 bg-gray-50/70">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search bouquet (e.g. Padi, Compact, Max)..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-gray-200 bg-white text-gray-800 focus:outline-none focus:border-orange-500"
                        autoFocus
                      />
                    </div>
                  </div>

                  {/* Scrollable Options List */}
                  <div className="max-h-60 overflow-y-auto divide-y divide-gray-50">
                    {plans
                      .filter((p) => {
                        if (!searchTerm.trim()) return true;
                        const term = searchTerm.toLowerCase();
                        return (
                          p.name?.toLowerCase().includes(term) ||
                          p.variation_code?.toLowerCase().includes(term)
                        );
                      })
                      .map((plan, idx) => {
                        const isSelected = selectedPlan?.variation_code === plan.variation_code;
                        const priceNum = parseFloat(plan.variation_amount || 0);

                        return (
                          <div
                            key={plan.variation_code || idx}
                            onClick={() => {
                              setSelectedPlan(plan);
                              setIsDropdownOpen(false);
                              setSearchTerm('');
                            }}
                            className={`p-3.5 flex items-center justify-between cursor-pointer transition text-left hover:bg-orange-50/60 ${
                              isSelected ? 'bg-orange-50 font-bold' : ''
                            }`}
                          >
                            <div className="flex-1 pr-3 min-w-0">
                              <p className={`text-sm truncate ${isSelected ? 'text-orange-900 font-bold' : 'text-gray-800'}`}>
                                {plan.name}
                              </p>
                              <p className="text-[11px] text-gray-400">Code: {plan.variation_code}</p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-sm font-extrabold text-orange-600">
                                ₦{priceNum.toLocaleString()}
                              </span>
                              {isSelected && <Check className="w-4 h-4 text-orange-600" />}
                            </div>
                          </div>
                        );
                      })}

                    {plans.filter((p) => {
                      if (!searchTerm.trim()) return true;
                      const term = searchTerm.toLowerCase();
                      return (
                        p.name?.toLowerCase().includes(term) ||
                        p.variation_code?.toLowerCase().includes(term)
                      );
                    }).length === 0 && (
                      <div className="p-4 text-center text-xs text-gray-400">
                        No bouquets match &ldquo;{searchTerm}&rdquo;
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Step 3: Smartcard / IUC */}
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

        {/* Total & Submit Button */}
        <div className="pt-4 border-t border-gray-100 space-y-4">
          {selectedPlan && (
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-gray-500">Bouquet Price:</span>
              <span className="text-2xl font-extrabold text-orange-600">
                ₦{parseFloat(selectedPlan.variation_amount || 0).toLocaleString()}
              </span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || fetchingPlans || !selectedPlan}
            className="w-full py-4 rounded-xl btn-orange text-base flex items-center justify-center gap-2 disabled:opacity-50 transition shadow-lg cursor-pointer"
          >
            {loading ? 'Processing Subscription...' : 'Confirm & Renew Subscription'} <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
