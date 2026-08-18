'use client';

import React from 'react';
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
  Building, 
  Clock, 
  Compass,
  ArrowUpRight
} from 'lucide-react';
import { PROJECTS, BROKER_INFO } from '@/data/projects';
import { ProjectCard } from '@/components/common/ProjectCard';
import { BookSlotForm } from '@/components/common/BookSlotForm';

export default function HomePage() {
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

              <h1 className="font-serif font-bold text-3xl sm:text-5xl text-[#142334] tracking-tight leading-[1.15]">
                Property decisions backed by real verification.
              </h1>

              <p className="text-base sm:text-lg text-[#344f6d] leading-relaxed font-normal">
                Pavan Properties specializes exclusively in CRDA sanctioned layouts and AP RERA registered developments. We provide original sanction orders and encumbrance records before you visit a site.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#book-visit"
                  className="btn-primary"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book a Site Visit</span>
                </a>

                <a
                  href="#projects"
                  className="btn-secondary"
                >
                  <span>View Properties</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Verified Trust Strip */}
              <div className="pt-4 border-t border-[#eae3e0] grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="font-serif font-bold text-lg text-[#142334] block">15+ Years</span>
                  <span className="text-[#715343]">Local Market Experience</span>
                </div>
                <div>
                  <span className="font-serif font-bold text-lg text-[#142334] block">CRDA / RERA</span>
                  <span className="text-[#715343]">Verified Sanctions</span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="font-serif font-bold text-lg text-[#142334] block">SBI & HDFC</span>
                  <span className="text-[#715343]">Bank Pre-Approved</span>
                </div>
              </div>

            </div>

            {/* Right Col: Authentic Property Photography */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border border-[#eae3e0] shadow-lg bg-[#ffffff]">
                <img
                  src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=85"
                  alt="Amaravati Master Planned Residential Township"
                  className="w-full aspect-[4/3] object-cover"
                />
                
                {/* Minimalist Info Card Overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#ffffff]/95 backdrop-blur-md p-4 rounded-xl border border-[#eae3e0] flex items-center justify-between shadow-sm">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#715343] block">
                      Active Listing
                    </span>
                    <h3 className="font-serif font-bold text-sm sm:text-base text-[#142334]">
                      Amaravati Royal Palms (LP No. 30/2025)
                    </h3>
                    <p className="text-xs text-[#5c4438]">
                      Mangalagiri-Neerukonda Growth Corridor
                    </p>
                  </div>
                  <Link
                    href="/property/amaravati-royal-palms"
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

      {/* SECTION 2: FEATURED PROPERTIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6" id="projects">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-[#eae3e0] pb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#715343] block">
              Current Portfolio ({PROJECTS.length} Active Developments)
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
          {PROJECTS.map(project => (
            <ProjectCard key={project.id} project={project} />
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
              Every property recommended by Pavan Properties undergoes a structured four-stage regulatory and title audit:
            </p>
          </div>

          {/* 4-Step Editorial Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-5 rounded-xl bg-[#f9f6ee] border border-[#eae3e0] space-y-2">
              <span className="font-mono text-xs font-bold text-[#a67d64] block">01</span>
              <h3 className="font-serif font-bold text-base text-[#142334]">CRDA Layout Order</h3>
              <p className="text-xs text-[#5c4438] leading-relaxed">
                Verification of master plan compliance, public road handover, and final sanction LP numbers.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#f9f6ee] border border-[#eae3e0] space-y-2">
              <span className="font-mono text-xs font-bold text-[#a67d64] block">02</span>
              <h3 className="font-serif font-bold text-base text-[#142334]">AP RERA Registration</h3>
              <p className="text-xs text-[#5c4438] leading-relaxed">
                Official RERA portal registration check ensuring statutory compliance and project completion timelines.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#f9f6ee] border border-[#eae3e0] space-y-2">
              <span className="font-mono text-xs font-bold text-[#a67d64] block">03</span>
              <h3 className="font-serif font-bold text-base text-[#142334]">Title & 30-Year EC</h3>
              <p className="text-xs text-[#5c4438] leading-relaxed">
                Comprehensive Encumbrance Certificate (EC) audit ensuring zero legal mortgages or agricultural disputes.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#f9f6ee] border border-[#eae3e0] space-y-2">
              <span className="font-mono text-xs font-bold text-[#a67d64] block">04</span>
              <h3 className="font-serif font-bold text-base text-[#142334]">Bank Financing</h3>
              <p className="text-xs text-[#5c4438] leading-relaxed">
                Documentation pre-cleared for spot loan processing with nationalized lenders including SBI and HDFC.
              </p>
            </div>

          </div>

          {/* Legal Disclaimer Note */}
          <div className="mt-8 pt-6 border-t border-[#eae3e0] text-xs text-[#715343] leading-relaxed">
            <p>
              <strong>Buyer Notice:</strong> Official government sanction orders, layout drawings, and regulatory certificates are made available for client inspection. Prospective buyers are encouraged to independently verify all statutory records before executing registration deeds.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 4: ABOUT THE BROKER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="editorial-panel p-8 sm:p-12 bg-[#ffffff] border border-[#eae3e0] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-4 aspect-[4/5] rounded-xl overflow-hidden bg-[#f4f0ea] border border-[#eae3e0]">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80"
              alt="Pavan Kumar - Managing Director"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#715343] block">
              Broker Profile
            </span>

            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#142334]">
              Pavan Kumar
            </h2>

            <p className="text-xs text-[#a67d64] font-medium uppercase tracking-wide">
              Managing Director & Principal Advisor • 15 Years in AP Real Estate
            </p>

            <p className="text-sm text-[#344f6d] leading-relaxed">
              {BROKER_INFO.bio}
            </p>

            <div className="pt-2 text-xs text-[#5c4438] space-y-1.5 border-t border-[#eae3e0]">
              <p>
                <strong>Office Address:</strong> {BROKER_INFO.officeAddress}
              </p>
              <p>
                <strong>Direct Telephone:</strong> {BROKER_INFO.phone} • <strong>Email:</strong> {BROKER_INFO.email}
              </p>
            </div>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <a
                href={`tel:${BROKER_INFO.phone}`}
                className="btn-primary text-xs py-2.5 px-4"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Directly</span>
              </a>

              <Link
                href="/about"
                className="btn-secondary text-xs py-2.5 px-4"
              >
                <span>Read Full Background</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 5: SITE VISIT BOOKING (CONVERSION POINT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4" id="book-visit">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#715343] block">
                Schedule a Visit
              </span>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#142334]">
                Inspect the Location in Person
              </h2>
              <p className="text-sm text-[#344f6d] leading-relaxed">
                We organize dedicated site visits across Amaravati and Vijayawada. Review original layout sanction maps and assess road connectivity on ground.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#ffffff] border border-[#eae3e0] space-y-3 text-xs">
              <h4 className="font-serif font-bold text-sm text-[#142334]">Site Visit Protocol</h4>
              <ul className="space-y-2 text-[#5c4438]">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#a67d64] shrink-0 mt-0.5" />
                  <span>Physical inspection of CC roads, drainage, and open space reservations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#a67d64] shrink-0 mt-0.5" />
                  <span>Review of survey numbers, link documents, and RERA registration certs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#a67d64] shrink-0 mt-0.5" />
                  <span>Direct consultation with Pavan Kumar regarding pricing and bank tie-ups.</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-[#f4f0ea] border border-[#eae3e0] text-xs text-[#5c4438]">
              <strong>Office Walk-ins Welcome:</strong> Monday through Sunday, 9:00 AM to 7:00 PM at M.G. Road, Vijayawada.
            </div>
          </div>

          <div className="lg:col-span-7">
            <BookSlotForm />
          </div>

        </div>
      </section>

    </div>
  );
}
