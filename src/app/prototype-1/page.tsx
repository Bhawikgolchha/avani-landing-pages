'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Trees,
  Sparkles,
  ArrowDown,
  ArrowUpRight,
  Droplets,
  Sprout,
  Wind,
  Recycle,
  Share2,
  Calendar,
  Users,
  BookOpen,
  Palette,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  FileImage,
  X,
  Clock,
  MapPin,
  HeartHandshake,
  CheckCircle2,
  Compass,
} from 'lucide-react';
import { Navbar, GOOGLE_FORM_URL } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { useLenis } from '@/hooks/useLenis';
import {
  AVANI_OBJECTIVES,
  AVANI_TEAMS,
  AVANI_EVENTS,
  CLIMATE_TIPS,
  AVANI_ORGANIZATION,
  EXTERNAL_LINKS,
} from '@/lib/avaniContent';

gsap.registerPlugin(ScrollTrigger);

// Dynamically load WebGL Canvas with SSR completely disabled
// React Three Fiber Living Canopy (Milestone M4) - Procedural Tree of Life, Translucent Foliage & Reflecting Pond Canvas
const P1Scene = dynamic(() => import('@/components/prototype1/P1Scene'), { ssr: false });

const CANOPY_STAGES = [
  { id: 'crown', label: '01 · Sunlit Crown', depth: '0m' },
  { id: 'objectives', label: '02 · Mid-Canopy', depth: '12m' },
  { id: 'teams', label: '03 · Ancient Trunk', depth: '28m' },
  { id: 'events', label: '04 · Twilight Roots', depth: '44m' },
  { id: 'climate-tips', label: '05 · GlowGarden Pool', depth: '60m' },
];

const OBJECTIVE_ICON_MAP: Record<string, React.ElementType> = {
  Megaphone: Sprout,
  Trees,
  Wind,
  Recycle,
  Share2,
};

const TEAM_ICON_MAP: Record<string, React.ElementType> = {
  BookOpen,
  Palette,
  Users,
  Smartphone,
  Calendar,
};

