# Technical Architecture & Media Pipeline Report
## Avani 3D Scroll Landing Pages & Google Flow Media Generation

**Author:** explorer_tech_media  
**Date:** 2026-11-12T08:35:00Z  
**Project:** Avani Landing Pages (`/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages`)  
**Mission:** Evaluate 3D scroll web technology stack, architect Prototype 1 & Prototype 2 3D scroll experiences, analyze Google Flow via `cli-anything-brave`, and establish a deterministic execution plan.

---

## Executive Summary

Avani is a Bangalore-based youth environmental organization dedicated to climate advocacy, natural resource restoration, pollution mitigation, sustainable waste management, and youth empowerment. To communicate their mission with maximum emotional and technological resonance, we architect two distinct, high-performance 3D scroll landing page experiences:
1. **Prototype 1: "The Living Canopy / Deep Lagoon"** — Faithfully derived from **Canva Mood Board Idea 5** ("WE GROW TREES AROUND THE WORLD" / organic botanical forest), featuring an interactive 3D tree/canopy canvas in React Three Fiber that responds dynamically to user scroll, guiding visitors through an organic journey from canopy canopy to tranquil river pond.
2. **Prototype 2: "Modern Eco-Tech / Climate Vanguard"** — An alternative cutting-edge cyber-environmental creative direction inspired by Canva Mood Board Idea 10 ("Blue / A SPACE") and futuristic data visualization, featuring an interactive 3D holographic biosphere globe with 10,000 instanced climate particles, orbital telemetry rings, and dark glassmorphic HUD metric cards.

Both prototypes are unified within a single **Next.js 14 App Router** application with multi-route layout (`/` comparison hub, `/prototype-1`, `/prototype-2`), sharing an optimized asset pipeline, brand tokens, and verified organizational copy from the Avani briefing PDF. Custom media generation is mapped through **Google Flow** using the dedicated bot-browser via `cli-anything-brave` (CDP port 9333), supplemented by native image generation and Remotion loops.

---

## 1. 3D Scroll Web Tech Stack Evaluation

### 1.1 Next.js 14 App Router vs. Vite + React SPA

| Architectural Criterion | Next.js 14 App Router | Vite + React SPA | Verdict & Rationale |
|---|---|---|---|
| **Multi-Route Layout** | Native filesystem routing (`app/page.tsx`, `app/prototype-1/page.tsx`, `app/prototype-2/page.tsx`) with nested layouts. | Requires manual `react-router-dom` configuration and route guards. | **Next.js Wins:** Effortless multi-prototype structure and shared navigation/footer shells. |
| **WebGL / SSR Safety** | Requires `'use client'` and `dynamic(() => import(...), { ssr: false })` for Canvas components. | Pure client-side SPA; no SSR window errors by default. | **Tie:** Next.js dynamic imports completely eliminate SSR WebGL hazards with standard 2-line wrappers. |
| **Asset Pipeline** | Built-in `public/` directory, automated `next/image` optimization, streaming video support. | Static asset serving via Vite `public/` without native responsive image srcset generation. | **Next.js Wins:** Superior image loading and performance scoring (LCP/CLS). |
| **Local Preview & Dev** | Single server on `http://localhost:3000` with fast Fast Refresh. | Single dev server on `http://localhost:5173`. | **Tie:** Both provide sub-second HMR. |
| **Automated Testing** | Standard HTTP routing allows Playwright, Chrome DevTools MCP, or curl to hit isolated routes. | SPA routes can require client-side navigation hydration before assertions. | **Next.js Wins:** Clear route URLs for automated E2E testing and visual diffing. |
| **Production Build** | Static Export (`output: 'export'`) or Node server; zero runtime config needed for static host. | Simple `vite build` outputting `dist/`. | **Tie:** Both output static bundles readily deployable. |

**Final Recommendation:** **Unified Next.js 14 App Router**. It cleanly encapsulates both prototypes and a comparison landing selector in one repository, sharing components, Tailwind configurations, fonts, and media assets without duplication.

### 1.2 Core Graphics, Animation, and Scroll Libraries

To achieve 60 FPS buttery-smooth 3D scroll experiences without jank, the following library matrix is selected:

