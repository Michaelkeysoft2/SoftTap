'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'Will my transaction be fulfilled immediately I make payment?',
    answer: 'Yes! SoftTap uses automated API gateways. Once your payment or wallet debit is successful, your data bundle, airtime, electricity token, or TV subscription is delivered instantly within seconds.',
  },
  {
    question: 'I am new here, what are the Steps to Follow?',
    answer: 'It is very simple: 1. Click "Register" to create your free account. 2. Log in and fund your wallet using automated instant bank transfer or Paystack. 3. Select any service (Data, Airtime, Cable TV, Electricity) and enter your details to receive instant delivery.',
  },
  {
    question: 'How much can I trust SoftTap?',
    answer: 'SoftTap is 100% reliable, secure, and powered by michalkeysoft. All payments and transactions are processed using industry-standard 256-bit SSL encryption with 99.9% uptime guaranteed.',
  },
  {
    question: 'How do I fund my SoftTap wallet?',
    answer: 'You can fund your wallet 24/7 using online debit card payment, automated bank transfer (your unique virtual account number), or USSD directly inside your dashboard.',
  },
  {
    question: 'What if I encounter an issue with my purchase?',
    answer: 'Our support team is available 24/7. You can reach out directly via WhatsApp/Call at 08039579410 or email us at michaelkeysofy@gmail.com, and we will resolve it promptly.',
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={idx}
            className={`rounded-2xl transition-all duration-300 border ${
              isOpen
                ? 'bg-slate-900/90 border-emerald-500/40 shadow-lg shadow-emerald-950/30'
                : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
            }`}
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full flex justify-between items-center px-6 py-5 text-left font-semibold text-slate-100 hover:text-emerald-400 transition-colors gap-4"
            >
              <span className="flex items-center gap-3 text-sm sm:text-base">
                <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? 'text-emerald-400' : 'text-slate-500'}`} />
                {faq.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 shrink-0 text-slate-400 transition-transform duration-300 ${
                  isOpen ? 'rotate-180 text-emerald-400' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-6 pb-5 pt-1 text-slate-400 text-sm leading-relaxed border-t border-slate-800/60 animate-in fade-in duration-200">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
