'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, Maximize2, X, ChevronLeft, ChevronRight, Sparkles, Compass } from 'lucide-react';
import { LUXURY_ESTATE } from '@/data/luxuryEstate';

export const CinematicGallery: React.FC = () => {
  const images = LUXURY_ESTATE.gallery;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [isFullScreen, setIsFullScreen] = useState(false);

  const filteredImages = selectedCategory === 'ALL'
    ? images
    : images.filter(img => img.category === selectedCategory);

  // Auto-play cinema mode timer
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % filteredImages.length);
      }, 4500);
    }
    return () => clearInterval(interval);
  }, [isPlaying, filteredImages.length]);

  const currentImage = filteredImages[currentIndex] || filteredImages[0] || images[0];

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % filteredImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? filteredImages.length - 1 : prev - 1));
  };

  return (
    <section className="relative w-full bg-obsidian-950 py-12" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-gold-metallic">
              <Sparkles className="w-3.5 h-3.5 text-gold-metallic animate-pulse" />
              <span>Cinematic Visual Showcase</span>
            </div>
            <h2 className="font-serif-luxury font-medium text-3xl sm:text-4xl text-white mt-1">
              Immersive Architectural Gallery
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm font-light mt-1">
              Capture every angle of the 11,500 sq.ft private riverfront estate.
            </p>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all border ${
                isPlaying
                  ? 'bg-gold-metallic/20 text-gold-metallic border-gold-metallic/50 shadow-lg shadow-gold-metallic/10'
                  : 'bg-navy-800/60 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause Cinema' : 'Play Cinema Mode'}</span>
            </button>

            <button
              onClick={() => setIsFullScreen(true)}
              className="p-2 rounded-xl bg-navy-800/60 text-slate-300 hover:text-white border border-slate-700 hover:border-gold-metallic/40 transition-all"
              title="Full-Screen Immersive View"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
          {['ALL', 'TWILIGHT', 'INTERIOR', 'POOLSIDE', 'ARCHITECTURE', 'CINEMA'].map(cat => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentIndex(0);
              }}
              className={`px-4 py-1.5 rounded-full font-medium tracking-wider text-[11px] uppercase transition-all whitespace-nowrap border ${
                selectedCategory === cat
                  ? 'bg-gold-metallic text-obsidian-950 font-bold border-gold-metallic shadow-md shadow-gold-metallic/20'
                  : 'bg-navy-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {cat === 'ALL' ? `All Views (${images.length})` : cat}
            </button>
          ))}
        </div>

        {/* Main Stage Image */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden glass-panel-luxury border border-gold-metallic/30 shadow-2xl group">
          <img
            src={currentImage.url}
            alt={currentImage.title}
            className={`w-full h-full object-cover transition-all duration-1000 transform ${
              isPlaying ? 'scale-105 transition-transform duration-[6000ms] ease-out' : 'scale-100'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-obsidian-950/30" />

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-obsidian-950/80 text-white border border-slate-700 hover:border-gold-metallic/60 hover:bg-gold-metallic/20 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all transform hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-obsidian-950/80 text-white border border-slate-700 hover:border-gold-metallic/60 hover:bg-gold-metallic/20 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all transform hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Bottom Title Bar */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 bg-obsidian-950/85 backdrop-blur-xl p-4 sm:p-5 rounded-2xl border border-slate-800/80">
            <div>
              <span className="text-[10px] font-mono font-bold text-gold-metallic uppercase tracking-[0.2em] block mb-1">
                {currentImage.category} PERSPECTIVE • {currentIndex + 1} OF {filteredImages.length}
              </span>
              <h3 className="font-serif-luxury text-base sm:text-xl text-white font-medium">
                {currentImage.title}
              </h3>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs text-slate-400 font-light">
                High-Resolution 4K Capture
              </span>
              <button
                onClick={() => setIsFullScreen(true)}
                className="text-xs text-gold-metallic hover:underline font-semibold flex items-center gap-1"
              >
                <span>Enlarge</span>
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Thumbnail Filmstrip */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 pt-2">
          {filteredImages.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => {
                setCurrentIndex(idx);
                setIsPlaying(false);
              }}
              className={`relative aspect-[16/10] rounded-xl overflow-hidden border transition-all ${
                currentIndex === idx
                  ? 'border-gold-metallic ring-2 ring-gold-metallic/40 scale-105'
                  : 'border-slate-800 opacity-60 hover:opacity-100 hover:border-slate-600'
              }`}
            >
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

      </div>

      {/* Full-Screen Immersive Lightbox Modal */}
      {isFullScreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-obsidian-950/95 backdrop-blur-2xl animate-in fade-in duration-300">
          <button
            onClick={() => setIsFullScreen(false)}
            className="absolute top-6 right-6 z-50 p-3 rounded-full bg-slate-900/90 text-white border border-slate-700 hover:border-gold-metallic hover:bg-gold-metallic/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-slate-900/90 text-white border border-slate-700 hover:border-gold-metallic"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-50 p-4 rounded-full bg-slate-900/90 text-white border border-slate-700 hover:border-gold-metallic"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          <div className="relative max-w-6xl max-h-[85vh] w-full rounded-2xl overflow-hidden border border-gold-metallic/30 shadow-2xl">
            <img
              src={currentImage.url}
              alt={currentImage.title}
              className="w-full h-full object-contain max-h-[80vh] mx-auto"
            />
            <div className="absolute bottom-4 left-4 right-4 text-center bg-obsidian-950/90 py-3 px-6 rounded-xl border border-slate-800 text-sm text-slate-200">
              <span className="text-gold-metallic font-semibold mr-2">{currentImage.category}</span>
              {currentImage.title} ({currentIndex + 1} of {filteredImages.length})
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