1. **Three.js (`three@^0.165.0`) & `@types/three`**:
   - The foundation WebGL renderer, math library (Vector3, Matrix4, Quaternion, Euler), lighting, and material shaders.
2. **React Three Fiber (`@react-three/fiber@^8.16.8`)**:
   - Declarative scene graph. Manages WebGL context lifecycle, event dispatching, canvas resizing, device-pixel-ratio scaling, and internal render loops (`useFrame`).
   - *Note on React 18 vs 19:* R3F v8 has battle-tested, rock-solid stability with React `18.3.1`. React 19 / R3F v9 is currently in pre-release/rc. Therefore, **React 18.3.1 + Next.js 14.2.x** is the mandatory production target to guarantee zero dependency conflicts.
3. **`@react-three/drei@^9.106.0`**:
   - High-level primitives:
     - `<Float speed={2} rotationIntensity={0.5} floatIntensity={1}>` for floating natural elements.
     - `<Sparkles count={150} scale={12} size={3} speed={0.3} color="#8ED1E0" />` for ambient organic spores.
     - `<MeshDistortMaterial>` and `<MeshWobbleMaterial>` for organic living foliage and aquatic fluid surfaces.
     - `<Environment preset="forest" />` for photorealistic Image-Based Lighting (IBL).
     - `<Html center transform>` for 3D-projected annotations and interactive badges.
     - `<ScrollControls pages={5} damping={0.2}>` and `useScroll()` for declarative scroll scrub binding.
4. **GSAP (`gsap@^3.12.5`) + ScrollTrigger**:
   - The gold standard for scrubbed timelines, sticky section pinning, and synchronizing HTML overlays with 3D camera coordinates.
   - Decoupled from native DOM layout so scroll length (`h-[400vh]`) controls scrub progression from 0.0 to 1.0.
5. **Lenis (`lenis@^1.1.9`)**:
   - Modern, lightweight inertial smooth scrolling library. Unlike legacy libraries, Lenis preserves native browser accessibility, touch events, and keyboard navigation.
   - Synchronizes directly with GSAP ScrollTrigger via the unified RAF loop:
     ```ts
     const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
     lenis.on('scroll', ScrollTrigger.update);
     gsap.ticker.add((time) => lenis.raf(time * 1000));
     gsap.ticker.lagSmoothing(0);
     ```
6. **Framer Motion (`framer-motion@^11.2.10`)**:
   - Handles micro-interactions, modal popups (for the 11 climate tips), glassmorphic card hover states, floating pill badges, and mobile navigation drawers.
7. **Tailwind CSS (`tailwindcss@^3.4.4`)**:
   - Utility-first styling with custom theme colors mapped to Avani brand tokens.

---

## 2. Architectural Design of the 3D Scroll Prototypes

### 2.1 Prototype 1: "The Living Canopy / Deep Lagoon Organic Journey"

#### Creative Direction & Mood Board Derivation
Directly inspired by **Canva Mood Board Idea 5** ("WE GROW TREES AROUND THE WORLD" / Forest green botanical typography and lush canopy imagery) and Idea 1 (Deep Lagoon aquatic flora palette):
- **Core Narrative:** "From Roots to Canopy — Avani's Living Ecosystem." The user journeys through a living, breathing 3D botanical world. As they scroll, the camera dives through a lush canopy, down an organic tree trunk, through an illuminated forest clearing, and across a tranquil reflecting pond.
- **Color Palette Tokens:**
  - `avani-lagoon`: `#0A252E` (Deep underwater/canopy shade)
  - `avani-cyan`: `#1B4958` (Dark cyan accent)
  - `avani-forest`: `#163515` (Signature Avani logo dark green)
  - `avani-aqua`: `#8ED1E0` (Sky aqua highlight)
  - `avani-tea`: `#D0E8D7` / `#D0E8C5` (Tea green organic card background)
  - `avani-cream`: `#F2F7F4` (Mint cream surface background)
- **Typography:**
  - Headings: Serif elegance — *Playfair Display* or *Source Serif 4*
  - Body & UI: Organic geometric sans — *Plus Jakarta Sans* or *Inter*

#### 3D Scene Composition & Assets
1. **Procedural Tree of Life / Botanical Canopy:**
   - Central organic trunk with sprawling branches modeled via procedural spline curves or optimized low-poly GLTF tree.
   - Foliage clusters using instanced leaf meshes with double-sided `MeshStandardMaterial` (`roughness: 0.3`, `transmission: 0.15` for translucent subsurface sunlight scattering).
