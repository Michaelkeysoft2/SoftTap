'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Zap, LayoutDashboard, Wifi, Signal, Tv, Lightbulb, BookOpen, 
  Wallet, History, User, LogOut, Menu, X, Shield, Sparkles 
} from 'lucide-react';

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('softtap_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('softtap_user');
    window.location.href = '/login';
  };

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Buy Data', href: '/dashboard/buy-data', icon: Wifi },
    { name: 'Buy Airtime', href: '/dashboard/buy-airtime', icon: Signal },
    { name: 'TV Subscription', href: '/dashboard/tv-subscription', icon: Tv },
    { name: 'Electricity Bills', href: '/dashboard/electricity', icon: Lightbulb },
    { name: 'Result Checker Pins', href: '/dashboard/result-checker', icon: BookOpen },
    { name: 'Fund Wallet', href: '/dashboard/fund-wallet', icon: Wallet },
    { name: 'Transaction History', href: '/dashboard/transactions', icon: History },
    { name: 'Profile Settings', href: '/dashboard/profile', icon: User },
  ];

  if (user?.role === 'admin') {
    navItems.push({ name: 'Admin Control Panel', href: '/admin', icon: Shield });
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col md:flex-row selection:bg-orange-400 selection:text-white">
      {/* Mobile Top Nav */}
      <div className="md:hidden bg-[#0a0f1d] border-b border-slate-800 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-500 to-cyan-400 p-0.5">
            <div className="w-full h-full bg-[#0b0914] rounded-[6px] flex items-center justify-center">
              <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
            </div>
          </div>
          <span className="text-xl font-bold tracking-tight">
            <span className="gradient-text-emerald">Soft</span>
            <span className="text-white">Tap</span>
          </span>
        </Link>

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-slate-900 text-slate-300 border border-slate-800"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 h-screen w-72 bg-[#0a0e1a] border-r border-slate-800/80 p-6 flex flex-col justify-between transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-8">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2 px-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-400 p-0.5 shadow-lg shadow-emerald-500/20">
              <div className="w-full h-full bg-[#0b0914] rounded-[10px] flex items-center justify-center">
                <Zap className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
              </div>
            </div>
            <span className="text-2xl font-extrabold tracking-tight">
              <span className="gradient-text-emerald">Soft</span>
              <span className="text-white">Tap</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-semibold shadow-md shadow-emerald-950/20'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Card & Logout */}
        <div className="pt-4 border-t border-slate-800/80 space-y-3">
          {user && (
            <div className="flex items-center gap-3 px-2">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-sm">
                {user.firstName ? user.firstName[0] : 'U'}
              </div>
              <div className="truncate">
                <p className="text-sm font-bold text-white truncate">{user.firstName} {user.lastName}</p>
                <p className="text-xs text-slate-400 truncate">{user.email}</p>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 font-semibold text-sm transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 max-w-7xl mx-auto w-full space-y-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
