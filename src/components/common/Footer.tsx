'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowUpRight, 
  Mail, 
  Phone, 
  Linkedin, 
  Instagram, 
  BookOpen, 
  ChevronUp,
  MapPin,
  Heart,
  ExternalLink
} from 'lucide-react';
import { EXTERNAL_LINKS, AVANI_ORGANIZATION, AVANI_TEAMS, AVANI_OBJECTIVES } from '@/lib/avaniContent';

export function Footer() {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0F2410] text-stone-200 border-t border-emerald-900/30 relative z-20">
      {/* Top Banner / Callout Section */}
      <div className="border-b border-emerald-900/20 bg-emerald-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Heart className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-serif">
                Join the Avani Youth Environmental Movement
              </h3>
              <p className="text-sm text-stone-300 max-w-xl mt-1">
                Be part of our Research & Writing, Design, HR & Communications, Social Media, or Event Planning teams. Real on-ground impact across Bangalore.
              </p>
            </div>
          </div>
          <a
            href={EXTERNAL_LINKS.applicationForm}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-[#0F2410] font-bold text-sm transition-all duration-200 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:scale-105 shrink-0"
          >
            <span>Apply Now via Google Form</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Main 4-Column Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1: Brand & Mission */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-emerald-500/30 bg-[#163515] shrink-0 p-1">
                <Image
                  src="/assets/branding/avani_logo_transparent.png"
                  alt="Avani Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-serif font-bold text-xl text-white block">
                  Avani
                </span>
                <span className="text-xs text-emerald-400 font-medium">
                  Earth In Our Hands
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              {AVANI_ORGANIZATION.missionParagraphs[0]}
            </p>
            <p className="text-xs text-stone-400 leading-relaxed">
              {AVANI_ORGANIZATION.missionParagraphs[3]}
            </p>

            <div className="flex items-center gap-1.5 text-xs text-stone-300 mt-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Bangalore, Karnataka, India</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/40 text-emerald-300 text-[11px] font-mono w-fit mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              100% Student & Volunteer Led
            </div>
          </div>

          {/* Column 2: Initiatives & Sections */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-1">
              Our Initiatives
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-stone-300">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Our Mission
                </a>
              </li>
              <li>
                <a href="#objectives" className="hover:text-white transition-colors">
                  5 Core Pillars of Impact
                </a>
              </li>
              <li>
                <a href="#teams" className="hover:text-white transition-colors">
                  The 5 Student Teams
                </a>
              </li>
              <li>
                <a href="#events" className="hover:text-white transition-colors">
                  4 Realized Community Events
                </a>
              </li>
              <li>
                <a href="#climate-tips" className="hover:text-white transition-colors">
                  11 Climate Action Tips (Interactive)
                </a>
              </li>
              <li>
                <a href="#publications" className="hover:text-white transition-colors">
                  Substack Thought Leadership
                </a>
              </li>
              <li>
                <a href="#apply" className="hover:text-white transition-colors">
                  Join Our Bangalore Cohort
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: The 5 Student Teams */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-1">
              Student Leadership Teams
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-stone-300">
              {AVANI_TEAMS.map((team) => (
                <li key={team.id} className="flex flex-col">
                  <span className="font-semibold text-stone-100">{team.name}</span>
                  <span className="text-stone-400 text-[11px]">{team.role || team.keyFocus}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <span className="text-[11px] text-emerald-400 font-mono">
                Task format: NAME_AVANI_SUBMISSION
              </span>
            </div>
          </div>

          {/* Column 4: Contact & Socials */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-1">
              Direct Contact
            </h4>
            <div className="flex flex-col gap-2.5 text-xs text-stone-300">
              <a
                href={EXTERNAL_LINKS.emailMailto}
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors font-medium"
              >
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{EXTERNAL_LINKS.email}</span>
              </a>
              <a
                href={EXTERNAL_LINKS.phoneTel}
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors font-medium"
              >
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{EXTERNAL_LINKS.phoneFormatted}</span>
              </a>
            </div>

            <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mt-4 mb-1">
              Connect With Us
            </h4>
            <div className="flex flex-col gap-2 text-xs">
              <a
                href={EXTERNAL_LINKS.instagramClean}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-300 hover:text-emerald-400 transition-colors flex items-center gap-2"
              >
                <Instagram className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instagram (@avani_yocc)</span>
                <ExternalLink className="w-3 h-3 text-stone-500" />
              </a>
              <a
                href={EXTERNAL_LINKS.substack}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-300 hover:text-emerald-400 transition-colors flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Substack (avaniyocc)</span>
                <ExternalLink className="w-3 h-3 text-stone-500" />
              </a>
              <a
                href={EXTERNAL_LINKS.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-300 hover:text-emerald-400 transition-colors flex items-center gap-2"
              >
                <Linkedin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>LinkedIn (company/avaniyocc)</span>
                <ExternalLink className="w-3 h-3 text-stone-500" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Back to Top */}
      <div className="border-t border-emerald-900/30 bg-[#0A1A0B] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span>
              &copy; {new Date().getFullYear()} Avani Youth Organization for Climate Care. All rights reserved.
            </span>
            <span className="hidden sm:inline">&middot;</span>
            <span className="text-emerald-400">
              100% Student-Led &middot; Bangalore, India
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-stone-300 hover:text-white transition-colors bg-emerald-950/60 hover:bg-emerald-900/60 px-3 py-1.5 rounded-full border border-emerald-800/40 text-xs"
            aria-label="Scroll back to top"
          >
            <span>Back to top</span>
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
