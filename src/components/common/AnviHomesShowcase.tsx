'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Check, 
  Home, 
  Compass, 
  Plane, 
  Building2, 
  ArrowRight,
  Maximize2,
  Sparkles,
  Calendar
} from 'lucide-react';
import { Lightbox } from './Lightbox';
import { BROKER_INFO } from '@/data/projects';

export const AnviHomesShowcase: React.FC = () => {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const posters = [
    {
      src: '/projects/anvi-homes-1.jpg',
      title: 'Anvi Homes — 100 Feet Road Facing Project Banner',
      tag: 'Official Brochure'
    },
    {
      src: '/projects/anvi-homes-3.jpg',
      title: '12 Project Amenities & Custom Villa Options',
      tag: 'LP No. 30/2025'
    },
    {
      src: '/projects/anvi-homes-2.jpg',
      title: 'Telugu Language Layout Specification Poster',
      tag: 'APCRDA & AP RERA'
    },
    {
      src: '/projects/anvi-homes-4.jpg',
      title: 'Locational Highlights & Airport Connectivity',
      tag: 'Kesarapalli, Vijayawada'
    }
  ];

  const amenities = [
    { title: '40 Feet CC Roads', desc: 'Heavy-duty concrete roads' },
    { title: 'Grand Entrance Arch', desc: 'Gated entrance with security' },
    { title: 'Club House', desc: 'Community recreation space' },
    { title: 'Underground Drainage', desc: 'Concealed sewage network' },
    { title: 'Street Lights', desc: 'Illuminated internal avenues' },
    { title: 'Avenue Plantation', desc: 'Lush green landscaping' },
    { title: 'Over Head Water Tank', desc: 'Dedicated central storage' },
    { title: 'Individual Tap Connection', desc: 'Direct water to every plot' },
    { title: 'Rain Water Harvesting', desc: 'Eco-friendly recharge pits' },
    { title: "Children's Park", desc: 'Safe play area & garden' },
    { title: '24/7 Security', desc: 'Round-the-clock surveillance' },
    { title: 'Compound Wall & Gate', desc: 'Fully secured perimeter' }
  ];

  const houseOptions = [
    {
      type: 'Ground Floor House',
      desc: 'Spacious independent single-floor residence with parking and private garden.',
      price: 'Custom Built',
      badge: 'Immediate Construction'
    },
    {
      type: 'G+1 Luxury House',
      desc: 'Contemporary 3/4 BHK duplex with double-height living room & private terrace.',
      price: 'Custom Built',
      badge: 'Popular Choice'
    },
    {
      type: 'Luxury Duplex Villa',
      desc: 'Architecturally designed premium villa with Italian finishes & premium wood ceilings.',
      price: 'ONLY 1.20 Cr*',
      badge: 'Flagship Villa'
    }
  ];

  return (
    <div className="editorial-panel p-6 sm:p-10 bg-[#ffffff] border border-[#eae3e0] shadow-sm space-y-10">
      
      {/* Top Banner Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#eae3e0]">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="badge-dark text-xs px-3 py-1 font-mono font-bold">
              L.P. NO.: 30/2025
            </span>
            <span className="badge-rodeo text-xs px-3 py-1">
              APCRDA Approved Layout
            </span>
            <span className="badge-subtle text-xs px-3 py-1">
              AP RERA Approved
            </span>
          </div>

          <h2 className="font-serif font-bold text-2xl sm:text-4xl text-[#142334]">
            ANVI HOMES — Kesarapalli, Vijayawada
          </h2>

          <p className="text-sm text-[#715343] font-medium flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#a67d64] shrink-0" />
            <span>100 Feet Airport – West Bypass Connective Road Facing Project</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="tel:+919030444978"
            className="btn-primary text-xs py-2.5 px-4"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call 9030444978</span>
          </a>

          <a
            href="#book-visit"
            className="btn-accent text-xs py-2.5 px-4"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Site Visit</span>
          </a>
        </div>
      </div>

      {/* 4 Official Brochure Cards with Lightbox */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#715343] block">
              Official Project Documentation & Posters
            </span>
            <h3 className="font-serif font-bold text-lg text-[#142334]">
              Authentic Layout Brochures & Sanction Copies
            </h3>
          </div>
          <span className="text-xs text-[#715343] hidden sm:inline">Click image to enlarge full brochure</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {posters.map((poster, index) => (
            <div
              key={index}
              onClick={() => setActiveImageIndex(index)}
              className="editorial-card overflow-hidden group cursor-pointer border border-[#eae3e0] hover:border-[#c9ad98] transition-all"
            >
              <div className="relative aspect-square overflow-hidden bg-[#f4f0ea]">
                <img
                  src={poster.src}
                  alt={poster.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors flex items-center justify-center">
                  <span className="p-2 rounded-lg bg-white/95 text-[#142334] border border-[#eae3e0] opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                    <Maximize2 className="w-4 h-4 text-[#142334]" />
                  </span>
                </div>
                <div className="absolute top-2 left-2 bg-[#ffffff]/95 text-[#142334] text-[10px] font-semibold px-2 py-0.5 rounded border border-[#eae3e0]">
                  {poster.tag}
                </div>
              </div>

              <div className="p-3">
                <p className="font-serif font-bold text-xs text-[#142334] truncate">
                  {poster.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Location Connectivity Highlights */}
      <div className="p-6 rounded-xl bg-[#f9f6ee] border border-[#eae3e0] space-y-4">
        <h4 className="font-serif font-bold text-base text-[#142334]">
          Locational Highlights & Connectivity Radar
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 rounded-lg bg-[#ffffff] border border-[#eae3e0] flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#142334] text-white flex items-center justify-center shrink-0">
              <Plane className="w-4 h-4 text-[#c9ad98]" />
            </div>
            <div>
              <span className="font-bold text-sm text-[#142334] block">3.5 Km</span>
              <span className="text-[#5c4438]">Vijayawada Int. Airport</span>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-[#ffffff] border border-[#eae3e0] flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#142334] text-white flex items-center justify-center shrink-0">
              <Building2 className="w-4 h-4 text-[#c9ad98]" />
            </div>
            <div>
              <span className="font-bold text-sm text-[#142334] block">3.0 Km</span>
              <span className="text-[#5c4438]">HCL Tech Meda Towers</span>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-[#ffffff] border border-[#eae3e0] flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#142334] text-white flex items-center justify-center shrink-0">
              <Compass className="w-4 h-4 text-[#c9ad98]" />
            </div>
            <div>
              <span className="font-bold text-sm text-[#142334] block">3.5 Km</span>
              <span className="text-[#5c4438]">West Bypass Express Highway</span>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-[#ffffff] border border-[#eae3e0] flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#142334] text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-[#c9ad98]" />
            </div>
            <div>
              <span className="font-bold text-sm text-[#142334] block">100 Feet</span>
              <span className="text-[#5c4438]">Direct Connective Road Facing</span>
            </div>
          </div>
        </div>
      </div>

      {/* House Construction Options & Pricing (Ground Floor, G+1, Duplex) */}
      <div className="space-y-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#715343] block">
            Custom Build Options (మీ అవసరాన్ని బట్టీ హౌస్ నిర్మించి ఇవ్వబడును)
          </span>
          <h3 className="font-serif font-bold text-xl text-[#142334]">
            Open Plots & Luxury House Construction
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {houseOptions.map((house, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-[#ffffff] border border-[#eae3e0] hover:border-[#c9ad98] transition-all space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#f4f0ea] text-[#142334] border border-[#eae3e0]">
                    {house.badge}
                  </span>
                  <span className="font-sans font-bold text-sm text-[#a67d64]">
                    {house.price}
                  </span>
                </div>

                <h4 className="font-serif font-bold text-base text-[#142334]">
                  {house.type}
                </h4>

                <p className="text-xs text-[#5c4438] leading-relaxed">
                  {house.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[#eae3e0]">
                <a
                  href="#book-visit"
                  className="btn-secondary w-full text-xs py-2"
                >
                  <span>Inquire Custom Floor Plan</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 12 Project Highlights Grid */}
      <div className="space-y-4">
        <h4 className="font-serif font-bold text-lg text-[#142334]">
          12 Approved Layout Infrastructure Features
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 text-xs">
          {amenities.map((item, i) => (
            <div key={i} className="p-3 rounded-lg bg-[#f9f6ee] border border-[#eae3e0] flex items-start gap-2.5">
              <Check className="w-4 h-4 text-[#a67d64] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#142334] block">{item.title}</span>
                <span className="text-[11px] text-[#715343]">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox for full size poster view */}
      <Lightbox
        images={posters.map(p => p.src)}
        currentIndex={activeImageIndex}
        onClose={() => setActiveImageIndex(null)}
        onNavigate={(idx) => setActiveImageIndex(idx)}
      />

    </div>
  );
};