2. **Atmospheric Environment & Particle Field:**
   - Soft directional sunlight (sun rays / God rays) with subtle shadow casting.
   - Ambient floating spores and pollen using `<Sparkles count={180} scale={14} size={3} color="#D0E8D7" />`.
   - Subtle procedural wind oscillation using vertex shaders (`sin(time + position.x) * 0.05`).
3. **Reflecting Aquatic Pool (Bottom Layer):**
   - Planar mesh with `MeshPhysicalMaterial` (`roughness: 0.1`, `transmission: 0.6`, `ior: 1.33`) with subtle animated normal map ripples.

#### 5-Stage Scroll Timeline & Camera Choreography

| Stage | Scroll Progress | 3D Camera Position & Target | Visual Event in 3D Scene | Synchronized Foreground DOM Content |
|---|---|---|---|---|
| **1. Canopy Hero** | `0% - 20%` | Position: `[0, 8, 12]`<br>Target: `[0, 6, 0]` | Camera hovers above sunlit canopy; leaves rustle gently; floating spores drift past lens. | **Hero Section**: Avani Logo, headline *"Rooted in Purpose, Growing for Tomorrow"*, Bangalore Youth Climate Action badge, scroll indicator. |
| **2. Trunk Descent (Objectives)** | `20% - 40%` | Position: `[3, 3, 7]`<br>Target: `[0, 2, 0]` | Camera spirals smoothly down the trunk; 5 glowing botanical leaf nodes sprout along branches. | **Our 5 Objectives**: Sticky pinned cards revealing Advocacy, Resource Restoration, Anti-Pollution, Waste Management, Sustainable Movements. |
| **3. Forest Clearing (5 Teams)** | `40% - 60%` | Position: `[-4, 1, 6]`<br>Target: `[0, 0, 0]` | Camera enters forest glade; 5 organic moss-covered stone pedestals illuminate as light shafts shift. | **The 5 Teams**: Interactive card deck highlighting Research & Writing, Design, HR & Communications, Social Media, Event Planning. |
| **4. River Pond (4 Events)** | `60% - 80%` | Position: `[0, -0.5, 4]`<br>Target: `[0, -1, 0]` | Camera skims low over tranquil water surface; 4 floating water lilies open, reflecting event memories. | **Events in Action**: Showcase of DPS Donation Drive, Invictus Denim Stall, Aarogi Orphanage Drive, Beyond Waste Workshop. |
| **5. Sunrise Ascent (Tips & Join)** | `80% - 100%` | Position: `[0, 4, 8]` (tilted up)<br>Target: `[0, 10, 0]` | Camera tilts upward toward clear blue sky through tree crown; warm golden hour illumination envelops scene. | **Climate Tips & CTA**: 11 Actionable Climate Tips checklist + prominent *"Join the Movement"* button linking to Application Form. |

---

### 2.2 Prototype 2: "Modern Eco-Tech / Interactive Climate Biosphere"

#### Creative Direction & Mood Board Derivation
Inspired by Canva Mood Board Idea 10 ("Blue / A SPACE" / bioluminescent cyber-aquatic depth) and modern environmental telemetry dashboards:
- **Core Narrative:** "Data-Driven Stewardship — Engineering the Climate Future." A sleek, dark-mode eco-tech aesthetic demonstrating how modern youth combine technology, data research, and activism to protect planetary boundaries.
- **Color Palette Tokens:**
  - `tech-bg`: `#080C0E` (Deep obsidian dark background)
  - `tech-card`: `#11181C` / `rgba(17, 24, 28, 0.7)` (Glassmorphic dark slate)
  - `tech-emerald`: `#10B981` (Cyber neon emerald for positive eco-metrics)
  - `tech-cyan`: `#06B6D4` (High-tech atmospheric cyan)
  - `tech-amber`: `#F59E0B` (Solar warning & energy accent)
  - `tech-text`: `#F8FAFC` (Crisp high-contrast white)
- **Typography:**
  - Headings: Modern Technical Display — *Space Grotesk* or *Syne*
  - Body & Telemetry: Geometric Sans with Monospace highlights — *Inter* and *JetBrains Mono*

