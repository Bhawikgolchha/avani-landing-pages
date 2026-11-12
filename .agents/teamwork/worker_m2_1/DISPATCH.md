## 2026-11-12T10:01:06Z
You are the Asset Pipeline Worker for Milestone M2 (Brand Assets & Media Pipeline) of the Avani Landing Pages project.

Working Directory: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages
Your State Folder: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/worker_m2_1/
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
1. Ensure the directories exist:
   `mkdir -p public/assets/branding public/assets/images`

2. Copy the official Avani logo:
   Source: `/Users/bhavikgolchha07/.gemini/antigravity/brain/8242fb67-1ac7-4dab-961f-f9946e0b5bf7/.user_uploaded/media_1794462993310_400d91e2.jpg`
   Destination: `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/public/assets/branding/logo.jpg`
   Verify file size > 0 and format is valid JPEG.

3. Generate all required images in WebP format (`public/assets/images/`):
   You can generate high-fidelity images using the native `generate_image` tool (or Google Flow via `cli-anything-brave` on CDP port 9333 if active), and convert them to valid WebP format (using python Pillow `PIL.Image.save(..., 'WEBP', quality=85)`, `sips`, or `cwebp`):

   a. `public/assets/images/hero_nature_canopy.webp`:
      Prompt: "Lush tropical rainforest canopy with soft golden sunbeams filtering through translucent emerald and tea-green leaves, soft glowing biological spores floating in misty air, tranquil organic botanical serenity, high-resolution nature photography, cinematic lighting, 16:9 aspect ratio."
   
   b. `public/assets/images/hero_ecotech_globe.webp`:
      Prompt: "Holographic Earth biosphere composed of luminous digital emerald green and cyan light particles, surrounded by delicate orbital telemetry rings and glowing data matrices, dark editorial space backdrop, futuristic eco-technology concept, 16:9 aspect ratio."

   c. `public/assets/images/event_dps_drive.webp`:
      Prompt: "Vibrant high school environmental donation drive at Delhi Public School Bangalore, energetic students collecting and sorting used clothes and books into labeled recycled cardboard boxes, sunny school courtyard, authentic documentary photo style, 16:9 aspect ratio."

   d. `public/assets/images/event_invictus_denim.webp`:
      Prompt: "Artisan youth craft stall at an outdoor school carnival festival showcasing stylish upcycled denim tote bags, pouches, and recycled textile fashion accessories, handcrafted sustainable student brand stall called Invictus, bright daytime festival lighting, 16:9 aspect ratio."

   e. `public/assets/images/event_orphanage_aarogi.webp`:
      Prompt: "Heartwarming charity donation drive event with Aarogi NGO and student volunteers handing over educational care packages, storybooks, and essential supplies to smiling children at a community center in Bangalore, uplifting emotional atmosphere, 16:9 aspect ratio."

   f. `public/assets/images/event_waste_workshop.webp`:
      Prompt: "Hands-on environmental workshop titled 'Beyond the Waste' where students learn waste segregation, indoor composting, and planting seedlings in upcycled containers, wooden workshop table with potting soil and saplings, educational community event, 16:9 aspect ratio."

   g. `public/assets/images/climate_tips_infographic.webp`:
      Prompt: "Modern, clean visual infographic card illustrating actionable everyday climate tips: energy conservation, water saving, zero waste habits, public transit, and tree planting, elegant minimalist ecological vector graphics with emerald green accents, 16:9 aspect ratio."

4. Verification:
   - For every single asset (logo.jpg and all 7 .webp files), verify:
     - File exists at exact expected path
     - File size is non-zero (greater than 5KB)
     - Valid file headers (using `file <path>` or python `PIL.Image.open()`)
     - Correct dimensions and aspect ratios

5. Write a comprehensive completion report to `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/worker_m2_1/handoff.md` and send a message back to parent orchestrator with a summary of generated assets and verification stats.
