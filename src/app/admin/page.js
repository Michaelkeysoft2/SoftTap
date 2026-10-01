'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, CheckCircle2, LogOut, Loader2, User, KeyRound } from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function checkAuth() {
      try {
        const res = await fetch('/api/admin/auth/me');
        const data = await res.json();

        if (isMounted) {
          if (res.ok && data.success) {
            setAdmin(data.admin);
          } else {
            // Not authenticated, redirect to admin login
            router.replace('/admin/login');
          }
        }
      } catch {
        if (isMounted) router.replace('/admin/login');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' });
    } catch {
      // ignore
    } finally {
      router.replace('/admin/login');
    }
  };

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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-orange-500 selection:text-white">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-xl">
              <Shield className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-base tracking-tight text-white">
              SoftTap Admin
            </span>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
              Authenticated
            </span>
          </div>

          <div className="flex items-center gap-4">
            {admin && (
              <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400 border-r border-slate-800 pr-4">
                <User className="w-3.5 h-3.5 text-slate-500" />
                <span className="font-medium text-slate-300">{admin.email}</span>
                <span className="text-[10px] bg-slate-800 text-orange-400 px-1.5 py-0.5 rounded font-mono font-semibold">
                  {admin.role}
                </span>
              </div>
            )}

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold flex items-center gap-2 transition disabled:opacity-50 cursor-pointer"
            >
              {loggingOut ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <LogOut className="w-3.5 h-3.5" />
              )}
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Placeholder */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-lg w-full bg-slate-900/80 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl text-center space-y-6">
          <div className="inline-flex p-4 rounded-3xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-inner">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              SoftTap Admin Dashboard
            </h1>
            <p className="text-base text-emerald-400 font-semibold flex items-center justify-center gap-2">
              <span>Admin authentication is working.</span>
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 text-left space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-500" /> Authenticated Admin:
              </span>
              <span className="font-bold text-white font-mono">{admin?.email || 'N/A'}</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-slate-500" /> Account Role:
              </span>
              <span className="font-bold text-orange-400 uppercase tracking-wider">{admin?.role || 'admin'}</span>
            </div>
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-slate-500" /> Access Status:
              </span>
              <span className="font-bold text-emerald-400">Authorized &amp; Verified</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out of Admin</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
