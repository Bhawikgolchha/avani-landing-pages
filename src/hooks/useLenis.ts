'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface UseLenisOptions {
  duration?: number;
  easing?: (t: number) => number;
  smoothWheel?: boolean;
  touchMultiplier?: number;
}

export function useLenis(options?: UseLenisOptions) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const lenis = new Lenis({
      duration: options?.duration ?? 1.2,
      easing:
        options?.easing ?? ((t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: options?.smoothWheel ?? true,
      touchMultiplier: options?.touchMultiplier ?? 1.6,
    });

    lenisRef.current = lenis;

    // Connect Lenis scroll events to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Bind Lenis animation frame step to GSAP's high-precision ticker
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [options]);

  const scrollTo = (
    target: string | number | HTMLElement,
    scrollOptions?: { offset?: number; immediate?: boolean; duration?: number }
  ) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, scrollOptions);
    } else if (typeof window !== 'undefined') {
      if (typeof target === 'number') {
        window.scrollTo({ top: target, behavior: 'smooth' });
      } else if (typeof target === 'string') {
        const el = document.querySelector(target);
        el?.scrollIntoView({ behavior: 'smooth' });
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return { lenis: lenisRef.current, scrollTo };
}

export default useLenis;
