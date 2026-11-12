'use client';

import React, { useState, useId } from 'react';
import Image from 'next/image';
import {
  Activity,
  ArrowDown,
  ArrowUpRight,
  Shield,
  Cpu,
  Terminal,
  Zap,
  Radio,
  BookOpen,
  Calendar,
  Users,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Filter,
  Layers,
  Sparkles,
  MapPin,
  Clock,
  Mail,
  Phone,
  Linkedin,
  Instagram,
  Droplets,
  Lightbulb,
  Recycle,
  ShoppingBag,
  Info,
  SlidersHorizontal
} from 'lucide-react';
import {
  AVANI_ORGANIZATION,
  AVANI_OBJECTIVES,
  AVANI_TEAMS,
  AVANI_EVENTS,
  CLIMATE_TIPS,
  EXTERNAL_LINKS,
  TipCategory,
} from '@/lib/avaniContent';

export function P2Overlay() {
  const [activeTab, setActiveTab] = useState<'objectives' | 'teams' | 'events' | 'protocol'>('objectives');
  const [selectedTipCategory, setSelectedTipCategory] = useState<string>('all');
  const [activeEventIndex, setActiveEventIndex] = useState(0);

  // Filter tips based on category
  const filteredTips = selectedTipCategory === 'all'
    ? CLIMATE_TIPS
    : CLIMATE_TIPS.filter((tip) => tip.category === selectedTipCategory);

  const tipCategories: { id: string; label: string; count: number }[] = [
    { id: 'all', label: 'All Protocols', count: CLIMATE_TIPS.length },
    { id: 'energy', label: 'Energy', count: CLIMATE_TIPS.filter(t => t.category === 'energy').length },
    { id: 'water', label: 'Water', count: CLIMATE_TIPS.filter(t => t.category === 'water').length },
    { id: 'waste', label: 'Waste', count: CLIMATE_TIPS.filter(t => t.category === 'waste').length },
    { id: 'consumption', label: 'Consumption', count: CLIMATE_TIPS.filter(t => t.category === 'consumption').length },
  ];

  return (
    <div className="relative z-10 w-full overflow-x-hidden">
      {/* Top Telemetry Ticker Bar */}
      <div className="w-full bg-stone-950/80 border-b border-cyan-500/20 backdrop-blur-md px-4 py-2 text-[11px] font-mono text-cyan-400">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-300 font-semibold">SYS_STATUS: ONLINE</span>
            </span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:flex items-center gap-1 text-slate-300">
              <MapPin className="w-3 h-3 text-cyan-400" />
              12.9716° N, 77.5946° E (Bangalore)
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 text-[10px]">
            <span className="hidden md:inline">ORGANIZATION: AVANI YOUTH</span>
            <span className="text-cyan-400 font-bold">100% STUDENT-LED</span>
            <span className="text-emerald-400">COHORT 2025 ACTIVE</span>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 flex flex-col gap-16 sm:gap-24">
        
        {/* ========================================================================= */}
        {/* CHAPTER 1: HERO TELEMETRY HUD */}
        {/* ========================================================================= */}
        <section className="min-h-[75vh] flex flex-col justify-center items-center text-center relative pt-8 sm:pt-12">
          {/* Beacon pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-950/90 border border-cyan-400/40 text-cyan-300 text-xs font-mono font-semibold uppercase tracking-wider mb-6 shadow-[0_0_20px_rgba(6,182,212,0.25)] backdrop-blur-md">
            <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Bangalore Telemetry Beacon · 12.9716° N, 77.5946° E</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-serif text-white max-w-4xl leading-[1.1] tracking-tight">
            Planetary Care.{' '}
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-200">
              Powered by Student Intelligence.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-2xl leading-relaxed">
            {AVANI_ORGANIZATION.verbatimSummary}
          </p>

          {/* PDF-Verified Facts Banner */}
          <div className="mt-8 w-full max-w-3xl grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div className="p-3.5 rounded-2xl bg-stone-950/85 border border-cyan-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.1)]">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-400 block">4</span>
              <span className="text-[11px] font-mono text-slate-300 uppercase tracking-wider">Community Drives</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-stone-950/85 border border-emerald-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-400 block">5</span>
              <span className="text-[11px] font-mono text-slate-300 uppercase tracking-wider">Specialized Teams</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-stone-950/85 border border-teal-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(20,184,166,0.1)]">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-teal-300 block">11</span>
              <span className="text-[11px] font-mono text-slate-300 uppercase tracking-wider">Climate Actions</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-stone-950/85 border border-sky-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(56,189,248,0.1)]">
              <span className="text-2xl sm:text-3xl font-extrabold font-mono text-sky-400 block">100%</span>
              <span className="text-[11px] font-mono text-slate-300 uppercase tracking-wider">Student-Led</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a
              href={EXTERNAL_LINKS.applicationForm}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:brightness-110 hover:scale-[1.02] transition-all"
            >
              <Terminal className="w-4 h-4" />
              <span>Initialize Enlistment Protocol</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <a
              href="#telemetry-modules"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-stone-900/90 border border-cyan-500/30 text-cyan-300 hover:text-white hover:border-cyan-400 text-sm font-mono transition-all backdrop-blur-sm"
            >
              <span>Explore Telemetry Modules</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </a>
          </div>

          {/* Scroll Guide Indicator */}
          <div className="mt-12 flex items-center gap-2 text-xs font-mono text-cyan-400/80">
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-cyan-400" />
            <span>Scroll down to navigate planetary data layers</span>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* INTERACTIVE TELEMETRY MODULE SELECTOR (STICKY DESKTOP & MOBILE TABS) */}
        {/* ========================================================================= */}
        <section id="telemetry-modules" className="scroll-mt-24">
          <div className="p-2 sm:p-2.5 rounded-2xl sm:rounded-full bg-stone-950/90 border border-cyan-500/30 backdrop-blur-xl shadow-[0_0_30px_rgba(6,182,212,0.12)]">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs font-mono">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('objectives');
                  document.getElementById('objectives')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`py-2.5 px-3 rounded-xl sm:rounded-full flex items-center justify-center gap-2 transition-all ${
                  activeTab === 'objectives'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-[0_0_15px_rgba(6,182,212,0.25)] font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-stone-900/50'
                }`}
              >
                <Terminal className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">01. Objectives</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('teams');
                  document.getElementById('teams')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`py-2.5 px-3 rounded-xl sm:rounded-full flex items-center justify-center gap-2 transition-all ${
                  activeTab === 'teams'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/50 shadow-[0_0_15px_rgba(16,185,129,0.25)] font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-stone-900/50'
                }`}
              >
                <Cpu className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">02. Teams (5)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('events');
                  document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`py-2.5 px-3 rounded-xl sm:rounded-full flex items-center justify-center gap-2 transition-all ${
                  activeTab === 'events'
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-400/50 shadow-[0_0_15px_rgba(20,184,166,0.25)] font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-stone-900/50'
                }`}
              >
                <Radio className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span className="truncate">03. Field Ops (4)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('protocol');
                  document.getElementById('climate-tips')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`py-2.5 px-3 rounded-xl sm:rounded-full flex items-center justify-center gap-2 transition-all ${
                  activeTab === 'protocol'
                    ? 'bg-sky-500/20 text-sky-300 border border-sky-400/50 shadow-[0_0_15px_rgba(56,189,248,0.25)] font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-stone-900/50'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span className="truncate">04. Protocol (11)</span>
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CHAPTER 2: THE 5 STRATEGIC OBJECTIVES */}
        {/* ========================================================================= */}
        <section
          id="objectives"
          className="rounded-3xl bg-stone-950/85 border border-emerald-500/20 p-6 sm:p-10 lg:p-12 shadow-[0_0_35px_rgba(16,185,129,0.06)] backdrop-blur-md scroll-mt-24"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-800">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-2">
                <Terminal className="w-4 h-4" />
                <span>TELEMETRY MODULE 01 // CORE DIRECTIVES</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                The 5 Strategic Objectives
              </h2>
              <p className="text-sm text-slate-400 mt-1 max-w-xl">
                Verbatim operational tenets defined in the Avani founding charter for student-led environmental defense.
              </p>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>5 / 5 ACTIVE DIRECTIVES</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {AVANI_OBJECTIVES.map((obj) => (
              <div
                key={obj.id}
                className="group relative p-6 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                      DIR_0{obj.id}
                    </span>
                    {obj.metric && (
                      <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                        {obj.metric}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {obj.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed italic bg-stone-950/50 p-3 rounded-xl border border-stone-800/80">
                    &ldquo;{obj.verbatimCopy}&rdquo;
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-800 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Scope: {obj.category}</span>
                  <span className="text-cyan-400 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CHAPTER 3: THE 5 SPECIALIZED STUDENT TEAMS */}
        {/* ========================================================================= */}
        <section
          id="teams"
          className="rounded-3xl bg-stone-950/85 border border-cyan-500/20 p-6 sm:p-10 lg:p-12 shadow-[0_0_35px_rgba(6,182,212,0.06)] backdrop-blur-md scroll-mt-24"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-800">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400 font-semibold mb-2">
                <Cpu className="w-4 h-4" />
                <span>TELEMETRY MODULE 02 // TASKFORCE SPECIALIZATION</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                5 Specialized Student Teams
              </h2>
              <p className="text-sm text-slate-400 mt-1 max-w-xl">
                Carefully-curated operational cohorts executing research, visual design, logistics, media, and partnerships.
              </p>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-3 py-1.5 rounded-full">
              <span>TEAM COHORTS: 5</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {AVANI_TEAMS.map((team) => (
              <div
                key={team.id}
                className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_0_20px_rgba(16,185,129,0.1)]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                        UNIT_0{team.number}
                      </span>
                      <h3 className="text-lg font-bold text-white font-serif">{team.name}</h3>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-stone-950 text-cyan-300 border border-cyan-500/30 shrink-0">
                      {team.tag}
                    </span>
                  </div>

                  <p className="text-xs text-emerald-400 font-mono mb-3">{team.role}</p>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">{team.description}</p>

                  <div className="bg-stone-950/60 p-4 rounded-xl border border-stone-800/80">
                    <p className="text-xs font-mono text-cyan-400 font-semibold mb-2 uppercase tracking-wider">
                      Core Responsibilities:
                    </p>
                    <ul className="flex flex-col gap-2 text-xs text-slate-300">
                      {team.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Key Focus: {team.keyFocus}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CHAPTER 4: FIELD OPERATIONS RECORD (4 FLAGSHIP COMMUNITY DRIVES) */}
        {/* ========================================================================= */}
        <section
          id="events"
          className="rounded-3xl bg-stone-950/85 border border-teal-500/20 p-6 sm:p-10 lg:p-12 shadow-[0_0_35px_rgba(20,184,166,0.06)] backdrop-blur-md scroll-mt-24"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-800">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-teal-400 font-semibold mb-2">
                <Radio className="w-4 h-4" />
                <span>TELEMETRY MODULE 03 // FIELD OPERATIONS RECORD</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                4 Flagship Community Activations
              </h2>
              <p className="text-sm text-slate-400 mt-1 max-w-xl">
                On-the-ground campus and community drives documented with verified impact metrics and photographic evidence.
              </p>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-mono text-teal-300 bg-teal-950/60 border border-teal-500/30 px-3 py-1.5 rounded-full">
              <span>FIELD RECORDS: 4 DEPLOYED</span>
            </div>
          </div>

          {/* Grid layout on desktop, snap carousel on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {AVANI_EVENTS.map((event) => (
              <div
                key={event.id}
                className="group rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-teal-500/40 overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-[0_0_25px_rgba(20,184,166,0.15)]"
              >
                <div>
                  {/* High-res generated WebP event imagery */}
                  <div className="relative w-full h-48 sm:h-56 bg-stone-950 overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/30 to-transparent" />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full bg-stone-950/90 text-teal-300 border border-teal-400/40 text-[10px] font-mono uppercase tracking-wider backdrop-blur-md">
                        MISSION_0{event.number}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full bg-stone-950/90 text-slate-300 border border-stone-700 text-[10px] font-mono backdrop-blur-md">
                        {event.timeframe}
                      </span>
                    </div>
                  </div>

                  {/* Event Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{event.location}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-teal-300 transition-colors mb-1 font-serif">
                      {event.title}
                    </h3>
                    <p className="text-xs text-slate-400 mb-3 font-medium">{event.subtitle}</p>

                    <p className="text-sm text-slate-300 leading-relaxed italic bg-stone-950/60 p-3.5 rounded-xl border border-stone-800/80 mb-4">
                      &ldquo;{event.verbatimCopy}&rdquo;
                    </p>

                    {/* Impact Metrics */}
                    {event.metrics && (
                      <div className="grid grid-cols-3 gap-2 pt-2">
                        {event.metrics.map((m, idx) => (
                          <div
                            key={idx}
                            className="p-2 rounded-lg bg-stone-950/80 border border-stone-800 text-center"
                          >
                            <span className="block text-sm sm:text-base font-extrabold font-mono text-teal-300">
                              {m.value}
                            </span>
                            <span className="block text-[10px] text-slate-400 font-mono leading-tight">
                              {m.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Event Tags */}
                {event.tags && (
                  <div className="px-6 pb-5 pt-2 flex flex-wrap gap-1.5 border-t border-stone-800/80">
                    {event.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-stone-950 text-slate-400 border border-stone-800"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CHAPTER 5: BIOSPHERE PROTOCOL (11 CLIMATE ACTION TIPS) */}
        {/* ========================================================================= */}
        <section
          id="climate-tips"
          className="rounded-3xl bg-stone-950/90 border border-cyan-400/40 p-6 sm:p-10 lg:p-12 shadow-[0_0_40px_rgba(6,182,212,0.15)] backdrop-blur-md scroll-mt-24"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-800">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-2">
                <Zap className="w-4 h-4" />
                <span>TELEMETRY MODULE 04 // BIOSPHERE PROTOCOL</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-tight">
                11 Climate Action Protocols
              </h2>
              <p className="text-sm text-slate-400 mt-1 max-w-xl">
                Daily environmental habit directives compiled by Avani student researchers to curb household emissions and resource degradation.
              </p>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-mono text-cyan-300 bg-cyan-950/80 border border-cyan-400/50 px-3 py-1.5 rounded-full">
              <span>DIRECTIVES: 11 VERIFIED</span>
            </div>
          </div>

          {/* Sector Category Filters */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5 mr-2">
              <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
              Sector Filter:
            </span>
            {tipCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedTipCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                  selectedTipCategory === cat.id
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                    : 'bg-stone-900 text-slate-400 border border-stone-800 hover:text-white hover:border-slate-700'
                }`}
              >
                <span>{cat.label}</span>
                <span className="ml-1.5 opacity-70">({cat.count})</span>
              </button>
            ))}
          </div>

          {/* Tips Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTips.map((tip) => (
              <div
                key={tip.id}
                className="p-4 rounded-xl bg-stone-900/90 border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-200 flex flex-col justify-between climate-tip-item"
                data-testid={`climate-tip-${tip.id}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2 text-xs font-mono">
                    <span className="font-bold text-cyan-300">
                      PROTOCOL #{tip.id < 10 ? `0${tip.id}` : tip.id}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-stone-950 text-slate-300 border border-stone-800">
                      {tip.category}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1.5">{tip.shortTitle}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed italic bg-stone-950/50 p-2.5 rounded-lg border border-stone-800/60">
                    &ldquo;{tip.action}&rdquo;
                  </p>
                </div>

                <div className="mt-4 pt-2.5 border-t border-stone-800/80 flex items-center justify-between text-[11px] font-mono text-emerald-400">
                  <span>Impact: {tip.impactLevel}</span>
                  <span className="text-slate-500">{tip.categoryLabel}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Infographic Callout */}
          <div className="mt-8 p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-cyan-300">
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-cyan-400 shrink-0" />
              <span>
                All 11 climate protocols are extracted verbatim from the Avani Environmental Briefing Document.
              </span>
            </div>
            <a
              href="/assets/images/climate_tips_infographic.webp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-200 underline shrink-0 font-bold"
            >
              <span>View Infographic Poster</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CHAPTER 6: HIGH-TECH TERMINAL ENLISTMENT CTA & APPLICATION PROTOCOL */}
        {/* ========================================================================= */}
        <section
          id="apply"
          className="rounded-3xl bg-stone-950 border-2 border-emerald-500/40 p-6 sm:p-10 lg:p-12 shadow-[0_0_50px_rgba(16,185,129,0.15)] scroll-mt-24"
        >
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between pb-4 border-b border-stone-800 mb-6">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <span className="text-xs font-mono text-slate-400 ml-2">
                bash: avani-candidate-enlistment.sh
              </span>
            </div>
            <div className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
              TERMINAL_ACTIVE
            </div>
          </div>

          {/* Terminal CLI Body */}
          <div className="p-4 sm:p-6 rounded-2xl bg-black/80 border border-stone-800 font-mono text-xs sm:text-sm text-slate-300 flex flex-col gap-3 mb-8">
            <div className="text-cyan-400">
              <span className="text-emerald-400">avani@biosphere:~$</span> ./enlist --cohort=2025 --region=bangalore
            </div>
            <div className="text-slate-400 pl-4 border-l-2 border-cyan-500/40 flex flex-col gap-1.5">
              <p>[INIT] Loading Avani Youth Environmental candidate protocol...</p>
              <p>[INFO] Target cohort: 2025 Bangalore Student Leadership.</p>
              <p>[INFO] Recruitment tracks: Research, Design, HR/Comms, Social Media, Event Planning.</p>
              <p>[STATUS] Google Form Recruitment Gateway: <span className="text-emerald-400 font-bold">OPEN FOR APPLICANTS</span></p>
            </div>
          </div>

          {/* Application Steps (All 6 Instructions verbatim) */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-white font-serif mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-400" />
              <span>Application Instructions (Charter Guidelines)</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {AVANI_ORGANIZATION.applicationInstructions.map((instruction) => (
                <div
                  key={instruction.step}
                  className="p-3.5 rounded-xl bg-stone-900/70 border border-stone-800 flex items-start gap-3"
                >
                  <span className="w-6 h-6 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-mono font-bold shrink-0 text-[11px]">
                    0{instruction.step}
                  </span>
                  <div>
                    <p className="text-slate-300 leading-relaxed">{instruction.text}</p>
                    {instruction.highlight && (
                      <span className="inline-block mt-1 font-mono text-[10px] text-cyan-300 bg-cyan-950/60 px-1.5 py-0.5 rounded border border-cyan-500/30">
                        {instruction.highlight}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Main Action Bar */}
          <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-serif font-bold text-white text-xl">
                Ready to enlist in Avani Cohort 2025?
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Fill out the official Google Form application to be considered for interview rounds.
              </p>
            </div>
            <a
              href={EXTERNAL_LINKS.applicationForm}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 text-slate-950 font-extrabold text-sm tracking-wide shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:scale-105 hover:brightness-110 transition-all shrink-0"
            >
              <span>Launch Official Google Form</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CHAPTER 7: SUBSTACK INVESTIGATIONS & EXTERNAL INTELLIGENCE */}
        {/* ========================================================================= */}
        <section className="rounded-3xl bg-stone-950/85 border border-stone-800 p-6 sm:p-10 lg:p-12 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-800">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-2">
                <BookOpen className="w-4 h-4" />
                <span>ENVIRONMENTAL DISPATCHES // SUBSTACK INVESTIGATIONS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                Published Climate Notes & Essays
              </h2>
              <p className="text-sm text-slate-400 mt-1 max-w-xl">
                Research articles authored by the Avani Research and Writing taskforce, published on Substack.
              </p>
            </div>
            <a
              href={EXTERNAL_LINKS.substack}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono text-cyan-300 hover:text-white transition-colors self-start sm:self-auto"
            >
              <span>View Avani Substack</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EXTERNAL_LINKS.substackArticles.map((art) => (
              <a
                key={art.id}
                href={art.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-2">
                    <span className="text-cyan-400">DISPATCH #{art.id.toUpperCase()}</span>
                    <span>{art.publishedDate}</span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-2 font-serif">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {art.subtitle}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs font-mono text-cyan-400">
                  <span>Read Investigation</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CHAPTER 8: ALL 7 EXTERNAL CHANNELS & DIRECT CONTACT */}
        {/* ========================================================================= */}
        <section className="rounded-3xl bg-stone-950/85 border border-cyan-500/20 p-6 sm:p-10 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-emerald-500/40 bg-[#163515] shrink-0">
                <Image
                  src="/assets/branding/logo.jpg"
                  alt="Official Avani Logo"
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-serif flex items-center gap-2">
                  <span>Avani Youth Environmental Organization</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                    Bangalore
                  </span>
                </h3>
                <p className="text-xs text-slate-400">
                  Official correspondence & communications channels.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={EXTERNAL_LINKS.emailMailto}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-800 text-xs font-mono text-slate-300 hover:text-white hover:border-cyan-500/40 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>{EXTERNAL_LINKS.email}</span>
              </a>
              <a
                href={EXTERNAL_LINKS.phoneTel}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-900 border border-stone-800 text-xs font-mono text-slate-300 hover:text-white hover:border-cyan-500/40 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{EXTERNAL_LINKS.phoneFormatted}</span>
              </a>
              <a
                href={EXTERNAL_LINKS.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={EXTERNAL_LINKS.instagramClean}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-slate-300 hover:text-pink-400 hover:border-pink-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={EXTERNAL_LINKS.substack}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-stone-900 border border-stone-800 text-slate-300 hover:text-orange-400 hover:border-orange-500 transition-colors"
                aria-label="Substack"
              >
                <BookOpen className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

      </div>

      {/* Mobile Floating Thumb-Zone Apply CTA Pill */}
      <div className="fixed bottom-6 right-6 z-40 sm:hidden">
        <a
          href={EXTERNAL_LINKS.applicationForm}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 font-bold text-xs shadow-[0_0_20px_rgba(6,182,212,0.6)] active:scale-95 transition-all"
        >
          <Terminal className="w-3.5 h-3.5" />
          <span>Apply to Avani</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}

export default P2Overlay;
