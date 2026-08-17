'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Phone, MessageSquare, Menu, X, CheckCircle2 } from 'lucide-react';
import { BROKER_INFO } from '@/data/projects';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80">
      {/* Top Banner - Verified Proof Highlight */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 py-1.5 px-4 border-b border-emerald-500/20 text-xs text-center text-emerald-300 font-medium flex items-center justify-center gap-2">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
        <span>100% Legal Verification Guarantee • CRDA Sanctioned & RERA Approved Active Listings</span>
        <span className="hidden sm:inline-block bg-emerald-500/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider text-emerald-400">Zero Paperwork Risk</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-900/30 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="font-display font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
              <span>PAVAN</span>
              <span className="text-emerald-400">PROPERTIES</span>
            </div>
            <p className="text-[10px] text-slate-400 tracking-wider uppercase font-semibold">
              Verified Real Estate Brokerage
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
          <Link href="/" className="hover:text-emerald-400 transition-colors">
            Home
          </Link>
          <Link href="/luxury" className="flex items-center gap-1.5 text-gold-champagne hover:text-white font-semibold transition-colors px-2.5 py-1 rounded-lg bg-gold-metallic/10 border border-gold-metallic/30">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-metallic animate-pulse" />
            <span>Luxury Estate</span>
          </Link>
          <Link href="/#projects" className="hover:text-emerald-400 transition-colors">
            Projects
          </Link>
          <Link href="/photos" className="hover:text-emerald-400 transition-colors">
            Photos & Visits
          </Link>
          <Link href="/about" className="hover:text-emerald-400 transition-colors">
            About Broker
          </Link>
          <Link href="/contact" className="hover:text-emerald-400 transition-colors">
            Contact
          </Link>
        </nav>

        {/* Quick Actions (Call & WhatsApp) */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={`https://wa.me/${BROKER_INFO.whatsapp}?text=Hi%20Pavan%20Properties,%20I%20want%20to%20verify%20active%20CRDA/RERA%20projects.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-semibold border border-slate-700 transition-all"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp</span>
          </a>

          <a
            href={`tel:${BROKER_INFO.phone}`}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-xs font-bold shadow-md shadow-emerald-950 transition-all transform active:scale-95"
          >
            <Phone className="w-4 h-4" />
            <span>Call {BROKER_INFO.phone}</span>
          </a>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-200 hover:text-emerald-400 font-medium"
          >
            Home
          </Link>
          <Link
            href="/luxury"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-gold-champagne font-semibold flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-gold-metallic animate-pulse" />
            <span>The Grand Horizon Luxury Estate</span>
          </Link>
          <Link
            href="/#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-200 hover:text-emerald-400 font-medium"
          >
            Projects
          </Link>
          <Link
            href="/photos"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-200 hover:text-emerald-400 font-medium"
          >
            Photos & Site Visits
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-200 hover:text-emerald-400 font-medium"
          >
            About Broker (15 Yrs Experience)
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-slate-200 hover:text-emerald-400 font-medium"
          >
            Book Slot / Contact
          </Link>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <a
              href={`tel:${BROKER_INFO.phone}`}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-emerald-600 text-white font-bold text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Call Broker ({BROKER_INFO.phone})</span>
            </a>
            <a
              href={`https://wa.me/${BROKER_INFO.whatsapp}?text=Hi%20Pavan%20Properties,%20I%20want%20to%20book%20a%20site%20visit.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-slate-800 text-emerald-400 font-bold text-sm border border-slate-700"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
