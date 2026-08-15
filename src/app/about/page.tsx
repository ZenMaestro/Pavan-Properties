'use client';

import React from 'react';
import Link from 'next/link';
import { BROKER_INFO } from '@/data/projects';
import { ShieldCheck, Award, MapPin, Phone, Mail, CheckCircle2, Landmark, Building2, Sparkles } from 'lucide-react';
import { ProofStrip } from '@/components/common/ProofStrip';

export default function AboutPage() {
  return (
    <div className="space-y-16 pb-16">
      
      {/* SECTION 1: HERO */}
      <section className="relative pt-12 pb-16 bg-slate-900/60 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
            <Award className="w-4 h-4 text-emerald-400" />
            <span>15 Years Experience • 6 Major Cities</span>
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white">
            About Pavan Properties
          </h1>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Founded by Pavan Kumar, Pavan Properties is Andhra Pradesh&apos;s leading legal-first real estate brokerage specializing exclusively in 100% verified CRDA and RERA plots.
          </p>
        </div>
      </section>

      {/* Proof Strip */}
      <ProofStrip />

      {/* SECTION 2: BROKER BIO & STORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Portrait */}
          <div className="lg:col-span-5 relative aspect-[4/5] rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80"
              alt="Pavan Kumar Broker"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex items-end p-6">
              <div className="space-y-1">
                <span className="text-xs text-amber-400 font-bold uppercase tracking-wider block">Managing Broker & Founder</span>
                <h3 className="font-display font-bold text-2xl text-white">Pavan Kumar</h3>
                <p className="text-xs text-slate-300">Vijayawada & Amaravati Advisory</p>
              </div>
            </div>
          </div>

          {/* Biography Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                Broker Story & Philosophy
              </span>
              <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white">
                Building Trust Through Legal Transparency Since 2011
              </h2>
            </div>

            <div className="space-y-4 text-slate-300 text-sm leading-relaxed font-light">
              <p>
                In the rapidly growing real estate markets of Amaravati, Vijayawada, and Guntur, buyers often face a major risk: investing hard-earned capital in unapproved layouts or dispute-prone agricultural land with unkept promises of future approvals.
              </p>
              <p>
                Pavan Properties was founded with a singular rule: <strong className="text-white font-semibold">Zero Unverified Listings</strong>. Every project in our portfolio must hold official sanction orders from the Capital Region Development Authority (CRDA) and AP RERA registration certificates before we accept a single client booking.
              </p>
              <p>
                Over the past 15 years across 6 cities (Vijayawada, Amaravati, Guntur, Visakhapatnam, Hyderabad, and Tirupati), we have successfully assisted over 2,400 families and investors in acquiring clear-title real estate with complete peace of mind.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
              <h4 className="font-display font-bold text-sm text-amber-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Our 5 Guarantees to Every Buyer</span>
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Physical inspection of CRDA Sanction Orders</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>AP RERA Certificate & Escrow Status</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>30-Year Encumbrance Clearance (EC)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Nationalized Bank Loan Pre-Approvals</span>
                </li>
                <li className="flex items-center gap-2 col-span-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Free Chauffeur-Driven AC Transport for Site Visits</span>
                </li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 3: OFFICE & CONTACT ADDRESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          <div className="space-y-4">
            <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30 uppercase tracking-wider inline-block">
              Visit Our Brokerage Office
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
              Pavan Properties Head Office
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Walk in anytime between 9:00 AM and 7:00 PM to review physical paperwork, original master layout maps, and encumbrance certificates over coffee.
            </p>

            <div className="space-y-3 pt-2 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{BROKER_INFO.officeAddress}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                <a href={`tel:${BROKER_INFO.phone}`} className="hover:text-emerald-400 font-semibold text-white">
                  {BROKER_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{BROKER_INFO.email}</span>
              </div>
            </div>
          </div>

          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
            <iframe
              src="https://maps.google.com/maps?q=Vijayawada,Andhra+Pradesh&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Pavan Properties Office Map"
            />
          </div>

        </div>
      </section>

    </div>
  );
}
