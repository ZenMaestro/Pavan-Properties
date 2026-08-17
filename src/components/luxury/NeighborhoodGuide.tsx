'use client';

import React, { useState } from 'react';
import { Compass, Plane, Utensils, GraduationCap, HeartPulse, Clock, Navigation, MapPin } from 'lucide-react';
import { LUXURY_ESTATE, NeighborhoodLocation } from '@/data/luxuryEstate';

export const NeighborhoodGuide: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const locations = LUXURY_ESTATE.neighborhood;

  const filteredLocations = activeCategory === 'ALL'
    ? locations
    : locations.filter(loc => loc.category === activeCategory);

  const getIcon = (cat: string) => {
    switch (cat) {
      case 'AVIATION':
        return Plane;
      case 'DINING_CLUBS':
        return Utensils;
      case 'EDUCATION':
        return GraduationCap;
      case 'WELLNESS':
        return HeartPulse;
      default:
        return Navigation;
    }
  };

  return (
    <section className="relative w-full bg-obsidian-950 py-16 border-t border-slate-900" id="neighborhood">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-metallic">
              <Compass className="w-3.5 h-3.5 text-gold-metallic" />
              <span>Location Radar & Connectivity</span>
            </div>
            <h2 className="font-serif-luxury font-medium text-3xl sm:text-4xl text-white mt-1">
              Curated Neighborhood Guide
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm font-light mt-1">
              Located on the prestigious Capital Waterfront Corridor with seamless private aviation and highway connections.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {[
              { id: 'ALL', label: 'All Destinations' },
              { id: 'AVIATION', label: 'Aviation & Transit' },
              { id: 'DINING_CLUBS', label: 'Private Clubs & Dining' },
              { id: 'EDUCATION', label: 'Academies' },
              { id: 'WELLNESS', label: 'Wellness & Health' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 rounded-xl font-medium tracking-wider text-[11px] uppercase transition-all whitespace-nowrap border ${
                  activeCategory === tab.id
                    ? 'bg-gold-metallic text-obsidian-950 font-bold border-gold-metallic shadow-md shadow-gold-metallic/20'
                    : 'bg-navy-950/80 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Location Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLocations.map(loc => {
            const Icon = getIcon(loc.category);
            return (
              <div
                key={loc.id}
                className="glass-card-luxury p-6 rounded-2xl border border-slate-800 hover:border-gold-metallic/40 transition-all flex flex-col justify-between group space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-gold-metallic/10 border border-gold-metallic/20 flex items-center justify-center text-gold-metallic group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold text-gold-metallic bg-gold-metallic/10 border border-gold-metallic/30 px-2.5 py-1 rounded-full uppercase">
                      {loc.category.replace('_', ' ')}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif-luxury font-medium text-lg text-white group-hover:text-gold-champagne transition-colors">
                      {loc.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 font-light leading-relaxed">
                      {loc.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-gold-metallic font-mono font-bold">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{loc.driveTime} Drive</span>
                  </div>
                  <div className="text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    <span>{loc.distance}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Google Maps & Connectivity Strip */}
        <div className="glass-panel-luxury rounded-3xl p-6 sm:p-8 border border-gold-metallic/30 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-[11px] font-mono font-bold text-gold-metallic uppercase tracking-widest block">
              COORDINATES & ACCESS
            </span>
            <h3 className="font-serif-luxury font-medium text-2xl text-white">
              742 Grand Horizon Promenade
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
              Situated in the ultra-private gated waterfront district with 24/7 biometric barrier security, private marina access, and proximity to the new Amaravati state government secretariat zone.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs font-mono text-slate-300">
              <span className="bg-navy-950 px-3 py-1.5 rounded-lg border border-slate-800">16.5062° N</span>
              <span className="bg-navy-950 px-3 py-1.5 rounded-lg border border-slate-800">80.6480° E</span>
              <span className="text-gold-metallic font-bold">Direct Riverfront Parcel</span>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-[16/9] rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
            <iframe
              src="https://maps.google.com/maps?q=Amaravati,Andhra+Pradesh&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Estate Location Map"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
