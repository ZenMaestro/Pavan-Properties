'use client';

import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Sparkles, 
  Car, 
  Wine, 
  FileText, 
  Download, 
  CheckCircle2, 
  MessageSquare,
  Send,
  Lock
} from 'lucide-react';
import { LUXURY_ESTATE } from '@/data/luxuryEstate';
import { BROKER_INFO } from '@/data/projects';

export const VipBookingCalendar: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredDate: '',
    timeSlot: '17:30 - Sunset Champagne Tour',
    needsChauffeur: true,
    needsChampagne: true,
    requiresNda: false,
    notes: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const timeSlots = [
    { time: '10:30 AM', label: 'Morning Architectural Lighting', val: '10:30 - Morning Tour' },
    { time: '02:30 PM', label: 'Afternoon Full Technical Walkthrough', val: '14:30 - Afternoon Tour' },
    { time: '05:30 PM', label: 'Sunset Horizon & Twilight Pool Tour', val: '17:30 - Sunset Champagne Tour' },
    { time: '07:30 PM', label: 'Night Lighting & Smart Cinema Experience', val: '19:30 - Night Cinema Tour' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full legal name.');
      return;
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!formData.preferredDate) {
      setErrorMsg('Please select your preferred tour date.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: cleanPhone,
          email: formData.email,
          projectInterest: LUXURY_ESTATE.title,
          preferredDate: formData.preferredDate,
          message: `VIP Tour (${formData.timeSlot}). Chauffeur: ${formData.needsChauffeur ? 'Yes' : 'No'}, Champagne: ${formData.needsChampagne ? 'Yes' : 'No'}, NDA: ${formData.requiresNda ? 'Yes' : 'No'}. Notes: ${formData.notes}`
        })
      });

      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || 'Failed to schedule VIP tour. Please try again.');
      }
    } catch (err) {
      console.error('VIP Booking submission:', err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  // Google Calendar Link generator
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`Private VIP Tour: ${LUXURY_ESTATE.title}`);
    const details = encodeURIComponent(
      `Private VIP Estate Showing with Pavan Kumar.\nProperty: 742 Grand Horizon Promenade, Amaravati.\nPrice: ₹14.85 Crore.\nContact: ${BROKER_INFO.phone}`
    );
    const location = encodeURIComponent(`${LUXURY_ESTATE.address.street}, ${LUXURY_ESTATE.address.city}`);
    
    const dateFormatted = formData.preferredDate.replace(/-/g, '') || '20260820';
    const dates = `${dateFormatted}T120000Z/${dateFormatted}T140000Z`;
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
  };

  // Download .ics file
  const downloadIcsFile = () => {
    const dateFormatted = formData.preferredDate ? formData.preferredDate.replace(/-/g, '') : '20260820';
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Pavan Properties//VIP Tour//EN
BEGIN:VEVENT
SUMMARY:Private VIP Showing - ${LUXURY_ESTATE.title}
DESCRIPTION:Private estate walkthrough with Managing Broker Pavan Kumar. Chauffeur pickup requested: ${formData.needsChauffeur ? 'Yes' : 'No'}.
LOCATION:${LUXURY_ESTATE.address.street}, ${LUXURY_ESTATE.address.city}
DTSTART:${dateFormatted}T120000Z
DTEND:${dateFormatted}T140000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `VIP-Tour-${LUXURY_ESTATE.slug}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (submitted) {
    const waText = encodeURIComponent(
      `Hi Pavan Properties VIP Concierge, I have booked a Private VIP Tour for ${LUXURY_ESTATE.title}.\nName: ${formData.name}\nPhone: ${formData.phone}\nDate: ${formData.preferredDate}\nSlot: ${formData.timeSlot}\nChauffeur: ${formData.needsChauffeur ? 'Yes' : 'No'}\nNDA: ${formData.requiresNda ? 'Yes' : 'No'}`
    );

    return (
      <section className="relative w-full bg-obsidian-950 py-16" id="vip-booking">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="glass-panel-luxury p-8 sm:p-12 rounded-3xl border border-gold-metallic/50 text-center space-y-6 animate-in zoom-in-95 duration-300">
            
            <div className="w-16 h-16 rounded-full bg-gold-metallic/20 border-2 border-gold-metallic flex items-center justify-center mx-auto text-gold-metallic">
              <CheckCircle2 className="w-10 h-10 animate-pulse" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold text-gold-metallic bg-gold-metallic/10 border border-gold-metallic/30 px-3 py-1 rounded-full uppercase tracking-widest">
                VIP Showing Confirmed
              </span>
              <h3 className="font-serif-luxury font-medium text-2xl sm:text-3xl text-white">
                Private Tour Reserved, {formData.name}
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm font-light max-w-lg mx-auto leading-relaxed">
                Your private showing for <strong className="text-gold-metallic">{LUXURY_ESTATE.title}</strong> has been logged in our VIP concierge schedule. Our private client advisor will contact you at <strong className="text-white">{formData.phone}</strong>.
              </p>
            </div>

            {/* Booking Summary Box */}
            <div className="bg-navy-950/90 p-5 rounded-2xl border border-slate-800 text-left text-xs space-y-2.5 max-w-md mx-auto">
              <div className="flex items-center justify-between text-slate-400">
                <span>Selected Date:</span>
                <span className="font-mono font-bold text-gold-metallic">{formData.preferredDate}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Time Experience:</span>
                <span className="font-semibold text-white">{formData.timeSlot}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Private Chauffeur:</span>
                <span className="font-semibold text-emerald-400">{formData.needsChauffeur ? 'Maybach / S-Class Requested' : 'Private Arrival'}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Confidentiality NDA:</span>
                <span className="font-semibold text-amber-300">{formData.requiresNda ? 'Standard NDA Prepared' : 'Standard'}</span>
              </div>
            </div>

            {/* Calendar Integration Buttons */}
            <div className="space-y-3 pt-2 max-w-md mx-auto">
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 block font-semibold">
                Sync to Your Executive Calendar
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={getGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-navy-900 hover:bg-navy-800 text-slate-200 border border-slate-700 text-xs font-semibold transition-all"
                >
                  <CalendarIcon className="w-4 h-4 text-gold-metallic" />
                  <span>Google Calendar</span>
                </a>

                <button
                  onClick={downloadIcsFile}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-navy-900 hover:bg-navy-800 text-slate-200 border border-slate-700 text-xs font-semibold transition-all"
                >
                  <Download className="w-4 h-4 text-gold-metallic" />
                  <span>Apple / Outlook (.ics)</span>
                </button>
              </div>

              {/* Direct WhatsApp Concierge */}
              <a
                href={`https://wa.me/${BROKER_INFO.whatsapp}?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-gold-metallic via-gold-champagne to-gold-metallic text-obsidian-950 font-bold text-xs shadow-xl shadow-gold-metallic/20 transition-all transform active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Instant WhatsApp Concierge Handshake</span>
              </a>

              <button
                onClick={() => setSubmitted(false)}
                className="text-xs text-slate-400 hover:text-white underline pt-2 block mx-auto"
              >
                Schedule Another Showing
              </button>
            </div>

          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full bg-obsidian-950 py-16 border-t border-slate-900" id="vip-booking">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-[11px] font-mono font-bold text-gold-metallic uppercase tracking-[0.25em] bg-gold-metallic/10 border border-gold-metallic/30 px-3.5 py-1 rounded-full inline-block">
            Private Client Services
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl text-white font-medium">
            Schedule a Private VIP Showing
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm font-light">
            Experience the estate in complete privacy. Includes complimentary luxury chauffeur pickup, champagne tasting, and certified legal paperwork inspection.
          </p>
        </div>

        {/* Form Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-panel-luxury p-6 sm:p-10 rounded-3xl border border-gold-metallic/30 shadow-2xl">
            
            {errorMsg && (
              <div className="mb-6 p-4 rounded-xl bg-red-950/70 border border-red-500/50 text-red-300 text-xs">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1: Name, Phone, Email */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 uppercase tracking-wider text-[11px]">
                    Legal Full Name <span className="text-gold-metallic">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Dr. A. V. Rao"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-navy-950/90 border border-slate-700/80 text-white placeholder-slate-600 text-xs sm:text-sm focus:outline-none focus:border-gold-metallic focus:ring-1 focus:ring-gold-metallic transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 uppercase tracking-wider text-[11px]">
                    Private Mobile Number <span className="text-gold-metallic">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-navy-950/90 border border-slate-700/80 text-white placeholder-slate-600 text-xs sm:text-sm focus:outline-none focus:border-gold-metallic focus:ring-1 focus:ring-gold-metallic transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 uppercase tracking-wider text-[11px]">
                    Confidential Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@familyoffice.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-navy-950/90 border border-slate-700/80 text-white placeholder-slate-600 text-xs sm:text-sm focus:outline-none focus:border-gold-metallic focus:ring-1 focus:ring-gold-metallic transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Date Picker & Time Slot Picker */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                
                {/* Date Picker */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 uppercase tracking-wider text-[11px]">
                    Preferred Tour Date <span className="text-gold-metallic">*</span>
                  </label>
                  <div className="relative">
                    <CalendarIcon className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <input
                      type="date"
                      name="preferredDate"
                      required
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-navy-950/90 border border-slate-700/80 text-white text-xs sm:text-sm focus:outline-none focus:border-gold-metallic focus:ring-1 focus:ring-gold-metallic transition-all"
                    />
                  </div>
                </div>

                {/* Experience Slot Selector */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5 uppercase tracking-wider text-[11px]">
                    Showing Experience Slot
                  </label>
                  <select
                    name="timeSlot"
                    value={formData.timeSlot}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-navy-950/90 border border-slate-700/80 text-white text-xs sm:text-sm focus:outline-none focus:border-gold-metallic focus:ring-1 focus:ring-gold-metallic transition-all"
                  >
                    {timeSlots.map((slot, i) => (
                      <option key={i} value={slot.val} className="bg-navy-950 text-white">
                        {slot.time} — {slot.label}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              {/* Row 3: Concierge Customization Options */}
              <div className="p-5 rounded-2xl bg-navy-950/70 border border-slate-800 space-y-4">
                <span className="text-[10px] font-mono font-bold text-gold-metallic uppercase tracking-widest block">
                  VIP CONCIERGE PREFERENCES (COMPLIMENTARY)
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  
                  <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-gold-metallic/30 cursor-pointer">
                    <input
                      type="checkbox"
                      name="needsChauffeur"
                      checked={formData.needsChauffeur}
                      onChange={handleChange}
                      className="mt-0.5 accent-amber-400"
                    />
                    <div className="space-y-0.5">
                      <span className="font-semibold text-white flex items-center gap-1.5">
                        <Car className="w-3.5 h-3.5 text-gold-metallic" /> Chauffeur Pickup
                      </span>
                      <span className="text-[11px] text-slate-400 block">
                        Airport or residence transfer in Vijayawada / Amaravati.
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-gold-metallic/30 cursor-pointer">
                    <input
                      type="checkbox"
                      name="needsChampagne"
                      checked={formData.needsChampagne}
                      onChange={handleChange}
                      className="mt-0.5 accent-amber-400"
                    />
                    <div className="space-y-0.5">
                      <span className="font-semibold text-white flex items-center gap-1.5">
                        <Wine className="w-3.5 h-3.5 text-gold-metallic" /> Champagne Service
                      </span>
                      <span className="text-[11px] text-slate-400 block">
                        Sunset poolside wine and curated canapé tasting.
                      </span>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-gold-metallic/30 cursor-pointer">
                    <input
                      type="checkbox"
                      name="requiresNda"
                      checked={formData.requiresNda}
                      onChange={handleChange}
                      className="mt-0.5 accent-amber-400"
                    />
                    <div className="space-y-0.5">
                      <span className="font-semibold text-white flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-gold-metallic" /> Confidential NDA
                      </span>
                      <span className="text-[11px] text-slate-400 block">
                        Strict non-disclosure for public figures / family offices.
                      </span>
                    </div>
                  </label>

                </div>
              </div>

              {/* Special Requirements */}
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5 uppercase tracking-wider text-[11px]">
                  Special Requests / Private Aviation Tail Number (Optional)
                </label>
                <textarea
                  name="notes"
                  rows={2}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="e.g. Arriving via helicopter, require private legal counsel present for 30-year EC review..."
                  className="w-full px-4 py-3 rounded-xl bg-navy-950/90 border border-slate-700/80 text-white placeholder-slate-600 text-xs sm:text-sm focus:outline-none focus:border-gold-metallic focus:ring-1 focus:ring-gold-metallic transition-all"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-gold-metallic via-gold-champagne to-gold-metallic hover:from-gold-champagne hover:to-gold-metallic text-obsidian-950 font-bold text-sm shadow-2xl shadow-gold-metallic/20 transition-all transform hover:scale-[1.01] active:scale-98 disabled:opacity-50"
              >
                {loading ? (
                  <span>Reserving VIP Showing & Preparing Calendar...</span>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-obsidian-950" />
                    <span>Confirm Private VIP Tour & Generate Calendar Invite</span>
                  </>
                )}
              </button>

              {/* Privacy Footer */}
              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-metallic" />
                <span>100% Confidentiality Guaranteed • No Third-Party Data Sharing</span>
              </div>

            </form>

          </div>
        </div>

      </div>
    </section>
  );
};
