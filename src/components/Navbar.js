'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Zap, LogIn, UserPlus, Shield, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0b0914]/90 backdrop-blur-xl border-b border-emerald-500/20 py-4 shadow-2xl shadow-emerald-950/20'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-400 p-0.5 shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#0b0914] rounded-[10px] flex items-center justify-center">
              <Zap className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
            </div>
          </div>
          <span className="text-2xl font-extrabold tracking-tight">
            <span className="gradient-text-emerald">Soft</span>
            <span className="text-white">Tap</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-300">
          <li className="hover:text-emerald-400 transition-colors">
            <Link href="/#home" className="hover:text-emerald-400">Home</Link>
          </li>
          <li className="hover:text-emerald-400 transition-colors">
            <Link href="/#features">Features</Link>
          </li>
          <li className="hover:text-emerald-400 transition-colors">
            <Link href="/#pricing">Pricing</Link>
          </li>
          <li className="hover:text-emerald-400 transition-colors">
            <Link href="/#about">About Us</Link>
          </li>
          <li className="hover:text-emerald-400 transition-colors">
            <Link href="/#faq">FAQ</Link>
          </li>
          <li className="hover:text-emerald-400 transition-colors">
            <Link href="/#contact">Contact</Link>
          </li>
        </ul>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="px-5 py-2.5 rounded-full border border-slate-700 hover:border-emerald-500/50 text-slate-200 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 transition-all text-sm font-semibold flex items-center gap-2"
          >
            <LogIn className="w-4 h-4 text-emerald-400" />
            Login
          </Link>
          <Link
            href="/register"
            className="px-6 py-2.5 rounded-full gradient-btn-primary text-slate-950 font-bold text-sm transition-all flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            Register
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-slate-900 text-slate-300 hover:text-white border border-slate-800"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0f1d]/98 backdrop-blur-2xl border-b border-emerald-500/20 px-6 py-6 shadow-2xl transition-all animate-in slide-in-from-top duration-300">
          <ul className="flex flex-col gap-4 font-medium text-slate-200 text-base mb-6">
            <li>
              <Link href="/#home" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-emerald-400">Home</Link>
            </li>
            <li>
              <Link href="/#features" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-emerald-400">Features</Link>
            </li>
            <li>
              <Link href="/#pricing" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-emerald-400">Pricing</Link>
            </li>
            <li>
              <Link href="/#about" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-emerald-400">About Us</Link>
            </li>
            <li>
              <Link href="/#faq" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-emerald-400">FAQ</Link>
            </li>
            <li>
              <Link href="/#contact" onClick={() => setMobileMenuOpen(false)} className="block py-2 hover:text-emerald-400">Contact</Link>
            </li>
          </ul>

          <div className="flex flex-col gap-3">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl border border-slate-700 text-center text-slate-200 bg-slate-900 hover:bg-slate-800 transition font-semibold"
            >
              Login
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl gradient-btn-primary text-center text-slate-950 font-bold transition"
            >
              Register Account
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
