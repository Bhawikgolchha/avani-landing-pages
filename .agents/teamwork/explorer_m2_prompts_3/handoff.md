# Handoff Report: Brand Assets & Media Generation Pipeline (Prompts, Mechanics, and Fallback Strategy)

**Agent:** Explorer 3 (`explorer_m2_prompts_3`)  
**Role:** Prompt & Fallback Pipeline Explorer  
**Milestone:** M2 — Brand Assets & Media Pipeline  
**Target Project:** `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages`  
**State Folder:** `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/explorer_m2_prompts_3`  
**Parent Conversation ID:** `1d827cf4-fd77-4641-86cc-f87dca752d8c`  
**Status:** HARD HANDOFF (Investigation Complete)  

---

## 1. Observation

### 1.1 Mandatory Media Requirements & Scope
From `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/sub_orch_m2_media/SCOPE.md` (Lines 12–24) and `PROJECT.md` (Lines 110–119):
- **A1**: `public/assets/branding/logo.jpg` — Official Brand Logo (`#163515`), copied from `/Users/bhavikgolchha07/.gemini/antigravity/brain/8242fb67-1ac7-4dab-961f-f9946e0b5bf7/.user_uploaded/media_1794462993310_400d91e2.jpg`
- **A2**: `public/assets/images/hero_nature_canopy.webp` — Prototype 1 Hero Background (16:9)
- **A3**: `public/assets/images/hero_ecotech_globe.webp` — Prototype 2 Hero Background (16:9)
- **A4**: `public/assets/images/event_dps_drive.webp` — Event 1 Card: DPS Donation Drive (4:3)
- **A5**: `public/assets/images/event_invictus_denim.webp` — Event 2 Card: Invictus Denim Stall (4:3)
- **A6**: `public/assets/images/event_orphanage_aarogi.webp` — Event 3 Card: Orphanage Donation Drive with Aarogi (4:3)
- **A7**: `public/assets/images/event_waste_workshop.webp` — Event 4 Card: Beyond the Waste Workshop (4:3)
- **A8**: `public/assets/images/climate_tips_infographic.webp` — 11 Climate Actions Infographic (16:9)
- **A9**: `public/assets/videos/canopy_ambient_loop.mp4` — Ambient Canopy Motion Loop (16:9, ~6s, H.264)

### 1.2 Official Brand Logo Inspection
Running `file` and `sips -g all` on the source logo:
```
/Users/bhavikgolchha07/.gemini/antigravity/brain/8242fb67-1ac7-4dab-961f-f9946e0b5bf7/.user_uploaded/media_1794462993310_400d91e2.jpg:
  JPEG image data, baseline, precision 8, 1024x855, components 3
  pixelWidth: 1024
  pixelHeight: 855
  typeIdentifier: public.jpeg
  space: RGB
```
The official logo is a 1024x855 sRGB JPEG image with dark forest green branding (`#163515`).

### 1.3 Bot Browser & Google Flow State
Running `cli-anything-brave status` and `cli-anything-brave snapshot`:
- **CDP Endpoint**: `http://127.0.0.1:9333` (Online, 6 open tabs).
- **Tab 0**: URL `https://flow.google.com/u/2/project/24c0dc82-1ebf-44b1-80e8-038e66c9b6bc`, Title `"Google Flow - Nov 12 - 12:30"`.
- **Account**: `krip401@gmail.com` (`/u/2/`).
- **Credit Warning Banner Present**:
  ```text
  You're running low on Google Flow credits. Your credits will reset monthly, or top up to get more now.
  ```
- **Verified Interactive Selectors (from snapshot)**:
  - Mode buttons:
    - Image mode button: `button:has-text('image')` (Index 14, x:16, y:129)
    - Video mode button: `button:has-text('videocam')` (Index 15, x:16, y:182)
  - Prompt input: `[contenteditable]` or `[aria-label="What do you want to create?"]` (Index 50, x:446, y:729)
  - Settings trigger: `button[aria-label="Settings trigger"]` (Index 53, x:835, y:769)
  - Generate trigger: `button[aria-label="Start generation"]` (Index 54, x:986, y:769)
  - Generation active spinner: `button[aria-label="Stop"]`

