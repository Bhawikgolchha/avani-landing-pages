'use client';

import React, { useEffect, useRef } from 'react';
import { useAvaniTheme } from '@/components/bleibtgleich/ThemeTransitionOverlay';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  pulseSpeed: number;
  pulsePhase: number;
  hue: number; // 60 for gold, 140 for emerald/mint
  flashCooldown: number;
}

export function FirefliesBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { isNight } = useAvaniTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === 'undefined') return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates
    let mouseX = -1000;
    let mouseY = -1000;
    let mouseActive = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      mouseActive = true;
    };

    const handleMouseLeave = () => {
      mouseActive = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
        mouseActive = true;
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('resize', handleResize);

    // Number of fireflies
    const particleCount = width < 768 ? 32 : 60;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.6 - 0.2, // gentle natural upward drift
        radius: isNight ? Math.random() * 2.5 + 1.5 : Math.random() * 2 + 1,
        baseAlpha: Math.random() * 0.5 + 0.3,
        pulseSpeed: Math.random() * 0.03 + 0.015,
        pulsePhase: Math.random() * Math.PI * 2,
        hue: Math.random() > 0.45 ? 145 : 52, // 145 = bioluminescent mint-emerald, 52 = warm golden amber
        flashCooldown: Math.random() * 200,
      });
    }

    let time = 0;

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Organic trigonometric drift (natural firefly flight)
        p.pulsePhase += p.pulseSpeed;
        p.x += p.vx + Math.sin(time * 0.02 + i) * 0.35;
        p.y += p.vy + Math.cos(time * 0.015 + i) * 0.3;

        // Interactive mouse reaction: gentle attraction & illumination
        if (mouseActive) {
          const dx = mouseX - p.x;
          const dy = mouseY - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180 && dist > 10) {
            // Soft steering towards cursor
            p.vx += (dx / dist) * 0.04;
            p.vy += (dy / dist) * 0.04;
          }
        }

        // Speed dampening
        p.vx *= 0.985;
        p.vy *= 0.985;

        // Wrap around viewport edges
        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;
        if (p.y < -30) p.y = height + 30;
        if (p.y > height + 30) p.y = -30;

        // Pulsing luminosity calculation
        let alpha = p.baseAlpha + Math.sin(p.pulsePhase) * 0.35;
        alpha = Math.max(0.05, Math.min(1.0, alpha));

        // Spontaneous flash trigger
        p.flashCooldown -= 1;
        if (p.flashCooldown <= 0) {
          alpha = Math.min(1.0, alpha + 0.5);
          if (p.flashCooldown < -20) {
            p.flashCooldown = Math.random() * 250 + 100;
          }
        }

        if (isNight) {
          // ================= NIGHT MODE: Glowing Bioluminescent Fireflies =================
          const colorCore = p.hue === 145 ? '110, 231, 183' : '253, 224, 71';
          const colorHalo = p.hue === 145 ? '16, 185, 129' : '234, 179, 8';

          // Outer atmospheric glow
          const glowRadius = p.radius * 7;
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);
          gradient.addColorStop(0, `rgba(${colorCore}, ${alpha * 0.9})`);
          gradient.addColorStop(0.35, `rgba(${colorHalo}, ${alpha * 0.35})`);
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
          ctx.fill();

          // Intense core particle
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1.0, alpha * 1.2)})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 0.6, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // ================= DAYLIGHT MODE: Subtle Botanical Golden Spores =================
          const dayAlpha = alpha * 0.35;
          ctx.fillStyle = `rgba(84, 104, 60, ${dayAlpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [isNight]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[1] transition-opacity duration-700"
    />
  );
}
