import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ShieldCheck, FileText, CheckCircle2, ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';

export const metadata = {
  title: 'Terms & Conditions | SoftTap VTU & Billing',
  description: 'Terms of service and user agreement for SoftTap VTU & Billing platform.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col justify-between selection:bg-orange-400 selection:text-white">
      <Navbar />

      <main className="flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        {/* Breadcrumb / Back button */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-orange-500 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-gray-200 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-600 text-xs font-semibold mb-4">
            <FileText className="w-4 h-4" /> Legal Agreement
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-950 tracking-tight mb-3">
            Terms &amp; Conditions
          </h1>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-3xl">
            Please read these Terms and Conditions carefully before using the SoftTap VTU platform, 
            accessible via <span className="font-semibold text-gray-700">softtap.vercel.app</span> and related services.
          </p>
          <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-y-2 gap-x-6 text-xs text-gray-400">
            <span>Last Updated: September 22, 2026</span>
            <span>Effective Date: Immediate</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-200 space-y-10 text-gray-700 text-sm sm:text-base leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-950 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-extrabold shrink-0">1</span>
              Acceptance of Terms
            </h2>
            <p>
              By accessing, browsing, registering an account, funding a wallet, or initiating any transaction on SoftTap 
              (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;, operated by <span className="font-semibold">Michaelkeysoft</span>), 
              you confirm that you have read, understood, and agreed to be legally bound by these Terms and Conditions.
            </p>
            <p>
              If you do not agree with any part of these terms, you must discontinue your use of our website and services immediately.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-950 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-extrabold shrink-0">2</span>
              Description of Services
            </h2>
            <p>
              SoftTap provides an automated, real-time Virtual Top-Up (VTU) and bill payment gateway in Nigeria, enabling customers to:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-gray-600">
              <li>Purchase mobile data bundles (MTN, Airtel, Glo, 9mobile - SME, Corporate Gifting, Direct).</li>
              <li>Recharge prepaid airtime for all major Nigerian telecommunications networks.</li>
              <li>Pay for cable television subscriptions (DStv, GOtv, StarTimes).</li>
              <li>Purchase prepaid electricity tokens and settle postpaid electricity bills for Nigerian DISCOs (IBEDC, EKEDC, AEDC, EEDC, PHED, KEDCO, IKEDC, etc.).</li>
              <li>Purchase educational examination result checker pins (WAEC, NECO, NABTEB, NBAIS).</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-950 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-extrabold shrink-0">3</span>
              User Accounts &amp; Security
            </h2>
            <p>
              To access wallet features and discounted pricing, users may register an account. You agree to:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-gray-600">
              <li>Provide accurate, current, and complete information during registration.</li>
              <li>Maintain the confidentiality of your login credentials and password.</li>
              <li>Promptly notify us if you suspect any unauthorized access or breach of your account.</li>
              <li>Accept sole responsibility for all transactions executed through your credentials.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-950 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-extrabold shrink-0">4</span>
              Payments &amp; Wallet Funding
            </h2>
            <p>
              All payments for wallet funding and instant checkouts are processed securely through regulated payment gateways, 
              principally <span className="font-semibold text-gray-900">Paystack Payments Limited</span> (PCI-DSS compliant), 
              as well as designated automated bank accounts.
            </p>
            <p>
              Funds deposited into your SoftTap wallet are meant solely for purchasing available VTU services. 
              Users must not attempt fraudulent chargebacks or unauthorized debit reversals. Any fraudulent wallet activity 
              will result in immediate account suspension and referral to law enforcement agencies.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-950 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-extrabold shrink-0">5</span>
              User Accuracy &amp; Irreversibility of Carrier Top-Ups
            </h2>
            <p>
              Users are strictly responsible for verifying recipient details (mobile telephone numbers, electricity meter numbers, 
              smartcard/IUC numbers, and examination categories) prior to authorizing payments.
            </p>
            <p className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl text-amber-900 text-sm">
              <strong>Notice on Digital Deliveries:</strong> Once digital value (such as airtime or data) is successfully 
              dispatched by the telecommunication network to a recipient phone number provided by the user, the transaction 
              is complete and cannot be reversed, recalled, or redirected to a different line.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-950 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-extrabold shrink-0">6</span>
              Service Availability &amp; Third-Party Networks
            </h2>
            <p>
              While SoftTap operates an automated 24/7 delivery engine with high availability, our fulfillment relies on 
              telecommunication carriers, power distribution companies, and exam councils. We are not liable for transient 
              third-party server downtimes, carrier network congestion, or power utility grid maintenance, though our automated 
              queue will verify and retry eligible pending orders.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-950 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-extrabold shrink-0">7</span>
              Governing Law &amp; Dispute Resolution
            </h2>
            <p>
              These Terms and Conditions are governed by and construed in accordance with the laws of the 
              <span className="font-semibold text-gray-900"> Federal Republic of Nigeria</span>. Any disputes arising from 
              or in connection with these terms shall first be addressed amicably through our customer support channels. 
              If unresolved within 30 days, disputes shall be submitted to the competent courts of Oyo State, Nigeria.
            </p>
          </section>

          {/* Section 8: Business Address & Contact */}
          <section className="space-y-4 pt-4 border-t border-gray-100">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-950 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-extrabold shrink-0">8</span>
              Business Contact &amp; Physical Address
            </h2>
            <p>
              If you have any questions, inquiries, or legal concerns regarding these Terms, please contact us:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                <div className="flex items-center gap-2 text-orange-600 font-bold text-sm mb-1">
                  <MapPin className="w-4 h-4" /> Physical Business Address
                </div>
                <p className="text-xs sm:text-sm text-gray-600">
                  3, Barika, Opposite UI Second Gate, Ibadan, Oyo State, Nigeria
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                <div className="flex items-center gap-2 text-orange-600 font-bold text-sm mb-1">
                  <Phone className="w-4 h-4" /> Phone &amp; WhatsApp
                </div>
                <p className="text-xs sm:text-sm text-gray-600">
                  +234 803 957 9410
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                <div className="flex items-center gap-2 text-orange-600 font-bold text-sm mb-1">
                  <Mail className="w-4 h-4" /> Email Address
                </div>
                <p className="text-xs sm:text-sm text-gray-600 break-all">
                  michaelkeysoft@gmail.com
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
