'use client';

import React, { useState } from 'react';
import { PROJECTS } from '@/data/projects';
import { Eye, MapPin } from 'lucide-react';
import { Lightbox } from '@/components/common/Lightbox';
import Link from 'next/link';

export default function PhotosPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const allPhotos = PROJECTS.flatMap(p => 
    p.images.map((img) => ({
      url: img,
      projectName: p.name,
      projectSlug: p.slug,
      lpNumber: p.lpNumber,
      city: p.city
    }))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <div className="max-w-2xl space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#715343] block">
          Visual Documentation
        </span>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#142334]">
          Property Photographs & Site Progress
        </h1>
        <p className="text-sm text-[#344f6d] leading-relaxed">
          Explore on-ground road development, layout demarcations, and entrance gates across active Amaravati townships.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {allPhotos.map((photo, idx) => (
          <div
            key={idx}
            onClick={() => setLightboxIndex(idx)}
            className="editorial-card overflow-hidden group cursor-pointer"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-[#f4f0ea]">
              <img
                src={photo.url}
                alt={photo.projectName}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute top-2.5 left-2.5 bg-white/95 text-[#142334] font-mono text-[10px] font-semibold px-2 py-0.5 rounded border border-[#eae3e0]">
                {photo.lpNumber}
              </div>
            </div>

            <div className="p-3.5 space-y-1 text-xs">
              <h3 className="font-serif font-bold text-sm text-[#142334] truncate">
                {photo.projectName}
              </h3>
              <div className="flex items-center justify-between text-[#715343] text-[11px]">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#a67d64]" />
                  {photo.city}
                </span>
                <Link
                  href={`/property/${photo.projectSlug}`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-[#142334] font-semibold hover:underline"
                >
                  View Details →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Lightbox
        images={allPhotos.map(p => p.url)}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />

    </div>
  );
}
