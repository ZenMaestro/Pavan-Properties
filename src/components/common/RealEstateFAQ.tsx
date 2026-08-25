'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';
import { FAQ_DATA } from '@/data/faqs';

export const RealEstateFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 border-t border-[#eae3e0]" id="faq">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4f0ea] border border-[#c9ad98] text-[#715343] text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-[#a67d64]" />
            <span>Buyer Due Diligence & FAQs</span>
          </div>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#142334]">
            Frequently Asked Questions by Property Investors
          </h2>
          <p className="text-xs sm:text-sm text-[#5c4438] max-w-xl mx-auto">
            Essential legal, pricing, and connectivity answers for buyers in Vijayawada & Amaravati.
          </p>
        </div>

        {/* Accordion Items */}
        <div className="space-y-3">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="editorial-card overflow-hidden bg-[#ffffff] border border-[#eae3e0] transition-all rounded-xl"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-serif font-bold text-sm sm:text-base text-[#142334] hover:text-[#a67d64] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs font-mono font-normal text-[#a67d64]">0{idx + 1}.</span>
                    <span>{item.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#a67d64] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#344f6d] leading-relaxed border-t border-[#f4f0ea] animate-in fade-in duration-200">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Trust Note */}
        <div className="p-4 rounded-xl bg-[#f4f0ea] border border-[#c9ad98] flex items-center justify-between gap-4 text-xs text-[#142334]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#a67d64] shrink-0" />
            <span>Have a specific legal or survey query about Amaravati or Vijayawada layouts?</span>
          </div>
          <a
            href="tel:+919030444978"
            className="btn-primary text-[11px] py-1.5 px-3 whitespace-nowrap"
          >
            Call Pavan Kumar
          </a>
        </div>

      </div>
    </section>
  );
};
