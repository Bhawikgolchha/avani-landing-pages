'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Sprout, 
  Trees, 
  Wind, 
  Recycle, 
  Share2, 
  CheckCircle2, 
  ArrowUpRight, 
  ArrowRight, 
  BookOpen, 
  Palette, 
  Users, 
  Smartphone, 
  Calendar, 
  Check, 
  Sparkles,
  ShieldCheck,
  Building2,
  Compass
} from 'lucide-react';
import { Navbar, GOOGLE_FORM_URL } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { useLenis } from '@/hooks/useLenis';
import { 
  AVANI_OBJECTIVES, 
  AVANI_TEAMS, 
  EXTERNAL_LINKS,
  AVANI_ORGANIZATION
} from '@/lib/avaniContent';
import { ManifestoFooter } from '@/components/bleibtgleich/ManifestoFooter';
import { AvaniThemeProvider } from '@/components/bleibtgleich/ThemeTransitionOverlay';

// Dynamically load the 3D Cylindrical Orbital Ring for Events (SSR disabled for WebGL canvas)
const OrbitalWorkRing = dynamic(
  () => import('@/components/bleibtgleich/OrbitalWorkRing').then((mod) => mod.OrbitalWorkRing),
  { ssr: false }
);

// Objective icons
const OBJECTIVE_ICON_MAP: Record<string, React.ElementType> = {
  Megaphone: Sprout,
  Trees: Trees,
  Wind: Wind,
  Recycle: Recycle,
  Share2: Share2,
};

// Team icons
const TEAM_ICON_MAP: Record<string, React.ElementType> = {
  BookOpen: BookOpen,
  Palette: Palette,
  Users: Users,
  Smartphone: Smartphone,
  Calendar: Calendar,
};

