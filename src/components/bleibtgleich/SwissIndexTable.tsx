'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowUpRight, CheckCircle2, Circle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import {
  AVANI_OBJECTIVES,
  AVANI_TEAMS,
  CLIMATE_TIPS,
  EXTERNAL_LINKS,
} from '@/lib/avaniContent';
import { useAvaniTheme } from './ThemeTransitionOverlay';

export type IndexChapter = 'objectives' | 'teams' | 'tips';

const QUIZ_QUESTIONS = [
  {
    q: 'What should you do when you leave a room or finish charging a device?',
    options: [
      'Leave chargers plugged in for convenience',
      'Switch off lights/fans and unplug unused chargers',
      'Only dim lights to 50%',
    ],
    correct: 1,
    tipRef: 'Tips #1 & #2',
  },
  {
    q: 'How should vegetable peels and food scraps be handled at home?',
    options: [
      'Compost organic scraps & plan meals to curb food waste',
      'Bag them in single-use plastic cutlery wrappers',
      'Flush scraps down the kitchen sink',
    ],
    correct: 0,
    tipRef: 'Tips #5 & #6',
  },
  {
    q: 'Before buying a new storage jar or printed copy, what does Avani recommend?',
    options: [
      'Buy single-use containers every month',
      'Repurpose glass jars, refuse extra packaging & go digital/duplex',
      'Always print single-sided color copies',
    ],
    correct: 1,
    tipRef: 'Tips #9, #10 & #11',
  },
];

/**
 * Section 3 (`.awards`):
 * Models bleibtgleich.dev's 4-column Swiss hairline index table with chapter tabs
 * unifying Objectives (5), Specialized Teams (5), and 11 Climate Tips + Interactive Quiz.
 */
