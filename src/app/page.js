'use client';

import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FAQAccordion from '@/components/FAQAccordion';
import { useState } from 'react';
import {
  Wifi, Tv, Lightbulb, Signal, LogIn, UserPlus,
  Shield, Target, Users, CheckCircle2, Star,
  Phone, Mail, MessageSquare, BookOpen, Zap, ChevronDown
} from 'lucide-react';

/* =============================================
   INLINE SVG LOGOS for exam bodies + electricity
   ============================================= */

function WaecBadge() {
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl gap-2">
      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
        <svg viewBox="0 0 100 100" className="w-12 h-12">
          <circle cx="50" cy="50" r="45" fill="#1e3a8a" />
          <text x="50" y="45" textAnchor="middle" fill="gold" fontSize="18" fontWeight="bold" fontFamily="serif">W</text>
          <text x="50" y="65" textAnchor="middle" fill="gold" fontSize="10" fontFamily="serif">WAEC</text>
        </svg>
      </div>
      <span className="text-white font-bold text-sm tracking-wide">W A E C</span>
    </div>
  );
}

function NecoBadge() {
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center bg-gradient-to-br from-green-800 to-green-600 rounded-xl gap-2">
      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
        <svg viewBox="0 0 100 100" className="w-12 h-12">
          <circle cx="50" cy="50" r="45" fill="#166534" />
          <text x="50" y="45" textAnchor="middle" fill="gold" fontSize="18" fontWeight="bold" fontFamily="serif">N</text>
          <text x="50" y="65" textAnchor="middle" fill="gold" fontSize="10" fontFamily="serif">NECO</text>
        </svg>
      </div>
      <span className="text-white font-bold text-sm tracking-wide">N E C O</span>
    </div>
  );
}

function NabtebBadge() {
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center bg-gradient-to-br from-red-800 to-red-600 rounded-xl gap-2">
      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
        <svg viewBox="0 0 100 100" className="w-12 h-12">
          <circle cx="50" cy="50" r="45" fill="#991b1b" />
          <text x="50" y="42" textAnchor="middle" fill="gold" fontSize="13" fontWeight="bold" fontFamily="serif">NAB</text>
          <text x="50" y="60" textAnchor="middle" fill="gold" fontSize="13" fontWeight="bold" fontFamily="serif">TEB</text>
        </svg>
      </div>
      <span className="text-white font-bold text-sm tracking-wide">N A B T E B</span>
    </div>
  );
}

function NbaisBadge() {
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center bg-gradient-to-br from-purple-800 to-purple-600 rounded-xl gap-2">
      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
        <svg viewBox="0 0 100 100" className="w-12 h-12">
          <circle cx="50" cy="50" r="45" fill="#6b21a8" />
          <text x="50" y="42" textAnchor="middle" fill="gold" fontSize="13" fontWeight="bold" fontFamily="serif">NBA</text>
          <text x="50" y="62" textAnchor="middle" fill="gold" fontSize="13" fontWeight="bold" fontFamily="serif">IS</text>
        </svg>
      </div>
      <span className="text-white font-bold text-sm tracking-wide">N B A I S</span>
    </div>
  );
}

