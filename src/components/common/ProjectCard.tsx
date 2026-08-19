'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight, FileCheck, Check, Calendar } from 'lucide-react';
import { Project, VerifiedDoc } from '@/types';
import { ApprovalBadge } from './ApprovalBadge';
import { DocumentViewerModal } from './DocumentViewerModal';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [activeDoc, setActiveDoc] = useState<VerifiedDoc | null>(null);

  if (!project) return null;

  const images = Array.isArray(project.images) && project.images.length > 0
    ? project.images
    : ['/projects/anvi-homes-1.jpg'];
  const highlights = Array.isArray(project.highlights) ? project.highlights : [];
  const verifiedDocs = Array.isArray(project.verifiedDocs) ? project.verifiedDocs : [];

  return (
    <div className="editorial-card overflow-hidden flex flex-col justify-between group">
      <div>
        
        {/* Project Photography */}
        <div className="relative aspect-[16/10] overflow-hidden bg-[#f4f0ea]">
          <img
            src={images[0]}
            alt={project.name || 'Property'}
            className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
          />
          
          {/* Subtle LP Number Tag */}
          <div className="absolute top-3 left-3 bg-[#ffffff]/95 backdrop-blur-sm text-[#142334] font-mono text-[11px] font-semibold px-2.5 py-1 rounded border border-[#eae3e0] shadow-sm">
            {project.lpNumber || 'LP APPROVED'}
          </div>

          {/* RERA Tag */}
          <div className="absolute top-3 right-3 bg-[#ffffff]/95 backdrop-blur-sm text-[#142334] text-[11px] font-medium px-2.5 py-1 rounded border border-[#eae3e0] shadow-sm">
            {project.reraId || 'AP RERA APPROVED'}
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6 space-y-4">
          
          {/* Title & Location */}
          <div className="space-y-1">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-serif font-bold text-xl text-[#142334] group-hover:text-[#a67d64] transition-colors">
                {project.name}
              </h3>
            </div>
            
            <div className="flex items-center gap-1.5 text-xs text-[#5c4438]">
              <MapPin className="w-3.5 h-3.5 text-[#a67d64] shrink-0" />
              <span>{project.location}</span>
            </div>
          </div>

          {/* Pricing Row */}
          <div className="p-3.5 rounded-lg bg-[#f9f6ee] border border-[#eae3e0] flex items-center justify-between text-xs">
            <div>
              <span className="text-[11px] text-[#715343] block">Starting Price</span>
              <span className="font-sans font-bold text-base text-[#142334]">{project.priceFrom}</span>
            </div>
            {project.pricePerSqYd && (
              <div className="text-right">
                <span className="text-[11px] text-[#715343] block">Rate</span>
                <span className="font-medium text-[#142334]">{project.pricePerSqYd}</span>
              </div>
            )}
          </div>

          {/* Key Property Specs */}
          <div className="grid grid-cols-2 gap-2 text-xs text-[#142334] pt-1">
            <div className="text-slate-600">
              <span className="text-[11px] text-[#715343] block">Total Area</span>
              <span className="font-medium">{project.totalArea || 'Master Layout'}</span>
            </div>
            <div className="text-slate-600">
              <span className="text-[11px] text-[#715343] block">Plot Sizes</span>
              <span className="font-medium">{project.plotSizes || 'Custom Plots'}</span>
            </div>
          </div>

          {/* Highlights List */}
          {highlights.length > 0 && (
            <div className="space-y-1.5 pt-2 border-t border-[#eae3e0]">
              <ul className="space-y-1 text-xs text-[#344f6d]">
                {highlights.slice(0, 3).map((hl, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#a67d64] shrink-0 mt-0.5" />
                    <span className="leading-snug">{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Official Verification Document Inspection */}
          {verifiedDocs.length > 0 && (
            <div className="pt-2">
              <button
                onClick={() => setActiveDoc(verifiedDocs[0])}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-[#ffffff] hover:bg-[#f4f0ea] border border-[#eae3e0] text-xs text-[#142334] font-medium transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FileCheck className="w-3.5 h-3.5 text-[#a67d64]" />
                  <span>Inspect CRDA Layout Sanction Copy</span>
                </div>
                <span className="text-[11px] text-[#a67d64] font-semibold underline">View</span>
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Card Actions */}
      <div className="p-6 pt-0 grid grid-cols-2 gap-3">
        <Link
          href={`/property/${project.slug || project.id}`}
          className="btn-secondary text-xs py-2.5"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <a
          href="#book-visit"
          className="btn-primary text-xs py-2.5"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book Visit</span>
        </a>
      </div>

      {/* Verification Modal */}
      {verifiedDocs.length > 0 && (
        <DocumentViewerModal
          doc={activeDoc}
          onClose={() => setActiveDoc(null)}
          projectName={project.name || 'Property'}
          lpNumber={project.lpNumber || ''}
        />
      )}
    </div>
  );
};
