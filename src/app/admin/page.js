'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Shield, LogOut, Loader2, User, RefreshCw, Activity, TrendingUp,
  Wallet, Users, Wifi, Tv, Lightbulb, BookOpen, Signal, Search,
  CheckCircle2, XCircle, Clock, CreditCard, ChevronDown, ChevronUp,
  AlertTriangle, Hash, ArrowUpRight
} from 'lucide-react';

// ─── Utility ────────────────────────────────────────────────
function money(v) {
  return `₦${(v || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
function shortDate(d) {
  if (!d) return '—';
  const dt = new Date(d);
  return dt.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}
function shortTime(d) {
  if (!d) return '';
  return new Date(d).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}

const SERVICE_ICONS = {
  data: Wifi,
  airtime: Signal,
  tv: Tv,
  electricity: Lightbulb,
  exam_pin: BookOpen,
  wallet_funding: CreditCard,
};
const SERVICE_COLORS = {
  data: 'text-orange-400 bg-orange-500/10',
  airtime: 'text-green-400 bg-green-500/10',
  tv: 'text-blue-400 bg-blue-500/10',
  electricity: 'text-yellow-400 bg-yellow-500/10',
  exam_pin: 'text-purple-400 bg-purple-500/10',
  wallet_funding: 'text-cyan-400 bg-cyan-500/10',
};
const STATUS_STYLE = {
  success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  failed: 'bg-red-500/10 text-red-400 border-red-500/30',
  pending: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
};

// ─── Component ──────────────────────────────────────────────
export default function AdminDashboardPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [breakdown, setBreakdown] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedTx, setExpandedTx] = useState(null);

  // ── Auth check ──
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/admin/auth/me');
        const data = await res.json();
        if (mounted) {
          if (res.ok && data.success) setAdmin(data.admin);
          else router.replace('/admin/login');
        }
      } catch {
        if (mounted) router.replace('/admin/login');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [router]);

  // ── Fetch stats ──
  const fetchStats = async () => {
    setDataLoading(true);
    try {
      const res = await fetch('/api/admin/stats');
      const data = await res.json();
      if (res.ok && data.success) {
        setStats(data.stats);
        setBreakdown(data.breakdown || {});
        setTransactions(data.recentTransactions || []);
        setUsers(data.users || []);
      }
    } catch (e) {
      console.error('Failed to fetch admin stats:', e);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    if (admin) fetchStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [admin]);

  // ── Filtered transactions ──
  const filteredTx = useMemo(() => {
    return transactions.filter((tx) => {
      if (serviceFilter !== 'all' && tx.type !== serviceFilter) return false;
      if (statusFilter !== 'all' && tx.status !== statusFilter) return false;
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        return (
          tx.reference?.toLowerCase().includes(q) ||
          tx.serviceName?.toLowerCase().includes(q) ||
          tx.recipient?.toLowerCase().includes(q) ||
          tx.customerEmail?.toLowerCase().includes(q) ||
          tx.vtpassTransactionId?.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [transactions, serviceFilter, statusFilter, searchTerm]);

  // ── Logout ──
  const handleLogout = async () => {
    setLoggingOut(true);
    try { await fetch('/api/admin/auth/logout', { method: 'POST' }); } catch {}
    router.replace('/admin/login');
  };

  // ── Loading state ──
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
          <span className="text-sm font-medium">Verifying admin session...</span>
        </div>
      </div>
    );
  }

  // ─────────────────────── RENDER ───────────────────────────
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'transactions', label: `Transactions${stats ? ` (${stats.totalTransactions})` : ''}` },
    { id: 'users', label: `Users${stats ? ` (${stats.totalUsers})` : ''}` },
    { id: 'settings', label: 'Profile & Settings' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-orange-500 selection:text-white">
      {/* ── Top Nav ── */}
      <header className="border-b border-slate-800 bg-slate-900/70 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-lg">
              <Shield className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-sm tracking-tight text-white">SoftTap Admin</span>
          </div>
          <div className="flex items-center gap-3">
            {admin && (
              <button
                onClick={() => setActiveTab('settings')}
                className="hidden sm:inline text-[11px] text-slate-400 font-medium hover:text-orange-400 transition cursor-pointer"
                title="Edit profile & settings"
              >
                {admin.email}
              </button>
            )}
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
            >
              {loggingOut ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <LogOut className="w-3.5 h-3.5" />}
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* ── Tab Bar ── */}
      <div className="border-b border-slate-800 bg-slate-900/40">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex items-center gap-1 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition cursor-pointer ${
                activeTab === t.id
                  ? 'border-orange-500 text-orange-400'
                  : 'border-transparent text-slate-500 hover:text-slate-300'
              }`}
            >
              {t.label}
            </button>
          ))}
          <div className="ml-auto">
            <button
              onClick={fetchStats}
              disabled={dataLoading}
              className="px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5 transition cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${dataLoading ? 'animate-spin text-orange-400' : ''}`} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <main className="flex-1 max-w-[1400px] mx-auto w-full px-4 sm:px-6 py-6 space-y-6">
        {!stats && dataLoading && (
          <div className="flex items-center justify-center py-20 text-slate-500">
            <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading dashboard data...
          </div>
        )}

        {stats && activeTab === 'overview' && <OverviewTab stats={stats} breakdown={breakdown} />}
        {stats && activeTab === 'transactions' && (
          <TransactionsTab
            transactions={filteredTx}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            serviceFilter={serviceFilter}
            setServiceFilter={setServiceFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            expandedTx={expandedTx}
            setExpandedTx={setExpandedTx}
          />
        )}
        {stats && activeTab === 'users' && <UsersTab users={users} />}
        {activeTab === 'settings' && <SettingsTab admin={admin} setAdmin={setAdmin} />}
      </main>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// TAB 1: OVERVIEW
// ═══════════════════════════════════════════════════════════
function OverviewTab({ stats, breakdown }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Total Sales" value={money(stats.totalVolume)} sub={`${stats.successCount || 0} successful`} icon={Wallet} accent="blue" />
        <KPICard label="Total Cost" value={money(stats.totalCost)} sub="Actual provider cost" icon={ArrowUpRight} accent="slate" />
        <KPICard label="Net Profit" value={money(stats.totalProfit)} sub={`${stats.marginPercent}% margin`} icon={TrendingUp} accent="emerald" highlight />
        <KPICard label="Registered Users" value={stats.totalUsers} sub="Account holders" icon={Users} accent="purple" />
      </div>

      {/* Status Row */}
      <div className="grid grid-cols-3 sm:grid-cols-3 gap-4">
        <StatusCard label="Successful" count={stats.successCount || 0} icon={CheckCircle2} color="text-emerald-400" bg="bg-emerald-500/10" />
        <StatusCard label="Failed" count={stats.failedCount || 0} icon={XCircle} color="text-red-400" bg="bg-red-500/10" />
        <StatusCard label="Pending" count={stats.pendingCount || 0} icon={Clock} color="text-amber-400" bg="bg-amber-500/10" />
      </div>

      {/* Service Breakdown */}
      <div>
        <h2 className="text-sm font-bold text-slate-300 mb-3 flex items-center gap-2">
          <Activity className="w-4 h-4 text-orange-400" /> Sales by Service
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {Object.entries(breakdown).map(([key, data]) => {
            const Icon = SERVICE_ICONS[key] || Wifi;
            const colors = SERVICE_COLORS[key] || SERVICE_COLORS.data;
            const label = key.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase());
            return (
              <div key={key} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg ${colors}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>
                </div>
                <p className="text-lg font-black text-white">{data.count || 0}</p>
                <div className="text-[11px] space-y-0.5">
                  <div className="flex justify-between text-slate-500">
                    <span>Volume</span>
                    <span className="text-slate-300 font-semibold">{money(data.volume)}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Profit</span>
                    <span className="text-emerald-400 font-bold">{money(data.profit)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function KPICard({ label, value, sub, icon: Icon, accent, highlight }) {
  const border = highlight ? 'border-emerald-500/30' : 'border-slate-800';
  const bg = highlight ? 'bg-emerald-950/20' : 'bg-slate-900/60';
  const valColor = highlight ? 'text-emerald-400' : 'text-white';
  return (
    <div className={`p-5 rounded-2xl ${bg} border ${border} space-y-1.5`}>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{label}</span>
        <Icon className={`w-4 h-4 text-${accent}-400 opacity-60`} />
      </div>
      <p className={`text-xl sm:text-2xl font-black ${valColor} tracking-tight`}>{value}</p>
      {sub && <p className="text-[11px] text-slate-500">{sub}</p>}
    </div>
  );
}

function StatusCard({ label, count, icon: Icon, color, bg }) {
  return (
    <div className={`p-4 rounded-xl ${bg} border border-slate-800 flex items-center gap-3`}>
      <Icon className={`w-5 h-5 ${color}`} />
      <div>
        <p className={`text-lg font-black ${color}`}>{count}</p>
        <p className="text-[11px] text-slate-500 font-semibold">{label}</p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// TAB 2: TRANSACTIONS
// ═══════════════════════════════════════════════════════════
function TransactionsTab({
  transactions, searchTerm, setSearchTerm,
  serviceFilter, setServiceFilter,
  statusFilter, setStatusFilter,
  expandedTx, setExpandedTx,
}) {
  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search reference, recipient, email, VTpass ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-orange-500"
          />
        </div>

        <div className="flex gap-1.5 flex-wrap">
          {['all', 'data', 'airtime', 'tv', 'electricity', 'exam_pin', 'wallet_funding'].map((t) => (
            <button
              key={t}
              onClick={() => setServiceFilter(t)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase transition ${
                serviceFilter === t ? 'bg-orange-500 text-white' : 'bg-slate-900 text-slate-500 hover:text-white border border-slate-800'
              }`}
            >
              {t === 'all' ? 'All' : t.replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="flex gap-1.5">
          {['all', 'success', 'failed', 'pending'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold capitalize transition ${
                statusFilter === s ? 'bg-slate-700 text-white' : 'bg-slate-900 text-slate-500 hover:text-white border border-slate-800'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto max-h-[65vh]">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-slate-500 uppercase tracking-wider text-[10px] sticky top-0 z-10">
              <tr>
                <th className="px-3 py-2.5">Reference</th>
                <th className="px-3 py-2.5">Service</th>
                <th className="px-3 py-2.5">Recipient</th>
                <th className="px-3 py-2.5 text-right">Amount</th>
                <th className="px-3 py-2.5 text-right">Cost</th>
                <th className="px-3 py-2.5 text-right">Profit</th>
                <th className="px-3 py-2.5">Status</th>
                <th className="px-3 py-2.5">Date</th>
                <th className="px-3 py-2.5 w-8"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {transactions.length === 0 && (
                <tr>
                  <td colSpan="9" className="px-3 py-12 text-center text-slate-600">
                    No transactions match your filters.
                  </td>
                </tr>
              )}
              {transactions.map((tx) => {
                const isExpanded = expandedTx === tx._id;
                return (
                  <TxRow key={tx._id} tx={tx} isExpanded={isExpanded} onToggle={() => setExpandedTx(isExpanded ? null : tx._id)} />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-[11px] text-slate-600 text-right">
        Showing {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
      </p>
    </div>
  );
}

function TxRow({ tx, isExpanded, onToggle }) {
  const costDisplay = tx.costPrice ?? 0;
  const profitDisplay = tx.profit ?? 0;

  return (
    <>
      <tr
        onClick={onToggle}
        className="hover:bg-slate-900/50 cursor-pointer transition text-slate-300"
      >
        <td className="px-3 py-2.5 font-mono text-[10px] text-slate-500 max-w-[140px] truncate" title={tx.reference}>
          {tx.reference}
        </td>
        <td className="px-3 py-2.5 font-semibold text-white text-[11px] max-w-[180px] truncate">
          {tx.serviceName || tx.type}
        </td>
        <td className="px-3 py-2.5 font-mono text-slate-400 text-[11px]">
          {tx.recipient || tx.customerEmail || '—'}
        </td>
        <td className="px-3 py-2.5 text-right font-bold text-white">
          {money(tx.amount)}
        </td>
        <td className="px-3 py-2.5 text-right text-slate-400">
          {costDisplay > 0 ? money(costDisplay) : <span className="text-slate-600">—</span>}
        </td>
        <td className="px-3 py-2.5 text-right font-bold text-emerald-400">
          {profitDisplay > 0 ? `+${money(profitDisplay)}` : <span className="text-slate-600">₦0</span>}
        </td>
        <td className="px-3 py-2.5">
          <span className={`inline-flex px-2 py-0.5 rounded-full border text-[10px] font-bold capitalize ${STATUS_STYLE[tx.status] || STATUS_STYLE.pending}`}>
            {tx.status}
          </span>
        </td>
        <td className="px-3 py-2.5 text-slate-500 text-[11px] whitespace-nowrap">
          {shortDate(tx.createdAt)}
          <span className="text-slate-700 ml-1">{shortTime(tx.createdAt)}</span>
        </td>
        <td className="px-3 py-2.5">
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-slate-500" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-600" />}
        </td>
      </tr>

      {isExpanded && (
        <tr>
          <td colSpan="9" className="bg-slate-900/60 px-4 py-4">
            <TxDetail tx={tx} />
          </td>
        </tr>
      )}
    </>
  );
}

function TxDetail({ tx }) {
  const rows = [
    ['Reference', tx.reference],
    ['Service', tx.serviceName],
    ['Type', tx.type],
    ['Recipient', tx.recipient || '—'],
    ['Customer Email', tx.customerEmail || '—'],
    ['Payment Method', tx.paymentMethod || '—'],
    ['Status', tx.status],
    ['Date', `${shortDate(tx.createdAt)} ${shortTime(tx.createdAt)}`],
  ];

  const accountingRows = [
    ['Customer Amount', money(tx.amount)],
    ['Cost Price', tx.costPrice != null && tx.costPrice > 0 ? money(tx.costPrice) : '₦0'],
    ['Profit', tx.profit != null && tx.profit > 0 ? money(tx.profit) : '₦0'],
  ];

  const vtpassRows = [];
  if (tx.vtpassTransactionId) vtpassRows.push(['VTpass Transaction ID', tx.vtpassTransactionId]);
  if (tx.vtpassAmount != null) vtpassRows.push(['VTpass Amount', money(tx.vtpassAmount)]);
  if (tx.vtpassCommission != null) vtpassRows.push(['VTpass Commission', money(tx.vtpassCommission)]);
  if (tx.vtpassTotalAmount != null) vtpassRows.push(['VTpass Total (Cost)', money(tx.vtpassTotalAmount)]);
  if (tx.variationCode) vtpassRows.push(['Variation Code', tx.variationCode]);

  const walletRows = [];
  if (tx.previousBalance != null) walletRows.push(['Previous Balance', money(tx.previousBalance)]);
  if (tx.newBalance != null) walletRows.push(['New Balance', money(tx.newBalance)]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-[11px]">
      <DetailSection title="Transaction" rows={rows} />
      <DetailSection title="Accounting" rows={accountingRows} highlight />
      {vtpassRows.length > 0 && <DetailSection title="VTpass Details" rows={vtpassRows} />}
      {walletRows.length > 0 && <DetailSection title="Wallet" rows={walletRows} />}
      {tx.details?.token && (
        <div className="p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/20 space-y-1">
          <span className="text-[10px] font-bold text-yellow-400 uppercase">Meter Token</span>
          <p className="font-mono font-black text-yellow-300 tracking-widest">{tx.details.token}</p>
        </div>
      )}
      {tx.details?.pins && (
        <div className="p-3 rounded-lg bg-purple-500/5 border border-purple-500/20 space-y-1">
          <span className="text-[10px] font-bold text-purple-400 uppercase">Generated PINs</span>
          {tx.details.pins.map((p, i) => (
            <div key={i} className="font-mono text-slate-300 text-[10px]">
              Serial: <span className="text-white font-bold">{p.serialNumber}</span> · PIN: <span className="text-purple-400 font-bold">{p.pin}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DetailSection({ title, rows, highlight }) {
  return (
    <div className={`p-3 rounded-lg border space-y-1.5 ${highlight ? 'bg-emerald-950/10 border-emerald-500/20' : 'bg-slate-950/40 border-slate-800'}`}>
      <span className={`text-[10px] font-bold uppercase tracking-wider ${highlight ? 'text-emerald-400' : 'text-slate-500'}`}>{title}</span>
      {rows.map(([label, value], i) => (
        <div key={i} className="flex justify-between gap-4">
          <span className="text-slate-500 shrink-0">{label}</span>
          <span className="font-semibold text-slate-200 text-right truncate">{value}</span>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// TAB 3: USERS
// ═══════════════════════════════════════════════════════════
function UsersTab({ users }) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search) return users;
    const q = search.toLowerCase();
    return users.filter(
      (u) =>
        u.firstName?.toLowerCase().includes(q) ||
        u.lastName?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        u.phone?.includes(q)
    );
  }, [users, search]);

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-sm font-bold text-slate-300 flex items-center gap-2">
          <Users className="w-4 h-4 text-purple-400" /> Registered Users ({filtered.length})
        </h2>
        <div className="relative w-full max-w-xs">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search name, email, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs placeholder-slate-600 focus:outline-none focus:border-orange-500"
          />
        </div>
      </div>

      <div className="rounded-xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto max-h-[65vh]">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900 text-slate-500 uppercase tracking-wider text-[10px] sticky top-0">
              <tr>
                <th className="px-3 py-2.5">Name</th>
                <th className="px-3 py-2.5">Email</th>
                <th className="px-3 py-2.5">Phone</th>
                <th className="px-3 py-2.5">Role</th>
                <th className="px-3 py-2.5 text-right">Wallet</th>
                <th className="px-3 py-2.5">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-3 py-12 text-center text-slate-600">
                    No users found.
                  </td>
                </tr>
              )}
              {filtered.map((u) => (
                <tr key={u._id} className="hover:bg-slate-900/40 transition text-slate-300">
                  <td className="px-3 py-2.5 font-semibold text-white">{u.firstName} {u.lastName}</td>
                  <td className="px-3 py-2.5 text-slate-400">{u.email}</td>
                  <td className="px-3 py-2.5 font-mono text-slate-400">{u.phone}</td>
                  <td className="px-3 py-2.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      u.role === 'admin' ? 'bg-orange-500/10 text-orange-400' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 text-right font-bold text-emerald-400">
                    {money(u.walletBalance)}
                  </td>
                  <td className="px-3 py-2.5 text-slate-500 text-[11px]">{shortDate(u.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// TAB 4: SETTINGS & PROFILE
// ═══════════════════════════════════════════════════════════
function SettingsTab({ admin, setAdmin }) {
  const [firstName, setFirstName] = useState(admin?.firstName || '');
  const [lastName, setLastName] = useState(admin?.lastName || '');
  const [phone, setPhone] = useState(admin?.phone || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState({ type: '', text: '' });

  // Fetch latest profile details on mount
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/admin/profile');
        const data = await res.json();
        if (res.ok && data.success && data.admin) {
          setFirstName(data.admin.firstName || '');
          setLastName(data.admin.lastName || '');
          setPhone(data.admin.phone || '');
        }
      } catch {}
    })();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setMsg({ type: '', text: '' });

    if (newPassword) {
      if (newPassword.length < 6) {
        setMsg({ type: 'error', text: 'New password must be at least 6 characters long' });
        return;
      }
      if (newPassword !== confirmPassword) {
        setMsg({ type: 'error', text: 'New password and confirmation do not match' });
        return;
      }
      if (!currentPassword) {
        setMsg({ type: 'error', text: 'Please enter your current password to set a new password' });
        return;
      }
    }

    setSaving(true);
    try {
      const res = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          currentPassword: currentPassword || undefined,
          newPassword: newPassword || undefined,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setMsg({ type: 'success', text: data.message || 'Profile updated successfully!' });
        if (setAdmin && data.admin) {
          setAdmin((prev) => ({ ...prev, ...data.admin }));
        }
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setMsg({ type: 'error', text: data.message || 'Failed to update profile' });
      }
    } catch {
      setMsg({ type: 'error', text: 'An unexpected error occurred while saving.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-200">
      <div>
        <h2 className="text-base font-bold text-white">Admin Profile &amp; Settings</h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Update your contact details and security credentials for your administrator account.
        </p>
      </div>

      {msg.text && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-semibold flex items-center gap-2 ${
            msg.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
              : 'bg-red-500/10 border-red-500/30 text-red-400'
          }`}
        >
          {msg.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
          {msg.text}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 bg-slate-900 border border-slate-800 rounded-2xl p-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-2">
            Personal Information
          </h3>

          <div>
            <label className="block text-[11px] font-semibold text-slate-400 mb-1">
              Admin Email (Read-Only)
            </label>
            <input
              type="text"
              value={admin?.email || ''}
              disabled
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/60 border border-slate-800 text-slate-500 text-xs font-mono cursor-not-allowed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                First Name
              </label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Last Name
              </label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="08012345678"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        {/* Change Password */}
        <div className="space-y-4 pt-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-2">
            Change Password (Optional)
          </h3>
          <p className="text-[11px] text-slate-500">
            Leave blank if you do not want to change your current login password.
          </p>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Current Password
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter your current password"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password (min 6 chars)"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-orange-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
            {saving ? 'Saving Changes...' : 'Save Profile Details'}
          </button>
        </div>
      </form>
    </div>
  );
}
