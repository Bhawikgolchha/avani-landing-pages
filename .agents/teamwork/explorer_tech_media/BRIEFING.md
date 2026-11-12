# BRIEFING — 2026-11-12T08:40:00Z

## Mission
Investigate technical architecture for 3D scroll landing pages (R3F, Three.js, Next.js/Vite, GSAP, Lenis) and media generation via Google Flow / cli-anything-brave for Avani landing pages.

## 🔒 My Identity
- Archetype: explorer
- Roles: Teamwork explorer (read-only investigation, tech & media architecture)
- Working directory: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages
- State folder: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/explorer_tech_media
- Original parent: ac7e2cdd-aed0-49d4-acd7-75a2107e2cad
- Milestone: Tech stack evaluation, 3D scroll architecture, Google Flow media workflow

## 🔒 Key Constraints
- Read-only investigation — do NOT implement production source code outside state folder
- Write reports, analysis, and handoffs in .agents/teamwork/explorer_tech_media/
- Use files for content delivery, send_message for notifications and coordination

## Current Parent
- Conversation ID: ac7e2cdd-aed0-49d4-acd7-75a2107e2cad
- Updated: 2026-11-12T08:40:00Z

## Investigation State
- **Explored paths**:
  - ORIGINAL_REQUEST.md
  - Avani Briefing PDF (`media_1794462310806_90d35dda.pdf`)
  - Avani Logo (`media_1794462993310_400d91e2.jpg`)
  - Canva Mood Board Idea 5 ("WE GROW TREES AROUND THE WORLD") & Idea 10 (Blue / A SPACE)
  - `cli-anything-brave` skill and live Brave bot browser session (CDP 9333, Tab 2 Google Flow)
  - Next.js 14 vs Vite, Three.js, R3F v8, Drei, GSAP ScrollTrigger, Lenis, Framer Motion
  - Peer agent outputs from `explorer_stitch` and `spec_miner_brand`
- **Key findings**:
  - Unified Next.js 14 App Router with React 18.3.1 is the optimal architecture for `/` (hub), `/prototype-1` (organic canopy), and `/prototype-2` (eco-tech biosphere).
  - Canvas must use `'use client'` and `dynamic(() => import(...), { ssr: false })` to eliminate SSR WebGL errors.
  - Lenis and GSAP ScrollTrigger must share a single `requestAnimationFrame` ticker loop.
  - Brave bot browser is online on port 9333; Google Flow is active on Tab 2 with project `24c0dc82-1ebf-44b1-80e8-038e66c9b6bc`.
  - Google Flow credit warning observed ("low on credits"): Video costs 12 credits + approval click; Image generation has minimal/free credit cost. Recommended strategy: generate images in Flow, complement with native `generate_image` tool and Remotion if credits exhaust.
- **Unexplored areas**: None for technical exploration phase; ready for implementation phase by builder agents.

## Key Decisions Made
- Selected Next.js 14 App Router + React 18.3.1 + R3F v8 + Drei + GSAP ScrollTrigger + Lenis.
- Prototype 1 mapped to Canva Idea 5: "The Living Canopy / Deep Lagoon" with 3D organic tree and 5-stage scroll descent.
- Prototype 2 mapped to "Modern Eco-Tech / Interactive Climate Biosphere" with 10,000 particle Earth globe and telemetry HUD.
- Media generation pipeline designed with Google Flow via `cli-anything-brave` and dual fallback via `generate_image` / Remotion.

## Artifact Index
- DISPATCH.md — Incoming mission instructions
- BRIEFING.md — Persistent context & state
- progress.md — Liveness heartbeat and step tracking
- report.md — Comprehensive 3D scroll technical architecture and media generation report
- handoff.md — 5-component handoff report for the orchestrator
