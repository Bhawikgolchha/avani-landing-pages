# Project: Avani Interactive 3D Scroll Landing Pages & Design Mockups

## Architecture

A unified **Next.js 14 App Router** application with TypeScript, Tailwind CSS, Three.js, React Three Fiber, Drei, GSAP ScrollTrigger, and Lenis smooth scrolling. The project delivers two distinct, interactive, scroll-driven landing page prototypes for Avani (a Bangalore-based student environmental organization), preceded by Stitch MCP design mockups and powered by custom media generated with Google Flow.

### System Components:
1. **Multi-Route Navigation Architecture**:
   - `/`: Central Comparison & Prototype Selection Hub.
   - `/prototype-1`: "The Living Canopy / Deep Lagoon" — Organic tactile botanical aesthetic derived from Canva Mood Board Idea 5. 3D scroll journey down an organic Tree of Life with translucent foliage into a tranquil aquatic pond.
   - `/prototype-2`: "Modern Eco-Tech / Interactive Biosphere" — Alternative cyber-environmental editorial aesthetic. 3D scroll journey around a 10,000-particle holographic Earth globe with orbital telemetry rings and dark glassmorphic HUD cards.
2. **Design Mockups Layer (Stitch MCP)**:
   - Standalone UI mockups generated via Google's Stitch MCP service (`projects/`, `create_design_system`, `generate_screen_from_text`, `download_file`).
   - Saved locally in `mockups/prototype_1/` and `mockups/prototype_2/` as standalone Tailwind HTML and high-res PNG screenshots.
3. **Media Generation Pipeline (Google Flow via cli-anything-brave)**:
   - Automated browser driving of Google Flow (`https://flow.google.com/u/2/project/24c0dc82-1ebf-44b1-80e8-038e66c9b6bc`) via CDP port 9333.
   - Generated assets saved in `public/assets/images/` and `public/assets/branding/`. Zero-credit fallback through native `generate_image`.
4. **Interactive 3D Engine & SSR Isolation**:
   - R3F Canvas components dynamically loaded with `{ ssr: false }` to avoid SSR WebGL context errors.
   - Fixed background 3D canvas (`fixed inset-0 z-0 pointer-events-none`) synchronized with GSAP ScrollTrigger and Lenis smooth scroll ticker loop.

---

## Feature Inventory

Every feature and requirement from `ORIGINAL_REQUEST.md` is inventoried below with its assigned milestone.

| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | F1: Stitch MCP P1 Mockup | Generate UI mockup for Prototype 1 based on Canva Idea 5 (Blume/Glow Garden) via Stitch MCP | M1 | R1 |
| 2 | F2: Stitch MCP P2 Mockup | Generate UI mockup for Prototype 2 based on Alternative Direction (Editorial Earth Journal) via Stitch MCP | M1 | R1 |
| 3 | F3: Stitch Mockup Local Export | Download and store local HTML (`mockup.html`) and PNG (`mockup.png`) files in `mockups/` | M1 | R1 |
| 4 | F4: Google Flow Media Generation | Generate custom hero and event media via Google Flow using `cli-anything-brave` | M2 | R4 |
| 5 | F5: Brand Logo Integration | Copy and integrate Avani logo (`media_1794462993310_400d91e2.jpg`) into `public/assets/branding/logo.jpg` | M2 | R3 |
| 6 | F6: Next.js 14 Scaffolding | Initialize Next.js 14 App Router, Tailwind, Three.js, R3F, Drei, GSAP, Lenis, and TypeScript | M3 | R2 |
| 7 | F7: Shared Brand Content Module | Author `src/lib/avaniContent.ts` containing verbatim PDF copy (5 objectives, 5 teams, 4 events, 11 tips, links) | M3 | R3 |
| 8 | F8: Universal Navbar & Footer | Responsive navigation with prototype switcher and footer with all social and contact links | M3 | R3 |
| 9 | F9: Comparison Hub (`/`) | Landing page comparing both creative directions with live preview cards and direct route links | M3 | R2 |
| 10 | F10: Prototype 1 3D Canvas | R3F Living Canopy Tree scene with translucent leaves, procedural wind, sunbeams, and floating spores | M4 | R2 |
| 11 | F11: Prototype 1 Scroll Overlay | 5-stage GSAP scrubbed journey with soft tea-green tactile cards embedding full Avani content | M4 | R2, R3 |
| 12 | F12: Prototype 2 3D Canvas | R3F 10,000-particle holographic Earth globe with rotating telemetry rings and camera orbit | M5 | R2 |
| 13 | F13: Prototype 2 Scroll Overlay | High-contrast editorial dark glassmorphic HUD overlay with full Avani content and interactive tabs | M5 | R2, R3 |
| 14 | F14: Content & Link Verification | Verify all 7 external links, 5 objectives, 5 teams, 4 events, and 11 tips across both prototypes | M6 | R3 |
| 15 | F15: Automated Build & Lint Gate | `npm run build` and lint execute with exit code 0 | M6 | Criteria |
| 16 | F16: Browser Visual Inspection | Headless browser verification of 3D scroll animations, responsive layout, and visual fidelity | M6 | Criteria |