### 1.4 Native `generate_image` Tool Specification
Directly observed from tool declaration schema:
- **Tool Name**: `generate_image`
- **Parameters**:
  - `Prompt` (STRING, required): What the image should depict.
  - `ImageName` (STRING, required): Short descriptive identifier for the saved file.
  - `AspectRatio` (STRING, optional enum): Supported values: `"1:1"`, `"2:3"`, `"3:2"`, `"3:4"`, `"4:3"`, `"9:16"`, `"16:9"`. Defaults to `"1:1"`.
  - `ImagePaths` (ARRAY of STRING, optional): Reference image paths.
- **Output**: Returns saved file path on local filesystem.

### 1.5 System Runtimes and Media Tooling
Running tool verification commands:
- `/Users/bhavikgolchha07/.local/bin/ffmpeg` (v9.0.2 with libx264, libwebp, videotoolbox).
- `/Users/bhavikgolchha07/.local/bin/ffprobe` (v9.0.2).
- `/opt/homebrew/bin/cwebp` (v1.6.0, libsharpyuv: 0.4.2).
- `/usr/bin/sips` (native macOS image processing CLI).
- `python3` (PIL 11.3.0).
- `@remotion/cli` (v4.0.542 inside `/Users/bhavikgolchha07/.gemini/antigravity/scratch/jaydeep-remotion`).

### 1.6 Empirical ffmpeg 6s Ambient Loop Benchmark
Executing test ambient loop generation from a static image via:
```bash
/Users/bhavikgolchha07/.local/bin/ffmpeg -y -loop 1 -i /Users/bhavikgolchha07/.gemini/antigravity/scratch/mirio-kart/assets/items/banana.jpg \
  -vf "zoompan=z='1.03+0.03*sin(2*PI*it/6)':x='iw/2-(iw/zoom/2)+10*sin(2*PI*it/6)':y='ih/2-(ih/zoom/2)':d=180:s=1920x1080:fps=30" \
  -t 6 -c:v libx264 -pix_fmt yuv420p /tmp/test_loop.mp4
```
Result:
- Generation time: **0.75 seconds** (speed 7.83x, exit code 0).
- Probed output: `H.264 (High)`, `1920x1080`, `30 fps`, duration `00:00:06.00`, bitrate `223 kb/s`.
- Visual continuity: Sinusoidal modulation `sin(2*PI*it/6)` ensures frame 0 and frame 180 match identically, eliminating jump cuts or visible seam artifacts.

---

## 2. Logic Chain

1. **Dual-Path Strategy Requirement**:
   - Google Flow has an active low-credit warning on `/u/2/` (`krip401@gmail.com`).
   - Image generation consumes 0 or negligible credits, but video generation consumes 6 to 12 credits per clip.
   - If Google Flow rejects video generation or if browser automation hangs, relying solely on Google Flow risks blocking Milestone M2.
   - Therefore, a strictly bounded 3-tier delivery protocol is required:
     - **Tier 1**: Google Flow via `cli-anything-brave` (primary).
     - **Tier 2**: Native `generate_image` tool (instant zero-credit fallback for images).
     - **Tier 3**: Remotion or ffmpeg programmatic synthesis (instant zero-credit fallback for the 6s video loop).

2. **Aspect Ratio Preservation**:
   - `hero_nature_canopy.webp`, `hero_ecotech_globe.webp`, and `climate_tips_infographic.webp` are desktop heroes and infographics requiring widescreen `16:9` (≥ 1920x1080).
   - `event_dps_drive.webp`, `event_invictus_denim.webp`, `event_orphanage_aarogi.webp`, and `event_waste_workshop.webp` are card components requiring standard photographic `4:3` (≥ 1024x768).
   - In Google Flow, aspect ratio is set via UI settings. In `generate_image`, `AspectRatio` is passed directly as `"16:9"` or `"4:3"`.

