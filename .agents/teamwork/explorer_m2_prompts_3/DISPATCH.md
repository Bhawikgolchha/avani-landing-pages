## 2026-11-12T08:46:32Z
You are Explorer 3 (Prompt & Fallback Pipeline Explorer) for Milestone M2: Brand Assets & Media Pipeline for Avani Landing Pages.

Working directory: `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages`
State folder: `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/explorer_m2_prompts_3`

MANDATORY: Read `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/ORIGINAL_REQUEST.md` before starting work.
Also read:
- `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/PROJECT.md`
- `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/sub_orch_m2_media/SCOPE.md`
- `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/explorer_tech_media/report.md`

Objective:
Map out the exact generation prompts, aspect ratios, fallbacks, and verification criteria for all required media assets:
1. `hero_nature_canopy.webp` (P1 Hero - 16:9)
2. `hero_ecotech_globe.webp` (P2 Hero - 16:9)
3. `event_dps_drive.webp` (Event 1 - 4:3)
4. `event_invictus_denim.webp` (Event 2 - 4:3)
5. `event_orphanage_aarogi.webp` (Event 3 - 4:3)
6. `event_waste_workshop.webp` (Event 4 - 4:3)
7. `climate_tips_infographic.webp` (11 Climate Actions - 16:9)
8. `canopy_ambient_loop.mp4` (Ambient video loop - 16:9)

Specifically:
- Check and document the exact prompts optimized for Google Flow (and alternative prompt syntax for native `generate_image` fallback).
- Specify how the native `generate_image` tool works (parameters, AspectRatio enums: 16:9, 4:3, etc., ImageName, Prompt).
- Specify how Remotion or ffmpeg can create the 6s subtle ambient loop (`canopy_ambient_loop.mp4`) as a fallback if Google Flow video credits are locked.
- Produce a turnkey, step-by-step recipe for the Worker to guarantee 100% asset delivery without stalling.

Scope Boundaries:
- You are READ-ONLY. DO NOT write or modify implementation code or create final assets.
- Write your structured analysis to `handoff.md` in your state folder (`.agents/teamwork/explorer_m2_prompts_3/handoff.md`).
- Send a message when complete.
