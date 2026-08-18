'use client';

import React from 'react';
import Link from 'next/link';
import { BROKER_INFO } from '@/data/projects';
import { MapPin, Phone, Mail, Check, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-16 pb-16 pt-8">
      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#715343] block">
            About Pavan Properties
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-5xl text-[#142334]">
            15 Years of Verified Property Advisory in Amaravati & Vijayawada
          </h1>
          <p className="text-base sm:text-lg text-[#344f6d] leading-relaxed">
            Founded with a singular commitment: provide clients with verified legal documentation, regulatory clarity, and transparent pricing before purchase decisions.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="editorial-panel p-8 sm:p-12 bg-[#ffffff] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-5 aspect-[4/5] rounded-xl overflow-hidden bg-[#f4f0ea] border border-[#eae3e0]">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80"
              alt="Pavan Kumar"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-7 space-y-5">
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#142334]">
              Our Professional Approach
            </h2>

            <div className="space-y-3 text-sm text-[#344f6d] leading-relaxed">
              <p>
                In the evolving real estate markets of Amaravati, Vijayawada, and Guntur, clear title documentation is the single most critical factor in safeguarding capital and ensuring long-term appreciation.
              </p>
              <p>
                Pavan Properties works directly with sanctioned layouts possessing valid CRDA approvals (LP Numbers) and AP RERA registrations. We assist buyers through title verification, site inspection, and bank loan pre-approvals.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#f9f6ee] border border-[#eae3e0] space-y-2 text-xs text-[#5c4438]">
              <h4 className="font-serif font-bold text-sm text-[#142334]">Our Core Commitments:</h4>
              <ul className="space-y-1.5">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#a67d64] shrink-0" />
                  <span>Transparent review of CRDA layout sanction orders</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#a67d64] shrink-0" />
                  <span>30-year Encumbrance Certificate (EC) verification support</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#a67d64] shrink-0" />
                  <span>No unverified or unauthorized agricultural conversion listings</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#a67d64] shrink-0" />
                  <span>Direct bank loan documentation coordination with SBI & HDFC</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* Office Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="editorial-panel p-8 bg-[#ffffff] grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#715343] block">
              Brokerage Office
            </span>
            <h3 className="font-serif font-bold text-2xl text-[#142334]">
              Visit Our Office in Vijayawada
            </h3>
            <p className="text-xs sm:text-sm text-[#344f6d] leading-relaxed">
              Appointments are available Monday through Sunday for in-depth title document reviews and master plan audits.
            </p>
            <div className="space-y-2 text-xs text-[#5c4438] pt-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#a67d64] shrink-0 mt-0.5" />
                <span>{BROKER_INFO.officeAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#a67d64] shrink-0" />
                <a href={`tel:${BROKER_INFO.phone}`} className="font-semibold text-[#142334]">
                  {BROKER_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#a67d64] shrink-0" />
                <span>{BROKER_INFO.email}</span>
              </div>
            </div>
          </div>

          <div className="aspect-[16/10] rounded-xl overflow-hidden border border-[#eae3e0] bg-[#f4f0ea]">
            <iframe
              src="https://maps.google.com/maps?q=Vijayawada,Andhra+Pradesh&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Office Location Map"
            />
          </div>
        </div>
      </section>

    </div>
  );
}