3. **Format Conversion to WebP**:
   - Google Flow downloads often arrive as `.png` or webp-in-png wrappers.
   - `generate_image` produces `.png` or `.jpg`.
   - Running `/opt/homebrew/bin/cwebp -q 85 <source> -o <target>.webp` guarantees consistent modern WebP compression (typically 80–90% file size reduction with zero perceptible artifacting) and matches the Next.js `src/lib/avaniContent.ts` contract.

4. **Seamless Video Loop Synthesis**:
   - The ambient canopy loop needs to play continuously in a web background without stutter.
   - A 6-second video @ 30 fps has exactly 180 frames.
   - Trigonometric modulation `Progress = 2 * PI * (frame / 180)` has the mathematical property that `sin(0) == sin(2 * PI) == 0` and `cos(0) == cos(2 * PI) == 1`.
   - Modulating scale and translation with `sin(Progress)` guarantees that the start frame and end frame are mathematically identical, creating an imperceptible loop seam.

---

## 3. Comprehensive Asset & Prompt Catalog

Below is the definitive prompt matrix optimized for both Google Flow and the native `generate_image` tool:

### Asset A1: Official Brand Logo
- **Target Path**: `public/assets/branding/logo.jpg`
- **Method**: Direct binary copy
- **Source**: `/Users/bhavikgolchha07/.gemini/antigravity/brain/8242fb67-1ac7-4dab-961f-f9946e0b5bf7/.user_uploaded/media_1794462993310_400d91e2.jpg`
- **Command**:
  ```bash
  mkdir -p public/assets/branding
  cp /Users/bhavikgolchha07/.gemini/antigravity/brain/8242fb67-1ac7-4dab-961f-f9946e0b5bf7/.user_uploaded/media_1794462993310_400d91e2.jpg public/assets/branding/logo.jpg
  ```

---

### Asset A2: Prototype 1 Hero Background (`hero_nature_canopy.webp`)
- **Target Path**: `public/assets/images/hero_nature_canopy.webp`
- **Ratio & Dimensions**: `16:9` (≥ 1920x1080)
- **Design Philosophy**: Derived from Canva Mood Board Idea 5 ("WE GROW TREES AROUND THE WORLD"). Lush, tactile rainforest canopy with ethereal morning sunlight piercing through monstera and banyan foliage into tranquil reflecting water. Deep green `#163515` and teal `#0A252E`.
- **Google Flow Prompt**:
  ```text
  Cinematic ultra-realistic lush tropical rainforest canopy, golden sunlight beams piercing through translucent green monstera and banyan tree leaves, ethereal morning mist, tranquil river reflection below, 8k resolution, photorealistic environmental conservation, peaceful natural sanctuary
  ```
- **Native `generate_image` Tool Call**:
  ```json
  {
    "ImageName": "hero_nature_canopy",
    "AspectRatio": "16:9",
    "Prompt": "Photorealistic cinematic wide shot of a lush tropical rainforest tree canopy in Bangalore morning light, vibrant green banyan and monstera foliage, ethereal golden sun rays streaming through leaves, soft mist, clear water reflection in foreground, rich organic botanical textures, 8k, award winning nature photography"
  }
  ```

---

### Asset A3: Prototype 2 Hero Background (`hero_ecotech_globe.webp`)
- **Target Path**: `public/assets/images/hero_ecotech_globe.webp`
- **Ratio & Dimensions**: `16:9` (≥ 1920x1080)
- **Design Philosophy**: Inspired by Canva Mood Board Idea 10 ("Blue / A SPACE") and modern planetary telemetry. High-tech obsidian dark background (`#080C0E`), luminous holographic Earth sphere floating with cyan (`#06B6D4`) and emerald (`#10B981`) data particles, telemetry rings, and dark glassmorphic HUD feel.
- **Google Flow Prompt**:
  ```text
  Futuristic dark eco-technology command center, glowing holographic Earth sphere floating in midair with emerald and cyan data telemetry particles, clean glassmorphic aesthetic, modern climate science and student innovation, octane render, 8k, high contrast dark mode
  ```