export function SwissIndexTable() {
  const [chapter, setChapter] = useState<IndexChapter>('objectives');
  const [expandedTeamId, setExpandedTeamId] = useState<string | null>(AVANI_TEAMS[0].id);
  const [checkedTips, setCheckedTips] = useState<number[]>([1, 4]);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const { isNight } = useAvaniTheme();

  // Sync tab selection when Navbar anchor links (#objectives, #teams, #climate-tips) change hash
  useEffect(() => {
    const syncFromHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'teams') setChapter('teams');
      else if (hash === 'climate-tips') setChapter('tips');
      else if (hash === 'objectives') setChapter('objectives');
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  const toggleTip = (id: number) => {
    setCheckedTips((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const quizScore = QUIZ_QUESTIONS.reduce((acc, q, idx) => {
    return quizAnswers[idx] === q.correct ? acc + 1 : acc;
  }, 0);

  const hairline = isNight ? 'border-[#6EE7B7]/20' : 'border-[#163515]/20';
  const mutedText = isNight ? 'text-[#8FA882]' : 'text-[#2D5A27]';
  const rowHover = isNight ? 'hover:bg-[#0D200C]/80' : 'hover:bg-[#DCE7D4]/55';

  return (
    <section
      id="objectives"
      className={`awards relative border-t ${hairline} py-16 sm:py-24`}
    >
      {/* Hidden anchor targets so #teams and #climate-tips resolve smoothly */}
      <span id="teams" className="sr-only" aria-hidden="true" />
      <span id="climate-tips" className="sr-only" aria-hidden="true" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header + Interactive Chapter Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8">
          <div>
            <span className={`font-mono text-[11px] uppercase tracking-[0.22em] block ${mutedText}`}>
              03 / Swiss Organizational Index
            </span>
            <h2 className="mt-2 font-serif text-[clamp(2rem,4vw,3.5rem)] font-medium tracking-[-0.03em] leading-[1.05]">
              Mandate, Structure &amp; Climate Action
            </h2>
          </div>

          {/* 3 Architectural Chapter Switchers */}
          <div
            role="tablist"
            aria-label="Avani organizational index chapters"
            className="flex flex-wrap gap-2"
          >
            {(
              [
                { id: 'objectives', label: `01 Objectives (${AVANI_OBJECTIVES.length})` },
                { id: 'teams', label: `02 Teams (${AVANI_TEAMS.length})` },
                { id: 'tips', label: `03 Climate Tips (${CLIMATE_TIPS.length}) & Quiz` },
              ] as const
            ).map((tab) => {
              const active = chapter === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  onClick={() => setChapter(tab.id)}
                  className={`px-4 py-2 rounded-full border font-mono text-xs transition-colors ${
                    active
                      ? isNight
                        ? 'bg-[#6EE7B7] text-[#08140B] border-[#6EE7B7] font-semibold'
                        : 'bg-[#163515] text-[#F9FAF7] border-[#163515] font-semibold'
                      : `${hairline} hover:opacity-80`
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Column Headings (4-column bleibtgleich.dev .awards structure) */}
        <div
          className={`hidden md:grid grid-cols-12 gap-4 py-3 border-t border-b ${hairline} font-mono text-[11px] uppercase tracking-wider opacity-65`}
        >
          <div className="col-span-2">Index</div>
          <div className="col-span-5">Title &amp; Mandate</div>
          <div className="col-span-3">Domain / Practice</div>
          <div className="col-span-2 text-right">Impact / Action</div>
        </div>

        {/* CHAPTER 1: 5 CORE OBJECTIVES */}
        {chapter === 'objectives' && (
          <div className={`divide-y ${hairline} border-b ${hairline}`}>
            {AVANI_OBJECTIVES.map((obj) => (
              <div
                key={obj.id}
                className={`grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 py-5 px-2 transition-colors ${rowHover}`}
              >
                <div className={`md:col-span-2 font-mono text-xs ${mutedText}`}>
                  0{obj.id} · &apos;26
                </div>
                <div className="md:col-span-5">
                  <h3 className="font-serif text-lg sm:text-xl font-semibold">
                    {obj.title}
                  </h3>
                  <p className="mt-1 text-sm opacity-80 leading-relaxed">{obj.verbatimCopy}</p>
                </div>
                <div className="md:col-span-3 font-mono text-xs uppercase tracking-wider flex items-center opacity-75">
                  {obj.category}
                </div>
                <div className="md:col-span-2 md:text-right font-mono text-xs font-semibold flex md:justify-end items-center">
                  {obj.metric}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CHAPTER 2: 5 SPECIALIZED TEAMS */}
        {chapter === 'teams' && (
          <div className={`divide-y ${hairline} border-b ${hairline}`}>
            {AVANI_TEAMS.map((team) => {
              const isOpen = expandedTeamId === team.id;
              return (
                <div key={team.id} className={`transition-colors ${rowHover}`}>
                  <button
                    type="button"
                    onClick={() => setExpandedTeamId(isOpen ? null : team.id)}
                    aria-expanded={isOpen}
                    className="w-full text-left grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 py-5 px-2 items-center"
                  >
                    <div className={`md:col-span-2 font-mono text-xs ${mutedText}`}>
                      TEAM 0{team.number}
                    </div>
                    <div className="md:col-span-5">
                      <h3 className="font-serif text-lg sm:text-xl font-semibold">
                        {team.name}
                      </h3>
                      <p className="mt-0.5 text-xs sm:text-sm opacity-75">{team.role}</p>
                    </div>
                    <div className="md:col-span-3 font-mono text-xs uppercase tracking-wider opacity-75">
                      {team.keyFocus}
                    </div>
                    <div className="md:col-span-2 flex items-center md:justify-end gap-2 font-mono text-xs">
                      <span>{team.tag}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 shrink-0" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className={`px-4 pb-6 pt-2 md:pl-[16.66%] border-t ${hairline}`}>
                      <p className="text-sm leading-relaxed opacity-90 max-w-3xl mb-3">
                        {team.description}
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs leading-relaxed">
                        {team.responsibilities.map((resp, rIdx) => (
                          <li
                            key={rIdx}
                            className={`p-3 border ${hairline} ${
                              isNight ? 'bg-[#08140B]/70' : 'bg-white/75'
                            }`}
                          >
                            <span className={`font-mono mr-1.5 ${mutedText}`}>
                              0{rIdx + 1}.
                            </span>
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* CHAPTER 3: 11 CLIMATE TIPS + INTERACTIVE QUIZ + INFOGRAPHIC */}
        {chapter === 'tips' && (
          <div>
            {/* Progress Header */}
            <div className={`py-4 px-2 border-b ${hairline} flex flex-wrap items-center justify-between gap-4`}>
              <p className="font-mono text-xs">
                Everyday Pledge Tracker:{' '}
                <strong className={isNight ? 'text-[#6EE7B7]' : 'text-[#568203]'}>
                  {checkedTips.length} / {CLIMATE_TIPS.length}
                </strong>{' '}
                habits active today
              </p>
              <a
                href={EXTERNAL_LINKS.canvaMoodBoard1}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-mono text-xs underline underline-offset-4 hover:opacity-75"
              >
                <span>Open Canva Climate Infographic Source</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className={`divide-y ${hairline} border-b ${hairline}`}>
              {CLIMATE_TIPS.map((tip) => {
                const done = checkedTips.includes(tip.id);
                return (
                  <button
                    key={tip.id}
                    type="button"
                    onClick={() => toggleTip(tip.id)}
                    aria-pressed={done}
                    className={`w-full text-left grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 py-4 px-2 items-center transition-colors ${rowHover}`}
                  >
                    <div className={`md:col-span-2 font-mono text-xs ${mutedText}`}>
                      TIP {tip.id < 10 ? `0${tip.id}` : tip.id}
                    </div>
                    <div className="md:col-span-5">
                      <span className="font-serif text-base sm:text-lg font-medium block">
                        {tip.shortTitle}
                      </span>
                      <span className="text-xs sm:text-sm opacity-80 block mt-0.5">
                        {tip.action}
                      </span>
                    </div>
                    <div className="md:col-span-3 font-mono text-xs uppercase opacity-75">
                      {tip.categoryLabel} · {tip.impactLevel}
                    </div>
                    <div className="md:col-span-2 flex items-center md:justify-end gap-2 font-mono text-xs">
                      <span>{done ? 'Practicing' : 'Mark Daily'}</span>
                      {done ? (
                        <CheckCircle2
                          className={`w-4 h-4 ${isNight ? 'text-[#6EE7B7]' : 'text-[#568203]'}`}
                        />
                      ) : (
                        <Circle className="w-4 h-4 opacity-50" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Interactive Quiz & Infographic Side-by-Side Box */}
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className={`lg:col-span-7 p-6 border ${hairline}`}>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className={`w-4 h-4 ${isNight ? 'text-[#6EE7B7]' : 'text-[#568203]'}`} />
                    <h3 className="font-serif text-xl font-semibold">
                      Avani Interactive Climate Readiness Quiz
                    </h3>
                  </div>
                  <span className="font-mono text-xs px-2.5 py-1 border border-current/25">
                    Score: {quizScore}/{QUIZ_QUESTIONS.length}
                  </span>
                </div>
                <p className="text-xs font-mono opacity-70 mb-5">
                  Interactive edition based on Avani&apos;s 11 Climate Tips (external Google Quiz link pending core-team upload per brief).
                </p>

                <div className="flex flex-col gap-5">
                  {QUIZ_QUESTIONS.map((item, qIdx) => (
                    <div key={qIdx} className={`pt-4 border-t ${hairline}`}>
                      <p className="text-sm font-medium mb-2.5">
                        <span className={`font-mono mr-2 ${mutedText}`}>Q{qIdx + 1}.</span>
                        {item.q}
                      </p>
                      <div className="flex flex-col gap-1.5">
                        {item.options.map((opt, optIdx) => {
                          const picked = quizAnswers[qIdx] === optIdx;
                          const isRight = optIdx === item.correct;
                          return (
                            <button
                              key={optIdx}
                              type="button"
                              onClick={() =>
                                setQuizAnswers((prev) => ({ ...prev, [qIdx]: optIdx }))
                              }
                              className={`text-left text-xs px-3 py-2 border transition-colors ${
                                picked
                                  ? isRight
                                    ? isNight
                                      ? 'border-[#6EE7B7] bg-[#0D200C] text-[#6EE7B7]'
                                      : 'border-[#568203] bg-[#DCE7D4] text-[#163515]'
                                    : 'border-red-500/60 bg-red-500/10'
                                  : `${hairline} hover:opacity-80`
                              }`}
                            >
                              {opt}
                              {picked && isRight ? ` ✓ (${item.tipRef})` : ''}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Infographic Preview Card */}
              <div className={`lg:col-span-5 p-6 border ${hairline}`}>
                <span className={`font-mono text-[11px] uppercase tracking-wider block ${mutedText}`}>
                  Visual Companion Poster
                </span>
                <h3 className="mt-1 font-serif text-xl font-semibold mb-4">
                  11 Climate Tips Infographic
                </h3>
                <div className={`relative aspect-[4/3] w-full overflow-hidden border ${hairline}`}>
                  <Image
                    src="/assets/images/climate_tips_infographic.webp"
                    alt="Avani 11 Climate Tips visual infographic poster"
                    fill
                    sizes="(max-width: 1024px) 100vw, 480px"
                    className="object-cover"
                  />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href={EXTERNAL_LINKS.canvaMoodBoard1}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 px-3.5 py-2 border ${hairline} font-mono text-xs hover:opacity-75`}
                  >
                    <span>Mood Board ↗</span>
                  </a>
                  <a
                    href={EXTERNAL_LINKS.canvaMoodBoard2}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 px-3.5 py-2 border ${hairline} font-mono text-xs hover:opacity-75`}
                  >
                    <span>Canva Link ↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
