# Milestone M3 Shared UI Components & Routing Architecture Specification

**Author:** explorer_m3_components  
**Date:** 2026-11-12T08:52:00Z  
**Project:** Avani Landing Pages (`/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages`)  
**Mission:** Design and specify the shared UI components and routing structure for Milestone M3: `Navbar.tsx`, `Footer.tsx`, `useLenis.ts`, Comparison Showcase Hub (`page.tsx`), and shell stubs for `/prototype-1` and `/prototype-2`.

---

## 1. Executive Summary

Milestone M3 establishes the shared foundational user interface and routing structure for the Avani web application. To showcase the dual creative directions requested by the organization—**Prototype 1: "The Living Canopy"** (organic, botanical, Canva Idea 5) and **Prototype 2: "Eco-Tech Biosphere"** (futuristic dark-mode, planetary telemetry)—the application requires a cohesive, high-performance base that guarantees:

1. **Instant, Frictionless Prototype Switching**: A persistent, pathname-aware Prototype Switcher allowing visitors, stakeholders, and reviewers to toggle instantly between the Comparison Hub (`/`), Prototype 1 (`/prototype-1`), and Prototype 2 (`/prototype-2`).
2. **Context-Aware Visual Adaptation**: Shared components (`Navbar` and `Footer`) adapt their visual styling seamlessly depending on the active prototype (warm organic tea-green glassmorphism on P1 vs. dark obsidian cyan-glassmorphism on P2).
3. **Buttery 60 FPS Scroll Integration**: A robust `useLenis.ts` hook integrating Lenis inertial scrolling with the GSAP ScrollTrigger ticker, ensuring SSR safety and zero animation jank.
4. **Editorial Showcase Comparison Hub (`/`)**: A dedicated landing experience presenting side-by-side comparison cards, an in-depth feature matrix table, and Avani's verified mission metrics.
5. **Rock-Solid SSR & Hydration Stability**: Complete shell stubs for `/prototype-1` and `/prototype-2` featuring `{ ssr: false }` dynamic canvas wrappers that eliminate WebGL context crashes and guarantee clean `npm run build` execution.

---

## 2. Component Design & Specification

### 2.1 Universal Navbar with Prototype Switcher (`src/components/common/Navbar.tsx`)

#### Architectural Highlights:
- **Brand Identity**: Features the official Avani logo (`/assets/branding/logo.jpg`), name "Avani", and tagline "Earth In Our Hands", linking to `/`.
- **Navigation Anchor Links**: Direct jump links to `#about`, `#objectives`, `#teams`, `#events`, and `#climate-tips`. When clicked from the Showcase Hub (`/`), routes transition or jump smoothly to the designated sections.
- **Persistent Prototype Switcher**:
  - Displays three distinct mode tabs:
    1. **Hub** (`/`): LayoutGrid icon, neutral modern pill.
    2. **Living Canopy** (`/prototype-1`): Leaf icon, organic forest green pill.
    3. **Eco-Tech** (`/prototype-2`): Globe/Cpu icon, glowing cyber cyan pill.
  - Detects route state via Next.js `usePathname()`.
  - Highlights the active mode with animated contrast, borders, and ambient glow.
- **Primary Action CTA**: "Join Cohort 2025" pill button linking directly to the official Google Form application (`https://docs.google.com/forms/d/e/1FAIpQLSd_7uxm79Ci-gyoTaE80A_NKt2KMZ1ueS48v6hMgKBVrmZzQA/viewform?usp=dialog`) with `target="_blank"` and `rel="noopener noreferrer"`.
- **Responsive Mobile Drawer**:
  - Hamburger toggle with Lucide `Menu` / `X` icon.
  - Animated full drawer overlay containing navigation links, the 3-mode prototype switcher, the Apply CTA, and direct contact quick-links.
- **Pathname-Aware Styling**:
  - If `pathname === '/prototype-2'`: Dark Cyber HUD Theme (`bg-[#080C0E]/85 border-cyan-500/20 text-slate-100`).
  - If `pathname === '/prototype-1'`: Organic Living Canopy Theme (`bg-[#F9FAF7]/90 border-[#163515]/10 text-[#163515]`).
  - If `pathname === '/'`: Clean Neutral Editorial Theme (`bg-white/85 border-stone-200/80 text-stone-900`).

#### Production-Ready Implementation Blueprint:

```tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  LayoutGrid, 
  Trees, 
  Globe2, 
  ArrowUpRight, 
  Mail, 
  Phone 
} from 'lucide-react';

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Objectives', href: '#objectives' },
  { label: 'Teams', href: '#teams' },
  { label: 'Events', href: '#events' },
  { label: 'Climate Tips', href: '#climate-tips' },
];

const PROTOTYPES = [
  {
    id: 'hub',
    label: 'Showcase Hub',
    shortLabel: 'Hub',
    href: '/',
    icon: LayoutGrid,
    desc: 'Comparison & Overview',
  },
  {
    id: 'p1',
    label: 'Living Canopy',
    shortLabel: 'Canopy (P1)',
    href: '/prototype-1',
    icon: Trees,
    desc: 'Organic Botanical Journey',
  },
  {
    id: 'p2',
    label: 'Eco-Tech Biosphere',
    shortLabel: 'Eco-Tech (P2)',
    href: '/prototype-2',
    icon: Globe2,
    desc: 'Cyber Telemetry & 3D Globe',
  },
];

export const GOOGLE_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSd_7uxm79Ci-gyoTaE80A_NKt2KMZ1ueS48v6hMgKBVrmZzQA/viewform?usp=dialog';

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isP2 = pathname === '/prototype-2';
  const isP1 = pathname === '/prototype-1';

  // Dynamic theme wrapper classes
  const themeClasses = isP2
    ? 'bg-[#080C0E]/85 border-cyan-500/20 text-slate-100 shadow-[0_4px_30px_rgba(6,182,212,0.08)]'
    : isP1
    ? 'bg-[#F9FAF7]/90 border-[#163515]/10 text-[#163515] shadow-[0_4px_30px_rgba(22,53,21,0.06)]'
    : 'bg-white/85 border-stone-200/80 text-stone-900 shadow-sm';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md ${themeClasses} ${
          scrolled ? 'py-2.5 border-b' : 'py-3.5 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Brand Logo & Title */}
            <Link
              href="/"
              className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded-lg p-1"
            >
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-600/40 shadow-sm transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/assets/branding/logo.jpg"
                  alt="Avani Logo"
                  fill
                  sizes="40px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight tracking-tight flex items-center gap-1.5 font-serif">
                  Avani
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono uppercase tracking-wider ${
                      isP2
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    Youth Org
                  </span>
                </span>
                <span className="text-[11px] opacity-75 leading-none font-medium">
                  Earth In Our Hands
                </span>
              </div>
            </Link>

            {/* Center: Integrated Prototype Switcher Bar (Desktop) */}
            <div
              className={`hidden md:flex items-center p-1 rounded-full border transition-all ${
                isP2
                  ? 'bg-slate-900/90 border-cyan-500/30'
                  : 'bg-stone-100/90 border-stone-200/90'
              }`}
            >
              {PROTOTYPES.map((proto) => {
                const Icon = proto.icon;
                const isActive = pathname === proto.href;

                let activeStyle = '';
                if (isActive) {
                  if (proto.id === 'p1') {
                    activeStyle =
                      'bg-[#163515] text-[#D0E8C5] shadow-[0_2px_10px_rgba(22,53,21,0.3)] font-semibold';
                  } else if (proto.id === 'p2') {
                    activeStyle =
                      'bg-cyan-950 text-cyan-300 border border-cyan-400/40 shadow-[0_0_12px_rgba(6,182,212,0.3)] font-semibold';
                  } else {
                    activeStyle =
                      'bg-stone-800 text-white shadow font-semibold';
                  }
                } else {
                  activeStyle = isP2
                    ? 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60';
                }

                return (
                  <Link
                    key={proto.id}
                    href={proto.href}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs rounded-full transition-all duration-200 ${activeStyle}`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{proto.shortLabel}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right: Navigation Links & Cohort CTA */}
            <div className="hidden lg:flex items-center gap-6">
              <nav className="flex items-center gap-5 text-sm font-medium">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`transition-colors duration-150 ${
                      isP2
                        ? 'text-slate-300 hover:text-cyan-300'
                        : 'text-stone-600 hover:text-emerald-800'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 shadow-sm ${
                  isP2
                    ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 hover:brightness-110 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    : 'bg-[#163515] text-[#D0E8C5] hover:bg-[#0F2410] hover:text-white'
                }`}
              >
                <span>Join Cohort 2025</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden items-center gap-2">
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${
                  isP2
                    ? 'bg-cyan-500 text-slate-950 font-bold'
                    : 'bg-[#163515] text-[#D0E8C5]'
                }`}
              >
                Apply
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-lg transition-colors ${
                  isP2
                    ? 'text-slate-200 hover:bg-slate-800'
                    : 'text-stone-700 hover:bg-stone-100'
                }`}
                aria-label="Toggle navigation drawer"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className={`fixed inset-0 z-40 pt-20 px-6 pb-8 md:hidden overflow-y-auto transition-all ${
            isP2
              ? 'bg-[#080C0E]/98 text-slate-100'
              : 'bg-[#F9FAF7]/98 text-[#163515]'
          }`}
        >
          <div className="flex flex-col gap-6 max-w-sm mx-auto">
            {/* Prototype Switcher Cards */}
            <div>
              <p className="text-xs uppercase tracking-wider font-mono opacity-60 mb-3">
                Switch Interactive Prototype
              </p>
              <div className="grid grid-cols-1 gap-2.5">
                {PROTOTYPES.map((proto) => {
                  const Icon = proto.icon;
                  const isActive = pathname === proto.href;
                  return (
                    <Link
                      key={proto.id}
                      href={proto.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                        isActive
                          ? isP2
                            ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200'
                            : 'bg-emerald-900 border-emerald-950 text-emerald-100'
                          : isP2
                          ? 'bg-slate-900/60 border-slate-800 text-slate-300'
                          : 'bg-white border-stone-200 text-stone-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            isActive
                              ? 'bg-white/10'
                              : isP2
                              ? 'bg-slate-800'
                              : 'bg-stone-100'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{proto.label}</p>
                          <p className="text-xs opacity-75">{proto.desc}</p>
                        </div>
                      </div>
                      {isActive && (
                        <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-white/20">
                          Active
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Navigation Section Links */}
            <div>
              <p className="text-xs uppercase tracking-wider font-mono opacity-60 mb-2">
                Page Sections
              </p>
              <nav className="flex flex-col divide-y divide-current/10">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-3 font-medium text-base hover:opacity-75 transition-opacity"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Cohort 2025 Application Callout */}
            <div className="pt-2">
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-bold text-sm shadow-md transition-all ${
                  isP2
                    ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                    : 'bg-[#163515] text-[#D0E8C5]'
                }`}
              >
                <span>Join Cohort 2025 (Google Form)</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            {/* Direct Contacts Quick Bar */}
            <div className="pt-4 border-t border-current/10 flex flex-col gap-2 text-xs opacity-80">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" />
                <a href="mailto:theavaniorg@gmail.com">theavaniorg@gmail.com</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5" />
                <a href="tel:+919119119307">+91 91191 19307</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
```

---

### 2.2 Comprehensive Multi-Column Footer (`src/components/common/Footer.tsx`)

#### Architectural Highlights:
- **Comprehensive 4-Column Layout**:
  - **Column 1 (Identity & Mission)**: Avani logo, Bangalore youth focus, mission quote, student-led badge.
  - **Column 2 (Prototypes & Hub)**: Instant links to `/`, `/prototype-1`, `/prototype-2`, plus links to 5 objectives and 11 tips.
  - **Column 3 (Direct Contacts & Substack)**:
    - Primary email: `theavaniorg@gmail.com` (and `avaniyocc@gmail.com`).
    - Primary phone: `+91 91191 19307` (and `+91 8050931769`).
    - 3 Substack article links verbatim from request.
  - **Column 4 (Cohort Application & Social Channels)**:
    - Dedicated card callout to apply for the 2025 cohort.
    - Social links with verified URLs and icons (LinkedIn, Substack, Instagram).
- **Universal Rainforest Dark Aesthetics (`#0F2410` / `#163515`)**:
  - Deep dark rainforest green background with emerald and bio-cyan accents.
  - Complements both Prototype 1 (living forest) and Prototype 2 (eco-tech) with zero aesthetic dissonance.
- **Legal & Copyright**:
  - "© 2025 Avani. Earth In Our Hands. All rights reserved."
  - "Bangalore Youth Climate Action · Built with Next.js 14, Three.js & React Three Fiber."

#### Production-Ready Implementation Blueprint:

```tsx
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
import { GOOGLE_FORM_URL } from './Navbar';

export const SOCIAL_LINKS = {
  linkedIn: 'https://www.linkedin.com/company/avaniyocc/',
  substack: 'https://open.substack.com/pub/avaniyocc?r=5wu68m&utm_medium=ios',
  instagram: 'https://www.instagram.com/avani_yocc?cplk=MXQ2amNodzFmbHFpcA==',
  articles: [
    {
      title: 'Youth Climate Action in Urban India',
      url: 'https://substack.com/@avaniyocc/note/p-216575497?r=5wrcnw',
    },
    {
      title: 'Circular Waste Management & Student Drives',
      url: 'https://substack.com/@avaniyocc/note/p-223896247?r=5wrcnw',
    },
    {
      title: 'Restoring Local Ecosystems: A Bangalore Case Study',
      url: 'https://substack.com/@avaniyocc/note/p-217629092?r=5wrcnw',
    },
  ],
};

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
                Join the 2025 Avani Student Cohort
              </h3>
              <p className="text-sm text-stone-300 max-w-xl">
                Be part of our Research, Design, Communications, Social Media, or Events teams. Real on-ground impact in Bangalore.
              </p>
            </div>
          </div>
          <a
            href={GOOGLE_FORM_URL}
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
              <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-emerald-500/30">
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

            <p className="text-xs text-stone-400 leading-relaxed">
              Avani is a Bangalore-based youth environmental organization consisting of an enthusiastic team of students committed to natural resource restoration, pollution mitigation, and circular waste systems.
            </p>

            <div className="flex items-center gap-1.5 text-xs text-stone-400 mt-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Bangalore, Karnataka, India</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/40 text-emerald-300 text-[11px] font-mono w-fit mt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              100% Student & Volunteer Led
            </div>
          </div>

          {/* Column 2: Prototypes & Navigation */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-1">
              Interactive Prototypes
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-stone-300 hover:text-white transition-colors flex items-center justify-between group"
                >
                  <span>Showcase Hub</span>
                  <span className="text-xs font-mono text-stone-500 group-hover:text-emerald-400">
                    /
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
                    /p1
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
                    /p2
                  </span>
                </Link>
              </li>
            </ul>

            <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mt-4 mb-1">
              Core Content
            </h4>
            <ul className="flex flex-col gap-2 text-xs text-stone-400">
              <li>
                <a href="#objectives" className="hover:text-stone-200 transition-colors">
                  5 Core Objectives (Advocacy, Waste, Resources)
                </a>
              </li>
              <li>
                <a href="#teams" className="hover:text-stone-200 transition-colors">
                  5 Operational Teams (Research, Design, Comms...)
                </a>
              </li>
              <li>
                <a href="#events" className="hover:text-stone-200 transition-colors">
                  4 Flagship Drives (DPS, Denim, Aarogi...)
                </a>
              </li>
              <li>
                <a href="#climate-tips" className="hover:text-stone-200 transition-colors">
                  11 Daily Actionable Climate Tips
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Direct Contacts & Articles */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-1">
              Direct Communication
            </h4>
            <div className="flex flex-col gap-2.5 text-xs text-stone-300">
              <a
                href="mailto:theavaniorg@gmail.com"
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>theavaniorg@gmail.com</span>
              </a>
              <a
                href="mailto:avaniyocc@gmail.com"
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors text-stone-400 pl-6"
              >
                <span>avaniyocc@gmail.com</span>
              </a>
              <a
                href="tel:+919119119307"
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors mt-1"
              >
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+91 91191 19307</span>
              </a>
              <a
                href="tel:+918050931769"
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors text-stone-400 pl-6"
              >
                <span>+91 8050931769</span>
              </a>
            </div>

            <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mt-4 mb-1">
              Substack Articles
            </h4>
            <div className="flex flex-col gap-2 text-xs">
              {SOCIAL_LINKS.articles.map((art, idx) => (
                <a
                  key={idx}
                  href={art.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors line-clamp-1"
                >
                  <BookOpen className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
                  <span className="truncate">{art.title}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Column 4: Community & Social Channels */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-1">
              Connect With Avani
            </h4>
            <p className="text-xs text-stone-400">
              Follow our student community, watch live campaign reels, and read climate policy investigations across our networks.
            </p>

            <div className="flex items-center gap-3">
              <a
                href={SOCIAL_LINKS.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-800/40 text-stone-300 hover:text-emerald-300 hover:border-emerald-500 transition-all"
                aria-label="Avani LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.substack}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-800/40 text-stone-300 hover:text-emerald-300 hover:border-emerald-500 transition-all"
                aria-label="Avani Substack"
              >
                <BookOpen className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-800/40 text-stone-300 hover:text-emerald-300 hover:border-emerald-500 transition-all"
                aria-label="Avani Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>

            <div className="mt-2 p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/20 text-xs text-stone-400 flex flex-col gap-1.5">
              <span className="font-semibold text-white">Canva Mood Board Reference:</span>
              <span className="text-[11px] leading-relaxed">
                Idea 5 (Blume / Glow Garden) & Idea 10 (Blue Cyber Space) translated into WebGL prototypes.
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar / Copyright */}
        <div className="mt-12 pt-8 border-t border-emerald-900/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© 2025 Avani. Earth In Our Hands. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Next.js 14 · Three.js · React Three Fiber · GSAP</span>
            <button
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
```

---

### 2.3 Smooth Scrolling Hook with GSAP Integration (`src/hooks/useLenis.ts`)

#### Architectural Highlights:
- **Zero SSR Context Hazards**: Safely initialises inside `useEffect` with strict `typeof window !== 'undefined'` guard.
- **Unified RAF Ticker Sync**: Synchronizes Lenis inertial wheel physics directly into GSAP's `gsap.ticker.add()`.
- **Zero Lag Smoothing**: Calls `gsap.ticker.lagSmoothing(0)` to prevent scrub jitter or camera snapping when returning from background tabs.
- **Full Teardown Safety**: Disconnects ticker listeners and calls `lenis.destroy()` on unmount.
- **Convenience Export**: Provides programmatic `scrollTo(target, options)` helper for jump links.

#### Production-Ready Implementation Blueprint:

```ts
'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface UseLenisOptions {
  duration?: number;
  easing?: (t: number) => number;
  smoothWheel?: boolean;
  touchMultiplier?: number;
}

export function useLenis(options?: UseLenisOptions) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const lenis = new Lenis({
      duration: options?.duration ?? 1.2,
      easing:
        options?.easing ?? ((t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: options?.smoothWheel ?? true,
      touchMultiplier: options?.touchMultiplier ?? 1.6,
    });

    lenisRef.current = lenis;

    // Connect Lenis scroll events to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Bind Lenis animation frame step to GSAP's high-precision ticker
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [options]);

  const scrollTo = (
    target: string | number | HTMLElement,
    scrollOptions?: { offset?: number; immediate?: boolean; duration?: number }
  ) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, scrollOptions);
    } else if (typeof window !== 'undefined') {
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' });
      } else if (typeof target === 'string') {
        const el = document.querySelector(target);
        el?.scrollIntoView({ behavior: 'smooth' });
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return { lenis: lenisRef.current, scrollTo };
}
```

---

### 2.4 Comparison Showcase Hub (`src/app/page.tsx`)

#### Architectural Highlights:
- **Hero Narrative**: Introduces Avani ("Earth In Our Hands") and presents the dual prototype philosophy—organic botanical warmth vs. futuristic planetary data telemetry.
- **Side-by-Side Dual Prototype Cards**:
  - **Prototype 1 ("The Living Canopy")**: Highlights Canva Idea 5, tea-green palette (`#D0E8C5`), procedural 3D tree, leaf scattering, and community grassroots warmth. Direct link to `/prototype-1`.
  - **Prototype 2 ("Eco-Tech Biosphere")**: Highlights Canva Idea 10, dark obsidian palette (`#080C0E`), 10,000-particle holographic Earth globe, rotating telemetry rings, and dark glassmorphic HUD. Direct link to `/prototype-2`.
- **Feature Comparison Matrix Table**:
  - Complete side-by-side technical breakdown across 8 key criteria: Aesthetic Vision, Mood Board Source, 3D WebGL Canvas, Particle & Lighting Shaders, Color System, Typography, Scroll Journey, and Emotional Resonance.
- **Avani Core Impact & Mission Section**:
  - 4 verified metrics: 5 Specialized Teams, 4 Flagship Drives, 11 Daily Climate Tips, 100% Student-Led.
  - Verbatim excerpt from official briefing PDF.
  - Full recruitment callout banner for Cohort 2025.

#### Production-Ready Implementation Blueprint:

```tsx
'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Trees, 
  Globe2, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Cpu, 
  HeartHandshake, 
  ShieldCheck, 
  ArrowUpRight 
} from 'lucide-react';
import { Navbar, GOOGLE_FORM_URL } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { useLenis } from '@/hooks/useLenis';

export default function ShowcaseHubPage() {
  useLenis();

  return (
    <div className="min-h-screen bg-[#FDFEFC] text-stone-900 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-950">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-10 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Avani Interactive 3D Showcase · 2 Creative Prototypes
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-serif tracking-tight text-stone-900 max-w-4xl mx-auto leading-[1.1]">
            Two Distinct Visions. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-[#163515] to-teal-700">
              One Living Planet.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Experience two radically different interactive 3D scroll experiences engineered for{' '}
            <strong className="text-stone-900 font-semibold">Avani</strong>, Bangalore’s student-led environmental organization. Explore the living tree canopy or the cyber eco-tech biosphere.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/prototype-1"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#163515] text-[#D0E8C5] hover:bg-[#0F2410] font-bold text-sm shadow-md transition-all duration-200 hover:scale-105"
            >
              <Trees className="w-4 h-4 text-emerald-400" />
              <span>Explore Prototype 1 (Canopy)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/prototype-2"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-slate-950 text-cyan-300 border border-cyan-500/30 hover:bg-slate-900 font-bold text-sm shadow-md transition-all duration-200 hover:scale-105"
            >
              <Globe2 className="w-4 h-4 text-cyan-400" />
              <span>Explore Prototype 2 (Eco-Tech)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Dual Side-by-Side Prototype Cards */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-10">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
              Choose an Experience to Explore
            </h2>
            <p className="text-sm text-stone-500 mt-2">
              Each prototype represents a complete, scroll-driven interactive 3D narrative.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
            {/* Prototype 1 Card: Living Canopy */}
            <div className="group relative rounded-3xl bg-gradient-to-b from-[#F2F7F4] to-[#E5EFE8] border border-emerald-900/10 p-8 sm:p-10 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="px-3 py-1 rounded-full bg-emerald-900/10 border border-emerald-900/20 text-emerald-900 text-xs font-mono font-semibold">
                    PROTOTYPE 01 · CANVA IDEA 5
                  </span>
                  <span className="text-xs font-mono text-stone-500">Route: /prototype-1</span>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 rounded-2xl bg-[#163515] text-[#D0E8C5] shadow-sm">
                    <Trees className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-serif text-[#163515]">
                      The Living Canopy
                    </h3>
                    <p className="text-xs text-emerald-800 font-medium">
                      Deep Lagoon & Botanical Editorial
                    </p>
                  </div>
                </div>

                <p className="text-sm text-stone-700 leading-relaxed mb-6">
                  Derived from Canva Mood Board Idea 5 ("WE GROW TREES AROUND THE WORLD"). An organic, tactile journey descending through sunlit tree canopies into tranquil reflecting waters, celebrating student grassroots community action.
                </p>

                <div className="space-y-2.5 mb-8 text-xs text-stone-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span><strong>3D Scene:</strong> Procedural Tree of Life with wind-responsive translucent foliage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span><strong>Atmosphere:</strong> Golden sunbeams, floating pollen spores & reflecting pond</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span><strong>Palette:</strong> Rainforest Dark (#163515), Tea Green (#D0E8C5), Cream (#F9FAF7)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span><strong>Tone:</strong> Warm, intimate, storytelling, editorial elegance</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['React Three Fiber', 'Procedural Wind', 'Canva Idea 5', 'Drei Sparkles', 'GSAP Scrub'].map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-white/80 border border-emerald-900/10 text-[11px] font-mono text-emerald-900 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href="/prototype-1"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-[#163515] hover:bg-[#0F2410] text-[#D0E8C5] font-bold text-sm shadow-md transition-all group-hover:gap-3"
                >
                  <span>Launch Living Canopy Prototype</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Prototype 2 Card: Eco-Tech Biosphere */}
            <div className="group relative rounded-3xl bg-gradient-to-b from-[#0B1317] to-[#060A0C] border border-cyan-500/30 p-8 sm:p-10 shadow-2xl flex flex-col justify-between overflow-hidden text-slate-100">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-mono font-semibold">
                    PROTOTYPE 02 · CYBER ADVOCACY
                  </span>
                  <span className="text-xs font-mono text-cyan-400/70">Route: /prototype-2</span>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 rounded-2xl bg-cyan-950 border border-cyan-400/30 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                    <Globe2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-serif text-white">
                      Eco-Tech Biosphere
                    </h3>
                    <p className="text-xs text-cyan-400 font-medium">
                      Planetary Telemetry & Cyber Dashboard
                    </p>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  An alternative cutting-edge direction inspired by Canva Mood Board Idea 10 ("Blue / A SPACE") and environmental telemetry, demonstrating data-driven youth leadership and climate science advocacy.
                </p>

                <div className="space-y-2.5 mb-8 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span><strong>3D Scene:</strong> 10,000-particle holographic Earth globe with simplex noise waves</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span><strong>Atmosphere:</strong> Rotating orbital telemetry rings & Bangalore coordinate beacon</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span><strong>Palette:</strong> Obsidian (#080C0E), Cyber Cyan (#06B6D4), Emerald (#10B981)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span><strong>Tone:</strong> High-tech, futuristic telemetry, dark glassmorphism, bold telemetry</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['10k Particles', 'Simplex Shaders', 'Orbital Rings', 'Glassmorphic HUD', 'Dark Mode'].map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-slate-900 border border-cyan-500/20 text-[11px] font-mono text-cyan-300 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href="/prototype-2"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-bold text-sm shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:brightness-110 transition-all group-hover:gap-3"
                >
                  <span>Launch Eco-Tech Biosphere Prototype</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Comparison Matrix Table */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-16">
          <div className="border border-stone-200 rounded-3xl bg-white p-6 sm:p-10 shadow-sm overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs uppercase font-mono tracking-wider text-emerald-800 font-semibold block mb-1">
                  Architecture & Design Comparison
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
                  Feature Matrix & Creative Parameters
                </h3>
              </div>
              <p className="text-xs text-stone-500 max-w-sm">
                Both prototypes share the complete verbatim Avani content catalog while offering radically distinct sensory experiences.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-stone-200 bg-stone-50/80 font-mono text-xs uppercase tracking-wider text-stone-600">
                    <th className="py-3.5 px-4 rounded-tl-xl">Design Dimension</th>
                    <th className="py-3.5 px-4 text-emerald-950 font-bold bg-emerald-50/50">
                      Prototype 1: Living Canopy
                    </th>
                    <th className="py-3.5 px-4 text-cyan-950 font-bold bg-cyan-50/50 rounded-tr-xl">
                      Prototype 2: Eco-Tech Biosphere
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  <tr>
                    <td className="py-4 px-4 font-semibold text-stone-800">Canva Mood Board Origin</td>
                    <td className="py-4 px-4 text-emerald-900 bg-emerald-50/20">Idea 5 ("WE GROW TREES AROUND THE WORLD")</td>
                    <td className="py-4 px-4 text-cyan-900 bg-cyan-50/20">Idea 10 ("Blue / A SPACE" Cyber Atmospheric)</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-semibold text-stone-800">3D WebGL Canvas</td>
                    <td className="py-4 px-4 text-stone-700 bg-emerald-50/20">Procedural 3D Tree of Life with organic spline branches</td>
                    <td className="py-4 px-4 text-stone-700 bg-cyan-50/20">10,000-particle holographic Earth globe with simplex noise</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-semibold text-stone-800">Scroll Camera Choreography</td>
                    <td className="py-4 px-4 text-stone-700 bg-emerald-50/20">Canopy descent down trunk to reflecting river pool</td>
                    <td className="py-4 px-4 text-stone-700 bg-cyan-50/20">Planetary telemetry orbit into Bangalore beacon</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-semibold text-stone-800">Visual Aesthetic</td>
                    <td className="py-4 px-4 text-stone-700 bg-emerald-50/20">Tactile organic editorial, soft-cornered card containers</td>
                    <td className="py-4 px-4 text-stone-700 bg-cyan-50/20">Dark glassmorphic HUD telemetry, glowing bioluminescent edges</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-semibold text-stone-800">Color System</td>
                    <td className="py-4 px-4 text-stone-700 bg-emerald-50/20">#163515 (Rainforest), #D0E8C5 (Tea Green), #F9FAF7</td>
                    <td className="py-4 px-4 text-stone-700 bg-cyan-50/20">#080C0E (Obsidian), #06B6D4 (Cyan), #10B981 (Emerald)</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-semibold text-stone-800">Primary Typography</td>
                    <td className="py-4 px-4 text-stone-700 bg-emerald-50/20">Serif Titles (Playfair / Cinzel) + Plus Jakarta Sans</td>
                    <td className="py-4 px-4 text-stone-700 bg-cyan-50/20">Display Sans (Space Grotesk) + JetBrains Mono</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-semibold text-stone-800">Interaction Model</td>
                    <td className="py-4 px-4 text-stone-700 bg-emerald-50/20">Storytelling chapters, gentle organic float, calm ripples</td>
                    <td className="py-4 px-4 text-stone-700 bg-cyan-50/20">Interactive telemetry nodes, orbital rotation, live metrics</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-semibold text-stone-800">SSR / WebGL Safety</td>
                    <td className="py-4 px-4 text-stone-700 bg-emerald-50/20">dynamic(() =&gt; import(...), &#123; ssr: false &#125;)</td>
                    <td className="py-4 px-4 text-stone-700 bg-cyan-50/20">dynamic(() =&gt; import(...), &#123; ssr: false &#125;)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Avani Mission & Impact Metrics Preview */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-12" id="about">
          <div className="bg-[#163515] text-[#D0E8C5] rounded-3xl p-8 sm:p-12 relative overflow-hidden">
            <div className="relative z-10 max-w-3xl">
              <span className="px-3 py-1 rounded-full bg-emerald-800/60 border border-emerald-500/30 text-emerald-200 text-xs font-mono uppercase tracking-wider mb-4 inline-block">
                Organization Overview
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-6">
                Avani: Bangalore's Youth Environmental Vanguard
              </h2>
              <blockquote className="text-base sm:text-lg text-emerald-100/90 italic leading-relaxed border-l-2 border-emerald-400 pl-4 mb-8">
                "Avani is a youth organization based in Bangalore, consisting of an enthusiastic team of students who are committed to making a change in the way we treat our environment. We share the ideal of a greener and cleaner India... even the small actions of many add up and bring a change to the world."
              </blockquote>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-emerald-800/60">
                <div>
                  <p className="text-3xl sm:text-4xl font-extrabold text-white font-mono">5</p>
                  <p className="text-xs text-emerald-300 mt-1">Specialized Teams</p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-extrabold text-white font-mono">4</p>
                  <p className="text-xs text-emerald-300 mt-1">Flagship Drives</p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-extrabold text-white font-mono">11</p>
                  <p className="text-xs text-emerald-300 mt-1">Climate Action Tips</p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-extrabold text-white font-mono">100%</p>
                  <p className="text-xs text-emerald-300 mt-1">Student Operated</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
```

---

### 2.5 Prototype Shell Stubs

#### Prototype 1 Shell (`src/app/prototype-1/page.tsx`)
```tsx
'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { useLenis } from '@/hooks/useLenis';
import { Trees, Sparkles, ArrowDown } from 'lucide-react';

// Dynamically load WebGL Canvas with SSR completely disabled
const P1ScenePlaceholder = dynamic(
  () =>
    Promise.resolve(() => (
      <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-emerald-950/20 to-teal-900/20">
        <div className="w-16 h-16 rounded-full bg-emerald-800/30 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 animate-pulse">
          <Trees className="w-8 h-8" />
        </div>
        <p className="text-xs font-mono uppercase tracking-widest text-emerald-700 font-semibold">
          React Three Fiber Canvas (Milestone M4)
        </p>
        <p className="text-xs text-stone-500 mt-1 max-w-sm">
          Procedural Tree of Life, Translucent Foliage & Reflecting Pond Canvas will mount here.
        </p>
      </div>
    )),
  { ssr: false }
);

export default function Prototype1Page() {
  useLenis();

  return (
    <div className="min-h-screen bg-[#F9FAF7] text-[#163515] flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-950">
      <Navbar />

      <main className="flex-grow pt-20">
        {/* Fixed 3D Canvas Background Container */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
          <P1ScenePlaceholder />
        </div>

        {/* Foreground Scroll Chapters Overlay */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-24">
          {/* Chapter 1: Canopy Hero */}
          <section className="min-h-[70vh] flex flex-col justify-center items-center text-center">
            <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs font-mono font-semibold uppercase tracking-wider mb-4 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
              Prototype 1: The Living Canopy
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif font-extrabold text-[#163515] max-w-3xl leading-tight">
              Rooted in Purpose. <br />Growing for Tomorrow.
            </h1>
            <p className="mt-4 text-base sm:text-lg text-stone-600 max-w-xl">
              An organic, tactile narrative derived from Canva Idea 5. Journey down the Living Tree from sunlit leaves into a serene forest pool.
            </p>
            <div className="mt-8 flex items-center gap-2 text-xs font-mono text-emerald-800">
              <ArrowDown className="w-4 h-4 animate-bounce" />
              <span>Scroll to traverse the canopy</span>
            </div>
          </section>

          {/* Chapter 2: The 5 Objectives */}
          <section id="objectives" className="rounded-3xl bg-white/90 border border-emerald-900/10 p-8 sm:p-12 shadow-sm backdrop-blur-md">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#163515] mb-4">
              Our 5 Core Objectives
            </h2>
            <p className="text-sm text-stone-600 mb-6">
              Driving actionable environmental restoration across Bangalore and India.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100">
                <span className="font-bold block text-sm mb-1 text-emerald-950">1. Climate Advocacy</span>
                <span>Advocating for urgent, sustained actions against climate change.</span>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100">
                <span className="font-bold block text-sm mb-1 text-emerald-950">2. Resource Restoration</span>
                <span>Upliftment and ecological regeneration of India's natural resources.</span>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100">
                <span className="font-bold block text-sm mb-1 text-emerald-950">3. Pollution Mitigation</span>
                <span>Raising a sustained voice against pollution in all environmental spheres.</span>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100">
                <span className="font-bold block text-sm mb-1 text-emerald-950">4. Waste Intelligence</span>
                <span>Ensuring effective, circular waste management practices are put into use.</span>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100">
                <span className="font-bold block text-sm mb-1 text-emerald-950">5. Movement Amplification</span>
                <span>Promoting sustainable brands and environmental activist campaigns.</span>
              </div>
            </div>
          </section>

          {/* Chapter 3: The 5 Teams */}
          <section id="teams" className="rounded-3xl bg-white/90 border border-emerald-900/10 p-8 sm:p-12 shadow-sm backdrop-blur-md">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#163515] mb-4">
              The 5 Specialized Teams
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <span className="font-bold block text-sm mb-1 text-stone-900">Research & Writing</span>
                <span>Investigating environmental issues and drafting policy articles for Substack.</span>
              </div>
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <span className="font-bold block text-sm mb-1 text-stone-900">Design</span>
                <span>Crafting visual identity, campaign graphics, and educational UI assets.</span>
              </div>
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <span className="font-bold block text-sm mb-1 text-stone-900">HR & Communications</span>
                <span>Coordinating member recruitment, team culture, and internal sync.</span>
              </div>
              <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                <span className="font-bold block text-sm mb-1 text-stone-900">Social Media & Events</span>
                <span>Direct community drives, school cleanups, and social engagement reels.</span>
              </div>
            </div>
          </section>

          {/* Chapter 4: 4 Flagship Events */}
          <section id="events" className="rounded-3xl bg-white/90 border border-emerald-900/10 p-8 sm:p-12 shadow-sm backdrop-blur-md">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#163515] mb-4">
              Events in Action
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-100">
                <span className="font-bold block text-sm mb-1 text-emerald-900">DPS Donation Drive</span>
                <span>Uniting students and faculty to supply essential clothing and goods.</span>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-100">
                <span className="font-bold block text-sm mb-1 text-emerald-900">Invictus Denim Stall</span>
                <span>Sustainable fashion and upcycled denim creations at youth cultural fest.</span>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-100">
                <span className="font-bold block text-sm mb-1 text-emerald-900">Orphanage Donation Drive (Aarogi)</span>
                <span>Partnership providing learning kits and support for underprivileged kids.</span>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-100">
                <span className="font-bold block text-sm mb-1 text-emerald-900">Beyond the Waste Workshop</span>
                <span>Interactive hands-on session turning discarded plastics into planters.</span>
              </div>
            </div>
          </section>

          {/* Chapter 5: 11 Climate Tips & CTA */}
          <section id="climate-tips" className="rounded-3xl bg-[#163515] text-[#D0E8C5] p-8 sm:p-12 shadow-xl mb-12">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4">
              11 Daily Climate Tips
            </h2>
            <p className="text-xs text-emerald-300 mb-6">
              Small actions by many add up to monumental global transformation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-8">
              {[
                '1. Switch off lights, fans, and electronics when leaving a room.',
                '2. Unplug chargers and appliances when not in use.',
                '3. Turn off the tap while brushing your teeth or shaving.',
                '4. Carry a reusable bottle, bag, and container.',
                '5. Compost vegetable peels and food scraps.',
                '6. Plan meals and use leftovers to eliminate waste.',
                '7. Repair, reuse, or donate items instead of buying new.',
                '8. Run dishwashers and washing machines only when full.',
                '9. Decline extra packaging and single-use plastic.',
                '10. Repurpose glass jars and sturdy containers.',
                '11. Print double-sided or go completely paperless.',
              ].map((tip, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-800/40">
                  {tip}
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
```

#### Prototype 2 Shell (`src/app/prototype-2/page.tsx`)
```tsx
'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { useLenis } from '@/hooks/useLenis';
import { Globe2, Shield, ArrowDown, Activity } from 'lucide-react';

// Dynamically load WebGL Canvas with SSR completely disabled
const P2ScenePlaceholder = dynamic(
  () =>
    Promise.resolve(() => (
      <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-slate-950 to-[#080C0E]">
        <div className="w-16 h-16 rounded-full bg-cyan-950 border border-cyan-400/40 flex items-center justify-center text-cyan-300 mb-4 animate-pulse shadow-[0_0_20px_rgba(6,182,212,0.3)]">
          <Globe2 className="w-8 h-8" />
        </div>
        <p className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">
          React Three Fiber Biosphere Canvas (Milestone M5)
        </p>
        <p className="text-xs text-slate-500 mt-1 max-w-sm">
          10,000-particle holographic Earth globe, rotating orbital rings, and Bangalore telemetry beacon will mount here.
        </p>
      </div>
    )),
  { ssr: false }
);

export default function Prototype2Page() {
  useLenis();

  return (
    <div className="min-h-screen bg-[#080C0E] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      <Navbar />

      <main className="flex-grow pt-20">
        {/* Fixed 3D Canvas Background Container */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
          <P2ScenePlaceholder />
        </div>

        {/* Foreground Scroll Chapters Overlay (Glassmorphic HUD) */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-24">
          {/* Chapter 1: Telemetry Hero HUD */}
          <section className="min-h-[70vh] flex flex-col justify-center items-center text-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-mono font-semibold uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Bangalore Beacon Telemetry · 12.9716° N, 77.5946° E</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold font-serif text-white max-w-3xl leading-tight">
              Planetary Care. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                Powered by Student Intelligence.
              </span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-xl">
              An alternative cyber-environmental direction. Exploring the intersection of data research, youth advocacy, and planetary boundary defense.
            </p>

            <div className="mt-8 flex items-center gap-2 text-xs font-mono text-cyan-400">
              <ArrowDown className="w-4 h-4 animate-bounce" />
              <span>Scroll to initiate orbital scan</span>
            </div>
          </section>

          {/* Chapter 2: The 5 Systems Objectives */}
          <section id="objectives" className="rounded-3xl bg-slate-900/80 border border-cyan-500/20 p-8 sm:p-12 shadow-2xl backdrop-blur-md">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
              Systems Objectives
            </h2>
            <p className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-6">
              Operational Directives for Planetary Health
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30">
                <span className="text-cyan-400 block font-bold text-sm mb-1">01 // Climate Advocacy</span>
                <span className="text-slate-300">Targeted policy pressure and youth community mobilisation.</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30">
                <span className="text-cyan-400 block font-bold text-sm mb-1">02 // Resource Restoration</span>
                <span className="text-slate-300">Ecological revival of natural lakes and catchment zones.</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30">
                <span className="text-cyan-400 block font-bold text-sm mb-1">03 // Pollution Defense</span>
                <span className="text-slate-300">Continuous monitoring and direct action across urban air and soil.</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30">
                <span className="text-cyan-400 block font-bold text-sm mb-1">04 // Waste Intelligence</span>
                <span className="text-slate-300">Implementing circular systems and zero-landfill protocols.</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/80 border border-cyan-500/30">
                <span className="text-cyan-400 block font-bold text-sm mb-1">05 // Movement Broadcast</span>
                <span className="text-slate-300">Amplifying ethical brands and global grassroots vanguards.</span>
              </div>
            </div>
          </section>

          {/* Chapter 3: 5 Operational Units */}
          <section id="teams" className="rounded-3xl bg-slate-900/80 border border-cyan-500/20 p-8 sm:p-12 shadow-2xl backdrop-blur-md">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
              Operational Squads
            </h2>
            <p className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-6">
              Interdisciplinary Student Execution Units
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-emerald-400 font-bold block text-sm mb-1">UNIT // Research & Writing</span>
                <span className="text-slate-300">Data verification, investigative notes, and Substack science publishing.</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-emerald-400 font-bold block text-sm mb-1">UNIT // Design & Media</span>
                <span className="text-slate-300">Visual communications, campaign UI, and high-impact identity assets.</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-emerald-400 font-bold block text-sm mb-1">UNIT // People & Logistics</span>
                <span className="text-slate-300">Cadre onboarding, communications, and inter-unit operational coordination.</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                <span className="text-emerald-400 font-bold block text-sm mb-1">UNIT // Field & Events</span>
                <span className="text-slate-300">Direct on-ground donation drives, school workshops, and campus activations.</span>
              </div>
            </div>
          </section>

          {/* Chapter 4: 4 Missions */}
          <section id="events" className="rounded-3xl bg-slate-900/80 border border-cyan-500/20 p-8 sm:p-12 shadow-2xl backdrop-blur-md">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
              Completed Field Missions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30">
                <span className="text-cyan-300 font-bold block text-sm mb-1">MISSION // DPS Donation Drive</span>
                <span className="text-slate-300">Mobilising school communities for essential resource redistribution.</span>
              </div>
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30">
                <span className="text-cyan-300 font-bold block text-sm mb-1">MISSION // Invictus Denim Upcycling</span>
                <span className="text-slate-300">Circular textile transformation at collegiate youth cultural summit.</span>
              </div>
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30">
                <span className="text-cyan-300 font-bold block text-sm mb-1">MISSION // Aarogi Child Care Support</span>
                <span className="text-slate-300">Educational supply distributions and community care initiatives.</span>
              </div>
              <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30">
                <span className="text-cyan-300 font-bold block text-sm mb-1">MISSION // Beyond the Waste Lab</span>
                <span className="text-slate-300">Practical hands-on maker workshops converting discarded material.</span>
              </div>
            </div>
          </section>

          {/* Chapter 5: 11 Planetary Protocols & CTA */}
          <section id="climate-tips" className="rounded-3xl bg-slate-950 border border-cyan-400/40 p-8 sm:p-12 shadow-[0_0_30px_rgba(6,182,212,0.15)] mb-12">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-cyan-400" />
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                11 Planetary Protocols
              </h2>
            </div>
            <p className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-6">
              Daily Operating Procedures for Ecological Equilibrium
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono mb-8">
              {[
                '01 // De-energise idle electronics & lighting circuits.',
                '02 // Sever parasitic power by disconnecting idle charging bricks.',
                '03 // Restrict water flow during hygiene routines.',
                '04 // Deploy durable reusable vessels; reject single-use containers.',
                '05 // Divert biomass to compost; prevent landfill methane generation.',
                '06 // Optimize caloric planning; reduce food supply wastage.',
                '07 // Repair hardware & donate textiles; prolong material lifespans.',
                '08 // Restrict laundry appliances to full-load cycles only.',
                '09 // Reject single-use polymer packaging and superfluous printouts.',
                '10 // Reclaim industrial glassware for persistent dry storage.',
                '11 // Enforce duplex printing or transition to digital documents.',
              ].map((tip, i) => (
                <div key={i} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                  {tip}
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
```

---

## 3. Hydration Safety & Build Verification Plan

### 3.1 SSR Isolation Guarantee
Because Three.js and React Three Fiber depend on WebGL context, `HTMLCanvasElement`, and window event listeners that do not exist in Node.js server environments, the architecture mandates:
1. Dynamic component imports with `{ ssr: false }` for all 3D scene modules.
2. The dynamic wrapper includes a lightweight, visually integrated placeholder skeleton matching the prototype's background palette to prevent Cumulative Layout Shift (CLS).
3. Client components enforce `'use client'` at the file header.

### 3.2 Verification Method & Test Commands
To independently verify the implementation:

```bash
# 1. Typecheck and verify build compilation
npm run build

# 2. Run Next.js linting
npm run lint

# 3. Test HTTP route availability on local dev server
npm run dev &
DEV_PID=$!
sleep 5

# Verify status 200 for all three routes
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/prototype-1
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/prototype-2

kill $DEV_PID
```

---

## 4. Conclusion & Next Steps

This specification provides the implementer worker with complete, drop-in TypeScript components for:
- `src/components/common/Navbar.tsx` (Navbar with sticky/integrated switcher and mobile drawer)
- `src/components/common/Footer.tsx` (Comprehensive multi-column footer with all contacts and social links)
- `src/hooks/useLenis.ts` (Smooth scroll hook with GSAP Ticker synchronization)
- `src/app/page.tsx` (Showcase Hub with side-by-side cards, comparison matrix, and Avani mission preview)
- `src/app/prototype-1/page.tsx` (Living Canopy stub)
- `src/app/prototype-2/page.tsx` (Eco-Tech Biosphere stub)

All components strictly adhere to the brand guidelines, external link contracts, and Next.js 14 App Router standards.
