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
  ArrowUpRight,
  Megaphone,
  Wind,
  Recycle,
  Share2,
  BookOpen,
  Palette,
  Users,
  Smartphone,
  Calendar,
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
  MapPin,
  Heart
} from 'lucide-react';
import { Navbar, GOOGLE_FORM_URL } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { useLenis } from '@/hooks/useLenis';
import { 
  AVANI_ORGANIZATION, 
  AVANI_OBJECTIVES, 
  AVANI_TEAMS, 
  AVANI_EVENTS, 
  CLIMATE_TIPS,
  EXTERNAL_LINKS 
} from '@/lib/avaniContent';

// Map icon strings to Lucide components
const OBJECTIVE_ICONS: Record<string, React.ElementType> = {
  Megaphone,
  Trees,
  Wind,
  Recycle,
  Share2,
};

const TEAM_ICONS: Record<string, React.ElementType> = {
  BookOpen,
  Palette,
  Users,
  Smartphone,
  Calendar,
};

const TIP_ICONS: Record<string, React.ElementType> = {
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
            Avani Interactive 3D Showcase · Dual Creative Directions
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold font-serif tracking-tight text-stone-900 max-w-4xl mx-auto leading-[1.1]">
            Two Distinct Visions. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-[#163515] to-teal-700">
              One Living Planet.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Experience two radically different interactive 3D scroll-driven experiences engineered for{' '}
            <strong className="text-stone-900 font-semibold">{AVANI_ORGANIZATION.name}</strong>, {AVANI_ORGANIZATION.city}&apos;s student-led environmental organization. Compare the organic botanical living canopy against the cyber eco-tech biosphere.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/prototype-1"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#163515] text-[#DCE7D4] hover:bg-[#0F2410] font-bold text-sm shadow-md transition-all duration-200 hover:scale-105"
            >
              <Trees className="w-4 h-4 text-emerald-400" />
              <span>Explore Prototype 1 (Living Canopy)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/prototype-2"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-slate-950 text-cyan-300 border border-cyan-500/30 hover:bg-slate-900 font-bold text-sm shadow-md transition-all duration-200 hover:scale-105"
            >
              <Globe2 className="w-4 h-4 text-cyan-400" />
              <span>Explore Prototype 2 (Eco-Tech Biosphere)</span>
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
              Each prototype represents a complete, scroll-driven interactive 3D narrative built on Three.js and React Three Fiber.
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
                  <div className="p-3 rounded-2xl bg-[#163515] text-[#DCE7D4] shadow-sm">
                    <Trees className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold font-serif text-[#163515]">
                      The Living Canopy
                    </h3>
                    <p className="text-xs text-emerald-800 font-medium">
                      Deep Lagoon & Botanical Tactile Aesthetic
                    </p>
                  </div>
                </div>

                <p className="text-sm text-stone-700 leading-relaxed mb-6">
                  Derived from Canva Mood Board Idea 5 (&quot;WE GROW TREES AROUND THE WORLD&quot;). An organic, tactile journey descending through sunlit tree canopies into tranquil reflecting waters, celebrating student grassroots community action.
                </p>

                {/* Color Palette Preview */}
                <div className="mb-6">
                  <p className="text-xs font-mono uppercase tracking-wider text-stone-600 mb-2 font-semibold">
                    Color Palette Preview
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#163515] text-[#DCE7D4] text-xs font-mono">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#163515] border border-white/20" />
                      #163515
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#DCE7D4] text-[#163515] text-xs font-mono">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#DCE7D4] border border-black/10" />
                      #DCE7D4
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F4EFEA] text-stone-800 text-xs font-mono border border-stone-200">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#F4EFEA] border border-stone-300" />
                      #F4EFEA
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1A4B4E] text-white text-xs font-mono">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#1A4B4E]" />
                      #1A4B4E
                    </div>
                  </div>
                </div>

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
                    <span><strong>Scroll Journey:</strong> 5 scrubbed chapters descending from sunlit canopy to aquatic pond</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span><strong>Tone:</strong> Warm, intimate, botanical storytelling, editorial elegance</span>
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
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-[#163515] hover:bg-[#0F2410] text-[#DCE7D4] font-bold text-sm shadow-md transition-all group-hover:gap-3"
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
                      Planetary Telemetry & Interactive Hologram
                    </p>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  An alternative cutting-edge direction inspired by modern climate science telemetry, demonstrating data-driven youth leadership and global environmental defense.
                </p>

                {/* Color Palette Preview */}
                <div className="mb-6">
                  <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-semibold">
                    Color Palette Preview
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#080C0E] text-slate-200 text-xs font-mono border border-slate-700">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#080C0E] border border-cyan-400/40" />
                      #080C0E
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-950 text-cyan-300 text-xs font-mono border border-cyan-500/30">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#06B6D4]" />
                      #06B6D4
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-300 text-xs font-mono border border-emerald-500/30">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                      #10B981
                    </div>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900 text-slate-300 text-xs font-mono border border-slate-800">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#0D200C]" />
                      #0D200C
                    </div>
                  </div>
                </div>

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
                    <span><strong>Scroll Journey:</strong> Camera orbital rotation into Bangalore telemetry node and protocols</span>
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
                    <td className="py-4 px-4 text-emerald-900 bg-emerald-50/20">Idea 5 (&quot;WE GROW TREES AROUND THE WORLD&quot;)</td>
                    <td className="py-4 px-4 text-cyan-900 bg-cyan-50/20">Alternative Creative Direction (Cyber Atmospheric)</td>
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
                    <td className="py-4 px-4 text-stone-700 bg-emerald-50/20">#163515 (Forest), #DCE7D4 (Tea Green), #F4EFEA (Sand)</td>
                    <td className="py-4 px-4 text-stone-700 bg-cyan-50/20">#080C0E (Obsidian), #06B6D4 (Cyan), #10B981 (Neon Emerald)</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-semibold text-stone-800">Primary Typography</td>
                    <td className="py-4 px-4 text-stone-700 bg-emerald-50/20">Serif Titles (Playfair Display) + Inter Body</td>
                    <td className="py-4 px-4 text-stone-700 bg-cyan-50/20">Display Sans (Inter) + JetBrains Mono Telemetry</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-semibold text-stone-800">Interaction Model</td>
                    <td className="py-4 px-4 text-stone-700 bg-emerald-50/20">Storytelling chapters, gentle organic float, calm ripples</td>
                    <td className="py-4 px-4 text-stone-700 bg-cyan-50/20">Interactive telemetry nodes, orbital rotation, live metrics</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-4 font-semibold text-stone-800">SSR / WebGL Safety</td>
                    <td className="py-4 px-4 text-stone-700 bg-emerald-50/20">Dynamic R3F loading with ssr: false</td>
                    <td className="py-4 px-4 text-stone-700 bg-cyan-50/20">Dynamic R3F loading with ssr: false</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section: Organization Overview & 5 Objectives */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-16" id="about">
          <div className="bg-[#163515] text-[#DCE7D4] rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl mb-12">
            <div className="relative z-10 max-w-4xl">
              <span className="px-3 py-1 rounded-full bg-emerald-800/60 border border-emerald-500/30 text-emerald-200 text-xs font-mono uppercase tracking-wider mb-4 inline-block">
                About Avani
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white mb-6">
                What is Avani?
              </h2>
              <blockquote className="text-base sm:text-lg text-emerald-100/90 italic leading-relaxed border-l-2 border-emerald-400 pl-4 mb-8">
                &ldquo;{AVANI_ORGANIZATION.missionParagraphs[0]} {AVANI_ORGANIZATION.missionParagraphs[1]} {AVANI_ORGANIZATION.missionParagraphs[3]}&rdquo;
              </blockquote>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-emerald-800/60">
                <div>
                  <p className="text-3xl sm:text-4xl font-extrabold text-white font-mono">5</p>
                  <p className="text-xs text-emerald-300 mt-1">Core Objectives</p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-extrabold text-white font-mono">5</p>
                  <p className="text-xs text-emerald-300 mt-1">Specialized Teams</p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-extrabold text-white font-mono">4</p>
                  <p className="text-xs text-emerald-300 mt-1">Flagship Events</p>
                </div>
                <div>
                  <p className="text-3xl sm:text-4xl font-extrabold text-white font-mono">11</p>
                  <p className="text-xs text-emerald-300 mt-1">Climate Action Tips</p>
                </div>
              </div>
            </div>
          </div>

          {/* 5 Core Objectives Cards */}
          <div id="objectives" className="my-16">
            <div className="text-center mb-10">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-semibold block mb-1">
                Guiding Principles
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
                The 5 Core Objectives of Avani
              </h3>
              <p className="text-sm text-stone-500 mt-2 max-w-xl mx-auto">
                Extracted verbatim from the official Avani Briefing PDF.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {AVANI_OBJECTIVES.map((obj) => {
                const IconComponent = OBJECTIVE_ICONS[obj.icon] || Sparkles;
                return (
                  <div
                    key={obj.id}
                    className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100/70 border border-emerald-200 flex items-center justify-center text-emerald-900">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-mono font-bold text-stone-400">
                          0{obj.id}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold font-serif text-[#163515] mb-2">
                        {obj.title}
                      </h4>
                      <p className="text-xs font-semibold text-emerald-800 mb-2">
                        &ldquo;{obj.verbatimCopy}&rdquo;
                      </p>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {obj.description}
                      </p>
                    </div>

                    {obj.metric && (
                      <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] font-mono text-emerald-800">
                        <span>Target Metric:</span>
                        <span className="font-semibold">{obj.metric}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5 Specialized Teams */}
          <div id="teams" className="my-16">
            <div className="text-center mb-10">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-semibold block mb-1">
                Student Organization Structure
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
                The 5 Specialized Teams
              </h3>
              <p className="text-sm text-stone-500 mt-2 max-w-xl mx-auto">
                Carefully-curated teams of student members specializing in particular fields.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {AVANI_TEAMS.map((team) => {
                const IconComponent = TEAM_ICONS[team.icon || 'BookOpen'] || BookOpen;
                return (
                  <div
                    key={team.id}
                    className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-800">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-stone-100 text-stone-700">
                          {team.tag}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold font-serif text-stone-900 mb-1">
                        {team.name}
                      </h4>
                      <p className="text-xs font-medium text-emerald-800 mb-3">
                        {team.role}
                      </p>
                      <p className="text-xs text-stone-600 leading-relaxed mb-4">
                        {team.description}
                      </p>

                      <div className="space-y-1.5 text-xs text-stone-600 border-t border-stone-100 pt-3">
                        <p className="font-semibold text-stone-700 text-[11px] uppercase font-mono">
                          Key Responsibilities:
                        </p>
                        {team.responsibilities.slice(0, 3).map((resp, i) => (
                          <div key={i} className="flex items-start gap-1.5 text-[11px]">
                            <span className="text-emerald-700 font-bold shrink-0">•</span>
                            <span>{resp}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] font-mono text-stone-500 flex items-center justify-between">
                      <span>Focus:</span>
                      <span className="font-semibold text-stone-700">{team.keyFocus}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4 Flagship Events */}
          <div id="events" className="my-16">
            <div className="text-center mb-10">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-semibold block mb-1">
                Real-World Action
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
                4 Flagship Events & Community Activations
              </h3>
              <p className="text-sm text-stone-500 mt-2 max-w-xl mx-auto">
                On-the-ground volunteer initiatives uniting schools and civic communities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {AVANI_EVENTS.map((event) => (
                <div
                  key={event.id}
                  className="rounded-3xl bg-white border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div className="p-6 sm:p-8">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        {event.timeframe}
                      </span>
                      <span className="text-xs text-stone-500 font-mono flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-stone-400" />
                        {event.location}
                      </span>
                    </div>

                    <h4 className="text-xl sm:text-2xl font-bold font-serif text-[#163515] mb-2">
                      {event.title}
                    </h4>
                    <p className="text-xs font-medium text-emerald-700 mb-4">
                      {event.subtitle}
                    </p>

                    <blockquote className="text-xs sm:text-sm text-stone-600 italic bg-stone-50 p-4 rounded-xl border-l-2 border-emerald-600 mb-6 leading-relaxed">
                      &ldquo;{event.verbatimCopy}&rdquo;
                    </blockquote>

                    {/* Event Metrics */}
                    {event.metrics && event.metrics.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-stone-100/70 border border-stone-200/60 text-center mb-4">
                        {event.metrics.map((m, idx) => (
                          <div key={idx}>
                            <p className="font-mono font-extrabold text-sm text-[#163515]">{m.value}</p>
                            <p className="text-[10px] text-stone-500 leading-tight mt-0.5">{m.label}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tags */}
                    {event.tags && (
                      <div className="flex flex-wrap gap-1.5">
                        {event.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-stone-100 text-stone-600"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 11 Climate Action Tips */}
          <div id="climate-tips" className="my-16">
            <div className="text-center mb-10">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-semibold block mb-1">
                Everyday Responsibility
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
                11 Daily Climate Action Tips
              </h3>
              <p className="text-sm text-stone-500 mt-2 max-w-xl mx-auto">
                Practical, student-led habits to protect energy, water, resources, and consumption.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {CLIMATE_TIPS.map((tip) => {
                const IconComponent = TIP_ICONS[tip.icon || 'Sprout'] || Sprout;
                return (
                  <div
                    key={tip.id}
                    className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-emerald-800 shrink-0 mt-0.5">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-mono font-semibold text-[#163515]">
                          Tip #{tip.id} · {tip.shortTitle}
                        </span>
                        <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-stone-100 text-stone-600">
                          {tip.category}
                        </span>
                      </div>
                      <p className="text-xs text-stone-700 leading-relaxed font-medium">
                        &ldquo;{tip.action}&rdquo;
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Call to Action Card: Apply to Cohort 2025 */}
          <div className="my-16 rounded-3xl bg-gradient-to-r from-[#163515] to-[#0A252E] text-white p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-emerald-200 text-xs font-mono uppercase tracking-wider mb-4 inline-block">
                Join the Student Movement
              </span>
              <h3 className="text-2xl sm:text-4xl font-serif font-bold text-white mb-4">
                Ready to take climate action with Avani?
              </h3>
              <p className="text-sm text-emerald-100/80 leading-relaxed">
                Join our student teams in Bangalore. We collaborate on meaningful donation drives, denim upcycling exhibitions, Substack research articles, and hands-on environmental workshops.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-emerald-400 hover:bg-emerald-300 text-[#163515] font-bold text-sm shadow-lg transition-all duration-200 hover:scale-105"
              >
                <span>Apply via Google Form</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <a
                href={EXTERNAL_LINKS.instagramClean}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 transition-all duration-200"
              >
                <span>Follow @avani_yocc</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
