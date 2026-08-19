'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  FileCheck, 
  Phone, 
  ArrowRight, 
  MapPin, 
  Check, 
  Calendar, 
  Shield, 
  Landmark, 
  ArrowUpRight
} from 'lucide-react';
import { PROJECTS, BROKER_INFO } from '@/data/projects';
import { Project } from '@/types';
import { ProjectCard } from '@/components/common/ProjectCard';
import { BookSlotForm } from '@/components/common/BookSlotForm';
import { AnviHomesShowcase } from '@/components/common/AnviHomesShowcase';

export default function HomePage() {
  const [properties, setProperties] = useState<Project[]>(PROJECTS);

  useEffect(() => {
    async function loadProperties() {
      try {
        const res = await fetch('/api/properties');
        if (!res.ok) return;
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setProperties(data.data);
        }
      } catch (err) {
        console.warn('Failed to load dynamic properties from MongoDB, using bundled data.', err);
      }
    }
    loadProperties();
  }, []);

  const safeProps = Array.isArray(properties) && properties.length > 0 ? properties : PROJECTS;

  return (
    <div className="space-y-20 pb-20">
      
      {/* SECTION 1: EDITORIAL SPLIT HERO */}
      <section className="pt-8 sm:pt-14 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Col: Core Value Proposition */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#715343]">
                <MapPin className="w-3.5 h-3.5 text-[#a67d64]" />
                <span>Amaravati & Vijayawada • Real Estate Advisory</span>
              </div>

              <div className="space-y-3">
                <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#142334] leading-[1.15]">
                  Document-Verified Properties in Amaravati & Vijayawada.
                </h1>
                <p className="text-base sm:text-lg text-[#344f6d] leading-relaxed">
                  Every layout listed here has an official <strong className="text-[#142334] font-semibold">APCRDA Sanction Copy</strong>, transparent title verification, and direct site-visit coordination by Pavan Kumar.
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-[#ffffff] border border-[#eae3e0] flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#f4f0ea] flex items-center justify-center shrink-0">
                    <FileCheck className="w-4 h-4 text-[#a67d64]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#142334] block">CRDA Verified</span>
                    <span className="text-[10px] text-[#715343]">LP Copies Uploaded</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#ffffff] border border-[#eae3e0] flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#f4f0ea] flex items-center justify-center shrink-0">
                    <Shield className="w-4 h-4 text-[#a67d64]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#142334] block">Spot Registration</span>
                    <span className="text-[10px] text-[#715343]">Clear Freehold Titles</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#ffffff] border border-[#eae3e0] flex items-center gap-2.5 col-span-2 sm:col-span-1">
                  <div className="w-7 h-7 rounded-full bg-[#f4f0ea] flex items-center justify-center shrink-0">
                    <Landmark className="w-4 h-4 text-[#a67d64]" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#142334] block">Bank Approved</span>
                    <span className="text-[10px] text-[#715343]">SBI, HDFC, ICICI</span>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#projects"
                  className="btn-primary"
                >
                  <span>Explore Verified Townships</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href={`tel:${BROKER_INFO.phone}`}
                  className="btn-secondary"
                >
                  <Phone className="w-4 h-4 text-[#a67d64]" />
                  <span>Call Pavan Kumar</span>
                </a>
              </div>

            </div>

            {/* Right Col: Authentic Broker & Featured Showcase */}
            <div className="lg:col-span-6 space-y-4">
              <div className="editorial-panel p-6 sm:p-8 bg-[#ffffff] space-y-6">
                
                {/* Broker Header */}
                <div className="flex items-center gap-4 border-b border-[#eae3e0] pb-5">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#a67d64] shrink-0 bg-[#f4f0ea]">
                    <img
                      src="/pavan-kumar.png"
                      alt={BROKER_INFO.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-serif font-bold text-lg text-[#142334]">{BROKER_INFO.name}</h3>
                      <span className="badge-verified text-[10px] py-0.5 px-2">Verified Broker</span>
                    </div>
                    <p className="text-xs text-[#715343]">{BROKER_INFO.experienceYears}+ Years Experience • Capital Region Specialist</p>
                    <p className="text-xs text-[#5c4438] font-mono mt-0.5">{BROKER_INFO.phone}</p>
                  </div>
                </div>

                {/* Direct quote / promise */}
                <div className="p-4 rounded-lg bg-[#f9f6ee] border border-[#eae3e0] space-y-2">
                  <p className="text-xs text-[#142334] italic leading-relaxed">
                    &quot;I do not list speculative or unauthorized lands. Every property in my portfolio is verified against APCRDA master plans, has approved road widths, and clear legal ownership before I take clients for site visits.&quot;
                  </p>
                  <span className="text-[11px] font-semibold text-[#715343] block text-right">— Pavan Kumar</span>
                </div>

                {/* Featured Project Quick Glance */}
                <div className="flex items-center justify-between p-3.5 rounded-lg bg-[#ffffff] border border-[#eae3e0] text-xs">
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#a67d64] block">Featured Township</span>
                    <span className="font-serif font-bold text-sm text-[#142334]">Anvi Homes (100 Ft Road Facing)</span>
                    <span className="text-[11px] text-[#5c4438] block">Kesarapalli • LP No. 30/2025</span>
                  </div>
                  <Link
                    href="/property/anvi-homes-kesarapalli"
                    className="btn-primary text-xs py-2 px-3 shrink-0"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION: ANVI HOMES OFFICIAL SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnviHomesShowcase />
      </section>

      {/* SECTION 2: FEATURED PROPERTIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6" id="projects">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-[#eae3e0] pb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#715343] block">
              Current Portfolio ({safeProps.length} Active Developments)
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#142334] mt-1">
              Verified Residential Townships
            </h2>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#142334] hover:text-[#a67d64] transition-colors"
          >
            <span>Inquire for custom layout requirements</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#a67d64]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {safeProps.map(project => (
            <ProjectCard key={project.id || project.slug} project={project} />
          ))}
        </div>
      </section>

      {/* SECTION 3: TRUST & VERIFICATION PROCESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" id="verification">
        <div className="editorial-panel p-8 sm:p-12 bg-[#ffffff] border border-[#eae3e0]">
          
          <div className="max-w-2xl space-y-3 mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#715343] block">
              Due Diligence Standard
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#142334]">
              Before You Visit, We Verify.
            </h2>
            <p className="text-sm text-[#344f6d] leading-relaxed">
              Every prospective buyer receives complete layout sanity documentation before making an investment decision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="space-y-3 p-5 rounded-xl bg-[#f9f6ee] border border-[#eae3e0]">
              <div className="w-8 h-8 rounded-lg bg-[#142334] text-white flex items-center justify-center font-serif font-bold text-sm">
                01
              </div>
              <h3 className="font-serif font-bold text-base text-[#142334]">Sanction Copy Verification</h3>
              <p className="text-xs text-[#5c4438] leading-relaxed">
                We pull the authenticated APCRDA layout drawing to confirm road widths (min 40ft/100ft), park reservations, and public utility transfers.
              </p>
            </div>

            <div className="space-y-3 p-5 rounded-xl bg-[#f9f6ee] border border-[#eae3e0]">
              <div className="w-8 h-8 rounded-lg bg-[#142334] text-white flex items-center justify-center font-serif font-bold text-sm">
                02
              </div>
              <h3 className="font-serif font-bold text-base text-[#142334]">30-Year Title Search</h3>
              <p className="text-xs text-[#5c4438] leading-relaxed">
                Independent legal validation ensuring no agricultural land ceiling disputes, private mortages, or pending litigation on survey numbers.
              </p>
            </div>

            <div className="space-y-3 p-5 rounded-xl bg-[#f9f6ee] border border-[#eae3e0]">
              <div className="w-8 h-8 rounded-lg bg-[#142334] text-white flex items-center justify-center font-serif font-bold text-sm">
                03
              </div>
              <h3 className="font-serif font-bold text-base text-[#142334]">On-Ground Infrastructure Audit</h3>
              <p className="text-xs text-[#5c4438] leading-relaxed">
                Physical verification of internal CC/blacktop roads, underground storm water drainage, electrical transformers, and boundary stone markings.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 4: BOOK APPOINTMENT & CONTACT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4" id="book-visit">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Advice Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="editorial-panel p-8 bg-[#ffffff] space-y-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#715343] block">
                Direct Consultation
              </span>
              <h2 className="font-serif font-bold text-3xl text-[#142334]">
                Schedule an On-Site Verification Tour
              </h2>
              <p className="text-sm text-[#344f6d] leading-relaxed">
                Pavan Kumar personally escorts prospective investors to layout sites across Vijayawada, Kesarapalli, and Amaravati growth zones with complete statutory file copies in hand.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs text-[#142334]">
                  <div className="w-5 h-5 rounded-full bg-[#f4f0ea] flex items-center justify-center text-[#a67d64]">✓</div>
                  <span>Free pick-up coordination from Vijayawada Airport / Railway Station</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-[#142334]">
                  <div className="w-5 h-5 rounded-full bg-[#f4f0ea] flex items-center justify-center text-[#a67d64]">✓</div>
                  <span>Physical inspection of road measurements with survey tape</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-[#142334]">
                  <div className="w-5 h-5 rounded-full bg-[#f4f0ea] flex items-center justify-center text-[#a67d64]">✓</div>
                  <span>Direct meeting with layout developers without intermediaries</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#eae3e0] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[11px] text-[#715343] block">Office Location</span>
                  <span className="font-medium text-[#142334]">{BROKER_INFO.officeAddress}</span>
                </div>
                <a
                  href={`tel:${BROKER_INFO.phone}`}
                  className="font-bold text-[#142334] hover:text-[#a67d64]"
                >
                  {BROKER_INFO.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-6">
            <BookSlotForm />
          </div>

        </div>
      </section>

    </div>
  );
}
