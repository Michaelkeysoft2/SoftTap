'use client';

import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FAQAccordion from '@/components/FAQAccordion';
import QuickPurchaseModal from '@/components/QuickPurchaseModal';
import InstantRechargeCard from '@/components/InstantRechargeCard';
import { useState } from 'react';
import {
  Wifi, Tv, Lightbulb, Signal, LogIn, UserPlus,
  Shield, Target, Users, CheckCircle2, Star,
  Phone, Mail, MessageSquare, BookOpen, Zap, ChevronDown, Linkedin, MapPin
} from 'lucide-react';

/* =============================================
   EXAM BODY LOGO BADGES – real SVG logos
   ============================================= */

function WaecBadge() {
  return (
    <div className="w-full h-44 flex items-center justify-center bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 rounded-2xl p-2 shadow-inner">
      <div className="w-32 h-32 flex items-center justify-center drop-shadow-md">
        <Image src="/logos/waec.svg" alt="WAEC" width={128} height={128} className="w-full h-full object-contain" />
      </div>
    </div>
  );
}

function NecoBadge() {
  return (
    <div className="w-full h-44 flex items-center justify-center bg-gradient-to-br from-emerald-950 via-green-900 to-teal-950 rounded-2xl p-2 shadow-inner">
      <div className="w-32 h-32 flex items-center justify-center drop-shadow-md">
        <Image src="/logos/neco.svg" alt="NECO" width={128} height={128} className="w-full h-full object-contain" />
      </div>
    </div>
  );
}

function NabtebBadge() {
  return (
    <div className="w-full h-44 flex items-center justify-center bg-gradient-to-br from-red-950 via-red-900 to-rose-950 rounded-2xl p-2 shadow-inner">
      <div className="w-32 h-32 flex items-center justify-center drop-shadow-md">
        <Image src="/logos/nabteb.svg" alt="NABTEB" width={128} height={128} className="w-full h-full object-contain" />
      </div>
    </div>
  );
}

function NbaisBadge() {
  return (
    <div className="w-full h-44 flex items-center justify-center bg-gradient-to-br from-purple-950 via-purple-900 to-indigo-950 rounded-2xl p-2 shadow-inner">
      <div className="w-32 h-32 flex items-center justify-center drop-shadow-md">
        <Image src="/logos/nbais.svg" alt="NBAIS" width={128} height={128} className="w-full h-full object-contain" />
      </div>
    </div>
  );
}

