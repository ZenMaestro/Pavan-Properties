'use client';

import React from 'react';
import { MessageSquare, Phone } from 'lucide-react';
import { BROKER_INFO } from '@/data/projects';

export const WhatsAppFloat: React.FC = () => {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2 sm:bottom-6 sm:right-6">
      
      {/* Call Button */}
      <a
        href={`tel:${BROKER_INFO.phone}`}
        className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[#142334] text-white shadow-lg border border-[#23374e] hover:bg-[#23374e] transition-all text-xs font-semibold"
        aria-label="Call Broker Pavan Kumar"
      >
        <Phone className="w-3.5 h-3.5 text-[#c9ad98]" />
        <span className="hidden sm:inline">Call Broker</span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${BROKER_INFO.whatsapp}?text=Hi%20Pavan%20Properties,%20I%20would%20like%20to%20inquire%20about%20verified%20properties.`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#c9ad98] text-[#142334] font-semibold text-xs shadow-lg border border-[#b8947c] hover:bg-[#b8947c] transition-all"
        aria-label="Direct WhatsApp Consultation"
      >
        <MessageSquare className="w-3.5 h-3.5" />
        <span>WhatsApp</span>
      </a>

    </div>
  );
};
