'use client';

import React, { useState } from 'react';
import { Calendar, Phone, User, Mail, MessageSquare, Send, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
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
  title = 'Schedule a Property Site Visit',
  subtitle = 'Inspect layout documentation and on-site physical infrastructure with Pavan Kumar.'
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

    if (!formData.name.trim()) {
      setErrorMsg('Please enter your name.');
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
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  const selectedProjectObj = PROJECTS.find(p => p.slug === formData.projectInterest) || PROJECTS[0];

  if (submitted) {
    const waText = encodeURIComponent(
      `Hi Pavan Properties, I would like to confirm my site visit booking for ${selectedProjectObj?.name || 'Properties'}.\nName: ${formData.name}\nPhone: ${formData.phone}\nPreferred Date: ${formData.preferredDate || 'Earliest available'}`
    );

    return (
      <div className={`editorial-panel p-8 sm:p-10 text-center space-y-6 animate-in fade-in duration-300 ${className}`}>
        <div className="w-14 h-14 rounded-full bg-[#f4f0ea] border border-[#c9ad98] flex items-center justify-center mx-auto text-[#142334]">
          <CheckCircle2 className="w-8 h-8 text-[#a67d64]" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#715343] block">
            Visit Request Received
          </span>
          <h3 className="font-serif font-bold text-2xl text-[#142334]">
            Thank you, {formData.name}
          </h3>
          <p className="text-sm text-[#344f6d] max-w-md mx-auto leading-relaxed">
            Your site visit request for <strong className="text-[#142334]">{selectedProjectObj?.name}</strong> has been logged. Pavan Kumar will call you at <strong className="text-[#142334]">{formData.phone}</strong> to coordinate directions and timing.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-[#f9f6ee] border border-[#eae3e0] text-left text-xs space-y-2 max-w-md mx-auto">
          <div className="flex justify-between text-[#715343]">
            <span>Selected Property:</span>
            <span className="font-semibold text-[#142334]">{selectedProjectObj?.name}</span>
          </div>
          <div className="flex justify-between text-[#715343]">
            <span>Layout Reference:</span>
            <span className="font-mono text-[#142334]">{selectedProjectObj?.lpNumber}</span>
          </div>
          <div className="flex justify-between text-[#715343]">
            <span>Contact Number:</span>
            <span className="font-semibold text-[#142334]">{formData.phone}</span>
          </div>
        </div>

        <div className="pt-2 space-y-3 max-w-md mx-auto">
          <a
            href={`https://wa.me/${BROKER_INFO.whatsapp}?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-[#142334] hover:bg-[#23374e] text-white font-semibold text-xs transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-[#c9ad98]" />
            <span>Connect on WhatsApp for Quick Directions</span>
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
            className="text-xs text-[#715343] hover:text-[#142334] underline block mx-auto"
          >
            Book another visit
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`editorial-panel p-6 sm:p-8 bg-[#ffffff] border border-[#eae3e0] relative ${className}`}>
      
      <div className="space-y-1 mb-6">
        <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#142334]">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-[#5c4438] font-normal leading-relaxed">
          {subtitle}
        </p>
      </div>

      {errorMsg && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Name */}
        <div>
          <label className="block text-xs font-semibold text-[#142334] mb-1">
            Your Full Name <span className="text-[#a67d64]">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. S. R. Varma"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#ffffff] border border-[#eae3e0] text-[#142334] placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-[#c9ad98] focus:ring-1 focus:ring-[#c9ad98] transition-all"
            />
          </div>
        </div>

        {/* Mobile Phone */}
        <div>
          <label className="block text-xs font-semibold text-[#142334] mb-1">
            Mobile Number (10 Digits) <span className="text-[#a67d64]">*</span>
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
              placeholder="e.g. 90304 44978"
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#ffffff] border border-[#eae3e0] text-[#142334] placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-[#c9ad98] focus:ring-1 focus:ring-[#c9ad98] transition-all"
            />
          </div>
        </div>

        {/* Property Select */}
        <div>
          <label className="block text-xs font-semibold text-[#142334] mb-1">
            Select Property of Interest
          </label>
          <select
            name="projectInterest"
            value={formData.projectInterest}
            onChange={handleChange}
            className="w-full px-3 py-2.5 rounded-lg bg-[#ffffff] border border-[#eae3e0] text-[#142334] text-xs sm:text-sm focus:outline-none focus:border-[#c9ad98] focus:ring-1 focus:ring-[#c9ad98] transition-all"
          >
            {PROJECTS.map(proj => (
              <option key={proj.id} value={proj.slug}>
                {proj.name} ({proj.lpNumber})
              </option>
            ))}
          </select>
        </div>

        {/* Email & Date Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#142334] mb-1">
              Email (Optional)
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@email.com"
                className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-[#ffffff] border border-[#eae3e0] text-[#142334] placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-[#c9ad98] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#142334] mb-1">
              Preferred Visit Date
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-[#ffffff] border border-[#eae3e0] text-[#142334] text-xs sm:text-sm focus:outline-none focus:border-[#c9ad98] transition-all"
              />
            </div>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-xs font-semibold text-[#142334] mb-1">
            Specific Requirements / Notes (Optional)
          </label>
          <textarea
            name="message"
            rows={2}
            value={formData.message}
            onChange={handleChange}
            placeholder="e.g. Inquiring for 200 sq.yd east-facing plot with bank loan facility..."
            className="w-full px-3 py-2 rounded-lg bg-[#ffffff] border border-[#eae3e0] text-[#142334] placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-[#c9ad98] transition-all"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary py-3 text-sm disabled:opacity-50"
        >
          {loading ? (
            <span>Scheduling Site Visit...</span>
          ) : (
            <>
              <span>Schedule Site Visit</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#715343] pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-[#a67d64]" />
          <span>Direct contact with licensed broker • No third-party marketing calls</span>
        </div>

      </form>
    </div>
  );
};
