'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  ArrowUpRight, 
  LayoutGrid, 
  Trees, 
  Globe2, 
  Mail, 
  Phone,
  Sparkles,
  Sun,
  Moon
} from 'lucide-react';
import { EXTERNAL_LINKS } from '@/lib/avaniContent';
import { useAvaniTheme } from '@/components/bleibtgleich/ThemeTransitionOverlay';

export interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'About', href: '/#about' },
  { label: 'Objectives', href: '/#objectives' },
  { label: 'Teams', href: '/#teams' },
  { label: 'Events', href: '/#events' },
  { label: 'Climate Tips', href: '/#climate-tips' },
];

export const PROTOTYPES = [
  {
    id: 'editorial',
    label: 'Avani Editorial',
    shortLabel: 'Editorial',
    href: '/',
    icon: Sparkles,
    desc: 'Swiss Botanical Flagship',
  },
  {
    id: 'hub',
    label: 'Showcase Hub',
    shortLabel: 'Hub',
    href: '/hub',
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

export const GOOGLE_FORM_URL = EXTERNAL_LINKS.applicationForm;

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isNight, toggleTheme } = useAvaniTheme();

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
  const isEditorialNight = pathname === '/' && isNight;

  // Dynamic theme wrapper classes based on active route & Editorial theme state
  const themeClasses = isP2
    ? 'bg-[#080C0E]/90 border-cyan-500/20 text-slate-100 shadow-[0_4px_30px_rgba(6,182,212,0.08)]'
    : isEditorialNight
    ? 'bg-[#08140B]/90 border-[#6EE7B7]/20 text-[#DCE7D4] shadow-[0_4px_30px_rgba(16,185,129,0.08)]'
    : isP1 || pathname === '/'
    ? 'bg-[#F9FAF7]/90 border-[#163515]/15 text-[#163515] shadow-[0_4px_30px_rgba(22,53,21,0.06)]'
    : 'bg-white/90 border-stone-200/80 text-stone-900 shadow-sm';

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
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-600/40 shadow-sm transition-transform duration-300 group-hover:scale-105 shrink-0 bg-[#163515]">
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
            <nav
              aria-label="Prototype switcher"
              className={`hidden md:flex items-center p-1 rounded-full border transition-all ${
                isP2
                  ? 'bg-slate-900/90 border-cyan-500/30'
                  : isEditorialNight
                  ? 'bg-[#0D200C]/90 border-[#6EE7B7]/30'
                  : 'bg-stone-100/90 border-stone-200/90'
              }`}
            >
              {PROTOTYPES.map((proto) => {
                const Icon = proto.icon;
                const isActive = pathname === proto.href;

                let activeStyle = '';
                if (isActive) {
                  if (proto.id === 'p1' || proto.id === 'editorial') {
                    activeStyle = isEditorialNight
                      ? 'bg-[#6EE7B7] text-[#08140B] font-semibold'
                      : 'bg-[#163515] text-[#D0E8C5] shadow-[0_2px_10px_rgba(22,53,21,0.3)] font-semibold';
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
                    : isEditorialNight
                    ? 'text-[#8FA882] hover:text-[#DCE7D4] hover:bg-[#163515]/50'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60';
                }

                return (
                  <Link
                    key={proto.id}
                    href={proto.href}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full transition-all duration-200 whitespace-nowrap ${activeStyle}`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{proto.shortLabel}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Navigation Links, Editorial Theme Toggle & Cohort CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <nav aria-label="Page sections" className="flex items-center gap-3.5 text-xs xl:text-sm font-medium">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`whitespace-nowrap transition-colors duration-150 ${
                      isP2
                        ? 'text-slate-300 hover:text-cyan-300'
                        : isEditorialNight
                        ? 'text-[#DCE7D4]/80 hover:text-[#6EE7B7]'
                        : 'text-stone-600 hover:text-emerald-800'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {pathname === '/' && (
                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label="Toggle Daylight or GlowNight editorial theme"
                  className={`p-2 rounded-full border transition-colors ${
                    isEditorialNight
                      ? 'border-[#6EE7B7]/30 text-[#6EE7B7] hover:bg-[#0D200C]'
                      : 'border-[#163515]/20 text-[#163515] hover:bg-[#DCE7D4]'
                  }`}
                >
                  {isEditorialNight ? (
                    <Sun className="w-3.5 h-3.5" />
                  ) : (
                    <Moon className="w-3.5 h-3.5" />
                  )}
                </button>
              )}

              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-200 shadow-sm whitespace-nowrap ${
                  isP2
                    ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 hover:brightness-110 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    : isEditorialNight
                    ? 'bg-[#6EE7B7] text-[#08140B] hover:bg-[#10B981]'
                    : 'bg-[#163515] text-[#D0E8C5] hover:bg-[#0F2410] hover:text-white'
                }`}
              >
                <span>Join Cohort 2025</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile Actions: CTA & Hamburger */}
            <div className="flex lg:hidden items-center gap-2">
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
          className={`fixed inset-0 z-40 pt-20 px-6 pb-8 lg:hidden overflow-y-auto transition-all ${
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
                <a href={EXTERNAL_LINKS.emailMailto}>{EXTERNAL_LINKS.email}</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5" />
                <a href={EXTERNAL_LINKS.phoneTel}>{EXTERNAL_LINKS.phoneFormatted}</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
