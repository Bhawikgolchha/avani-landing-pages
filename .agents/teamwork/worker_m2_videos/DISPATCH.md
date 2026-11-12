## 2026-11-12T11:40:26Z

You are the Worker for Milestone M2 Expansion: Background Video Loops.
Your state folder: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/worker_m2_videos/
Your working directory: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages
Parent conversation ID: ebb1a02a-9cc8-4d94-bea5-87ee2aea86b0

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Mandatory Reference Files:
- User Request: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/ORIGINAL_REQUEST.md
- Master Blueprint: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/PROJECT.md
- Scope Document: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/sub_orch_m2_videos/SCOPE.md

Your Mission:
Deliver two background video loops in `public/assets/videos/`:
1. `public/assets/videos/canopy_bioluminescent_loop.mp4` (P1 ambient bioluminescent canopy background loop)
   - Deep organic forest / glowing canopy / floating bioluminescent motes & spores, soft organic pulsing light.
   - Seamless 4-8s loop, 16:9 aspect ratio, <10MB.
2. `public/assets/videos/biosphere_telemetry_loop.mp4` (P2 ambient cyber-particle biosphere background loop)
   - Dark cyber-environmental editorial aesthetic: 3D holographic Earth / glowing particle globe / orbital telemetry rings / coordinate data streams.
   - Seamless 4-8s loop, 16:9 aspect ratio, <10MB.
3. Ensure poster fallbacks exist (e.g. `public/assets/images/hero_nature_canopy.webp` and `public/assets/images/hero_ecotech_globe.webp` or in `public/assets/videos/`).

Google Flow Session Guidance & Credit Budgeting:
- Google Flow via `cli-anything-brave` on CDP port 9333 (`https://flow.google.com/u/2/project/24c0dc82-1ebf-44b1-80e8-038e66c9b6bc`).
- 38 Google Flow credits currently remaining on the session (krip401@gmail.com).
- Tab 3 prompt box had an old terracotta block ingredient attached (`[aria-label='Ingredient']`). Ensure you create a fresh project or clear that ingredient before submitting prompts.
- Set aspect ratio to 16:9 landscape.
- Budget credits carefully (e.g. 6 credits for 360p 6s, or check 720p cost).
- If Google Flow has any issues (credit exhaustion, generation failure, or non-looping output), you can use ffmpeg with crossfade filter (`-filter_complex`) or generate procedural loop frames (e.g., node-canvas / three / canvas / python) and encode via `ffmpeg` to ensure a 100% flawless seamless loop with valid MP4 container (`-movflags +faststart`, H.264, AAC or no audio, <10MB).

Verification requirements:
- Verify both files exist, non-zero bytes, valid MP4 headers.
- Inspect with `ffprobe` / `ffmpeg` for resolution, duration, bitrate, and container validity.
- Write full details and verification results to `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/worker_m2_videos/handoff.md`.
- Send completion message to parent when done.
