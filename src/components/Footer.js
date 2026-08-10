import Link from 'next/link';
import { Mail, Phone, Send, Twitter, Shield, Heart, Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#05080f] text-slate-300 pt-16 pb-8 border-t border-slate-800/80 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">
        {/* Brand Column */}
        <div className="md:col-span-1 space-y-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-emerald-500 to-cyan-400 p-0.5 shadow-md shadow-emerald-500/20">
              <div className="w-full h-full bg-[#0b0914] rounded-[7px] flex items-center justify-center">
                <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
              </div>
            </div>
            <span className="text-2xl font-bold tracking-tight">
              <span className="gradient-text-emerald">Soft</span>
              <span className="text-white">Tap</span>
            </span>
          </Link>
          <p className="text-slate-400 text-sm leading-relaxed">
            Your premium, automated platform for cheap data bundles, instant airtime, cable TV subscriptions, electricity token payments, and exam pins.
          </p>
          <div className="pt-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Shield className="w-3.5 h-3.5" /> 100% Instant Delivery Guaranteed
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-bold text-base mb-4 tracking-wide uppercase text-xs text-emerald-400">Quick Links</h3>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li><Link href="/#home" className="hover:text-emerald-400 transition-colors">Home</Link></li>
            <li><Link href="/#features" className="hover:text-emerald-400 transition-colors">Services & Features</Link></li>
            <li><Link href="/#pricing" className="hover:text-emerald-400 transition-colors">Plans & Pricing</Link></li>
            <li><Link href="/#about" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
            <li><Link href="/#faq" className="hover:text-emerald-400 transition-colors">Frequently Asked Questions</Link></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-white font-bold text-base mb-4 tracking-wide uppercase text-xs text-emerald-400">Our Services</h3>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li><Link href="/login" className="hover:text-emerald-400 transition-colors">Buy Cheap Data Bundles</Link></li>
            <li><Link href="/login" className="hover:text-emerald-400 transition-colors">Airtime Top-Up (All Networks)</Link></li>
            <li><Link href="/login" className="hover:text-emerald-400 transition-colors">DSTV, GOTV & Startimes</Link></li>
            <li><Link href="/login" className="hover:text-emerald-400 transition-colors">Prepaid Meter Electricity</Link></li>
            <li><Link href="/login" className="hover:text-emerald-400 transition-colors">WAEC & NECO Result Pins</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-bold text-base mb-4 tracking-wide uppercase text-xs text-emerald-400">Connect With Us</h3>
          <div className="space-y-3 text-sm text-slate-300">
            <a href="tel:08039579410" className="flex items-center gap-3 hover:text-emerald-400 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <span>08039579410</span>
            </a>

            <a href="mailto:michaelkeysofy@gmail.com" className="flex items-center gap-3 hover:text-emerald-400 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <span className="truncate">michaelkeysofy@gmail.com</span>
            </a>

            <div className="pt-2 flex items-center gap-3">
              {/* Social Media links */}
              <a
                href="https://t.me/michalkeysoft"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-all"
                title="Telegram @michalkeysoft"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com/michalkeysoft"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
                title="Twitter @michalkeysoft"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com/@michalkeysoft"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-violet-400 hover:border-violet-500/40 transition-all font-bold text-xs"
                title="TikTok @michalkeysoft"
              >
                TT
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom copyright line */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 pt-6 border-t border-slate-800/60 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
        <p>© 2026 SoftTap. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Powered by <span className="font-bold text-emerald-400 hover:underline cursor-pointer">michalkeysoft</span>
        </p>
      </div>
    </footer>
  );
}
