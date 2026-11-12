# Scope: Milestone M4 — Prototype 1: The Bioluminescent Living Canopy & GlowGarden

## Approved Synthesis Foundation
Tri-Partite Synthesis combining:
1. **Canva Idea 5**: Tactile botanical Living Canopy, deep forest greens (`#163515`, `#568203`, `#D0F0C0`), organic nature journal storytelling.
2. **Canva Pages 12-13 ("GlowGarden")**: Bioluminescent nocturnal ecosystem, glowing spores, iridescent veins, glowing floral nodes, and dusk-to-night lighting transitions.
3. **Prototype 2 HUD Elements**: Sleek glassmorphic telemetry cards (`backdrop-blur-md bg-stone-950/70 border border-emerald-500/20`), high-precision metric badges.

## Mandatory Specifications
1. **Interactive 3D R3F Scene (`src/components/prototype1/P1Scene.tsx` & `LivingCanopyTree.tsx`)**:
   - Pinned background canvas (`fixed inset-0 z-0 pointer-events-none`) with `{ ssr: false }`.
   - Procedural 3D Tree of Life with organic branching and translucent foliage reacting to wind physics.
   - Bioluminescent glowing spore particle system drifting through 3D space with subtle organic turbulence.
   - Dynamic volumetric lighting shifting from canopy sunbeams down into a nocturnal reflecting forest pool.
   - Camera scroll choreography: Hero Canopy -> 5 Core Objectives -> 5 Operational Teams -> 4 Field Events -> Nocturnal Pool with 11 Climate Tips & Join Avani Application Form.
2. **Mobile-First Responsive Layout & Touch UX**:
   - Tested and fluid across 375px-430px mobile viewports through 1440px desktop.
   - Snap carousels or swipeable cards on mobile for the 4 Field Events and 11 Climate Tips (`overflow-x-auto snap-x scrollbar-none`).
   - Sticky floating "Apply" CTA button for mobile thumb accessibility.
   - Fluid typography with CSS `clamp()`. Zero horizontal overflow.
3. **Content Integrity (Zero Omission, Verbatim Copy)**:
   - Official circular Avani logo (`/assets/branding/logo.jpg`).
   - PDF-verified facts: 4 Community Drives, 5 Specialized Teams, 11 Climate Actions, 100% Student-Led.
   - Verbatim rendering of all 5 objectives, 5 teams, 4 events, 11 tips, and 7 external links from `src/lib/avaniContent.ts`.
4. **Media & Fallbacks**:
   - Background video loop: `public/assets/videos/canopy_bioluminescent_loop.mp4` with `autoPlay loop muted playsInline` and WebP poster fallback (`/assets/images/hero_nature_canopy.webp`).

## Verification Gate
- `npm run build` passes with exit code 0.
- Unit and integration tests pass.
- 2 Reviewers, 2 Challengers, 1 Forensic Auditor.
- Record `GATE_STATUS.md` and report completion to parent.
