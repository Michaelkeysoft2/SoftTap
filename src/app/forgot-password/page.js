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
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col justify-between selection:bg-orange-400 selection:text-white">
      <Navbar />

      <main className="flex-1 flex items-center justify-center pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="w-full max-w-md space-y-6 relative z-10">
          <div className="bg-white p-8 rounded-3xl shadow-md border border-gray-200 space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-extrabold text-blue-900">Reset Password</h1>
              <p className="text-gray-500 text-xs sm:text-sm">
                Enter your registered email address to receive password reset instructions.
              </p>
            </div>

            {message && (
              <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs text-center font-medium">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-500 text-sm transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl btn-orange text-sm flex items-center justify-center gap-2 disabled:opacity-50 transition shadow-md"
              >
                {loading ? 'Sending...' : 'Send Reset Link'} <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="text-center pt-2 border-t border-gray-100">
              <Link href="/login" className="text-xs text-gray-500 hover:text-orange-600 font-semibold inline-flex items-center gap-1">
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
