'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Shield, Users, Wallet, Activity, Search, PlusCircle, MinusCircle, 
  Check, AlertCircle, TrendingUp, DollarSign, RefreshCw, Layers, 
  Tv, Lightbulb, Wifi, Signal, BookOpen, Server, CreditCard
} from 'lucide-react';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTransactions: 0,
    totalVolume: 0,
    totalCost: 0,
    totalProfit: 0,
    marginPercent: '0'
  });
  const [breakdown, setBreakdown] = useState({
    data: { count: 0, volume: 0, profit: 0 },
    airtime: { count: 0, volume: 0, profit: 0 },
    tv: { count: 0, volume: 0, profit: 0 },
    electricity: { count: 0, volume: 0, profit: 0 },
    exam_pin: { count: 0, volume: 0, profit: 0 },
  });
  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedTx, setSelectedTx] = useState(null);
  const [amount, setAmount] = useState('');
  const [actionMsg, setActionMsg] = useState({ type: '', text: '' });
  const [actionLoading, setActionLoading] = useState(false);

  // Profit Simulator state
  const [simDataCount, setSimDataCount] = useState(50);
  const [simTvCount, setSimTvCount] = useState(20);
  const [simPinCount, setSimPinCount] = useState(15);
  const [simElecCount, setSimElecCount] = useState(30);

  useEffect(() => {
    fetchAdminStats();
  }, []);

  const fetchAdminStats = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/stats');
      const data = await res.json();
      if (res.ok && data.success) {
        setStats(data.stats || {});
        setBreakdown(data.breakdown || {});
        setTransactions(data.recentTransactions || []);
        setUsers(data.users || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleWalletAdjust = async (actionType) => {
    if (!selectedUser || !amount || parseFloat(amount) <= 0) {
      setActionMsg({ type: 'error', text: 'Please select a user and enter a valid amount' });
      return;
    }

    setActionLoading(true);
    setActionMsg({ type: '', text: '' });

    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetUserId: selectedUser._id,
          action: actionType,
          amount: parseFloat(amount),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setActionMsg({ type: 'success', text: data.message });
        setAmount('');
        fetchAdminStats();
      } else {
        setActionMsg({ type: 'error', text: data.message || 'Action failed' });
      }
    } catch (err) {
      setActionMsg({ type: 'error', text: 'Error adjusting user wallet' });
    } finally {
      setActionLoading(false);
    }
  };

  const filteredUsers = users.filter((u) => {
    return (
      u.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.phone?.includes(searchTerm)
    );
  });

  const filteredTransactions = transactions.filter((tx) => {
    const matchesService = serviceFilter === 'all' || tx.type === serviceFilter;
    const matchesSearch = 
      tx.reference?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.serviceName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.recipient?.includes(searchTerm) ||
      tx.customerEmail?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesService && (searchTerm ? matchesSearch : true);
  });

  const simDailyProfit = 
    (simDataCount * 45) + 
    (simTvCount * 100) + 
    (simPinCount * 140) + 
    (simElecCount * 100);
  const simMonthlyProfit = simDailyProfit * 30;

  return (
    <div className="min-h-screen bg-[#0b0914] text-slate-100 flex flex-col justify-between selection:bg-orange-500 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-2">
              <Shield className="w-3.5 h-3.5" /> SoftTap Owner &amp; Admin Panel
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-3">
              Admin &amp; Profit Control Center
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Real-time purchase monitoring, profit tracking, user management, and API gateway connections.
            </p>
          </div>

          <button 
            onClick={fetchAdminStats}
            disabled={loading}
            className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center gap-2 border border-slate-700 transition"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-orange-400' : ''}`} />
            Refresh Data
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto gap-2 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800">
          {[
            { id: 'overview', label: 'Overview & KPIs', icon: Activity },
            { id: 'purchases', label: `Purchases & Subscriptions (${transactions.length})`, icon: Layers },
            { id: 'profit', label: 'Profit & Margins Engine', icon: TrendingUp },
            { id: 'users', label: `Users & Wallets (${users.length})`, icon: Users },
            { id: 'connections', label: 'Where It Connects (APIs)', icon: Server },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 whitespace-nowrap transition ${
                  isActive 
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Global Action Message */}
        {actionMsg.text && (
          <div
            className={`p-4 rounded-2xl border text-sm font-semibold flex items-center gap-3 ${
              actionMsg.type === 'success'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-red-500/10 border-red-500/30 text-red-400'
            }`}
          >
            {actionMsg.type === 'success' ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {actionMsg.text}
          </div>
        )}

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-2 relative overflow-hidden bg-slate-900/60">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Gross Sales (Volume)</span>
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                    <Wallet className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-2xl sm:text-3xl font-black text-white">
                  ₦{(stats.totalVolume || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-slate-500">Total customer payments processed</p>
              </div>

              <div className="glass-panel p-6 rounded-3xl border border-emerald-500/30 space-y-2 relative overflow-hidden bg-emerald-950/20">
                <div className="flex items-center justify-between text-emerald-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Net Profit Earned</span>
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-2xl sm:text-3xl font-black text-emerald-400">
                  ₦{(stats.totalProfit || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-emerald-400/80 font-semibold">
                  Avg Margin: {stats.marginPercent}% on transactions
                </p>
              </div>

              <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-2 relative overflow-hidden bg-slate-900/60">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Total Purchases</span>
                  <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400">
                    <Activity className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-2xl sm:text-3xl font-black text-white">{stats.totalTransactions}</p>
                <p className="text-xs text-slate-500">Data, TV, Power, Airtime &amp; Pins</p>
              </div>

              <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-2 relative overflow-hidden bg-slate-900/60">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Registered Users</span>
                  <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                    <Users className="w-5 h-5" />
                  </div>
                </div>
                <p className="text-2xl sm:text-3xl font-black text-white">{stats.totalUsers}</p>
                <p className="text-xs text-slate-500">Active account holders</p>
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-orange-400" /> Sales &amp; Profit by Product Category
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400">
                      <Wifi className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400">Mobile Data</p>
                      <p className="text-base font-black text-white">{breakdown.data?.count || 0} Orders</p>
                    </div>
                  </div>
                  <div className="border-t border-slate-800 pt-2 flex justify-between text-xs">
                    <span className="text-slate-400">Profit:</span>
                    <span className="font-bold text-emerald-400">₦{(breakdown.data?.profit || 0).toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
                      <Tv className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400">TV Subscriptions</p>
                      <p className="text-base font-black text-white">{breakdown.tv?.count || 0} Subs</p>
                    </div>
                  </div>
                  <div className="border-t border-slate-800 pt-2 flex justify-between text-xs">
                    <span className="text-slate-400">Profit:</span>
                    <span className="font-bold text-emerald-400">₦{(breakdown.tv?.profit || 0).toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-yellow-500/10 text-yellow-400">
                      <Lightbulb className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400">Electricity Tokens</p>
                      <p className="text-base font-black text-white">{breakdown.electricity?.count || 0} Tokens</p>
                    </div>
                  </div>
                  <div className="border-t border-slate-800 pt-2 flex justify-between text-xs">
                    <span className="text-slate-400">Profit:</span>
                    <span className="font-bold text-emerald-400">₦{(breakdown.electricity?.profit || 0).toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400">Exam Pins</p>
                      <p className="text-base font-black text-white">{breakdown.exam_pin?.count || 0} Pins</p>
                    </div>
                  </div>
                  <div className="border-t border-slate-800 pt-2 flex justify-between text-xs">
                    <span className="text-slate-400">Profit:</span>
                    <span className="font-bold text-emerald-400">₦{(breakdown.exam_pin?.profit || 0).toLocaleString()}</span>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-green-500/10 text-green-400">
                      <Signal className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400">Airtime Topup</p>
                      <p className="text-base font-black text-white">{breakdown.airtime?.count || 0} Recharges</p>
                    </div>
                  </div>
                  <div className="border-t border-slate-800 pt-2 flex justify-between text-xs">
                    <span className="text-slate-400">Profit:</span>
                    <span className="font-bold text-emerald-400">₦{(breakdown.airtime?.profit || 0).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Purchases Stream */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-400" /> Recent Purchases Live Stream
                </h2>
                <button 
                  onClick={() => setActiveTab('purchases')}
                  className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1"
                >
                  View All &rarr;
                </button>
              </div>

              <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-900/80 uppercase tracking-wider text-slate-400">
                      <tr>
                        <th className="px-4 py-3">Service &amp; Provider</th>
                        <th className="px-4 py-3">Recipient / Customer</th>
                        <th className="px-4 py-3">Amount</th>
                        <th className="px-4 py-3">Profit</th>
                        <th className="px-4 py-3">Date</th>
                        <th className="px-4 py-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-medium">
                      {transactions.slice(0, 6).map((tx) => (
                        <tr key={tx._id} className="hover:bg-slate-900/40 transition">
                          <td className="px-4 py-3 font-bold text-white">{tx.serviceName}</td>
                          <td className="px-4 py-3 text-slate-400">{tx.recipient || tx.customerEmail || 'N/A'}</td>
                          <td className="px-4 py-3 font-bold text-slate-200">₦{tx.amount?.toLocaleString()}</td>
                          <td className="px-4 py-3 font-bold text-emerald-400">+₦{tx.profit || 0}</td>
                          <td className="px-4 py-3 text-slate-500">
                            {new Date(tx.createdAt).toLocaleDateString()} {new Date(tx.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                              {tx.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                      {transactions.length === 0 && (
                        <tr>
                          <td colSpan="6" className="p-6 text-center text-slate-500">
                            No purchases recorded yet. Transactions will appear here in real-time as users and visitors buy or subscribe!
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PURCHASES */}
        {activeTab === 'purchases' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
              <div className="flex flex-wrap gap-2">
                {['all', 'data', 'tv', 'electricity', 'exam_pin', 'airtime'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setServiceFilter(type)}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs uppercase tracking-wide transition ${
                      serviceFilter === type
                        ? 'bg-orange-500 text-white'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {type.replace('_', ' ')}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search reference, recipient, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800">
              <div className="overflow-x-auto max-h-[600px]">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900 uppercase tracking-wider text-slate-400 sticky top-0">
                    <tr>
                      <th className="px-4 py-3">Reference</th>
                      <th className="px-4 py-3">Product / Service</th>
                      <th className="px-4 py-3">Recipient / Identifier</th>
                      <th className="px-4 py-3">Sales Amount</th>
                      <th className="px-4 py-3">Provider Cost</th>
                      <th className="px-4 py-3">Your Profit</th>
                      <th className="px-4 py-3">Date &amp; Time</th>
                      <th className="px-4 py-3">Receipt</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-medium">
                    {filteredTransactions.map((tx) => (
                      <tr 
                        key={tx._id} 
                        onClick={() => setSelectedTx(tx)}
                        className="hover:bg-slate-900/50 cursor-pointer transition"
                      >
                        <td className="px-4 py-3 font-mono text-[11px] text-slate-400">{tx.reference}</td>
                        <td className="px-4 py-3 font-bold text-white">
                          <span className="capitalize">{tx.serviceName}</span>
                        </td>
                        <td className="px-4 py-3 text-slate-300 font-mono">{tx.recipient || 'N/A'}</td>
                        <td className="px-4 py-3 font-bold text-white">₦{tx.amount?.toLocaleString()}</td>
                        <td className="px-4 py-3 text-slate-400">₦{tx.costPrice ? tx.costPrice.toLocaleString() : '-'}</td>
                        <td className="px-4 py-3 font-bold text-emerald-400">+₦{tx.profit || 0}</td>
                        <td className="px-4 py-3 text-slate-500">
                          {new Date(tx.createdAt).toLocaleDateString()} {new Date(tx.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedTx(tx);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/30 text-[11px] font-bold hover:bg-orange-500 hover:text-white transition"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filteredTransactions.length === 0 && (
                      <tr>
                        <td colSpan="8" className="p-8 text-center text-slate-500">
                          No transactions found matching your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Receipt Modal */}
            {selectedTx && (
              <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl animate-in zoom-in-95">
                  <div className="flex justify-between items-start border-b border-slate-800 pb-4">
                    <div>
                      <h3 className="text-xl font-black text-white">Transaction Breakdown</h3>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">{selectedTx.reference}</p>
                    </div>
                    <button 
                      onClick={() => setSelectedTx(null)}
                      className="text-slate-500 hover:text-white text-xl font-bold p-1"
                    >
                      &times;
                    </button>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                      <span className="text-slate-400">Service:</span>
                      <span className="font-bold text-white">{selectedTx.serviceName}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                      <span className="text-slate-400">Recipient / Target:</span>
                      <span className="font-mono font-bold text-white">{selectedTx.recipient || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                      <span className="text-slate-400">Customer Amount Paid:</span>
                      <span className="font-black text-base text-orange-400">₦{selectedTx.amount?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                      <span className="text-slate-400">Wholesale Provider Cost:</span>
                      <span className="font-bold text-slate-300">₦{(selectedTx.costPrice || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                      <span className="text-emerald-400 font-bold">Your Net Profit:</span>
                      <span className="font-black text-base text-emerald-400">+₦{(selectedTx.profit || 0).toLocaleString()}</span>
                    </div>

                    {selectedTx.details?.token && (
                      <div className="p-3 bg-slate-950 rounded-xl border border-yellow-500/30 space-y-1">
                        <span className="text-[10px] text-yellow-400 uppercase font-bold">Prepaid Meter Token:</span>
                        <p className="font-mono font-black text-yellow-300 text-sm tracking-widest">{selectedTx.details.token}</p>
                      </div>
                    )}

                    {selectedTx.details?.pins && (
                      <div className="p-3 bg-slate-950 rounded-xl border border-purple-500/30 space-y-2">
                        <span className="text-[10px] text-purple-400 uppercase font-bold">Generated PINs:</span>
                        {selectedTx.details.pins.map((p, i) => (
                          <div key={i} className="font-mono text-slate-300">
                            <p>Serial: <span className="text-white font-bold">{p.serialNumber}</span></p>
                            <p>PIN: <span className="text-purple-400 font-bold">{p.pin}</span></p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedTx(null)}
                    className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PROFIT ENGINE */}
        {activeTab === 'profit' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-orange-950/40 border border-emerald-500/30 space-y-3">
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-emerald-400" /> How You Make Profit On SoftTap
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
                SoftTap acts as your automated VTU retail platform. When customers buy data, airtime, pay electricity bills, renew cable TV, or purchase exam pins, you earn a <strong>profit spread</strong> on every single transaction without manual intervention.
              </p>
            </div>

            {/* Profit Accumulation & Bank Settlement Details */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-emerald-500/40 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-white text-base sm:text-lg">Where Your Profit Accumulates &amp; How To Withdraw</h3>
                    <p className="text-xs text-slate-400">Automated Daily Settlement directly into your Bank Account</p>
                  </div>
                </div>
                <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                  ✓ Configured for Auto-Settlement
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Official Bank Account Card */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Your Configured Settlement Account</span>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between py-1.5 border-b border-slate-900">
                      <span className="text-slate-400">Account Name:</span>
                      <span className="font-black text-white">Michaelkeysoft Enterprises</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-900">
                      <span className="text-slate-400">Account Number:</span>
                      <span className="font-mono font-black text-orange-400 text-base">0082747029</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-900">
                      <span className="text-slate-400">Bank:</span>
                      <span className="font-bold text-white">Stanbic Bank (Stanbic IBTC)</span>
                    </div>
                  </div>
                </div>

                {/* Settlement Mechanics */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs text-slate-300">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">How The Money Lands in Your Bank</span>
                  <ol className="space-y-2 list-decimal list-inside text-slate-300">
                    <li><strong>Direct Online Purchases:</strong> Whenever customers buy with Card, USSD, or Bank Transfer, Paystack collects the money into your merchant balance.</li>
                    <li><strong>Daily Automated Payout:</strong> Paystack automatically sweeps and deposits your full accumulated earnings straight into your <strong>Stanbic Bank (0082747029)</strong> account every morning (T+1 settlement) with zero fees.</li>
                    <li><strong>Manual Direct Transfers:</strong> Any customer who transfers directly to your Stanbic Bank account is already sitting in your bank immediately!</li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-400">
                    <Wifi className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Mobile Data Profit</h3>
                    <p className="text-xs text-slate-400">SME &amp; Corporate Gifting</p>
                  </div>
                </div>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span>Wholesale Cost:</span>
                    <span className="font-bold text-slate-400">~₦220 - ₦250 / GB</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span>Your Selling Price:</span>
                    <span className="font-bold text-white">~₦280 - ₦300 / GB</span>
                  </div>
                  <div className="flex justify-between py-1 text-emerald-400 font-bold">
                    <span>Net Margin Per GB:</span>
                    <span>₦30 - ₦50 / GB (10% - 15%)</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400">
                    <Tv className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Cable TV Commission</h3>
                    <p className="text-xs text-slate-400">DStv, GOtv, StarTimes</p>
                  </div>
                </div>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span>Wholesale Provider Cost:</span>
                    <span className="font-bold text-slate-400">Face Value - 1.5%</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span>Convenience Fee / Markup:</span>
                    <span className="font-bold text-white">₦100 / Sub</span>
                  </div>
                  <div className="flex justify-between py-1 text-emerald-400 font-bold">
                    <span>Net Profit Per Sub:</span>
                    <span>₦100 - ₦150 per transaction</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Exam Checker Pins</h3>
                    <p className="text-xs text-slate-400">WAEC, NECO, NABTEB, NBAIS</p>
                  </div>
                </div>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span>WAEC Wholesale Cost:</span>
                    <span className="font-bold text-slate-400">₦3,150</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span>Your Selling Price:</span>
                    <span className="font-bold text-white">₦3,320</span>
                  </div>
                  <div className="flex justify-between py-1 text-emerald-400 font-bold">
                    <span>Net Profit Per WAEC Pin:</span>
                    <span>+₦170 per pin sold</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-yellow-500/10 text-yellow-400">
                    <Lightbulb className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Electricity Bill Tokens</h3>
                    <p className="text-xs text-slate-400">IKEDC, EKEDC, AEDC, IBEDC...</p>
                  </div>
                </div>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span>Convenience Fee Added:</span>
                    <span className="font-bold text-slate-400">₦100 per bill</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span>DISCO Commission Rebate:</span>
                    <span className="font-bold text-white">0.5% - 1.2%</span>
                  </div>
                  <div className="flex justify-between py-1 text-emerald-400 font-bold">
                    <span>Net Profit Per Recharge:</span>
                    <span>₦100 - ₦150 per meter token</span>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-green-500/10 text-green-400">
                    <Signal className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">Airtime VTU Margin</h3>
                    <p className="text-xs text-slate-400">MTN, Airtel, Glo, 9mobile</p>
                  </div>
                </div>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span>Wholesale Provider Cost:</span>
                    <span className="font-bold text-slate-400">₦970 - ₦980 per ₦1000</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-800">
                    <span>Retail Price:</span>
                    <span className="font-bold text-white">₦1,000</span>
                  </div>
                  <div className="flex justify-between py-1 text-emerald-400 font-bold">
                    <span>Net Profit Margin:</span>
                    <span>2.0% - 3.0% discount spread</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Profit Calculator */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-400" /> Interactive Profit Projection Calculator
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Adjust your expected daily sales volume to project your daily and monthly passive earnings.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-300">Daily Data Purchases</label>
                  <input
                    type="number"
                    value={simDataCount}
                    onChange={(e) => setSimDataCount(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-sm focus:border-orange-500 focus:outline-none"
                  />
                  <span className="text-[11px] text-slate-500">Est. ₦45 profit/order</span>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-300">Daily TV Subscriptions</label>
                  <input
                    type="number"
                    value={simTvCount}
                    onChange={(e) => setSimTvCount(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-sm focus:border-orange-500 focus:outline-none"
                  />
                  <span className="text-[11px] text-slate-500">Est. ₦100 profit/sub</span>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-300">Daily Exam Pins Sold</label>
                  <input
                    type="number"
                    value={simPinCount}
                    onChange={(e) => setSimPinCount(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-sm focus:border-orange-500 focus:outline-none"
                  />
                  <span className="text-[11px] text-slate-500">Est. ₦140 profit/pin</span>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-300">Daily Electricity Bills</label>
                  <input
                    type="number"
                    value={simElecCount}
                    onChange={(e) => setSimElecCount(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-sm focus:border-orange-500 focus:outline-none"
                  />
                  <span className="text-[11px] text-slate-500">Est. ₦100 fee/token</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
                  <span className="text-xs font-bold uppercase text-emerald-400">Projected Daily Net Profit</span>
                  <p className="text-2xl sm:text-3xl font-black text-emerald-400">
                    ₦{simDailyProfit.toLocaleString()} / day
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-orange-500/10 border border-orange-500/30 space-y-1">
                  <span className="text-xs font-bold uppercase text-orange-400">Projected Monthly Net Profit</span>
                  <p className="text-2xl sm:text-3xl font-black text-orange-400">
                    ₦{simMonthlyProfit.toLocaleString()} / month
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: USERS */}
        {activeTab === 'users' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold text-white">Registered Users ({filteredUsers.length})</h2>
                  <div className="relative w-64">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Search user..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800">
                  <div className="overflow-x-auto max-h-[500px]">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-slate-900 uppercase tracking-wider text-slate-400 sticky top-0">
                        <tr>
                          <th className="px-4 py-3">Customer</th>
                          <th className="px-4 py-3">Email &amp; Phone</th>
                          <th className="px-4 py-3">Wallet Balance</th>
                          <th className="px-4 py-3">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 font-medium">
                        {filteredUsers.map((u) => (
                          <tr
                            key={u._id}
                            onClick={() => setSelectedUser(u)}
                            className={`cursor-pointer transition ${
                              selectedUser?._id === u._id ? 'bg-orange-500/10' : 'hover:bg-slate-900/40'
                            }`}
                          >
                            <td className="px-4 py-3 font-bold text-white">{u.firstName} {u.lastName}</td>
                            <td className="px-4 py-3 text-slate-400">{u.email} <br /> {u.phone}</td>
                            <td className="px-4 py-3 font-black text-emerald-400">₦{u.walletBalance?.toLocaleString()}</td>
                            <td className="px-4 py-3">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedUser(u);
                                }}
                                className="px-3 py-1 rounded-lg bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-bold"
                              >
                                Manage
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Wallet Adjustment Control */}
              <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6 h-fit bg-slate-900/60">
                <h2 className="text-lg font-bold text-white">Manual Wallet Adjustment</h2>

                {selectedUser ? (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                      <p className="text-[11px] text-slate-400 font-medium uppercase">Selected Customer</p>
                      <p className="text-base font-bold text-white">{selectedUser.firstName} {selectedUser.lastName}</p>
                      <p className="text-xs text-slate-400">{selectedUser.email} ({selectedUser.phone})</p>
                      <p className="text-xs text-emerald-400 font-bold mt-2">
                        Current Balance: ₦{selectedUser.walletBalance?.toLocaleString()}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-xs font-semibold text-slate-300">Amount (₦)</label>
                      <input
                        type="number"
                        placeholder="Enter amount"
                        min="1"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold text-base focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <button
                        onClick={() => handleWalletAdjust('credit')}
                        disabled={actionLoading}
                        className="py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 disabled:opacity-50 transition"
                      >
                        <PlusCircle className="w-4 h-4" /> Credit Wallet
                      </button>

                      <button
                        onClick={() => handleWalletAdjust('debit')}
                        disabled={actionLoading}
                        className="py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 disabled:opacity-50 transition"
                      >
                        <MinusCircle className="w-4 h-4" /> Debit Wallet
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center text-slate-500 text-xs">
                    Select a customer from the list to credit or debit their wallet balance manually.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: CONNECTIONS */}
        {activeTab === 'connections' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <Server className="w-6 h-6 text-orange-400" /> Platform Architecture &amp; Gateway Connections
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                SoftTap operates with two primary external connections: <strong>Payment Collection Gateways</strong> (Paystack / Monnify) to receive money from your customers, and <strong>VTU Service Providers</strong> (VTpass / ClubKonnect / MobileNig) to dispense the digital products.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Paystack Card */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400">
                      <CreditCard className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base">Payment Gateway: Paystack</h3>
                      <p className="text-xs text-slate-400">Cards, USSD, Bank Transfer Collection</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                    Connected
                  </span>
                </div>

                <div className="space-y-3 text-xs text-slate-300">
                  <p className="text-slate-400 leading-relaxed">
                    <strong>How it works:</strong> When a user pays on SoftTap, Paystack processes the money and deposits it directly into your registered Nigerian Bank Account (Settlement).
                  </p>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-[11px]">
                    <p><span className="text-slate-500">Public Key:</span> pk_test_*** (Configured in .env)</p>
                    <p><span className="text-slate-500">Secret Key:</span> sk_test_*** (Protected backend)</p>
                    <p><span className="text-slate-500">Webhook URL:</span> https://yourdomain.com/api/wallet/webhook</p>
                  </div>
                </div>
              </div>

              {/* VTpass Card */}
              <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-400">
                      <Server className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-base">VTU Provider: VTpass / API</h3>
                      <p className="text-xs text-slate-400">Automated Product Dispenser</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                    Active
                  </span>
                </div>

                <div className="space-y-3 text-xs text-slate-300">
                  <p className="text-slate-400 leading-relaxed">
                    <strong>How it works:</strong> SoftTap calls the VTU provider API to deliver Data, Airtime, Cable TV bouquest, Electricity tokens, and Exam PINs instantly upon payment.
                  </p>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-[11px]">
                    <p><span className="text-slate-500">Endpoint:</span> https://sandbox.vtpass.com/api/pay</p>
                    <p><span className="text-slate-500">Environment:</span> Sandbox / Test Mode (Ready for Live Key)</p>
                    <p><span className="text-slate-500">Mode:</span> Auto-Fulfillment Enabled</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Check className="w-5 h-5 text-emerald-400" /> Integration Checklist To Go Live
              </h3>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold">1</span>
                  <p><strong>Paystack Live Keys:</strong> Log in to your Paystack dashboard, copy your Live Public Key and Secret Key, and add them to your environment variables (<code>.env.local</code>).</p>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold">2</span>
                  <p><strong>VTU API Live Keys:</strong> Fund your VTpass or ClubKonnect provider wallet with ₦10,000 - ₦50,000 and enter your API Key in your environment.</p>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-950">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold">3</span>
                  <p><strong>Set Webhook:</strong> In Paystack settings, paste your webhook URL so that wallet fundings are credited 100% automatically.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
