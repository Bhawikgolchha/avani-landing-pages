# Scope: Milestone M3 — Core Scaffolding & Shared Base

## Architecture
- Next.js 14 App Router, TypeScript, Tailwind CSS, ESLint
- React 18.3.1 pinned for clean Three.js / R3F / Drei peer resolution
- Dependencies: `three`, `@types/three`, `@react-three/fiber@^8.16.8`, `@react-three/drei@^9.106.0`, `gsap`, `lenis`, `framer-motion`, `lucide-react`
- Custom Tailwind Color System:
  - Rainforest Deep: `#163515`
  - Canopy Light: `#D0E8C5`
  - Bio Cyan: `#8ED1E0`
  - Bioluminescent Green: `#22C55E`
  - Forest Dark: `#0F2410`
  - Cream Background: `#F9FAF7`
  - Dark Charcoal: `#1A201C`
- Font definitions (Cinzel, Plus Jakarta Sans, JetBrains Mono)
- Verbatim Content Model: `src/lib/avaniContent.ts`
- Shared Components:
  - `src/components/common/Navbar.tsx` (Logo, navigation links, apply CTA, sticky prototype switcher)
  - `src/components/common/Footer.tsx` (Links, contacts, social media, cohort apply, legal)
  - `src/hooks/useLenis.ts` (Smooth scroll hook with GSAP Ticker integration)
- Routes:
  - `/`: Comparison Showcase Hub (Interactive cards for Prototype 1 & 2, feature matrix, design philosophies)
  - `/prototype-1`: Living Canopy Stub
  - `/prototype-2`: Eco-Tech Biosphere Stub

## Feature Inventory Mapping
- Features F1 to F12 supported by baseline content, styling, layout, and routing scaffolding.
- Zero lint/type errors, clean build `npm run build`.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M3 | Core Scaffolding & Shared Base | Next.js 14, Tailwind, content model, Navbar/Footer/Switcher, Hub, route stubs | none | IN_PROGRESS |

## Interface Contracts
- `src/lib/avaniContent.ts`: Exports `AVANI_CONTENT`, `AVANI_OBJECTIVES`, `AVANI_TEAMS`, `AVANI_EVENTS`, `CLIMATE_TIPS`, `EXTERNAL_LINKS`.
- `src/components/common/Navbar.tsx`: Sticky navigation, mobile menu, responsive switcher.
- `src/components/common/Footer.tsx`: Universal footer with verified social/contact links.