#### 3D Scene Composition & Assets
1. **Interactive Holographic Biosphere Globe:**
   - 10,000 instanced particle points forming an Earth globe (`THREE.BufferGeometry` with spherical coordinate distribution).
   - Custom shader material with vertex displacement based on Simplex noise, creating pulsing atmospheric auroras around the equator.
   - Glowing coordinate beacon pulsing at Bangalore (`12.9716° N, 77.5946° E`).
2. **Concentric Telemetry Rings & Data Nodes:**
   - 3 concentric 3D wireframe rings rotating along oblique axes (`rotation.x += 0.002`, `rotation.y += 0.005`).
   - Glowing data packets traversing spline paths connecting global climate nodes.
3. **Glassmorphic 3D HUD Panels:**
   - HTML elements projected in 3D space using `@react-three/drei`'s `<Html transform occlude>` or fixed screen-space glassmorphic HUD overlays with `backdrop-blur-md` and `border border-cyan-500/20`.

#### 5-Stage Scroll Timeline & Particle Morphing Sequence

| Stage | Scroll Progress | 3D Camera & Biosphere State | Visual Transformation in 3D Scene | Synchronized Foreground DOM Content |
|---|---|---|---|---|
| **1. Planetary Telemetry** | `0% - 20%` | Camera: `[0, 0, 5]`<br>Biosphere: Cohesive glowing sphere | Particles glow in cyan and emerald; Bangalore coordinate beacon pulses with radar wave. | **Hero HUD**: Headline *"Planetary Care Powered by Student Intelligence"*, live status counters, quick telemetry stats. |
| **2. Orbital Deconstruction (5 Objectives)** | `20% - 40%` | Camera: `[2, 1, 4]`<br>Biosphere: Rings separate into 5 orbits | Sphere expands; 5 orbital rings align, each illuminating in sequence with energy pulses. | **5 Systems Objectives**: Advocacy, Resource Restoration, Pollution Defense, Waste Intelligence, Movement Amplification. |
| **3. Neural Network (5 Teams)** | `40% - 60%` | Camera: `[-3, 2, 4.5]`<br>Biosphere: Morphs to node cluster | Particle sphere unfolds into an interconnected 5-node neural network diagram with data pulses. | **5 Core Operational Units**: Research & Writing, Design, HR & Comms, Social Media, Event Logistics. |
| **4. Event Telemetry Matrix** | `60% - 80%` | Camera: `[0, -1, 3.8]`<br>Biosphere: Particle flow carousel | Particles stream horizontally like a data river behind 4 floating glassmorphic event telemetry pods. | **Field Missions**: DPS Donation Drive, Invictus Denim Upcycling, Aarogi Orphanage Drive, Beyond Waste Lab. |
| **5. Shield Activation (Tips & Join)** | `80% - 100%` | Camera: `[0, 0, 6]`<br>Biosphere: Protective particle shield | Particles form a dense glowing protective geodesic dome shield encapsulating the globe. | **11 Planetary Protocols (Climate Tips)**: Interactive command terminal checklist + *"INITIALIZE VOLUNTEER CADRE"* Form Link. |

---

## 3. Unified Next.js Multi-Route Application Architecture

### 3.1 Project File Tree

