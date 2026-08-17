'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';
import { BROKER_INFO } from '@/data/projects';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gunmetal-950 border-t border-slate-800 text-slate-400 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/80">
          
          {/* Col 1: Brand & Broker Promise */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-rodeo-500 text-gunmetal-950 flex items-center justify-center text-white">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="font-display font-bold text-lg text-white">PAVAN PROPERTIES</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Zero-risk real estate advisory specializing in CRDA layout sanctions, AP RERA registered townships, and bank loan pre-approvals across Andhra Pradesh & Telangana.
            </p>
            <div className="flex items-center gap-2 text-xs text-rodeo-400 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-rodeo-400" />
              <span>15 Years Experience • 6 Cities</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-display font-semibold text-sm">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-rodeo-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/#projects" className="hover:text-rodeo-400 transition-colors">Active Verified Projects</Link>
              </li>
              <li>
                <Link href="/photos" className="hover:text-rodeo-400 transition-colors">Photos & Site Visit Gallery</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-rodeo-400 transition-colors">About Pavan Kumar (Broker)</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-rodeo-400 transition-colors">Book a Site Visit Slot</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Paperwork & Verification Guarantee */}
          <div className="space-y-3">
            <h4 className="text-white font-display font-semibold text-sm">Verification Promise</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rodeo-400"></span>
                <span>CRDA Final Layout Sanctions</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rodeo-400"></span>
                <span>AP RERA Registration Orders</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rodeo-400"></span>
                <span>SBI & HDFC Loan Approvals</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-rodeo-400"></span>
                <span>Encumbrance Certificate (EC) 30 Yrs</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div className="space-y-3">
            <h4 className="text-white font-display font-semibold text-sm">Broker Office</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-rodeo-400 shrink-0 mt-0.5" />
                <span>{BROKER_INFO.officeAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-rodeo-400 shrink-0" />
                <a href={`tel:${BROKER_INFO.phone}`} className="hover:text-rodeo-400 text-white font-semibold">
                  {BROKER_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-rodeo-400 shrink-0" />
                <a href={`mailto:${BROKER_INFO.email}`} className="hover:text-rodeo-400">
                  {BROKER_INFO.email}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Pavan Properties. All rights reserved. LP Numbers & RERA IDs available for public verification.</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 font-medium">CRDA Sanctioned</span>
            <span>•</span>
            <span className="text-slate-400 font-medium">AP RERA Registered</span>
            <span>•</span>
            <span className="text-slate-400 font-medium">Bank Loan Pre-Approved</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
