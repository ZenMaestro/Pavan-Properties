'use client';

import React, { useState } from 'react';
import { Layers, MapPin, Maximize2, Sparkles, CheckCircle2, ChevronRight, Eye } from 'lucide-react';
import { LUXURY_ESTATE, LuxuryHotspot } from '@/data/luxuryEstate';

export const FloorPlanViewer: React.FC = () => {
  const levels = LUXURY_ESTATE.floorPlans;
  const [activeLevelIdx, setActiveLevelIdx] = useState(0);
  const currentLevel = levels[activeLevelIdx] || levels[0];
  const [selectedHotspot, setSelectedHotspot] = useState<LuxuryHotspot | null>(currentLevel.hotspots[0] || null);

  const handleLevelChange = (idx: number) => {
    setActiveLevelIdx(idx);
    setSelectedHotspot(levels[idx]?.hotspots[0] || null);
  };

  return (
    <section className="relative w-full bg-obsidian-950 py-16 border-t border-slate-900" id="floor-plans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-metallic">
              <Layers className="w-3.5 h-3.5 text-gold-metallic" />
              <span>Architectural Blueprint Viewer</span>
            </div>
            <h2 className="font-serif-luxury font-medium text-3xl sm:text-4xl text-white mt-1">
              Interactive Multi-Level Floor Plans
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm font-light mt-1">
              Explore room configurations, dimensions, and bespoke finishes across all 3 levels.
            </p>
          </div>

          {/* Level Switcher Tabs */}
          <div className="flex items-center gap-2 bg-navy-950 p-1.5 rounded-2xl border border-slate-800">
            {levels.map((lvl, idx) => (
              <button
                key={lvl.level}
                onClick={() => handleLevelChange(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-all flex items-center gap-2 ${
                  activeLevelIdx === idx
                    ? 'bg-gradient-to-r from-gold-metallic via-gold-champagne to-gold-metallic text-obsidian-950 font-bold shadow-lg shadow-gold-metallic/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <span>{lvl.level}</span>
                <span className="text-[10px] opacity-75 hidden sm:inline">({lvl.areaSqFt})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Viewer Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Col: High-Res Plan View with Interactive Hotspots */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[16/11] rounded-3xl overflow-hidden glass-panel-luxury border border-gold-metallic/30 p-4 sm:p-6 shadow-2xl group">
              
              {/* Background Architectural Illustration */}
              <img
                src={currentLevel.planImage}
                alt={`${currentLevel.title} Layout`}
                className="w-full h-full object-cover rounded-2xl opacity-90 group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-obsidian-950/30 rounded-2xl pointer-events-none" />

              {/* Hotspot Markers */}
              {currentLevel.hotspots.map((hs, i) => {
                const isSelected = selectedHotspot?.id === hs.id;
                return (
                  <button
                    key={hs.id}
                    onClick={() => setSelectedHotspot(hs)}
                    style={{ left: `${hs.coordinates.x}%`, top: `${hs.coordinates.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all z-20 group/marker`}
                  >
                    <span className={`relative flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold font-mono transition-transform ${
                      isSelected
                        ? 'bg-gold-metallic text-obsidian-950 border-white scale-125 shadow-xl shadow-gold-metallic/50'
                        : 'bg-obsidian-950/90 text-gold-metallic border-gold-metallic/60 hover:scale-110'
                    }`}>
                      {i + 1}
                      <span className={`absolute -inset-1 rounded-full border border-gold-metallic opacity-75 ${isSelected ? 'animate-ping' : ''}`} />
                    </span>
                    <span className="absolute left-full ml-2 px-2.5 py-1 rounded bg-obsidian-950/90 text-white text-[11px] font-semibold whitespace-nowrap border border-slate-700 opacity-0 group-hover/marker:opacity-100 transition-opacity pointer-events-none z-30">
                      {hs.name}
                    </span>
                  </button>
                );
              })}

              {/* Watermark Details */}
              <div className="absolute top-8 left-8 bg-obsidian-950/90 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-800 text-[11px] text-slate-300">
                <strong className="text-gold-metallic font-mono">{currentLevel.level}:</strong> {currentLevel.title}
              </div>
            </div>

            <p className="text-center text-xs text-slate-400 font-light flex items-center justify-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-gold-metallic" />
              <span>Click on the numbered golden hotspots on the blueprint to view room specifications.</span>
            </p>
          </div>

          {/* Right Col: Selected Room Hotspot Detail & Level Breakdown */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Level Summary Card */}
            <div className="glass-card-luxury p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-gold-metallic uppercase tracking-widest">
                  {currentLevel.level} OVERVIEW
                </span>
                <span className="text-xs font-bold text-white bg-navy-800/80 px-3 py-1 rounded-full border border-slate-700">
                  {currentLevel.areaSqFt}
                </span>
              </div>
              <h3 className="font-serif-luxury font-medium text-xl text-white">
                {currentLevel.title}
              </h3>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                {currentLevel.subtitle}
              </p>
            </div>

            {/* Selected Hotspot Detailed Specs */}
            {selectedHotspot && (
              <div className="glass-panel-luxury p-6 sm:p-8 rounded-3xl border border-gold-metallic/40 space-y-5 animate-in fade-in duration-300">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-gold-metallic uppercase tracking-widest">
                      SELECTED ROOM SPECIFICATION
                    </span>
                    <h4 className="font-serif-luxury font-bold text-xl text-white">
                      {selectedHotspot.name}
                    </h4>
                  </div>
                  <span className="text-sm font-mono font-extrabold text-gold-champagne bg-gold-metallic/10 border border-gold-metallic/30 px-3 py-1.5 rounded-xl">
                    {selectedHotspot.dimensions}
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-400 block mb-1 uppercase tracking-wider text-[10px] font-semibold">
                      Architectural Finishes & Materials
                    </span>
                    <p className="text-slate-200 font-medium bg-navy-950/80 p-3 rounded-xl border border-slate-800 leading-relaxed">
                      {selectedHotspot.finishes}
                    </p>
                  </div>

                  <div>
                    <span className="text-slate-400 block mb-1 uppercase tracking-wider text-[10px] font-semibold">
                      Design Notes & Amenities
                    </span>
                    <p className="text-slate-300 leading-relaxed font-light">
                      {selectedHotspot.description}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Hotspot Selectors List */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-semibold block px-1">
                Room Directory ({currentLevel.hotspots.length} Key Areas)
              </span>
              <div className="grid grid-cols-1 gap-2">
                {currentLevel.hotspots.map((hs, i) => (
                  <button
                    key={hs.id}
                    onClick={() => setSelectedHotspot(hs)}
                    className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all text-xs ${
                      selectedHotspot?.id === hs.id
                        ? 'bg-gold-metallic/15 border-gold-metallic text-white font-semibold'
                        : 'bg-navy-950/60 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-gold-metallic/20 text-gold-metallic flex items-center justify-center font-mono font-bold text-[10px]">
                        {i + 1}
                      </span>
                      <span>{hs.name}</span>
                    </div>
                    <span className="font-mono text-slate-400 text-[11px]">{hs.dimensions}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