/* Network logo badges using uploaded images */
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
      a: 'Contact us directly via WhatsApp on 08039579410, email michaelkeysofy@gmail.com, or reach us on Telegram/TikTok/Twitter @michalkeysoft.',
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
        className="relative flex flex-col items-start justify-center px-6 sm:px-12 min-h-screen text-white overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 40%, #1d4ed8 70%, #f97316 100%)',
        }}
      >
        {/* Decorative overlay */}
        <div className="absolute inset-0 bg-black/30" />
        {/* Animated blobs */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-3xl">
          <p className="text-base sm:text-lg md:text-xl font-medium opacity-90 mb-4 animate-fade-slide-up">
            Welcome To SoftTap!
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 animate-fade-slide-up delay-100">
            DATA, TV<br />
            SUBSCRIPTION,<br />
            ELECTRICITY BILLS,<br />
            EXAMS/RESULT<br />
            <span className="text-orange-400">CHECKER PINS!!</span>
          </h1>
          <p className="text-orange-400 font-bold text-base sm:text-lg mb-8 animate-fade-slide-up delay-200">
            All Your Bills, One Tap Away.
          </p>
          <div className="flex flex-row gap-4 animate-fade-slide-up delay-300">
            <Link href="/login">
              <button className="btn-white-glass">
                <LogIn className="w-5 h-5" />
                Login
              </button>
            </Link>
            <Link href="/register">
              <button className="btn-orange-solid">
                <UserPlus className="w-5 h-5" />
                Register
              </button>
            </Link>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60 animate-bounce">
          <span className="text-xs text-white">Scroll</span>
          <ChevronDown className="w-5 h-5 text-white" />
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
              <Link href="/login" className="mt-auto w-full">
                <button className="btn-orange w-full">Buy Now</button>
              </Link>
            </div>

            {/* TV */}
            <div className="brand-card p-6 flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center">
                <Tv className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-bold text-blue-900">TV Subscription</h4>
              <p className="text-gray-600 text-sm">Stay connected! Subscribe and Renew your TV subscription instantly.</p>
              <Link href="/login" className="mt-auto w-full">
                <button className="btn-orange w-full">Subscribe</button>
              </Link>
            </div>

            {/* Electricity */}
            <div className="brand-card p-6 flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-yellow-50 flex items-center justify-center">
                <Lightbulb className="w-8 h-8 text-yellow-500" />
              </div>
              <h4 className="text-lg font-bold text-blue-900">Electricity Bills</h4>
              <p className="text-gray-600 text-sm">Purchase prepaid meter tokens instantly and Pay estimated bill.</p>
              <Link href="/login" className="mt-auto w-full">
                <button className="btn-orange w-full">Pay</button>
              </Link>
            </div>

            {/* Airtime */}
            <div className="brand-card p-6 flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center">
                <Signal className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-lg font-bold text-blue-900">Airtime</h4>
              <p className="text-gray-600 text-sm">Never run low on Airtime, purchase instantly for all networks.</p>
              <Link href="/login" className="mt-auto w-full">
                <button className="btn-orange w-full">Buy Now</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================
          NETWORK LOGOS STRIP
          ============================ */}
      <section className="py-10 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-500 font-semibold uppercase tracking-wide mb-6">We support all networks</p>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {/* MTN */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md border border-gray-100">
                <Image src="/logos/mtn.jpg" alt="MTN" width={80} height={80} className="w-full h-full object-contain" />
              </div>
              <span className="text-xs font-bold text-gray-600">MTN</span>
            </div>
            {/* Airtel */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md border border-gray-100">
                <Image src="/logos/airtel.jpg" alt="Airtel" width={80} height={80} className="w-full h-full object-contain" />
              </div>
              <span className="text-xs font-bold text-gray-600">Airtel</span>
            </div>
            {/* Glo */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md border border-gray-100">
                <Image src="/logos/glo.jpg" alt="Glo" width={80} height={80} className="w-full h-full object-contain" />
              </div>
              <span className="text-xs font-bold text-gray-600">Glo</span>
            </div>
            {/* 9mobile */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md border border-gray-100">
                <Image src="/logos/9mobile.jpg" alt="9mobile" width={80} height={80} className="w-full h-full object-contain" />
              </div>
              <span className="text-xs font-bold text-gray-600">9mobile</span>
            </div>
            {/* DStv */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md border border-gray-100">
                <Image src="/logos/dstv.jpg" alt="DStv" width={80} height={80} className="w-full h-full object-contain" />
              </div>
              <span className="text-xs font-bold text-gray-600">DStv</span>
            </div>
            {/* GOtv */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md border border-gray-100">
                <Image src="/logos/gotv.jpg" alt="GOtv" width={80} height={80} className="w-full h-full object-contain" />
              </div>
              <span className="text-xs font-bold text-gray-600">GOtv</span>
            </div>
            {/* StarTimes — SVG inline */}
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-red-600 shadow-md">
                <svg viewBox="0 0 60 60" className="w-10 h-10">
                  <polygon points="30,5 37,22 55,22 41,34 46,52 30,40 14,52 19,34 5,22 23,22" fill="gold" />
                </svg>
              </div>
              <span className="text-xs font-bold text-gray-600">StarTimes</span>
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
              <Link href="/login" className="w-full">
                <button className="btn-orange w-full">Buy Now @ ₦3,320</button>
              </Link>
            </div>

            {/* NECO */}
            <div className="brand-card p-5 flex flex-col items-center gap-3">
              <NecoBadge />
              <h4 className="text-base sm:text-lg font-bold text-blue-900">NECO Result Checker</h4>
              <p className="text-gray-500 text-xs">(Token)</p>
              <Link href="/login" className="w-full">
                <button className="btn-orange w-full">Buy Now @ ₦1,170</button>
              </Link>
            </div>

            {/* NABTEB */}
            <div className="brand-card p-5 flex flex-col items-center gap-3">
              <NabtebBadge />
              <h4 className="text-base sm:text-lg font-bold text-blue-900">NABTEB Result Checker</h4>
              <p className="text-gray-500 text-xs">(Pin &amp; Serial No.)</p>
              <Link href="/login" className="w-full">
                <button className="btn-orange w-full">Buy Now @ ₦850</button>
              </Link>
            </div>

            {/* NBAIS */}
            <div className="brand-card p-5 flex flex-col items-center gap-3">
              <NbaisBadge />
              <h4 className="text-base sm:text-lg font-bold text-blue-900">NBAIS Result Checker</h4>
              <p className="text-gray-500 text-xs">(e-Pin)</p>
              <Link href="/login" className="w-full">
                <button className="btn-orange w-full">Buy Now @ ₦920</button>
              </Link>
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
              { name: 'IBEDC', color: 'bg-green-600', short: 'IBE' },
              { name: 'EKEDC', color: 'bg-blue-700', short: 'EKE' },
              { name: 'AEDC', color: 'bg-red-600', short: 'AED' },
              { name: 'EEDC', color: 'bg-orange-600', short: 'EED' },
              { name: 'PHED', color: 'bg-teal-600', short: 'PHE' },
              { name: 'KEDCO', color: 'bg-purple-700', short: 'KED' },
            ].map((disco) => (
              <Link href="/login" key={disco.name}>
                <div className="brand-card p-4 flex flex-col items-center gap-3 cursor-pointer hover:border-orange-300">
                  <div className={`w-14 h-14 ${disco.color} rounded-xl flex items-center justify-center shadow-md`}>
                    <Lightbulb className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-sm font-bold text-blue-900">{disco.name}</span>
                </div>
              </Link>
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
              <Link href="/login" className="w-full">
                <button className="btn-orange w-full">Subscribe</button>
              </Link>
            </div>

            <div className="brand-card p-6 flex flex-col items-center gap-4">
              <div className="w-24 h-24 rounded-2xl overflow-hidden shadow border border-gray-100">
                <Image src="/logos/gotv.jpg" alt="GOtv" width={96} height={96} className="w-full h-full object-contain" />
              </div>
              <h4 className="font-bold text-blue-900 text-lg">GOtv</h4>
              <p className="text-gray-500 text-sm">GOtv Lite, Value, Plus, Max</p>
              <Link href="/login" className="w-full">
                <button className="btn-orange w-full">Subscribe</button>
              </Link>
            </div>

            <div className="brand-card p-6 flex flex-col items-center gap-4">
              <div className="w-24 h-24 rounded-2xl bg-red-600 flex items-center justify-center shadow">
                <svg viewBox="0 0 60 60" className="w-12 h-12">
                  <polygon points="30,5 37,22 55,22 41,34 46,52 30,40 14,52 19,34 5,22 23,22" fill="gold" />
                </svg>
              </div>
              <h4 className="font-bold text-blue-900 text-lg">StarTimes</h4>
              <p className="text-gray-500 text-sm">Nova, Basic, Smart, Classic, Super</p>
              <Link href="/login" className="w-full">
                <button className="btn-orange w-full">Subscribe</button>
              </Link>
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
            <p className="text-gray-600">To become Nigeria's most trusted platform for utility payments, enabling convenience and reliability with every transaction.</p>
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
            <div className="space-y-5">
              <a href="tel:08039579410" className="brand-card p-5 flex items-center gap-4 block hover:border-orange-300">
                <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                  <p className="font-bold text-blue-900">Phone &amp; WhatsApp</p>
                  <p className="text-gray-500 text-sm">08039579410</p>
                </div>
              </a>
              <a href="mailto:michaelkeysofy@gmail.com" className="brand-card p-5 flex items-center gap-4 block hover:border-orange-300">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-blue-900">Email Support</p>
                  <p className="text-gray-500 text-sm">michaelkeysofy@gmail.com</p>
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
    </div>
  );
}

/* ======= PRICE CARD COMPONENT ======= */
function PriceCard({ title, dot, logo, items }) {
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
      <Link href="/login" className="block mt-4">
        <button className="btn-orange w-full">Buy Now</button>
      </Link>
    </div>
  );
}
