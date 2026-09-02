'use client';

import { useState, useEffect } from 'react';
import { History, ShieldCheck, Search, Filter } from 'lucide-react';

export default function TransactionsPage() {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    const stored = localStorage.getItem('softtap_user');
    if (stored) {
      const u = JSON.parse(stored);
      setUser(u);
      fetchTransactions(u.id);
    }
  }, []);

  const fetchTransactions = async (userId) => {
    try {
      const res = await fetch(`/api/transactions?userId=${userId}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setTransactions(data.transactions || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.serviceName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.recipient?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.reference?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterType === 'all' || tx.type === filterType;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-900 flex items-center gap-3">
          <History className="w-8 h-8 text-orange-500" /> Transaction History
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Detailed record of all your wallet funding and bill payments.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by service, phone or reference..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 text-xs placeholder-gray-400 focus:outline-none focus:border-orange-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-gray-400 shrink-0" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 text-xs font-semibold focus:outline-none focus:border-orange-500"
          >
            <option value="all">All Service Types</option>
            <option value="data">Data Bundles</option>
            <option value="airtime">Airtime</option>
            <option value="tv">Cable TV</option>
            <option value="electricity">Electricity</option>
            <option value="exam_pin">Result Pins</option>
            <option value="wallet_funding">Wallet Funding</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      {loading ? (
        <div className="bg-white p-12 text-center text-gray-400 text-sm rounded-3xl border border-gray-200 shadow-sm">
          Loading history...
        </div>
      ) : filteredTransactions.length === 0 ? (
        <div className="bg-white p-12 text-center text-gray-400 text-sm rounded-3xl border border-gray-200 shadow-sm space-y-2">
          <History className="w-10 h-10 text-gray-300 mx-auto" />
          <p className="font-bold text-gray-700">No matching transactions found</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-700 min-w-[640px]">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wider border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4">Reference</th>
                  <th className="px-6 py-4">Service</th>
                  <th className="px-6 py-4">Recipient</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Prev / New Bal</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {filteredTransactions.map((tx) => (
                  <tr key={tx._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-mono text-xs text-gray-500">{tx.reference}</td>
                    <td className="px-6 py-4 font-bold text-blue-900">{tx.serviceName}</td>
                    <td className="px-6 py-4 text-gray-600">{tx.recipient || '-'}</td>
                    <td className="px-6 py-4 font-black text-orange-600">₦{tx.amount?.toLocaleString()}</td>
                    <td className="px-6 py-4 text-gray-500 text-xs font-mono">
                      ₦{tx.previousBalance?.toLocaleString()} → ₦{tx.newBalance?.toLocaleString()}
                    </td>
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
  );
}
