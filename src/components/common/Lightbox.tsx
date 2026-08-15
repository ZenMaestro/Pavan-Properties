'use client';

import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  images: string[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  images,
  currentIndex,
  onClose,
  onNavigate
}) => {
  if (currentIndex === null || !images[currentIndex]) return null;

  const currentImage = images[currentIndex];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIdx = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    onNavigate(newIdx);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIdx = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    onNavigate(newIdx);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-lg animate-in fade-in duration-200"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-3 rounded-full bg-slate-900/80 text-slate-300 hover:text-white border border-slate-700"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev Button */}
      {images.length > 1 && (
        <button
          onClick={handlePrev}
          className="absolute left-4 z-50 p-3 rounded-full bg-slate-900/80 text-slate-300 hover:text-white border border-slate-700 hover:bg-slate-800"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {/* Main Image Container */}
      <div
        onClick={e => e.stopPropagation()}
        className="relative max-w-5xl max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl border border-slate-800"
      >
        <img
          src={currentImage}
          alt={`Photo ${currentIndex + 1}`}
          className="w-full h-full object-contain max-h-[80vh]"
        />
        <div className="absolute bottom-4 left-4 right-4 text-center bg-slate-950/80 backdrop-blur-md py-2 px-4 rounded-xl border border-slate-800 text-xs text-slate-300">
          Photo {currentIndex + 1} of {images.length} • Pavan Properties Verified Site Gallery
        </div>
      </div>

      {/* Next Button */}
      {images.length > 1 && (
        <button
          onClick={handleNext}
          className="absolute right-4 z-50 p-3 rounded-full bg-slate-900/80 text-slate-300 hover:text-white border border-slate-700 hover:bg-slate-800"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};