function NetworkLogo({ src, alt, color }) {
  return (
    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color} shadow-md overflow-hidden`}>
      <Image src={src} alt={alt} width={48} height={48} className="object-contain" />
    </div>
  );
}

/* ======= HERO SECTION BG (gradient instead of photo — no external image needed) ======= */

export default function Home() {
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [isQuickBuyOpen, setIsQuickBuyOpen] = useState(false);
  const [quickBuyTab, setQuickBuyTab] = useState('data');
  const [quickBuyInitialData, setQuickBuyInitialData] = useState({});

  const openQuickBuy = (tab) => {
    setQuickBuyTab(tab);
    setQuickBuyInitialData({});
    setIsQuickBuyOpen(true);
  };

  const handleDirectProceed = ({ tab, data }) => {
    setQuickBuyTab(tab);
    setQuickBuyInitialData(data);
    setIsQuickBuyOpen(true);
  };

  const faqs = [
    {
      q: 'Will my transaction be fulfilled immediately I make payment?',
      a: 'Yes! All transactions on SoftTap are processed instantly. Once your payment is confirmed, your order is delivered automatically within seconds.',
    },
    {
      q: 'I am new here, what are the Steps to Follow?',
      a: '1. Create a free account. 2. Fund your wallet via Paystack. 3. Select your desired service and place your order. It\'s that simple!',
    },
    {
      q: 'How much can I trust SoftTap?',
      a: 'SoftTap is powered by michalkeysoft and built with enterprise-grade security. All payments are processed via Paystack — Nigeria\'s most trusted payment gateway.',
    },
    {
      q: 'How do I fund my SoftTap wallet?',
      a: 'Go to Fund Wallet on your dashboard. You can fund via Paystack using any Nigerian debit card, bank transfer, or USSD.',
    },
    {
      q: 'Your question is not covered here?',
      a: 'Contact us directly via WhatsApp on 08039579410, email michaelkeysoft@gmail.com, or reach us on Telegram/TikTok/Twitter @michalkeysoft.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col">
      <Navbar />

      {/* ============================
          HERO SECTION 
          ============================ */}
      <section
        id="home"
        className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center px-6 sm:px-10 lg:px-16 pt-28 pb-16 text-white overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0b1329 0%, #0f172a 40%, #1e293b 80%, #0f172a 100%)',
        }}
      >
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
          {/* Left Column: Direct Punchy Value Proposition */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/40 text-orange-400 text-xs sm:text-sm font-bold tracking-wide shadow-sm">
              <Zap className="w-4 h-4 text-orange-400 fill-orange-400" /> Nigeria&apos;s #1 Instant VTU &amp; Bills Platform
            </div>
            
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-[1.12] text-white tracking-tight">
              Cheap Data, Airtime &amp; Bills <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">
                Delivered in 10 Seconds.
              </span>
            </h1>

            <p className="text-gray-300 font-medium text-base sm:text-lg max-w-xl leading-relaxed">
              Skip queues and delays. Buy MTN, Airtel, Glo, 9mobile data bundles, airtime top-ups, power tokens, cable TV, and exam pins instantly at guaranteed wholesale prices.
            </p>

            <div className="flex flex-row flex-wrap gap-3 pt-1">
              <Link href="/register">
                <button className="px-6 py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm sm:text-base transition shadow-lg shadow-orange-500/30 flex items-center gap-2 active:scale-95">
                  <UserPlus className="w-5 h-5" />
                  Create Free Account
                </button>
              </Link>
              <Link href="/login">
                <button className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 transition flex items-center gap-2 active:scale-95">
                  <LogIn className="w-5 h-5" />
                  Login
                </button>
              </Link>
            </div>

            {/* Quick Trust Badges */}
            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-semibold text-gray-300">
              <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-green-400" /> Instant Auto-Delivery
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                <Shield className="w-4 h-4 text-blue-400" /> Paystack Secured
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
                <Zap className="w-4 h-4 text-orange-400" /> Wholesale Rates
              </span>
            </div>
          </div>

          {/* Right Column: Direct Instant Recharge Card (Takes people direct into business) */}
          <div className="lg:col-span-6 flex justify-center items-center relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-orange-500/30 to-blue-600/30 rounded-3xl blur-2xl opacity-75" />
            <InstantRechargeCard onProceed={handleDirectProceed} />
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 opacity-60 animate-bounce pointer-events-none">
          <span className="text-xs text-white">Scroll for More</span>
          <ChevronDown className="w-4 h-4 text-white" />
        </div>
      </section>

      {/* ============================
          DIRECT POPULAR SHORTCUTS STRIP
          ============================ */}
      <section className="bg-slate-900 border-y border-white/10 py-4 px-4 sm:px-8 text-white relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-orange-500/20 text-orange-400 font-extrabold text-xs uppercase tracking-wider flex items-center gap-1 border border-orange-500/30">
              <Zap className="w-3.5 h-3.5 fill-orange-400" /> Direct Shortcuts
            </span>
            <span className="text-xs sm:text-sm text-gray-300 font-medium">Quick 1-Tap Recharges:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => openQuickBuy('data')}
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-orange-500 hover:text-white text-xs font-bold transition border border-white/10"
            >
              📶 MTN 1GB @ ₦290
            </button>
            <button
              onClick={() => openQuickBuy('data')}
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-orange-500 hover:text-white text-xs font-bold transition border border-white/10"
            >
              📶 Airtel 1GB @ ₦320
            </button>
            <button
              onClick={() => openQuickBuy('airtime')}
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-orange-500 hover:text-white text-xs font-bold transition border border-white/10"
            >
              ⚡ Airtime Top-Up
            </button>
            <button
              onClick={() => openQuickBuy('exam')}
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-orange-500 hover:text-white text-xs font-bold transition border border-white/10"
            >
              🎓 WAEC Pin (₦3,320)
            </button>
            <button
              onClick={() => openQuickBuy('tv')}
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-orange-500 hover:text-white text-xs font-bold transition border border-white/10"
            >
              📺 Cable TV
            </button>
            <button
              onClick={() => openQuickBuy('electricity')}
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-orange-500 hover:text-white text-xs font-bold transition border border-white/10"
            >
              💡 Power Token
            </button>
          </div>
        </div>
      </section>

      {/* ============================
          FEATURES SECTION (white bg)
          ============================ */}
      <section id="features" className="py-16 bg-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-10">
          <p className="section-tag">Features</p>
          <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl mt-2">
            Data, TV Subscription, Electricity Bills &amp; Airtime
          </h2>
          <div className="section-divider" />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Data */}
            <div className="brand-card p-6 flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-orange-50 flex items-center justify-center">
                <Wifi className="w-8 h-8 text-orange-500" />
              </div>
              <h4 className="text-lg font-bold text-blue-900">Data</h4>
              <p className="text-gray-600 text-sm">Swiftly purchase Data for all networks @cheap rates with instant delivery.</p>
              <button onClick={() => openQuickBuy('data')} className="btn-orange w-full mt-auto">Buy Now</button>
            </div>

            {/* TV */}
            <div className="brand-card p-6 flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center">
                <Tv className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-bold text-blue-900">TV Subscription</h4>
              <p className="text-gray-600 text-sm">Stay connected! Subscribe and Renew your TV subscription instantly.</p>
              <button onClick={() => openQuickBuy('tv')} className="btn-orange w-full mt-auto">Subscribe</button>
            </div>

            {/* Electricity */}
            <div className="brand-card p-6 flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-yellow-50 flex items-center justify-center">
                <Lightbulb className="w-8 h-8 text-yellow-500" />
              </div>
              <h4 className="text-lg font-bold text-blue-900">Electricity Bills</h4>
              <p className="text-gray-600 text-sm">Purchase prepaid meter tokens instantly and Pay estimated bill.</p>
              <button onClick={() => openQuickBuy('electricity')} className="btn-orange w-full mt-auto">Pay</button>
            </div>

            {/* Airtime */}
            <div className="brand-card p-6 flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center">
                <Signal className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-lg font-bold text-blue-900">Airtime</h4>
              <p className="text-gray-600 text-sm">Never run low on Airtime, purchase instantly for all networks.</p>
              <button onClick={() => openQuickBuy('airtime')} className="btn-orange w-full mt-auto">Buy Now</button>
            </div>
          </div>

        </div>
      </section>

      {/* ============================
          NETWORK LOGOS STRIP
          ============================ */}
      <section className="py-8 sm:py-10 bg-gray-50 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs sm:text-sm text-gray-500 font-semibold uppercase tracking-wide mb-6">We support all networks &amp; billers</p>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-3 sm:gap-4 md:gap-6 items-center justify-items-center">
            {/* MTN */}
            <div className="flex flex-col items-center gap-1.5 group">
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-200 bg-white p-1 transition-all">
                <Image src="/logos/mtn.jpg" alt="MTN" width={80} height={80} className="w-full h-full object-contain" />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-gray-700">MTN</span>
            </div>
            {/* Airtel */}
            <div className="flex flex-col items-center gap-1.5 group">
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-200 bg-white p-1 transition-all">
                <Image src="/logos/airtel.jpg" alt="Airtel" width={80} height={80} className="w-full h-full object-contain" />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-gray-700">Airtel</span>
            </div>
            {/* Glo */}
            <div className="flex flex-col items-center gap-1.5 group">
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-200 bg-white p-1 transition-all">
                <Image src="/logos/glo.jpg" alt="Glo" width={80} height={80} className="w-full h-full object-contain" />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-gray-700">Glo</span>
            </div>
            {/* 9mobile */}
            <div className="flex flex-col items-center gap-1.5 group">
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-200 bg-white p-1 transition-all">
                <Image src="/logos/9mobile.jpg" alt="9mobile" width={80} height={80} className="w-full h-full object-contain" />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-gray-700">9mobile</span>
            </div>
            {/* DStv */}
            <div className="flex flex-col items-center gap-1.5 group">
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-200 bg-white p-1 transition-all">
                <Image src="/logos/dstv.jpg" alt="DStv" width={80} height={80} className="w-full h-full object-contain" />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-gray-700">DStv</span>
            </div>
            {/* GOtv */}
            <div className="flex flex-col items-center gap-1.5 group">
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-200 bg-white p-1 transition-all">
                <Image src="/logos/gotv.jpg" alt="GOtv" width={80} height={80} className="w-full h-full object-contain" />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-gray-700">GOtv</span>
            </div>
            {/* StarTimes */}
            <div className="flex flex-col items-center gap-1.5 group col-span-2 sm:col-span-1">
              <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-200 bg-white p-1 transition-all">
                <Image src="/logos/startimes.svg" alt="StarTimes" width={80} height={80} className="w-full h-full object-contain" />
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-gray-700">StarTimes</span>
            </div>

          </div>
        </div>
      </section>

      {/* ============================
          E-PINS SECTION (gray-50 bg)
          ============================ */}
      <section className="py-16 bg-gray-50 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-10">
          <p className="section-tag">E-Pins Products</p>
          <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl mt-2">
            Educational Result Checker Pins
          </h2>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            You can purchase WAEC, NECO, NABTEB and NBAIS Result Checker Pins at Cheap Rates with Instant Delivery.
          </p>
          <div className="section-divider" />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* WAEC */}
            <div className="brand-card p-5 flex flex-col items-center gap-3">
              <WaecBadge />
              <h4 className="text-base sm:text-lg font-bold text-blue-900">WAEC Result Checker</h4>
              <p className="text-gray-500 text-xs">(Pin &amp; Serial No.)</p>
              <button onClick={() => openQuickBuy('exam_pin')} className="btn-orange w-full">Buy Now @ ₦3,320</button>
            </div>

            {/* NECO */}
            <div className="brand-card p-5 flex flex-col items-center gap-3">
              <NecoBadge />
              <h4 className="text-base sm:text-lg font-bold text-blue-900">NECO Result Checker</h4>
              <p className="text-gray-500 text-xs">(Token)</p>
              <button onClick={() => openQuickBuy('exam_pin')} className="btn-orange w-full">Buy Now @ ₦1,170</button>
            </div>

            {/* NABTEB */}
            <div className="brand-card p-5 flex flex-col items-center gap-3">
              <NabtebBadge />
              <h4 className="text-base sm:text-lg font-bold text-blue-900">NABTEB Result Checker</h4>
              <p className="text-gray-500 text-xs">(Pin &amp; Serial No.)</p>
              <button onClick={() => openQuickBuy('exam_pin')} className="btn-orange w-full">Buy Now @ ₦850</button>
            </div>

            {/* NBAIS */}
            <div className="brand-card p-5 flex flex-col items-center gap-3">
              <NbaisBadge />
              <h4 className="text-base sm:text-lg font-bold text-blue-900">NBAIS Result Checker</h4>
              <p className="text-gray-500 text-xs">(e-Pin)</p>
              <button onClick={() => openQuickBuy('exam_pin')} className="btn-orange w-full">Buy Now @ ₦920</button>
            </div>
          </div>

        </div>
      </section>

      {/* ============================
          ELECTRICITY DISCOs
          ============================ */}
      <section className="py-12 bg-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-10">
          <p className="section-tag">Electricity</p>
          <h2 className="section-heading text-2xl sm:text-3xl mt-2">Electricity Distribution Companies</h2>
          <p className="text-gray-600 mt-2 text-sm">Buy prepaid tokens and pay electricity bills for all DISCOs across Nigeria.</p>
          <div className="section-divider" />

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'IBEDC', logo: '/logos/ibedc.svg', label: 'Ibadan Electric' },
              { name: 'EKEDC', logo: '/logos/ekedc.svg', label: 'Eko Electric' },
              { name: 'AEDC',  logo: '/logos/aedc.svg',  label: 'Abuja Electric' },
              { name: 'EEDC',  logo: '/logos/eedc.svg',  label: 'Enugu Electric' },
              { name: 'PHED',  logo: '/logos/phed.svg',  label: 'Port Harcourt' },
              { name: 'KEDCO', logo: '/logos/kedco.svg', label: 'Kano Electric' },
            ].map((disco) => (
              <button
                key={disco.name}
                onClick={() => openQuickBuy('electricity')}
                className="brand-card p-4 flex flex-col items-center gap-3 cursor-pointer hover:border-orange-300 w-full"
              >
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm flex items-center justify-center p-1">
                  <Image src={disco.logo} alt={disco.name} width={56} height={56} className="w-full h-full object-contain" />
                </div>
                <span className="text-sm font-bold text-blue-900">{disco.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============================
          TV PROVIDERS
          ============================ */}
      <section className="py-12 bg-gray-50 text-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-10">
          <p className="section-tag">TV Subscription</p>
          <h2 className="section-heading text-2xl sm:text-3xl mt-2">Cable TV Providers</h2>
          <div className="section-divider" />

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="brand-card p-6 flex flex-col items-center gap-4">
              <div className="w-24 h-24 rounded-2xl overflow-hidden shadow border border-gray-100">
                <Image src="/logos/dstv.jpg" alt="DStv" width={96} height={96} className="w-full h-full object-contain" />
              </div>
              <h4 className="font-bold text-blue-900 text-lg">DStv</h4>
              <p className="text-gray-500 text-sm">All bouquets — Compact, Compact+, Premium</p>
              <button onClick={() => openQuickBuy('tv')} className="btn-orange w-full">Subscribe</button>
            </div>

            <div className="brand-card p-6 flex flex-col items-center gap-4">
              <div className="w-24 h-24 rounded-2xl overflow-hidden shadow border border-gray-100">
                <Image src="/logos/gotv.jpg" alt="GOtv" width={96} height={96} className="w-full h-full object-contain" />
              </div>
              <h4 className="font-bold text-blue-900 text-lg">GOtv</h4>
              <p className="text-gray-500 text-sm">GOtv Lite, Value, Plus, Max</p>
              <button onClick={() => openQuickBuy('tv')} className="btn-orange w-full">Subscribe</button>
            </div>

            <div className="brand-card p-6 flex flex-col items-center gap-4">
              <div className="w-24 h-24 rounded-2xl overflow-hidden shadow border border-gray-100 bg-white p-1">
                <Image src="/logos/startimes.svg" alt="StarTimes" width={96} height={96} className="w-full h-full object-contain" />
              </div>
              <h4 className="font-bold text-blue-900 text-lg">StarTimes</h4>
              <p className="text-gray-500 text-sm">Nova, Basic, Smart, Classic, Super</p>
              <button onClick={() => openQuickBuy('tv')} className="btn-orange w-full">Subscribe</button>
            </div>
          </div>

        </div>
      </section>

      {/* ============================
          PRICING SECTION
          ============================ */}
      <section id="pricing" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 text-center">
          <p className="section-tag">Pricing</p>
          <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl mt-2">Check Our Prices Below</h2>
          <div className="section-divider" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 text-left">
            {/* MTN SME Data */}
            <PriceCard
              title="MTN SME Data"
              dot="bg-yellow-400"
              onBuy={() => openQuickBuy('data')}
              logo={<Image src="/logos/mtn.jpg" alt="MTN" width={32} height={32} className="w-8 h-8 object-contain rounded" />}
              items={[
                { size: '500MB (SME)', price: '₦485', dur: '7days' },
                { size: '1GB (SME)', price: '₦776', dur: '7days' },
                { size: '1.5GB (SME)', price: '₦970', dur: '7days' },
                { size: '2GB (SME)', price: '₦1,455', dur: '30days' },
                { size: '3.5GB (SME)', price: '₦2,425', dur: '30days' },
                { size: '6GB (SME)', price: '₦2,425', dur: '7days' },
                { size: '7GB (SME)', price: '₦3,395', dur: '30days' },
                { size: '10GB (SME)', price: '₦4,365', dur: '30days' },
              ]}
            />
            {/* MTN CG Lite */}
            <PriceCard
              title="MTN CG Lite Data (SME 2.0)"
              dot="bg-yellow-400"
              onBuy={() => openQuickBuy('data')}
              logo={<Image src="/logos/mtn.jpg" alt="MTN" width={32} height={32} className="w-8 h-8 object-contain rounded" />}
              items={[
                { size: '50MB (CG_LITE)', price: '₦19', dur: '30days' },
                { size: '150MB (CG_LITE)', price: '₦79', dur: '30days' },
                { size: '250MB (CG_LITE)', price: '₦94', dur: '30days' },
                { size: '500MB (CG_LITE)', price: '₦109', dur: '30days' },
                { size: '1GB (CG_LITE)', price: '₦219', dur: '30days' },
                { size: '2GB (CG_LITE)', price: '₦438', dur: '30days' },
                { size: '3GB (CG_LITE)', price: '₦658', dur: '30days' },
                { size: '5GB (CG_LITE)', price: '₦1,097', dur: '30days' },
                { size: '10GB (CG_LITE)', price: '₦2,194', dur: '30days' },
              ]}
            />
            {/* MTN CG Data */}
            <PriceCard
              title="MTN CG Data"
              dot="bg-yellow-400"
              onBuy={() => openQuickBuy('data')}
              logo={<Image src="/logos/mtn.jpg" alt="MTN" width={32} height={32} className="w-8 h-8 object-contain rounded" />}
              items={[
                { size: '500MB (CG)', price: '₦360', dur: '7days' },
                { size: '1GB (CG)', price: '₦500', dur: '7days' },
                { size: '2GB (CG)', price: '₦1,000', dur: '7days' },
                { size: '3GB (CG)', price: '₦1,500', dur: '7days' },
                { size: '5GB (CG)', price: '₦2,400', dur: '30days' },
              ]}
            />
            {/* AIRTEL Corporate Gifting */}
            <PriceCard
              title="AIRTEL Corporate Gifting"
              dot="bg-red-500"
              onBuy={() => openQuickBuy('data')}
              logo={<Image src="/logos/airtel.jpg" alt="Airtel" width={32} height={32} className="w-8 h-8 object-contain rounded" />}
              items={[
                { size: '500MB (CG)', price: '₦487', dur: '7days' },
                { size: '1GB (CG)', price: '₦780', dur: '7days' },
                { size: '1.5GB (CG)', price: '₦975', dur: '7days' },
                { size: '2GB (CG)', price: '₦1,462', dur: '30days' },
                { size: '3GB (CG)', price: '₦1,950', dur: '30days' },
                { size: '4GB (CG)', price: '₦2,437', dur: '30days' },
                { size: '10GB (CG)', price: '₦3,900', dur: '30days' },
                { size: '25GB (CG)', price: '₦7,800', dur: '30days' },
              ]}
            />
            {/* GLO CG */}
            <PriceCard
              title="GLO Corporate Gifting Data"
              dot="bg-green-500"
              onBuy={() => openQuickBuy('data')}
              logo={<Image src="/logos/glo.jpg" alt="Glo" width={32} height={32} className="w-8 h-8 object-contain rounded" />}
              items={[
                { size: '200MB (CG)', price: '₦83', dur: '14days' },
                { size: '500MB (CG)', price: '₦198', dur: '30days' },
                { size: '1GB (CG)', price: '₦395', dur: '30days' },
                { size: '3GB (CG)', price: '₦1,185', dur: '30days' },
                { size: '5GB (CG)', price: '₦1,975', dur: '30days' },
                { size: '10GB (CG)', price: '₦3,950', dur: '30days' },
              ]}
            />
            {/* 9mobile SME */}
            <PriceCard
              title="9mobile SME Data"
              dot="bg-teal-400"
              onBuy={() => openQuickBuy('data')}
              logo={<Image src="/logos/9mobile.jpg" alt="9mobile" width={32} height={32} className="w-8 h-8 object-contain rounded" />}
              items={[
                { size: '500MB (SME)', price: '₦180', dur: '30days' },
                { size: '1GB (SME)', price: '₦360', dur: '30days' },
                { size: '2GB (SME)', price: '₦720', dur: '30days' },
                { size: '10GB (SME)', price: '₦3,600', dur: '30days' },
              ]}
            />
            {/* Airtel Direct */}
            <PriceCard
              title="Airtel Direct Gifting"
              dot="bg-red-500"
              onBuy={() => openQuickBuy('data')}
              logo={<Image src="/logos/airtel.jpg" alt="Airtel" width={32} height={32} className="w-8 h-8 object-contain rounded" />}
              items={[
                { size: '150MB (Awoof)', price: '₦55', dur: '1day' },
                { size: '600MB (Awoof)', price: '₦202', dur: '2days' },
                { size: '1.5GB (Awoof)', price: '₦395', dur: '1day' },
                { size: '2GB (Direct)', price: '₦1,462', dur: '30days' },
                { size: '13GB (Direct)', price: '₦4,875', dur: '30days' },
                { size: '25GB (Direct)', price: '₦7,800', dur: '30days' },
              ]}
            />
            {/* MTN Direct */}
            <PriceCard
              title="MTN Direct Gifting"
              dot="bg-yellow-400"
              onBuy={() => openQuickBuy('data')}
              logo={<Image src="/logos/mtn.jpg" alt="MTN" width={32} height={32} className="w-8 h-8 object-contain rounded" />}
              items={[
                { size: '1GB (Awoof)', price: '₦485', dur: '1day' },
                { size: '3.2GB (Awoof)', price: '₦970', dur: '2days' },
                { size: '11GB (Awoof)', price: '₦3,395', dur: '7days' },
                { size: '1GB (Direct)', price: '₦776', dur: '7days' },
                { size: '2GB (Direct)', price: '₦1,455', dur: '30days' },
                { size: '10GB (Direct)', price: '₦4,365', dur: '30days' },
              ]}
            />
            {/* API Result Checker */}
            <PriceCard
              title="Result Checker Pins"
              dot="bg-blue-500"
              onBuy={() => openQuickBuy('exam_pin')}
              logo={<BookOpen className="w-6 h-6 text-blue-700" />}
              items={[
                { size: 'WAEC', price: '₦3,300' },
                { size: 'NECO', price: '₦1,150' },
                { size: 'NABTEB', price: '₦830' },
                { size: 'NBAIS', price: '₦900' },
              ]}
            />
          </div>
        </div>
      </section>

      {/* ============================
          ABOUT US SECTION
          ============================ */}
      <section id="about" className="relative py-20 px-6 sm:px-12 bg-white text-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="section-tag">About Us</p>
          <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl mt-2">
            We are a team of creative people<br className="hidden sm:block" /> open to innovation
          </h2>
          <div className="section-divider" />
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-6">
            At <span className="font-bold text-orange-500">SoftTap</span>, powered by{' '}
            <span className="font-bold text-orange-500">michalkeysoft</span>, we are passionate about simplifying digital transactions. From airtime and data to electricity, cable TV, and result checkers — all your essential services are just one tap away.
          </p>
        </div>

        <div className="max-w-6xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 rounded-2xl p-6 shadow-md hover:shadow-lg transition">
            <Target className="w-10 h-10 text-orange-500 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-gray-900">Our Mission</h3>
            <p className="text-gray-600">To simplify digital transactions and provide every Nigerian with quick, seamless, and affordable access to essential services.</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6 shadow-md hover:shadow-lg transition">
            <Shield className="w-10 h-10 text-orange-500 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-gray-900">Our Vision</h3>
            <p className="text-gray-600">To become Nigeria&apos;s most trusted platform for utility payments, enabling convenience and reliability with every transaction.</p>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6 shadow-md hover:shadow-lg transition">
            <Users className="w-10 h-10 text-orange-500 mb-4" />
            <h3 className="text-xl font-bold mb-2 text-gray-900">Our Team</h3>
            <p className="text-gray-600">Built with passion by <span className="font-bold text-orange-500">michalkeysoft</span>, focused on giving you secure, user-friendly, and reliable experiences.</p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="max-w-6xl mx-auto mt-20 text-center">
          <p className="section-tag">Testimonial</p>
          <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl mt-2">What Our Customers Say</h2>
          <div className="section-divider" />

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { review: '"SoftTap makes paying for data and electricity so easy. I save time and stress every day!"', name: '— Adebayo S.' },
              { review: '"Reliable, fast, and affordable. SoftTap has become my go-to app for all bills."', name: '— Chinenye K.' },
              { review: '"I love the smooth experience. SoftTap is secure and trustworthy — highly recommend!"', name: '— Musa A.' },
            ].map((t, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-2xl shadow-md">
                <Star className="w-8 h-8 text-yellow-400 mx-auto mb-4 fill-yellow-400" />
                <p className="text-gray-600 italic">{t.review}</p>
                <h4 className="mt-4 font-bold text-gray-900">{t.name}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div
          className="relative w-full py-24 mt-20 rounded-3xl overflow-hidden text-center"
          style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #f97316 100%)' }}
        >
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative z-10 max-w-4xl mx-auto px-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
              Ready to Experience Seamless Payments?
            </h2>
            <p className="mt-4 text-lg text-gray-200">
              Join thousands of Nigerians already enjoying fast, secure, and reliable transactions.
            </p>
            <Link href="/login">
              <button className="mt-8 px-10 py-4 bg-orange-500 text-white font-bold rounded-full shadow-lg hover:bg-orange-600 transition">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================
          FAQ SECTION
          ============================ */}
      <section id="faq" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <p className="section-tag text-center">FAQ</p>
          <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl text-center mt-2">
            Frequently Asked Questions
          </h2>
          <div className="section-divider" />
          <div className="mt-10 space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="brand-card overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full flex justify-between items-center px-5 py-4 text-left font-semibold text-blue-900 hover:text-orange-500 transition-colors"
                >
                  {faq.q}
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${expandedFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {expandedFaq === i && (
                  <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================
          CONTACT SECTION
          ============================ */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="section-tag">Contact Us</p>
            <h2 className="section-heading text-2xl sm:text-3xl md:text-4xl mt-2">Get in Touch With Us</h2>
            <div className="section-divider" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Contact Details */}
            <div className="space-y-4">
              <div className="brand-card p-5 flex items-center gap-4 block border border-gray-100">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <p className="font-bold text-blue-900">Physical Business Address</p>
                  <p className="text-gray-600 text-sm">3, Barika, Opposite UI Second Gate, Ibadan, Oyo State, Nigeria</p>
                </div>
              </div>

              <a href="tel:08039579410" className="brand-card p-5 flex items-center gap-4 block hover:border-orange-300">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <p className="font-bold text-blue-900">Phone &amp; WhatsApp</p>
                  <p className="text-gray-500 text-sm">08039579410</p>
                </div>
              </a>

              <a href="mailto:michaelkeysoft@gmail.com" className="brand-card p-5 flex items-center gap-4 block hover:border-orange-300">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-blue-900">Email Support</p>
                  <p className="text-gray-500 text-sm">michaelkeysoft@gmail.com</p>
                </div>
              </a>
              <a href="https://www.linkedin.com/in/michaelolayiwola/" target="_blank" rel="noopener noreferrer" className="brand-card p-5 flex items-center gap-4 block hover:border-orange-300">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <Linkedin className="w-6 h-6 text-blue-700" />
                </div>
                <div>
                  <p className="font-bold text-blue-900">LinkedIn Profile</p>
                  <p className="text-gray-500 text-sm">linkedin.com/in/michaelolayiwola</p>
                </div>
              </a>
              <div className="brand-card p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-bold text-blue-900">Social Media</p>
                  <p className="text-gray-500 text-sm">@michalkeysoft (TikTok, Twitter, Telegram)</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form className="brand-card p-8 space-y-4">
              <h3 className="text-xl font-bold text-blue-900 mb-2">Send Us a Message</h3>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-400 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-400 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Message</label>
                <textarea
                  rows="4"
                  placeholder="How can we help you?"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-400 text-sm"
                />
              </div>
              <button type="submit" className="btn-orange w-full py-3.5 rounded-xl text-base">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />

      {/* ===== QUICK PURCHASE MODAL ===== */}
      <QuickPurchaseModal
        isOpen={isQuickBuyOpen}
        onClose={() => setIsQuickBuyOpen(false)}
        initialTab={quickBuyTab}
        initialData={quickBuyInitialData}
      />
    </div>
  );
}

/* ======= PRICE CARD COMPONENT ======= */
function PriceCard({ title, dot, logo, items, onBuy }) {
  return (
    <div className="brand-card p-6 flex flex-col justify-between">
      <div>
        <h3 className="text-base font-bold text-center text-blue-900 mb-3 flex items-center justify-center gap-2">
          {logo || <span className={`w-3 h-3 rounded-full ${dot}`} />}
          {title}
        </h3>
        <ul className="space-y-2 text-sm text-gray-700 max-h-64 overflow-y-auto border-t border-b border-gray-100 py-3">
          {items.map((item, i) => (
            <li key={i} className="flex justify-between items-center border-b border-gray-50 pb-1">
              <span>{item.size}</span>
              <span className="font-bold text-orange-500">{item.price}</span>
              {item.dur && <span className="text-gray-400 text-xs ml-2">({item.dur})</span>}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={onBuy} className="btn-orange w-full mt-4">
        Buy Now
      </button>
    </div>
  );
}

