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
  ArrowUpRight, 
  BookOpen, 
  Palette, 
  Users, 
  Smartphone, 
  Calendar, 
  Check
} from 'lucide-react';
import { Navbar, GOOGLE_FORM_URL } from '@/components/common/Navbar';
import { FirefliesBackground } from '@/components/common/FirefliesBackground';
import { useLenis } from '@/hooks/useLenis';
import { 
  AVANI_OBJECTIVES, 
  AVANI_TEAMS, 
  EXTERNAL_LINKS 
} from '@/lib/avaniContent';
import { ManifestoFooter } from '@/components/bleibtgleich/ManifestoFooter';
import { Footer } from '@/components/common/Footer';
import { AvaniThemeProvider, useAvaniTheme } from '@/components/bleibtgleich/ThemeTransitionOverlay';

// Dynamically load the 3D Cylindrical Orbital Ring for Events (SSR disabled for Three.js canvas)
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
  const { isNight } = useAvaniTheme();

  // Active Team tab state
  const [activeTeamId, setActiveTeamId] = useState<string>(AVANI_TEAMS[0].id);

  const activeTeam = AVANI_TEAMS.find((t) => t.id === activeTeamId) || AVANI_TEAMS[0];
  const ActiveTeamIcon = TEAM_ICON_MAP[activeTeam.icon || 'Users'] || Users;

  // Surface classes responding to Daylight vs Botanical Night Mode
  const pageBg = isNight
    ? 'bg-[#0E1610] text-[#ECEFE9] selection:bg-[#86B87A] selection:text-[#0E1610]'
    : 'bg-[#F9FAF7] text-[#163515] selection:bg-[#54683C] selection:text-white';

  const sectionWhite = isNight ? 'bg-[#141F16] border-white/10' : 'bg-white border-stone-200/60';
  const cardBg = isNight ? 'bg-[#19261B] border-white/10 text-[#ECEFE9]' : 'bg-[#F9FAF7] border-stone-200/80 text-stone-900';
  const textMuted = isNight ? 'text-[#9CAEA0]' : 'text-stone-600';
  const accentText = isNight ? 'text-[#86B87A]' : 'text-[#54683C]';

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-500 relative ${pageBg}`}>
      {/* Interactive Bioluminescent Fireflies in Dark Mode & Botanical Pollen in Daylight */}
      <FirefliesBackground />

      <Navbar />

      <main className="flex-grow pt-24 relative z-10">
        {/* ========================================================================= */}
        {/* 1. HERO SECTION (Artisanal Olive Brand Crest & Editorial Typography)        */}
        {/* ========================================================================= */}
        <section id="about" className="relative pt-12 sm:pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden text-center">
          {/* Subtle Ambient Radial Glow */}
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[450px] blur-3xl pointer-events-none -z-10 rounded-full transition-opacity duration-700 ${
            isNight ? 'bg-[#1B2E1E]/60 opacity-70' : 'bg-[#DCE7D4]/60 opacity-60'
          }`} />

          <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6 sm:space-y-8">
            {/* Authentic Olive Green Brand Crest (Official Canva Emblem) */}
            <div className="relative inline-flex items-center justify-center group">
              <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full p-2.5 transition-all duration-300 group-hover:scale-105 flex items-center justify-center shadow-md ${
                isNight
                  ? 'bg-[#263419] border-2 border-[#86B87A]/40 ring-4 ring-[#86B87A]/10 shadow-[0_0_24px_rgba(134,184,122,0.2)]'
                  : 'bg-[#364724] border-2 border-[#4E6334] ring-4 ring-[#364724]/15 shadow-lg shadow-[#364724]/25'
              }`}>
                <Image
                  src="/assets/branding/avani_logo_transparent.png"
                  alt="Avani Official Olive Green Crest"
                  width={96}
                  height={96}
                  priority
                  className="object-contain w-full h-full drop-shadow-sm"
                />
              </div>
            </div>

            {/* Editorial Eyebrow */}
            <div className="flex items-center justify-center gap-2">
              <span className={`font-sans text-sm font-medium ${
                isNight ? 'text-[#86B87A]' : 'text-[#54683C]'
              }`}>
                Bangalore Youth Climate Collective
              </span>
            </div>

            {/* Editorial Headline */}
            <h1 className="font-serif font-semibold text-4xl sm:text-6xl lg:text-[4.25rem] tracking-tight leading-[1.08] text-balance max-w-4xl mx-auto">
              Small Actions of Many Add Up to{' '}
              <span className={`italic font-normal transition-colors duration-300 ${accentText}`}>
                Change the World
              </span>
            </h1>

            {/* Editorial Subtext */}
            <p className={`text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto font-sans font-normal ${textMuted}`}>
              Avani unites Bangalore&apos;s students across schools and universities to turn climate anxiety into tangible, on-ground civic restoration, lake revitalization, pollution reduction, and conscious living.
            </p>

            {/* Focused Clean Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-8 py-4 rounded-full font-semibold text-sm shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center gap-2 ${
                  isNight
                    ? 'bg-[#86B87A] hover:bg-[#97C98B] text-[#0E1610]'
                    : 'bg-[#163515] hover:bg-[#254d24] text-white'
                }`}
              >
                <span>Apply to Join Avani</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#objectives"
                className={`px-7 py-4 rounded-full font-semibold text-sm active:scale-95 transition-all flex items-center gap-2 ${
                  isNight
                    ? 'bg-[#19261B] text-[#ECEFE9] border border-white/15 hover:bg-[#213124]'
                    : 'bg-white text-[#163515] border border-stone-200/90 hover:bg-stone-50 hover:border-stone-300 shadow-sm'
                }`}
              >
                <span>Explore Our Initiatives</span>
                <span className="text-xs opacity-60">↓</span>
              </a>
            </div>

            <p className={`text-xs font-sans ${textMuted}`}>
              Applications open for Bangalore Student Cohort &middot; 100% Volunteer Driven
            </p>

            {/* Metric Ribbon */}
            <div className={`w-full mt-10 pt-8 border-t grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-left ${
              isNight ? 'border-white/10' : 'border-[#54683C]/20'
            }`}>
              <div className="space-y-1">
                <p className="font-serif font-semibold text-3xl sm:text-4xl leading-none">04</p>
                <p className={`text-xs font-medium font-sans ${accentText}`}>Drives Completed</p>
                <p className={`text-xs ${textMuted}`}>Lakes, Lalbagh, fashion swaps &amp; eco walks</p>
              </div>

              <div className="space-y-1">
                <p className="font-serif font-semibold text-3xl sm:text-4xl leading-none">05</p>
                <p className={`text-xs font-medium font-sans ${accentText}`}>Student Teams</p>
                <p className={`text-xs ${textMuted}`}>Research, Design, HR, Social Media &amp; Events</p>
              </div>

              <div className="space-y-1">
                <p className="font-serif font-semibold text-3xl sm:text-4xl leading-none">11</p>
                <p className={`text-xs font-medium font-sans ${accentText}`}>Everyday Habits</p>
                <p className={`text-xs ${textMuted}`}>Bangalore youth sustainable living routines</p>
              </div>

              <div className="space-y-1">
                <p className="font-serif font-semibold text-3xl sm:text-4xl leading-none">100%</p>
                <p className={`text-xs font-medium font-sans ${accentText}`}>Student-Run</p>
                <p className={`text-xs ${textMuted}`}>Independent volunteer environmental movement</p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. OUR MISSION & 5 CORE PILLARS OF IMPACT                                  */}
        {/* ========================================================================= */}
        <section id="objectives" className={`py-20 px-4 sm:px-6 lg:px-8 border-y transition-colors duration-500 ${sectionWhite}`}>
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className={`text-sm font-medium mb-3 ${accentText}`}>What we stand for</p>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl tracking-tight">
                Our Pillars of Impact
              </h2>
              <p className={`mt-3 text-base sm:text-lg font-sans ${textMuted}`}>
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
                    className={`p-8 rounded-2xl border hover:shadow-md transition-all duration-200 flex flex-col justify-between group ${cardBg} ${
                      isCentered ? 'lg:col-span-1' : ''
                    }`}
                  >
                    <div>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform ${
                        isNight ? 'bg-[#223425] text-[#86B87A]' : 'bg-[#DCE7D4] text-[#163515]'
                      }`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className={`text-xs font-sans font-medium ${accentText} opacity-80`}>
                        {String(idx + 1).padStart(2, '0')} —
                      </span>
                      <h3 className="font-serif font-bold text-xl mt-1 mb-3">
                        {obj.title}
                      </h3>
                      <p className={`text-sm leading-relaxed ${textMuted}`}>
                        {obj.description}
                      </p>
                    </div>

                    <div className={`pt-6 mt-6 border-t flex items-center justify-between text-xs font-medium ${
                      isNight ? 'border-white/10 text-[#86B87A]' : 'border-stone-200/70 text-[#54683C]'
                    }`}>
                      <span>{obj.category || 'Strategic Initiative'}</span>
                      <ArrowUpRight className="w-4 h-4" />
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
              <p className={`text-sm font-medium mb-3 ${accentText}`}>The people doing the work</p>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl tracking-tight">
                The 5 Avani Student Teams
              </h2>
              <p className={`mt-2 text-base max-w-xl ${textMuted}`}>
                Avani is 100% powered by college students collaborating across multidisciplinary units. Select a team to explore key responsibilities.
              </p>
            </div>

            <div className="mt-4 md:mt-0">
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors ${accentText} hover:opacity-80`}
              >
                <span>View Open Cohort Positions</span>
                <ArrowUpRight className="w-4 h-4" />
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
                      ? isNight
                        ? 'bg-[#86B87A] text-[#0E1610] shadow-sm'
                        : 'bg-[#163515] text-white shadow-sm'
                      : isNight
                        ? 'bg-[#19261B] text-stone-300 hover:text-white border border-white/10'
                        : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
                  }`}
                >
                  {team.name}
                </button>
              );
            })}
          </div>

          {/* Active Tab Panel */}
          <div className={`rounded-3xl border p-8 lg:p-12 shadow-sm min-h-[380px] relative transition-all ${sectionWhite}`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${
                  isNight ? 'bg-[#223425] text-[#86B87A]' : 'bg-[#DCE7D4] text-[#163515]'
                }`}>
                  <ActiveTeamIcon className="w-3.5 h-3.5" />
                  <span>{activeTeam.tag || activeTeam.name}</span>
                </div>

                <h3 className="font-serif font-bold text-2xl sm:text-3xl">
                  {activeTeam.name}
                </h3>

                <p className={`leading-relaxed text-sm sm:text-base ${textMuted}`}>
                  {activeTeam.description}
                </p>

                <div className="pt-2">
                  <h4 className={`text-xs font-sans font-medium mb-2 ${accentText}`}>
                    Key Responsibilities:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {activeTeam.responsibilities.map((resp, i) => (
                      <li key={i} className={`flex items-start gap-2 p-2.5 rounded-lg border ${cardBg}`}>
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${accentText}`} />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Side Team Info Box */}
              <div className={`lg:col-span-5 p-6 sm:p-8 rounded-2xl border flex flex-col justify-between ${cardBg}`}>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                      isNight ? 'bg-[#223425] text-[#86B87A]' : 'bg-[#DCE7D4] text-[#163515]'
                    }`}>
                      <ActiveTeamIcon className="w-5 h-5" />
                    </span>
                    <div>
                      <h4 className="font-semibold text-base">{activeTeam.name}</h4>
                      <p className={`text-xs ${textMuted}`}>{activeTeam.role || 'Active Student Unit'}</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className={`p-3 rounded-xl border ${isNight ? 'bg-black/30 border-white/5' : 'bg-white border-stone-200/80'}`}>
                      <p className={`text-[11px] font-medium ${textMuted}`}>Primary Focus</p>
                      <p className="text-xs font-semibold mt-0.5">
                        {activeTeam.keyFocus || 'Grassroots Environmental Action'}
                      </p>
                    </div>

                    <div className={`p-3 rounded-xl border ${isNight ? 'bg-black/30 border-white/5' : 'bg-white border-stone-200/80'}`}>
                      <p className={`text-[11px] font-medium ${textMuted}`}>Submission Format</p>
                      <p className={`text-xs font-mono font-semibold mt-0.5 ${accentText}`}>
                        NAME_AVANI_SUBMISSION
                      </p>
                    </div>
                  </div>
                </div>

                <div className={`mt-6 pt-4 border-t ${isNight ? 'border-white/10' : 'border-stone-200'}`}>
                  <a
                    href={GOOGLE_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs font-semibold transition-all shadow-sm ${
                      isNight ? 'bg-[#86B87A] text-[#0E1610] hover:bg-[#97C98B]' : 'bg-[#163515] text-white hover:bg-[#254d24]'
                    }`}
                  >
                    <span>Apply for {activeTeam.name}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. THE 3D CYLINDRICAL EVENTS RING (Interactive Drag & Spin)                */}
        {/* ========================================================================= */}
        <section id="events" className={`relative py-12 border-y transition-colors duration-500 ${sectionWhite}`}>
          <OrbitalWorkRing />
        </section>

        {/* ========================================================================= */}
        {/* 5. SUBSTACK PUBLICATIONS & STUDENT THOUGHT LEADERSHIP                     */}
        {/* ========================================================================= */}
        <section id="publications" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
            <div>
              <p className={`text-sm font-medium mb-3 ${accentText}`}>Writing & research</p>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl tracking-tight">
                Student Thought Leadership
              </h2>
              <p className={`mt-2 text-base max-w-xl font-sans ${textMuted}`}>
                Original research and essays on Bengaluru hydrology, fast fashion, and youth eco-anxiety written by Avani&apos;s Research &amp; Writing team.
              </p>
            </div>

            <div className="mt-4 md:mt-0">
              <a
                href={EXTERNAL_LINKS.substack}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors ${accentText} hover:opacity-80`}
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
                className={`p-6 rounded-2xl border hover:shadow-md transition-all duration-200 flex flex-col justify-between group ${cardBg}`}
              >
                <div>
                  <div className={`flex items-center justify-between text-xs mb-3 ${textMuted}`}>
                    <span className={`font-medium font-sans text-xs ${accentText}`}>Substack</span>
                    <span>{article.publishedDate}</span>
                  </div>

                  <h3 className="font-serif font-bold text-lg group-hover:text-emerald-500 transition-colors mb-2">
                    {article.title}
                  </h3>

                  <p className={`text-xs leading-relaxed font-sans ${textMuted}`}>
                    {article.subtitle}
                  </p>
                </div>

                <div className={`pt-4 mt-6 border-t flex items-center justify-between text-xs font-medium ${
                  isNight ? 'border-white/10 text-[#86B87A]' : 'border-stone-200 text-[#54683C]'
                }`}>
                  <span>Read on Substack</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. MANIFESTO & MONUMENTAL 'AVANI' TEXT AT THE LAST                         */}
        {/* ========================================================================= */}
        <ManifestoFooter />
      </main>

      {/* Full Dark-Green 4-Column Footer */}
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
