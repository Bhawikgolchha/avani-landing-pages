# Worker Dispatch — M3 Core Scaffolding & Shared Base

Task: Implement Next.js 14 base application, dependencies, content model, common components, and comparison hub.
State folder: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/worker_m3_1/
Working directory: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages
Parent conversation ID: 73a5cd40-92ef-4437-b0b0-28887120c5db


## 2026-11-12T10:01:43Z

You are Worker 1 for Milestone M3 (Core Scaffolding & Shared Base).
Working directory: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages
Your state folder: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/worker_m3_1/
Parent conversation ID: 73a5cd40-92ef-4437-b0b0-28887120c5db

Mandatory Reference Files:
- User Request: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/ORIGINAL_REQUEST.md
- Master Blueprint: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/PROJECT.md
- Scope Document: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/sub_orch_m3_gen3/SCOPE.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Your Deliverables:
1. Initialize or configure Next.js 14 App Router project with TypeScript and Tailwind CSS in `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages`.
   Install and configure dependencies:
   - `three`, `@types/three`
   - `@react-three/fiber`, `@react-three/drei`
   - `gsap`
   - `@studio-freight/lenis`
   - `lucide-react`
   - `clsx`, `tailwind-merge`
   Configure Tailwind colors for Avani brand palette: deep forest green (`#163515`), tea green (`#DCE7D4`), warm sand (`#F4EFEA`), dark emerald, etc.

2. Implement `src/lib/avaniContent.ts` strictly adhering to the interface contracts in `PROJECT.md § Interface Contracts`:
   - 5 organizational objectives: advocacy, resource restoration, pollution reduction, waste management, sustainable movement publicity.
   - 5 teams: Research & Writing, Design, HR & Communications, Social Media, Event Planning (descriptions + responsibilities).
   - 4 events: DPS Donation Drive, Invictus Denim Stall, Aarogi Orphanage Drive, Beyond Waste Workshop (with subtitles, descriptions, and image asset paths).
   - 11 climate action tips categorized across energy, water, waste, consumption.
   - All external links: Application Form, LinkedIn, Substack, Instagram, 3 Substack articles, Email, Phone.

3. Implement `src/components/common/Navbar.tsx`:
   - Responsive with mobile menu toggle
   - Prototype switcher (`/`, `/prototype-1`, `/prototype-2`) with visual active indicators
   - Avani branding & logo
   - External Application Form CTA button

4. Implement `src/components/common/Footer.tsx`:
   - Avani mission statement
   - Direct links to both prototypes and home
   - All social media links (LinkedIn, Substack, Instagram, Substack articles)
   - Contact details (email: avaniyocc@gmail.com, phone: +91 8050931769)
   - Copyright notice

5. Implement Comparison Hub (`src/app/page.tsx`):
   - Hero section introducing Avani and explaining the two distinct creative directions
   - Side-by-side comparison cards for Prototype 1 ("The Living Canopy / Deep Lagoon") and Prototype 2 ("Modern Eco-Tech / Interactive Biosphere")
   - Design philosophy breakdown, palette preview, key interactive features
   - Direct CTA links to `/prototype-1` and `/prototype-2`
   - Organization highlights showcasing the 5 core objectives and recent events

6. Create clean stubs for `src/app/prototype-1/page.tsx` and `src/app/prototype-2/page.tsx` that wrap Navbar & Footer and display placeholder hero sections with route descriptions while M4 and M5 are implemented.

7. Run `npm run build` and `npm run lint` to verify clean compilation with 0 errors.

8. Write `handoff.md` in `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/worker_m3_1/handoff.md` and message the parent with your results.
