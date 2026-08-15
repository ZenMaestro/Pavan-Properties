'use client';

import React from 'react';
import { X, ShieldCheck, Download, ExternalLink, FileCheck } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl glass-panel rounded-2xl border border-emerald-500/30 overflow-hidden shadow-2xl shadow-emerald-950/50">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900/90 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <FileCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-lg text-white">{doc.title}</h3>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] uppercase font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                  Verified Copy
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {projectName} • <span className="text-amber-400 font-semibold">{lpNumber}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Metadata Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Document No.</span>
              <span className="font-semibold text-amber-300">{doc.documentNumber}</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-slate-400 block mb-0.5">Issuing Authority</span>
              <span className="font-semibold text-white">{doc.issuedBy}</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 col-span-2 sm:col-span-1">
              <span className="text-slate-400 block mb-0.5">Legal Status</span>
              <span className="font-semibold text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Sanctioned
              </span>
            </div>
          </div>

          {/* Document Preview Image */}
          <div className="relative rounded-xl overflow-hidden border border-slate-700/80 bg-slate-900 aspect-[16/10]">
            <img
              src={doc.previewUrl}
              alt={doc.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent flex items-end p-4">
              <p className="text-xs text-slate-300 leading-relaxed max-w-xl bg-slate-950/80 p-3 rounded-lg border border-slate-800">
                <strong className="text-emerald-400 font-semibold block mb-1">Legal Verification Note:</strong>
                {doc.summary}
              </p>
            </div>
          </div>

          {/* Proof guarantee note */}
          <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-200 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white">Full Physical & Certified Verification Available</p>
              <p className="mt-0.5 text-emerald-300/80">
                Original physical sanction order copies, encumbrance certificates (EC for 30 years), and link documents are open for inspection at our Vijayawada office or during site visit booking.
              </p>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900/90 border-t border-slate-800">
          <button
            onClick={() => {
              alert(`Full resolution copy request logged for ${doc.documentNumber}. Our team will WhatsApp the official PDF.`);
            }}
            className="flex items-center gap-2 text-xs text-slate-300 hover:text-white px-3 py-2 rounded-lg bg-slate-800 border border-slate-700"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Request Official PDF</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors"
          >
            Close Viewer
          </button>
        </div>

      </div>
    </div>
  );
};
