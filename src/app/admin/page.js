'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Shield, Users, Wallet, Activity, Search, PlusCircle, MinusCircle, Check, AlertCircle } from 'lucide-react';

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ totalUsers: 0, totalTransactions: 0, totalVolume: 0 });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [amount, setAmount] = useState('');
  const [actionMsg, setActionMsg] = useState({ type: '', text: '' });
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      if (res.ok && data.success) {
        setUsers(data.users || []);
        setStats(data.stats || { totalUsers: 0, totalTransactions: 0, totalVolume: 0 });
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
        fetchAdminData();
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

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-black">
      <Navbar />

      <main className="flex-1 pt-32 pb-20 px-6 max-w-7xl mx-auto w-full space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <Shield className="w-8 h-8 text-emerald-400" /> Admin Control Panel
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            System stats, user management, and manual wallet credit/debit controls.
          </p>
        </div>

        {/* System Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-3xl space-y-2 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Total Registered Users</span>
              <Users className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-3xl font-black text-white">{stats.totalUsers}</p>
          </div>

          <div className="glass-panel p-6 rounded-3xl space-y-2 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Total System Transactions</span>
              <Activity className="w-5 h-5 text-cyan-400" />
            </div>
            <p className="text-3xl font-black text-white">{stats.totalTransactions}</p>
          </div>

          <div className="glass-panel p-6 rounded-3xl space-y-2 border border-slate-800">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-xs font-bold uppercase tracking-wider">Total Volume Processed</span>
              <Wallet className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-3xl font-black text-emerald-400">
              ₦{stats.totalVolume?.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Action Message */}
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

        {/* User Search & Wallet Adjustment Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-white">All Users ({filteredUsers.length})</h2>
              <div className="relative w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search user..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800">
              <div className="overflow-x-auto max-h-96">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-900 text-xs text-slate-400 uppercase tracking-wider sticky top-0">
                    <tr>
                      <th className="px-4 py-3">User</th>
                      <th className="px-4 py-3">Email & Phone</th>
                      <th className="px-4 py-3">Balance</th>
                      <th className="px-4 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredUsers.map((u) => (
                      <tr
                        key={u._id}
                        onClick={() => setSelectedUser(u)}
                        className={`cursor-pointer transition ${
                          selectedUser?._id === u._id ? 'bg-emerald-500/10' : 'hover:bg-slate-900/40'
                        }`}
                      >
                        <td className="px-4 py-3 font-bold text-white">{u.firstName} {u.lastName}</td>
                        <td className="px-4 py-3 text-slate-400 text-xs">{u.email} <br /> {u.phone}</td>
                        <td className="px-4 py-3 font-black text-emerald-400">₦{u.walletBalance?.toLocaleString()}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedUser(u);
                            }}
                            className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold"
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
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6 h-fit">
            <h2 className="text-xl font-bold text-white">Manual Wallet Adjustment</h2>

            {selectedUser ? (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                  <p className="text-xs text-slate-400 font-medium">Selected User</p>
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
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white font-bold text-base focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => handleWalletAdjust('credit')}
                    disabled={actionLoading}
                    className="py-3 rounded-xl gradient-btn-primary text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    <PlusCircle className="w-4 h-4" /> Credit Wallet
                  </button>

                  <button
                    onClick={() => handleWalletAdjust('debit')}
                    disabled={actionLoading}
                    className="py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 disabled:opacity-50"
                  >
                    <MinusCircle className="w-4 h-4" /> Debit Wallet
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500 text-sm">
                Select a user from the list to credit or debit their wallet.
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
