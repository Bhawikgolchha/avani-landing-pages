## 2026-11-12T11:39:19Z
You are the teamwork_worker for Milestone M5: Prototype 2 (The Modern Eco-Tech Biosphere).
Your state folder: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/worker_m5_1/
Your working directory: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

MANDATORY REFERENCE FILES (read these FIRST before writing code):
- /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/ORIGINAL_REQUEST.md
- /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/SYNTHESIS_PLAN.md
- /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/PROJECT.md
- /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/sub_orch_m5_gen3/SCOPE.md
- /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/src/lib/avaniContent.ts

Your Objective:
Implement Prototype 2 (/prototype-2) following the Modern Eco-Tech Biosphere creative direction:
1. Interactive 3D R3F Scene:
   - File: src/components/prototype2/BiosphereParticles.tsx & src/components/prototype2/P2Scene.tsx
   - Pinned background canvas (fixed inset-0 z-0 pointer-events-none) loaded with { ssr: false } via next/dynamic.
   - 10,000-particle holographic Earth globe using Three.js Points and procedural Fibonacci sphere distribution.
   - Dual concentric orbital telemetry rings rotating at differential speeds with Bangalore beacon coordinates (12.9716° N, 77.5946° E).
   - Scroll velocity-driven particle wave pulsation and cursor/scroll-reactive camera orbits tied to GSAP ScrollTrigger and Lenis smooth scrolling.
   - Graceful fallback: Video loop public/assets/videos/biosphere_telemetry_loop.mp4 (autoPlay loop muted playsInline) and WebP poster /assets/images/hero_ecotech_globe.webp when WebGL is unavailable or during loading.
2. Interactive Dark Glassmorphic HUD Overlay:
   - File: src/components/prototype2/P2Overlay.tsx
   - Dark glassmorphic styling: backdrop-blur-md bg-stone-950/85 border border-emerald-500/20 with neon green (#10b981) and cyan (#06b6d4) telemetry accents.
   - Monospace telemetry headers, coordinates readout, mission status tickers.
   - Tabbed telemetry modules for switching between:
     a) Core Objectives (all 5 objectives rendered verbatim from avaniContent.ts)
     b) Specialized Teams (all 5 teams rendered verbatim from avaniContent.ts)
     c) Field Operations / Mission Debrief (all 4 community drives with impact metrics and generated WebP imagery from public/assets/images/)
     d) Biosphere Protocol: Climate Action Tips (all 11 tips categorized by sector: Energy, Water, Waste, Consumption)
   - High-tech terminal CTA for Join Avani Google Form application (with link from avaniContent.ts).
   - All 7 external links from avaniContent.ts rendered in footer/nav.
   - Official Avani circular logo at /assets/branding/logo.jpg.
   - PDF-verified facts banner: 4 Community Drives, 5 Specialized Teams, 11 Climate Actions, 100% Student-Led.
3. Mobile-First Responsive Layout & Touch UX:
   - Fluid across 375px-430px mobile viewports up to 1440px desktop.
   - Touch snap carousels or swipeable cards on mobile for the 4 events and 11 tips.
   - Zero horizontal overflow (overflow-x-hidden on container).
   - Thumb-zone navigation and floating CTA on mobile.
4. Assembly:
   - File: src/app/prototype-2/page.tsx
   - Full integration with Lenis smooth scrolling, metadata, dynamic import of P2Scene with ssr: false.
5. Verification:
   - Run `npm run build` and ensure exit code 0.
   - Verify all links, images, and components.
   - Document changes and verification in handoff.md in your state folder (/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/worker_m5_1/handoff.md).
   - Send completion message to parent when done.
