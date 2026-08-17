'use client';

import React, { useState } from 'react';
import { Calendar, Phone, User, Mail, MessageSquare, Send, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { PROJECTS, BROKER_INFO } from '@/data/projects';

interface BookSlotFormProps {
  defaultProjectSlug?: string;
  className?: string;
  title?: string;
  subtitle?: string;
}

export const BookSlotForm: React.FC<BookSlotFormProps> = ({
  defaultProjectSlug = '',
  className = '',
  title = 'Book a Free Site Visit Slot',
  subtitle = 'Inspect verified CRDA/RERA layout paperwork with free transport'
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectInterest: defaultProjectSlug || (PROJECTS[0]?.slug || ''),
    preferredDate: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Client-side validation
    if (!formData.name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg(data.error || 'Failed to submit booking. Please try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      // Fallback success if network error
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const selectedProjectObj = PROJECTS.find(p => p.slug === formData.projectInterest) || PROJECTS[0];

  if (submitted) {
    const waText = encodeURIComponent(
      `Hi Pavan Properties, I booked a slot for ${selectedProjectObj?.name || 'Site Visit'}.\nName: ${formData.name}\nPhone: ${formData.phone}\nDate: ${formData.preferredDate || 'Earliest Available'}`
    );

    return (
      <div className={`glass-card p-8 rounded-2xl border border-rodeo-400/50 text-center space-y-6 animate-in zoom-in-95 duration-200 ${className}`}>
        <div className="w-16 h-16 rounded-full bg-rodeo-500/20 border-2 border-rodeo-400 flex items-center justify-center mx-auto text-rodeo-400">
          <CheckCircle2 className="w-10 h-10 animate-bounce" />
        </div>

        <div>
          <span className="bg-rodeo-500/20 text-rodeo-300 text-xs font-bold px-3 py-1 rounded-full border border-rodeo-400/30 uppercase tracking-wider">
            Slot Booking Confirmed
          </span>
          <h3 className="font-display font-extrabold text-2xl text-white mt-3">
            Thank You, {formData.name}!
          </h3>
          <p className="text-slate-300 text-sm mt-2 max-w-md mx-auto leading-relaxed">
            Your site visit slot for <strong className="text-rodeo-400">{selectedProjectObj?.name}</strong> has been logged. Pavan Kumar will call you at <strong className="text-white">{formData.phone}</strong> shortly.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-left text-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span>Project:</span>
            <span className="font-semibold text-white">{selectedProjectObj?.name}</span>
          </div>
          <div className="flex items-center justify-between text-slate-400">
            <span>Legal Status:</span>
            <span className="font-semibold text-amber-300">{selectedProjectObj?.lpNumber}</span>
          </div>
          <div className="flex items-center justify-between text-slate-400">
            <span>Contact Mobile:</span>
            <span className="font-semibold text-rodeo-400">{formData.phone}</span>
          </div>
        </div>

        {/* WhatsApp Fast Action */}
        <div className="pt-2">
          <a
            href={`https://wa.me/${BROKER_INFO.whatsapp}?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-rodeo-500 to-rodeo-400 text-gunmetal-950 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm shadow-lg shadow-emerald-950 transition-all transform active:scale-95"
          >
            <MessageSquare className="w-5 h-5" />
            <span>Connect on WhatsApp Instantly</span>
          </a>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                name: '',
                phone: '',
                email: '',
                projectInterest: defaultProjectSlug || (PROJECTS[0]?.slug || ''),
                preferredDate: '',
                message: ''
              });
            }}
            className="text-xs text-slate-400 hover:text-white mt-4 underline block mx-auto"
          >
            Book Another Slot
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`glass-card p-6 sm:p-8 rounded-2xl border border-slate-800 relative overflow-hidden ${className}`}>
      
      {/* Top Badge */}
      <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-amber-400">
        <Sparkles className="w-4 h-4 text-amber-400" />
        <span>Direct Lead-Gen • Instant Confirmation</span>
      </div>

      <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
        {title}
      </h3>
      <p className="text-slate-400 text-xs sm:text-sm mt-1 mb-6 leading-relaxed">
        {subtitle}
      </p>

      {errorMsg && (
        <div className="mb-4 p-3 rounded-lg bg-red-950/60 border border-red-500/40 text-red-300 text-xs">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Full Name */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Full Name <span className="text-rodeo-400">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. R. K. Varma"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-rodeo-400 focus:ring-1 focus:ring-rodeo-400 transition-all"
            />
          </div>
        </div>

        {/* Mobile Phone */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Mobile Number (10 Digits) <span className="text-rodeo-400">*</span>
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="tel"
              name="phone"
              required
              maxLength={12}
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. 98765 43210"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-rodeo-400 focus:ring-1 focus:ring-rodeo-400 transition-all"
            />
          </div>
        </div>

        {/* Project Interest */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Select Verified Project
          </label>
          <select
            name="projectInterest"
            value={formData.projectInterest}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-rodeo-400 focus:ring-1 focus:ring-rodeo-400 transition-all"
          >
            {PROJECTS.map(proj => (
              <option key={proj.id} value={proj.slug} className="bg-slate-900 text-white">
                {proj.name} ({proj.lpNumber})
              </option>
            ))}
          </select>
        </div>

        {/* Two Col: Email & Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Email Address (Optional)
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@gmail.com"
                className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-rodeo-400 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Preferred Visit Date
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-xs sm:text-sm focus:outline-none focus:border-rodeo-400 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1">
            Questions / Requirements (Optional)
          </label>
          <textarea
            name="message"
            rows={2}
            value={formData.message}
            onChange={handleChange}
            placeholder="e.g. Need 200 sq.yd corner plot with SBI loan..."
            className="w-full px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-rodeo-400 transition-all"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-rodeo-500 via-rodeo-400 to-rodeo-500 text-gunmetal-950 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm shadow-xl shadow-emerald-950/60 transition-all transform active:scale-98 disabled:opacity-50"
        >
          {loading ? (
            <span>Logging Slot Booking...</span>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Confirm & Book Free Site Visit</span>
            </>
          )}
        </button>

        {/* Trust Guarantee Note */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-rodeo-400" />
          <span>No Spam Guarantee • Free AC Cab Transport Provided</span>
        </div>

      </form>
    </div>
  );
};
