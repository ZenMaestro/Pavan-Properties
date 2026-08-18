'use client';

import React from 'react';
import { X, FileCheck, Check } from 'lucide-react';
import { VerifiedDoc } from '@/types';

interface DocumentViewerModalProps {
  doc: VerifiedDoc | null;
  onClose: () => void;
  projectName: string;
  lpNumber: string;
}

export const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  doc,
  onClose,
  projectName,
  lpNumber
}) => {
  if (!doc) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#ffffff] rounded-2xl border border-[#eae3e0] overflow-hidden shadow-2xl">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#eae3e0] bg-[#f9f6ee]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#142334] text-[#f9f6ee] flex items-center justify-center">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#142334]">{doc.title}</h3>
              <p className="text-xs text-[#5c4438]">
                {projectName} • <span className="font-mono text-[#142334]">{lpNumber}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-[#142334] rounded-lg hover:bg-[#eae3e0]/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto text-xs">
          
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-[#f9f6ee] border border-[#eae3e0]">
              <span className="text-[#715343] block mb-0.5">Document Number</span>
              <span className="font-mono font-bold text-[#142334] text-sm">{doc.documentNumber}</span>
            </div>
            <div className="p-3 rounded-lg bg-[#f9f6ee] border border-[#eae3e0]">
              <span className="text-[#715343] block mb-0.5">Issuing Authority</span>
              <span className="font-semibold text-[#142334] text-sm">{doc.issuedBy}</span>
            </div>
          </div>

          {/* Document Preview Image */}
          <div className="relative rounded-xl overflow-hidden border border-[#eae3e0] bg-[#f4f0ea] aspect-[16/10]">
            <img
              src={doc.previewUrl}
              alt={doc.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-4 rounded-xl bg-[#f9f6ee] border border-[#eae3e0] space-y-1">
            <span className="font-semibold text-[#142334] block">Regulatory Summary:</span>
            <p className="text-[#5c4438] leading-relaxed">
              {doc.summary}
            </p>
          </div>

          <p className="text-[11px] text-[#715343] italic">
            Physical certified copies and link documents are available for inspection during office appointments.
          </p>

        </div>

        {/* Footer */}
        <div className="flex items-center justify-end px-6 py-4 border-t border-[#eae3e0] bg-[#f9f6ee]">
          <button
            onClick={onClose}
            className="btn-primary text-xs py-2 px-5"
          >
            Close Viewer
          </button>
        </div>

      </div>
    </div>
  );
};
