'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Canvas } from '@react-three/fiber';
import LivingCanopyTree from './LivingCanopyTree';

interface P1SceneProps {
  className?: string;
}

export function P1FallbackPoster() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#0a180b]">
      {/* Background ambient video loop with poster fallback */}
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/assets/images/hero_nature_canopy.webp"
        className="w-full h-full object-cover opacity-50 filter saturate-125"
      >
        <source src="/assets/videos/canopy_bioluminescent_loop.mp4" type="video/mp4" />
      </video>

      {/* High-res Nature Canopy WebP Image Fallback */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/assets/images/hero_nature_canopy.webp"
          alt="Bioluminescent Living Canopy"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-40 mix-blend-screen"
        />
      </div>

      {/* Organic Dusk-to-Night Gradient Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a180b]/70 via-[#102b13]/40 to-[#041517]/90 pointer-events-none" />
    </div>
  );
}

export default function P1Scene({ className = '' }: P1SceneProps) {
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastTimestamp = useRef(Date.now());

  useEffect(() => {
    // 1. Verify WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setHasWebGL(Boolean(gl));
    } catch {
      setHasWebGL(false);
    }

    // 2. High-precision Scroll & Velocity Tracking
    const handleScroll = () => {
      const currentY = window.scrollY;
      const now = Date.now();
      const dt = Math.max(1, now - lastTimestamp.current);
      const dy = currentY - lastScrollY.current;

      const velocity = dy / dt; // px/ms
      setScrollVelocity(velocity);

      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const progress = Math.min(1, Math.max(0, currentY / maxScroll));
      setScrollProgress(progress);

      lastScrollY.current = currentY;
      lastTimestamp.current = now;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Inertial velocity decay
    const interval = setInterval(() => {
      setScrollVelocity((prev) => (Math.abs(prev) > 0.01 ? prev * 0.88 : 0));
    }, 40);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  // Gracefully fallback if WebGL is unavailable or SSR
  if (hasWebGL === false) {
    return <P1FallbackPoster />;
  }

  return (
    <div
      className={`fixed inset-0 z-0 pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Layer 1: Ambient Video Loop at subtle opacity */}
      <div className="absolute inset-0 z-0 opacity-20 mix-blend-screen pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/assets/images/hero_nature_canopy.webp"
          className="w-full h-full object-cover"
        >
          <source src="/assets/videos/canopy_bioluminescent_loop.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Layer 2: Interactive 3D WebGL Canvas */}
      <div className="absolute inset-0 z-10 w-full h-full pointer-events-none">
        <Canvas
          camera={{ position: [0, 3.2, 5.0], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          className="w-full h-full"
        >
          <ambientLight intensity={0.45} color="#e6f4ea" />
          <LivingCanopyTree
            scrollProgress={scrollProgress}
            scrollVelocity={scrollVelocity}
          />
        </Canvas>
      </div>

      {/* Layer 3: Organic Botanical Vignette & GlowGarden Atmosphere */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(10,24,11,0.08)_0%,rgba(6,18,8,0.55)_70%,rgba(4,14,7,0.92)_100%)]" />

      {/* Layer 4: Subtle Organic Sunbeam/Bioluminescent Shimmer */}
      <div
        className="absolute inset-0 z-20 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 15%, #4ade80 0%, transparent 60%), radial-gradient(circle at 80% 85%, #2dd4bf 0%, transparent 50%)',
        }}
      />
    </div>
  );
}
