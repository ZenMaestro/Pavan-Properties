'use client';

import React from 'react';
import { BookSlotForm } from '@/components/common/BookSlotForm';
import { BROKER_INFO } from '@/data/projects';
import { Phone, MessageSquare, MapPin, Mail, Clock, Navigation, ShieldCheck, Landmark } from 'lucide-react';

const VIJAYAWADA_CORRIDORS = [
  {
    name: 'Kesarapalli & Gannavaram Airport Corridor',
    desc: '100ft Airport Bypass Connective Road, Medha IT Park, HCL Technologies, and Anvi Homes.',
    badge: 'High Appreciation Zone',
  },
  {
    name: 'Benz Circle & M.G. Road Central Corridor',
    desc: 'Vijayawada commercial central hub (Opposite PVP Square Mall - Pavan Properties Advisory Office).',
    badge: 'Commercial & Legal HQ',
  },
  {
    name: 'Mangalagiri & Amaravati Express Corridor',
    desc: 'AIIMS Vijayawada, Guntur Highway, Capital Secretariat & High Court Connectivity (Capital Heights).',
    badge: 'Capital Gateway',
  },
  {
    name: 'Poranki & Penamaluru Bandar Road Corridor',
    desc: 'Established residential townships, international schools, and gated community ventures.',
    badge: 'Residential Hub',
  },
];

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header Banner */}
      <div className="max-w-3xl space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f4f0ea] border border-[#c9ad98] text-[#715343] text-xs font-semibold uppercase tracking-wider">
          <MapPin className="w-3.5 h-3.5 text-[#a67d64]" />
          <span>Vijayawada & Amaravati Advisory Headquarters</span>
        </div>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#142334]">
          Pavan Properties in Vijayawada
        </h1>
        <p className="text-sm text-[#344f6d] leading-relaxed">
          Visit our Vijayawada office on M.G. Road (Opposite PVP Square Mall) or schedule an accompanied on-site inspection for APCRDA & AP RERA approved ventures with Pavan Kumar.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Col: Direct Contact Information Cards */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Phone Call Card */}
          <div className="editorial-panel p-6 bg-[#ffffff] space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-base text-[#142334]">Direct Advisory Line</h3>
              <span className="badge-verified text-[10px] py-0.5 px-2">Instant Response</span>
            </div>
            <p className="text-xs text-[#5c4438]">
              Speak directly with Pavan Kumar for property pricing, LP sanction copy audits, and site visit schedules.
            </p>
            <a
              href={`tel:${BROKER_INFO.phone}`}
              className="btn-primary w-full text-xs py-2.5 justify-center shadow-sm"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call +91 90304 44978</span>
            </a>
          </div>

          {/* WhatsApp Card */}
          <div className="editorial-panel p-6 bg-[#ffffff] space-y-3">
            <h3 className="font-serif font-bold text-base text-[#142334]">WhatsApp Consultation</h3>
            <p className="text-xs text-[#5c4438]">
              Receive verified layout blueprints, Google location pins, and brochure PDFs directly on your phone.
            </p>
            <a
              href={`https://wa.me/${BROKER_INFO.whatsapp}?text=${encodeURIComponent('Hi Pavan Properties, I am inquiring about verified properties in Vijayawada & Amaravati.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat on WhatsApp (+91 90304 44978)</span>
            </a>
          </div>

          {/* Office Address & Map Directions */}
          <div className="editorial-panel p-6 bg-[#ffffff] space-y-4 text-xs text-[#5c4438]">
            <div className="flex items-center justify-between border-b border-[#eae3e0] pb-2">
              <h4 className="font-serif font-bold text-sm text-[#142334]">Vijayawada Office</h4>
              <span className="text-[10px] text-[#715343] font-semibold uppercase">Walk-in Welcome</span>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#a67d64] shrink-0 mt-0.5" />
                <span className="text-[#142334] font-medium leading-relaxed">
                  {BROKER_INFO.officeAddress}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#a67d64] shrink-0" />
                <span>Monday – Sunday: 8:00 AM – 8:00 PM</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#a67d64] shrink-0" />
                <a href={`mailto:${BROKER_INFO.email}`} className="text-[#142334] hover:underline">
                  {BROKER_INFO.email}
                </a>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=PVP+Square+Mall+MG+Road+Vijayawada"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full text-xs py-2 justify-center flex items-center gap-1.5"
            >
              <Navigation className="w-3.5 h-3.5 text-[#a67d64]" />
              <span>Get Directions on Google Maps</span>
            </a>
          </div>

        </div>

        {/* Right Col: Booking Form */}
        <div className="lg:col-span-7">
          <BookSlotForm
            title="Book a Vijayawada Property Inspection"
            subtitle="Coordinate your visit to Anvi Homes (Kesarapalli) or Capital Heights directly with Pavan Kumar."
          />
        </div>

      </div>

      {/* Embedded Google Map & Local Real Estate Zones */}
      <div className="space-y-6 pt-6 border-t border-[#eae3e0]">
        
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#715343] block">
            Local Market Coverage
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#142334]">
            Prime Real Estate Corridors in Vijayawada
          </h2>
          <p className="text-xs text-[#5c4438]">
            Pavan Properties specializes in high-growth statutory verified corridors across Krishna & Guntur districts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {VIJAYAWADA_CORRIDORS.map((corridor, i) => (
            <div
              key={i}
              className="editorial-card p-5 bg-[#ffffff] border border-[#eae3e0] rounded-xl space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#a67d64] bg-[#f4f0ea] px-2 py-0.5 rounded border border-[#eae3e0] inline-block">
                  {corridor.badge}
                </span>
                <h3 className="font-serif font-bold text-sm text-[#142334]">
                  {corridor.name}
                </h3>
                <p className="text-xs text-[#5c4438] leading-relaxed">
                  {corridor.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Google Maps Embed Card */}
        <div className="editorial-panel p-2 bg-[#ffffff] border border-[#eae3e0] rounded-2xl overflow-hidden shadow-sm">
          <div className="relative aspect-[21/9] sm:aspect-[24/8] w-full rounded-xl overflow-hidden bg-[#f4f0ea]">
            <iframe
              title="Pavan Properties Office Location - Vijayawada"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.431054707623!2d80.6480112!3d16.5062125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35eab5a5857245%3A0x6b976211d293d0f0!2sPVP%20Square!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        </div>

      </div>

    </div>
  );
}
