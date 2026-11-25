import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { EXTERNAL_LINKS } from '@/lib/avaniContent';

export default function TermsOfUsePage() {
  return (
    <main className="min-h-screen bg-[#F9FAF7] text-[#163515] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#54683C] hover:text-[#163515] mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Avani</span>
        </Link>

        <h1 className="font-serif font-semibold text-4xl sm:text-5xl tracking-tight mb-4">
          Terms of Use
        </h1>
        <p className="text-sm text-stone-500 mb-10">
          Last updated: 2026 &middot; Avani Youth Organization for Climate Care (Bangalore, India)
        </p>

        <div className="space-y-8 text-base leading-relaxed text-stone-700 font-sans">
          <section>
            <h2 className="font-serif font-semibold text-xl text-[#163515] mb-2">
              1. Community Purpose
            </h2>
            <p>
              This website provides information about Avani&apos;s student-led environmental initiatives, publications, and volunteer opportunities in Bangalore.
            </p>
          </section>

          <section>
            <h2 className="font-serif font-semibold text-xl text-[#163515] mb-2">
              2. Volunteer Conduct
            </h2>
            <p>
              Participants joining Avani clean-up drives, awareness walks, or student teams agree to uphold respectful, inclusive, and safe conduct at all in-person and online activities.
            </p>
          </section>

          <section>
            <h2 className="font-serif font-semibold text-xl text-[#163515] mb-2">
              3. Content &amp; Attribution
            </h2>
            <p>
              Original essays, event photographs, and educational materials published by Avani&apos;s teams may be shared for non-commercial climate education with clear attribution to Avani Youth Organization for Climate Care.
            </p>
          </section>

          <section>
            <h2 className="font-serif font-semibold text-xl text-[#163515] mb-2">
              4. Questions
            </h2>
            <p>
              For any questions regarding these terms, reach out to{' '}
              <a href={EXTERNAL_LINKS.emailMailto} className="text-[#54683C] underline underline-offset-4">
                {EXTERNAL_LINKS.email}
              </a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