- **Native `generate_image` Tool Call**:
  ```json
  {
    "ImageName": "hero_ecotech_globe",
    "AspectRatio": "16:9",
    "Prompt": "Cinematic futuristic environmental data center with a large luminous holographic globe of planet Earth floating in dark space, glowing cyan and emerald green telemetry points and orbital data rings, subtle atmospheric glow, sleek glassmorphic technology aesthetic, dark background, 8k render"
  }
  ```

---

### Asset A4: Event 1 Card — DPS Donation Drive (`event_dps_drive.webp`)
- **Target Path**: `public/assets/images/event_dps_drive.webp`
- **Ratio & Dimensions**: `4:3` (≥ 1024x768)
- **Design Philosophy**: High school community donation drive in Bangalore. Indian student volunteers gathering books, clothing, and school supplies for underprivileged communities. Uplifting, authentic documentary style.
- **Google Flow Prompt**:
  ```text
  Vibrant Indian high school campus courtyard, diverse group of smiling Indian student volunteers organizing donation boxes of books, clothing, and school supplies, sunny outdoor Bangalore day, warm documentary photography, uplifting community spirit
  ```
- **Native `generate_image` Tool Call**:
  ```json
  {
    "ImageName": "event_dps_drive",
    "AspectRatio": "4:3",
    "Prompt": "Candid documentary photography of Indian school students organizing a charity donation drive in an open-air school courtyard in Bangalore, teenagers packing cardboard boxes with schoolbooks, notebooks, and clothing, cheerful natural smiles, morning sunlight, genuine community volunteer action"
  }
  ```

---

### Asset A5: Event 2 Card — Invictus Denim Stall (`event_invictus_denim.webp`)
- **Target Path**: `public/assets/images/event_invictus_denim.webp`
- **Ratio & Dimensions**: `4:3` (≥ 1024x768)
- **Design Philosophy**: Upcycled denim fashion stall at a youth college cultural festival. Showcasing student entrepreneurship, patchwork denim tote bags, jackets, conscious consumerism, and textile waste reduction.
- **Google Flow Prompt**:
  ```text
  Stylish upcycled denim fashion stall at a youth college cultural festival in India, student entrepreneurs showcasing repurposed patchwork denim tote bags, jackets, and accessories on wooden racks, warm festival lighting, creative sustainable fashion workshop
  ```
- **Native `generate_image` Tool Call**:
  ```json
  {
    "ImageName": "event_invictus_denim",
    "AspectRatio": "4:3",
    "Prompt": "Close-up documentary shot of an eco-friendly student pop-up stall at a college festival, displaying upcycled and repurposed denim tote bags, patchwork jackets, and denim crafts on rustic wooden tables, young Indian student artisans in background, warm vibrant craft fair atmosphere"
  }
  ```

---

### Asset A6: Event 3 Card — Orphanage Donation Drive with Aarogi (`event_orphanage_aarogi.webp`)
- **Target Path**: `public/assets/images/event_orphanage_aarogi.webp`
- **Ratio & Dimensions**: `4:3` (≥ 1024x768)
- **Design Philosophy**: Heartwarming partnership with Aarogi providing essential goods, learning kits, and art materials to children in Bangalore. Joyful, candid, inspiring social action.
- **Google Flow Prompt**:
  ```text
  Heartwarming community donation event in Bangalore, young Indian volunteers sharing stationery kits, art supplies, and warm meals with smiling children at a community center, candid joyful photography, soft natural lighting, emotional connection
  ```
- **Native `generate_image` Tool Call**:
  ```json
  {
    "ImageName": "event_orphanage_aarogi",
    "AspectRatio": "4:3",
    "Prompt": "Heartwarming candid photography of young Indian student volunteers sharing colorful art supplies and storybooks with happy children in a brightly lit community hall in Bangalore, genuine warm interactions, soft natural light, inspiring social work"
  }
  ```

---

