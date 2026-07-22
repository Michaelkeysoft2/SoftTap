'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, ArrowLeft, Send } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setMessage('If an account exists with this email, reset instructions have been sent.');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-black">
      <Navbar />

      <main className="flex-1 flex items-center justify-center pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="w-full max-w-md space-y-6 relative z-10">
          <div className="glass-panel p-8 rounded-3xl shadow-2xl border border-slate-800/80 space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-extrabold text-white">Reset Password</h1>
              <p className="text-slate-400 text-xs sm:text-sm">
                Enter your registered email address to receive password reset instructions.
              </p>
            </div>

            {message && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs text-center font-medium">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900/90 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl gradient-btn-primary text-slate-950 font-bold text-base flex items-center justify-center gap-2 disabled:opacity-50 transition"
              >
                {loading ? 'Sending...' : 'Send Reset Link'} <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="text-center pt-2 border-t border-slate-800/80">
              <Link href="/login" className="text-xs text-slate-400 hover:text-emerald-400 font-semibold inline-flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" /> Back to Login
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
