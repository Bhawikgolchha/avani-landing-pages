# BRIEFING — 2026-11-12T09:07:00Z

## Mission
Scaffold the Next.js 14 App Router project, author all base configs, content models, shared UI components, root layout, and route shells for Avani Landing Pages Milestone M3.

## 🔒 My Identity
- Archetype: worker
- Roles: implementer, qa, specialist
- Working directory: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages
- State folder: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/worker_m3_scaffolding
- Original parent: 3e6dbb77-1fa5-40d0-8ce3-dd95e6459ef8
- Milestone: M3 (Core Scaffolding & Shared Base)

## 🔒 Key Constraints
- Strategy A: Direct configuration authoring (do not overwrite .agents/ or existing files)
- React pinned to 18.3.1 (react and react-dom) for @react-three/fiber compatibility
- Next.js 14.2.35 App Router
- Exact brand colors (#163515, #D0E8C5, #8ED1E0, #22C55E, #0F2410, #F9FAF7, #1A201C)
- Complete, verbatim Avani content in src/lib/avaniContent.ts
- Lenis smooth scroll hook integrated with GSAP ScrollTrigger ticker
- All 3 routes (/, /prototype-1, /prototype-2) must build cleanly with 0 type errors, 0 lint errors, and 0 SSR hydration crashes

## Current Parent
- Conversation ID: 3e6dbb77-1fa5-40d0-8ce3-dd95e6459ef8
- Updated: 2026-11-12T09:07:00Z

## Task Summary
- **What to build**: Next.js 14 scaffolding with React 18.3.1, Three.js, R3F, Drei, GSAP, Lenis, Framer Motion, Tailwind config, Avani content library, shared Navbar/Footer/Lenis hook, root layout, and route shells.
- **Success criteria**: Clean `npm install` (0 peer conflicts), `npm run build` succeeds (0 errors), `npm run lint` succeeds (0 warnings/errors), static prerendering for all 3 routes.
- **Interface contracts**: PROJECT.md & SCOPE.md
- **Code layout**: src/app, src/components/common, src/hooks, src/lib, public

## Key Decisions Made
- Follow Strategy A: create package.json directly and run npm install with react@18.3.1.

## Artifact Index
- DISPATCH.md — task assignment
- BRIEFING.md — working memory
- progress.md — liveness heartbeat
- handoff.md — completion handoff report

## Change Tracker
- **Files modified**: None yet
- **Build status**: Pending
- **Pending issues**: None

## Quality Status
- **Build/test result**: Untested
- **Lint status**: Untested
- **Tests added/modified**: Pending

## Loaded Skills
- None