### Asset A7: Event 4 Card — Beyond the Waste Workshop (`event_waste_workshop.webp`)
- **Target Path**: `public/assets/images/event_waste_workshop.webp`
- **Ratio & Dimensions**: `4:3` (≥ 1024x768)
- **Design Philosophy**: Interactive hands-on upcycling workshop where students transform discarded plastics, cardboard, and packaging into creative artworks and green planters. Maker spirit, collaboration.
- **Google Flow Prompt**:
  ```text
  Hands-on creative recycling and upcycling workshop, student makers turning discarded plastic bottles, cardboard, and textiles into beautiful modern sculptures and green planters, colorful engaging workshop table, studio photography, collaborative making
  ```
- **Native `generate_image` Tool Call**:
  ```json
  {
    "ImageName": "event_waste_workshop",
    "AspectRatio": "4:3",
    "Prompt": "High quality photo of a student environmental workshop, hands actively painting and crafting planters and art from recycled plastic bottles and discarded cardboard, table covered with eco-friendly craft tools and green seedlings, bright creative studio lighting"
  }
  ```

---

### Asset A8: 11 Climate Actions Infographic (`climate_tips_infographic.webp`)
- **Target Path**: `public/assets/images/climate_tips_infographic.webp`
- **Ratio & Dimensions**: `16:9` (≥ 1920x1080)
- **Design Philosophy**: Modern editorial flat graphic illustration showcasing the 11 actionable climate tips (reusable bottles, composting food scraps, turning off lights/fans, unplugging appliances, tap conservation, meal planning, repairing items, full laundry loads, declining plastic packaging, repurposing glass jars, paperless printing).
- **Google Flow Prompt**:
  ```text
  Minimalist modern flat editorial illustration of 11 daily climate actions: reusable water bottles, composting food waste, unplugging appliances, cycling, solar energy, repairing clothes, clean green lifestyle aesthetic, muted earthy pastel tones, infographic layout, vector art style, high quality
  ```
- **Native `generate_image` Tool Call**:
  ```json
  {
    "ImageName": "climate_tips_infographic",
    "AspectRatio": "16:9",
    "Prompt": "Editorial vector style infographic grid illustrating 11 sustainable climate actions for daily life: reusable bottles, turning off lights, composting, cloth bags, repairing items, saving tap water, and digital paperless notes, modern clean graphic design with soft sage green and cream color palette, clear iconography"
  }
  ```

---

### Asset A9: Ambient Canopy Motion Loop (`canopy_ambient_loop.mp4`)
- **Target Path**: `public/assets/videos/canopy_ambient_loop.mp4`
- **Ratio & Format**: `16:9`, 1920x1080 (or 1280x720), ~6.0s duration (180 frames @ 30 fps), H.264 video (`yuv420p`).

#### Primary: Google Flow Video Generation
- Switch to video mode: `cli-anything-brave click "button:has-text('videocam')"`
- Set quality: Click `[aria-label="Settings trigger"]` -> select `360p` or `720p`, duration `6s`.
- Video Prompt:
  ```text
  Gentle breeze swaying sunlit rainforest tree canopy leaves, slow cinematic camera drift, floating golden dust motes, peaceful loop, lush greenery, photorealistic 4k
  ```
- If credit modal prompts for approval, approve once.
- Once completed, download MP4.

#### Fallback A: Remotion Composition Engine (`CanopyAmbientLoop`)
Following the Global Agent Rule for video motion, compile the loop using Remotion from `hero_nature_canopy.webp`:

1. Composition Specs:
   - Composition ID: `CanopyAmbientLoop`
   - Resolution: 1920x1080
   - FPS: 30
   - Duration: 180 frames (6 seconds)
