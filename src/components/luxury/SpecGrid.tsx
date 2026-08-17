'use client';

import React from 'react';
import { 
  Maximize, 
  BedDouble, 
  Bath, 
  Car, 
  Waves, 
  Layers, 
  Compass, 
  ShieldCheck, 
  Tv, 
  Wine, 
  Plane, 
  Cpu,
  Landmark,
  FileCheck
} from 'lucide-react';
import { LUXURY_ESTATE } from '@/data/luxuryEstate';

export const SpecGrid: React.FC = () => {
  const { specs, legalVerification, keyFeatures } = LUXURY_ESTATE;

  const specItems = [
    {
      icon: Maximize,
      label: 'Built-up Area',
      value: specs.builtUpArea,
      detail: 'Interior Living Space'
    },
    {
      icon: Layers,
      label: 'Private Parcel',
      value: specs.lotSize,
      detail: 'Gated Waterfront Lot'
    },
    {
      icon: BedDouble,
      label: 'Bedrooms',
      value: specs.bedrooms,
      detail: 'All with En-Suite Walk-ins'
    },
    {
      icon: Bath,
      label: 'Bathrooms',
      value: specs.bathrooms,
      detail: 'Bookmatched Marble Suites'
    },
    {
      icon: Waves,
      label: 'Infinity Pool',
      value: specs.pool,
      detail: 'Zero-Edge Cantilevered'
    },
    {
      icon: Car,
      label: 'Garage Capacity',
      value: specs.garage,
      detail: 'Climate-Controlled & EV Ready'
    },
    {
      icon: Compass,
      label: 'Architectural Style',
      value: specs.architectureStyle,
      detail: 'Italian Travertine & Bronze'
    },
    {
      icon: Cpu,
      label: 'Smart Automation',
      value: specs.smartAutomation,
      detail: 'Crestron Lighting & Security'
    }
  ];

  return (
    <section className="relative w-full bg-obsidian-950 py-16 border-t border-slate-900" id="specifications">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[11px] font-mono font-bold text-gold-metallic uppercase tracking-[0.25em] bg-gold-metallic/10 border border-gold-metallic/30 px-3.5 py-1 rounded-full inline-block">
            Architectural Specifications
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-white font-medium">
            Meticulously Crafted Dimensions
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm font-light">
            Every square foot is engineered with bespoke materials, imported fixtures, and unmatched attention to detail.
          </p>
        </div>

        {/* Minimalist 4x2 Grid with Metallic Dividers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-800/80 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
          {specItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-navy-950/90 p-6 sm:p-8 flex flex-col justify-between hover:bg-navy-900/90 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold group-hover:text-gold-metallic transition-colors">
                    {item.label}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-gold-metallic/10 border border-gold-metallic/20 flex items-center justify-center text-gold-metallic group-hover:scale-110 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="font-display font-bold text-lg sm:text-xl text-white tracking-tight leading-snug">
                    {item.value}
                  </div>
                  <div className="text-xs text-slate-400 font-light">
                    {item.detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {keyFeatures.map((feat, idx) => (
            <div
              key={idx}
              className="glass-card-luxury p-6 rounded-2xl border border-slate-800 hover:border-gold-metallic/40 transition-all space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-metallic/20 to-gold-bronze/20 border border-gold-metallic/30 flex items-center justify-center text-gold-metallic">
                {idx === 0 && <Waves className="w-5 h-5" />}
                {idx === 1 && <Maximize className="w-5 h-5" />}
                {idx === 2 && <Tv className="w-5 h-5" />}
                {idx === 3 && <Wine className="w-5 h-5" />}
                {idx === 4 && <Plane className="w-5 h-5" />}
                {idx === 5 && <ShieldCheck className="w-5 h-5" />}
              </div>

              <h3 className="font-serif-luxury font-medium text-lg text-white">
                {feat.title}
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed font-light">
                {feat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Legal Paperwork Verification Banner */}
        <div className="glass-panel-luxury rounded-3xl p-6 sm:p-8 border border-gold-metallic/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gold-metallic/20 border border-gold-metallic/40 flex items-center justify-center text-gold-metallic shrink-0">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-serif-luxury font-bold text-lg text-white">Government Sanctions & Legal Clearances</h4>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  Verified Freehold
                </span>
              </div>
              <p className="text-xs text-slate-300 font-light mt-0.5">
                CRDA Sanction: <strong className="text-gold-metallic font-mono">{legalVerification.crdaLpNumber}</strong> • RERA Registration: <strong className="text-white font-mono">{legalVerification.reraRegistration}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs text-slate-400 font-mono">
              Pre-Approved Bank Facilities:
            </span>
            <div className="flex items-center gap-1.5">
              {legalVerification.bankApprovals.map((bank, i) => (
                <span key={i} className="text-[11px] bg-slate-900 px-3 py-1 rounded-lg border border-slate-700 text-slate-200">
                  {bank}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
