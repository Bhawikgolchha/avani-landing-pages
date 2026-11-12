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
  Heart
} from 'lucide-react';
import { EXTERNAL_LINKS, AVANI_ORGANIZATION } from '@/lib/avaniContent';

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
              <p className="text-sm text-stone-300 max-w-xl">
                Be part of our Research & Writing, Design, HR & Communications, Social Media, or Event Planning teams. Real on-ground impact in Bangalore.
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
              <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-emerald-500/30 bg-[#163515] shrink-0">
                <Image
                  src="/assets/branding/logo.jpg"
                  alt="Avani Logo"
                  fill
                  sizes="44px"
                  className="object-cover"
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

          {/* Column 2: Prototypes & Navigation */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-1">
              Landing Page Prototypes
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-stone-300 hover:text-white transition-colors flex items-center justify-between group"
                >
                  <span>Avani Editorial (Flagship)</span>
                  <span className="text-xs font-mono text-stone-500 group-hover:text-emerald-400">
                    /
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/hub"
                  className="text-stone-300 hover:text-white transition-colors flex items-center justify-between group"
                >
                  <span>Showcase Hub</span>
                  <span className="text-xs font-mono text-stone-500 group-hover:text-emerald-400">
                    /hub
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/prototype-1"
                  className="text-stone-300 hover:text-white transition-colors flex items-center justify-between group"
                >
                  <span>Prototype 1: Living Canopy</span>
                  <span className="text-xs font-mono text-stone-500 group-hover:text-emerald-400">
                    /prototype-1
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/prototype-2"
                  className="text-stone-300 hover:text-white transition-colors flex items-center justify-between group"
                >
                  <span>Prototype 2: Eco-Tech Biosphere</span>
                  <span className="text-xs font-mono text-stone-500 group-hover:text-emerald-400">
                    /prototype-2
                  </span>
                </Link>
              </li>
            </ul>

            <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mt-4 mb-1">
              Organization Sections
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-stone-400">
              <li>
                <Link href="/#objectives" className="hover:text-stone-200 transition-colors">
                  5 Core Objectives
                </Link>
              </li>
              <li>
                <Link href="/#teams" className="hover:text-stone-200 transition-colors">
                  5 Specialized Student Teams
                </Link>
              </li>
              <li>
                <Link href="/#events" className="hover:text-stone-200 transition-colors">
                  4 Flagship Community Events
                </Link>
              </li>
              <li>
                <Link href="/#climate-tips" className="hover:text-stone-200 transition-colors">
                  11 Actionable Climate Tips
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Direct Contacts & Articles */}
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
              Substack Investigations
            </h4>
            <div className="flex flex-col gap-2 text-xs">
              {EXTERNAL_LINKS.substackArticles.map((art) => (
                <a
                  key={art.id}
                  href={art.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-400 hover:text-emerald-300 flex items-start gap-1.5 transition-colors group"
                >
                  <BookOpen className="w-3.5 h-3.5 shrink-0 text-emerald-500 mt-0.5 group-hover:text-emerald-400" />
                  <span className="line-clamp-1 leading-snug">{art.title}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Column 4: Community & Social Channels */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-1">
              Social Media Channels
            </h4>
            <p className="text-xs text-stone-400">
              Follow our youth organization, explore climate journalism, and connect with our student leadership.
            </p>

            <div className="flex items-center gap-3">
              <a
                href={EXTERNAL_LINKS.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-800/40 text-stone-300 hover:text-emerald-300 hover:border-emerald-500 transition-all"
                aria-label="Avani LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={EXTERNAL_LINKS.substack}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-800/40 text-stone-300 hover:text-emerald-300 hover:border-emerald-500 transition-all"
                aria-label="Avani Substack"
              >
                <BookOpen className="w-5 h-5" />
              </a>
              <a
                href={EXTERNAL_LINKS.instagramClean}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-800/40 text-stone-300 hover:text-emerald-300 hover:border-emerald-500 transition-all"
                aria-label="Avani Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>

            <div className="mt-2 p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/20 text-xs text-stone-400 flex flex-col gap-1.5">
              <span className="font-semibold text-white">Canva Mood Board Inspiration:</span>
              <span className="text-[11px] leading-relaxed">
                Prototype 1 derived from Idea 5 (Blume/Glow Garden). Prototype 2 derived from Alternative Direction (Modern Eco-Tech / Interactive Biosphere).
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar / Copyright */}
        <div className="mt-12 pt-8 border-t border-emerald-900/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© 2025 Avani. Earth In Our Hands. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Bangalore Youth Climate Action · Next.js 14 & Three.js</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors p-1"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