function AvaniPageShell() {
  useLenis();

  // Active Team tab state
  const [activeTeamId, setActiveTeamId] = useState<string>(AVANI_TEAMS[0].id);

  const activeTeam = AVANI_TEAMS.find((t) => t.id === activeTeamId) || AVANI_TEAMS[0];
  const ActiveTeamIcon = TEAM_ICON_MAP[activeTeam.icon || 'Users'] || Users;

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F9FAF7] text-[#163515] selection:bg-[#54683C] selection:text-white">
      <Navbar />

      <main className="flex-grow pt-24">
        {/* ========================================================================= */}
        {/* 1. HERO SECTION (Editorial Typographic Hero — NO Stock Forest Photo)        */}
        {/* ========================================================================= */}
        <section id="about" className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
          {/* Subtle Ambient Organic Radial Glows */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-[#DCE7D4]/60 via-[#EBF3E8]/40 to-transparent blur-3xl pointer-events-none -z-10 rounded-full" />

          <div className="max-w-4xl mx-auto text-center flex flex-col items-center space-y-8">
            {/* Olive Green Avani Brand Emblem */}
            <div className="relative group">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#54683C] border-2 border-[#6E874E] p-2 shadow-md transition-transform duration-300 group-hover:scale-105 flex items-center justify-center">
                <Image
                  src="/assets/branding/avani_logo_transparent.png"
                  alt="Avani Olive Green Logo"
                  width={80}
                  height={80}
                  priority
                  className="object-contain"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-white px-2.5 py-0.5 rounded-full border border-[#54683C]/30 text-[10px] font-mono font-bold text-[#54683C] shadow-sm">
                BLR
              </div>
            </div>

            {/* Top Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#DCE7D4] text-[#163515] border border-[#54683C]/20 text-xs font-semibold tracking-wide shadow-sm">
              <span className="text-sm">🌱</span>
              <span>100% Student-Led &middot; Bangalore Youth Climate Collective</span>
            </div>

            {/* Monumental Crafted Headline in Fraunces */}
            <h1 className="font-serif font-black text-4xl sm:text-6xl lg:text-7xl text-[#163515] tracking-[-0.03em] leading-[1.08] max-w-4xl">
              Small Actions of Many Add Up to{' '}
              <span className="text-[#54683C] italic font-normal">
                Change the World
              </span>
            </h1>

            {/* Humancrafted Editorial Subtext */}
            <p className="text-stone-600 text-lg sm:text-xl leading-relaxed max-w-2xl font-sans">
              Avani unites Bangalore&apos;s students across schools and universities to turn climate anxiety into tangible, on-ground civic restoration, lake revitalization, pollution reduction, and conscious living.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full bg-[#163515] hover:bg-[#254d24] text-white font-semibold text-sm shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Apply to Join Avani</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              </a>

              <a
                href="#events"
                className="px-8 py-4 rounded-full bg-white text-[#163515] border border-[#54683C]/30 font-medium text-sm shadow-sm hover:bg-[#F2F6ED] active:scale-95 transition-all flex items-center gap-2"
              >
                <span>Explore 3D Events Ring</span>
                <ArrowRight className="w-4 h-4 text-stone-500" />
              </a>

              <Link
                href="/quiz"
                className="px-6 py-4 rounded-full bg-[#DCE7D4]/80 text-[#163515] border border-[#54683C]/20 font-semibold text-sm hover:bg-[#DCE7D4] active:scale-95 transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#54683C]" />
                <span>Take Organization Quiz</span>
              </Link>
            </div>

            {/* Micro-Trust Tags */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-stone-600">
              <span className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full shadow-sm border border-stone-200">
                <ShieldCheck className="w-3.5 h-3.5 text-[#54683C]" />
                <span className="font-medium">100% Student-Driven</span>
              </span>
              <span className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-stone-200">
                <Building2 className="w-3.5 h-3.5 text-[#54683C]" />
                <span className="font-medium">Bengaluru Inter-College Network</span>
              </span>
              <span className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-stone-200">
                <Compass className="w-3.5 h-3.5 text-[#54683C]" />
                <span className="font-medium">Ground-Level Civic Action</span>
              </span>
            </div>

            {/* Swiss Editorial Counter Strip */}
            <div className="w-full mt-10 pt-8 border-t border-[#54683C]/15 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
              <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-sm">
                <p className="font-serif font-bold text-3xl sm:text-4xl text-[#163515] leading-none">04</p>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#54683C] mt-2">Drives Completed</p>
                <p className="text-[11px] text-stone-500 mt-0.5">On-ground community impact</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-sm">
                <p className="font-serif font-bold text-3xl sm:text-4xl text-[#163515] leading-none">05</p>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#54683C] mt-2">Student Teams</p>
                <p className="text-[11px] text-stone-500 mt-0.5">Multidisciplinary units</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-sm">
                <p className="font-serif font-bold text-3xl sm:text-4xl text-[#163515] leading-none">11</p>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#54683C] mt-2">Everyday Habits</p>
                <p className="text-[11px] text-stone-500 mt-0.5">Actionable climate care points</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200/80 shadow-sm">
                <p className="font-serif font-bold text-3xl sm:text-4xl text-[#163515] leading-none">100%</p>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#54683C] mt-2">Student-Run</p>
                <p className="text-[11px] text-stone-500 mt-0.5">Volunteer powered movement</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. OUR MISSION & 5 CORE PILLARS OF IMPACT                                  */}
        {/* ========================================================================= */}
        <section id="objectives" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-stone-200/60">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCE7D4] text-[#163515] text-xs font-semibold uppercase tracking-wider mb-3">
                <Sprout className="w-3.5 h-3.5 text-[#54683C]" />
                <span>Strategic Framework</span>
              </div>
              <h2 className="font-serif font-bold text-3xl sm:text-5xl text-[#163515] tracking-tight">
                Our Pillars of Impact
              </h2>
              <p className="mt-3 text-stone-600 text-base sm:text-lg font-sans">
                Five core mandates designed to dismantle ecological apathy and spark grassroots responsibility among India&apos;s rising generation.
              </p>
            </div>

            {/* 5-Card Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {AVANI_OBJECTIVES.map((obj, idx) => {
                const IconComponent = OBJECTIVE_ICON_MAP[obj.icon] || Sprout;
                const isCentered = idx >= 3;
                return (
                  <div
                    key={obj.id}
                    className={`p-8 rounded-2xl bg-[#F9FAF7] border border-stone-200/80 hover:border-[#54683C]/60 hover:shadow-md transition-all duration-200 flex flex-col justify-between group ${
                      isCentered ? 'lg:col-span-1' : ''
                    }`}
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-[#DCE7D4] text-[#163515] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                        <IconComponent className="w-6 h-6 text-[#163515]" />
                      </div>
                      <span className="text-xs font-mono font-bold text-[#54683C] tracking-wider uppercase">
                        Pillar 0{obj.id}
                      </span>
                      <h3 className="font-serif font-bold text-xl text-[#163515] mt-1 mb-3">
                        {obj.title}
                      </h3>
                      <p className="text-stone-600 text-sm leading-relaxed">
                        {obj.description}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-stone-200/70 flex items-center justify-between text-xs font-medium text-[#54683C]">
                      <span>{obj.category || 'Strategic Initiative'}</span>
                      <ArrowUpRight className="w-4 h-4 text-[#54683C]" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. THE 5 AVANI STUDENT TEAMS (Interactive Leadership Units)                 */}
        {/* ========================================================================= */}
        <section id="teams" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCE7D4] text-[#163515] text-xs font-semibold uppercase tracking-wider mb-3">
                <Users className="w-3.5 h-3.5 text-[#54683C]" />
                <span>Student Leadership Structure</span>
              </div>
              <h2 className="font-serif font-bold text-3xl sm:text-5xl text-[#163515] tracking-tight">
                The 5 Avani Student Teams
              </h2>
              <p className="text-stone-600 mt-2 text-base max-w-xl">
                Avani is 100% powered by college students collaborating across multidisciplinary units. Select a team to explore key responsibilities.
              </p>
            </div>

            <div className="mt-4 md:mt-0">
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#54683C] hover:text-[#163515] transition-colors"
              >
                <span>View Open Cohort Positions</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Tab Navigation Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
            {AVANI_TEAMS.map((team) => {
              const isActive = team.id === activeTeamId;
              return (
                <button
                  key={team.id}
                  onClick={() => setActiveTeamId(team.id)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-[#163515] text-white shadow-sm'
                      : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
                  }`}
                >
                  {team.name}
                </button>
              );
            })}
          </div>

          {/* Active Tab Panel */}
          <div className="bg-white rounded-3xl border border-stone-200/80 p-8 lg:p-12 shadow-sm min-h-[380px] relative transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#DCE7D4] text-[#163515] rounded-full text-xs font-semibold">
                  <ActiveTeamIcon className="w-3.5 h-3.5 text-[#54683C]" />
                  <span>{activeTeam.tag || activeTeam.name}</span>
                </div>

                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#163515]">
                  {activeTeam.name}
                </h3>

                <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                  {activeTeam.description}
                </p>

                <div className="pt-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#54683C] font-semibold mb-2">
                    Key Responsibilities:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                    {activeTeam.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2 bg-[#F9FAF7] p-2.5 rounded-lg border border-stone-100">
                        <Check className="w-4 h-4 text-[#54683C] shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Side Team Info Box */}
              <div className="lg:col-span-5 bg-[#F9FAF7] p-6 sm:p-8 rounded-2xl border border-stone-200/70 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-10 rounded-full bg-[#DCE7D4] text-[#163515] flex items-center justify-center font-bold text-sm">
                      <ActiveTeamIcon className="w-5 h-5 text-[#163515]" />
                    </span>
                    <div>
                      <h4 className="font-semibold text-stone-900 text-base">{activeTeam.name}</h4>
                      <p className="text-xs text-stone-500">{activeTeam.role || 'Active Student Unit'}</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="p-3 bg-white rounded-xl border border-stone-200/80">
                      <p className="text-[11px] text-stone-500 font-medium">Primary Focus</p>
                      <p className="text-xs font-semibold text-stone-900 mt-0.5">
                        {activeTeam.keyFocus || 'Grassroots Environmental Action'}
                      </p>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-stone-200/80">
                      <p className="text-[11px] text-stone-500 font-medium">Submission Format</p>
                      <p className="text-xs font-mono font-semibold text-[#54683C] mt-0.5">
                        NAME_AVANI_SUBMISSION
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-200">
                  <a
                    href={GOOGLE_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#163515] hover:bg-[#254d24] text-white text-xs font-semibold transition-all shadow-sm"
                  >
                    <span>Apply for {activeTeam.name}</span>
                    <ArrowUpRight className="w-4 h-4 text-emerald-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. THE CYLINDRICAL THING FOR EVENTS (3D Rotating Orbital Ring)              */}
        {/* ========================================================================= */}
        <section id="events" className="relative py-12 bg-white/70 border-y border-stone-200/60">
          <OrbitalWorkRing />
        </section>

        {/* ========================================================================= */}
        {/* 5. SUBSTACK PUBLICATIONS & STUDENT THOUGHT LEADERSHIP                     */}
        {/* ========================================================================= */}
        <section id="publications" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCE7D4] text-[#163515] text-xs font-semibold uppercase tracking-wider mb-3">
                <BookOpen className="w-3.5 h-3.5 text-[#54683C]" />
                <span>Knowledge &amp; Voices</span>
              </div>
              <h2 className="font-serif font-bold text-3xl sm:text-5xl text-[#163515] tracking-tight">
                Student Thought Leadership
              </h2>
              <p className="text-stone-600 mt-2 text-base max-w-xl font-sans">
                Original research and essays on Bengaluru hydrology, fast fashion, and youth eco-anxiety written by Avani&apos;s Research &amp; Writing team.
              </p>
            </div>

            <div className="mt-4 md:mt-0">
              <a
                href={EXTERNAL_LINKS.substack}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#54683C] hover:text-[#163515] transition-colors"
              >
                <span>Read All on Substack</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EXTERNAL_LINKS.substackArticles.map((article) => (
              <a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 rounded-2xl bg-white border border-stone-200/80 hover:border-[#54683C]/60 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-stone-500 mb-3">
                    <span className="font-semibold text-[#54683C] font-mono">Substack Deep Dive</span>
                    <span>{article.publishedDate}</span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-[#163515] group-hover:text-[#54683C] transition-colors mb-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    {article.subtitle}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-stone-100 flex items-center justify-between text-xs font-medium text-[#54683C]">
                  <span>Read on Substack</span>
                  <ArrowUpRight className="w-4 h-4 text-[#54683C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. MANIFESTO & THE MONUMENTAL 'AVANI' TEXT AT THE LAST                     */}
        {/* ========================================================================= */}
        <ManifestoFooter />
      </main>

      <Footer />
    </div>
  );
}

export default function AvaniHomePage() {
  return (
    <AvaniThemeProvider>
      <AvaniPageShell />
    </AvaniThemeProvider>
  );
}
