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
  BookOpen
} from 'lucide-react';
import { EXTERNAL_LINKS } from '@/lib/avaniContent';

export interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Objectives', href: '#objectives' },
  { label: 'Teams', href: '#teams' },
  { label: 'Events', href: '#events' },
  { label: 'Climate Tips', href: '#climate-tips' },
  { label: 'Publications', href: '#publications' },
  { label: 'Join Us', href: '#apply' },
];

export const GOOGLE_FORM_URL = EXTERNAL_LINKS.applicationForm;

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-emerald-900/10 shadow-sm py-3'
          : 'bg-white/80 backdrop-blur-sm border-b border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-emerald-200/80 bg-emerald-50/60 shadow-sm transition-transform duration-200 group-hover:scale-105 shrink-0 flex items-center justify-center">
              <Image
                src="/assets/branding/avani_logo_transparent.png"
                alt="Avani Official Emblem"
                width={44}
                height={44}
                priority
                className="object-contain p-0.5"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-2xl tracking-tight text-[#163515] leading-none">
                Avani
              </span>
              <span className="text-[10px] font-medium text-emerald-800 tracking-wider uppercase mt-1">
                Bangalore Youth Climate Collective
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-stone-700 hover:text-[#163515] transition-colors relative py-1 hover:font-semibold"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Right Action Area */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Social Shortcuts */}
            <div className="hidden xl:flex items-center gap-2 border-r border-stone-200 pr-3">
              <a
                href={EXTERNAL_LINKS.instagramClean}
                target="_blank"
                rel="noopener noreferrer"
                title="Avani on Instagram"
                className="p-2 text-stone-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-full transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={EXTERNAL_LINKS.substack}
                target="_blank"
                rel="noopener noreferrer"
                title="Avani Substack"
                className="p-2 text-stone-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-full transition-colors"
              >
                <BookOpen className="w-4 h-4" />
              </a>
              <a
                href={EXTERNAL_LINKS.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                title="Avani LinkedIn"
                className="p-2 text-stone-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-full transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            {/* Primary Apply Button */}
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#163515] hover:bg-[#1f471e] text-white text-xs font-semibold tracking-wide transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
            >
              <span>Apply to Join</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-300" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:hidden px-3.5 py-1.5 rounded-full bg-[#163515] text-white text-xs font-semibold tracking-wide shadow-sm"
            >
              Apply
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-stone-700 hover:text-[#163515] hover:bg-stone-100 transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-xl border-b border-stone-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-base font-medium text-stone-800 hover:bg-emerald-50 hover:text-[#163515] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-4 pt-4 border-t border-stone-100 flex flex-col gap-3">
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#163515] text-white text-sm font-semibold shadow-md active:scale-98 transition-all"
            >
              <span>Apply to Join Avani (Google Form)</span>
              <ArrowUpRight className="w-4 h-4 text-emerald-300" />
            </a>

            <div className="flex items-center justify-around pt-2 text-stone-600">
              <a
                href={EXTERNAL_LINKS.instagramClean}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs hover:text-emerald-800"
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram</span>
              </a>
              <a
                href={EXTERNAL_LINKS.substack}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs hover:text-emerald-800"
              >
                <BookOpen className="w-4 h-4" />
                <span>Substack</span>
              </a>
              <a
                href={EXTERNAL_LINKS.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs hover:text-emerald-800"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>

            <div className="text-center text-xs text-stone-500 pt-2 flex items-center justify-center gap-3">
              <a href={EXTERNAL_LINKS.emailMailto} className="flex items-center gap-1 hover:text-emerald-800">
                <Mail className="w-3.5 h-3.5 text-emerald-700" />
                <span>{EXTERNAL_LINKS.email}</span>
              </a>
              <span>·</span>
              <a href={EXTERNAL_LINKS.phoneTel} className="flex items-center gap-1 hover:text-emerald-800">
                <Phone className="w-3.5 h-3.5 text-emerald-700" />
                <span>{EXTERNAL_LINKS.phoneFormatted}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
