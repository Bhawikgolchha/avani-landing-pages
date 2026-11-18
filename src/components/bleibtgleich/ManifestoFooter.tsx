'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ArrowUpRight, Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import { AVANI_ORGANIZATION, EXTERNAL_LINKS } from '@/lib/avaniContent';
import { useAvaniTheme } from './ThemeTransitionOverlay';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

/**
 * Monumental Manifesto Footer:
 * - Full-width hairline
 * - Staggered editorial closing statement
 * - Direct Contact & Circular Social Icons left | 6-Step Application Checklist (`NAME_AVANI_SUBMISSION`) + Google Form right
 * - Centered oversized monumental `AVANI` brand wordmark lockup
 */
export function ManifestoFooter() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const statementRef = useRef<HTMLHeadingElement | null>(null);
  const { isNight } = useAvaniTheme();

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
  const mutedText = isNight ? 'text-[#8FA882]' : 'text-[#54683C]';
  const socialBtnClass = isNight
    ? 'w-12 h-12 rounded-full border border-[#6EE7B7]/35 flex items-center justify-center font-mono text-xs font-semibold hover:bg-[#6EE7B7] hover:text-[#08140B] transition-colors'
    : 'w-12 h-12 rounded-full border border-[#54683C]/40 flex items-center justify-center font-mono text-xs font-semibold hover:bg-[#54683C] hover:text-[#F9FAF7] transition-colors';

  return (
    <section
      id="apply"
      ref={sectionRef}
      className={`footer relative border-t ${hairline} pt-16 sm:pt-24 pb-12 overflow-hidden bg-white/50`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Top Manifesto Eyebrow & SplitText Headline */}
        <span className={`font-mono text-[11px] uppercase tracking-[0.22em] block mb-4 ${mutedText} font-semibold`}>
          Manifesto &amp; Youth Recruitment
        </span>

        <h2
          ref={statementRef}
          className="font-serif font-bold tracking-[-0.035em] leading-[1.05] text-[clamp(2.25rem,5.2vw,4.75rem)] max-w-5xl text-[#163515]"
        >
          Everything that exists began with a young voice choosing{' '}
          <span className="italic text-[#54683C]">
            stewardship
          </span>{' '}
          over indifference.
        </h2>

        {/* Two-Column Contact + 6-Step Application Grid */}
        <div className={`mt-14 pt-12 border-t ${hairline} grid grid-cols-1 lg:grid-cols-12 gap-12`}>
          {/* Left Column: Write Directly To + Circular Social Pills */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div>
              <span className={`font-mono text-[11px] uppercase tracking-[0.2em] block mb-4 ${mutedText} font-semibold`}>
                Write directly to
              </span>

              <div className="flex flex-col gap-3">
                <a
                  href={EXTERNAL_LINKS.emailMailto}
                  className="inline-flex items-center gap-2.5 font-serif text-xl sm:text-2xl hover:text-[#54683C] transition-colors w-fit text-[#163515]"
                >
                  <Mail className="w-5 h-5 shrink-0 opacity-70" />
                  <span>{EXTERNAL_LINKS.email}</span>
                </a>

                <a
                  href={EXTERNAL_LINKS.phoneTel}
                  className="inline-flex items-center gap-2.5 font-mono text-sm sm:text-base hover:text-[#54683C] transition-colors w-fit text-stone-700"
                >
                  <Phone className="w-4 h-4 shrink-0 opacity-70" />
                  <span>{EXTERNAL_LINKS.phoneFormatted}</span>
                </a>

                <div className="flex items-center gap-2 text-xs font-mono text-stone-500 pt-2">
                  <MapPin className="w-4 h-4 text-[#54683C] shrink-0" />
                  <span>Bangalore, Karnataka, India</span>
                </div>
              </div>
            </div>

            {/* Circular Social Buttons */}
            <div>
              <span className={`font-mono text-[11px] uppercase tracking-[0.2em] block mb-3 ${mutedText} font-semibold`}>
                Connect across platforms
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
                  href={EXTERNAL_LINKS.emailMailto}
                  aria-label="Email Avani"
                  className={socialBtnClass}
                >
                  ✉
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Verbatim 6-Step Application Checklist & Google Form CTA */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
              <span className={`font-mono text-[11px] uppercase tracking-[0.2em] ${mutedText} font-semibold`}>
                Volunteer Recruitment · Application Steps
              </span>
            </div>

            <div className={`divide-y ${hairline} border-t border-b ${hairline}`}>
              {AVANI_ORGANIZATION.applicationInstructions.map((inst) => {
                const isSubmissionToken = inst.highlight === 'NAME_AVANI_SUBMISSION';
                const [beforeToken, afterToken] = isSubmissionToken
                  ? inst.text.split('NAME_AVANI_SUBMISSION')
                  : [inst.text, ''];

                return (
                  <div key={inst.step} className="py-3.5 flex items-start gap-4">
                    <span className={`font-mono text-xs shrink-0 pt-0.5 ${mutedText} font-bold`}>
                      0{inst.step}
                    </span>
                    <div className="text-sm leading-relaxed text-stone-700">
                      <span>{beforeToken}</span>
                      {isSubmissionToken && (
                        <code
                          className="inline-block px-2 py-0.5 font-mono text-xs font-semibold bg-[#DCE7D4] text-[#163515] border border-[#54683C]/30 rounded"
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
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-sans text-xs sm:text-sm font-semibold transition-transform hover:scale-[1.02] bg-[#163515] text-[#F9FAF7] hover:bg-[#254d24] shadow-md"
              >
                <span>Open Google Application Form</span>
                <ArrowUpRight className="w-4 h-4 text-emerald-300" />
              </a>
              <Link
                href="/quiz"
                className="inline-flex items-center gap-1.5 px-5 py-3.5 rounded-full border border-[#54683C]/40 text-[#163515] font-sans text-xs font-medium hover:bg-[#DCE7D4]/40 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#54683C]" />
                <span>Take Organization Eco Quiz</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Full-bleed Monumental Brand Wordmark Lockup ("avani text at the last") */}
        <div className={`mt-16 sm:mt-24 pt-8 border-t ${hairline} text-center select-none`}>
          <p
            aria-hidden="true"
            className="font-serif font-black uppercase tracking-[-0.05em] leading-[0.84] text-[clamp(4.5rem,19vw,17rem)] text-[#163515]/90 hover:text-[#54683C] transition-colors duration-500"
          >
            AVANI
          </p>
          <p className="text-xs uppercase tracking-[0.25em] font-mono text-[#54683C] font-semibold mt-4">
            Earth In Our Hands &middot; Bangalore Youth Climate Collective
          </p>
        </div>
      </div>
    </section>
  );
}
