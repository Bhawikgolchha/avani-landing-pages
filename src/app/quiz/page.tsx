'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Award, 
  ArrowUpRight,
  HelpCircle,
  Trees,
  Sprout,
  Recycle,
  BookOpen
} from 'lucide-react';
import { Navbar, GOOGLE_FORM_URL } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { EXTERNAL_LINKS } from '@/lib/avaniContent';

interface Question {
  id: number;
  question: string;
  category: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    category: 'Bangalore Ecology',
    question: "Historically, Bangalore was celebrated for its interconnected water reservoirs known as a cascade system. What is Avani's primary objective regarding local lakes?",
    options: [
      'Encouraging private real estate construction along lake beds',
      'Restoration of degraded natural resources, urban waterbodies, and biodiversity corridors',
      'Replacing historical lakes with concrete recreational parks',
      'Diverting lake water exclusively for industrial factories'
    ],
    correctIndex: 1,
    explanation: "Avani's second pillar focuses on the active upliftment and restoration of Bangalore's historical lakes, urban afforestation, and indigenous biodiversity."
  },
  {
    id: 2,
    category: 'Circular Fashion',
    question: "During the Invictus Youth Festival stall, what discarded everyday textile did Avani upcycle into modern functional tote bags?",
    options: [
      'Discarded denim jeans',
      'Disposable plastic medical masks',
      'Single-use nylon shopping bags',
      'Synthetic polyester curtains'
    ],
    correctIndex: 0,
    explanation: "At the Invictus Youth Fest, Avani demonstrated circular economy principles by collecting discarded denim and repurposing over 120 garments into durable, stylish tote bags."
  },
  {
    id: 3,
    category: 'Student Teams',
    question: "Which of Avani's 5 specialized student teams writes investigative essays on urban hydrology and national environmental bills for Substack?",
    options: [
      'Event Planning & Logistics Team',
      'Social Media & Outreach Team',
      'Research & Writing Team',
      'HR & Communications Team'
    ],
    correctIndex: 2,
    explanation: "The Research & Writing team acts as Avani's intellectual backbone, authoring in-depth Substack deep dives, policy briefs, and fact-checked environmental analyses."
  },
  {
    id: 4,
    category: 'Community Partnership',
    question: "Who did Avani partner with for their heartwarming Orphanage Donation Drive delivering educational kits and creative workshops?",
    options: [
      'Aarogi Foundation',
      'Greenpeace International',
      'United Nations Environment Programme',
      'Bangalore City Municipal Council'
    ],
    correctIndex: 0,
    explanation: "Avani partnered with Aarogi Foundation to support 85 children with essential learning supplies, hygiene commodities, and interactive storytelling workshops."
  },
  {
    id: 5,
    category: 'Everyday Habits',
    question: "According to Avani's Climate Care guidelines, what is one of the most impactful daily actions any Bangalore citizen can practice at home?",
    options: [
      'Burning domestic dry waste in neighborhood bins',
      'Leaving chargers and appliances plugged in around the clock',
      'Segregating dry, wet, and sanitary waste at source + composting kitchen scraps',
      'Relying entirely on single-use bottled mineral water'
    ],
    correctIndex: 2,
    explanation: "Proper waste segregation at source and decentralized composting prevent organic materials from rotting in toxic landfills and producing potent methane emissions."
  },
  {
    id: 6,
    category: 'Recruitment Protocol',
    question: "What is the exact file-naming format required when submitting your sample writing, design portfolio, or event plan to Avani?",
    options: [
      'MY_PORTFOLIO_FINAL_V2.PDF',
      'NAME_AVANI_SUBMISSION',
      'AVANI_APPLICATION_FILE',
      'BANGALORE_STUDENT_RESUME'
    ],
    correctIndex: 1,
    explanation: "Avani's recruitment guidelines strictly mandate the standardized file format: NAME_AVANI_SUBMISSION so the HR team can accurately review candidate submissions."
  }
];

