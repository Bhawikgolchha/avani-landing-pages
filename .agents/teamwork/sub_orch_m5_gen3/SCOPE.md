# Scope: Milestone M5 — Prototype 2: The Modern Eco-Tech Biosphere

## Approved Creative Direction
The Cyber-Environmental Data Journal:
- Dark glassmorphic HUD (`backdrop-blur-md bg-stone-950/85 border border-emerald-500/20`).
- Neon green (`#10b981`) and cyan (`#06b6d4`) telemetry accents, monospace data readouts, real-time telemetry panels.

## Mandatory Specifications
1. **Interactive 3D R3F Scene (`src/components/prototype2/P2Scene.tsx` & `BiosphereParticles.tsx`)**:
   - Pinned background canvas (`fixed inset-0 z-0 pointer-events-none`) with `{ ssr: false }`.
   - 10,000-particle holographic Earth globe using Three.js `Points` and procedural Fibonacci sphere distribution.
   - Dual concentric orbital telemetry rings rotating at differential speeds.
   - Bangalore geographic beacon coordinates (`12.9716° N, 77.5946° E`).
   - Scroll velocity-driven particle wave pulsation and cursor/scroll-reactive camera orbits.
2. **Interactive Overlay (`src/components/prototype2/P2Overlay.tsx`)**:
   - Tabbed telemetry modules for rapid switching between Objectives, Teams, Field Operations, and Climate Protocols.
   - High-tech mission debrief layouts for the 4 events with impact statistics and generated WebP imagery.
   - Biosphere Protocol: 11 climate action tips categorized by sector (Energy, Water, Waste, Consumption).
   - High-tech terminal CTA for Join Avani Google Form application.
3. **Mobile-First Responsive Layout & Touch UX**:
   - Single-column card stacking on mobile (375px-430px), fluid typography via CSS `clamp()`, zero horizontal overflow, thumb-zone optimized navigation with mobile drawer and floating "Apply" CTA.
   - Snap carousels or swipeable cards on mobile for the 4 Field Events and 11 Climate Tips.
4. **Content Integrity (Zero Omission, Verbatim Copy)**:
   - Official circular Avani logo (`/assets/branding/logo.jpg`).
   - PDF-verified facts: 4 Community Drives, 5 Specialized Teams, 11 Climate Actions, 100% Student-Led.
   - Verbatim rendering of all 5 objectives, 5 teams, 4 events, 11 tips, and 7 external links from `src/lib/avaniContent.ts`.
5. **Media & Fallbacks**:
   - Background video loop: `public/assets/videos/biosphere_telemetry_loop.mp4` with `autoPlay loop muted playsInline` and WebP poster fallback (`/assets/images/hero_ecotech_globe.webp`).

## Verification Gate
- `npm run build` passes with exit code 0.
- Unit and integration tests pass.
- 2 Reviewers, 2 Challengers, 1 Forensic Auditor.
- Record `GATE_STATUS.md` and report completion to parent.
