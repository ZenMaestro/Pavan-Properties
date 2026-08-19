'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { PROJECTS, BROKER_INFO } from '@/data/projects';
import { Project, VerifiedDoc } from '@/types';
import { MapPin, ArrowLeft, Check, FileCheck, Phone, Eye, Calendar, Landmark, Shield } from 'lucide-react';
import { DocumentViewerModal } from '@/components/common/DocumentViewerModal';
import { Lightbox } from '@/components/common/Lightbox';
import { BookSlotForm } from '@/components/common/BookSlotForm';

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const initialProject = PROJECTS.find(p => p.slug === slug);
  const [project, setProject] = useState<Project | null>(initialProject || null);
  const [loading, setLoading] = useState(!initialProject);

  const [activeDoc, setActiveDoc] = useState<VerifiedDoc | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    async function fetchProject() {
      if (!slug) return;
      try {
        const res = await fetch(`/api/properties/${slug}`);
        const data = await res.json();
        if (data.success && data.data) {
          setProject(data.data);
        }
      } catch (err) {
        console.warn('Failed to fetch project from API, using fallback if available.', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProject();
  }, [slug]);

  if (loading && !project) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-4">
        <h1 className="text-xl font-bold font-serif text-[#142334]">Loading Property Details...</h1>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-4">
        <h1 className="text-2xl font-bold font-serif text-[#142334]">Property Not Found</h1>
        <p className="text-[#5c4438] text-sm">The listing you are looking for is currently unavailable or updated.</p>
        <Link href="/" className="btn-primary text-xs py-2 px-4 inline-flex">
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Listings</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-16">
      
      {/* Breadcrumb Navigation */}
      <div className="bg-[#ffffff] border-b border-[#eae3e0] py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs">
          <Link
            href="/"
            className="flex items-center gap-2 font-medium text-[#142334] hover:text-[#a67d64] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Properties</span>
          </Link>

          <div className="flex items-center gap-2 text-[#715343]">
            <span>{project.city}</span>
            <span>•</span>
            <span className="font-mono text-[#142334] font-semibold">{project.lpNumber}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Title & Pricing */}
        <div className="editorial-panel p-6 sm:p-8 bg-[#ffffff] space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[#f4f0ea] text-[#142334] font-mono text-xs font-semibold px-2.5 py-1 rounded border border-[#eae3e0]">
                  {project.lpNumber}
                </span>
                <span className="bg-[#f4f0ea] text-[#142334] text-xs font-semibold px-2.5 py-1 rounded border border-[#eae3e0]">
                  {project.reraId}
                </span>
              </div>

              <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#142334]">
                {project.name}
              </h1>

              <div className="flex items-center gap-1.5 text-xs text-[#5c4438]">
                <MapPin className="w-3.5 h-3.5 text-[#a67d64] shrink-0" />
                <span>{project.location}</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="p-5 rounded-xl bg-[#f9f6ee] border border-[#eae3e0] lg:text-right shrink-0">
              <span className="text-xs text-[#715343] uppercase font-semibold block">Starting Price</span>
              <span className="font-sans font-bold text-2xl sm:text-3xl text-[#142334]">{project.priceFrom}</span>
              {project.pricePerSqYd && (
                <span className="text-xs text-[#5c4438] block mt-0.5">{project.pricePerSqYd}</span>
              )}
            </div>

          </div>

          {/* Quick Specifications Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#eae3e0] text-xs text-[#142334]">
            <div>
              <span className="text-[11px] text-[#715343] block">Layout Size</span>
              <span className="font-semibold">{project.totalArea}</span>
            </div>
            <div>
              <span className="text-[11px] text-[#715343] block">Plot Configurations</span>
              <span className="font-semibold">{project.plotSizes}</span>
            </div>
            <div>
              <span className="text-[11px] text-[#715343] block">Title Status</span>
              <span className="font-semibold">Freehold & Registered</span>
            </div>
            <div>
              <span className="text-[11px] text-[#715343] block">Financing Options</span>
              <span className="font-semibold">SBI, HDFC Bank Pre-Approved</span>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-serif font-bold text-xl text-[#142334]">Site Photographs & Layout Plan</h2>
            <span className="text-xs text-[#715343]">Click to enlarge</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div
              onClick={() => setLightboxIndex(0)}
              className="sm:col-span-2 sm:row-span-2 relative aspect-[16/10] sm:aspect-auto rounded-xl overflow-hidden cursor-pointer group border border-[#eae3e0]"
            >
              <img
                src={project.images[0]}
                alt={`${project.name} primary photograph`}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors flex items-center justify-center">
                <span className="p-2.5 rounded-lg bg-white/90 text-[#142334] border border-[#eae3e0] opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-4 h-4 text-[#142334]" />
                </span>
              </div>
            </div>

            {project.images.slice(1, 4).map((img, idx) => (
              <div
                key={idx}
                onClick={() => setLightboxIndex(idx + 1)}
                className="relative aspect-[16/10] rounded-xl overflow-hidden cursor-pointer group border border-[#eae3e0]"
              >
                <img
                  src={img}
                  alt={`${project.name} photo ${idx + 2}`}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Verified Sanction Documents */}
        <div className="editorial-panel p-6 sm:p-8 bg-[#ffffff] space-y-6">
          <div className="space-y-1">
            <h2 className="font-serif font-bold text-xl text-[#142334]">
              Government Sanctions & Regulatory Certificates
            </h2>
            <p className="text-xs text-[#5c4438]">
              Official copies available for prospective buyer audit and title verification.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {project.verifiedDocs.map(doc => (
              <div
                key={doc.id}
                onClick={() => setActiveDoc(doc)}
                className="p-5 rounded-xl bg-[#f9f6ee] border border-[#eae3e0] hover:border-[#c9ad98] cursor-pointer space-y-2.5 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-[#142334] bg-white px-2 py-0.5 rounded border border-[#eae3e0]">
                    {doc.type}
                  </span>
                  <span className="text-[11px] text-[#a67d64] font-medium underline">Inspect Copy</span>
                </div>

                <h4 className="font-serif font-bold text-sm text-[#142334] group-hover:text-[#a67d64] transition-colors">
                  {doc.title}
                </h4>

                <p className="text-[11px] text-[#5c4438]">
                  Doc No: <strong className="text-[#142334]">{doc.documentNumber}</strong>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Specifications & Lead Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-7 space-y-6">
            
            {/* Overview */}
            <div className="editorial-panel p-6 sm:p-8 bg-[#ffffff] space-y-3">
              <h2 className="font-serif font-bold text-xl text-[#142334]">Project Overview</h2>
              <p className="text-[#344f6d] text-sm leading-relaxed">
                {project.overview}
              </p>
            </div>

            {/* Specifications */}
            <div className="editorial-panel p-6 sm:p-8 bg-[#ffffff] space-y-4">
              <h2 className="font-serif font-bold text-xl text-[#142334]">Development Specifications</h2>
              <div className="space-y-4">
                {project.specifications.map((spec, i) => (
                  <div key={i} className="space-y-1.5">
                    <h4 className="text-xs font-semibold text-[#142334] uppercase tracking-wider">
                      {spec.category}
                    </h4>
                    <ul className="space-y-1 text-xs text-[#5c4438]">
                      {spec.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-[#a67d64] shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Bank Tie-ups */}
            <div className="editorial-panel p-6 bg-[#f9f6ee] space-y-2 text-xs">
              <h4 className="font-serif font-bold text-sm text-[#142334]">Pre-Approved Bank Facilities</h4>
              <p className="text-[#5c4438]">
                Eligible buyers may avail up to 80% housing loan sanction through:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {project.bankTieUps.map((b, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded bg-[#ffffff] border border-[#eae3e0] text-[#142334] font-medium">
                    {b}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Col: Embedded Booking Form */}
          <div className="lg:col-span-5 sticky top-24" id="book-slot">
            <BookSlotForm
              defaultProjectSlug={project.slug}
              title={`Schedule Visit for ${project.name}`}
              subtitle={`Layout Reference: ${project.lpNumber}`}
            />
          </div>

        </div>

      </div>

      <Lightbox
        images={project.images}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />

      <DocumentViewerModal
        doc={activeDoc}
        onClose={() => setActiveDoc(null)}
        projectName={project.name}
        lpNumber={project.lpNumber}
      />

    </div>
  );
}