export default function AvaniQuizPage() {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIdx];
  const totalQuestions = QUIZ_QUESTIONS.length;
  const isAnswered = selectedAnswers[currentQ.id] !== undefined;

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: idx }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentQuestionIdx < totalQuestions - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIdx(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setQuizFinished(false);
  };

  // Score calculation
  const correctCount = Object.entries(selectedAnswers).reduce((acc, [qId, ansIdx]) => {
    const q = QUIZ_QUESTIONS.find((item) => item.id === Number(qId));
    return acc + (q && q.correctIndex === ansIdx ? 1 : 0);
  }, 0);

  let resultTier = {
    title: 'Rising Seedling 🌱',
    subtitle: 'Great start to your climate learning journey!',
    description: "You're building foundational awareness of Bangalore's ecology and Avani's youth-led movement. Explore our Substack articles to deepen your climate literacy!",
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300'
  };

  if (correctCount >= 4 && correctCount <= 5) {
    resultTier = {
      title: 'Climate Champion 🌳',
      subtitle: 'Impressive environmental awareness!',
      description: "You possess a strong understanding of grassroots urban restoration, circular textile initiatives, and Avani's student teams. You're ready to make a tangible impact!",
      badgeColor: 'bg-[#54683C]/20 text-[#2B3A1C] border-[#54683C]/40'
    };
  } else if (correctCount === 6) {
    resultTier = {
      title: 'Planet Guardian 🌟',
      subtitle: 'Perfect Score — 100% Eco Mastery!',
      description: "You have comprehensive knowledge of Avani's history, field drives, and Bangalore's environmental challenges. You would be a fantastic addition to our student leadership cohort!",
      badgeColor: 'bg-[#54683C] text-white border-[#3E4E2A]'
    };
  }

  const progressPercent = Math.round(((currentQuestionIdx + (isAnswered ? 1 : 0)) / totalQuestions) * 100);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F9FAF7] text-[#163515] selection:bg-[#54683C] selection:text-white">
      <Navbar />

      <main className="flex-grow pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        {/* Header Breadcrumb */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DCE7D4] text-[#163515] border border-[#54683C]/20 text-xs font-semibold tracking-wide mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#54683C]" />
            <span>Interactive Eco-Literacy Experience</span>
          </div>

          <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#163515] tracking-tight">
            Avani Organization &amp; Eco Quiz
          </h1>

          <p className="text-stone-600 text-sm sm:text-base mt-3 leading-relaxed">
            Test your knowledge on Bangalore&apos;s lake restoration, upcycling initiatives, and how our 100% student-led teams operate.
          </p>
        </div>

        {!quizFinished ? (
          /* Active Question Card */
          <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-10 shadow-lg">
            {/* Progress Bar & Counter */}
            <div className="mb-8">
              <div className="flex items-center justify-between text-xs font-mono font-semibold text-stone-500 mb-2">
                <span className="uppercase tracking-wider text-[#54683C]">
                  {currentQ.category}
                </span>
                <span>
                  Question {currentQuestionIdx + 1} of {totalQuestions}
                </span>
              </div>
              <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#54683C] h-full rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Question Text */}
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#163515] mb-6 leading-snug">
              {currentQ.question}
            </h2>

            {/* Multiple Choice Options */}
            <div className="space-y-3">
              {currentQ.options.map((option, idx) => {
                const isSelected = selectedAnswers[currentQ.id] === idx;
                const isCorrect = currentQ.correctIndex === idx;

                let optionClass = 'bg-[#F9FAF7] border-stone-200 hover:border-[#54683C]/60 hover:bg-[#F2F6ED]';
                if (isAnswered) {
                  if (isCorrect) {
                    optionClass = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold';
                  } else if (isSelected) {
                    optionClass = 'bg-rose-50 border-rose-400 text-rose-950';
                  } else {
                    optionClass = 'bg-stone-50 border-stone-200 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${optionClass}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-white border border-stone-200 text-xs font-mono font-semibold flex items-center justify-center shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-sm leading-relaxed">{option}</span>
                    </div>

                    {isAnswered && (
                      <div className="shrink-0">
                        {isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        ) : isSelected ? (
                          <XCircle className="w-5 h-5 text-rose-500" />
                        ) : null}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation Card */}
            {showExplanation && (
              <div className="mt-6 p-4 rounded-xl bg-[#F2F6ED] border border-[#54683C]/30 animate-in fade-in duration-200">
                <div className="flex items-start gap-2.5">
                  <HelpCircle className="w-4 h-4 text-[#54683C] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-[#54683C] uppercase tracking-wider">
                      Context &amp; Fact:
                    </p>
                    <p className="text-xs text-stone-700 leading-relaxed mt-0.5">
                      {currentQ.explanation}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Next / Finish Button */}
            <div className="mt-8 pt-6 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs text-stone-400">
                {isAnswered ? 'Answer registered' : 'Select an option to continue'}
              </span>

              {isAnswered && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-3 rounded-full bg-[#163515] hover:bg-[#254d24] text-white text-xs font-semibold flex items-center gap-2 shadow-sm transition-all"
                >
                  <span>{currentQuestionIdx < totalQuestions - 1 ? 'Next Question' : 'See My Results'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Final Quiz Results Card */
          <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 shadow-xl text-center">
            <div className="w-20 h-20 rounded-full bg-[#54683C]/10 border-2 border-[#54683C]/30 flex items-center justify-center mx-auto mb-6">
              <Award className="w-10 h-10 text-[#54683C]" />
            </div>

            <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#54683C] block mb-1">
              Your Eco-Knowledge Result
            </span>

            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#163515] mb-2">
              {resultTier.title}
            </h2>

            <p className="text-base font-medium text-stone-700 mb-4">
              {resultTier.subtitle}
            </p>

            <div className="inline-block px-5 py-2 rounded-full font-mono text-sm font-bold bg-[#DCE7D4] text-[#163515] mb-6 border border-[#54683C]/20">
              Score: {correctCount} out of {totalQuestions} Correct ({Math.round((correctCount / totalQuestions) * 100)}%)
            </div>

            <p className="text-sm text-stone-600 max-w-lg mx-auto leading-relaxed mb-8">
              {resultTier.description}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 border-t border-stone-100">
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#163515] hover:bg-[#254d24] text-white text-xs font-semibold tracking-wide shadow-md flex items-center justify-center gap-2 transition-all"
              >
                <span>Apply to Join Avani Cohort</span>
                <ArrowUpRight className="w-4 h-4 text-emerald-300" />
              </a>

              <button
                type="button"
                onClick={handleRestart}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-stone-300 text-stone-700 hover:bg-stone-50 text-xs font-medium flex items-center justify-center gap-2 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>

              <Link
                href="/"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium transition-all"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