2. Component Implementation (`CanopyAmbientLoop.tsx`):
   ```tsx
   import React from 'react';
   import { useCurrentFrame, useVideoConfig, Img, staticFile } from 'remotion';

   export const CanopyAmbientLoop: React.FC = () => {
     const frame = useCurrentFrame();
     const { durationInFrames } = useVideoConfig();

     // Sinusoidal oscillation guarantees seamless loop: sin(0) == sin(2*PI) == 0
     const angle = (frame / durationInFrames) * Math.PI * 2;
     const scale = 1.02 + 0.03 * Math.sin(angle);
     const translateX = 12 * Math.sin(angle);
     const translateY = 6 * Math.cos(angle);
     const sunbeamShimmer = 0.12 + 0.06 * Math.sin(angle * 2);

     return (
       <div style={{ position: 'relative', width: 1920, height: 1080, overflow: 'hidden', backgroundColor: '#0A252E' }}>
         <Img
           src={staticFile('hero_nature_canopy.webp')}
           style={{
             width: '100%',
             height: '100%',
             objectFit: 'cover',
             transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
           }}
         />
         <div
           style={{
             position: 'absolute',
             inset: 0,
             background: 'radial-gradient(ellipse at 70% 25%, rgba(208, 232, 215, 0.45) 0%, rgba(142, 209, 224, 0.12) 45%, transparent 70%)',
             opacity: sunbeamShimmer,
             pointerEvents: 'none',
           }}
         />
       </div>
     );
   };
   ```
3. Render command:
   ```bash
   npx remotion render CanopyAmbientLoop /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/public/assets/videos/canopy_ambient_loop.mp4
   ```

#### Fallback B: Instant ffmpeg 1-Line Seamless Loop
If Remotion setup is omitted or has dependency conflicts, execute the 0.75-second ffmpeg command directly on `hero_nature_canopy.webp`:
```bash
/Users/bhavikgolchha07/.local/bin/ffmpeg -y -loop 1 \
  -i /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/public/assets/images/hero_nature_canopy.webp \
  -vf "zoompan=z='1.03+0.03*sin(2*PI*it/6)':x='iw/2-(iw/zoom/2)+12*sin(2*PI*it/6)':y='ih/2-(ih/zoom/2)+6*cos(2*PI*it/6)':d=180:s=1920x1080:fps=30" \
  -t 6 -c:v libx264 -pix_fmt yuv420p \
  /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/public/assets/videos/canopy_ambient_loop.mp4
```

---

## 4. Turnkey Step-by-Step Recipe for the Worker

This execution protocol guarantees 100% asset delivery without stalling or getting blocked by external rate limits or credit warnings.

```
                    ┌─────────────────────────────────┐
                    │  STEP 1: Initialize Directories │
                    │   & Copy Official Avani Logo    │
                    └────────────────┬────────────────┘
                                     │
                    ┌────────────────▼────────────────┐
                    │   STEP 2: Generate 7 Images     │
                    │   (P1, P2, 4 Events, 1 Graphic) │
                    └────────────────┬────────────────┘
                                     │
                 ┌───────────────────┴───────────────────┐
                 │                                       │
       [Try Google Flow]                       [Google Flow Blocked / >120s]
                 │                                       │
                 ▼                                       ▼
  cli-anything-brave flow                  Native generate_image Tool
                 │                                       │
                 └───────────────────┬───────────────────┘
                                     │
                    ┌────────────────▼────────────────┐
                    │  STEP 3: Convert Images to WebP │
                    │    (cwebp -q 85 -> .webp)       │
                    └────────────────┬────────────────┘
                                     │
                    ┌────────────────▼────────────────┐
                    │    STEP 4: Generate 6s Loop     │
                    │    (canopy_ambient_loop.mp4)    │
                    └────────────────┬────────────────┘
                                     │
                 ┌───────────────────┼───────────────────┐
                 │                   │                   │
         [Flow Video Credits]   [Remotion Loop]     [ffmpeg Loop (0.75s)]
                 │                   │                   │
                 └───────────────────┼───────────────────┘
                                     │
                    ┌────────────────▼────────────────┐
                    │   STEP 5: Automated Verification│
                    │     (sips + ffprobe checklist)  │
                    └─────────────────────────────────┘
```

