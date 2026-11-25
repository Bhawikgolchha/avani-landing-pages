'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle2,
  Calendar,
  Mail,
  Phone,
  User,
  GraduationCap,
  Hash,
  Info,
  AlertCircle,
} from 'lucide-react';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { FirefliesBackground } from '@/components/common/FirefliesBackground';
import { AvaniThemeProvider, useAvaniTheme } from '@/components/bleibtgleich/ThemeTransitionOverlay';
import { EXTERNAL_LINKS } from '@/lib/avaniContent';

const UPCOMING_EVENT_OPTIONS = [
  'No upcoming events available at the moment',
  'Notify me for the next Bangalore volunteer drive',
];

function VolunteerContent() {
  const { isNight } = useAvaniTheme();

  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(UPCOMING_EVENT_OPTIONS[0]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const pageBg = isNight ? 'bg-[#0E1610] text-[#ECEFE9]' : 'bg-[#F9FAF7] text-[#163515]';
  const cardBg = isNight ? 'bg-[#19261B] border-white/10' : 'bg-white border-stone-200/80';
  const inputBg = isNight
    ? 'bg-[#0E1610] border-white/15 text-[#ECEFE9] placeholder:text-stone-500 focus:border-[#86B87A]'
    : 'bg-[#F9FAF7] border-stone-300 text-[#163515] placeholder:text-stone-400 focus:border-[#364724]';
  const textMuted = isNight ? 'text-[#9CAEA0]' : 'text-stone-600';
  const accentText = isNight ? 'text-[#86B87A]' : 'text-[#54683C]';

  const buildMailtoFallback = () => {
    const subject = encodeURIComponent(`Event Volunteer Registration — ${fullName}`);
    const body = encodeURIComponent(
      `Name: ${fullName}\nAge: ${age}\nCollege / School: ${collegeName}\nContact: ${contactNumber}\nEmail: ${email}\nEvent: ${selectedEvent}`
    );
    return `mailto:${EXTERNAL_LINKS.email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !fullName.trim() ||
      !age.trim() ||
      !collegeName.trim() ||
      !contactNumber.trim() ||
      !email.trim()
    ) {
      return;
    }

    setSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch(`https://formsubmit.co/ajax/${EXTERNAL_LINKS.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `New Event Volunteer Registration — ${fullName}`,
          _template: 'table',
          _replyto: email,
          Name: fullName,
          Age: age,
          'College / School': collegeName,
          'Contact Information': contactNumber,
          'Email ID': email,
          Event: selectedEvent,
        }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok || data?.success === 'false') {
        throw new Error(data?.message || 'Unable to send notification right now.');
      }

      setSubmitted(true);
    } catch {
      setErrorMsg(
        `Could not send automatically right now. Please use the email button below to send directly to ${EXTERNAL_LINKS.email}.`
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-500 relative ${pageBg}`}>
      <FirefliesBackground />
      <Navbar />

      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto w-full relative z-10">
        <Link
          href="/#events"
          className={`inline-flex items-center gap-2 text-sm font-medium mb-8 transition-colors ${accentText} hover:opacity-80`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Events</span>
        </Link>

        <div className="mb-8">
          <p className={`text-sm font-medium mb-2 ${accentText}`}>Events · Volunteer Registration</p>
          <h1 className="font-serif font-semibold text-3xl sm:text-4xl tracking-tight mb-3">
            Volunteer at Avani Events
          </h1>
          <p className={`text-base leading-relaxed ${textMuted}`}>
            Register below to join as a volunteer when Avani organises upcoming community clean-ups, campus stalls, or awareness drives in Bangalore. Avani&apos;s team at{' '}
            <span className="font-medium">{EXTERNAL_LINKS.email}</span> is notified on submission.
          </p>
        </div>

        {/* Notice banner for upcoming events */}
        <div
          className={`mb-6 p-4 rounded-xl border flex items-start gap-3 text-sm ${
            isNight
              ? 'bg-[#141F16] border-[#86B87A]/25 text-[#ECEFE9]'
              : 'bg-[#DCE7D4]/50 border-[#54683C]/25 text-[#163515]'
          }`}
        >
          <Info className={`w-4 h-4 shrink-0 mt-0.5 ${accentText}`} />
          <p className={textMuted}>
            All listed past events have been completed. <strong className={isNight ? 'text-[#ECEFE9]' : 'text-[#163515]'}>No upcoming events are available at the moment</strong> — you can still submit your details below so Avani&apos;s coordinators get notified and can reach out for the next drive.
          </p>
        </div>

        {submitted ? (
          <div className={`p-8 rounded-2xl border space-y-5 ${cardBg}`}>
            <div className="flex items-center gap-3">
              <CheckCircle2 className={`w-7 h-7 shrink-0 ${accentText}`} />
              <h2 className="font-serif font-semibold text-2xl">Registration Sent to Avani</h2>
            </div>
            <p className={`text-sm leading-relaxed ${textMuted}`}>
              Thank you, <span className="font-semibold">{fullName}</span>! Your volunteer registration has been sent to{' '}
              <span className="font-medium">{EXTERNAL_LINKS.email}</span>.
            </p>
            <div className={`p-4 rounded-xl text-xs space-y-1.5 border ${isNight ? 'bg-[#0E1610] border-white/10' : 'bg-[#F9FAF7] border-stone-200'}`}>
              <p><span className={textMuted}>Name:</span> {fullName}</p>
              <p><span className={textMuted}>Age:</span> {age}</p>
              <p><span className={textMuted}>College / School:</span> {collegeName}</p>
              <p><span className={textMuted}>Contact:</span> {contactNumber}</p>
              <p><span className={textMuted}>Email:</span> {email}</p>
              <p><span className={textMuted}>Event Status:</span> {selectedEvent}</p>
            </div>
            <p className={`text-xs ${textMuted}`}>
              Need to reach our coordinators directly? Write to{' '}
              <a href={EXTERNAL_LINKS.emailMailto} className={`underline ${accentText}`}>
                {EXTERNAL_LINKS.email}
              </a>.
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setFullName('');
                setAge('');
                setCollegeName('');
                setContactNumber('');
                setEmail('');
                setErrorMsg(null);
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-colors ${
                isNight ? 'bg-[#86B87A] text-[#0E1610]' : 'bg-[#163515] text-white'
              }`}
            >
              Submit Another Response
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={`p-6 sm:p-8 rounded-2xl border space-y-5 ${cardBg}`}>
            {errorMsg && (
              <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-sm space-y-2">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <p>{errorMsg}</p>
                </div>
                <a
                  href={buildMailtoFallback()}
                  className={`inline-block text-xs font-semibold underline ${accentText}`}
                >
                  Open in Email App to Notify {EXTERNAL_LINKS.email}
                </a>
              </div>
            )}

            <div>
              <label htmlFor="volunteer-name" className="block text-sm font-medium mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${textMuted}`} />
                <input
                  id="volunteer-name"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your full name"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-colors ${inputBg}`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="volunteer-age" className="block text-sm font-medium mb-2">
                  Age <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Hash className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${textMuted}`} />
                  <input
                    id="volunteer-age"
                    type="number"
                    min={12}
                    max={99}
                    required
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="e.g. 19"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-colors ${inputBg}`}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="volunteer-college" className="block text-sm font-medium mb-2">
                  College / School Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <GraduationCap className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${textMuted}`} />
                  <input
                    id="volunteer-college"
                    type="text"
                    required
                    value={collegeName}
                    onChange={(e) => setCollegeName(e.target.value)}
                    placeholder="e.g. Christ University, DPS Bangalore"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-colors ${inputBg}`}
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="volunteer-phone" className="block text-sm font-medium mb-2">
                Contact Information (Phone / WhatsApp) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${textMuted}`} />
                <input
                  id="volunteer-phone"
                  type="tel"
                  required
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  placeholder="+91 98765 43210"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-colors ${inputBg}`}
                />
              </div>
            </div>

            <div>
              <label htmlFor="volunteer-email" className="block text-sm font-medium mb-2">
                Email ID <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${textMuted}`} />
                <input
                  id="volunteer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-colors ${inputBg}`}
                />
              </div>
            </div>

            <div>
              <label htmlFor="volunteer-event" className="block text-sm font-medium mb-2">
                Upcoming Events <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${textMuted}`} />
                <select
                  id="volunteer-event"
                  value={selectedEvent}
                  onChange={(e) => setSelectedEvent(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-colors ${inputBg}`}
                >
                  {UPCOMING_EVENT_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={`w-full py-3.5 rounded-full text-sm font-semibold transition-all shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed ${
                isNight
                  ? 'bg-[#86B87A] text-[#0E1610] hover:bg-[#97C98B]'
                  : 'bg-[#163515] text-white hover:bg-[#254d24]'
              }`}
            >
              {submitting ? 'Sending Registration...' : 'Register as Event Volunteer'}
            </button>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function VolunteerPage() {
  return (
    <AvaniThemeProvider>
      <VolunteerContent />
    </AvaniThemeProvider>
  );
}
