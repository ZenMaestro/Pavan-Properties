'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Phone, MessageSquare, Menu, X, ArrowUpRight } from 'lucide-react';
import { BROKER_INFO } from '@/data/projects';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#f9f6ee]/95 backdrop-blur-md border-b border-[#eae3e0] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo & Editorial Title */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-[#142334] text-[#f9f6ee] flex items-center justify-center font-serif font-bold text-lg tracking-wider shadow-sm">
            P
          </div>
          <div>
            <div className="font-serif font-bold text-lg tracking-tight text-[#142334] leading-tight">
              PAVAN PROPERTIES
            </div>
            <p className="text-[11px] text-[#715343] font-sans font-medium tracking-wide">
              Real Estate Advisory • Amaravati & Vijayawada
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-[13px] font-sans font-medium text-[#142334]">
          <Link href="/" className="hover:text-[#a67d64] transition-colors">
            Home
          </Link>
          <Link href="/#projects" className="hover:text-[#a67d64] transition-colors">
            Properties
          </Link>
          <Link href="/#verification" className="hover:text-[#a67d64] transition-colors">
            Verification Process
          </Link>
          <Link href="/about" className="hover:text-[#a67d64] transition-colors">
            About Broker
          </Link>
          <Link href="/photos" className="hover:text-[#a67d64] transition-colors">
            Site Gallery
          </Link>
          <Link href="/contact" className="hover:text-[#a67d64] transition-colors">
            Contact
          </Link>
          <Link href="/admin" className="text-xs px-2.5 py-1 rounded bg-[#f4f0ea] hover:bg-[#eae3e0] text-[#142334] font-semibold border border-[#eae3e0] transition-colors">
            Admin
          </Link>
        </nav>

        {/* Quick Actions (Direct Phone & Book Visit) */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={`tel:${BROKER_INFO.phone}`}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-[#142334] hover:text-[#a67d64] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#a67d64]" />
            <span>{BROKER_INFO.phone}</span>
          </a>

          <a
            href="/#book-visit"
            className="btn-primary text-xs py-2.5 px-4"
          >
            <span>Book a Site Visit</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-[#ffffff] border border-[#eae3e0] text-[#142334]"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#ffffff] border-b border-[#eae3e0] px-5 pt-4 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#142334] hover:text-[#a67d64]"
          >
            Home
          </Link>
          <Link
            href="/#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#142334] hover:text-[#a67d64]"
          >
            Properties
          </Link>
          <Link
            href="/#verification"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#142334] hover:text-[#a67d64]"
          >
            Verification Process
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#142334] hover:text-[#a67d64]"
          >
            About Broker
          </Link>
          <Link
            href="/photos"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#142334] hover:text-[#a67d64]"
          >
            Site Gallery
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-[#142334] hover:text-[#a67d64]"
          >
            Contact
          </Link>
          <Link
            href="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-semibold text-[#a67d64] hover:text-[#142334]"
          >
            Admin Management Portal →
          </Link>

          <div className="pt-3 border-t border-[#eae3e0] flex flex-col gap-2">
            <a
              href={`tel:${BROKER_INFO.phone}`}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#142334] text-white font-semibold text-xs"
            >
              <Phone className="w-4 h-4" />
              <span>Call Broker ({BROKER_INFO.phone})</span>
            </a>
            <a
              href={`https://wa.me/${BROKER_INFO.whatsapp}?text=Hi%20Pavan%20Properties,%20I%20would%20like%20to%20inquire%20about%20verified%20properties.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#f4f0ea] border border-[#eae3e0] text-[#142334] font-semibold text-xs"
            >
              <MessageSquare className="w-4 h-4 text-[#a67d64]" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
