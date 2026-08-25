'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { BROKER_INFO } from '@/data/projects';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#142334] text-[#f9f6ee] pt-14 pb-10 border-t border-[#23374e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-[#23374e]/80 text-xs">
          
          {/* Col 1: Broker Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <img
                src="/logo.png"
                alt="Pavan Properties Logo"
                className="h-10 w-10 object-contain rounded-lg bg-white/10 p-1 border border-white/20"
              />
              <div className="font-serif font-bold text-base text-[#ffffff] tracking-wide">
                PAVAN PROPERTIES
              </div>
            </div>
            <p className="text-[#a7bdd2] leading-relaxed">
              Licensed real estate advisory specializing in CRDA sanctioned residential townships and RERA registered projects across Amaravati and Vijayawada.
            </p>
            <p className="text-[#c9ad98] font-medium pt-1">
              15 Years Experience • Andhra Pradesh
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-2.5">
            <h4 className="font-sans font-semibold text-[#ffffff] uppercase tracking-wider text-[11px]">
              Navigation
            </h4>
            <ul className="space-y-2 text-[#a7bdd2]">
              <li>
                <Link href="/" className="hover:text-[#ffffff] transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/#projects" className="hover:text-[#ffffff] transition-colors">Active Projects</Link>
              </li>
              <li>
                <Link href="/#verification" className="hover:text-[#ffffff] transition-colors">Verification Standards</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#ffffff] transition-colors">About Pavan Kumar</Link>
              </li>
              <li>
                <Link href="/photos" className="hover:text-[#ffffff] transition-colors">Site Photographs</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#ffffff] transition-colors">Schedule Visit / Contact</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Regulatory Notice */}
          <div className="space-y-2.5">
            <h4 className="font-sans font-semibold text-[#ffffff] uppercase tracking-wider text-[11px]">
              Verification Notes
            </h4>
            <ul className="space-y-2 text-[#a7bdd2]">
              <li>CRDA Layout Sanctions on Record</li>
              <li>AP RERA Registration Audited</li>
              <li>30-Year Encumbrance Verification</li>
              <li>SBI & HDFC Bank Pre-Approvals</li>
            </ul>
          </div>

          {/* Col 4: Office Location */}
          <div className="space-y-2.5">
            <h4 className="font-sans font-semibold text-[#ffffff] uppercase tracking-wider text-[11px]">
              Broker Office
            </h4>
            <div className="space-y-2 text-[#a7bdd2]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#c9ad98] shrink-0 mt-0.5" />
                <span>{BROKER_INFO.officeAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#c9ad98] shrink-0" />
                <a href={`tel:${BROKER_INFO.phone}`} className="hover:text-[#ffffff] text-[#ffffff] font-medium">
                  {BROKER_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#c9ad98] shrink-0" />
                <a href={`mailto:${BROKER_INFO.email}`} className="hover:text-[#ffffff]">
                  {BROKER_INFO.email}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Legal Disclaimer */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#799bb9]">
          <p>
            © {new Date().getFullYear()} Pavan Properties. All rights reserved. LP numbers and RERA details are provided for informational verification.
          </p>
          <p>
            Vijayawada & Amaravati, Andhra Pradesh, India.
          </p>
        </div>

      </div>
    </footer>
  );
};
