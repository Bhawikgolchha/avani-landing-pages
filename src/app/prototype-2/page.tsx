'use client';

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Activity,
  ArrowDown,
  ArrowUpRight,
  Cpu,
  Terminal,
  Zap,
  Radio,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileImage,
  X,
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
// 10,000-particle holographic Earth globe, rotating orbital rings, and Bangalore telemetry beacon
const P2Scene = dynamic(() => import('@/components/prototype2/P2Scene'), { ssr: false });

const HUD_SECTORS = [
  { label: 'SEC 01 · BEACON', alt: 'ALT 420km' },
  { label: 'SEC 02 · DIRECTIVES', alt: 'ALT 310km' },
  { label: 'SEC 03 · TASKFORCES', alt: 'ALT 190km' },
  { label: 'SEC 04 · FIELD OPS', alt: 'ALT 45km' },
  { label: 'SEC 05 · PROTOCOLS', alt: 'ALT 0km' },
];

export default function Prototype2Page() {
  useLenis();

  const [selectedTipCategory, setSelectedTipCategory] = useState<string>('all');
  const [infographicOpen, setInfographicOpen] = useState(false);
  const [sectorIdx, setSectorIdx] = useState(0);
  const [telemetryPct, setTelemetryPct] = useState(0);

  const mainRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
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
      if (progressBarRef.current) {
        gsap.to(progressBarRef.current, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: mainRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.35,
            onUpdate: (self) => {
              setTelemetryPct(Math.round(self.progress * 100));
              setSectorIdx(Math.min(HUD_SECTORS.length - 1, Math.floor(self.progress * HUD_SECTORS.length)));
            },
          },
        });
      }

      gsap.utils.toArray<HTMLElement>('.p2-scroll-chapter').forEach((sec) => {
        gsap.from(sec, {
          y: 26,
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

  return (
    <div className="min-h-screen bg-[#080C0E] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950 overflow-x-hidden relative">
      <Navbar />

      {/* GSAP ScrollTrigger Telemetry Scan HUD */}
      <div className="fixed top-16 left-0 right-0 z-30 pointer-events-none">
        <div className="h-[2px] w-full bg-cyan-950/50">
          <div
            ref={progressBarRef}
            className="h-full origin-left scale-x-0 bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 shadow-[0_0_12px_rgba(6,182,212,0.8)]"
          />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 flex justify-between items-center text-[10px] font-mono">
          <span className="px-2.5 py-1 rounded-full bg-slate-950/85 text-cyan-300 border border-cyan-500/35 backdrop-blur-md">
            {HUD_SECTORS[sectorIdx]?.label} · {HUD_SECTORS[sectorIdx]?.alt}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-slate-950/85 text-emerald-300 border border-emerald-500/35 backdrop-blur-md hidden sm:inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            ORBITAL SYNC {telemetryPct}%
          </span>
        </div>
      </div>

      <main ref={mainRef} className="flex-grow pt-20">
        {/* Fixed 3D Canvas Background Container (10,000-particle holographic Earth globe & telemetry + Google Flow Biosphere Loop) */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-40 w-full h-full">
          <P2Scene />
        </div>

        {/* Foreground Scroll Chapters Overlay (Glassmorphic HUD) */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-20 sm:gap-24">
          {/* Chapter 1: Telemetry Hero HUD */}
          <section className="min-h-[70vh] flex flex-col justify-center items-center text-center pt-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/85 border border-cyan-400/40 text-cyan-300 text-xs font-mono font-semibold uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(6,182,212,0.25)] backdrop-blur-md">
              <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>Bangalore Beacon Telemetry · 12.9716° N, 77.5946° E</span>
            </div>

            <div className="relative mb-5">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-cyan-400/70 bg-slate-950 shadow-[0_0_25px_rgba(6,182,212,0.3)] relative">
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

            <h1 className="text-4xl sm:text-6xl font-extrabold font-serif text-white max-w-3xl leading-tight">
              Planetary Care. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                Powered by Student Intelligence.
              </span>
            </h1>

            <p className="mt-4 text-sm sm:text-lg text-slate-300 max-w-2xl bg-slate-950/60 px-4 py-3 rounded-2xl border border-cyan-500/20 backdrop-blur-md">
              {AVANI_ORGANIZATION.verbatimSummary}
            </p>

            {/* PDF-Verified Facts Banner */}
            <div className="mt-8 w-full max-w-2xl grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
              <div className="p-3.5 rounded-xl bg-slate-950/85 border border-cyan-500/30 backdrop-blur-md">
                <span className="text-2xl font-extrabold font-mono text-cyan-400 block">4</span>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Community Drives</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/85 border border-emerald-500/30 backdrop-blur-md">
                <span className="text-2xl font-extrabold font-mono text-emerald-400 block">5</span>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Specialized Teams</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/85 border border-teal-500/30 backdrop-blur-md">
                <span className="text-2xl font-extrabold font-mono text-teal-300 block">11</span>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Climate Actions</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950/85 border border-sky-500/30 backdrop-blur-md">
                <span className="text-2xl font-extrabold font-mono text-sky-400 block">100%</span>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Student-Led</span>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-2 text-xs font-mono text-cyan-400">
              <ArrowDown className="w-4 h-4 animate-bounce text-cyan-400" />
              <span>Scroll to activate planetary data layers</span>
            </div>
          </section>

          {/* Chapter 2: The 5 Strategic Objectives */}
          <section
            id="objectives"
            className="p2-scroll-chapter rounded-3xl bg-slate-950/85 border border-cyan-500/25 p-6 sm:p-10 lg:p-12 shadow-[0_0_30px_rgba(6,182,212,0.08)] backdrop-blur-md"
          >
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-2">
              <Terminal className="w-4 h-4" />
              <span>Core Directives // 5 Strategic Objectives</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4">
              Mission Directives
            </h2>
            <p className="text-sm text-slate-400 mb-6">
              Avani&apos;s 5 non-negotiable operational objectives for environmental defense in India.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              {AVANI_OBJECTIVES.map((obj) => (
                <div
                  key={obj.id}
                  className="p-4 rounded-xl bg-slate-900/85 border border-cyan-500/20 hover:border-cyan-400/50 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-cyan-400 text-xs font-bold">
                        DIR_0{obj.id}
                      </span>
                      {obj.metric && (
                        <span className="text-[10px] font-mono text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30">
                          {obj.metric}
                        </span>
                      )}
                    </div>
                    <span className="font-bold text-sm block text-white mb-1">
                      {obj.title}
                    </span>
                    <p className="text-slate-300 italic mb-2">&ldquo;{obj.verbatimCopy}&rdquo;</p>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">
                    Category: {obj.category}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Chapter 3: Specialized Taskforces */}
          <section
            id="teams"
            className="p2-scroll-chapter rounded-3xl bg-slate-950/85 border border-cyan-500/25 p-6 sm:p-10 lg:p-12 shadow-[0_0_30px_rgba(6,182,212,0.08)] backdrop-blur-md"
          >
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-2">
              <Cpu className="w-4 h-4" />
              <span>Operational Cohort Units // 5 Specialized Teams</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4">
              Specialized Student Taskforces
            </h2>
            <p className="text-sm text-slate-400 mb-6">
              Carefully-curated teams of members specializing in particular fields.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {AVANI_TEAMS.map((team) => (
                <div
                  key={team.id}
                  className="p-4 rounded-xl bg-slate-900/85 border border-slate-800 hover:border-cyan-500/40 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-sm text-cyan-200">{team.name}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                      {team.tag}
                    </span>
                  </div>
                  <p className="text-xs text-emerald-400 font-mono mb-2">{team.role}</p>
                  <p className="text-slate-300 leading-relaxed mb-3">{team.description}</p>
                  <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800/80">
                    <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider mb-1.5 font-semibold">
                      Key Responsibilities:
                    </p>
                    <ul className="flex flex-col gap-1 text-[11px] text-slate-300">
                      {team.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400 mt-0.5 shrink-0" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Chapter 4: On-Ground Field Deployments (Mobile Snap Carousel -> Grid) */}
          <section
            id="events"
            className="p2-scroll-chapter rounded-3xl bg-slate-950/85 border border-cyan-500/25 p-6 sm:p-10 lg:p-12 shadow-[0_0_30px_rgba(6,182,212,0.08)] backdrop-blur-md"
          >
            <div className="flex items-end justify-between gap-4 mb-5">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-2">
                  <Radio className="w-4 h-4" />
                  <span>Field Ops Record // 4 Flagship Deployments</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  Community Activations
                </h2>
              </div>
              <div className="flex items-center gap-2 md:hidden">
                <button
                  type="button"
                  onClick={() => scrollCarousel(eventsCarouselRef, 'left')}
                  aria-label="Previous activation"
                  className="p-2 rounded-full bg-slate-900 border border-cyan-500/40 text-cyan-300"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollCarousel(eventsCarouselRef, 'right')}
                  aria-label="Next activation"
                  className="p-2 rounded-full bg-slate-900 border border-cyan-500/40 text-cyan-300"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div
              ref={eventsCarouselRef}
              className="flex md:grid md:grid-cols-2 gap-4 overflow-x-auto snap-x snap-mandatory pb-2 text-xs"
            >
              {AVANI_EVENTS.map((event) => (
                <div
                  key={event.id}
                  className="min-w-[85vw] sm:min-w-[340px] md:min-w-0 snap-center p-4 rounded-xl bg-slate-900/85 border border-cyan-500/20 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="relative w-full h-40 rounded-lg overflow-hidden mb-3 bg-slate-950">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        sizes="(max-width: 768px) 90vw, 50vw"
                        className="object-cover"
                      />
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-slate-950/80 text-[10px] font-mono text-cyan-300 border border-cyan-500/30">
                        {event.timeframe}
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-bold text-sm text-white">
                        {event.title}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 font-mono mb-2">{event.location}</p>
                    <p className="text-slate-300 italic mb-3">&ldquo;{event.verbatimCopy}&rdquo;</p>
                  </div>
                  {event.metrics && (
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
                      {event.metrics.map((m, idx) => (
                        <span key={idx} className="font-mono text-[10px] text-cyan-300 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                          {m.label}: {m.value}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Chapter 5: 11 Climate Tips, Substack Journal & Protocol Checklist */}
          <section
            id="climate-tips"
            className="p2-scroll-chapter rounded-3xl bg-slate-950/95 border border-cyan-400/40 p-6 sm:p-10 lg:p-12 shadow-[0_0_30px_rgba(6,182,212,0.15)] mb-12 backdrop-blur-md"
          >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 font-semibold mb-2">
                  <Zap className="w-4 h-4" />
                  <span>Tactical Protocol // 11 Climate Directives</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  11 Climate Action Protocols
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Daily habit protocols compiled by Avani student researchers to reduce household carbon and resource intensity.
                </p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setInfographicOpen(true)}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-cyan-950/80 hover:bg-cyan-900/80 border border-cyan-400/40 text-cyan-300 text-xs font-mono"
                >
                  <FileImage className="w-4 h-4" />
                  <span>Infographic</span>
                </button>
                <button
                  type="button"
                  onClick={() => scrollCarousel(tipsCarouselRef, 'left')}
                  aria-label="Previous protocols"
                  className="p-2 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-300 md:hidden"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollCarousel(tipsCarouselRef, 'right')}
                  aria-label="Next protocols"
                  className="p-2 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-300 md:hidden"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-5">
              {[
                { id: 'all', label: 'ALL (11)' },
                { id: 'energy', label: 'ENERGY (2)' },
                { id: 'water', label: 'WATER (2)' },
                { id: 'waste', label: 'WASTE (3)' },
                { id: 'consumption', label: 'CONSUMPTION (4)' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedTipCategory(cat.id)}
                  className={`px-3 py-1 rounded-full text-[11px] font-mono whitespace-nowrap border transition-all ${
                    selectedTipCategory === cat.id
                      ? 'bg-cyan-400 text-slate-950 border-cyan-300 font-bold'
                      : 'bg-slate-900 text-cyan-300 border-cyan-500/30 hover:border-cyan-400/60'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div
              ref={tipsCarouselRef}
              className="flex md:grid md:grid-cols-2 gap-3 overflow-x-auto snap-x snap-mandatory text-xs mb-8 pb-2"
            >
              {CLIMATE_TIPS.map((tip) =>
                selectedTipCategory === 'all' || tip.category === selectedTipCategory ? (
                  <div
                    key={tip.id}
                    className="min-w-[78vw] sm:min-w-[260px] md:min-w-0 snap-center p-3 rounded-lg bg-slate-900/90 border border-cyan-500/20 hover:border-cyan-400/40 transition-colors climate-tip-item"
                    data-testid={`climate-tip-${tip.id}`}
                  >
                    <div className="flex items-center justify-between mb-1 font-mono text-[11px]">
                      <span className="font-bold text-cyan-300">
                        PROTOCOL #{tip.id}: {tip.shortTitle}
                      </span>
                      <span className="text-slate-400 uppercase text-[10px]">{tip.category}</span>
                    </div>
                    <span className="text-slate-200 leading-relaxed">&ldquo;{tip.action}&rdquo;</span>
                  </div>
                ) : null
              )}
            </div>

            {/* Substack Dispatches */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-cyan-500/20 mb-6">
              <p className="font-mono text-xs text-cyan-400 font-semibold mb-3 uppercase tracking-wider">
                Substack Dispatches // Published Youth Research
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                {EXTERNAL_LINKS.substackArticles.map((article, idx) => (
                  <a
                    key={idx}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 hover:border-cyan-400/50 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      <span className="font-mono text-[10px] text-emerald-400 block mb-1">
                        {article.publishedDate || 'Dispatch'}
                      </span>
                      <span className="font-bold text-white block mb-1">{article.title}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-cyan-300 mt-2">
                      Open Article <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Application Instructions */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 mb-6">
              <p className="font-mono text-xs text-cyan-400 font-semibold mb-3 uppercase tracking-wider">
                Application Instructions (Charter Guidelines)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                {AVANI_ORGANIZATION.applicationInstructions.map((ins) => (
                  <div key={ins.step} className="flex items-start gap-2">
                    <span className="font-mono text-emerald-400 font-bold shrink-0">0{ins.step}.</span>
                    <span>{ins.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-serif font-bold text-white text-lg">Enlist in the Biosphere Vanguard</p>
                <p className="text-xs text-slate-400">Join our student network across research, design, and field activations.</p>
              </div>
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 text-slate-950 font-bold text-xs shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:brightness-110 transition-all"
              >
                <span>Initialize Application (Form)</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </section>
        </div>

        {/* Infographic Modal */}
        {infographicOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setInfographicOpen(false)}
          >
            <div
              className="relative max-w-4xl w-full bg-slate-950 border border-cyan-400/40 rounded-2xl p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-800">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  Avani 11 Climate Protocols Infographic
                </span>
                <button
                  type="button"
                  onClick={() => setInfographicOpen(false)}
                  aria-label="Close infographic modal"
                  className="p-1.5 rounded-lg bg-slate-900 text-slate-300 hover:text-white"
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
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-slate-950/95 border border-cyan-400/60 text-cyan-300 font-bold text-xs shadow-[0_0_20px_rgba(6,182,212,0.35)] backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Apply</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