```
avani_landing_pages/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.mjs
├── public/
│   ├── assets/
│   │   ├── branding/
│   │   │   └── logo.jpg               # Avani official logo
│   │   ├── images/
│   │   │   ├── hero_nature_canopy.webp # Google Flow generated hero
│   │   │   ├── hero_ecotech_globe.webp # Google Flow generated cyber hero
│   │   │   ├── event_dps_drive.webp    # Google Flow event 1
│   │   │   ├── event_invictus_denim.webp # Google Flow event 2
│   │   │   ├── event_orphanage_aarogi.webp # Google Flow event 3
│   │   │   ├── event_waste_workshop.webp # Google Flow event 4
│   │   │   └── climate_tips_infographic.webp
│   │   ├── videos/
│   │   │   ├── canopy_ambient_loop.mp4 # Google Flow 6s loop
│   │   │   └── biosphere_ambient_loop.mp4
│   │   └── models/
│   │       └── foliage_leaf.glb        # Optimized low-poly assets
├── src/
│   ├── app/
│   │   ├── layout.tsx                  # Root layout with fonts & metadata
│   │   ├── page.tsx                    # Route / (Comparison & Selector Hub)
│   │   ├── prototype-1/
│   │   │   ├── page.tsx                # Living Canopy 3D Scroll Page
│   │   │   └── layout.tsx
│   │   └── prototype-2/
│   │       ├── page.tsx                # Eco-Tech Biosphere 3D Scroll Page
│   │       └── layout.tsx
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.tsx              # Universal Avani Nav with prototype switcher
│   │   │   ├── Footer.tsx              # Footer with all social & contact links
│   │   │   ├── ClimateTipsModal.tsx    # Interactive 11 tips accordion/modal
│   │   │   └── EventCard.tsx           # Reusable event card
│   │   ├── prototype1/
│   │   │   ├── P1Scene.tsx             # R3F Canvas root for Prototype 1
│   │   │   ├── LivingCanopyTree.tsx    # 3D Tree & foliage meshes
│   │   │   ├── FloatingSpores.tsx      # Drei Sparkles & dust particles
│   │   │   └── P1Overlay.tsx           # GSAP-scrubbed HTML chapters
│   │   └── prototype2/
│   │       ├── P2Scene.tsx             # R3F Canvas root for Prototype 2
│   │       ├── BiosphereParticles.tsx  # 10,000 particle sphere & shaders
│   │       ├── TelemetryRings.tsx      # Rotating orbital wireframes
│   │       └── P2Overlay.tsx           # Glassmorphic HUD telemetry cards
│   ├── hooks/
│   │   ├── useLenis.ts                 # Smooth scroll hook with GSAP sync
│   │   └── useScrollProgress.ts        # Normalized 0-1 scroll observer
│   ├── lib/
│   │   ├── avaniContent.ts             # Authoritative copy from briefing PDF
│   │   └── gsapSetup.ts                # GSAP + ScrollTrigger registration
```

### 3.2 WebGL Isolation & SSR Crash Prevention Pattern

Because Three.js and `@react-three/fiber` access `window`, `document`, and WebGL contexts that do not exist during Next.js server-side rendering, all 3D canvas components **MUST** be loaded dynamically with `ssr: false`:

```tsx
// src/app/prototype-1/page.tsx
'use client';

import dynamic from 'next/dynamic';
import { P1Overlay } from '@/components/prototype1/P1Overlay';
import { useLenis } from '@/hooks/useLenis';

// Dynamically import Canvas with SSR disabled
const P1Scene = dynamic(
  () => import('@/components/prototype1/P1Scene').then((mod) => mod.P1Scene),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 bg-avani-lagoon flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-avani-aqua"></div>
      </div>
    ),
  }
);

export default function Prototype1Page() {
  useLenis(); // Smooth scrolling synchronization

  return (
    <main className="relative bg-avani-cream text-avani-lagoon min-h-screen">
      {/* Fixed 3D Canvas in background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <P1Scene />
      </div>

      {/* Foreground Scrollable Content */}
      <div className="relative z-10 w-full">
        <P1Overlay />
      </div>
    </main>
  );
}
```

### 3.3 Lenis & GSAP ScrollTrigger Synchronization Hook

```ts
// src/hooks/useLenis.ts
import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.8,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
    };
  }, []);
}
```

---

## 4. Media Creation with Google Flow via `cli-anything-brave`

### 4.1 Environment & Bot Browser Status Verification
- **Host & Port:** Chrome DevTools Protocol (CDP) running on `http://127.0.0.1:9333`.
- **Profile Location:** `~/HermesWork/bot-browser`.
- **Active State Verified:** Tested via `cli-anything-brave status` and `cli-anything-brave tabs`:
  - `{"online": true, "cdp": "http://127.0.0.1:9333", "tabs": 6}`
  - Tab 2 is active on Google Flow: `https://flow.google.com/u/2/project/24c0dc82-1ebf-44b1-80e8-038e66c9b6bc`.
  - Logged into bot account (`krip401@gmail.com`).

### 4.2 Google Flow Interface Mechanics & Verified Selectors

Based on our direct DOM extraction and inspection of Google Flow:

