'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Wallet, Plus, Wifi, Signal, Tv, Lightbulb, BookOpen, 
  History, ArrowUpRight, Copy, Check, Sparkles, ShieldAlert 
} from 'lucide-react';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('softtap_user');
    if (stored) {
      const u = JSON.parse(stored);
      setUser(u);
      fetchUserData(u.id);
    }
  }, []);

  const fetchUserData = async (userId) => {
    try {
      const res = await fetch(`/api/transactions?userId=${userId}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setWalletBalance(data.walletBalance);
        setTransactions(data.transactions || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyReferral = () => {
    if (user?.referralCode) {
      navigator.clipboard.writeText(`https://softtap.com.ng/register?ref=${user.referralCode}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Welcome back, <span className="gradient-text-emerald">{user?.firstName || 'User'}</span>! 👋
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            What would you like to purchase or pay for today?
          </p>
        </div>
        <Link
          href="/dashboard/fund-wallet"
          className="px-6 py-3 rounded-xl gradient-btn-primary text-slate-950 font-bold text-sm flex items-center gap-2 shrink-0 shadow-lg"
        >
          <Plus className="w-4 h-4" /> Fund Wallet
        </Link>
      </div>

      {/* Stats / Wallet Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Wallet Balance Card */}
        <div className="glass-panel p-6 rounded-3xl space-y-4 border border-emerald-500/30 bg-gradient-to-br from-[#0c1626] to-[#0b0914] relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Available Balance</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-black text-white">
              ₦{walletBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/60">
            <span>Instant Auto Wallet Funding</span>
            <Link href="/dashboard/fund-wallet" className="text-emerald-400 font-bold hover:underline">Fund Now</Link>
          </div>
        </div>

        {/* Account Status Card */}
        <div className="glass-panel p-6 rounded-3xl space-y-4 border border-cyan-500/30 bg-gradient-to-br from-[#0a1524] to-[#0b0914] relative overflow-hidden shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Account Package</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-black text-white">Smart User (VIP)</p>
            <p className="text-xs text-slate-400 mt-1">Enjoying 100% Wholesales Discount Rates</p>
          </div>
          <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/60">
            <span>Status: <span className="text-emerald-400 font-bold">Active</span></span>
            <span className="text-slate-500">24/7 Unlimited</span>
          </div>
        </div>

        {/* Referral Card */}
        <div className="glass-panel p-6 rounded-3xl space-y-4 border border-violet-500/30 bg-gradient-to-br from-[#120d26] to-[#0b0914] relative overflow-hidden shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-violet-400 uppercase tracking-wider">Referral Code</span>
            <button
              onClick={handleCopyReferral}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
              title="Copy referral link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <div>
            <p className="text-xl font-bold text-white font-mono">{user?.referralCode || 'ST894120'}</p>
            <p className="text-xs text-slate-400 mt-1">Earn commission on every friend&apos;s transaction</p>
          </div>
          <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/60">
            <span>{copied ? 'Link Copied!' : 'Click to copy referral link'}</span>
          </div>
        </div>
      </div>

      {/* Quick Services Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-wide">Quick Services</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          <Link
            href="/dashboard/buy-data"
            className="glass-panel p-5 rounded-2xl flex flex-col items-center text-center gap-3 hover:border-emerald-500/40 hover:scale-105 transition group"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition">
              <Wifi className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold text-white">Buy Data</span>
          </Link>

          <Link
            href="/dashboard/buy-airtime"
            className="glass-panel p-5 rounded-2xl flex flex-col items-center text-center gap-3 hover:border-emerald-500/40 hover:scale-105 transition group"
          >
            <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 group-hover:bg-violet-500 group-hover:text-slate-950 transition">
              <Signal className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold text-white">Buy Airtime</span>
          </Link>

          <Link
            href="/dashboard/tv-subscription"
            className="glass-panel p-5 rounded-2xl flex flex-col items-center text-center gap-3 hover:border-emerald-500/40 hover:scale-105 transition group"
          >
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-slate-950 transition">
              <Tv className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold text-white">TV Subscription</span>
          </Link>

          <Link
            href="/dashboard/electricity"
            className="glass-panel p-5 rounded-2xl flex flex-col items-center text-center gap-3 hover:border-emerald-500/40 hover:scale-105 transition group"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-slate-950 transition">
              <Lightbulb className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold text-white">Electricity Bill</span>
          </Link>

          <Link
            href="/dashboard/result-checker"
            className="glass-panel p-5 rounded-2xl flex flex-col items-center text-center gap-3 hover:border-emerald-500/40 hover:scale-105 transition group col-span-2 sm:col-span-1"
          >
            <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 group-hover:bg-pink-500 group-hover:text-slate-950 transition">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold text-white">Result Pins</span>
          </Link>
        </div>
      </div>

      {/* Recent Transactions Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white tracking-wide">Recent Transactions</h2>
          <Link href="/dashboard/transactions" className="text-xs font-semibold text-emerald-400 hover:underline flex items-center gap-1">
            View All <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="glass-panel p-8 text-center text-slate-400 text-sm rounded-2xl">
            Loading recent transactions...
          </div>
        ) : transactions.length === 0 ? (
          <div className="glass-panel p-8 text-center text-slate-400 text-sm rounded-2xl space-y-2">
            <History className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="font-semibold text-slate-300">No transactions recorded yet</p>
            <p className="text-xs text-slate-500">Buy data, airtime, or fund your wallet to get started.</p>
          </div>
        ) : (
          <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800/80">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-900/80 text-xs text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="px-6 py-4">Service</th>
                    <th className="px-6 py-4">Recipient</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {transactions.slice(0, 5).map((tx) => (
                    <tr key={tx._id} className="hover:bg-slate-900/40 transition">
                      <td className="px-6 py-4 font-semibold text-white">{tx.serviceName}</td>
                      <td className="px-6 py-4 text-slate-400">{tx.recipient || '-'}</td>
                      <td className="px-6 py-4 font-bold text-emerald-400">₦{tx.amount?.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {tx.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 text-xs">
                        {new Date(tx.createdAt).toLocaleDateString()} {new Date(tx.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
