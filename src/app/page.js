import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FAQAccordion from '@/components/FAQAccordion';
import { 
  Wifi, Tv, Lightbulb, Signal, LogIn, UserPlus, Zap, Shield, Target, 
  Users, CheckCircle2, ArrowRight, Award, Star, Phone, Mail, MapPin, 
  BookOpen, Sparkles
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-black">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen pt-32 pb-20 px-6 flex items-center justify-center overflow-hidden">
        {/* Glow backdrop effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-violet-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm font-semibold tracking-wide shadow-lg shadow-emerald-950/40">
            <Sparkles className="w-4 h-4 text-emerald-400" /> Welcome to SoftTap – Powered by michalkeysoft
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.15]">
            DATA, TV SUBSCRIPTION, <br className="hidden sm:block"/>
            <span className="gradient-text-emerald">ELECTRICITY BILLS,</span> <br className="hidden sm:block"/>
            EXAMS/RESULT CHECKER PINS!!
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-medium">
            All Your Utility Bills, Data Bundles & Exam Pins — <span className="text-emerald-400 font-bold">One Tap Away.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link
              href="/login"
              className="w-full sm:w-auto px-8 py-4 rounded-full gradient-btn-primary text-slate-950 font-extrabold text-base flex items-center justify-center gap-2 transition-all transform hover:scale-105"
            >
              <LogIn className="w-5 h-5" />
              Login to Account
            </Link>
            <Link
              href="/register"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-900/90 border border-slate-700 hover:border-emerald-500/50 text-white font-bold text-base flex items-center justify-center gap-2 transition-all transform hover:scale-105"
            >
              <UserPlus className="w-5 h-5 text-emerald-400" />
              Register Account
            </Link>
          </div>

          {/* Feature Badge Highlights */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl glass-panel text-center space-y-1">
              <p className="text-2xl font-black text-emerald-400">Instant</p>
              <p className="text-xs text-slate-400 font-medium">Auto-Fulfillment</p>
            </div>
            <div className="p-4 rounded-2xl glass-panel text-center space-y-1">
              <p className="text-2xl font-black text-cyan-400">Cheap</p>
              <p className="text-xs text-slate-400 font-medium">Discounted Rates</p>
            </div>
            <div className="p-4 rounded-2xl glass-panel text-center space-y-1">
              <p className="text-2xl font-black text-violet-400">24/7</p>
              <p className="text-xs text-slate-400 font-medium">System Uptime</p>
            </div>
            <div className="p-4 rounded-2xl glass-panel text-center space-y-1">
              <p className="text-2xl font-black text-amber-400">100%</p>
              <p className="text-xs text-slate-400 font-medium">Secure Payments</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-[#0a0e1a] relative">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h3 className="text-emerald-400 font-bold uppercase tracking-wider text-sm">Features</h3>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Data, TV Subscription, Electricity Bills & Airtime
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-cyan-400 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Data Card */}
            <div className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col justify-between space-y-4">
              <div>
                <div className="w-14 h-14 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                  <Wifi className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Data Bundles</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Swiftly purchase Data for all networks (MTN, Airtel, Glo, 9mobile) @cheap rates with instant delivery.
                </p>
              </div>
              <Link href="/login" className="w-full py-3 rounded-xl gradient-btn-primary text-slate-950 font-bold text-center text-sm block">
                Buy Data Now
              </Link>
            </div>

            {/* TV Subscription Card */}
            <div className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col justify-between space-y-4">
              <div>
                <div className="w-14 h-14 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
                  <Tv className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">TV Subscription</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Stay connected! Subscribe and Renew your DSTV, GOTV & Startimes TV subscription instantly.
                </p>
              </div>
              <Link href="/login" className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-center text-sm block border border-slate-700">
                Subscribe Cable
              </Link>
            </div>

            {/* Electricity Bills Card */}
            <div className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col justify-between space-y-4">
              <div>
                <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                  <Lightbulb className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Electricity Bills</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Purchase prepaid meter tokens instantly and pay estimated bills for all DISCOs across Nigeria.
                </p>
              </div>
              <Link href="/login" className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-center text-sm block border border-slate-700">
                Pay Electricity
              </Link>
            </div>

            {/* Airtime Card */}
            <div className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col justify-between space-y-4">
              <div>
                <div className="w-14 h-14 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 mb-4">
                  <Signal className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Airtime Top-Up</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Never run low on Airtime. Purchase airtime instantly for all networks at discounted rates.
                </p>
              </div>
              <Link href="/login" className="w-full py-3 rounded-xl gradient-btn-primary text-slate-950 font-bold text-center text-sm block">
                Buy Airtime
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* E-Pins Products Section */}
      <section className="py-20 px-6 bg-[#080c14] relative">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h3 className="text-cyan-400 font-bold uppercase tracking-wider text-sm">E-Pins Products</h3>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Educational Result Checker Pins</h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
              Purchase WAEC, NECO, NABTEB and NBAIS Result Checker Pins at cheap wholesale rates with instant delivery.
            </p>
            <div className="w-16 h-1 bg-cyan-400 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* WAEC */}
            <div className="glass-panel p-6 rounded-2xl text-center space-y-4 hover:border-emerald-500/40 transition">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-amber-500/20 to-emerald-500/20 flex items-center justify-center border border-amber-500/30">
                <BookOpen className="w-10 h-10 text-amber-400" />
              </div>
              <h4 className="text-lg font-bold text-white">WAEC Result Checker</h4>
              <p className="text-xs text-slate-400 font-medium">(Pin & Serial No.)</p>
              <Link href="/login" className="block w-full py-2.5 rounded-xl gradient-btn-primary text-slate-950 font-bold text-sm">
                Buy Now @ ₦3,320
              </Link>
            </div>

            {/* NECO */}
            <div className="glass-panel p-6 rounded-2xl text-center space-y-4 hover:border-emerald-500/40 transition">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-500/30">
                <BookOpen className="w-10 h-10 text-cyan-400" />
              </div>
              <h4 className="text-lg font-bold text-white">NECO Result Checker</h4>
              <p className="text-xs text-slate-400 font-medium">(Token)</p>
              <Link href="/login" className="block w-full py-2.5 rounded-xl gradient-btn-primary text-slate-950 font-bold text-sm">
                Buy Now @ ₦1,170
              </Link>
            </div>

            {/* NABTEB */}
            <div className="glass-panel p-6 rounded-2xl text-center space-y-4 hover:border-emerald-500/40 transition">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center border border-violet-500/30">
                <BookOpen className="w-10 h-10 text-violet-400" />
              </div>
              <h4 className="text-lg font-bold text-white">NABTEB Result Checker</h4>
              <p className="text-xs text-slate-400 font-medium">(Pin & Serial No.)</p>
              <Link href="/login" className="block w-full py-2.5 rounded-xl gradient-btn-primary text-slate-950 font-bold text-sm">
                Buy Now @ ₦850
              </Link>
            </div>

            {/* NBAIS */}
            <div className="glass-panel p-6 rounded-2xl text-center space-y-4 hover:border-emerald-500/40 transition">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center border border-emerald-500/30">
                <BookOpen className="w-10 h-10 text-emerald-400" />
              </div>
              <h4 className="text-lg font-bold text-white">NBAIS Result Checker</h4>
              <p className="text-xs text-slate-400 font-medium">(e-Pin)</p>
              <Link href="/login" className="block w-full py-2.5 rounded-xl gradient-btn-primary text-slate-950 font-bold text-sm">
                Buy Now @ ₦920
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - Exact Copy of Reference Plans */}
      <section id="pricing" className="py-20 px-6 bg-[#0a0e1a]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h3 className="text-emerald-400 font-bold uppercase tracking-wider text-sm">Pricing</h3>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Check Our Affordable Prices Below</h2>
            <div className="w-16 h-1 bg-emerald-500 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* MTN SME Data */}
            <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between hover:border-emerald-500/40 transition">
              <div>
                <h3 className="text-lg font-bold text-white text-center mb-4 flex items-center justify-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-400" /> MTN SME Data
                </h3>
                <ul className="space-y-2.5 text-sm divide-y divide-slate-800/80 mb-6">
                  <li className="flex justify-between pt-2 text-slate-300"><span>500MB (SME)</span><span className="font-bold text-emerald-400">₦485</span><span className="text-slate-500 text-xs">(7days)</span></li>
                  <li className="flex justify-between pt-2 text-slate-300"><span>1GB (SME)</span><span className="font-bold text-emerald-400">₦776</span><span className="text-slate-500 text-xs">(7days)</span></li>
                  <li className="flex justify-between pt-2 text-slate-300"><span>1.5GB (SME)</span><span className="font-bold text-emerald-400">₦970</span><span className="text-slate-500 text-xs">(7days)</span></li>
                  <li className="flex justify-between pt-2 text-slate-300"><span>2GB (SME)</span><span className="font-bold text-emerald-400">₦1,455</span><span className="text-slate-500 text-xs">(30days)</span></li>
                  <li className="flex justify-between pt-2 text-slate-300"><span>3.5GB (SME)</span><span className="font-bold text-emerald-400">₦2,425</span><span className="text-slate-500 text-xs">(30days)</span></li>
                  <li className="flex justify-between pt-2 text-slate-300"><span>6GB (SME)</span><span className="font-bold text-emerald-400">₦2,425</span><span className="text-slate-500 text-xs">(7days)</span></li>
                  <li className="flex justify-between pt-2 text-slate-300"><span>7GB (SME)</span><span className="font-bold text-emerald-400">₦3,395</span><span className="text-slate-500 text-xs">(30days)</span></li>
                  <li className="flex justify-between pt-2 text-slate-300"><span>10GB (SME)</span><span className="font-bold text-emerald-400">₦4,365</span><span className="text-slate-500 text-xs">(30days)</span></li>
                </ul>
              </div>
              <Link href="/login" className="w-full py-2.5 rounded-xl gradient-btn-primary text-slate-950 font-bold text-center text-sm block">Buy Now</Link>
            </div>

            {/* MTN CG Lite Data (SME 2.0) */}
            <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between hover:border-emerald-500/40 transition">
              <div>
                <h3 className="text-lg font-bold text-white text-center mb-4 flex items-center justify-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-400" /> MTN CG Lite Data (SME 2.0)
                </h3>
                <ul className="space-y-2 text-sm divide-y divide-slate-800/80 mb-6 max-h-72 overflow-y-auto pr-1">
                  <li className="flex justify-between pt-2 text-slate-300"><span>50MB (CG_LITE)</span><span className="font-bold text-emerald-400">₦19</span><span className="text-slate-500 text-xs">(30days)</span></li>
                  <li className="flex justify-between pt-2 text-slate-300"><span>150MB (CG_LITE)</span><span className="font-bold text-emerald-400">₦79</span><span className="text-slate-500 text-xs">(30days)</span></li>
                  <li className="flex justify-between pt-2 text-slate-300"><span>250MB (CG_LITE)</span><span className="font-bold text-emerald-400">₦94</span><span className="text-slate-500 text-xs">(30days)</span></li>
                  <li className="flex justify-between pt-2 text-slate-300"><span>500MB (CG_LITE)</span><span className="font-bold text-emerald-400">₦109</span><span className="text-slate-500 text-xs">(30days)</span></li>
                  <li className="flex justify-between pt-2 text-slate-300"><span>1GB (CG_LITE)</span><span className="font-bold text-emerald-400">₦219</span><span className="text-slate-500 text-xs">(30days)</span></li>
                  <li className="flex justify-between pt-2 text-slate-300"><span>2GB (CG_LITE)</span><span className="font-bold text-emerald-400">₦438</span><span className="text-slate-500 text-xs">(30days)</span></li>
                  <li className="flex justify-between pt-2 text-slate-300"><span>3GB (CG_LITE)</span><span className="font-bold text-emerald-400">₦658</span><span className="text-slate-500 text-xs">(30days)</span></li>
                  <li className="flex justify-between pt-2 text-slate-300"><span>5GB (CG_LITE)</span><span className="font-bold text-emerald-400">₦1,097</span><span className="text-slate-500 text-xs">(30days)</span></li>
                  <li className="flex justify-between pt-2 text-slate-300"><span>10GB (CG_LITE)</span><span className="font-bold text-emerald-400">₦2,194</span><span className="text-slate-500 text-xs">(30days)</span></li>
                </ul>
              </div>
              <Link href="/login" className="w-full py-2.5 rounded-xl gradient-btn-primary text-slate-950 font-bold text-center text-sm block">Buy Now</Link>
            </div>

            {/* MTN CG Data */}
            <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between hover:border-emerald-500/40 transition">
              <div>
                <h3 className="text-lg font-bold text-white text-center mb-4 flex items-center justify-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-400" /> MTN CG Data
                </h3>
                <ul className="space-y-2.5 text-sm divide-y divide-slate-800/80 mb-6">
                  <li className="flex justify-between pt-2 text-slate-300"><span>500MB (CG)</span><span className="font-bold text-emerald-400">₦360</span><span className="text-slate-500 text-xs">(7days)</span></li>
                  <li className="flex justify-between pt-2 text-slate-300"><span>1GB (CG)</span><span className="font-bold text-emerald-400">₦500</span><span className="text-slate-500 text-xs">(7days)</span></li>
                  <li className="flex justify-between pt-2 text-slate-300"><span>2GB (CG)</span><span className="font-bold text-emerald-400">₦1,000</span><span className="text-slate-500 text-xs">(7days)</span></li>
                  <li className="flex justify-between pt-2 text-slate-300"><span>3GB (CG)</span><span className="font-bold text-emerald-400">₦1,500</span><span className="text-slate-500 text-xs">(7days)</span></li>
                  <li className="flex justify-between pt-2 text-slate-300"><span>5GB (CG)</span><span className="font-bold text-emerald-400">₦2,400</span><span className="text-slate-500 text-xs">(30days)</span></li>
                </ul>
              </div>
              <Link href="/login" className="w-full py-2.5 rounded-xl gradient-btn-primary text-slate-950 font-bold text-center text-sm block">Buy Now</Link>
            </div>

            {/* AIRTEL Corporate Gifting */}
            <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between hover:border-emerald-500/40 transition">
              <div>
                <h3 className="text-lg font-bold text-white text-center mb-4 flex items-center justify-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500" /> AIRTEL Corporate Gifting
                </h3>
                <ul className="space-y-2 text-sm divide-y divide-slate-800/80 mb-6 max-h-72 overflow-y-auto pr-1">
                  <li className="flex justify-between pt-2 text-slate-300"><span>500MB (CG)</span><span className="font-bold text-emerald-400">₦487</span><span className="text-slate-500 text-xs">(7days)</span></li>
                  <li className="flex justify-between pt-2 text-slate-300"><span>1GB (CG)</span><span className="font-bold text-emerald-400">₦780</span><span className="text-slate-500 text-xs">(7days)</span></li>
                  <li className="flex justify-between pt-2 text-slate-300"><span>1.5GB (CG)</span><span className="font-bold text-emerald-400">₦975</span><span className="text-slate-500 text-xs">(7days)</span></li>
                  <li className="flex justify-between pt-2 text-slate-300"><span>2GB (CG)</span><span className="font-bold text-emerald-400">₦1,462</span><span className="text-slate-500 text-xs">(30days)</span></li>
                  <li className="flex justify-between pt-2 text-slate-300"><span>3GB (CG)</span><span className="font-bold text-emerald-400">₦1,950</span><span className="text-slate-500 text-xs">(30days)</span></li>
                  <li className="flex justify-between pt-2 text-slate-300"><span>3.5GB (CG)</span><span className="font-bold text-emerald-400">₦1,462</span><span className="text-slate-500 text-xs">(7days)</span></li>
                  <li className="flex justify-between pt-2 text-slate-300"><span>4GB (CG)</span><span className="font-bold text-emerald-400">₦2,437</span><span className="text-slate-500 text-xs">(30days)</span></li>
                  <li className="flex justify-between pt-2 text-slate-300"><span>6GB (CG)</span><span className="font-bold text-emerald-400">₦2,437</span><span className="text-slate-500 text-xs">(7days)</span></li>
                  <li className="flex justify-between pt-2 text-slate-300"><span>8GB (CG)</span><span className="font-bold text-emerald-400">₦2,925</span><span className="text-slate-500 text-xs">(30days)</span></li>
                  <li className="flex justify-between pt-2 text-slate-300"><span>10GB (CG)</span><span className="font-bold text-emerald-400">₦3,900</span><span className="text-slate-500 text-xs">(30days)</span></li>
                  <li className="flex justify-between pt-2 text-slate-300"><span>13GB (CG)</span><span className="font-bold text-emerald-400">₦4,875</span><span className="text-slate-500 text-xs">(30days)</span></li>
                  <li className="flex justify-between pt-2 text-slate-300"><span>25GB (CG)</span><span className="font-bold text-emerald-400">₦7,800</span><span className="text-slate-500 text-xs">(30days)</span></li>
                </ul>
              </div>
              <Link href="/login" className="w-full py-2.5 rounded-xl gradient-btn-primary text-slate-950 font-bold text-center text-sm block">Buy Now</Link>
            </div>

            {/* GLO Corporate Gifting Data */}
            <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between hover:border-emerald-500/40 transition">
              <div>
                <h3 className="text-lg font-bold text-white text-center mb-4 flex items-center justify-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500" /> GLO Corporate Gifting Data
                </h3>
                <ul className="space-y-2.5 text-sm divide-y divide-slate-800/80 mb-6">
                  <li className="flex justify-between pt-2 text-slate-300"><span>200MB (CG)</span><span className="font-bold text-emerald-400">₦83</span><span className="text-slate-500 text-xs">(14days)</span></li>
                  <li className="flex justify-between pt-2 text-slate-300"><span>500MB (CG)</span><span className="font-bold text-emerald-400">₦198</span><span className="text-slate-500 text-xs">(30days)</span></li>
                  <li className="flex justify-between pt-2 text-slate-300"><span>1GB (CG)</span><span className="font-bold text-emerald-400">₦395</span><span className="text-slate-500 text-xs">(30days)</span></li>
                  <li className="flex justify-between pt-2 text-slate-300"><span>3GB (CG)</span><span className="font-bold text-emerald-400">₦1,185</span><span className="text-slate-500 text-xs">(30days)</span></li>
                  <li className="flex justify-between pt-2 text-slate-300"><span>5GB (CG)</span><span className="font-bold text-emerald-400">₦1,975</span><span className="text-slate-500 text-xs">(30days)</span></li>
                  <li className="flex justify-between pt-2 text-slate-300"><span>10GB (CG)</span><span className="font-bold text-emerald-400">₦3,950</span><span className="text-slate-500 text-xs">(30days)</span></li>
                </ul>
              </div>
              <Link href="/login" className="w-full py-2.5 rounded-xl gradient-btn-primary text-slate-950 font-bold text-center text-sm block">Buy Now</Link>
            </div>

            {/* 9mobile SME Data */}
            <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between hover:border-emerald-500/40 transition">
              <div>
                <h3 className="text-lg font-bold text-white text-center mb-4 flex items-center justify-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#82c91e]" /> 9mobile SME Data
                </h3>
                <ul className="space-y-2.5 text-sm divide-y divide-slate-800/80 mb-6">
                  <li className="flex justify-between pt-2 text-slate-300"><span>500MB (SME)</span><span className="font-bold text-emerald-400">₦180</span><span className="text-slate-500 text-xs">(30days)</span></li>
                  <li className="flex justify-between pt-2 text-slate-300"><span>1GB (SME)</span><span className="font-bold text-emerald-400">₦360</span><span className="text-slate-500 text-xs">(30days)</span></li>
                  <li className="flex justify-between pt-2 text-slate-300"><span>2GB (SME)</span><span className="font-bold text-emerald-400">₦720</span><span className="text-slate-500 text-xs">(30days)</span></li>
                  <li className="flex justify-between pt-2 text-slate-300"><span>10GB (SME)</span><span className="font-bold text-emerald-400">₦3,600</span><span className="text-slate-500 text-xs">(30days)</span></li>
                </ul>
              </div>
              <Link href="/login" className="w-full py-2.5 rounded-xl gradient-btn-primary text-slate-950 font-bold text-center text-sm block">Buy Now</Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 px-6 bg-[#080c14] relative">
        <div className="max-w-6xl mx-auto space-y-12 text-center">
          <div className="space-y-3">
            <h3 className="text-emerald-400 font-bold uppercase tracking-wider text-sm">About Us</h3>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              We are open to innovation & simplifying digital payments
            </h2>
            <p className="text-slate-400 text-base max-w-3xl mx-auto">
              At <span className="text-emerald-400 font-bold">SoftTap</span>, powered by <span className="text-cyan-400 font-bold">michalkeysoft</span>, we simplify daily VTU transactions. From cheap mobile data and airtime to TV subscriptions, electricity tokens, and exam result pins — everything is fast, secure, and one tap away.
            </p>
            <div className="w-16 h-1 bg-emerald-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="glass-panel p-6 rounded-2xl space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Our Mission</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                To empower individuals and businesses across Nigeria with seamless, affordable, and instant access to digital services and utility payments.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl space-y-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Our Vision</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                To build Nigeria's most trusted, ultra-fast VTU ecosystem, delivering 99.9% reliability and effortless user experience for every transaction.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl space-y-3">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Our Team</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Engineered with passion by <span className="text-cyan-400 font-semibold">michalkeysoft</span>, prioritizing security, clean design, and rapid customer support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6 bg-[#0a0e1a]">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <h3 className="text-emerald-400 font-bold uppercase tracking-wider text-sm">FAQ</h3>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Frequently Asked Questions</h2>
            <div className="w-16 h-1 bg-emerald-500 mx-auto rounded-full" />
          </div>

          <FAQAccordion />
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="py-20 px-6 bg-[#080c14] relative">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h3 className="text-emerald-400 font-bold uppercase tracking-wider text-sm">Contact Us</h3>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Get in Touch With Us</h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
              Have questions or need help with a transaction? We are available 24/7 to assist you.
            </p>
            <div className="w-16 h-1 bg-emerald-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Contact Details */}
            <div className="space-y-6">
              <a href="tel:08039579410" className="glass-panel p-6 rounded-2xl flex items-center gap-4 hover:border-emerald-500/40 transition block">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-white font-bold text-base">Phone & WhatsApp</p>
                  <p className="text-slate-400 text-sm">08039579410</p>
                </div>
              </a>

              <a href="mailto:michaelkeysofy@gmail.com" className="glass-panel p-6 rounded-2xl flex items-center gap-4 hover:border-emerald-500/40 transition block">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-white font-bold text-base">Email Support</p>
                  <p className="text-slate-400 text-sm">michaelkeysofy@gmail.com</p>
                </div>
              </a>

              <div className="glass-panel p-6 rounded-2xl flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-white font-bold text-base">Social Media Handles</p>
                  <p className="text-slate-400 text-sm">@michalkeysoft (TikTok, Twitter, Telegram)</p>
                </div>
              </div>
            </div>

            {/* Quick Contact Form */}
            <form className="glass-panel p-8 rounded-2xl space-y-4">
              <h3 className="text-xl font-bold text-white mb-2">Send Us a Message</h3>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Message</label>
                <textarea
                  rows="4"
                  placeholder="How can we help you?"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>
              <button type="submit" className="w-full py-3.5 rounded-xl gradient-btn-primary text-slate-950 font-bold text-sm">
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
