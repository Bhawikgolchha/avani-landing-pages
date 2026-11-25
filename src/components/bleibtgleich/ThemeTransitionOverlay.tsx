'use client';

import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export type AvaniThemeMode = 'daylight' | 'night';

interface AvaniThemeContextValue {
  theme: AvaniThemeMode;
  isNight: boolean;
  isTransitioning: boolean;
  toggleTheme: () => void;
  setTheme: (next: AvaniThemeMode) => void;
}

const AvaniThemeContext = createContext<AvaniThemeContextValue | null>(null);
const THEME_EVENT = 'avani:theme-change';

/**
 * Provides Daylight Botanical (#F9FAF7 / #163515) <-> GlowGarden Night (#08140B / #6EE7B7)
 * theme state synchronized with a GSAP `.theme-change-overlay` curtain transition.
 */
export function AvaniThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<AvaniThemeMode>('daylight');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const pendingTimeoutRef = useRef<number | null>(null);

  const commitTheme = useCallback((next: AvaniThemeMode) => {
    setThemeState(next);
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.avaniTheme = next;
      document.body.style.backgroundColor = next === 'night' ? '#0E1610' : '#F9FAF7';
      document.body.style.color = next === 'night' ? '#ECEFE9' : '#163515';
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent<AvaniThemeMode>(THEME_EVENT, { detail: next }));
    }
  }, []);

  const transitionTo = useCallback(
    (next: AvaniThemeMode) => {
      if (next === theme || isTransitioning) return;
      const overlay = overlayRef.current;

      if (!overlay || typeof window === 'undefined') {
        commitTheme(next);
        return;
      }

      const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        commitTheme(next);
        return;
      }

      setIsTransitioning(true);
      overlay.style.backgroundColor = next === 'night' ? '#0E1610' : '#F9FAF7';

      const tl = gsap.timeline({
        onComplete: () => {
          setIsTransitioning(false);
        },
      });

      tl.set(overlay, {
        autoAlpha: 1,
        scaleY: 0,
        transformOrigin: next === 'night' ? 'bottom center' : 'top center',
      })
        .to(overlay, {
          scaleY: 1,
          duration: 0.36,
          ease: 'power3.inOut',
        })
        .add(() => {
          commitTheme(next);
        })
        .set(overlay, {
          transformOrigin: next === 'night' ? 'top center' : 'bottom center',
        })
        .to(overlay, {
          scaleY: 0,
          duration: 0.42,
          delay: 0.04,
          ease: 'power3.out',
        })
        .set(overlay, { autoAlpha: 0 });
    },
    [commitTheme, isTransitioning, theme]
  );

  const toggleTheme = useCallback(() => {
    transitionTo(theme === 'daylight' ? 'night' : 'daylight');
  }, [theme, transitionTo]);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.avaniTheme = theme;
    }
    const handleToggleRequest = () => toggleTheme();
    const handleSetRequest = (e: Event) => {
      const custom = e as CustomEvent<AvaniThemeMode>;
      if (custom.detail === 'daylight' || custom.detail === 'night') {
        transitionTo(custom.detail);
      }
    };
    window.addEventListener('avani:request-theme-toggle', handleToggleRequest);
    window.addEventListener('avani:request-theme-set', handleSetRequest);
    const timeoutId = pendingTimeoutRef.current;
    return () => {
      window.removeEventListener('avani:request-theme-toggle', handleToggleRequest);
      window.removeEventListener('avani:request-theme-set', handleSetRequest);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [theme, toggleTheme, transitionTo]);

  return (
    <AvaniThemeContext.Provider
      value={{
        theme,
        isNight: theme === 'night',
        isTransitioning,
        toggleTheme,
        setTheme: transitionTo,
      }}
    >
      {children}
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="theme-change-overlay pointer-events-none fixed inset-0 z-[90] opacity-0 invisible"
      />
    </AvaniThemeContext.Provider>
  );
}

/**
 * Hook that works both inside `<AvaniThemeProvider>` and from global components like `Navbar`.
 */
export function useAvaniTheme(): AvaniThemeContextValue {
  const ctx = useContext(AvaniThemeContext);
  const [fallbackTheme, setFallbackTheme] = useState<AvaniThemeMode>('daylight');

  useEffect(() => {
    if (ctx || typeof window === 'undefined') return;
    const sync = () => {
      const current = document.documentElement.dataset.avaniTheme as AvaniThemeMode | undefined;
      if (current === 'night' || current === 'daylight') {
        setFallbackTheme(current);
      }
    };
    sync();
    window.addEventListener(THEME_EVENT, sync);
    return () => window.removeEventListener(THEME_EVENT, sync);
  }, [ctx]);

  if (ctx) return ctx;

  return {
    theme: fallbackTheme,
    isNight: fallbackTheme === 'night',
    isTransitioning: false,
    toggleTheme: () => {
      if (typeof window === 'undefined') return;
      window.dispatchEvent(new CustomEvent('avani:request-theme-toggle'));
    },
    setTheme: (next) => {
      if (typeof window === 'undefined') return;
      window.dispatchEvent(new CustomEvent('avani:request-theme-set', { detail: next }));
    },
  };
}
