# Avani Landing Pages: Synthesized Architecture & Creative Direction Plan

## 1. Executive Summary & Design Synthesis

In response to user direction following the Stitch MCP mockup review:
- **Primary Design Anchor**: Prototype 1 ("The Living Canopy") is selected as the primary foundation.
- **Tri-Partite Synthesis**:
  1. **Living Canopy Foundation**: Tactile botanical aesthetic, organic textures, avocado/tea green palette (`#568203`, `#D0F0C0`, `#163515`), Bangalore student environmental roots.
  2. **Canva Pages 12-13 ("GlowGarden")**: Bioluminescent nocturnal ecosystem, glowing fungal spores, iridescent leaf veins, ethereal dusk-to-night lighting transitions.
  3. **Prototype 2 Editorial HUD & Particle Biosphere**: High-precision telemetry badges, interactive tabbed telemetry modules, and embedded 3D particle dynamics.

---

## 2. Updated Prototype Blueprints

### Prototype 1: "The Bioluminescent Living Canopy & GlowGarden" (`/prototype-1`)
- **Visual Aesthetic**: Organic botanical warmth transitioning into magical nocturnal bioluminescence. Soft tea-green cards, iridescent glowing accents (`#4ade80`, `#a7f3d0`), nature journal typography.
- **Interactive 3D Scene (`P1Scene.tsx` & `LivingCanopyTree.tsx`)**:
  - React Three Fiber Canvas with SSR isolation (`{ ssr: false }`).
  - Procedural Tree of Life with wind-swayed translucent foliage.
  - Glowing bioluminescent spore particles drifting in 3D depth.
  - Dynamic sunbeam/moonbeam volumetric lighting.
  - GSAP ScrollTrigger camera descent: Treetop canopy (Hero) -> Mid-level foliage (Objectives) -> Trunk & Branches (Teams) -> Undergrowth (Events) -> Deep tranquil forest pool (Action & Apply).
- **Custom Media Integration**:
  - `public/assets/videos/canopy_bioluminescent_loop.mp4`: Ambient background loop generated via Google Flow.
  - High-res generated event banners and official Avani logo.

### Prototype 2: "The Modern Eco-Tech Biosphere" (`/prototype-2`)
- **Visual Aesthetic**: Cyber-environmental data journal. Dark glassmorphism (`backdrop-blur-md bg-stone-950/85 border border-emerald-500/20`), neon green and cyan telemetry accents (`#10b981`, `#06b6d4`), monospace readouts.
- **Interactive 3D Scene (`P2Scene.tsx` & `BiosphereParticles.tsx`)**:
  - 10,000-particle holographic Earth globe with orbital telemetry rings.
  - Interactive mouse/touch orbit and pulse reactive to scroll velocity.
  - Bangalore geographic beacon coordinates (`12.9716° N, 77.5946° E`).
- **Interactive Overlay (`P2Overlay.tsx`)**:
  - Tabbed telemetry modules for 5 objectives, 5 teams, 4 events, 11 tips.
  - High-tech mission debrief layouts for DPS, Invictus, Aarogi, and Waste Workshop.
- **Custom Media Integration**:
  - `public/assets/videos/biosphere_telemetry_loop.mp4`: Ambient particle loop from Google Flow.

### Central Hub: `/` Comparison & Prototype Selector
- Side-by-side interactive preview cards comparing the two paradigms.
- Complete Avani story, mission, and live navigation switcher.

---

## 3. Mobile-First Responsive Architecture & Touch UX

1. **Responsive Viewport Scaling**:
   - All layout grids collapse gracefully from 3-4 columns (desktop) to 2 columns (tablet) to single-column cards (mobile 375px - 430px).
   - Fluid typography with CSS `clamp(1rem, 2.5vw, 1.5rem)` preventing text clipping.
2. **Mobile Touch & Navigation**:
   - Universal `Navbar`: sticky top with blur backdrop, prototype quick-pill switcher, and animated mobile hamburger drawer.
   - Thumb-zone optimized CTAs ("Apply to Join Avani" pinned floating button on mobile).
   - Touch-gesture compatible scroll container with zero horizontal overflow (`overflow-x: hidden`).
3. **Fluid Micro-Animations**:
   - GSAP hover/tap spring feedback on cards and buttons.
   - Subtle pulse animations on climate tips and objective badges.

---

## 4. GSAP Showcase-Inspired Scroll Choreography

- **Scrubbed Scroll Synchronization**:
  - Background 3D WebGL Canvas locked to viewport (`fixed inset-0 z-0 pointer-events-none`).
  - GSAP ScrollTrigger timelines mapped to Lenis smooth scroll ticker.
  - Multi-layer parallax: foreground text cards move at `1.2x`, midground media cards at `1.0x`, background 3D camera shifts at `0.6x`.
- **Stage Pinning & Reveal Effects**:
  - Smooth card pinned sections with opacity/blur transitions (`opacity: 0, filter: blur(8px) -> opacity: 1, filter: blur(0px)`).
  - Progress bar indicator along viewport edge showing stage progress (Canopy -> Objectives -> Teams -> Events -> Action).

---

## 5. Media Pipeline (Google Flow via cli-anything-brave)

- Drive Google Flow on CDP port 9333 to prompt and export:
  1. `public/assets/videos/canopy_bioluminescent_loop.mp4`: 1080p seamless organic loop showing glowing flora and drifting light motes.
  2. `public/assets/videos/biosphere_telemetry_loop.mp4`: 1080p seamless cyber-globe particle loop.
- Existing pristine WebP imagery (7 assets) and Avani logo are retained and integrated.

---

## 6. Execution Milestones Following Approval

- **M4**: Implement Prototype 1 ("Bioluminescent Living Canopy & GlowGarden") with R3F tree, glowing spores, and tactile/editorial overlay.
- **M5**: Implement Prototype 2 ("Modern Eco-Tech Biosphere") with 10k particle globe and dark glassmorphic HUD.
- **M6**: E2E testing execution, responsive browser visual verification, and forensic audit gate.
