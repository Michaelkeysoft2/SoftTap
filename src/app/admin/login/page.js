'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Lock, Mail, ArrowRight, Loader2, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Successfully authenticated, cookie is set HTTP-only
        router.replace('/admin');
      } else {
        setErrorMsg(data.message || 'Invalid credentials or unauthorized access');
      }
    } catch {
      setErrorMsg('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 selection:bg-orange-500 selection:text-white">
      {/* Background ambient glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
          {/* Header */}
          <div className="text-center space-y-2 mb-8">
            <div className="inline-flex p-3 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400 mb-2 shadow-inner">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white">
              SoftTap Admin Portal
            </h1>
            <p className="text-xs text-slate-400 font-medium">
              Restricted management gateway. Authorized personnel only.
            </p>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold flex items-center gap-2.5 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="admin@softtap.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-950/70 border border-slate-800 rounded-xl text-sm font-medium text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-11 py-3 bg-slate-950/70 border border-slate-800 rounded-xl text-sm font-medium text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-[0.98] disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 transition duration-150 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Admin Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer note */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 text-center">
            <p className="text-[11px] text-slate-500">
              Session is encrypted &amp; logged. Unauthorized attempts are monitored.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