| UI Function | Exact Selector / Target | Operational Rule |
|---|---|---|
| **Text Prompt Input** | `div[contenteditable="true"]` or `[aria-label="What do you want to create?"]` | Use `cli-anything-brave type '[contenteditable]' "<prompt>"` |
| **Generation Mode Toggle** | Left navigation bar `button` with text `"image"` vs `"videocam"` | Switch to image mode to conserve video credits. |
| **Settings Trigger** | `button[aria-label="Settings trigger"]` (text: `Video · 360p · 6s` / `Image · 16:9`) | Click to configure aspect ratio (`16:9` for desktop hero, `9:16` for mobile vertical, `1:1` for cards). |
| **Generate Button** | `button[aria-label="Start generation"]` | Click to dispatch generation. |
| **Generation Status** | `button[aria-label="Stop"]` | Poll with `wait-for "[aria-label='Stop']" --gone --timeout 180` |
| **Asset Preview & Download** | Thumbnail cards: `[aria-label="More options"]` or click card | Click card -> get high-res image `src` via `eval` -> `cli-anything-brave download --url "$SRC" --name asset.png` |

### 4.3 Credit Conservation Strategy & Safety Rules
1. **Low Credit Observation:** A credit warning is active on the account: `"You're running low on Google Flow credits. Your credits will reset monthly..."`
2. **Credit Costs:**
   - Text-to-Image in Google Flow consumes minimal/zero credits.
   - Flow Video generation consumes **12 credits per clip** and requires an approval dialog click.
3. **Operational Protocol:**
   - Do NOT spam video generations. Generate **high-resolution images** first for all heroes, event banners, and climate cards.
   - Generate at most 1-2 curated video ambient loops (e.g. 6-second subtle canopy foliage loop).
   - When spending credits, click `Approve` once (NEVER "Always approve").
   - Download destination: Download to temporary scratch directory (`/tmp` or project root), verify with `file` command (Google Flow sometimes sends WebP with a `.png` extension), convert if needed via `sips -s format png`, and move into `public/assets/`.
4. **Resilient Fallback Pipeline:**
   - In case Google Flow credits are depleted mid-run, the agent stack has access to:
     - The native `generate_image` tool (Imagen 3 / nano banana) which runs without browser credits.
     - Remotion (`@remotion/media` and `@remotion/transitions`) to compile animated video loops and motion graphics directly from generated stills.

### 4.4 Media Asset Inventory & Generation Prompt Specifications

| Asset ID | Target Path | Media Type & Ratio | Google Flow Generation Prompt |
|---|---|---|---|
| **M1: P1 Hero** | `public/assets/images/hero_nature_canopy.webp` | Image (16:9) | *"Cinematic ultra-realistic lush tropical rainforest canopy, golden sunlight beams piercing through translucent green monstera and banyan tree leaves, ethereal morning mist, tranquil river reflection below, 8k resolution, photorealistic environmental conservation"* |
| **M2: P2 Hero** | `public/assets/images/hero_ecotech_globe.webp` | Image (16:9) | *"Futuristic dark eco-technology command center, glowing holographic Earth sphere floating in midair with emerald and cyan data telemetry particles, clean glassmorphic aesthetic, modern climate science and student innovation, octane render, 8k"* |
| **M3: Event 1 (DPS)** | `public/assets/images/event_dps_drive.webp` | Image (4:3) | *"Vibrant Indian high school campus courtyard, diverse group of smiling Indian student volunteers organizing donation boxes of books, clothing, and school supplies, sunny outdoor Bangalore day, warm documentary photography"* |
| **M4: Event 2 (Denim)** | `public/assets/images/event_invictus_denim.webp` | Image (4:3) | *"Stylish upcycled denim fashion stall at a youth college cultural festival, student entrepreneurs showcasing repurposed patchwork denim tote bags, jackets, and accessories, creative sustainable fashion workshop"* |
| **M5: Event 3 (Aarogi)** | `public/assets/images/event_orphanage_aarogi.webp` | Image (4:3) | *"Heartwarming community donation event in Bangalore, young volunteers sharing stationery kits, art supplies, and warm meals with smiling children at a community center, candid joyful photography, soft natural lighting"* |
| **M6: Event 4 (Waste)** | `public/assets/images/event_waste_workshop.webp` | Image (4:3) | *"Hands-on creative recycling and upcycling workshop, student makers turning discarded plastic bottles, cardboard, and textiles into beautiful modern sculptures and planters, colorful engaging workshop table"* |
| **M7: Climate Infographic** | `public/assets/images/climate_tips_infographic.webp` | Image (16:9) | *"Minimalist modern flat editorial illustration of 11 daily climate actions: reusable water bottles, composting food waste, unplugging appliances, cycling, solar energy, repairing clothes, clean green lifestyle aesthetic"* |
| **M8: P1 Video Loop** | `public/assets/videos/canopy_ambient_loop.mp4` | Video (6s, 16:9) | Prompt from M1: *"Gentle breeze swaying sunlit rainforest tree canopy leaves, slow cinematic camera drift, floating dust motes, peaceful loop"* |

