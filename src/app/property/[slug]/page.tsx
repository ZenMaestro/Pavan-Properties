'use client';

import React, { useState } from 'react';
import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { PROJECTS, BROKER_INFO } from '@/data/projects';
import { ShieldCheck, MapPin, ArrowLeft, CheckCircle2, FileCheck, Landmark, Phone, Sparkles, Eye, Download } from 'lucide-react';
import { ApprovalBadge } from '@/components/common/ApprovalBadge';
import { DocumentViewerModal } from '@/components/common/DocumentViewerModal';
import { Lightbox } from '@/components/common/Lightbox';
import { BookSlotForm } from '@/components/common/BookSlotForm';
import { VerifiedDoc } from '@/types';

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const project = PROJECTS.find(p => p.slug === slug);

  const [activeDoc, setActiveDoc] = useState<VerifiedDoc | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!project) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center space-y-4">
        <h1 className="text-3xl font-bold font-display text-white">Project Not Found</h1>
        <p className="text-slate-400 text-sm">The project you are looking for does not exist or has been updated.</p>
        <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold text-xs">
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Home</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-16">
      
      {/* Top Breadcrumb & Actions Bar */}
      <div className="bg-slate-900/80 border-b border-slate-800 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-emerald-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Projects</span>
          </Link>

          <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">CRDA & AP RERA Verified Listing</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* SECTION 1: HEADER & LP NUMBER */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="space-y-3">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-amber-950/80 text-amber-300 font-mono text-xs font-bold px-3 py-1 rounded-lg border border-amber-500/50">
                  {project.lpNumber}
                </span>
                <span className="bg-emerald-950/80 text-emerald-300 text-xs font-semibold px-3 py-1 rounded-lg border border-emerald-500/50 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{project.reraId}</span>
                </span>
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white">
                {project.name}
              </h1>

              <div className="flex items-center gap-2 text-sm text-slate-300">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{project.location} ({project.city})</span>
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-slate-900/90 p-5 rounded-2xl border border-emerald-500/30 lg:text-right shrink-0">
              <span className="text-xs text-slate-400 uppercase font-semibold block">Price Starting From</span>
              <span className="font-display font-extrabold text-3xl text-emerald-400">{project.priceFrom}</span>
              {project.pricePerSqYd && (
                <span className="text-xs text-slate-300 block mt-0.5">{project.pricePerSqYd}</span>
              )}
            </div>

          </div>

          {/* Quick Specs Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800 text-xs">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Total Layout Area</span>
              <span className="font-bold text-white text-sm">{project.totalArea}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Available Plot Sizes</span>
              <span className="font-bold text-white text-sm">{project.plotSizes}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Title Status</span>
              <span className="font-bold text-emerald-400 text-sm flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% Clear
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Bank Loans</span>
              <span className="font-bold text-amber-300 text-sm">Up to 80% Pre-Approved</span>
            </div>
          </div>
        </div>

        {/* SECTION 2: PHOTO GALLERY GRID */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold text-xl text-white">Site Photos & Master Layout Plan</h2>
            <span className="text-xs text-slate-400">Click any image to enlarge</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div
              onClick={() => setLightboxIndex(0)}
              className="sm:col-span-2 sm:row-span-2 relative aspect-[16/10] sm:aspect-auto rounded-2xl overflow-hidden cursor-pointer group border border-slate-800 hover:border-emerald-500/40"
            >
              <img
                src={project.images[0]}
                alt={`${project.name} main photo`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors flex items-center justify-center">
                <span className="p-3 rounded-full bg-slate-950/80 text-white border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-6 h-6 text-emerald-400" />
                </span>
              </div>
            </div>

            {project.images.slice(1, 4).map((img, idx) => (
              <div
                key={idx}
                onClick={() => setLightboxIndex(idx + 1)}
                className="relative aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer group border border-slate-800 hover:border-emerald-500/40"
              >
                <img
                  src={img}
                  alt={`${project.name} photo ${idx + 2}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors flex items-center justify-center">
                  <span className="p-2 rounded-full bg-slate-950/80 text-white border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-4 h-4 text-emerald-400" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: VERIFIED APPROVAL DOCUMENTS (PROOF DIFFERENTIATOR) */}
        <div className="glass-panel-gold rounded-3xl p-6 sm:p-8 border border-amber-500/30 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="bg-emerald-500/20 text-emerald-300 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-500/30">
                Verified Paperwork Proof
              </span>
              <h2 className="font-display font-extrabold text-2xl text-white mt-2">
                Official Government Approval Documents
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                Click any document card to open the legal verification viewer.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {project.verifiedDocs.map(doc => (
              <div
                key={doc.id}
                onClick={() => setActiveDoc(doc)}
                className="glass-card p-5 rounded-2xl border border-slate-800 hover:border-amber-500/50 cursor-pointer space-y-3 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                    {doc.type}
                  </span>
                </div>

                <div>
                  <h4 className="font-display font-bold text-sm text-white group-hover:text-amber-300 transition-colors">
                    {doc.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Doc No: <strong className="text-slate-200">{doc.documentNumber}</strong>
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-amber-400 font-medium">
                  <span>Inspect Document</span>
                  <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 4: HIGHLIGHTS & SPECIFICATIONS + EMBEDDED LEAD FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-7 space-y-8">
            
            {/* Overview */}
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
              <h2 className="font-display font-bold text-xl text-white">Project Overview</h2>
              <p className="text-slate-300 text-sm leading-relaxed font-light">
                {project.overview}
              </p>
            </div>

            {/* Verified Highlights */}
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
              <h2 className="font-display font-bold text-xl text-white">Key Features & Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {project.highlights.map((hl, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2.5 text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Infrastructure Specifications */}
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-6">
              <h2 className="font-display font-bold text-xl text-white">Infrastructure Specifications</h2>
              <div className="space-y-4">
                {project.specifications.map((spec, i) => (
                  <div key={i} className="space-y-2">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      {spec.category}
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {spec.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center gap-2 pl-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Pre-Approved Bank Tie-ups */}
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <Landmark className="w-5 h-5 text-blue-400" />
                <h2 className="font-display font-bold text-xl text-white">Pre-Approved Housing Loans</h2>
              </div>
              <p className="text-xs text-slate-400">
                Loan sanction facilities pre-cleared for up to 80% valuation for eligible buyers.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {project.bankTieUps.map((bank, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-lg bg-blue-950/60 border border-blue-500/40 text-blue-300 text-xs font-semibold">
                    {bank}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Right Col: Embedded Book Slot Lead Form */}
          <div className="lg:col-span-5 sticky top-24" id="book-slot">
            <BookSlotForm
              defaultProjectSlug={project.slug}
              title={`Book Slot for ${project.name}`}
              subtitle={`LP Number: ${project.lpNumber} • Free AC Pickup Provided`}
            />
          </div>

        </div>

      </div>

      {/* Lightbox & Document Modals */}
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