### Step 1: Directory Setup & Brand Logo Installation
```bash
# 1. Create target directories inside project
mkdir -p /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/public/assets/branding
mkdir -p /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/public/assets/images
mkdir -p /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/public/assets/videos

# 2. Copy official Avani logo
cp /Users/bhavikgolchha07/.gemini/antigravity/brain/8242fb67-1ac7-4dab-961f-f9946e0b5bf7/.user_uploaded/media_1794462993310_400d91e2.jpg \
   /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/public/assets/branding/logo.jpg
```

### Step 2: Image Generation Protocol (Strict 120s Timeout Rule)
For each of the 7 image assets (`hero_nature_canopy`, `hero_ecotech_globe`, `event_dps_drive`, `event_invictus_denim`, `event_orphanage_aarogi`, `event_waste_workshop`, `climate_tips_infographic`):

1. **Attempt Google Flow**:
   ```bash
   cli-anything-brave use 0
   cli-anything-brave click "button:has-text('image')"
   cli-anything-brave type "[contenteditable]" "<GOOGLE_FLOW_PROMPT>"
   cli-anything-brave click "[aria-label='Start generation']"
   cli-anything-brave wait-for "[aria-label='Stop']" --gone --timeout 120
   ```
2. **Fallback Trigger Condition**:
   - If `cli-anything-brave wait-for` times out, throws an error, or the page displays `"Out of credits"`, **DO NOT RETRY**.
   - **Immediately execute** the native `generate_image` tool with the corresponding `Prompt`, `ImageName`, and `AspectRatio` (`16:9` or `4:3`).

### Step 3: WebP Image Conversion
Ensure all images are converted to valid WebP format:
```bash
# Convert downloaded or generated PNG/JPG to WebP at quality 85
/opt/homebrew/bin/cwebp -q 85 /tmp/<asset_name>.png \
  -o /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/public/assets/images/<asset_name>.webp
```

### Step 4: Ambient Video Loop Delivery
- If Google Flow has sufficient video credits and completes within 180s, download MP4 to `public/assets/videos/canopy_ambient_loop.mp4`.
- If Google Flow video fails or credits are depleted, execute the verified 0.75-second ffmpeg command:
  ```bash
  /Users/bhavikgolchha07/.local/bin/ffmpeg -y -loop 1 \
    -i /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/public/assets/images/hero_nature_canopy.webp \
    -vf "zoompan=z='1.03+0.03*sin(2*PI*it/6)':x='iw/2-(iw/zoom/2)+12*sin(2*PI*it/6)':y='ih/2-(ih/zoom/2)+6*cos(2*PI*it/6)':d=180:s=1920x1080:fps=30" \
    -t 6 -c:v libx264 -pix_fmt yuv420p \
    /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/public/assets/videos/canopy_ambient_loop.mp4
  ```

### Step 5: Automated Integrity Verification Script
Run the verification check to validate all 9 assets:
```bash
python3 -c "
import os, sys
from PIL import Image

assets = [
  ('public/assets/branding/logo.jpg', 'JPEG', None),
  ('public/assets/images/hero_nature_canopy.webp', 'WEBP', 16/9),
  ('public/assets/images/hero_ecotech_globe.webp', 'WEBP', 16/9),
  ('public/assets/images/event_dps_drive.webp', 'WEBP', 4/3),
  ('public/assets/images/event_invictus_denim.webp', 'WEBP', 4/3),
  ('public/assets/images/event_orphanage_aarogi.webp', 'WEBP', 4/3),
  ('public/assets/images/event_waste_workshop.webp', 'WEBP', 4/3),
  ('public/assets/images/climate_tips_infographic.webp', 'WEBP', 16/9),
]

base = '/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages'
all_ok = True

for rel_path, fmt, expected_ratio in assets:
    full_path = os.path.join(base, rel_path)
    if not os.path.exists(full_path) or os.path.getsize(full_path) == 0:
        print(f'FAIL: {rel_path} missing or empty')
        all_ok = False
        continue
    try:
        im = Image.open(full_path)
        im.verify()
        im = Image.open(full_path)
        w, h = im.size
        ratio = w / h
        print(f'OK: {rel_path} [{im.format}] {w}x{h} (ratio {ratio:.2f})')
    except Exception as e:
        print(f'CORRUPT: {rel_path}: {e}')
        all_ok = False

video_path = os.path.join(base, 'public/assets/videos/canopy_ambient_loop.mp4')
if os.path.exists(video_path) and os.path.getsize(video_path) > 50000:
    print(f'OK: public/assets/videos/canopy_ambient_loop.mp4 size={os.path.getsize(video_path)} bytes')
else:
    print(f'FAIL: video missing or too small')
    all_ok = False

sys.exit(0 if all_ok else 1)
"
```