---

## Milestones

| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Stitch MCP UI Mockups | Generate, extract, and verify Stitch MCP mockups for P1 and P2 into `mockups/` | none | IN_PROGRESS (ceb60abf-eca0-4fbd-9eea-f06775212a62) |
| M2 | Brand Assets & Media Pipeline | Run Google Flow via `cli-anything-brave` to generate visual media; install Avani logo | none | IN_PROGRESS (1d827cf4-fd77-4641-86cc-f87dca752d8c) |
| M3 | Core Scaffolding & Shared Base | Next.js 14 setup, Tailwind tokens, `avaniContent.ts`, Nav/Footer, and `/` Hub | none | IN_PROGRESS (3e6dbb77-1fa5-40d0-8ce3-dd95e6459ef8) |
| M4 | Prototype 1 (Living Canopy) | Implement `/prototype-1` 3D scroll tree scene and Canva Idea 5 overlay | M2, M3 | PLANNED |
| M5 | Prototype 2 (Eco-Tech Biosphere) | Implement `/prototype-2` 3D scroll particle globe scene and Editorial HUD overlay | M2, M3 | PLANNED |
| M6 | E2E Testing & Visual Audit Gate | Execute full test suite (Tiers 1-4), browser visual inspection, and forensic audit | M1, M4, M5 | PLANNED (Track active: 83cfb165-d24d-4c0a-864a-f5ee948de313) |

---

## Interface Contracts

### 1. Brand Content Contract (`src/lib/avaniContent.ts`)
```ts
export interface AvaniObjective {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface AvaniTeam {
  id: string;
  name: string;
  description: string;
  responsibilities: string[];
}

export interface AvaniEvent {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export interface ClimateTip {
  id: number;
  action: string;
  category: 'energy' | 'water' | 'waste' | 'consumption';
}

export interface AvaniContact {
  email: string;
  phone: string;
  applicationFormUrl: string;
  linkedInUrl: string;
  substackUrl: string;
  substackArticles: { title: string; url: string }[];
  instagramUrl: string;
}
```

### 2. Route Contracts
- `/`: Renders Hub showcasing Prototype 1 vs Prototype 2 previews and design philosophy.
- `/prototype-1`: Living Canopy 3D organic scroll page.
- `/prototype-2`: Modern Eco-Tech Biosphere 3D scroll page.

### 3. Asset Contracts
- `/assets/branding/logo.jpg`: Official Avani logo (`#163515`).
- `/assets/images/hero_nature_canopy.webp`: P1 Hero background.
- `/assets/images/hero_ecotech_globe.webp`: P2 Hero background.
- `/assets/images/event_dps_drive.webp`: DPS Donation Drive banner.
- `/assets/images/event_invictus_denim.webp`: Invictus Denim Stall banner.
- `/assets/images/event_orphanage_aarogi.webp`: Aarogi Orphanage Drive banner.
- `/assets/images/event_waste_workshop.webp`: Beyond the Waste Workshop banner.
- `/assets/images/climate_tips_infographic.webp`: 11 climate tips infographic.

---

## Code Layout

```
/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/
├── mockups/
│   ├── prototype_1/
│   │   ├── mockup.html             # Stitch MCP downloaded HTML
│   │   ├── mockup.png              # Stitch MCP high-res PNG screenshot
│   │   └── metadata.json           # Screen & project metadata
│   └── prototype_2/
│       ├── mockup.html
│       ├── mockup.png
│       └── metadata.json
├── public/
│   └── assets/
│       ├── branding/
│       │   └── logo.jpg            # Avani logo
│       └── images/                 # Google Flow / Imagen media assets
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root HTML & fonts
│   │   ├── page.tsx                # / Comparison Hub
│   │   ├── prototype-1/page.tsx    # /prototype-1 Living Canopy
│   │   └── prototype-2/page.tsx    # /prototype-2 Eco-Tech Biosphere
│   ├── components/
│   │   ├── common/                 # Navbar, Footer, Modal, Cards
│   │   ├── prototype1/             # P1Scene, LivingCanopyTree, P1Overlay
│   │   └── prototype2/             # P2Scene, BiosphereParticles, P2Overlay
│   ├── hooks/                      # useLenis, useScrollProgress
│   └── lib/                        # avaniContent.ts, gsapSetup.ts
├── tests/
│   ├── e2e/                        # Comprehensive Playwright/Puppeteer E2E tests
│   └── unit/                       # Component & content integrity tests
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs
```
