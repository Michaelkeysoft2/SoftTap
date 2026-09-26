import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { RefreshCw, CheckCircle2, AlertCircle, ArrowLeft, Mail, Phone, MapPin, Clock, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Refund & Cancellation Policy | SoftTap VTU & Billing',
  description: 'Refund, cancellation, and transaction reversal policies for SoftTap VTU & Billing platform.',
};

export default function RefundPolicyPage() {
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
            <RefreshCw className="w-4 h-4" /> Transaction Reversal &amp; Customer Protection
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-950 tracking-tight mb-3">
            Refund &amp; Cancellation Policy
          </h1>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-3xl">
            At SoftTap, we strive to deliver 100% instant fulfillment on all digital VTU orders. 
            This policy outlines our procedures regarding failed transactions, cancellations, and wallet refund credits.
          </p>
          <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-y-2 gap-x-6 text-xs text-gray-400">
            <span>Last Updated: September 22, 2026</span>
            <span>Customer Resolution Guarantee: 24 - 48 Hours</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-200 space-y-10 text-gray-700 text-sm sm:text-base leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-950 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-extrabold shrink-0">1</span>
              Nature of Digital Services
            </h2>
            <p>
              SoftTap provides real-time, irreversible digital goods and services, including mobile data bundles, 
              prepaid airtime, electricity tokens, cable TV renewals, and examination checker pins. 
              Because these products are instantly delivered electronically to external telco and utility carrier systems, 
              completed transactions cannot be cancelled once value has been dispatched to the destination line or meter.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-950 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-extrabold shrink-0">2</span>
              Failed Transactions &amp; Automated Wallet Refunds
            </h2>
            <p>
              In the unlikely event that a transaction fails due to carrier server downtime, API timeout, or insufficient network balance:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-green-50/70 border border-green-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-green-900 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-green-600" /> Instant Auto-Refund
                </div>
                <p className="text-xs sm:text-sm text-green-800">
                  If the carrier rejects your request immediately, our system automatically reverses the charge and credits the full purchase amount back into your SoftTap wallet within seconds.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-orange-50/70 border border-orange-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-orange-950 text-sm">
                  <Clock className="w-5 h-5 text-orange-600" /> Pending &amp; Queued Orders
                </div>
                <p className="text-xs sm:text-sm text-orange-900">
                  If an order enters a &quot;Processing&quot; state during network congestion, our automated queue verifies status with the provider for up to 15 minutes. If unfulfilled, the funds are reversed to your wallet.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-950 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-extrabold shrink-0">3</span>
              Incorrect Details Supplied by Customer
            </h2>
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2 text-sm">
              <p className="font-bold flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" /> Important Customer Notice
              </p>
              <p>
                SoftTap is not liable for orders fulfilled to an incorrect phone number, electricity meter, or smartcard 
                provided by the customer. Telecommunications providers and DISCOs do not permit refunds or recalls on successfully 
                delivered airtime, data, or meter tokens. Please cross-check all recipient numbers thoroughly before placing an order.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-950 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-extrabold shrink-0">4</span>
              Paystack Wallet Funding &amp; Duplicate Debits
            </h2>
            <p>
              When funding your wallet via Paystack:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-gray-600">
              <li>
                <strong>Delayed Bank Credits:</strong> If your bank account was debited but your SoftTap wallet was not credited immediately due to network latency, click the <em>&quot;Retry Verify&quot;</em> button on the funding screen or contact support with your Paystack payment reference.
              </li>
              <li>
                <strong>Duplicate Charges:</strong> In the rare event of a duplicate bank debit by your issuing bank, please send your payment proof. Upon verification with Paystack, duplicate sums are refunded to your bank account or SoftTap wallet within 24 to 48 business hours.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-950 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-extrabold shrink-0">5</span>
              Cancellation Policy
            </h2>
            <p>
              Due to automated instant processing, once a purchase order is submitted and reaches &quot;Processing&quot; or &quot;Successful&quot; status, it cannot be cancelled by the user. 
              Users may choose to leave unused wallet balances for future utility bill payments at any time.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-950 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-extrabold shrink-0">6</span>
              How to Request a Refund / Dispute Resolution
            </h2>
            <p>
              If you experience any transaction issue requiring manual review:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-gray-600">
              <li>Note your <strong>Transaction ID</strong> or <strong>Paystack Reference</strong> from your dashboard or email receipt.</li>
              <li>Reach out to our customer care team via WhatsApp (<span className="font-semibold text-gray-900">+234 803 957 9410</span>) or email (<span className="font-semibold text-gray-900">michaelkeysoft@gmail.com</span>).</li>
              <li>Provide your registered SoftTap email, the amount debited, and the timestamp.</li>
              <li>Our support desk will investigate with the respective carrier and resolve your request within <strong>24 to 48 business hours</strong>.</li>
            </ol>
          </section>

          {/* Section 7: Business Address & Contact */}
          <section className="space-y-4 pt-4 border-t border-gray-100">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-950 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-extrabold shrink-0">7</span>
              Support Desk &amp; Business Address
            </h2>
            <p>
              You can contact our customer resolution desk directly:
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
                  <Mail className="w-4 h-4" /> Dispute Email
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
