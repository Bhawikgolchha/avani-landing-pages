'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  Trees,
  Sprout,
  ArrowDown,
  ArrowUpRight,
  ExternalLink,
  Megaphone,
  Wind,
  Recycle,
  Share2,
  Users,
  Calendar,
  Droplets,
  LightbulbOff,
  PlugZap,
  ShoppingBag,
  UtensilsCrossed,
  Wrench,
  Waves,
  Ban,
  Archive,
  FileText,
  BookOpen,
  Palette,
  Smartphone,
  CheckCircle2,
  MapPin,
  Clock,
  HeartHandshake,
  Compass,
  HelpCircle,
  Mail,
  Phone,
  FileImage,
  X,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import {
  AVANI_OBJECTIVES,
  AVANI_TEAMS,
  AVANI_EVENTS,
  CLIMATE_TIPS,
  AVANI_ORGANIZATION,
  EXTERNAL_LINKS,
  TipCategory,
} from '@/lib/avaniContent';

// Helper map for Objective icons
const OBJECTIVE_ICON_MAP: Record<string, React.ElementType> = {
  Megaphone,
  Trees,
  Wind,
  Recycle,
  Share2,
};

// Helper map for Team icons
const TEAM_ICON_MAP: Record<string, React.ElementType> = {
  BookOpen,
  Palette,
  Users,
  Smartphone,
  Calendar,
};

// Helper map for Climate Tip icons
const TIP_ICON_MAP: Record<string, React.ElementType> = {
  LightbulbOff,
  PlugZap,
  Droplets,
  ShoppingBag,
  Sprout,
  UtensilsCrossed,
  Wrench,
  Waves,
  Ban,
  Archive,
  FileText,
};

