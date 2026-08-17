'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Wallet, Plus, Wifi, Signal, Tv, Lightbulb, BookOpen, 
  History, ArrowUpRight, Copy, Check, Sparkles, ShieldCheck 
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
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-900">
            Welcome back, <span className="text-orange-500">{user?.firstName || 'User'}</span>! 👋
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            What would you like to purchase or pay for today?
          </p>
        </div>
        <Link
          href="/dashboard/fund-wallet"
          className="px-6 py-3 rounded-xl btn-orange text-sm flex items-center gap-2 shrink-0 shadow-md"
        >
          <Plus className="w-4 h-4" /> Fund Wallet
        </Link>
      </div>

      {/* Stats / Wallet Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Wallet Balance Card */}
        <div className="bg-white p-6 rounded-3xl space-y-4 border border-orange-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Available Balance</span>
            <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-500">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-black text-blue-900">
              ₦{walletBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div className="pt-2 flex items-center justify-between text-xs text-gray-500 border-t border-gray-100">
            <span>Instant Auto Wallet Funding</span>
            <Link href="/dashboard/fund-wallet" className="text-orange-600 font-bold hover:underline">Fund Now</Link>
          </div>
        </div>

        {/* Account Status Card */}
        <div className="bg-white p-6 rounded-3xl space-y-4 border border-blue-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Account Package</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-black text-blue-900">Smart User (VIP)</p>
            <p className="text-xs text-gray-500 mt-1">Enjoying 100% Wholesale Discount Rates</p>
          </div>
          <div className="pt-2 flex items-center justify-between text-xs text-gray-500 border-t border-gray-100">
            <span>Status: <span className="text-green-600 font-bold">Active</span></span>
            <span className="text-gray-400">24/7 Unlimited</span>
          </div>
        </div>

        {/* Referral Card */}
        <div className="bg-white p-6 rounded-3xl space-y-4 border border-purple-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">Referral Code</span>
            <button
              onClick={handleCopyReferral}
              className="p-1.5 rounded-lg bg-gray-50 text-gray-600 hover:text-orange-500 border border-gray-200 transition"
              title="Copy referral link"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <div>
            <p className="text-xl font-bold text-blue-900 font-mono">{user?.referralCode || 'ST894120'}</p>
            <p className="text-xs text-gray-500 mt-1">Earn commission on every friend&apos;s transaction</p>
          </div>
          <div className="pt-2 flex items-center justify-between text-xs text-gray-500 border-t border-gray-100">
            <span>{copied ? 'Link Copied!' : 'Click to copy referral link'}</span>
          </div>
        </div>
      </div>

      {/* Quick Services Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-blue-900 tracking-wide">Quick Services</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          <Link
            href="/dashboard/buy-data"
            className="brand-card p-5 rounded-2xl flex flex-col items-center text-center gap-3 hover:border-orange-300 transition group"
          >
            <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition">
              <Wifi className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold text-blue-900">Buy Data</span>
          </Link>

          <Link
            href="/dashboard/buy-airtime"
            className="brand-card p-5 rounded-2xl flex flex-col items-center text-center gap-3 hover:border-green-300 transition group"
          >
            <div className="w-12 h-12 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition">
              <Signal className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold text-blue-900">Buy Airtime</span>
          </Link>

          <Link
            href="/dashboard/tv-subscription"
            className="brand-card p-5 rounded-2xl flex flex-col items-center text-center gap-3 hover:border-blue-300 transition group"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
              <Tv className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold text-blue-900">TV Subscription</span>
          </Link>

          <Link
            href="/dashboard/electricity"
            className="brand-card p-5 rounded-2xl flex flex-col items-center text-center gap-3 hover:border-yellow-300 transition group"
          >
            <div className="w-12 h-12 rounded-xl bg-yellow-50 border border-yellow-200 flex items-center justify-center text-yellow-600 group-hover:bg-yellow-600 group-hover:text-white transition">
              <Lightbulb className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold text-blue-900">Electricity Bill</span>
          </Link>

          <Link
            href="/dashboard/result-checker"
            className="brand-card p-5 rounded-2xl flex flex-col items-center text-center gap-3 hover:border-purple-300 transition group col-span-2 sm:col-span-1"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition">
              <BookOpen className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold text-blue-900">Result Pins</span>
          </Link>
        </div>
      </div>

      {/* Recent Transactions Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-blue-900 tracking-wide">Recent Transactions</h2>
          <Link href="/dashboard/transactions" className="text-xs font-semibold text-orange-600 hover:underline flex items-center gap-1">
            View All <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="bg-white p-8 text-center text-gray-500 text-sm rounded-2xl border border-gray-200 shadow-sm">
            Loading recent transactions...
          </div>
        ) : transactions.length === 0 ? (
          <div className="bg-white p-8 text-center text-gray-500 text-sm rounded-2xl border border-gray-200 shadow-sm space-y-2">
            <History className="w-8 h-8 text-gray-400 mx-auto" />
            <p className="font-semibold text-gray-700">No transactions recorded yet</p>
            <p className="text-xs text-gray-400">Buy data, airtime, or fund your wallet to get started.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-700">
                <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4">Service</th>
                    <th className="px-6 py-4">Recipient</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {transactions.slice(0, 5).map((tx) => (
                    <tr key={tx._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-semibold text-blue-900">{tx.serviceName}</td>
                      <td className="px-6 py-4 text-gray-600">{tx.recipient || '-'}</td>
                      <td className="px-6 py-4 font-bold text-orange-600">₦{tx.amount?.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">
                          {tx.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-xs">
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