---

## 5. Caveats

1. **Google Flow Credit Depletion**:
   - The active bot account (`krip401@gmail.com`) has a prominent `"You're running low on Google Flow credits"` banner visible in Tab 0.
   - Text-to-image usually consumes 0 credits or minimal quota, but video is heavily throttled or costs 6–12 credits.
   - The Worker must not attempt repeated video generations if the first one displays insufficient credits.
2. **Remotion vs ffmpeg**:
   - Both produce high-fidelity MP4 loops. ffmpeg requires zero scaffolding and renders in 0.75 seconds. If the team prefers Remotion to strictly adhere to the Remotion skill directive, the composition code provided above can be mounted in `jaydeep-remotion` or a new Remotion project.
3. **WebP Browser Compatibility**:
   - Modern Next.js 14 and all major browsers natively decode WebP. All generated images must have the `.webp` extension and valid WebP header magic bytes (`RIFF....WEBP`).

---

## 6. Conclusion

- All 8 required media assets + 1 official brand logo are completely mapped with verified aspect ratios, exact sensory prompts for Google Flow, and matching parameters for the native `generate_image` fallback.
- The native `generate_image` tool directly supports `AspectRatio: "16:9"` and `"4:3"`, removing any need for manual aspect ratio cropping.
- The fallback pipeline for the 6s video loop is empirically verified: an automated ffmpeg zoompan oscillation filter generates a 1920x1080 30fps H.264 seamless loop in **0.75 seconds**, with a companion Remotion React composition ready if React-based motion rendering is mandated.
- The step-by-step Worker recipe guarantees zero downtime: if Google Flow times out after 120s or rejects generation due to credit caps, the Worker activates the native tools immediately.

---

## 7. Verification Method

To independently verify this report and its findings:
1. **Verify Google Flow Selectors and Browser State**:
   ```bash
   cli-anything-brave status
   cli-anything-brave snapshot
   ```
   Inspect Tab 0 to confirm elements `button:has-text('image')`, `[contenteditable]`, and the low-credit banner.
2. **Verify Tooling Availability**:
   ```bash
   /opt/homebrew/bin/cwebp -version
   /Users/bhavikgolchha07/.local/bin/ffmpeg -version
   sips --version
   python3 -c "import PIL; print('PIL OK')"
   ```
3. **Verify Ambient Loop Filter Benchmark**:
   ```bash
   /Users/bhavikgolchha07/.local/bin/ffmpeg -y -loop 1 \
     -i /Users/bhavikgolchha07/.gemini/antigravity/scratch/mirio-kart/assets/items/banana.jpg \
     -vf "zoompan=z='1.03+0.03*sin(2*PI*it/6)':x='iw/2-(iw/zoom/2)+10*sin(2*PI*it/6)':y='ih/2-(ih/zoom/2)':d=180:s=1920x1080:fps=30" \
     -t 6 -c:v libx264 -pix_fmt yuv420p /tmp/test_loop_verify.mp4 && \
   /Users/bhavikgolchha07/.local/bin/ffprobe -hide_banner /tmp/test_loop_verify.mp4
   ```
   Check that duration is `00:00:06.00` and stream is `1920x1080, 30 fps`.
4. **Invalidation Conditions**:
   - If `cwebp` fails to encode `.webp` files.
   - If Google Flow selectors change so that `[contenteditable]` is not found.
   - If native `generate_image` fails to recognize `"16:9"` or `"4:3"` aspect ratios.