### 4.5 Exact `cli-anything-brave` Command Sequence

```bash
# 1. Switch to Google Flow tab in Brave bot browser
cli-anything-brave use 2

# 2. Select Image mode from left sidebar
cli-anything-brave click "button:has-text('image')"

# 3. Clear existing prompt if any
cli-anything-brave click "[aria-label='Clear prompt']"

# 4. Input Prompt for P1 Hero
cli-anything-brave type "[contenteditable]" "Cinematic ultra-realistic lush tropical rainforest canopy, golden sunlight beams piercing through translucent green monstera leaves, ethereal morning mist, tranquil river reflection, 8k photorealistic"

# 5. Trigger generation
cli-anything-brave click "[aria-label='Start generation']"

# 6. Wait for generation completion
cli-anything-brave wait-for "[aria-label='Stop']" --gone --timeout 180

# 7. Take screenshot to verify generated results
cli-anything-brave screenshot "/tmp/flow_p1_result.png"

# 8. Extract image URL and download asset
# (Using eval to query latest generated <img> src attribute)
IMAGE_URL=$(cli-anything-brave eval "document.querySelector('img[src*=\"lh3.googleusercontent.com\"], img[src*=\"blob:\"]').src" | jq -r .result)
cli-anything-brave download --url "$IMAGE_URL" --name "hero_nature_canopy.png" --dir "/tmp"

# 9. Format verification & copy to project assets
file /tmp/hero_nature_canopy.png
cp /tmp/hero_nature_canopy.png /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/public/assets/images/hero_nature_canopy.webp
```

---

## 5. Authoritative Content & Brand Reference Inventory

Extracted and verified verbatim from the official Avani Briefing PDF (`media_1794462310806_90d35dda.pdf`) and Logo (`media_1794462993310_400d91e2.jpg`):

### 5.1 Identity & Organization Overview
- **Name:** Avani (Youth Environmental Organization)
- **Base:** Bangalore, Karnataka, India
- **Mission Statement:** *"Avani is a youth organization based in Bangalore, consisting of an enthusiastic team of students who are committed to making a change in the way we treat our environment. We share the ideal of a greener and cleaner India, a collective mission we know many people around the world strive for... even the small actions of many add up and bring a change to the world."*

### 5.2 The 5 Core Objectives
1. **Climate Advocacy:** To advocate for actions against climate change.
2. **Resource Upliftment:** To work towards the upliftment and restoration of natural resources in India.
3. **Anti-Pollution:** To raise a voice against pollution in all spheres.
4. **Waste Management:** To ensure effective waste management practices are put into use.
5. **Sustainable Movement Publicity:** To promote and publicize sustainable brands and environmental activist movements across social media platforms.

### 5.3 The 5 Specialized Teams
1. **Research & Writing:** Investigating environmental issues, drafting research-backed articles for Substack, and verifying climate science.
2. **Design:** Creating visual brand identity, social media graphics, posters, and educational UI assets.
3. **HR & Communications:** Managing applicant interviews, team placement, internal member culture, and organizational coordination.
4. **Social Media:** Driving awareness campaigns, publishing Instagram reels/posts, and expanding youth engagement.
5. **Event Planning:** Conceptualizing, organizing, and executing on-the-ground donation drives, workshops, and school cleanups.

