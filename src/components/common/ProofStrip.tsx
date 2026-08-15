'use client';

import React from 'react';
import { Award, ShieldCheck, MapPin, Landmark } from 'lucide-react';
import { BROKER_INFO } from '@/data/projects';

export const ProofStrip: React.FC = () => {
  const stats = [
    {
      icon: Award,
      value: `${BROKER_INFO.experienceYears}+ Years`,
      label: 'Real Estate Expertise',
      subtext: 'In Amaravati & Vijayawada'
    },
    {
      icon: MapPin,
      value: `${BROKER_INFO.citiesServed} Major Cities`,
      label: 'AP & Telangana Coverage',
      subtext: 'Vijayawada, Amaravati, Guntur...'
    },
    {
      icon: ShieldCheck,
      value: `${BROKER_INFO.verifiedListingsPercent}% Verified`,
      label: 'CRDA & RERA Paperwork',
      subtext: 'LP Numbers On Record'
    },
    {
      icon: Landmark,
      value: BROKER_INFO.totalLoansFacilitated,
      label: 'Bank Loans Sanctioned',
      subtext: 'SBI, HDFC, ICICI Tie-ups'
    }
  ];

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-12">
      <div className="glass-panel-gold rounded-2xl p-6 sm:p-8 shadow-2xl shadow-emerald-950/40 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/80">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className={`flex items-start gap-4 ${idx !== 0 ? 'sm:pl-6 pt-4 sm:pt-0' : ''}`}>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-emerald-500/20 border border-amber-500/30 flex items-center justify-center shrink-0">
                <Icon className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <div className="font-display font-extrabold text-xl sm:text-2xl text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-0.5">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {stat.subtext}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
