'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Navbar, GOOGLE_FORM_URL } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { FirefliesBackground } from '@/components/common/FirefliesBackground';
import { AvaniThemeProvider, useAvaniTheme } from '@/components/bleibtgleich/ThemeTransitionOverlay';
import { AVANI_ORGANIZATION } from '@/lib/avaniContent';

function HowWeWorkContent() {
  const { isNight } = useAvaniTheme();

  const pageBg = isNight ? 'bg-[#0E1610] text-[#ECEFE9]' : 'bg-[#F9FAF7] text-[#163515]';
  const cardBg = isNight ? 'bg-[#19261B] border-white/10' : 'bg-white border-stone-200/70';
  const textMuted = isNight ? 'text-[#9CAEA0]' : 'text-stone-600';
  const accentText = isNight ? 'text-[#86B87A]' : 'text-[#54683C]';

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-500 relative ${pageBg}`}>
      <FirefliesBackground />
      <Navbar />

      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full relative z-10">
        <Link
          href="/#about"
          className={`inline-flex items-center gap-2 text-sm font-medium mb-8 transition-colors ${accentText} hover:opacity-80`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="max-w-3xl mb-14">
          <p className={`text-sm font-medium mb-3 ${accentText}`}>About Avani · Process</p>
          <h1 className="font-serif font-semibold text-4xl sm:text-5xl tracking-tight leading-[1.1] mb-6">
            How We Work
          </h1>
          <div className={`space-y-4 text-base sm:text-lg leading-relaxed ${textMuted}`}>
            {AVANI_ORGANIZATION.missionParagraphs.slice(1, 4).map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {AVANI_ORGANIZATION.howWeWorkHighlights.map((item, i) => (
            <li
              key={i}
              className={`flex gap-5 p-6 rounded-2xl border transition-colors ${cardBg}`}
            >
              <span className={`font-serif font-semibold text-3xl leading-none shrink-0 mt-1 ${accentText} opacity-70`}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className={`text-base leading-relaxed ${textMuted}`}>{item}</p>
            </li>
          ))}
        </ol>

        <div className={`p-8 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-6 ${cardBg}`}>
          <div>
            <h2 className="font-serif font-semibold text-2xl mb-1">Want to build with us?</h2>
            <p className={`text-sm ${textMuted}`}>
              Explore our student teams or volunteer at our next Bangalore community drive.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/members"
              className={`px-5 py-3 rounded-full text-sm font-medium border transition-colors ${
                isNight ? 'border-white/15 hover:bg-white/5' : 'border-stone-300 hover:bg-stone-100'
              }`}
            >
              Meet Our Members
            </Link>
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-colors ${
                isNight
                  ? 'bg-[#86B87A] text-[#0E1610] hover:bg-[#97C98B]'
                  : 'bg-[#163515] text-white hover:bg-[#254d24]'
              }`}
            >
              <span>Apply to Join</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function HowWeWorkPage() {
  return (
    <AvaniThemeProvider>
      <HowWeWorkContent />
    </AvaniThemeProvider>
  );
}
