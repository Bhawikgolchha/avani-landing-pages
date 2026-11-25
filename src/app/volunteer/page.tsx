'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Calendar, Mail, Phone, User } from 'lucide-react';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { FirefliesBackground } from '@/components/common/FirefliesBackground';
import { AvaniThemeProvider, useAvaniTheme } from '@/components/bleibtgleich/ThemeTransitionOverlay';
import { AVANI_EVENTS, EXTERNAL_LINKS } from '@/lib/avaniContent';

const VOLUNTEER_EVENT_OPTIONS = [
  ...AVANI_EVENTS.map((ev) => `${ev.title} (${ev.location})`),
  'Upcoming Bangalore Lake & Cleanliness Drive',
  'General Event Volunteering (Any Upcoming Drive)',
];

function VolunteerContent() {
  const { isNight } = useAvaniTheme();

  const [fullName, setFullName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(VOLUNTEER_EVENT_OPTIONS[0]);
  const [submitted, setSubmitted] = useState(false);

  const pageBg = isNight ? 'bg-[#0E1610] text-[#ECEFE9]' : 'bg-[#F9FAF7] text-[#163515]';
  const cardBg = isNight ? 'bg-[#19261B] border-white/10' : 'bg-white border-stone-200/80';
  const inputBg = isNight
    ? 'bg-[#0E1610] border-white/15 text-[#ECEFE9] placeholder:text-stone-500 focus:border-[#86B87A]'
    : 'bg-[#F9FAF7] border-stone-300 text-[#163515] placeholder:text-stone-400 focus:border-[#364724]';
  const textMuted = isNight ? 'text-[#9CAEA0]' : 'text-stone-600';
  const accentText = isNight ? 'text-[#86B87A]' : 'text-[#54683C]';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !contactNumber.trim() || !email.trim()) return;
    setSubmitted(true);
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
            Register below to join as a volunteer whenever Avani conducts community clean-ups, campus stalls, or awareness drives in Bangalore.
          </p>
        </div>

        {submitted ? (
          <div className={`p-8 rounded-2xl border space-y-5 ${cardBg}`}>
            <div className="flex items-center gap-3">
              <CheckCircle2 className={`w-7 h-7 shrink-0 ${accentText}`} />
              <h2 className="font-serif font-semibold text-2xl">Registration Recorded</h2>
            </div>
            <p className={`text-sm leading-relaxed ${textMuted}`}>
              Thank you, <span className="font-semibold">{fullName}</span>! Your interest for{' '}
              <span className="font-semibold">{selectedEvent}</span> has been noted.
            </p>
            <div className={`p-4 rounded-xl text-xs space-y-1 border ${isNight ? 'bg-[#0E1610] border-white/10' : 'bg-[#F9FAF7] border-stone-200'}`}>
              <p><span className={textMuted}>Name:</span> {fullName}</p>
              <p><span className={textMuted}>Contact:</span> {contactNumber}</p>
              <p><span className={textMuted}>Email:</span> {email}</p>
              <p><span className={textMuted}>Event:</span> {selectedEvent}</p>
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
                setContactNumber('');
                setEmail('');
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-colors ${
                isNight ? 'bg-[#86B87A] text-[#0E1610]' : 'bg-[#163515] text-white'
              }`}
            >
              Submit Another Response
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={`p-6 sm:p-8 rounded-2xl border space-y-6 ${cardBg}`}>
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
                Which event would you like to volunteer for? <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${textMuted}`} />
                <select
                  id="volunteer-event"
                  value={selectedEvent}
                  onChange={(e) => setSelectedEvent(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm outline-none transition-colors ${inputBg}`}
                >
                  {VOLUNTEER_EVENT_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-3.5 rounded-full text-sm font-semibold transition-all shadow-sm hover:shadow-md ${
                isNight
                  ? 'bg-[#86B87A] text-[#0E1610] hover:bg-[#97C98B]'
                  : 'bg-[#163515] text-white hover:bg-[#254d24]'
              }`}
            >
              Register as Event Volunteer
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
