## 2026-11-12T08:46:05Z
You are an Explorer agent for Milestone M3 (Core Scaffolding & Shared Base).
MANDATORY: You MUST read `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/ORIGINAL_REQUEST.md`, `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/PROJECT.md`, and `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/sub_orch_m3_scaffolding/SCOPE.md`.
Also inspect `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/explorer_tech_media/report.md`.

Your Mission:
Design and specify the shared UI components and routing structure for Milestone M3:
1. `src/components/common/Navbar.tsx`:
   - Brand logo / name (Avani - Earth In Our Hands)
   - Navigation links: About, Objectives, Teams, Events, Climate Tips
   - Primary CTA: Join Cohort 2025 (links to external Google Form)
   - Sticky Prototype Switcher bar or integrated badge:
     - Allows instant toggling between:
       - `/` (Showcase Hub)
       - `/prototype-1` (Prototype 1: Living Canopy)
       - `/prototype-2` (Prototype 2: Eco-Tech Biosphere)
     - Must show current active prototype state visually.
   - Mobile hamburger menu and drawer with all links & switcher.
2. `src/components/common/Footer.tsx`:
   - Comprehensive multi-column footer
   - Social links (LinkedIn, Substack, Instagram) with icons
   - Direct contacts: email (theavaniorg@gmail.com) and phone (+91 91191 19307)
   - Legal/copyright: "© 2025 Avani. Earth In Our Hands. All rights reserved."
   - Cohort application callout button.
3. `src/hooks/useLenis.ts`:
   - Lenis smooth scrolling hook
   - Handles Next.js client-side mount, RAF updates, and optional GSAP ScrollTrigger ticker integration.
4. `src/app/page.tsx` (Comparison Showcase Hub):
   - Hero introducing Avani & both design prototypes
   - Side-by-side or dual comparison cards:
     - Prototype 1: "Living Canopy" (Warm organic editorial, botanical greens, paper textures, storytelling, community warmth) -> Link to `/prototype-1`
     - Prototype 2: "Eco-Tech Biosphere" (Futuristic dark-mode, 3D interactive globe/particle sphere, telemetry HUD, glowing bioluminescent accents) -> Link to `/prototype-2`
   - Feature comparison matrix table
   - Quick preview section of Avani core impact metrics and mission
5. Shell stubs for:
   - `src/app/prototype-1/page.tsx`
   - `src/app/prototype-2/page.tsx`
   - Ensuring `npm run build` succeeds with zero errors and clean SSR/hydration.

Write your findings to:
`/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/explorer_m3_components/report.md`
and handoff to:
`/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/explorer_m3_components/handoff.md`.
Notify this orchestrator via send_message when complete.
