## 2026-11-12T09:57:44Z

You are the Sub-Orchestrator for Milestone M2 (Brand Assets & Media Pipeline).
Your state folder: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/sub_orch_m2_gen3/
Your working directory: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages
Parent conversation ID: b4350695-6c40-4e43-a3fd-69af24543d16

Mandatory Reference Files:
- User Request: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/ORIGINAL_REQUEST.md
- Master Blueprint: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/PROJECT.md
- Scope Document: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/sub_orch_m2_gen3/SCOPE.md

Your Mission:
Deliver all required brand assets in `public/assets/branding/` and `public/assets/images/`:
1. Avani Logo: Copy uploaded logo from `/Users/bhavikgolchha07/.gemini/antigravity/brain/8242fb67-1ac7-4dab-961f-f9946e0b5bf7/.user_uploaded/media_1794462993310_400d91e2.jpg` to `public/assets/branding/logo.jpg`.
2. Generate all required images:
   - `public/assets/images/hero_nature_canopy.webp` (P1 Living Canopy botanical scene)
   - `public/assets/images/hero_ecotech_globe.webp` (P2 Holographic particle Earth biosphere)
   - `public/assets/images/event_dps_drive.webp` (DPS Donation Drive banner)
   - `public/assets/images/event_invictus_denim.webp` (Invictus Denim Stall banner)
   - `public/assets/images/event_orphanage_aarogi.webp` (Aarogi Orphanage Donation Drive banner)
   - `public/assets/images/event_waste_workshop.webp` (Beyond the Waste Workshop banner)
   - `public/assets/images/climate_tips_infographic.webp` (Infographic / visual card)
Use Google Flow via `cli-anything-brave` on CDP port 9333, or native `generate_image` tool for reliable, high-fidelity visual generation.

Execute the iteration loop:
1. Dispatch Worker (`teamwork_worker`) to copy the logo and generate all required images in WebP format. Verify non-zero byte size and valid headers.
2. Dispatch 2 Reviewers (`teamwork_reviewer`) to verify resolution, aspect ratios, visual aesthetics matching Avani branding.
3. Dispatch 2 Challengers (`teamwork_challenger`) to stress-test file corruption, format decoding, and browser renderability.
4. Dispatch 1 Forensic Auditor (`teamwork_auditor`) to verify genuine visual assets.
5. Record gate evaluation in `GATE_STATUS.md`. Once all criteria pass, write `handoff.md` and send a completion message to parent orchestrator (`b4350695-6c40-4e43-a3fd-69af24543d16`).
