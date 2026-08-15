'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight, ShieldCheck, FileCheck, Landmark, CheckCircle2 } from 'lucide-react';
import { Project, VerifiedDoc } from '@/types';
import { ApprovalBadge } from './ApprovalBadge';
import { DocumentViewerModal } from './DocumentViewerModal';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [activeDoc, setActiveDoc] = useState<VerifiedDoc | null>(null);

  return (
    <div className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between group border border-slate-800 hover:border-emerald-500/40 transition-all duration-300">
      <div>
        
        {/* Project Thumbnail with LP Number Overlay */}
        <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
          <img
            src={project.images[0]}
            alt={project.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

          {/* Top LP Number Badge */}
          <div className="absolute top-3 left-3 bg-amber-950/90 text-amber-300 font-mono text-xs font-bold px-3 py-1 rounded-lg border border-amber-500/50 backdrop-blur-md shadow-lg">
            {project.lpNumber}
          </div>

          {/* Top RERA Badge */}
          <div className="absolute top-3 right-3 bg-emerald-950/90 text-emerald-300 text-xs font-semibold px-2.5 py-1 rounded-lg border border-emerald-500/50 backdrop-blur-md flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{project.reraId.replace('AP RERA ', '')}</span>
          </div>

          {/* Location & Price Overlay */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <div className="text-xs text-slate-300 flex items-center gap-1 bg-slate-950/80 px-2.5 py-1 rounded-md backdrop-blur-md border border-slate-800">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>{project.city}</span>
            </div>
            <div className="text-right bg-slate-950/90 px-3 py-1 rounded-lg border border-emerald-500/30 backdrop-blur-md">
              <span className="text-[10px] text-slate-400 block uppercase">Starting From</span>
              <span className="font-display font-extrabold text-lg text-emerald-400">{project.priceFrom}</span>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 space-y-4">
          
          <div>
            <h3 className="font-display font-bold text-xl text-white group-hover:text-emerald-400 transition-colors">
              {project.name}
            </h3>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Key Highlights */}
          <div className="space-y-1.5 pt-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Verified Highlights:
            </span>
            <ul className="grid grid-cols-1 gap-1 text-xs text-slate-300">
              {project.highlights.slice(0, 3).map((hl, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{hl}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Approval Badges */}
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-800/80">
            {project.approvals.map((app, idx) => (
              <ApprovalBadge key={idx} label={app} size="sm" />
            ))}
          </div>

          {/* Paperwork Document Viewer Quick Trigger */}
          {project.verifiedDocs.length > 0 && (
            <div className="pt-2">
              <button
                onClick={() => setActiveDoc(project.verifiedDocs[0])}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-amber-950/30 hover:bg-amber-950/50 border border-amber-500/30 text-amber-300 text-xs font-medium transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-amber-400" />
                  <span>Inspect Official CRDA Permit</span>
                </div>
                <span className="text-[10px] text-amber-400 underline font-semibold">View Copy</span>
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-6 pt-0 grid grid-cols-2 gap-3">
        <Link
          href={`/property/${project.slug}`}
          className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
        >
          <span>Full Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <Link
          href={`/property/${project.slug}#book-slot`}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-xs font-bold shadow-md shadow-emerald-950 transition-all"
        >
          <span>Book Slot</span>
        </Link>
      </div>

      {/* Modal for Paperwork Verification */}
      <DocumentViewerModal
        doc={activeDoc}
        onClose={() => setActiveDoc(null)}
        projectName={project.name}
        lpNumber={project.lpNumber}
      />
    </div>
  );
};
