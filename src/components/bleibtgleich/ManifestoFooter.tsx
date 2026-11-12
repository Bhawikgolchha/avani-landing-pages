'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ArrowUpRight, Mail, Phone, MapPin } from 'lucide-react';
import { AVANI_ORGANIZATION, EXTERNAL_LINKS } from '@/lib/avaniContent';
import { useAvaniTheme } from './ThemeTransitionOverlay';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

/**
 * Section 4 (`.footer`):
 * Models bleibtgleich.dev's monumental Manifesto Footer:
 * - Full-width 1px top hairline
 * - Staggered editorial closing statement
 * - Direct Contact & Circular Social Icons left | 6-Step Application Checklist (`NAME_AVANI_SUBMISSION`) + Google Form right
 * - Centered oversized `AVANI` brand wordmark lockup
 */
export function ManifestoFooter() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const statementRef = useRef<HTMLHeadingElement | null>(null);
  const { isNight, toggleTheme } = useAvaniTheme();

  useEffect(() => {
    const el = sectionRef.current;
    const heading = statementRef.current;
    if (!el || !heading || typeof window === 'undefined') return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const split = SplitText.create(heading, { type: 'words' });
      gsap.from(split.words, {
        y: 30,
        opacity: 0,
        duration: 0.75,
        stagger: 0.03,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: heading,
          start: 'top 86%',
          once: true,
        },
        clearProps: 'transform,opacity',
      });

      return () => split.revert();
    }, el);

    return () => ctx.revert();
  }, []);

  const hairline = isNight ? 'border-[#6EE7B7]/20' : 'border-[#163515]/20';
  const mutedText = isNight ? 'text-[#8FA882]' : 'text-[#2D5A27]';
  const socialBtnClass = isNight
    ? 'w-12 h-12 rounded-full border border-[#6EE7B7]/35 flex items-center justify-center font-mono text-xs font-semibold hover:bg-[#6EE7B7] hover:text-[#08140B] transition-colors'
    : 'w-12 h-12 rounded-full border border-[#163515]/35 flex items-center justify-center font-mono text-xs font-semibold hover:bg-[#163515] hover:text-[#F9FAF7] transition-colors';

  return (
    <section
      id="apply"
      ref={sectionRef}
      className={`footer relative border-t ${hairline} pt-16 sm:pt-24 pb-12 overflow-hidden`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Top Manifesto Eyebrow & SplitText Headline */}
        <span className={`font-mono text-[11px] uppercase tracking-[0.22em] block mb-4 ${mutedText}`}>
          04 / Manifesto &amp; Recruitment
        </span>

        <h2
          ref={statementRef}
          className="font-serif font-medium tracking-[-0.035em] leading-[1.03] text-[clamp(2.25rem,5.2vw,4.75rem)] max-w-5xl"
        >
          Everything that exists began with a young voice choosing{' '}
          <span className={`italic ${isNight ? 'text-[#6EE7B7]' : 'text-[#568203]'}`}>
            stewardship
          </span>{' '}
          over indifference.
        </h2>

        {/* Two-Column Contact + 6-Step Application Grid */}
        <div className={`mt-14 pt-12 border-t ${hairline} grid grid-cols-1 lg:grid-cols-12 gap-12`}>
          {/* Left Column: Write Directly To + Circular Social Pills */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div>
              <span className={`font-mono text-[11px] uppercase tracking-[0.2em] block mb-4 ${mutedText}`}>
                Write directly to
              </span>

              <div className="flex flex-col gap-3">
                <a
                  href={EXTERNAL_LINKS.emailMailto}
                  className="inline-flex items-center gap-2.5 font-serif text-xl sm:text-2xl hover:opacity-75 transition-opacity w-fit"
                >
                  <Mail className="w-5 h-5 shrink-0 opacity-70" />
                  <span>{EXTERNAL_LINKS.email}</span>
                </a>
                <a
                  href={EXTERNAL_LINKS.phoneTel}
                  className="inline-flex items-center gap-2.5 font-mono text-base sm:text-lg hover:opacity-75 transition-opacity w-fit"
                >
                  <Phone className="w-4 h-4 shrink-0 opacity-70" />
                  <span>{EXTERNAL_LINKS.phoneFormatted}</span>
                </a>
                <p className="inline-flex items-center gap-2 text-xs font-mono opacity-70 mt-1">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{AVANI_ORGANIZATION.location} · 100% Student &amp; Volunteer Led</span>
                </p>
              </div>
            </div>

            {/* Circular Bordered Social Links mirroring bleibtgleich.dev (in, Sb, IG, Cb) */}
            <div>
              <span className={`font-mono text-[11px] uppercase tracking-[0.2em] block mb-3 ${mutedText}`}>
                Connect &amp; Archive
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={EXTERNAL_LINKS.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Avani LinkedIn"
                  className={socialBtnClass}
                >
                  in
                </a>
                <a
                  href={EXTERNAL_LINKS.substack}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Avani Substack"
                  className={socialBtnClass}
                >
                  Sb
                </a>
                <a
                  href={EXTERNAL_LINKS.instagramClean}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Avani Instagram"
                  className={socialBtnClass}
                >
                  IG
                </a>
                <a
                  href={EXTERNAL_LINKS.canvaMoodBoard1}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Avani Canva Mood Board"
                  className={socialBtnClass}
                >
                  Cb
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Verbatim 6-Step Application Checklist & Google Form CTA */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
              <span className={`font-mono text-[11px] uppercase tracking-[0.2em] ${mutedText}`}>
                Volunteer Recruitment · 6 Application Steps
              </span>
              <button
                type="button"
                onClick={toggleTheme}
                className="font-mono text-[11px] underline underline-offset-4 opacity-75 hover:opacity-100"
              >
                Toggle {isNight ? 'Daylight' : 'GlowNight'} Overlay
              </button>
            </div>

            <div className={`divide-y ${hairline} border-t border-b ${hairline}`}>
              {AVANI_ORGANIZATION.applicationInstructions.map((inst) => {
                const isSubmissionToken = inst.highlight === 'NAME_AVANI_SUBMISSION';
                const [beforeToken, afterToken] = isSubmissionToken
                  ? inst.text.split('NAME_AVANI_SUBMISSION')
                  : [inst.text, ''];

                return (
                  <div key={inst.step} className="py-3.5 flex items-start gap-4">
                    <span className={`font-mono text-xs shrink-0 pt-0.5 ${mutedText}`}>
                      0{inst.step}
                    </span>
                    <div className="text-sm leading-relaxed">
                      <span>{beforeToken}</span>
                      {isSubmissionToken && (
                        <code
                          className={`inline-block px-2 py-0.5 font-mono text-xs border ${hairline} ${
                            isNight
                              ? 'bg-[#0D200C] text-[#6EE7B7]'
                              : 'bg-[#DCE7D4] text-[#163515]'
                          }`}
                        >
                          NAME_AVANI_SUBMISSION
                        </code>
                      )}
                      {afterToken && <span>{afterToken}</span>}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href={EXTERNAL_LINKS.applicationForm}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-mono text-xs sm:text-sm font-semibold transition-transform hover:scale-[1.02] ${
                  isNight
                    ? 'bg-[#6EE7B7] text-[#08140B] hover:bg-[#10B981]'
                    : 'bg-[#163515] text-[#F9FAF7] hover:bg-[#2D5A27]'
                }`}
              >
                <span>Open Google Application Form</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <Link
                href="/hub"
                className={`inline-flex items-center gap-1.5 px-5 py-3.5 rounded-full border ${hairline} font-mono text-xs hover:opacity-75`}
              >
                <span>Explore /hub &amp; All Prototypes</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Full-bleed Monumental Brand Wordmark Lockup */}
        <div className={`mt-16 sm:mt-24 pt-6 border-t ${hairline} text-center select-none`}>
          <p
            aria-hidden="true"
            className="font-serif font-bold uppercase tracking-[-0.05em] leading-[0.86] text-[clamp(4.5rem,20vw,18rem)]"
          >
            AVANI
          </p>
        </div>
      </div>
    </section>
  );
}