export default function Prototype1Page() {
  useLenis();

  const [activeTeamId, setActiveTeamId] = useState<string>(AVANI_TEAMS[0].id);
  const [selectedTipCategory, setSelectedTipCategory] = useState<string>('all');
  const [infographicOpen, setInfographicOpen] = useState(false);
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const [scrollDepthPct, setScrollDepthPct] = useState(0);

  const mainRef = useRef<HTMLDivElement>(null);
  const depthBarRef = useRef<HTMLDivElement>(null);
  const eventsCarouselRef = useRef<HTMLDivElement>(null);
  const tipsCarouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (!ref.current) return;
    ref.current.scrollBy({
      left: direction === 'left' ? -300 : 300,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth Scroll-Scrubbed Canopy Depth Progress Bar (GSAP Showcase pattern)
      if (depthBarRef.current) {
        gsap.to(depthBarRef.current, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: mainRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.35,
            onUpdate: (self) => {
              const pct = Math.round(self.progress * 100);
              setScrollDepthPct(pct);
              const idx = Math.min(CANOPY_STAGES.length - 1, Math.floor(self.progress * CANOPY_STAGES.length));
              setActiveStageIdx(idx);
            },
          },
        });
      }

      // 3D Perspective Chapter Entrance Motion (non-blocking transform + crisp readability)
      const sections = gsap.utils.toArray<HTMLElement>('.p1-scroll-chapter');
      sections.forEach((sec) => {
        gsap.from(sec, {
          y: 28,
          duration: 0.7,
          ease: 'power2.out',
          clearProps: 'transform',
          scrollTrigger: {
            trigger: sec,
            start: 'top 90%',
            once: true,
          },
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  const activeTeam = AVANI_TEAMS.find((t) => t.id === activeTeamId) || AVANI_TEAMS[0];
  const ActiveTeamIcon = TEAM_ICON_MAP[activeTeam.icon || 'Users'] || Users;

  return (
    <div className="min-h-screen bg-[#F9FAF7] text-[#163515] flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-950 overflow-x-hidden relative">
      {/* Canva Idea 5 -> Canva GlowGarden Nocturnal Atmospheric Gradient Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-b from-[#F9FAF7] via-[#132a17]/75 to-[#061309]"
      />

      <Navbar />

      {/* GSAP ScrollTrigger Depth Telemetry HUD (Desktop & Mobile Compact) */}
      <div className="fixed top-16 left-0 right-0 z-30 pointer-events-none">
        <div className="h-[2px] w-full bg-emerald-950/20">
          <div
            ref={depthBarRef}
            className="h-full origin-left scale-x-0 bg-gradient-to-r from-[#568203] via-emerald-400 to-[#6EE7B7] shadow-[0_0_12px_rgba(110,231,183,0.85)]"
          />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 flex justify-between items-center text-[10px] font-mono">
          <span className="px-2.5 py-1 rounded-full bg-[#08140B]/80 text-[#A7F3D0] border border-emerald-400/30 backdrop-blur-md shadow-sm">
            {CANOPY_STAGES[activeStageIdx]?.label} · {CANOPY_STAGES[activeStageIdx]?.depth}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-[#08140B]/80 text-emerald-300 border border-emerald-400/30 backdrop-blur-md shadow-sm hidden sm:inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6EE7B7] animate-pulse" />
            Canopy Depth {scrollDepthPct}%
          </span>
        </div>
      </div>

      <main ref={mainRef} className="flex-grow pt-20 relative">
        {/* Fixed 3D Canvas Background Container (Living Canopy Tree of Life, Translucent Foliage, Bioluminescent Spores & Reflecting Pond + Google Flow Canopy Loop) */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-65 w-full h-full">
          <P1Scene />
        </div>

        {/* Foreground Scroll Chapters Overlay */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-20 sm:gap-24">
          {/* Chapter 1: Canopy Hero (Idea 5 Sunlit Botanical + GlowGarden Bioluminescent Crest) */}
          <section className="min-h-[70vh] flex flex-col justify-center items-center text-center pt-6">
            <span className="px-3.5 py-1.5 rounded-full bg-[#08140B]/85 border border-emerald-400/40 text-[#A7F3D0] text-xs font-mono font-semibold uppercase tracking-wider mb-4 inline-flex items-center gap-1.5 shadow-[0_0_20px_rgba(110,231,183,0.2)] backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#6EE7B7]" />
              Prototype 1: The Living Canopy · GlowGarden
            </span>

            {/* Circular Official Avani Brand Emblem with Bioluminescent Halo */}
            <div className="relative mb-5 group">
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-emerald-500 via-[#6EE7B7] to-teal-400 opacity-60 blur-md group-hover:opacity-100 transition-opacity" />
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-[#6EE7B7]/80 bg-stone-900 shadow-2xl">
                <Image
                  src="/assets/branding/logo.jpg"
                  alt="Avani Official Emblem"
                  fill
                  priority
                  sizes="(max-width: 640px) 80px, 96px"
                  className="object-cover"
                />
              </div>
            </div>

            <p className="text-xs font-mono tracking-widest text-emerald-950 bg-[#DCE7D4]/90 px-3 py-1 rounded-full uppercase font-semibold mb-3 border border-emerald-900/15">
              {AVANI_ORGANIZATION.greeting}
            </p>

            <h1 className="text-4xl sm:text-6xl font-serif font-extrabold text-[#163515] max-w-3xl leading-tight bg-[#F9FAF7]/80 px-5 py-3 rounded-3xl backdrop-blur-sm shadow-sm border border-emerald-900/10">
              Rooted in Purpose. <br />
              <span className="bg-gradient-to-r from-[#163515] via-[#2b6226] to-emerald-700 bg-clip-text text-transparent">
                Growing for Tomorrow.
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-lg text-[#163515] max-w-2xl bg-[#F9FAF7]/85 px-4 py-3 rounded-2xl backdrop-blur-sm border border-emerald-900/10 leading-relaxed">
              {AVANI_ORGANIZATION.verbatimSummary}
            </p>

            {/* PDF-Verified Counts Banner */}
            <div className="mt-7 w-full max-w-2xl grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div className="p-3.5 rounded-2xl bg-white/90 border border-emerald-500/30 backdrop-blur-md shadow-sm">
                <span className="text-2xl font-extrabold font-mono text-emerald-900 block">4</span>
                <span className="text-[10px] font-mono text-emerald-800 uppercase tracking-wider">Community Drives</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/90 border border-emerald-500/30 backdrop-blur-md shadow-sm">
                <span className="text-2xl font-extrabold font-mono text-emerald-900 block">5</span>
                <span className="text-[10px] font-mono text-emerald-800 uppercase tracking-wider">Specialized Teams</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/90 border border-emerald-500/30 backdrop-blur-md shadow-sm">
                <span className="text-2xl font-extrabold font-mono text-emerald-900 block">11</span>
                <span className="text-[10px] font-mono text-emerald-800 uppercase tracking-wider">Climate Actions</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/90 border border-emerald-500/30 backdrop-blur-md shadow-sm">
                <span className="text-2xl font-extrabold font-mono text-emerald-900 block">100%</span>
                <span className="text-[10px] font-mono text-emerald-800 uppercase tracking-wider">Student-Led</span>
              </div>
            </div>

            {/* Dual Hero CTAs */}
            <div className="mt-7 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto px-2 sm:px-0">
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#163515] text-[#DCE7D4] font-bold text-xs sm:text-sm shadow-xl hover:bg-emerald-900 transition-all active:scale-95 border border-emerald-400/30"
              >
                <span>Join Avani (Apply Now)</span>
                <ArrowUpRight className="w-4 h-4 text-[#6EE7B7]" />
              </a>
              <a
                href="#objectives"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white/90 border border-emerald-900/20 text-[#163515] font-semibold text-xs sm:text-sm hover:bg-emerald-50 transition-all backdrop-blur-md"
              >
                <Compass className="w-4 h-4 text-emerald-800" />
                <span>Explore the Canopy</span>
              </a>
            </div>

            <div className="mt-7 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#08140B]/75 text-xs font-mono text-[#A7F3D0] backdrop-blur-md border border-emerald-500/30">
              <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#6EE7B7]" />
              <span>Scroll to traverse the canopy</span>
            </div>
          </section>

          {/* Chapter 2: The 5 Core Objectives (Mid-Canopy Glassmorphic Sanctuary) */}
          <section
            id="objectives"
            className="p1-scroll-chapter rounded-3xl bg-white/92 border border-emerald-900/15 p-6 sm:p-10 lg:p-12 shadow-xl backdrop-blur-md"
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 pb-4 border-b border-emerald-900/10">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-800 font-semibold mb-1.5">
                  <Sprout className="w-4 h-4" />
                  <span>Canopy Tier 2 · Core Environmental Objectives</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#163515]">
                  Our 5 Core Objectives
                </h2>
                <p className="text-sm text-stone-600 mt-1">
                  Driving actionable environmental restoration across Bangalore and India.
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-[11px] font-mono font-semibold self-start sm:self-auto">
                5 Verbatim Mandates
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              {AVANI_OBJECTIVES.map((obj) => {
                const ObjIcon = OBJECTIVE_ICON_MAP[obj.icon] || Sprout;
                return (
                  <div
                    key={obj.id}
                    className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 hover:border-emerald-500/50 transition-all flex flex-col justify-between shadow-sm"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="w-8 h-8 rounded-lg bg-[#163515] text-[#6EE7B7] flex items-center justify-center">
                          <ObjIcon className="w-4 h-4" />
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-200/70 text-emerald-950 font-semibold uppercase">
                          {obj.category}
                        </span>
                      </div>
                      <span className="font-bold block text-sm mb-1.5 text-emerald-950 font-serif">
                        {obj.id}. {obj.title}
                      </span>
                      <span className="text-stone-700 leading-relaxed">&ldquo;{obj.verbatimCopy}&rdquo;</span>
                    </div>
                    {obj.metric && (
                      <span className="mt-3 pt-2 border-t border-emerald-200/70 font-mono text-[10px] text-emerald-900 font-semibold">
                        Metric: {obj.metric}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Chapter 3: The 5 Specialized Teams (Twilight Trunk Transition) */}
          <section
            id="teams"
            className="p1-scroll-chapter rounded-3xl bg-[#0B1E10]/95 text-emerald-50 border border-emerald-500/30 p-6 sm:p-10 lg:p-12 shadow-[0_0_45px_rgba(16,185,129,0.12)] backdrop-blur-md"
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 pb-4 border-b border-emerald-800/60">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#6EE7B7] font-semibold mb-1.5">
                  <Users className="w-4 h-4" />
                  <span>Canopy Tier 3 · Dusk Branching Structure</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  The 5 Specialized Teams
                </h2>
                <p className="text-sm text-emerald-200/80 mt-1">
                  Carefully-curated teams of student volunteers specializing in particular fields.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-950 border border-emerald-500/40 text-[#A7F3D0] text-[11px] font-mono self-start sm:self-auto">
                Volunteer Recruitment Open
              </span>
            </div>

            {/* Interactive Team Pills (Mobile Swipeable) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-5">
              {AVANI_TEAMS.map((team) => (
                <button
                  key={team.id}
                  type="button"
                  onClick={() => setActiveTeamId(team.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold whitespace-nowrap transition-all border ${
                    activeTeamId === team.id
                      ? 'bg-[#6EE7B7] text-[#08140B] border-[#A7F3D0] shadow-[0_0_15px_rgba(110,231,183,0.4)]'
                      : 'bg-emerald-950/70 text-emerald-200 border-emerald-800/70 hover:border-emerald-500/50'
                  }`}
                >
                  #{team.number} {team.name}
                </button>
              ))}
            </div>

            {/* Spotlight Card for Selected Team */}
            <div className="p-5 rounded-2xl bg-emerald-950/70 border border-emerald-400/30 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-emerald-900 border border-emerald-400/40 text-[#6EE7B7] flex items-center justify-center shrink-0">
                    <ActiveTeamIcon className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="font-serif font-bold text-base sm:text-lg text-white">
                      {activeTeam.name}
                    </h3>
                    <p className="text-xs font-mono text-[#6EE7B7]">{activeTeam.role}</p>
                  </div>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-emerald-900/80 text-emerald-200 border border-emerald-500/30 self-start sm:self-auto">
                  {activeTeam.tag}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed mb-3">
                {activeTeam.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {activeTeam.responsibilities.map((r, i) => (
                  <div key={i} className="flex items-start gap-2 text-emerald-200/90">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#6EE7B7] mt-0.5 shrink-0" />
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Complete 5-Team Overview Grid (also snap-friendly on narrow phones) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {AVANI_TEAMS.map((team) => (
                <div
                  key={team.id}
                  onClick={() => setActiveTeamId(team.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    activeTeamId === team.id
                      ? 'bg-emerald-900/50 border-[#6EE7B7]/60'
                      : 'bg-[#08140B]/70 border-emerald-800/50 hover:border-emerald-500/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-white">{team.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-[#6EE7B7] border border-emerald-700/60">
                      {team.tag}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#A7F3D0] font-medium mb-1">{team.role}</p>
                  <p className="text-emerald-100/80 mb-2">{team.description}</p>
                  <ul className="space-y-1 text-emerald-200/75 text-[11px]">
                    {team.responsibilities.map((r, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <span className="text-[#6EE7B7] font-bold">•</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Chapter 4: 4 Flagship Events (Bioluminescent Root Undergrowth + Mobile Snap Carousel) */}
          <section
            id="events"
            className="p1-scroll-chapter rounded-3xl bg-[#0A1C0E]/95 text-emerald-50 border border-emerald-400/30 p-6 sm:p-10 lg:p-12 shadow-[0_0_50px_rgba(110,231,183,0.1)] backdrop-blur-md"
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 pb-4 border-b border-emerald-800/60">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#6EE7B7] font-semibold mb-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>Canopy Tier 4 · Flagship Community Drives</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  Events in Action
                </h2>
                <p className="text-sm text-emerald-200/80 mt-1">
                  Swipe across our on-ground school drives, denim sustainability stalls, orphanage partnerships, and climate workshops.
                </p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => scrollCarousel(eventsCarouselRef, 'left')}
                  aria-label="Previous event"
                  className="p-2 rounded-full bg-emerald-950 border border-emerald-500/40 text-[#6EE7B7] hover:bg-emerald-900"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollCarousel(eventsCarouselRef, 'right')}
                  aria-label="Next event"
                  className="p-2 rounded-full bg-emerald-950 border border-emerald-500/40 text-[#6EE7B7] hover:bg-emerald-900"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div
              ref={eventsCarouselRef}
              className="flex md:grid md:grid-cols-2 gap-4 overflow-x-auto snap-x snap-mandatory pb-3 text-xs"
            >
              {AVANI_EVENTS.map((event) => (
                <div
                  key={event.id}
                  className="min-w-[85vw] sm:min-w-[340px] md:min-w-0 snap-center rounded-2xl bg-[#08140B]/90 border border-emerald-500/25 overflow-hidden flex flex-col justify-between shadow-lg"
                >
                  <div>
                    <div className="relative h-44 sm:h-48 w-full bg-stone-900">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        sizes="(max-width: 768px) 90vw, 50vw"
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#08140B] via-transparent to-transparent" />
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between gap-2 text-[10px] font-mono text-white">
                        <span className="inline-flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded">
                          <Clock className="w-3 h-3 text-[#6EE7B7]" />
                          {event.timeframe}
                        </span>
                        <span className="inline-flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded truncate max-w-[175px]">
                          <MapPin className="w-3 h-3 text-[#6EE7B7]" />
                          {event.location}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      {event.partner && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-teal-950 border border-teal-400/40 text-teal-300 text-[10px] font-mono font-semibold mb-2">
                          <HeartHandshake className="w-3 h-3" />
                          Partner: {event.partner}
                        </span>
                      )}
                      <span className="font-bold font-serif block text-base mb-1 text-white">
                        {event.title}
                      </span>
                      <p className="text-[11px] text-[#6EE7B7] mb-2">{event.subtitle}</p>
                      <p className="text-emerald-100/90 leading-relaxed italic bg-emerald-950/60 p-3 rounded-xl border border-emerald-800/50 mb-2">
                        &ldquo;{event.verbatimCopy}&rdquo;
                      </p>
                    </div>
                  </div>
                  {event.metrics && (
                    <div className="px-4 pb-4 pt-2 border-t border-emerald-800/50 flex flex-wrap gap-2 text-[10px] font-mono">
                      {event.metrics.map((m, idx) => (
                        <span
                          key={idx}
                          className="bg-emerald-950 px-2.5 py-1 rounded-lg text-[#A7F3D0] border border-emerald-600/30"
                        >
                          {m.label}: <strong className="text-white">{m.value}</strong>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Chapter 5: 11 Climate Tips, Substack Journal & Nocturnal GlowGarden Pool CTA */}
          <section
            id="climate-tips"
            className="p1-scroll-chapter rounded-3xl bg-[#163515] text-[#DCE7D4] border border-[#6EE7B7]/40 p-6 sm:p-10 lg:p-12 shadow-[0_0_60px_rgba(110,231,183,0.16)] mb-12"
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#6EE7B7] font-semibold mb-1.5">
                  <Droplets className="w-4 h-4" />
                  <span>Canopy Tier 5 · Nocturnal GlowGarden Pool</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  11 Daily Climate Tips
                </h2>
                <p className="text-xs sm:text-sm text-emerald-200/90 mt-1">
                  Small actions by many add up to monumental global transformation.
                </p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setInfographicOpen(true)}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#08140B]/80 hover:bg-[#08140B] border border-[#6EE7B7]/40 text-[#A7F3D0] text-xs font-mono transition-colors"
                >
                  <FileImage className="w-4 h-4 text-[#6EE7B7]" />
                  <span>View Infographic</span>
                </button>
                <button
                  type="button"
                  onClick={() => scrollCarousel(tipsCarouselRef, 'left')}
                  aria-label="Previous tips"
                  className="p-2 rounded-full bg-[#08140B]/70 border border-emerald-500/30 text-[#6EE7B7] md:hidden"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollCarousel(tipsCarouselRef, 'right')}
                  aria-label="Next tips"
                  className="p-2 rounded-full bg-[#08140B]/70 border border-emerald-500/30 text-[#6EE7B7] md:hidden"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-5">
              {[
                { id: 'all', label: 'All 11 Tips' },
                { id: 'energy', label: 'Energy (2)' },
                { id: 'water', label: 'Water (2)' },
                { id: 'waste', label: 'Waste (3)' },
                { id: 'consumption', label: 'Consumption (4)' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedTipCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all ${
                    selectedTipCategory === cat.id
                      ? 'bg-[#6EE7B7] text-[#08140B] font-bold shadow-[0_0_12px_rgba(110,231,183,0.45)]'
                      : 'bg-emerald-950/70 text-emerald-200 border border-emerald-700/50 hover:border-emerald-400/50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Mobile Snap Carousel -> Responsive Grid */}
            <div
              ref={tipsCarouselRef}
              className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-3 overflow-x-auto snap-x snap-mandatory text-xs mb-8 pb-2"
            >
              {CLIMATE_TIPS.map((tip) =>
                selectedTipCategory === 'all' || tip.category === selectedTipCategory ? (
                  <div
                    key={tip.id}
                    className="min-w-[78vw] sm:min-w-[260px] md:min-w-0 snap-center p-3.5 rounded-xl bg-[#08140B]/75 border border-emerald-500/30 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1 font-mono text-[10px] text-emerald-400">
                        <span className="uppercase">{tip.category}</span>
                        <span>#{tip.id}</span>
                      </div>
                      <span className="font-bold text-[#A7F3D0] block mb-1">
                        Tip #{tip.id}: {tip.shortTitle}
                      </span>
                      <span className="text-emerald-100/90 leading-relaxed">&ldquo;{tip.action}&rdquo;</span>
                    </div>
                  </div>
                ) : null
              )}
            </div>

            {/* Verified Substack Editorial Articles */}
            <div className="mb-8 pt-6 border-t border-emerald-800/60">
              <p className="font-mono text-xs uppercase tracking-wider text-[#6EE7B7] font-semibold mb-3">
                Youth Sustainability Journal · Verified Substack Articles
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                {EXTERNAL_LINKS.substackArticles.map((article, idx) => (
                  <a
                    key={idx}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl bg-[#08140B]/70 border border-emerald-700/50 hover:border-[#6EE7B7] transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <span className="text-[10px] font-mono text-emerald-400 block mb-1">
                        {article.publishedDate || 'Substack Dispatch'}
                      </span>
                      <span className="font-bold text-white group-hover:text-[#A7F3D0] transition-colors block mb-1.5">
                        {article.title}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#6EE7B7] mt-2">
                      Read on Substack <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Application Instructions */}
            <div className="mb-8 pt-6 border-t border-emerald-800/60">
              <h3 className="font-serif font-bold text-white text-base mb-3">
                Volunteer Recruitment Instructions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs text-emerald-100">
                {AVANI_ORGANIZATION.applicationInstructions.map((rule) => (
                  <div key={rule.step} className="p-3 rounded-xl bg-[#08140B]/60 border border-emerald-700/50 flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-[#6EE7B7]/20 text-[#6EE7B7] font-mono font-bold flex items-center justify-center shrink-0">
                      {rule.step}
                    </span>
                    <div>
                      <span>{rule.text}</span>
                      {rule.highlight && (
                        <code className="block mt-1 text-[10px] font-mono text-[#A7F3D0] bg-emerald-950 px-2 py-0.5 rounded w-fit">
                          {rule.highlight}
                        </code>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-emerald-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-serif font-bold text-white text-lg">Join the Avani Community</p>
                <p className="text-xs text-emerald-200">Sign up for volunteer recruitment across all 5 student teams.</p>
              </div>
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#6EE7B7] text-[#163515] font-bold text-xs shadow-[0_0_20px_rgba(110,231,183,0.45)] hover:bg-[#A7F3D0] transition-all active:scale-95"
              >
                <span>Apply via Google Form</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </section>
        </div>

        {/* Verified Climate Tips Infographic Modal / Lightbox */}
        {infographicOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setInfographicOpen(false)}
          >
            <div
              className="relative max-w-4xl w-full bg-[#08140B] border border-[#6EE7B7]/40 rounded-2xl p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-emerald-900/60">
                <span className="text-xs font-mono uppercase tracking-wider text-[#6EE7B7] font-bold">
                  Avani 11 Climate Tips Infographic
                </span>
                <button
                  type="button"
                  onClick={() => setInfographicOpen(false)}
                  aria-label="Close infographic modal"
                  className="p-1.5 rounded-lg bg-emerald-950 text-emerald-200 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="relative w-full h-[65vh] sm:h-[75vh]">
                <Image
                  src="/assets/images/climate_tips_infographic.webp"
                  alt="11 Daily Climate Tips Official Infographic"
                  fill
                  sizes="(max-width: 1024px) 100vw, 896px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        )}

        {/* Mobile Sticky Floating CTA */}
        <div className="fixed bottom-5 right-5 z-40 md:hidden">
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#08140B]/95 border border-[#6EE7B7]/60 text-[#DCE7D4] font-bold text-xs shadow-[0_0_25px_rgba(110,231,183,0.35)] backdrop-blur-md active:scale-95 transition-transform"
          >
            <span className="w-2 h-2 rounded-full bg-[#6EE7B7] animate-ping" />
            <span>Apply to Avani</span>
            <ArrowUpRight className="w-4 h-4 text-[#6EE7B7]" />
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
