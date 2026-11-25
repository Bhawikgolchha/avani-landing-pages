'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Menu, 
  X, 
  ArrowUpRight, 
  Mail, 
  Phone,
  Instagram,
  Linkedin,
  BookOpen,
  Sparkles,
  Sun,
  Moon,
  ChevronDown,
  HandHeart
} from 'lucide-react';
import { EXTERNAL_LINKS } from '@/lib/avaniContent';
import { useAvaniTheme } from '@/components/bleibtgleich/ThemeTransitionOverlay';

export interface NavLink {
  label: string;
  href: string;
  highlight?: boolean;
  hasAboutMenu?: boolean;
  hasEventsMenu?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { label: 'About', href: '/#about', hasAboutMenu: true },
  { label: 'Objectives', href: '/#objectives' },
  { label: 'Teams', href: '/#teams' },
  { label: 'Events', href: '/#events', hasEventsMenu: true },
  { label: 'Publications', href: '/#publications' },
  { label: 'Climate Quiz', href: '/quiz', highlight: true },
  { label: 'Join Us', href: '/#apply' },
];

export const GOOGLE_FORM_URL = EXTERNAL_LINKS.applicationForm;

export function Navbar() {
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

  const bgClasses = isNight
    ? scrolled
      ? 'bg-[#0E1610]/95 backdrop-blur-md border-b border-[#86B87A]/20 shadow-sm py-3 text-[#DCE7D4]'
      : 'bg-[#0E1610]/80 backdrop-blur-sm border-b border-transparent py-4 text-[#DCE7D4]'
    : scrolled
      ? 'bg-white/95 backdrop-blur-md border-b border-[#54683C]/15 shadow-sm py-3 text-[#163515]'
      : 'bg-[#F9FAF7]/85 backdrop-blur-sm border-b border-transparent py-4 text-[#163515]';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bgClasses}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand Identity with Olive Green Background */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <div className={`relative w-11 h-11 rounded-full overflow-hidden shadow-sm transition-transform duration-200 group-hover:scale-105 shrink-0 flex items-center justify-center p-1 ${
              isNight
                ? 'bg-[#263419] border border-[#86B87A]/40'
                : 'bg-[#364724] border border-[#4E6334]'
            }`}>
              <Image
                src="/assets/branding/avani_logo_transparent.png"
                alt="Avani Official Emblem"
                width={44}
                height={44}
                priority
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-2xl tracking-tight leading-none">
                Avani
              </span>
              <span className={`text-[10px] font-normal mt-0.5 ${isNight ? 'text-[#A7F3D0]' : 'text-[#54683C]'}`}>
                Bangalore Youth Climate Collective
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) =>
              link.hasAboutMenu ? (
                <div key={link.label} className="relative group">
                  <Link
                    href={link.href}
                    className={`text-sm font-medium transition-colors relative py-1 flex items-center gap-1 ${
                      isNight
                        ? 'text-stone-300 hover:text-white'
                        : 'text-stone-700 hover:text-[#163515]'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-70 transition-transform group-hover:rotate-180" />
                  </Link>
                  <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150 absolute left-0 top-full pt-2 w-52 z-50">
                    <div className={`rounded-xl border shadow-lg p-1.5 ${
                      isNight ? 'bg-[#141F16] border-white/10 text-[#ECEFE9]' : 'bg-white border-stone-200 text-[#163515]'
                    }`}>
                      <Link
                        href="/#about"
                        className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isNight ? 'hover:bg-white/5' : 'hover:bg-stone-100'
                        }`}
                      >
                        About Avani
                      </Link>
                      <Link
                        href="/how-we-work"
                        className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isNight ? 'hover:bg-white/5 text-[#86B87A]' : 'hover:bg-[#DCE7D4]/50 text-[#364724]'
                        }`}
                      >
                        How We Work
                      </Link>
                      <Link
                        href="/members"
                        className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isNight ? 'hover:bg-white/5 text-[#86B87A]' : 'hover:bg-[#DCE7D4]/50 text-[#364724]'
                        }`}
                      >
                        Our Members
                      </Link>
                    </div>
                  </div>
                </div>
              ) : link.hasEventsMenu ? (
                <div key={link.label} className="relative group">
                  <Link
                    href={link.href}
                    className={`text-sm font-medium transition-colors relative py-1 flex items-center gap-1 ${
                      isNight
                        ? 'text-stone-300 hover:text-white'
                        : 'text-stone-700 hover:text-[#163515]'
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronDown className="w-3.5 h-3.5 opacity-70 transition-transform group-hover:rotate-180" />
                  </Link>
                  <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150 absolute left-0 top-full pt-2 w-60 z-50">
                    <div className={`rounded-xl border shadow-lg p-1.5 ${
                      isNight ? 'bg-[#141F16] border-white/10 text-[#ECEFE9]' : 'bg-white border-stone-200 text-[#163515]'
                    }`}>
                      <Link
                        href="/#events"
                        className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isNight ? 'hover:bg-white/5' : 'hover:bg-stone-100'
                        }`}
                      >
                        Explore All Events
                      </Link>
                      <Link
                        href="/volunteer"
                        className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          isNight ? 'hover:bg-white/5 text-[#86B87A]' : 'hover:bg-[#DCE7D4]/50 text-[#364724]'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <HandHeart className="w-3.5 h-3.5" />
                          <span>Volunteer at Events</span>
                        </span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          isNight ? 'bg-[#86B87A]/20 text-[#86B87A]' : 'bg-[#DCE7D4] text-[#163515]'
                        }`}>
                          Join
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium transition-colors relative py-1 flex items-center gap-1.5 ${
                    link.highlight
                      ? isNight
                        ? 'text-[#86B87A] hover:text-white font-semibold bg-[#223425] px-3.5 py-1 rounded-full border border-[#86B87A]/40 shadow-sm'
                        : 'text-[#54683C] hover:text-[#163515] font-semibold bg-[#DCE7D4]/60 px-3.5 py-1 rounded-full border border-[#54683C]/20'
                      : isNight
                        ? 'text-stone-300 hover:text-white hover:font-semibold'
                        : 'text-stone-700 hover:text-[#163515] hover:font-semibold'
                  }`}
                >
                  {link.highlight && <Sparkles className="w-3.5 h-3.5" />}
                  <span>{link.label}</span>
                </Link>
              )
            )}
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Social Shortcuts */}
            <div className={`hidden xl:flex items-center gap-1.5 border-r pr-3 ${isNight ? 'border-white/10' : 'border-stone-200'}`}>
              <a
                href={EXTERNAL_LINKS.instagramClean}
                target="_blank"
                rel="noopener noreferrer"
                title="Avani on Instagram"
                className={`p-2 rounded-full transition-colors ${isNight ? 'text-stone-400 hover:text-[#86B87A] hover:bg-white/5' : 'text-stone-500 hover:text-[#54683C] hover:bg-[#DCE7D4]/50'}`}
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={EXTERNAL_LINKS.substack}
                target="_blank"
                rel="noopener noreferrer"
                title="Avani Substack"
                className={`p-2 rounded-full transition-colors ${isNight ? 'text-stone-400 hover:text-[#86B87A] hover:bg-white/5' : 'text-stone-500 hover:text-[#54683C] hover:bg-[#DCE7D4]/50'}`}
              >
                <BookOpen className="w-4 h-4" />
              </a>
              <a
                href={EXTERNAL_LINKS.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                title="Avani LinkedIn"
                className={`p-2 rounded-full transition-colors ${isNight ? 'text-stone-400 hover:text-[#86B87A] hover:bg-white/5' : 'text-stone-500 hover:text-[#54683C] hover:bg-[#DCE7D4]/50'}`}
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            {/* SINGLE Sun/Moon Theme Toggle (Exactly one instance across all screen sizes) */}
            <button
              type="button"
              onClick={toggleTheme}
              title={isNight ? 'Switch to Daylight' : 'Switch to Fireflies Night Mode'}
              className={`p-2.5 rounded-full transition-all duration-300 flex items-center justify-center ${
                isNight
                  ? 'bg-[#163515] text-amber-300 hover:bg-[#1f471e] border border-[#86B87A]/30 shadow-[0_0_15px_rgba(110,231,183,0.3)]'
                  : 'bg-stone-100 text-stone-600 hover:text-[#54683C] hover:bg-[#DCE7D4]/60 border border-stone-200/80'
              }`}
              aria-label="Toggle Night Mode"
            >
              {isNight ? <Moon className="w-4 h-4 text-amber-300" /> : <Sun className="w-4 h-4" />}
            </button>

            {/* Primary Apply Button */}
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 ${
                isNight
                  ? 'bg-[#86B87A] hover:bg-[#97C98B] text-[#0E1610]'
                  : 'bg-[#163515] hover:bg-[#254d24] text-white'
              }`}
            >
              <span>Apply to Join</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {/* Mobile Hamburger (lg:hidden) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-xl lg:hidden transition-colors focus:outline-none ${
                isNight ? 'text-stone-300 hover:text-white hover:bg-white/10' : 'text-stone-700 hover:text-[#163515] hover:bg-stone-100'
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-b px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-4 duration-200 ${
          isNight ? 'bg-[#0E1610]/98 border-[#86B87A]/20 text-[#DCE7D4]' : 'bg-white/98 border-stone-200 text-stone-900'
        }`}>
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <React.Fragment key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 rounded-lg text-base font-medium transition-colors flex items-center justify-between ${
                    link.highlight
                      ? isNight ? 'bg-[#223425] text-[#86B87A] font-semibold' : 'bg-[#DCE7D4]/70 text-[#163515] font-semibold'
                      : isNight ? 'text-stone-200 hover:bg-white/5' : 'text-stone-800 hover:bg-emerald-50'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.highlight && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${isNight ? 'bg-[#86B87A] text-[#0E1610]' : 'bg-[#54683C] text-white'}`}>
                      Quiz
                    </span>
                  )}
                </Link>
                {link.hasAboutMenu && (
                  <div className="ml-4 flex flex-col gap-1">
                    <Link
                      href="/how-we-work"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isNight ? 'text-[#86B87A] hover:bg-white/5' : 'text-[#364724] hover:bg-[#DCE7D4]/40'
                      }`}
                    >
                      How We Work
                    </Link>
                    <Link
                      href="/members"
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isNight ? 'text-[#86B87A] hover:bg-white/5' : 'text-[#364724] hover:bg-[#DCE7D4]/40'
                      }`}
                    >
                      Our Members
                    </Link>
                  </div>
                )}
                {link.hasEventsMenu && (
                  <Link
                    href="/volunteer"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`ml-4 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                      isNight ? 'text-[#86B87A] hover:bg-white/5' : 'text-[#364724] hover:bg-[#DCE7D4]/40'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <HandHeart className="w-3.5 h-3.5" />
                      <span>Volunteer at Events</span>
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${isNight ? 'bg-[#86B87A]/20 text-[#86B87A]' : 'bg-[#DCE7D4] text-[#163515]'}`}>
                      Join
                    </span>
                  </Link>
                )}
              </React.Fragment>
            ))}
          </nav>

          <div className="mt-4 pt-4 border-t border-stone-100/20 flex flex-col gap-3">
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className={`w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm font-semibold shadow-md active:scale-98 transition-all ${
                isNight ? 'bg-[#86B87A] text-[#0E1610]' : 'bg-[#163515] text-white'
              }`}
            >
              <span>Apply to Join Avani</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <div className="flex items-center justify-around pt-2 text-stone-400">
              <a href={EXTERNAL_LINKS.instagramClean} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs hover:text-[#54683C]">
                <Instagram className="w-4 h-4" />
                <span>Instagram</span>
              </a>
              <a href={EXTERNAL_LINKS.substack} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs hover:text-[#54683C]">
                <BookOpen className="w-4 h-4" />
                <span>Substack</span>
              </a>
              <a href={EXTERNAL_LINKS.linkedIn} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs hover:text-[#54683C]">
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
