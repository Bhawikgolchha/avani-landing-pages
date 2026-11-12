'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { CustomEase } from 'gsap/CustomEase';
import { ArrowUpRight, Sparkles, Sun, Moon } from 'lucide-react';
import { AVANI_ORGANIZATION, EXTERNAL_LINKS } from '@/lib/avaniContent';
import { useAvaniTheme } from './ThemeTransitionOverlay';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);
  try {
    CustomEase.create('avaniEase', '0.16, 1, 0.3, 1');
  } catch {
    // CustomEase already registered during HMR
  }
}

interface EditorialHeroSpineProps {
  scrollProgress: number;
}

/**
 * Section 1 (`.intro`):
 * Models bleibtgleich.dev's architectural 37% vertical hairline spine layout:
 * - Left metadata rail (<37% desktop): Logo seal, mission verbatim, ambient canopy video, Canva mood board & Substack pills
 * - Crossing / Right display canvas: Playfair Display + Inter gigantic staggered editorial statements
 * - Bottom pinned split wordmark (`AVANI` left / live % / `YOUTH` right)
 */
export function EditorialHeroSpine({ scrollProgress }: EditorialHeroSpineProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const headlinePrimaryRef = useRef<HTMLHeadingElement | null>(null);
  const headlineSecondaryRef = useRef<HTMLParagraphElement | null>(null);
  const leftRailRef = useRef<HTMLDivElement | null>(null);
  const { isNight, toggleTheme, isTransitioning } = useAvaniTheme();

  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof window === 'undefined') return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      let splitPrimary: SplitText | null = null;
      let splitSecondary: SplitText | null = null;

      if (headlinePrimaryRef.current) {
        splitPrimary = SplitText.create(headlinePrimaryRef.current, {
          type: 'lines,words',
          linesClass: 'overflow-hidden',
        });
        gsap.from(splitPrimary.words, {
          yPercent: 105,
          opacity: 0,
          duration: 0.9,
          stagger: 0.035,
          ease: 'avaniEase',
          clearProps: 'transform,opacity',
        });
      }

      if (leftRailRef.current) {
        gsap.from(leftRailRef.current.children, {
          y: 18,
          opacity: 0,
          duration: 0.75,
          stagger: 0.06,
          ease: 'avaniEase',
          clearProps: 'transform,opacity',
        });
      }

      if (headlineSecondaryRef.current) {
        splitSecondary = SplitText.create(headlineSecondaryRef.current, {
          type: 'words',
        });
        gsap.from(splitSecondary.words, {
          y: 28,
          opacity: 0,
          duration: 0.7,
          stagger: 0.025,
          ease: 'avaniEase',
          scrollTrigger: {
            trigger: headlineSecondaryRef.current,
            start: 'top 85%',
            once: true,
          },
          clearProps: 'transform,opacity',
        });
      }

      return () => {
        splitPrimary?.revert();
        splitSecondary?.revert();
      };
    }, root);

    return () => ctx.revert();
  }, []);

  const hairline = isNight ? 'border-[#6EE7B7]/20' : 'border-[#163515]/20';
  const mutedText = isNight ? 'text-[#8FA882]' : 'text-[#2D5A27]';
  const pillClass = isNight
    ? 'border-[#6EE7B7]/30 bg-[#0D200C]/80 text-[#DCE7D4] hover:border-[#6EE7B7] hover:bg-[#163515]'
    : 'border-[#163515]/25 bg-white/80 text-[#163515] hover:border-[#163515] hover:bg-[#DCE7D4]/70';

  const progressPct = Math.min(100, Math.max(0, Math.round(scrollProgress * 100)));

  return (
    <section
      id="about"
      ref={rootRef}
      className="intro relative pt-24 sm:pt-28 pb-16 sm:pb-24 overflow-x-clip"
    >
      {/* Continuous 37% Vertical Architectural Hairline Spine (Desktop) */}
      <div
        aria-hidden="true"
        className={`hidden lg:block pointer-events-none absolute top-0 bottom-0 left-[37%] w-px ${
          isNight ? 'bg-[#6EE7B7]/20' : 'bg-[#163515]/20'
        }`}
      />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative">
        {/* Top Two-Column Editorial Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-start">
          {/* Left Metadata Rail (0 -> 37%, spans 4 cols on 12-col grid matching ~33-37%) */}
          <div
            ref={leftRailRef}
            className="lg:col-span-4 lg:pr-10 flex flex-col gap-5 sm:gap-6"
          >
            {/* Brand Seal + SVG Canopy Mark */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div
                  className={`relative w-12 h-12 rounded-full overflow-hidden border ${
                    isNight ? 'border-[#6EE7B7]/40 bg-[#0D200C]' : 'border-[#163515]/30 bg-[#163515]'
                  } shrink-0`}
                >
                  <Image
                    src="/assets/branding/logo.jpg"
                    alt="Avani official circular brand logo"
                    fill
                    sizes="48px"
                    className="object-cover"
                    priority
                  />
                </div>
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] block opacity-75">
                    Est. Bangalore · India
                  </span>
                  <span className="font-serif text-lg font-bold tracking-tight">
                    {AVANI_ORGANIZATION.greeting}
                  </span>
                </div>
              </div>

              {/* Daylight / GlowGarden Night Switcher */}
              <button
                type="button"
                onClick={toggleTheme}
                disabled={isTransitioning}
                aria-label={`Switch to ${isNight ? 'Daylight Botanical' : 'GlowGarden Night'} theme`}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[11px] font-mono uppercase tracking-wider transition-colors ${pillClass}`}
              >
                {isNight ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-[#6EE7B7]" />
                    <span>Daylight</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-[#568203]" />
                    <span>GlowNight</span>
                  </>
                )}
              </button>
            </div>

            {/* Metadata Coordinates & Palette Lock */}
            <div className={`pt-4 border-t ${hairline} flex flex-col gap-2 text-xs leading-relaxed`}>
              <p className={`font-mono text-[11px] uppercase tracking-widest ${mutedText}`}>
                {AVANI_ORGANIZATION.tagline} · &apos;26 Edition
              </p>
              <p className="text-sm leading-relaxed opacity-90">
                {AVANI_ORGANIZATION.missionParagraphs[0]}
              </p>
              <p className="text-xs leading-relaxed opacity-75">
                {AVANI_ORGANIZATION.missionParagraphs[1]}
              </p>
            </div>

            {/* Ambient Google Flow / Remotion Canopy Video Vignette */}
            <div
              className={`relative aspect-[16/9] w-full rounded-sm overflow-hidden border ${hairline} ${
                isNight ? 'bg-[#0D200C]' : 'bg-[#DCE7D4]/40'
              }`}
            >
              <video
                src="/assets/videos/canopy_bioluminescent_loop.mp4"
                poster="/assets/videos/canopy_poster.webp"
                autoPlay
                loop
                muted
                playsInline
                aria-label="Avani living canopy ambient motion loop"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08140B]/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[#F9FAF7]">
                <span className="inline-flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#6EE7B7]" />
                  Earth In Our Hands
                </span>
                <span className="opacity-80">100% Youth Led</span>
              </div>
            </div>

            {/* Direct Source Links: Canva Mood Boards + Infographic + Substack */}
            <div className="flex flex-wrap gap-2">
              <a
                href={EXTERNAL_LINKS.canvaMoodBoard1}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full border text-[11px] font-mono transition-colors ${pillClass}`}
              >
                <span>Canva Mood Board</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <a
                href={EXTERNAL_LINKS.canvaMoodBoard2}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full border text-[11px] font-mono transition-colors ${pillClass}`}
              >
                <span>Canva Infographic</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <a
                href={EXTERNAL_LINKS.substack}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full border text-[11px] font-mono transition-colors ${pillClass}`}
              >
                <span>Substack Journal</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <a
                href={EXTERNAL_LINKS.applicationForm}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full border text-[11px] font-mono font-semibold transition-colors ${
                  isNight
                    ? 'bg-[#6EE7B7] text-[#08140B] border-[#6EE7B7] hover:bg-[#10B981]'
                    : 'bg-[#163515] text-[#F9FAF7] border-[#163515] hover:bg-[#2D5A27]'
                }`}
              >
                <span>Apply Cohort &apos;26</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Right / Crossing Display Editorial Column (spans 8 cols on desktop) */}
          <div className="lg:col-span-8 lg:pl-12 pt-2 lg:pt-6">
            <div className="mb-5 flex items-center gap-3">
              <span
                className={`inline-block w-2 h-2 rounded-full ${
                  isNight ? 'bg-[#6EE7B7]' : 'bg-[#568203]'
                }`}
              />
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] opacity-75">
                Turning Awareness Into Collective Climate Action
              </span>
            </div>

            <h1
              ref={headlinePrimaryRef}
              className="font-serif font-medium tracking-[-0.03em] leading-[1.01] text-[clamp(2.65rem,6.1vw,5.75rem)]"
            >
              Small actions of{' '}
              <span className={`italic ${isNight ? 'text-[#6EE7B7]' : 'text-[#568203]'}`}>
                many
              </span>{' '}
              add up to shape a greener India.
            </h1>

            {/* Secondary Statement positioned lower across the column like bleibtgleich.dev */}
            <div className={`mt-14 sm:mt-20 lg:mt-28 pt-8 border-t ${hairline}`}>
              <p
                ref={headlineSecondaryRef}
                className="font-sans font-normal tracking-[-0.02em] leading-[1.18] text-[clamp(1.35rem,2.7vw,2.45rem)] max-w-3xl"
              >
                {AVANI_ORGANIZATION.missionParagraphs[2]}{' '}
                <span className="opacity-70">{AVANI_ORGANIZATION.missionParagraphs[3]}</span>
              </p>

              {/* How We Work Quick Highlights */}
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {AVANI_ORGANIZATION.howWeWorkHighlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className={`p-4 border ${hairline} ${
                      isNight ? 'bg-[#0D200C]/45' : 'bg-white/60'
                    }`}
                  >
                    <span className={`font-mono text-[11px] block mb-1.5 ${mutedText}`}>
                      0{idx + 1} / PRACTICE
                    </span>
                    <p className="text-xs sm:text-sm leading-relaxed opacity-90">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sticky-style Split Brand Wordmark Footer inside Hero (mirrors `bleibt` ... `gleich`) */}
        <div
          className={`mt-14 sm:mt-20 pt-5 border-t ${hairline} flex items-baseline justify-between gap-4`}
        >
          <span className="font-serif font-bold tracking-[-0.04em] text-[clamp(2.25rem,5.5vw,4.5rem)] leading-none">
            avani
          </span>
          <div className="flex items-center gap-3 font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] opacity-75">
            <span>{progressPct.toString().padStart(2, '0')}%</span>
            <span aria-hidden="true">·</span>
            <span>&apos;26</span>
          </div>
          <span className="font-serif italic font-medium tracking-[-0.03em] text-[clamp(2.25rem,5.5vw,4.5rem)] leading-none">
            youth
          </span>
        </div>
      </div>
    </section>
  );
}
