'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Zap, LogIn, UserPlus } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/#home' },
    { label: 'About Us', href: '/#about' },
    { label: 'Features', href: '/#features' },
    { label: 'FAQ', href: '/#faq' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'Contact Us', href: '/#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'navbar-scrolled' : 'navbar-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-orange-400 flex items-center justify-center shadow-md shadow-orange-200 group-hover:scale-105 transition-transform">
            <Zap className="w-5 h-5 text-white fill-white/30" />
          </div>
          <span className="text-xl sm:text-2xl font-extrabold tracking-tight">
            <span className="text-orange-500">Soft</span>
            <span className={scrolled ? 'text-blue-900' : 'text-white'}>Tap</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className={`hidden lg:flex items-center gap-6 xl:gap-8 font-medium text-sm transition-colors duration-300 ${scrolled ? 'text-gray-700' : 'text-white'}`}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`hover:text-orange-500 transition-colors font-semibold ${
                  link.label === 'Home' ? 'text-orange-500' : ''
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/login"
            className={`px-5 py-2 rounded-full text-sm font-semibold border transition-all ${
              scrolled
                ? 'border-gray-200 text-gray-700 hover:bg-orange-50 hover:text-orange-500 hover:border-orange-200'
                : 'border-white/20 text-white hover:bg-orange-500/70'
            }`}
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-5 py-2 rounded-full text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 transition-all shadow-md"
          >
            Register
          </Link>
        </div>

        {/* Mobile / Tablet Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`lg:hidden p-2 rounded-xl transition-colors ${scrolled ? 'text-gray-800 bg-gray-100' : 'text-white bg-white/10 backdrop-blur-md'}`}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile / Tablet Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-xl border-t border-gray-100 shadow-2xl px-6 py-6 transition-all animate-in slide-in-from-top duration-300">
          <ul className="flex flex-col gap-3 mb-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-gray-800 font-bold hover:text-orange-500 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl text-center text-gray-700 bg-gray-100 border border-gray-200 font-bold hover:bg-orange-50 hover:text-orange-500 transition"
            >
              Login
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl text-center text-white font-bold bg-orange-500 hover:bg-orange-600 transition shadow-md"
            >
              Register Account
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