### 5.4 The 4 Flagship Events
1. **DPS Donation Drive:** Community drive bringing school students and faculty together to contribute essential supplies, clothing, and daily necessities to underprivileged groups.
2. **Invictus Denim Stall:** Vibrant sustainable fashion stall combining student entrepreneurship and upcycled denim creations, raising awareness about conscious consumerism.
3. **Orphanage Donation Drive (with Aarogi):** Partnership with Aarogi providing essential goods, learning kits, and spreading joy among children.
4. **Beyond the Waste Workshop:** Interactive hands-on upcycling session transforming everyday discarded items into creative artworks and functional goods.

### 5.5 The 11 Climate Tips
1. Switch off lights, fans, and electronics when leaving a room.
2. Unplug chargers and appliances when not in use.
3. Turn off the tap while brushing your teeth or shaving.
4. Carry a reusable bottle, bag, and container instead of disposables.
5. Compost vegetable peels and food scraps instead of throwing them away.
6. Plan meals and use leftovers to reduce food waste.
7. Repair, reuse, or donate items instead of buying new ones.
8. Run the dishwasher and washing machine only when full.
9. Decline extra packaging, plastic cutlery, and unnecessary printed copies.
10. Repurpose glass jars and sturdy containers for storage.
11. Print on both sides of paper, or go digital whenever possible.

### 5.6 Official Links & Contacts
- **Application Form:** `https://docs.google.com/forms/d/e/1FAIpQLSd_7uxm79Ci-gyoTaE80A_NKt2KMZ1ueS48v6hMgKBVrmZzQA/viewform?usp=dialog`
- **LinkedIn:** `https://www.linkedin.com/company/avaniyocc/`
- **Substack:** `https://open.substack.com/pub/avaniyocc?r=5wu68m&utm_medium=ios`
- **Substack Note 1:** `https://substack.com/@avaniyocc/note/p-216575497?r=5wrcnw`
- **Substack Note 2:** `https://substack.com/@avaniyocc/note/p-223896247?r=5wrcnw`
- **Substack Note 3:** `https://substack.com/@avaniyocc/note/p-217629092?r=5wrcnw`
- **Instagram:** `https://www.instagram.com/avani_yocc?cplk=MXQ2amNodzFmbHFpcA==`
- **Email:** `avaniyocc@gmail.com`
- **Phone:** `+91 8050931769`

---

## 6. Implementation & Verification Roadmap

### Phase 1: Scaffolding & Setup
1. Initialize Next.js 14 App Router project in `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages`:
   ```bash
   npx create-next-app@14 . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
   ```
2. Install production dependencies:
   ```bash
   npm install three @types/three @react-three/fiber@^8.16.8 @react-three/drei@^9.106.0 gsap lenis framer-motion lucide-react
   ```
3. Copy Avani official logo from `/Users/bhavikgolchha07/.gemini/antigravity/brain/8242fb67-1ac7-4dab-961f-f9946e0b5bf7/.user_uploaded/media_1794462993310_400d91e2.jpg` to `public/assets/branding/logo.jpg`.

### Phase 2: Media Asset Generation
1. Execute `cli-anything-brave` Google Flow generation workflow for hero images and event cards.
2. In case of credit caps, augment with `generate_image` tool to guarantee complete asset coverage.
3. Place all assets in `public/assets/images/`.

### Phase 3: Route Construction & 3D Implementation
1. Build `src/lib/avaniContent.ts` containing the verified PDF copy.
2. Implement Route `/` (Comparison Hub & Prototype Switcher).
3. Implement Route `/prototype-1` ("The Living Canopy" with R3F Tree of Life + GSAP scrubbed chapters).
4. Implement Route `/prototype-2` ("Eco-Tech Biosphere" with R3F 10,000 Particle Globe + Glassmorphic Telemetry HUD).

### Phase 4: Automated Verification Gate
1. Run `npm run build` to verify zero TypeScript errors, zero hydration mismatches, and exit code 0.
2. Launch `npm run start` (or `npm run dev`) on port 3000.
3. Execute visual browser inspection via Chrome DevTools MCP or `cli-anything-brave`:
   - Inspect `http://localhost:3000/`
   - Inspect `http://localhost:3000/prototype-1` (verify WebGL canvas renders, scroll responds smoothly)
   - Inspect `http://localhost:3000/prototype-2` (verify particle globe rotates, HUD renders)
4. Confirm all 7 external links and all organizational copy are present.
