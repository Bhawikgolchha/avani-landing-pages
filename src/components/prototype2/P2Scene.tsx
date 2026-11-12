'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Canvas } from '@react-three/fiber';
import BiosphereParticles from './BiosphereParticles';

interface P2SceneProps {
  className?: string;
}

export function P2FallbackPoster() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#080C0E]">
      <video
        autoPlay
        loop
        muted
        playsInline
        poster="/assets/images/hero_ecotech_globe.webp"
        className="w-full h-full object-cover opacity-60 filter saturate-150 contrast-125"
      >
        <source src="/assets/videos/biosphere_telemetry_loop.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/assets/images/hero_ecotech_globe.webp"
          alt="Holographic Earth Biosphere Telemetry"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30 mix-blend-screen"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#080C0E] via-[#080C0E]/50 to-[#080C0E]" />
    </div>
  );
}

export default function P2Scene({ className = '' }: P2SceneProps) {
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastTimestamp = useRef(Date.now());

  useEffect(() => {
    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setHasWebGL(Boolean(gl));
    } catch {
      setHasWebGL(false);
    }

    // Scroll progress & velocity tracking
    const handleScroll = () => {
      const currentY = window.scrollY;
      const now = Date.now();
      const dt = Math.max(1, now - lastTimestamp.current);
      const dy = currentY - lastScrollY.current;

      const velocity = dy / dt; // pixels per millisecond
      setScrollVelocity(velocity);

      const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, currentY / maxScroll));
      setScrollProgress(progress);

      lastScrollY.current = currentY;
      lastTimestamp.current = now;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Friction decay for velocity when scroll stops
    const interval = setInterval(() => {
      setScrollVelocity((prev) => (Math.abs(prev) > 0.01 ? prev * 0.9 : 0));
    }, 50);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  // WebGL not supported: return video/poster fallback
  if (hasWebGL === false) {
    return <P2FallbackPoster />;
  }

  return (
    <div className={`fixed inset-0 z-0 pointer-events-none overflow-hidden ${className}`}>
      {/* Ambient background video layer at subtle opacity for layered depth */}
      <div className="absolute inset-0 z-0 opacity-25 mix-blend-screen pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/assets/images/hero_ecotech_globe.webp"
          className="w-full h-full object-cover"
        >
          <source src="/assets/videos/biosphere_telemetry_loop.mp4" type="video/mp4" />
        </video>
      </div>

      {/* R3F 3D Canvas */}
      <div className="absolute inset-0 z-10 w-full h-full">
        <Canvas
          camera={{ position: [0, 0, 6.8], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          className="w-full h-full pointer-events-none"
        >
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#06b6d4" />
          <pointLight position={[-10, -10, -10]} intensity={1.2} color="#10b981" />
          <BiosphereParticles
            scrollProgress={scrollProgress}
            scrollVelocity={scrollVelocity}
          />
        </Canvas>
      </div>

      {/* Cybernetic vignette overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(8,12,14,0.1)_0%,rgba(8,12,14,0.8)_80%,rgba(8,12,14,0.98)_100%)]" />

      {/* Subtle telemetry grid texture */}
      <div
        className="absolute inset-0 z-20 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #06b6d4 1px, transparent 1px), linear-gradient(to bottom, #06b6d4 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
    </div>
  );
}
