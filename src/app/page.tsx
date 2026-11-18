'use client';

import React, { useState, useEffect } from 'react';
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
  Heart, 
  MapPin, 
  Mail, 
  Phone, 
  Instagram, 
  Linkedin, 
  ExternalLink, 
  Check, 
  Sparkles,
  Zap,
  Droplets,
  ShoppingBag,
  FileText,
  X
} from 'lucide-react';
import { Navbar, GOOGLE_FORM_URL } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { useLenis } from '@/hooks/useLenis';
import { 
  AVANI_OBJECTIVES, 
  AVANI_TEAMS, 
  AVANI_EVENTS, 
  CLIMATE_TIPS, 
  EXTERNAL_LINKS,
  AVANI_ORGANIZATION
} from '@/lib/avaniContent';

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

// Tip category icon map
const TIP_ICON_MAP: Record<string, React.ElementType> = {
  energy: Zap,
  water: Droplets,
  waste: Recycle,
  consumption: ShoppingBag,
};

export default function AvaniHomePage() {
  useLenis();

  // Active Team tab state
  const [activeTeamId, setActiveTeamId] = useState<string>(AVANI_TEAMS[0].id);

  // Interactive Climate Checklist state
  const [checkedTips, setCheckedTips] = useState<number[]>([1, 3, 5]);
  const [tipFilter, setTipFilter] = useState<string>('all');
  const [infographicModalOpen, setInfographicModalOpen] = useState(false);

  const activeTeam = AVANI_TEAMS.find((t) => t.id === activeTeamId) || AVANI_TEAMS[0];
  const ActiveTeamIcon = TEAM_ICON_MAP[activeTeam.icon || 'Users'] || Users;

  const toggleTip = (id: number) => {
    setCheckedTips((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredTips = tipFilter === 'all'
    ? CLIMATE_TIPS
    : CLIMATE_TIPS.filter((t) => t.category === tipFilter);

  // Eco Score status calculation
  const ecoScore = checkedTips.length;
  const ecoPercentage = Math.round((ecoScore / CLIMATE_TIPS.length) * 100);

  let ecoBadge = { title: 'Rising Seedling 🌱', desc: 'Taking your first thoughtful climate steps!' };
  if (ecoScore >= 4 && ecoScore <= 6) {
    ecoBadge = { title: 'Green Explorer 🌿', desc: 'Consistent eco-habits making an impact!' };
  } else if (ecoScore >= 7 && ecoScore <= 9) {
    ecoBadge = { title: 'Climate Champion 🌳', desc: 'An inspiring force for sustainable living!' };
  } else if (ecoScore >= 10) {
    ecoBadge = { title: 'Planet Guardian 🌟', desc: 'Living in total harmony with our Earth!' };
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F9FAF7] text-[#163515] selection:bg-emerald-200 selection:text-emerald-950">
      <Navbar />

      <main className="flex-grow pt-20">
        {/* ========================================================================= */}
        {/* 1. HERO SECTION (Canva Idea 5 Botanical Elegance & Blume Garden Theme)     */}
        {/* ========================================================================= */}
        <section id="about" className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-tr from-emerald-100/50 via-[#D0E8C5]/40 to-amber-100/20 blur-3xl pointer-events-none -z-10 rounded-full" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 flex flex-col items-start space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D0E8C5] text-[#163515] border border-emerald-300/40 text-xs font-semibold tracking-wide shadow-sm">
                <span className="text-sm">🌱</span>
                <span>Bangalore’s Premier Youth Climate Collective</span>
              </div>

              <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-[#163515] tracking-tight leading-[1.15]">
                Small Actions of Many Add Up to{' '}
                <span className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-[#163515] bg-clip-text text-transparent">
                  Change the World
                </span>
              </h1>

              <p className="text-stone-600 text-lg sm:text-xl leading-relaxed max-w-2xl">
                Avani is Bangalore’s youth-led climate collective uniting students across schools and universities to advocate for environmental restoration, lake revitalization, pollution reduction, and conscious living.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href={GOOGLE_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3.5 rounded-full bg-[#163515] hover:bg-[#1f471e] text-white font-semibold text-base shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>Apply to Join Avani</span>
                  <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                </a>

                <a
                  href="#events"
                  className="px-7 py-3.5 rounded-full bg-white text-[#163515] border border-stone-300 font-medium text-base shadow-sm hover:bg-stone-50 active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>Explore Our Impact</span>
                  <ArrowRight className="w-4 h-4 text-stone-500" />
                </a>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 flex flex-wrap items-center gap-3 text-xs text-stone-600">
                <span className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full shadow-sm border border-stone-200/80">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="font-medium">100% Student-Driven</span>
                </span>
                <span className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-stone-200/80">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span className="font-medium">Bengaluru Inter-College Network</span>
                </span>
                <span className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-stone-200/80">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span className="font-medium">Ground-Level Civic Action</span>
                </span>
              </div>
            </div>

            {/* Right Hero Visual Bento Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative bg-white p-3 rounded-3xl shadow-xl border border-stone-200/80">
                <div className="relative w-full h-[380px] sm:h-[420px] rounded-2xl overflow-hidden bg-stone-100">
                  <Image
                    src="/assets/images/hero_nature_canopy.webp"
                    alt="Avani Youth Environmental Action"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />

                  {/* Floating Pill on image */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-white/40 shadow-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                          BLR
                        </span>
                        <div>
                          <p className="text-xs font-semibold text-stone-900">Cubbon & Lalbagh Stewardship</p>
                          <p className="text-[11px] text-stone-500">Youth mobilization across Bangalore institutions</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-800 bg-[#D0E8C5] px-2.5 py-1 rounded-full">
                        Active
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating Metric 1 */}
                <div className="absolute -top-4 -left-4 bg-white p-3.5 rounded-2xl shadow-lg border border-stone-200/90 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center">
                    <Users className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-lg font-bold font-serif text-stone-900 leading-none">4 Drives</p>
                    <p className="text-xs text-stone-500 font-medium">Completed on Ground</p>
                  </div>
                </div>

                {/* Floating Metric 2 */}
                <div className="absolute -bottom-4 -right-4 bg-white p-3.5 rounded-2xl shadow-lg border border-stone-200/90 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <Trees className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <p className="text-lg font-bold font-serif text-stone-900 leading-none">5 Teams</p>
                    <p className="text-xs text-stone-500 font-medium">100% Student-Led</p>
                  </div>
                </div>
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
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D0E8C5] text-[#163515] text-xs font-semibold uppercase tracking-wider mb-3">
                <Sprout className="w-3.5 h-3.5" />
                <span>Strategic Framework</span>
              </div>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#163515] tracking-tight">
                Our Pillars of Impact
              </h2>
              <p className="mt-3 text-stone-600 text-base sm:text-lg">
                Five core mandates designed to dismantle ecological apathy and spark grassroots responsibility among India&apos;s rising generation.
              </p>
            </div>

            {/* 5-Card Layout (3 top, 2 centered bottom) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {AVANI_OBJECTIVES.map((obj, idx) => {
                const IconComponent = OBJECTIVE_ICON_MAP[obj.icon] || Sprout;
                const isCentered = idx >= 3;
                return (
                  <div
                    key={obj.id}
                    className={`p-8 rounded-2xl bg-[#F9FAF7] border border-stone-200/80 hover:border-emerald-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between group ${
                      isCentered ? 'lg:col-span-1' : ''
                    }`}
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-emerald-100/80 text-emerald-800 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                        <IconComponent className="w-6 h-6 text-emerald-800" />
                      </div>
                      <span className="text-xs font-bold text-amber-600 tracking-wider uppercase">
                        Pillar 0{obj.id}
                      </span>
                      <h3 className="font-serif font-bold text-xl text-[#163515] mt-1 mb-3">
                        {obj.title}
                      </h3>
                      <p className="text-stone-600 text-sm leading-relaxed">
                        {obj.description}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-stone-200/70 flex items-center justify-between text-xs font-medium text-emerald-800">
                      <span>{obj.category || 'Strategic Initiative'}</span>
                      <ArrowUpRight className="w-4 h-4 text-emerald-700" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. THE 5 AVANI STUDENT TEAMS (Interactive Tabbed Leadership)              */}
        {/* ========================================================================= */}
        <section id="teams" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D0E8C5] text-[#163515] text-xs font-semibold uppercase tracking-wider mb-3">
                <Users className="w-3.5 h-3.5" />
                <span>Student Leadership Structure</span>
              </div>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#163515] tracking-tight">
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
                className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 hover:text-emerald-950 transition-colors"
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
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold">
                  <ActiveTeamIcon className="w-3.5 h-3.5" />
                  <span>{activeTeam.tag || activeTeam.name}</span>
                </div>

                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#163515]">
                  {activeTeam.name}
                </h3>

                <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
                  {activeTeam.description}
                </p>

                <div className="pt-2">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-semibold mb-2">
                    Key Responsibilities:
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                    {activeTeam.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2 bg-[#F9FAF7] p-2.5 rounded-lg border border-stone-100">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
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
                    <span className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm">
                      <ActiveTeamIcon className="w-5 h-5 text-emerald-800" />
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
                      <p className="text-xs font-mono font-semibold text-emerald-800 mt-0.5">
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
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#163515] hover:bg-[#1f471e] text-white text-xs font-semibold transition-all shadow-sm"
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
        {/* 4. REALIZED EVENTS SHOWCASE (4 Proven Campaigns)                           */}
        {/* ========================================================================= */}
        <section id="events" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-stone-200/60">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D0E8C5] text-[#163515] text-xs font-semibold uppercase tracking-wider mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Proven Track Record</span>
                </div>
                <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#163515] tracking-tight">
                  Realized Events & Field Drives
                </h2>
                <p className="text-stone-600 mt-2 text-base max-w-xl">
                  Tangible community mobilization across Bangalore schools, colleges, and grassroots social organizations.
                </p>
              </div>
            </div>

            {/* 4-Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {AVANI_EVENTS.map((event) => (
                <div
                  key={event.id}
                  className="bg-[#F9FAF7] rounded-2xl border border-stone-200/80 overflow-hidden flex flex-col hover:shadow-lg transition-all duration-200 group"
                >
                  <div className="h-48 overflow-hidden relative bg-stone-200">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 bg-[#163515]/90 backdrop-blur-sm text-white text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-sm">
                      {event.tags?.[0] || 'Field Drive'}
                    </span>
                  </div>

                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-semibold text-stone-400">
                        {event.location || event.partner || 'Bangalore, India'}
                      </span>
                      <h3 className="font-serif font-bold text-lg text-[#163515] mt-1 mb-2">
                        {event.title}
                      </h3>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {event.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between text-xs">
                      <span className="font-bold text-emerald-800">
                        {event.metrics?.[0]?.value || 'Community Impact'}
                      </span>
                      <span className="text-stone-500">{event.timeframe}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. INTERACTIVE '11 WAYS TO HELP THE CLIMATE TODAY' (Action Checklist)       */}
        {/* ========================================================================= */}
        <section id="climate-tips" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-[#163515] via-[#1a4419] to-[#0c1f0b] text-white rounded-3xl p-8 lg:p-12 shadow-xl relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-3xl mb-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D0E8C5] text-[#163515] text-xs font-semibold uppercase tracking-wider mb-4">
                <Recycle className="w-3.5 h-3.5" />
                <span>Interactive Action Hub</span>
              </div>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-white tracking-tight">
                11 Ways to Help the Climate Today
              </h2>
              <p className="text-emerald-100/90 mt-2 text-sm sm:text-base leading-relaxed">
                Check off daily sustainable habits you practice. Watch your Eco Score level up in real time!
              </p>

              {/* Dynamic Scorecard Tracker */}
              <div className="mt-6 p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div>
                    <span className="text-xs text-emerald-200 uppercase font-semibold tracking-wider">
                      Your Eco Status
                    </span>
                    <div className="text-lg font-bold font-serif text-white mt-0.5">
                      {ecoBadge.title}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold font-mono text-[#A7F3D0]">
                      {ecoScore} / {CLIMATE_TIPS.length}
                    </span>
                    <span className="text-xs text-emerald-200 block">Actions Adopted</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-400 h-full rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(52,211,153,0.8)]"
                    style={{ width: `${ecoPercentage}%` }}
                  />
                </div>
                <p className="text-[11px] text-emerald-200/80 mt-2">
                  {ecoBadge.desc}
                </p>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6">
              {[
                { id: 'all', label: 'All 11 Habits' },
                { id: 'energy', label: 'Energy & Electricity' },
                { id: 'water', label: 'Water Conservation' },
                { id: 'waste', label: 'Waste & Composting' },
                { id: 'consumption', label: 'Mindful Consumption' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setTipFilter(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                    tipFilter === cat.id
                      ? 'bg-emerald-400 text-stone-900 shadow-sm'
                      : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white border border-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Checklist Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTips.map((tip) => {
                const isChecked = checkedTips.includes(tip.id);
                const TipIcon = TIP_ICON_MAP[tip.category] || Recycle;
                return (
                  <div
                    key={tip.id}
                    onClick={() => toggleTip(tip.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                      isChecked
                        ? 'bg-white/20 border-emerald-400/60 shadow-sm'
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isChecked ? 'bg-emerald-400 text-stone-950 font-bold' : 'border border-white/40'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>

                    <div className="flex-grow">
                      <div className="flex items-center justify-between text-[11px] text-emerald-200/80 mb-1">
                        <span className="uppercase font-mono tracking-wider">
                          Tip #{tip.id}
                        </span>
                        <span className="flex items-center gap-1">
                          <TipIcon className="w-3 h-3" />
                          <span>{tip.categoryLabel || tip.category}</span>
                        </span>
                      </div>
                      <p className={`text-sm leading-snug ${isChecked ? 'text-white font-medium' : 'text-stone-200'}`}>
                        {tip.action}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Infographic Preview CTA */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-emerald-200">
                Want to share this with your school or community?
              </span>
              <button
                onClick={() => setInfographicModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-[#163515] font-semibold text-xs shadow-sm hover:bg-emerald-50 transition-all"
              >
                <FileText className="w-4 h-4 text-emerald-700" />
                <span>View Full Climate Infographic</span>
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. SUBSTACK PUBLICATIONS & STUDENT THOUGHT LEADERSHIP                     */}
        {/* ========================================================================= */}
        <section id="publications" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-stone-200/60">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D0E8C5] text-[#163515] text-xs font-semibold uppercase tracking-wider mb-3">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Knowledge & Voices</span>
                </div>
                <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#163515] tracking-tight">
                  Student Thought Leadership
                </h2>
                <p className="text-stone-600 mt-2 text-base max-w-xl">
                  Original research and essays on Bengaluru hydrology, fast fashion, and youth eco-anxiety written by Avani&apos;s Research &amp; Writing team.
                </p>
              </div>

              <div className="mt-4 md:mt-0">
                <a
                  href={EXTERNAL_LINKS.substack}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 hover:text-emerald-950 transition-colors"
                >
                  <span>Read All on Substack</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {EXTERNAL_LINKS.substackArticles.map((article, index) => (
                <a
                  key={article.id}
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-6 rounded-2xl bg-[#F9FAF7] border border-stone-200/80 hover:border-emerald-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-stone-500 mb-3">
                      <span className="font-semibold text-amber-600">Substack Note</span>
                      <span>{article.publishedDate}</span>
                    </div>

                    <h3 className="font-serif font-bold text-lg text-[#163515] group-hover:text-emerald-800 transition-colors mb-2">
                      {article.title}
                    </h3>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      {article.subtitle}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-stone-200 flex items-center justify-between text-xs font-medium text-emerald-800">
                    <span>Read on Substack</span>
                    <ArrowUpRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. HOW TO APPLY & RECRUITMENT ROADMAP                                     */}
        {/* ========================================================================= */}
        <section id="apply" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-[#EBF3E8] rounded-3xl p-8 lg:p-14 border border-emerald-200/60 shadow-sm">
            <div className="max-w-3xl mb-12">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#163515] text-white text-xs font-semibold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
                <span>Cohort Recruitment Open</span>
              </div>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#163515] tracking-tight">
                Join the Avani Youth Movement
              </h2>
              <p className="text-stone-700 mt-3 text-base sm:text-lg leading-relaxed">
                Whether you write deep-dive essays, create visual designs, organize community logistics, or run social campaigns, there is a place for you in Avani.
              </p>
            </div>

            {/* 3-Step Application Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold text-sm flex items-center justify-center mb-4">
                    1
                  </span>
                  <h4 className="font-serif font-bold text-lg text-stone-900 mb-2">
                    Submit the Form
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Fill out our straightforward Google Form detailing your academic background, passions, and which team aligns with your skills.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-emerald-800 font-medium">
                  Takes 5-7 minutes
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold text-sm flex items-center justify-center mb-4">
                    2
                  </span>
                  <h4 className="font-serif font-bold text-lg text-stone-900 mb-2">
                    Sample Task Submission
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Submit your sample writing, design portfolio, or organizational plan with the exact naming format: <span className="font-mono text-emerald-800 font-semibold">NAME_AVANI_SUBMISSION</span>.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-emerald-800 font-medium">
                  Strict file naming rule
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex flex-col justify-between">
                <div>
                  <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold text-sm flex items-center justify-center mb-4">
                    3
                  </span>
                  <h4 className="font-serif font-bold text-lg text-stone-900 mb-2">
                    Cohort Onboarding
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Selected candidates are invited to our welcoming online onboarding session and integrated into team communication channels.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-emerald-800 font-medium">
                  Direct peer mentorship
                </div>
              </div>
            </div>

            {/* Direct CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-4 border-t border-emerald-300/60">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-emerald-300 bg-white p-1 shrink-0">
                  <Image
                    src="/assets/branding/avani_logo_transparent.png"
                    alt="Avani Emblem"
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#163515]">Ready to take action?</p>
                  <p className="text-xs text-stone-600">Bangalore students across all universities & grades welcome.</p>
                </div>
              </div>

              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full bg-[#163515] hover:bg-[#1f471e] text-white font-semibold text-sm shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center gap-2 shrink-0"
              >
                <span>Complete Application on Google Forms</span>
                <ArrowUpRight className="w-4 h-4 text-emerald-300" />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================================= */}
      {/* INFOGRAPHIC PREVIEW MODAL                                                  */}
      {/* ========================================================================= */}
      {infographicModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-stone-200">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-700" />
                <h3 className="font-serif font-bold text-base text-stone-900">
                  Official Avani Climate Tips Infographic
                </h3>
              </div>
              <button
                onClick={() => setInfographicModalOpen(false)}
                className="p-1 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto max-h-[70vh] flex justify-center bg-stone-50">
              <div className="relative w-full max-w-md aspect-[3/4] rounded-xl overflow-hidden shadow-md">
                <Image
                  src="/assets/images/climate_tips_infographic.webp"
                  alt="Avani 11 Ways to Help the Climate Infographic"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            <div className="p-4 border-t border-stone-200 flex justify-end gap-3 bg-white">
              <button
                onClick={() => setInfographicModalOpen(false)}
                className="px-4 py-2 rounded-full border border-stone-300 text-xs font-semibold text-stone-700 hover:bg-stone-50"
              >
                Close
              </button>
              <a
                href="/assets/images/climate_tips_infographic.webp"
                download="Avani_11_Climate_Tips_Infographic.webp"
                className="px-5 py-2 rounded-full bg-[#163515] text-white text-xs font-semibold hover:bg-[#1f471e] transition-colors"
              >
                Download Infographic
              </a>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
