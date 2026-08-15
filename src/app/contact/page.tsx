'use client';

import React from 'react';
import { BookSlotForm } from '@/components/common/BookSlotForm';
import { BROKER_INFO } from '@/data/projects';
import { Phone, MessageSquare, MapPin, Mail, Clock, ShieldCheck, Sparkles } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Book Slot • Immediate Confirmation</span>
        </div>

        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white">
          Book a Free Site Visit Slot
        </h1>

        <p className="text-slate-400 text-sm leading-relaxed">
          Fill out the quick form below to reserve your site visit. Complimentary AC cab pickup is provided from Vijayawada, Mangalagiri, and Guntur.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Col: Direct Phone & WhatsApp CTAs */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Quick Call Card */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-white">Prefer a Direct Call?</h3>
                <p className="text-xs text-slate-400">Talk directly with Pavan Kumar</p>
              </div>
            </div>

            <a
              href={`tel:${BROKER_INFO.phone}`}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call {BROKER_INFO.phone}</span>
            </a>
          </div>

          {/* WhatsApp Card */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base text-white">Instant WhatsApp Chat</h3>
                <p className="text-xs text-slate-400">Pre-filled project inquiry</p>
              </div>
            </div>

            <a
              href={`https://wa.me/${BROKER_INFO.whatsapp}?text=Hi%20Pavan%20Properties,%20I%20want%20to%20book%20a%20site%20visit%20slot.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-sm border border-slate-700 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp Now</span>
            </a>
          </div>

          {/* Office Details Card */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 text-xs">
            <h4 className="font-display font-bold text-sm text-white">Office Location & Hours</h4>
            <div className="space-y-3 text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{BROKER_INFO.officeAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Mon - Sun: 9:00 AM – 7:30 PM (All 7 Days Open)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{BROKER_INFO.email}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center gap-2 text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>Free Certified Paperwork Inspection at Office</span>
            </div>
          </div>

        </div>

        {/* Right Col: Book Slot Form */}
        <div className="lg:col-span-7">
          <BookSlotForm
            title="Submit Slot Details"
            subtitle="Client-side validated • Direct insert to Supabase leads database"
          />
        </div>

      </div>

    </div>
  );
}
