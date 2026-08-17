'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  ArrowRight, 
  Phone, 
  Calendar, 
  Layers, 
  Compass, 
  Maximize2,
  Award,
  Landmark,
  FileCheck,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { LUXURY_ESTATE } from '@/data/luxuryEstate';
import { BROKER_INFO } from '@/data/projects';
import { CinematicGallery } from '@/components/luxury/CinematicGallery';
import { SpecGrid } from '@/components/luxury/SpecGrid';
import { FloorPlanViewer } from '@/components/luxury/FloorPlanViewer';
import { NeighborhoodGuide } from '@/components/luxury/NeighborhoodGuide';
import { VipBookingCalendar } from '@/components/luxury/VipBookingCalendar';

export default function LuxuryLandingPage() {
  const { title, tagline, address, pricing, legalVerification, specs } = LUXURY_ESTATE;

  return (
    <div className="bg-obsidian-950 text-slate-100 min-h-screen selection:bg-gold-metallic selection:text-obsidian-950">
      
      {/* SECTION 1: FULL-SCREEN CINEMATIC HERO */}
      <section className="relative min-h-[95vh] flex items-center justify-center pt-20 pb-16 overflow-hidden border-b border-slate-900">
        
        {/* Background Image with Cinematic Luxury Gradient */}
        <div className="absolute inset-0 z-0">
          <img
            src={LUXURY_ESTATE.gallery[0].url}
            alt={title}
            className="w-full h-full object-cover scale-105 filter brightness-75 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/70 to-obsidian-950/40" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-obsidian-950/50 to-obsidian-950" />
        </div>

        {/* Ambient Gold Halo */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gold-metallic/10 blur-[120px] pointer-events-none rounded-full" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 w-full">
          
          {/* Top Verification Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-obsidian-950/90 border border-gold-metallic/40 text-gold-champagne text-xs font-mono tracking-widest shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-700">
            <ShieldCheck className="w-4 h-4 text-gold-metallic" />
            <span>CRDA SANCTIONED • {legalVerification.crdaLpNumber}</span>
          </div>

          {/* Bold Address Typography Header */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-light tracking-[0.25em] uppercase text-slate-300">
              <MapPin className="w-4 h-4 text-gold-metallic" />
              <span>{address.street}, {address.neighborhood}</span>
            </div>

            <h1 className="font-serif-luxury font-medium text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.1] max-w-4xl mx-auto">
              The Grand Horizon <br />
              <span className="metallic-gold-text italic font-normal">
                Waterfront Estate
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-lg font-light max-w-2xl mx-auto leading-relaxed pt-2">
              An 11,500 sq.ft ultra-luxury riverfront sanctuary with cantilevered infinity pool, 14-seat 4K Dolby Atmos cinema, private rooftop helipad, and 100% verified legal title.
            </p>
          </div>

          {/* Pricing & Key Meta Bar */}
          <div className="inline-flex flex-wrap items-center justify-center gap-6 sm:gap-10 p-4 sm:px-8 rounded-2xl bg-obsidian-950/85 backdrop-blur-2xl border border-gold-metallic/30 shadow-2xl">
            <div className="text-left">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">Offered At</span>
              <span className="font-serif-luxury font-bold text-2xl sm:text-3xl text-gold-metallic">{pricing.inr}</span>
              <span className="text-xs text-slate-400 block font-light">({pricing.usd})</span>
            </div>

            <div className="hidden sm:block w-px h-10 bg-slate-800" />

            <div className="text-left hidden sm:block">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">Living Area</span>
              <span className="font-display font-bold text-lg text-white">11,500 Sq.Ft</span>
              <span className="text-xs text-slate-400 block font-light">1.25 Acre Parcel</span>
            </div>

            <div className="hidden sm:block w-px h-10 bg-slate-800" />

            <div className="text-left hidden sm:block">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">Configuration</span>
              <span className="font-display font-bold text-lg text-white">5 Bed Suites • 7 Bath</span>
              <span className="text-xs text-slate-400 block font-light">60ft Horizon Pool</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href="#vip-booking"
              className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-gold-metallic via-gold-champagne to-gold-metallic hover:from-gold-champagne hover:to-gold-metallic text-obsidian-950 font-bold text-sm shadow-2xl shadow-gold-metallic/25 transition-all transform hover:scale-105 active:scale-95"
            >
              <Calendar className="w-4 h-4 text-obsidian-950" />
              <span>Schedule Private VIP Tour</span>
            </a>

            <a
              href="#gallery"
              className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-navy-950/80 hover:bg-navy-900 text-slate-200 text-sm font-semibold border border-slate-700 hover:border-gold-metallic/50 backdrop-blur-xl transition-all"
            >
              <Maximize2 className="w-4 h-4 text-gold-metallic" />
              <span>Explore Cinematic Gallery</span>
            </a>
          </div>

          {/* Scroll Down Indicator */}
          <div className="pt-6">
            <a
              href="#gallery"
              className="inline-flex flex-col items-center gap-1 text-[11px] font-mono uppercase tracking-widest text-slate-400 hover:text-gold-metallic transition-colors"
            >
              <span>Scroll to Explore</span>
              <ChevronDown className="w-4 h-4 animate-bounce text-gold-metallic" />
            </a>
          </div>

        </div>
      </section>

      {/* STICKY LUXURY SUB-NAV BAR */}
      <nav className="sticky top-16 z-30 w-full glass-panel-luxury border-y border-slate-800/80 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-14 text-xs font-semibold">
          <div className="flex items-center gap-6 overflow-x-auto scrollbar-none tracking-wider uppercase text-slate-300">
            <a href="#gallery" className="hover:text-gold-metallic transition-colors whitespace-nowrap">Gallery</a>
            <a href="#specifications" className="hover:text-gold-metallic transition-colors whitespace-nowrap">Specifications</a>
            <a href="#floor-plans" className="hover:text-gold-metallic transition-colors whitespace-nowrap">Floor Plans</a>
            <a href="#neighborhood" className="hover:text-gold-metallic transition-colors whitespace-nowrap">Neighborhood</a>
            <a href="#vip-booking" className="hover:text-gold-metallic transition-colors whitespace-nowrap text-gold-metallic">VIP Showing</a>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${BROKER_INFO.phone}`}
              className="hidden sm:flex items-center gap-2 text-gold-champagne hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-gold-metallic" />
              <span>{BROKER_INFO.phone}</span>
            </a>

            <a
              href="#vip-booking"
              className="px-4 py-1.5 rounded-xl bg-gold-metallic text-obsidian-950 font-bold text-[11px] hover:bg-gold-champagne transition-all"
            >
              Book Tour
            </a>
          </div>
        </div>
      </nav>

      {/* SECTION 2: FULL-SCREEN CINEMATIC GALLERY */}
      <CinematicGallery />

      {/* SECTION 3: KEY ARCHITECTURAL SPECIFICATIONS GRID */}
      <SpecGrid />

      {/* SECTION 4: INTERACTIVE MULTI-LEVEL FLOOR PLAN VIEWER */}
      <FloorPlanViewer />

      {/* SECTION 5: INTERACTIVE NEIGHBORHOOD GUIDE */}
      <NeighborhoodGuide />

      {/* SECTION 6: PRIVATE CLIENT ADVISORY PROFILE */}
      <section className="relative w-full bg-obsidian-950 py-16 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel-luxury rounded-3xl p-8 sm:p-12 border border-gold-metallic/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-4 relative aspect-[4/5] rounded-2xl overflow-hidden bg-navy-950 border border-slate-800 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80"
                alt="Pavan Kumar - Managing Broker"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent flex items-end p-6">
                <div>
                  <span className="text-[11px] font-mono font-bold text-gold-metallic uppercase tracking-widest block">
                    Exclusive Listing Broker
                  </span>
                  <h3 className="font-serif-luxury font-bold text-xl text-white">
                    Pavan Kumar
                  </h3>
                  <p className="text-xs text-slate-300">Managing Director, Pavan Properties</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-5">
              <span className="text-[11px] font-mono font-bold text-gold-metallic uppercase tracking-[0.2em] bg-gold-metallic/10 border border-gold-metallic/30 px-3.5 py-1 rounded-full inline-block">
                Private Advisory & Legal Representation
              </span>

              <h2 className="font-serif-luxury font-medium text-2xl sm:text-3xl text-white">
                &quot;Ultra-luxury real estate requires absolute discretion, impeccable title verification, and zero legal ambiguity.&quot;
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
                As the sole representative for The Grand Horizon Waterfront Estate, Pavan Properties provides direct access to all certified government files, structural engineering warranties, and CRDA sanction layout copies prior to transaction commencement.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 text-xs">
                <div className="p-4 rounded-xl bg-navy-950 border border-slate-800">
                  <span className="font-serif-luxury font-bold text-xl text-white block">15+ Years</span>
                  <span className="text-slate-400 text-[11px]">AP Real Estate Advisory</span>
                </div>
                <div className="p-4 rounded-xl bg-navy-950 border border-slate-800">
                  <span className="font-serif-luxury font-bold text-xl text-gold-metallic block">100%</span>
                  <span className="text-slate-400 text-[11px]">Freehold Legal Title Clear</span>
                </div>
                <div className="p-4 rounded-xl bg-navy-950 border border-slate-800 col-span-2 sm:col-span-1">
                  <span className="font-serif-luxury font-bold text-xl text-emerald-400 block">₹180Cr+</span>
                  <span className="text-slate-400 text-[11px]">Facilitated High-Net-Worth Sales</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href={`tel:${BROKER_INFO.phone}`}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-semibold text-xs border border-slate-700 transition-colors"
                >
                  <Phone className="w-4 h-4 text-gold-metallic" />
                  <span>Call Broker Directly ({BROKER_INFO.phone})</span>
                </a>

                <a
                  href="#vip-booking"
                  className="flex items-center gap-2 text-xs font-bold text-gold-metallic hover:underline"
                >
                  <span>Request Confidential Dossier & Floor Plans</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SECTION 7: PRIVATE VIP TOUR BOOKING WITH CALENDAR INTEGRATION */}
      <VipBookingCalendar />

    </div>
  );
}