export function P1Overlay() {
  const [activeTeamId, setActiveTeamId] = useState<string>(AVANI_TEAMS[0].id);
  const [selectedTipCategory, setSelectedTipCategory] = useState<string>('all');
  const [infographicOpen, setInfographicOpen] = useState(false);

  // References for horizontal scrolling carousels on mobile
  const eventsCarouselRef = useRef<HTMLDivElement>(null);
  const tipsCarouselRef = useRef<HTMLDivElement>(null);

  const scrollCarousel = (
    ref: React.RefObject<HTMLDivElement>,
    direction: 'left' | 'right'
  ) => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const filteredTips =
    selectedTipCategory === 'all'
      ? CLIMATE_TIPS
      : CLIMATE_TIPS.filter((tip) => tip.category === selectedTipCategory);

  return (
    <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-24 sm:gap-32">
      {/* =========================================================================
          STAGE 1: HERO LIVING CANOPY (Canva Idea 5 Botanical Canopy)
          ========================================================================= */}
      <section
        id="canopy-hero"
        className="min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-center items-center text-center pt-8 sm:pt-16 pb-12"
      >
        {/* GlowGarden Bioluminescent Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-950/60 border border-emerald-500/30 backdrop-blur-md text-emerald-300 text-xs font-mono uppercase tracking-wider mb-6 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Prototype 1 · Bioluminescent Living Canopy</span>
        </div>

        {/* Circular Official Avani Brand Emblem */}
        <div className="relative mb-6 group">
          <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-lime-400 opacity-60 blur-md group-hover:opacity-100 transition-opacity" />
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-emerald-400/80 bg-stone-900 shadow-2xl">
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

        {/* Verbatim Greeting & Main Headline */}
        <p className="text-xs sm:text-sm font-mono tracking-widest text-emerald-800 uppercase font-semibold mb-2">
          {AVANI_ORGANIZATION.greeting}
        </p>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-[#163515] max-w-4xl leading-[1.15] tracking-tight">
          Rooted in Purpose. <br />
          <span className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 bg-clip-text text-transparent">
            Growing for Tomorrow.
          </span>
        </h1>

        {/* Verbatim Mission Summary */}
        <p className="mt-5 text-sm sm:text-base text-stone-700 max-w-2xl font-sans leading-relaxed">
          {AVANI_ORGANIZATION.verbatimSummary}
        </p>

        {/* Verified Telemetry Badges Bar */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-3xl">
          <div className="p-3.5 rounded-2xl bg-white/80 backdrop-blur-md border border-emerald-900/10 shadow-sm flex flex-col items-center">
            <span className="text-lg sm:text-xl font-bold font-mono text-emerald-900">100%</span>
            <span className="text-[11px] font-mono text-emerald-700 uppercase tracking-wider">Student-Led</span>
            <span className="text-[10px] text-stone-500 mt-0.5">Bangalore Collective</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/80 backdrop-blur-md border border-emerald-900/10 shadow-sm flex flex-col items-center">
            <span className="text-lg sm:text-xl font-bold font-mono text-emerald-900">5 Teams</span>
            <span className="text-[11px] font-mono text-emerald-700 uppercase tracking-wider">Specialized</span>
            <span className="text-[10px] text-stone-500 mt-0.5">Curated Divisions</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/80 backdrop-blur-md border border-emerald-900/10 shadow-sm flex flex-col items-center">
            <span className="text-lg sm:text-xl font-bold font-mono text-emerald-900">4 Drives</span>
            <span className="text-[11px] font-mono text-emerald-700 uppercase tracking-wider">Flagship Events</span>
            <span className="text-[10px] text-stone-500 mt-0.5">Grassroots Impact</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-white/80 backdrop-blur-md border border-emerald-900/10 shadow-sm flex flex-col items-center">
            <span className="text-lg sm:text-xl font-bold font-mono text-emerald-900">11 Actions</span>
            <span className="text-[11px] font-mono text-emerald-700 uppercase tracking-wider">Climate Tips</span>
            <span className="text-[10px] text-stone-500 mt-0.5">High-Impact Habits</span>
          </div>
        </div>

        {/* Dual Interactive CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4">
          <a
            href={EXTERNAL_LINKS.applicationForm}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-[#163515] text-[#DCE7D4] font-semibold text-sm shadow-lg hover:bg-emerald-900 hover:text-white transition-all transform active:scale-95 hover:shadow-emerald-900/20"
          >
            <span>Join Avani (Cohort 2026)</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <a
            href="#objectives"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white/80 border border-emerald-900/15 text-emerald-950 font-medium text-sm hover:bg-emerald-50 transition-all backdrop-blur-sm"
          >
            <Compass className="w-4 h-4 text-emerald-800" />
            <span>Explore Canopy Objectives</span>
          </a>
        </div>

        {/* Operational Highlights Strip */}
        <div className="mt-12 w-full max-w-4xl p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/60 backdrop-blur-sm text-left">
          <p className="text-xs font-mono uppercase tracking-wider text-emerald-900 font-bold mb-2 flex items-center gap-1.5">
            <Sprout className="w-4 h-4 text-emerald-700" />
            How We Operate · Bangalore Youth Methodology
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs text-stone-700">
            {AVANI_ORGANIZATION.howWeWorkHighlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator Prompt */}
        <div className="mt-8 flex flex-col items-center gap-1 text-xs font-mono text-emerald-800/80 animate-pulse">
          <ArrowDown className="w-4 h-4 animate-bounce" />
          <span>Scroll to descend through the Living Canopy</span>
        </div>
      </section>

      {/* =========================================================================
          STAGE 2: MID-LEVEL FOLIAGE — 5 CORE OBJECTIVES
          ========================================================================= */}
      <section
        id="objectives"
        className="rounded-3xl bg-white/85 dark:bg-stone-900/80 border border-emerald-900/10 dark:border-emerald-500/20 p-6 sm:p-10 lg:p-12 shadow-xl backdrop-blur-md"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-emerald-900/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold mb-1">
              <Trees className="w-4 h-4" />
              <span>Canopy Tier 2 · PDF Verified Page 1</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#163515]">
              Our 5 Core Objectives
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-xl">
              Driving actionable environmental restoration, anti-pollution advocacy, and circular waste systems.
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100/80 text-emerald-900 text-xs font-mono font-medium self-start sm:self-auto">
            <span>5 Mandates</span>
            <span className="text-emerald-500">·</span>
            <span>Verbatim Copy</span>
          </div>
        </div>

        {/* 5 Objectives Interactive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {AVANI_OBJECTIVES.map((obj) => {
            const IconComponent = OBJECTIVE_ICON_MAP[obj.icon] || Sprout;
            return (
              <div
                key={obj.id}
                className="group p-5 rounded-2xl bg-[#F9FAF7]/90 hover:bg-emerald-50/60 border border-emerald-900/10 hover:border-emerald-600/30 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 group-hover:scale-105 transition-transform">
                      <IconComponent className="w-5 h-5" />
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-200/60 text-emerald-900 font-semibold uppercase tracking-wider">
                        {obj.category}
                      </span>
                      <span className="font-mono text-xs font-bold text-emerald-700/60">
                        #{obj.id}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-serif font-bold text-base text-emerald-950 mb-2">
                    {obj.title}
                  </h3>

                  <p className="text-xs text-stone-700 leading-relaxed italic bg-white/60 p-3 rounded-xl border border-emerald-900/5">
                    &ldquo;{obj.verbatimCopy}&rdquo;
                  </p>
                </div>

                {obj.metric && (
                  <div className="mt-4 pt-3 border-t border-emerald-900/10 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-stone-500">Verified Metric</span>
                    <span className="text-emerald-800 font-bold bg-emerald-100/60 px-2 py-0.5 rounded">
                      {obj.metric}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          STAGE 3: TRUNK & MAJOR BRANCHES — 5 SPECIALIZED TEAMS
          ========================================================================= */}
      <section
        id="teams"
        className="rounded-3xl bg-white/85 dark:bg-stone-900/80 border border-emerald-900/10 dark:border-emerald-500/20 p-6 sm:p-10 lg:p-12 shadow-xl backdrop-blur-md"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-emerald-900/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold mb-1">
              <Users className="w-4 h-4" />
              <span>Canopy Tier 3 · Operational Structure</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#163515]">
              The 5 Specialized Teams
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-xl">
              Carefully-curated teams of students specializing in science journalism, design, outreach, media, and field logistics.
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100/80 text-emerald-900 text-xs font-mono font-medium self-start sm:self-auto">
            <span>Volunteer Roles</span>
            <span className="text-emerald-500">·</span>
            <span>Non-Paid Initiative</span>
          </div>
        </div>

        {/* Interactive Team Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {AVANI_TEAMS.map((team) => (
            <button
              key={team.id}
              onClick={() => setActiveTeamId(team.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTeamId === team.id
                  ? 'bg-[#163515] text-[#DCE7D4] shadow-md'
                  : 'bg-emerald-50/70 text-emerald-900 hover:bg-emerald-100/70'
              }`}
            >
              <span>{team.name}</span>
              <span className="text-[10px] opacity-75">#{team.number}</span>
            </button>
          ))}
        </div>

        {/* Selected Team In-Depth Showcase */}
        {(() => {
          const currentTeam =
            AVANI_TEAMS.find((t) => t.id === activeTeamId) || AVANI_TEAMS[0];
          const IconComponent =
            TEAM_ICON_MAP[currentTeam.icon || 'Users'] || Users;

          return (
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-emerald-50/50 via-white/80 to-[#F4EFEA]/60 border border-emerald-900/10 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-10 h-10 rounded-xl bg-[#163515] text-emerald-300 flex items-center justify-center shadow-sm">
                      <IconComponent className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#163515]">
                        {currentTeam.name}
                      </h3>
                      <p className="text-xs font-mono text-emerald-800 font-medium">
                        {currentTeam.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 max-w-2xl leading-relaxed mt-3">
                    {currentTeam.description}
                  </p>
                </div>

                <div className="flex flex-col gap-2 min-w-[200px] p-4 rounded-xl bg-white/80 border border-emerald-900/10 text-xs">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-stone-500 block">Focus Area</span>
                    <span className="font-semibold text-emerald-900">{currentTeam.keyFocus}</span>
                  </div>
                  <div className="pt-2 border-t border-stone-200">
                    <span className="text-[10px] font-mono uppercase text-stone-500 block">Division Tag</span>
                    <span className="font-mono text-emerald-800 font-bold">{currentTeam.tag}</span>
                  </div>
                </div>
              </div>

              {/* Responsibilities List */}
              <div className="mt-4">
                <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-900 font-bold mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  Key Responsibilities & Operational Mandates
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-stone-700">
                  {currentTeam.responsibilities.map((resp, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white/70 border border-emerald-900/5 flex items-start gap-2.5"
                    >
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-mono text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Research and Writing: Substack Article Showcase */}
              {currentTeam.id === 'research-writing' && (
                <div className="mt-8 pt-6 border-t border-emerald-900/10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-emerald-800" />
                      <span className="text-xs font-mono uppercase tracking-wider text-emerald-900 font-bold">
                        Published Substack Environmental Essays
                      </span>
                    </div>
                    <a
                      href={EXTERNAL_LINKS.substack}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-emerald-700 hover:text-emerald-900 flex items-center gap-1"
                    >
                      <span>avaniyocc.substack.com</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {EXTERNAL_LINKS.substackArticles.map((article) => (
                      <a
                        key={article.id}
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-3.5 rounded-xl bg-white border border-emerald-900/10 hover:border-emerald-600/40 transition-all flex flex-col justify-between"
                      >
                        <div>
                          <span className="text-[10px] font-mono text-stone-500 block mb-1">
                            {article.publishedDate}
                          </span>
                          <h5 className="font-serif font-bold text-xs text-emerald-950 group-hover:text-emerald-700 transition-colors">
                            {article.title}
                          </h5>
                          <p className="text-[11px] text-stone-600 mt-1 line-clamp-2">
                            {article.subtitle}
                          </p>
                        </div>
                        <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between text-[10px] font-mono text-emerald-800">
                          <span>Read Note</span>
                          <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })()}
      </section>

      {/* =========================================================================
          STAGE 4: UNDERGROWTH & FOREST FLOOR — 4 FLAGSHIP DRIVES
          ========================================================================= */}
      <section
        id="events"
        className="rounded-3xl bg-white/85 dark:bg-stone-900/80 border border-emerald-900/10 dark:border-emerald-500/20 p-6 sm:p-10 lg:p-12 shadow-xl backdrop-blur-md"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-emerald-900/10 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold mb-1">
              <Calendar className="w-4 h-4" />
              <span>Canopy Tier 4 · Ground-Level Action</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#163515]">
              Flagship Community Drives
            </h2>
            <p className="text-sm text-stone-600 mt-1 max-w-xl">
              Transforming climate consciousness into measurable community support across schools, cultural fests, and orphanages.
            </p>
          </div>
          {/* Carousel Navigation Buttons for Mobile/Tablet */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => scrollCarousel(eventsCarouselRef, 'left')}
              aria-label="Previous event"
              className="p-2 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-900 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollCarousel(eventsCarouselRef, 'right')}
              aria-label="Next event"
              className="p-2 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-900 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Flagship Drives: Responsive Grid + Mobile Snap Carousel */}
        <div
          ref={eventsCarouselRef}
          className="flex md:grid md:grid-cols-2 gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4"
        >
          {AVANI_EVENTS.map((event) => (
            <div
              key={event.id}
              className="min-w-[290px] sm:min-w-[340px] md:min-w-0 snap-center rounded-2xl bg-[#F9FAF7] border border-emerald-900/10 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                {/* Event Image Banner with WebP Optimization */}
                <div className="relative h-44 sm:h-52 w-full bg-stone-900 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] font-mono">
                    <span className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded">
                      <Clock className="w-3 h-3 text-emerald-400" />
                      {event.timeframe}
                    </span>
                    <span className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded truncate max-w-[180px]">
                      <MapPin className="w-3 h-3 text-emerald-400" />
                      {event.location}
                    </span>
                  </div>
                </div>

                {/* Event Copy & Partner */}
                <div className="p-5">
                  {event.partner && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-100 text-teal-900 text-[10px] font-mono font-bold mb-2">
                      <HeartHandshake className="w-3 h-3 text-teal-700" />
                      <span>Partner: {event.partner}</span>
                    </div>
                  )}

                  <h3 className="font-serif font-bold text-lg text-emerald-950 mb-1">
                    {event.title}
                  </h3>

                  <p className="text-xs text-emerald-800 font-medium mb-3">
                    {event.subtitle}
                  </p>

                  <p className="text-xs text-stone-700 leading-relaxed italic bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
                    &ldquo;{event.verbatimCopy}&rdquo;
                  </p>
                </div>
              </div>

              {/* Verified Event Metrics Strip */}
              {event.metrics && event.metrics.length > 0 && (
                <div className="px-5 pb-5 pt-2">
                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-emerald-900/10">
                    {event.metrics.map((m, mIdx) => (
                      <div
                        key={mIdx}
                        className="p-2 rounded-xl bg-white border border-emerald-900/5 text-center"
                      >
                        <span className="font-mono font-bold text-xs text-emerald-900 block">
                          {m.value}
                        </span>
                        <span className="text-[9px] font-mono text-stone-500 uppercase tracking-tighter block leading-tight">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          STAGE 5: DEEP TRANQUIL NOCTURNAL POOL — 11 CLIMATE TIPS & APPLY HUB
          ========================================================================= */}
      <section
        id="climate-tips"
        className="rounded-3xl bg-[#091b10]/95 text-stone-100 border border-emerald-500/30 p-6 sm:p-10 lg:p-12 shadow-[0_0_60px_rgba(16,185,129,0.12)] backdrop-blur-md"
      >
        {/* Section 5A: 11 Climate Tips */}
        <div className="border-b border-emerald-800/60 pb-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold mb-1">
                <Droplets className="w-4 h-4" />
                <span>Canopy Tier 5 · Nocturnal GlowGarden Sanctuary</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white">
                11 Daily Climate Actions
              </h2>
              <p className="text-sm text-emerald-200/80 mt-1 max-w-xl">
                Verbatim daily habits from the Avani Environmental Briefing proving that even small actions of many bring change to the world.
              </p>
            </div>

            {/* Infographic Preview Lightbox Button */}
            <button
              onClick={() => setInfographicOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-900/60 hover:bg-emerald-800/80 border border-emerald-500/30 text-emerald-300 text-xs font-mono transition-all self-start sm:self-auto"
            >
              <FileImage className="w-4 h-4 text-emerald-400" />
              <span>View Verified Infographic</span>
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
            {[
              { id: 'all', label: 'All 11 Tips' },
              { id: 'energy', label: 'Energy (2)' },
              { id: 'water', label: 'Water (2)' },
              { id: 'waste', label: 'Waste (3)' },
              { id: 'consumption', label: 'Consumption (4)' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedTipCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-medium transition-all ${
                  selectedTipCategory === cat.id
                    ? 'bg-emerald-400 text-emerald-950 font-bold shadow-[0_0_15px_rgba(52,211,153,0.4)]'
                    : 'bg-emerald-950/70 text-emerald-300 hover:bg-emerald-900/70'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* 11 Tips Snap Carousel / Grid */}
          <div
            ref={tipsCarouselRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5"
          >
            {filteredTips.map((tip) => {
              const TipIcon = TIP_ICON_MAP[tip.icon || 'Sprout'] || Sprout;
              return (
                <div
                  key={tip.id}
                  className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-800/40 hover:border-emerald-500/50 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="w-7 h-7 rounded-lg bg-emerald-900/80 flex items-center justify-center text-emerald-300">
                        <TipIcon className="w-4 h-4" />
                      </span>
                      <div className="flex items-center gap-1.5 font-mono text-[10px]">
                        <span className="text-emerald-400 uppercase font-semibold">
                          {tip.category}
                        </span>
                        <span className="text-emerald-600">·</span>
                        <span className="text-stone-400">#{tip.id}</span>
                      </div>
                    </div>

                    <h4 className="font-mono font-bold text-xs text-emerald-300 mb-1">
                      {tip.shortTitle}
                    </h4>

                    <p className="text-xs text-emerald-100/90 leading-relaxed italic">
                      &ldquo;{tip.action}&rdquo;
                    </p>
                  </div>

                  {tip.impactLevel && (
                    <div className="mt-3 pt-2 border-t border-emerald-900/40 flex items-center justify-between text-[10px] font-mono text-emerald-400">
                      <span>Impact:</span>
                      <span className="text-emerald-300 font-semibold">
                        {tip.impactLevel}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 5B: Official Recruitment & Application Rules */}
        <div id="apply" className="pt-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold mb-2">
            <HelpCircle className="w-4 h-4" />
            <span>Join Avani · PDF Recruitment Instructions</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-4">
            How to Apply for Volunteer Recruitment
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mb-8">
            {AVANI_ORGANIZATION.applicationInstructions.map((instruction) => (
              <div
                key={instruction.step}
                className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-800/50 flex items-start gap-3"
              >
                <span className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-mono text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {instruction.step}
                </span>
                <div>
                  <p className="text-emerald-100/95 leading-relaxed">
                    {instruction.text}
                  </p>
                  {instruction.highlight && (
                    <span className="mt-1.5 inline-block px-2 py-0.5 rounded bg-emerald-900/90 text-emerald-300 font-mono text-[10px] border border-emerald-700/50">
                      {instruction.highlight}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Grand Call to Action Banner */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-emerald-900/90 via-teal-900/80 to-[#163515] border border-emerald-400/40 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-1">
                Bangalore Youth Environmental Organization
              </p>
              <h4 className="font-serif font-bold text-2xl text-white">
                Be the Spark in Bangalore&apos;s Greener Future
              </h4>
              <p className="text-xs text-emerald-200 mt-1 max-w-md">
                All 5 teams welcome enthusiastic students. No previous experience required — only passion and dedication to our environment.
              </p>
            </div>

            <a
              href={EXTERNAL_LINKS.applicationForm}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-emerald-400 text-emerald-950 font-bold text-sm shadow-[0_0_25px_rgba(52,211,153,0.5)] hover:bg-emerald-300 transition-all transform active:scale-95 whitespace-nowrap"
            >
              <span>Submit Application Form</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Official Channels & Contact Telemetry */}
          <div className="mt-8 pt-6 border-t border-emerald-800/60 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <a
              href={EXTERNAL_LINKS.instagramClean}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-800/40 hover:border-emerald-500/40 text-emerald-300 flex items-center justify-between"
            >
              <span>Instagram</span>
              <span className="text-[10px] text-emerald-500">@avani_yocc</span>
            </a>
            <a
              href={EXTERNAL_LINKS.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-800/40 hover:border-emerald-500/40 text-emerald-300 flex items-center justify-between"
            >
              <span>LinkedIn</span>
              <span className="text-[10px] text-emerald-500">Avani Collective</span>
            </a>
            <a
              href={EXTERNAL_LINKS.emailMailto}
              className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-800/40 hover:border-emerald-500/40 text-emerald-300 flex items-center justify-between"
            >
              <span>Email</span>
              <span className="text-[10px] text-emerald-500 truncate max-w-[90px]">
                {EXTERNAL_LINKS.email}
              </span>
            </a>
            <a
              href={EXTERNAL_LINKS.phoneTel}
              className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-800/40 hover:border-emerald-500/40 text-emerald-300 flex items-center justify-between"
            >
              <span>Phone</span>
              <span className="text-[10px] text-emerald-500">
                {EXTERNAL_LINKS.phoneFormatted}
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          INFOGRAPHIC MODAL / LIGHTBOX
          ========================================================================= */}
      {infographicOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setInfographicOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full bg-stone-900 border border-emerald-500/40 rounded-2xl p-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-stone-800 text-stone-200">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                Avani 11 Climate Tips Infographic
              </span>
              <button
                onClick={() => setInfographicOpen(false)}
                className="p-1 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
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

      {/* =========================================================================
          MOBILE STICKY FLOATING "APPLY" CTA BUTTON (Thumb Accessibility)
          ========================================================================= */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        <a
          href={EXTERNAL_LINKS.applicationForm}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#163515] border border-emerald-400/40 text-[#DCE7D4] font-bold text-xs shadow-2xl backdrop-blur-md active:scale-95 transition-transform"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Apply to Avani</span>
          <ArrowUpRight className="w-4 h-4 text-emerald-400" />
        </a>
      </div>
    </div>
  );
}
