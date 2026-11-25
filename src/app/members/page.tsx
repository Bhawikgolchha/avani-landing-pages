'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Palette,
  Users,
  Smartphone,
  Calendar,
  Check,
} from 'lucide-react';
import { Navbar, GOOGLE_FORM_URL } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { FirefliesBackground } from '@/components/common/FirefliesBackground';
import { AvaniThemeProvider, useAvaniTheme } from '@/components/bleibtgleich/ThemeTransitionOverlay';
import { AVANI_TEAMS } from '@/lib/avaniContent';

const TEAM_ICON_MAP: Record<string, React.ElementType> = {
  BookOpen,
  Palette,
  Users,
  Smartphone,
  Calendar,
};

function MembersContent() {
  const { isNight } = useAvaniTheme();

  const pageBg = isNight ? 'bg-[#0E1610] text-[#ECEFE9]' : 'bg-[#F9FAF7] text-[#163515]';
  const cardBg = isNight ? 'bg-[#19261B] border-white/10' : 'bg-white border-stone-200/70';
  const textMuted = isNight ? 'text-[#9CAEA0]' : 'text-stone-600';
  const accentText = isNight ? 'text-[#86B87A]' : 'text-[#54683C]';

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-500 relative ${pageBg}`}>
      <FirefliesBackground />
      <Navbar />

      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full relative z-10">
        <Link
          href="/#about"
          className={`inline-flex items-center gap-2 text-sm font-medium mb-8 transition-colors ${accentText} hover:opacity-80`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>

        <div className="max-w-3xl mb-14">
          <p className={`text-sm font-medium mb-3 ${accentText}`}>About Avani · Our People</p>
          <h1 className="font-serif font-semibold text-4xl sm:text-5xl tracking-tight leading-[1.1] mb-4">
            Our Members &amp; Student Units
          </h1>
          <p className={`text-base sm:text-lg leading-relaxed ${textMuted}`}>
            Avani is 100% student-led across Bangalore schools and universities. Members collaborate inside five specialized units—each responsible for turning climate awareness into real action.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {AVANI_TEAMS.map((team) => {
            const TeamIcon = TEAM_ICON_MAP[team.icon || 'Users'] || Users;
            return (
              <div
                key={team.id}
                className={`p-7 rounded-2xl border flex flex-col justify-between gap-6 transition-colors ${cardBg}`}
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        isNight ? 'bg-[#223425] text-[#86B87A]' : 'bg-[#DCE7D4] text-[#54683C]'
                      }`}
                    >
                      <TeamIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="font-serif font-semibold text-xl">{team.name}</h2>
                      <p className={`text-xs font-medium ${accentText}`}>{team.role}</p>
                    </div>
                  </div>

                  <p className={`text-sm leading-relaxed mb-5 ${textMuted}`}>{team.description}</p>

                  <ul className="space-y-2">
                    {team.responsibilities.map((resp, idx) => (
                      <li key={idx} className={`flex items-start gap-2.5 text-sm ${textMuted}`}>
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${accentText}`} />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`pt-4 border-t flex items-center justify-between text-xs ${isNight ? 'border-white/10' : 'border-stone-200'}`}>
                  <span className={textMuted}>Focus: {team.keyFocus}</span>
                  <a
                    href={GOOGLE_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 font-semibold ${accentText} hover:underline`}
                  >
                    <span>Join Team</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className={`p-8 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-6 ${cardBg}`}>
          <div>
            <h2 className="font-serif font-semibold text-2xl mb-1">Looking for one-time event volunteering?</h2>
            <p className={`text-sm ${textMuted}`}>
              Register for upcoming clean-up drives, walks, or campus stalls as an event volunteer.
            </p>
          </div>
          <Link
            href="/volunteer"
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold shrink-0 transition-colors ${
              isNight
                ? 'bg-[#86B87A] text-[#0E1610] hover:bg-[#97C98B]'
                : 'bg-[#163515] text-white hover:bg-[#254d24]'
            }`}
          >
            <span>Volunteer at Events</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function MembersPage() {
  return (
    <AvaniThemeProvider>
      <MembersContent />
    </AvaniThemeProvider>
  );
}
