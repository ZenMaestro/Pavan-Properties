'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PROJECTS } from '@/data/projects';
import { Camera, Eye, Sparkles, Filter, ShieldCheck, MapPin } from 'lucide-react';
import { Lightbox } from '@/components/common/Lightbox';

export default function PhotosPage() {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Flatten all images across projects with metadata
  const allPhotos = PROJECTS.flatMap(p => 
    p.images.map((img, i) => ({
      url: img,
      projectName: p.name,
      projectSlug: p.slug,
      lpNumber: p.lpNumber,
      city: p.city,
      category: i === 0 ? 'MAIN' : i === 1 ? 'LAYOUT' : 'SITE_VISIT'
    }))
  );

  const filteredPhotos = activeFilter === 'ALL'
    ? allPhotos
    : allPhotos.filter(p => p.category === activeFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
          <Camera className="w-4 h-4 text-emerald-400" />
          <span>Real Site Visit Gallery & Master Layouts</span>
        </div>

        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white">
          Verified Project Gallery
        </h1>

        <p className="text-slate-400 text-sm leading-relaxed">
          Explore actual site photographs, development progress, and CRDA approved layout maps across our active developments.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center gap-2 flex-wrap text-xs">
        <button
          onClick={() => setActiveFilter('ALL')}
          className={`px-4 py-2 rounded-xl font-semibold border transition-all ${
            activeFilter === 'ALL'
              ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-950'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
          }`}
        >
          All Photos ({allPhotos.length})
        </button>

        <button
          onClick={() => setActiveFilter('MAIN')}
          className={`px-4 py-2 rounded-xl font-semibold border transition-all ${
            activeFilter === 'MAIN'
              ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-950'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
          }`}
        >
          Township Entrances
        </button>

        <button
          onClick={() => setActiveFilter('LAYOUT')}
          className={`px-4 py-2 rounded-xl font-semibold border transition-all ${
            activeFilter === 'LAYOUT'
              ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-950'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
          }`}
        >
          Roads & Infrastructure
        </button>

        <button
          onClick={() => setActiveFilter('SITE_VISIT')}
          className={`px-4 py-2 rounded-xl font-semibold border transition-all ${
            activeFilter === 'SITE_VISIT'
              ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-950'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
          }`}
        >
          Recent Site Visits
        </button>
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPhotos.map((photo, idx) => (
          <div
            key={idx}
            onClick={() => setLightboxIndex(idx)}
            className="glass-card rounded-2xl overflow-hidden group cursor-pointer border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
              <img
                src={photo.url}
                alt={photo.projectName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

              <div className="absolute top-3 left-3 bg-amber-950/90 text-amber-300 font-mono text-[10px] font-bold px-2.5 py-1 rounded border border-amber-500/40">
                {photo.lpNumber}
              </div>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/40 backdrop-blur-xs">
                <span className="p-3 rounded-full bg-slate-950/80 text-white border border-slate-700">
                  <Eye className="w-5 h-5 text-emerald-400" />
                </span>
              </div>
            </div>

            <div className="p-4 space-y-2">
              <h3 className="font-display font-bold text-sm text-white group-hover:text-emerald-400 transition-colors">
                {photo.projectName}
              </h3>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  {photo.city}
                </span>
                <Link
                  href={`/property/${photo.projectSlug}#book-slot`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-emerald-400 font-semibold text-[11px] hover:underline"
                >
                  Book Visit →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        images={filteredPhotos.map(p => p.url)}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />

    </div>
  );
}
