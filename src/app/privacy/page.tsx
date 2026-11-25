import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { EXTERNAL_LINKS } from '@/lib/avaniContent';

export default function PrivacyPolicyPage() {
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
          Privacy Policy
        </h1>
        <p className="text-sm text-stone-500 mb-10">
          Last updated: 2026 &middot; Avani Youth Organization for Climate Care (Bangalore, India)
        </p>

        <div className="space-y-8 text-base leading-relaxed text-stone-700 font-sans">
          <section>
            <h2 className="font-serif font-semibold text-xl text-[#163515] mb-2">
              1. Information We Collect
            </h2>
            <p>
              Avani is a 100% student-led youth environmental organization in Bangalore. This website does not run invasive advertising trackers or sell personal data. When you choose to apply as a team member or event volunteer via our Google Application Form, we collect only the details you voluntarily submit (such as your name, email address, school or university, and preferred team).
            </p>
          </section>

          <section>
            <h2 className="font-serif font-semibold text-xl text-[#163515] mb-2">
              2. How We Use Information
            </h2>
            <p>
              Submitted application and volunteer details are used solely to coordinate cohort onboarding, event volunteering logistics, and community environmental drives across Bangalore.
            </p>
          </section>

          <section>
            <h2 className="font-serif font-semibold text-xl text-[#163515] mb-2">
              3. Third-Party Services
            </h2>
            <p>
              External links on this site—such as Google Forms, Substack, Instagram, and LinkedIn—are governed by their respective platforms&apos; privacy policies.
            </p>
          </section>

          <section>
            <h2 className="font-serif font-semibold text-xl text-[#163515] mb-2">
              4. Contact &amp; Data Removal
            </h2>
            <p>
              You may request updates to or deletion of your volunteer records at any time by writing to{' '}
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
