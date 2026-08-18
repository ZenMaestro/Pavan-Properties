'use client';

import React from 'react';
import { BookSlotForm } from '@/components/common/BookSlotForm';
import { BROKER_INFO } from '@/data/projects';
import { Phone, MessageSquare, MapPin, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      <div className="max-w-2xl space-y-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#715343] block">
          Contact Advisory
        </span>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#142334]">
          Connect with Pavan Properties
        </h1>
        <p className="text-sm text-[#344f6d] leading-relaxed">
          Schedule a property site visit or speak directly with Pavan Kumar regarding active CRDA and RERA approved listings in Amaravati and Vijayawada.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Col: Direct Information Cards */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="editorial-panel p-6 bg-[#ffffff] space-y-3">
            <h3 className="font-serif font-bold text-base text-[#142334]">Direct Telephone</h3>
            <p className="text-xs text-[#5c4438]">Available for property inquiries and layout verification.</p>
            <a
              href={`tel:${BROKER_INFO.phone}`}
              className="btn-primary w-full text-xs py-2.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call {BROKER_INFO.phone}</span>
            </a>
          </div>

          <div className="editorial-panel p-6 bg-[#ffffff] space-y-3">
            <h3 className="font-serif font-bold text-base text-[#142334]">WhatsApp Consultation</h3>
            <p className="text-xs text-[#5c4438]">Receive layout PDFs and location coordinates.</p>
            <a
              href={`https://wa.me/${BROKER_INFO.whatsapp}?text=Hi%20Pavan%20Properties,%20I%20would%20like%20to%20inquire%20about%20active%20projects.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full text-xs py-2.5"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#a67d64]" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          <div className="editorial-panel p-6 bg-[#ffffff] space-y-3 text-xs text-[#5c4438]">
            <h4 className="font-serif font-bold text-sm text-[#142334]">Office Location & Hours</h4>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#a67d64] shrink-0 mt-0.5" />
                <span>{BROKER_INFO.officeAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#a67d64] shrink-0" />
                <span>Monday – Sunday: 9:00 AM – 7:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#a67d64] shrink-0" />
                <span>{BROKER_INFO.email}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Col: Form */}
        <div className="lg:col-span-7">
          <BookSlotForm />
        </div>

      </div>

    </div>
  );
}
