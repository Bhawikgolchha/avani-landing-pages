## 2026-11-12T10:31:08Z

You are the Replacement Asset Pipeline Worker for Milestone M2 (Brand Assets & Media Pipeline) of the Avani Landing Pages project.

Working Directory: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages
Your State Folder: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/worker_m2_2/
Parent Orchestrator ID: e1bb7c8f-954f-4564-8d1c-37f6ae498eca

MANDATORY REFERENCE FILES (READ FIRST):
1. /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/ORIGINAL_REQUEST.md
2. /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/PROJECT.md
3. /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/sub_orch_m2_gen3/SCOPE.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

EXCLUSIVE WRITE OWNERSHIP:
You exclusively own:
- `public/assets/branding/logo.jpg`
- `public/assets/images/*`
Do NOT modify any files in `src/`, `mockups/`, or `tests/`.

TASK REQUIREMENTS:
The predecessor worker generated all 8 assets in `public/assets/branding/` and `public/assets/images/` but encountered an API stream timeout during report generation.

Your job is:
1. Thoroughly verify all 8 assets in `public/assets/branding/` and `public/assets/images/`:
   - `public/assets/branding/logo.jpg` (official Avani logo)
   - `public/assets/images/hero_nature_canopy.webp` (P1 Living Canopy botanical scene)
   - `public/assets/images/hero_ecotech_globe.webp` (P2 Holographic particle Earth biosphere)
   - `public/assets/images/event_dps_drive.webp` (DPS Donation Drive banner)
   - `public/assets/images/event_invictus_denim.webp` (Invictus Denim Stall banner)
   - `public/assets/images/event_orphanage_aarogi.webp` (Aarogi Orphanage Donation Drive banner)
   - `public/assets/images/event_waste_workshop.webp` (Beyond the Waste Workshop banner)
   - `public/assets/images/climate_tips_infographic.webp` (Infographic / visual card)

2. Run python script or shell commands to check:
   - File existence
   - Byte sizes (must be non-zero and > 5KB)
   - Image format headers (JPEG for logo, WEBP for the 7 images)
   - Image dimensions (width x height) and aspect ratios
   If any asset is missing or corrupted, regenerate or recopy it.

3. Write a comprehensive completion report to `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/worker_m2_2/handoff.md` detailing all 8 assets, their exact paths, sizes, formats, and dimensions.
4. Send a completion message back to the parent orchestrator.
