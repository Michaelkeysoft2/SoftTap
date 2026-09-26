import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ShieldCheck, Lock, Eye, CheckCircle2, ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | SoftTap VTU & Billing',
  description: 'Privacy policy and data protection practices for SoftTap VTU & Billing platform.',
};

export default function PrivacyPage() {
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
            <ShieldCheck className="w-4 h-4" /> Data Protection &amp; NDPR Compliant
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-950 tracking-tight mb-3">
            Privacy Policy
          </h1>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-3xl">
            SoftTap is committed to protecting your personal data and ensuring transparency in how we collect, 
            use, and safeguard information when you use our VTU and bill payment services.
          </p>
          <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-y-2 gap-x-6 text-xs text-gray-400">
            <span>Last Updated: September 22, 2026</span>
            <span>Applicable Law: Nigeria Data Protection Regulation (NDPR)</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-200 space-y-10 text-gray-700 text-sm sm:text-base leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-950 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-extrabold shrink-0">1</span>
              Information We Collect
            </h2>
            <p>
              To process your VTU purchases and provide customer support, we collect the following categories of information:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-gray-600">
              <li><strong>Personal Identifiers:</strong> Full name, email address, telephone number, and account username.</li>
              <li><strong>Transaction Details:</strong> Service type (data, airtime, electricity, TV, exam pin), amount paid, transaction reference, date, and fulfillment status.</li>
              <li><strong>Service Recipient Data:</strong> Beneficiary mobile numbers, electricity meter numbers, or decoder smartcard (IUC) numbers submitted during purchase.</li>
              <li><strong>Technical Logs:</strong> Device type, browser version, IP address, and system timestamps for session security and fraud prevention.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-950 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-extrabold shrink-0">2</span>
              How We Use Your Information
            </h2>
            <p>We use the data collected strictly for legitimate business purposes:</p>
            <ul className="list-disc pl-6 space-y-1.5 text-gray-600">
              <li>Executing and delivering requested VTU orders instantly to your service providers.</li>
              <li>Crediting and maintaining your user wallet balance.</li>
              <li>Delivering automated transaction confirmations, payment receipts, and electricity token tokens.</li>
              <li>Preventing fraudulent payments, bot activity, and unauthorized wallet intrusions.</li>
              <li>Providing responsive technical and customer resolution support.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-950 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-extrabold shrink-0">3</span>
              Payment Security &amp; Card Data Protection
            </h2>
            <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-200 text-gray-800 space-y-2">
              <p className="font-semibold text-orange-950 flex items-center gap-2">
                <Lock className="w-4 h-4 text-orange-600" /> Secure Payment Processing via Paystack
              </p>
              <p className="text-sm text-gray-700">
                All card payments and automated wallet deposits are processed directly through 
                <strong> Paystack Payments Limited</strong>, an ISO 27001 and PCI-DSS Level 1 certified payment service provider.
              </p>
              <p className="text-xs text-gray-600">
                SoftTap does <span className="font-bold underline">not</span> store or process your complete credit/debit card numbers, 
                card CVVs, or online banking PINs on our servers.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-950 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-extrabold shrink-0">4</span>
              Information Sharing &amp; Third Parties
            </h2>
            <p>
              We do not sell, rent, or trade your personal data to advertisers or unrelated third parties. We share data only with:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-gray-600">
              <li><strong>Telecommunication Carriers &amp; Utility Providers:</strong> (MTN, Airtel, Glo, 9mobile, DISCOs, Multichoice, WAEC) solely to credit your phone lines or meters.</li>
              <li><strong>Payment Processors:</strong> Paystack and partner banks to authenticate transactions.</li>
              <li><strong>Regulatory &amp; Law Enforcement Bodies:</strong> Only when legally mandated in compliance with Nigerian laws and court orders.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-950 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-extrabold shrink-0">5</span>
              Data Retention &amp; Security Controls
            </h2>
            <p>
              Your data is stored on secure, encrypted cloud databases protected with HTTPS/TLS protocols, strict access 
              control policies, and modern hashing standards for user passwords. We retain transaction logs for accounting 
              and anti-fraud audits in accordance with Nigerian statutory guidelines.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-950 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-extrabold shrink-0">6</span>
              Your Privacy Rights (NDPR)
            </h2>
            <p>
              Under the Nigeria Data Protection Regulation (NDPR) and applicable data protection legislation, you have the right to:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-gray-600">
              <li>Request access to copies of your personal information held by us.</li>
              <li>Request rectification of incorrect or outdated profile details.</li>
              <li>Request the closure of your account and deletion of your personal records, subject to regulatory retention rules.</li>
            </ul>
          </section>

          {/* Section 7: Business Address & Contact */}
          <section className="space-y-4 pt-4 border-t border-gray-100">
            <h2 className="text-xl sm:text-2xl font-bold text-blue-950 flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center text-sm font-extrabold shrink-0">7</span>
              Data Protection Contact &amp; Business Address
            </h2>
            <p>
              For data protection questions, account inquiries, or exercising your privacy rights, please reach our Data Compliance team:
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
                  <Mail className="w-4 h-4" /> Support Email
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
