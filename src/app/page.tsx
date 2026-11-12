'use client';

import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { useLenis } from '@/hooks/useLenis';
import {
  AvaniThemeProvider,
  useAvaniTheme,
} from '@/components/bleibtgleich/ThemeTransitionOverlay';
import { EditorialHeroSpine } from '@/components/bleibtgleich/EditorialHeroSpine';
import { OrbitalWorkRing } from '@/components/bleibtgleich/OrbitalWorkRing';
import { SwissIndexTable } from '@/components/bleibtgleich/SwissIndexTable';
import { ManifestoFooter } from '@/components/bleibtgleich/ManifestoFooter';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

function AvaniEditorialShell() {
  useLenis();
  const { isNight } = useAvaniTheme();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
    });
    return () => {
      trigger.kill();
    };
  }, []);

  const surfaceClasses = isNight
    ? 'bg-[#08140B] text-[#DCE7D4] selection:bg-[#6EE7B7] selection:text-[#08140B]'
    : 'bg-[#F9FAF7] text-[#163515] selection:bg-[#DCE7D4] selection:text-[#163515]';

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${surfaceClasses}`}
    >
      <Navbar />
      <main className="flex-grow">
        <EditorialHeroSpine scrollProgress={scrollProgress} />
        <OrbitalWorkRing />
        <SwissIndexTable />
        <ManifestoFooter />
      </main>
      <Footer />
    </div>
  );
}

/**
 * Root Route (`/`): Avani Botanical Editorial Replica inspired by bleibtgleich.dev,
 * using Avani's Cream (#F9FAF7), Forest Green (#163515), Tea Green (#DCE7D4),
 * GlowGarden Night (#08140B / #6EE7B7), Playfair Display + Inter + JetBrains Mono,
 * and complete PDF organizational copy, links, and media.
 */
export default function AvaniEditorialHomePage() {
  return (
    <AvaniThemeProvider>
      <AvaniEditorialShell />
    </AvaniThemeProvider>
  );
}
