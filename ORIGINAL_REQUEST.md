# Original User Request

## Initial Request — 2026-11-12T08:02:06Z

Create two distinct landing page prototypes for Avani (a Bangalore-based student environmental organization), featuring interactive 3D scroll effects, Stitch MCP design mockups, and custom media generated with Google Flow via cli-anything-brave.

Working directory: ~/teamwork_projects/avani_landing_pages
Integrity mode: development

## Reference Material
- Uploaded Logo: `/Users/bhavikgolchha07/.gemini/antigravity/brain/8242fb67-1ac7-4dab-961f-f9946e0b5bf7/.user_uploaded/media_1794462993310_400d91e2.jpg`
- Canva Mood Boards:
  - https://www.canva.com/design/DAHSi0vzDLY/iyNFb9l9HufjCRaukwjw7Q/edit
  - https://canva.link/p2evr172fehtt6n
- Avani Links:
  - Application Form: https://docs.google.com/forms/d/e/1FAIpQLSd_7uxm79Ci-gyoTaE80A_NKt2KMZ1ueS48v6hMgKBVrmZzQA/viewform?usp=dialog
  - LinkedIn: https://www.linkedin.com/company/avaniyocc/
  - Substack: https://open.substack.com/pub/avaniyocc?r=5wu68m&utm_medium=ios
  - Instagram: https://www.instagram.com/avani_yocc?cplk=MXQ2amNodzFmbHFpcA==
  - Email: avaniyocc@gmail.com
  - Phone: +91 8050931769
- Substack Articles:
  - https://substack.com/@avaniyocc/note/p-216575497?r=5wrcnw
  - https://substack.com/@avaniyocc/note/p-223896247?r=5wrcnw
  - https://substack.com/@avaniyocc/note/p-217629092?r=5wrcnw

## Requirements

### R1. Stitch MCP Design Mockups
Generate UI mockups using Stitch MCP for two landing page prototypes before implementation: Prototype 1 based on the 5th idea from the Canva mood boards, and Prototype 2 based on an alternative creative direction chosen by the team. Present mockups during planning.

### R2. Two Interactive 3D Scroll Landing Page Prototypes
Build two functional landing page prototypes with 3D scroll-driven visual effects, adhering to the Avani color palette, typography, and logo from the PDF and mood boards. Prototype 1 implements the 5th idea from the mood boards, and Prototype 2 implements the alternative direction.

### R3. Brand Identity, Content, and Navigation
Incorporate all Avani content and links from the PDF into both prototypes:
- Organization overview and objectives (advocacy, resource restoration, pollution reduction, waste management, sustainable movement publicity).
- The 5 teams: Research & Writing, Design, HR & Communications, Social Media, Event Planning.
- Event descriptions: DPS Donation Drive, Invictus Denim Stall, Orphanage Donation Drive (with Aarogi), Beyond the Waste Workshop.
- Climate tips: 11 action points listed in the briefing.
- Application form link, LinkedIn, Substack, Instagram, Substack article links, contact email, and phone number.

### R4. Media Creation via Google Flow
Create image and video assets for the landing pages using Google Flow via `cli-anything-brave`.

## Acceptance Criteria

### Design Mockups
- [ ] Stitch MCP mockups for Prototype 1 and Prototype 2 are created and viewable.

### Landing Page Implementation & Functionality
- [ ] Both prototype landing pages build and run locally without errors.
- [ ] 3D scroll effects activate and respond smoothly to user scroll position on both prototypes.
- [ ] Avani logo (`media_1794462993310_400d91e2.jpg`), branding fonts, and color palette from the PDF/mood boards are applied.
- [ ] All specified external links (Application form, LinkedIn, Substack, Instagram, Substack articles, Email, Phone) are present and correct.
- [ ] All organizational content, objectives, team breakdowns, 4 event summaries, and 11 climate tips from the briefing PDF are present in both prototypes.

### Media Assets
- [ ] Custom visual/video assets generated via Google Flow with `cli-anything-brave` are integrated into the landing pages.

### Verification
- [ ] Automated build/lint verification runs successfully with exit code 0.
- [ ] Browser visual inspection verifies rendering of both landing pages, interactive 3D scroll animations, and responsive layout.


## Follow-up — 2026-11-12T10:57:14Z

User approved the updated plan (`avani_updated_plan.md` / `SYNTHESIS_PLAN.md`)! Proceed immediately with execution:

1. **Google Flow Background Videos (M2 expansion via `cli-anything-brave`)**: Generate and integrate `public/assets/videos/canopy_bioluminescent_loop.mp4` (for Prototype 1) and `public/assets/videos/biosphere_telemetry_loop.mp4` (for Prototype 2) with WebP poster fallbacks and `playsInline muted loop` mobile compatibility.
2. **Prototype 1 (`/prototype-1`) — M4**: Implement the Tri-Partite Synthesis (Canva Idea 5 Living Canopy + Canva Pages 12-13 GlowGarden bioluminescence + Prototype 2 glassmorphic HUD accents), mobile-first responsive layout (375px-430px snap carousels for 4 events & 11 climate tips, sticky mobile Apply CTA, fluid `clamp()` typography), official Avani circular logo (`/assets/branding/logo.jpg`), and smooth GSAP `ScrollTrigger` + `Lenis` + React Three Fiber 3D scroll choreography (including `ScrollTrigger.config({ ignoreMobileResize: true })`, DPR clamping `[1, 1.5]` on mobile, `prefers-reduced-motion` fallback).
3. **Prototype 2 (`/prototype-2`) — M5**: Implement the Modern Eco-Tech Biosphere with 10,000-particle holographic Earth globe, Bangalore beacon, dark glassmorphic telemetry HUD, Google Flow video backdrop, and mobile-first responsive UX.
4. **Content Integrity**: Replace any illustrative mockup stats (e.g., "500+ Active Students", "1,000+ kg", "140+ Students") with strictly PDF-verified facts/counts (`4 Community Drives`, `5 Specialized Teams`, `11 Climate Actions`, `100% Student-Led`) and ensure all 7 external links, 5 objectives, 5 teams, 4 event descriptions, and 11 climate tips from the PDF are accurately rendered.
5. **M6 Verification**: Run `npm run build`, automated E2E Tiers 1-4, and headless browser visual inspection at both mobile (`390x844`) and desktop (`1440x900`) viewports across scroll checkpoints.
