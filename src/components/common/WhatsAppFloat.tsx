'use client';

import React from 'react';
import { MessageSquare, Phone } from 'lucide-react';
import { BROKER_INFO } from '@/data/projects';

export const WhatsAppFloat: React.FC = () => {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      
      {/* Phone Call Float */}
      <a
        href={`tel:${BROKER_INFO.phone}`}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900 text-slate-200 border border-emerald-500/40 shadow-xl hover:bg-slate-800 transition-all transform hover:scale-105 group"
        aria-label="Call Broker Pavan Kumar"
      >
        <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0 group-hover:animate-pulse">
          <Phone className="w-4 h-4" />
        </div>
        <span className="text-xs font-bold hidden sm:inline-block pr-1">
          Call Pavan ({BROKER_INFO.phone})
        </span>
      </a>

      {/* WhatsApp Chat Float */}
      <a
        href={`https://wa.me/${BROKER_INFO.whatsapp}?text=Hi%20Pavan%20Properties,%20I%20want%20to%20verify%20CRDA/RERA%20layout%20paperwork%20and%20book%20a%20slot.`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold text-xs shadow-2xl shadow-emerald-950 border border-emerald-400/30 hover:from-emerald-500 hover:to-emerald-400 transition-all transform hover:scale-105"
        aria-label="Direct WhatsApp Consultation"
      >
        <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
          <MessageSquare className="w-4 h-4 text-white" />
        </div>
        <span>WhatsApp Lead Inquiry</span>
      </a>

    </div>
  );
};
