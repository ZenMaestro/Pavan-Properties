'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, FileCheck, Phone, ArrowRight, CheckCircle2, Award, Landmark, Sparkles, Building2, MapPin } from 'lucide-react';
import { PROJECTS, BROKER_INFO } from '@/data/projects';
import { ProofStrip } from '@/components/common/ProofStrip';
import { ProjectCard } from '@/components/common/ProjectCard';
import { BookSlotForm } from '@/components/common/BookSlotForm';

export default function HomePage() {
  return (
    <div className="space-y-16 pb-16">
      
      {/* SECTION 1: HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-8 pb-16 overflow-hidden">
        
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-rodeo-500/25 via-platinum-300/10 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Col: Core Value Prop */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gunmetal-900 border border-rodeo-400/40 text-rodeo-300 text-xs font-semibold shadow-inner">
                <ShieldCheck className="w-4 h-4 text-rodeo-400" />
                <span>100% Legal Paperwork Guaranteed • Zero Unverified Plots</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.15]">
                Verified Paperwork <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-springwood-50 via-rodeo-300 to-rodeo-500 bg-clip-text text-transparent">
                  Real Estate in Amaravati
                </span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
                We don&apos;t just show glossy 3D renders—we prove legal title with official <strong className="text-amber-300 font-semibold">CRDA Sanction Orders</strong>, <strong className="text-rodeo-400 font-semibold">AP RERA Registrations</strong>, and pre-approved bank loans before you inspect a single plot.
              </p>

              {/* Verified Proof Badges Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5 text-xs text-slate-200">
                  <FileCheck className="w-5 h-5 text-rodeo-400 shrink-0" />
                  <div>
                    <span className="font-bold text-white block">CRDA Sanctioned</span>
                    <span className="text-[10px] text-slate-400">Layout Plans Released</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5 text-xs text-slate-200">
                  <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <span className="font-bold text-white block">AP RERA Registered</span>
                    <span className="text-[10px] text-slate-400">Escrow Protected</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5 text-xs text-slate-200 col-span-2 sm:col-span-1">
                  <Landmark className="w-5 h-5 text-blue-400 shrink-0" />
                  <div>
                    <span className="font-bold text-white block">Bank Approved</span>
                    <span className="text-[10px] text-slate-400">SBI, HDFC 80% Loans</span>
                  </div>
                </div>
              </div>

              {/* Fast Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="#book-slot"
                  className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-rodeo-500 via-rodeo-400 to-rodeo-500 text-gunmetal-950 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm shadow-xl shadow-emerald-950/80 transition-all transform hover:scale-[1.02] active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Book Free Site Visit Slot</span>
                </a>

                <a
                  href={`tel:${BROKER_INFO.phone}`}
                  className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700 transition-colors"
                >
                  <Phone className="w-4 h-4 text-rodeo-400" />
                  <span>Call {BROKER_INFO.phone}</span>
                </a>
              </div>

            </div>

            {/* Right Col: Embedded Lead Booking Form */}
            <div className="lg:col-span-5" id="book-slot">
              <BookSlotForm
                title="Book a Free Site Visit"
                subtitle="Select your preferred project to inspect verified paperwork & plot location."
              />
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: PROOF STRIP STATS */}
      <ProofStrip />

      {/* SECTION 3: FEATURED VERIFIED PROJECTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="projects">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-rodeo-400 uppercase tracking-wider">
              <Building2 className="w-4 h-4" />
              <span>Active Verified Projects ({PROJECTS.length})</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white mt-1">
              Active CRDA & RERA Sanctioned Townships
            </h2>
            <p className="text-slate-400 text-sm mt-2 max-w-xl">
              Every listing includes official LP Numbers, RERA Registration IDs, and verified bank approval documentation.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-xs font-bold text-rodeo-400 hover:text-rodeo-300 border-b border-emerald-400/40 pb-1 w-fit"
          >
            <span>Need Custom Layout Requirement? Contact Broker</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* SECTION 4: TRUST ENGINE - "PAPERWORK BEFORE PAYMENT" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-800 relative overflow-hidden">
          
          <div className="max-w-3xl space-y-4 mb-10">
            <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/30 uppercase tracking-wider inline-flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>Our 4-Step Legal Verification Workflow</span>
            </span>
            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-white">
              Why Pavan Properties? <br />
              <span className="text-rodeo-400">Paperwork Before Payment</span>
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              In real estate, promises mean nothing without government stamp approvals. Here is how we verify every single property before recommending it to buyers:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 relative group hover:border-rodeo-400/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-rodeo-500/20 border border-rodeo-400/30 text-rodeo-400 flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="font-display font-bold text-base text-white">CRDA Layout Order</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                We verify official CRDA Sanction Orders (LP Numbers) confirming road width allocations and government open space handovers.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 relative group hover:border-rodeo-400/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="font-display font-bold text-base text-white">AP RERA Certificate</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Full AP RERA portal registration check ensuring buyer escrow safety and strict statutory completion guarantees.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 relative group hover:border-rodeo-400/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400 flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="font-display font-bold text-base text-white">30-Yr EC & Title Search</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Complete Encumbrance Certificate (EC) audit ensuring zero legal mortgages, disputes, or agricultural title conflicts.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3 relative group hover:border-rodeo-400/40 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-400 flex items-center justify-center font-bold text-sm">
                04
              </div>
              <h3 className="font-display font-bold text-base text-white">Pre-Approved Bank Loans</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Nationalized bank tie-ups (SBI, HDFC, ICICI) ready for up to 80% spot housing loan sanctions.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 5: BROKER PROFILE HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-4 relative aspect-[4/5] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80"
              alt="Pavan Kumar Broker"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex items-end p-6">
              <div>
                <span className="text-xs text-rodeo-400 font-bold tracking-wider uppercase block">Managing Director</span>
                <h3 className="font-display font-bold text-xl text-white">Pavan Kumar</h3>
                <p className="text-xs text-slate-300 mt-0.5">15+ Years Licensed Broker</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-rodeo-400">
              <CheckCircle2 className="w-4 h-4 text-rodeo-400" />
              <span>Personalized Advisory Guarantee</span>
            </div>

            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
              &quot;My rule for 15 years: If the paperwork isn&apos;t clear on day one, I will never let my client touch the plot.&quot;
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed">
              {BROKER_INFO.bio}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-2xl font-display font-extrabold text-white block">2,400+</span>
                <span className="text-xs text-slate-400">Happy Property Buyers</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800">
                <span className="text-2xl font-display font-extrabold text-rodeo-400 block">₹180Cr+</span>
                <span className="text-xs text-slate-400">Loans Sanctioned</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 col-span-2 sm:col-span-1">
                <span className="text-2xl font-display font-extrabold text-amber-400 block">100%</span>
                <span className="text-xs text-slate-400">Legal Title Clearance</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 px-5 py-2.5 rounded-xl border border-slate-700 transition-colors"
              >
                <span>Read Full Broker Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 6: BOTTOM CTA BAND */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-gunmetal-950 via-gunmetal-900 to-gunmetal-950 rounded-3xl p-8 sm:p-12 border border-rodeo-400/30 text-center space-y-6 shadow-2xl shadow-emerald-950/50">
          
          <span className="bg-rodeo-500/20 text-rodeo-300 text-xs font-bold px-3 py-1 rounded-full border border-rodeo-400/30 uppercase tracking-wider inline-block">
            Book Site Visit In 3 Taps
          </span>

          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white max-w-2xl mx-auto">
            Ready to Inspect Verified CRDA Plots?
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Free AC car pickup provided for Amaravati & Vijayawada site visits. Original paperwork copies available on site.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-rodeo-500 via-rodeo-400 to-rodeo-500 text-gunmetal-950 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm shadow-xl shadow-emerald-950 transition-all transform hover:scale-105"
            >
              <Sparkles className="w-5 h-5" />
              <span>Book Your Slot Now</span>
            </Link>

            <a
              href={`tel:${BROKER_INFO.phone}`}
              className="flex items-center gap-2 px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm border border-slate-700 transition-colors"
            >
              <Phone className="w-5 h-5 text-rodeo-400" />
              <span>Call Broker ({BROKER_INFO.phone})</span>
            </a>
          </div>

        </div>
      </section>

    </div>
  );
}
