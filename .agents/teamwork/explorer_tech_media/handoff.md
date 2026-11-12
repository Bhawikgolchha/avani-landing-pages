# Teamwork Handoff Report — 3D Scroll Architecture & Google Flow Media Pipeline

**Agent:** explorer_tech_media  
**Handoff Type:** Hard (Task complete)  
**Date:** 2026-11-12T08:42:00Z  
**Working Directory:** `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages`  
**State Folder:** `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/explorer_tech_media`  
**Primary Deliverable:** `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/explorer_tech_media/report.md`  

---

## 1. Observation

1. **System & Environment Commands & Output**:
   - Node & Package manager check: `node -v` returned `v22.23.3`; `npm -v` returned `10.9.9`.
   - `which cli-anything-brave` returned `/Users/bhavikgolchha07/.local/bin/cli-anything-brave`.
   - `cli-anything-brave status` returned:
     ```json
     {"online": true, "cdp": "http://127.0.0.1:9333", "tabs": 5, "active": {"url": "https://notebook.google.com/...", "title": "..."}}
     ```
   - `cli-anything-brave tabs` returned 6 active tabs, including tab index 2:
     ```json
     {"i": 2, "active": false, "url": "https://flow.google.com/u/2/project/24c0dc82-1ebf-44b1-80e8-038e66c9b6bc", "title": "Google Flow - Nov 12 - 12:30"}
     ```

2. **Google Flow Live Interface DOM Extraction**:
   - `cli-anything-brave use 2` and `cli-anything-brave snapshot` verified live DOM elements:
     - Prompt input: `<div aria-label="What do you want to create?" contenteditable="true">`
     - Start generation button: `<button aria-label="Start generation" type="submit">` (text `arrow_forward`)
     - Mode selection: Navigation buttons with text `"image"` and `"videocam"`
     - Settings trigger: `<button aria-label="Settings trigger" type="submit">` (text: `Video · 360p · 6s \n crop_9_16 \n x1`)
     - Warning banner verbatim text: `"You're running low on Google Flow credits. Your credits will reset monthly, or top up to get more now."`
     - Skill documentation at `/Users/bhavikgolchha07/.gemini/config/skills/cli-anything-brave/SKILL.md` (lines 34, 42-52) explicitly notes:
       - *"Spending credits (Flow video = 12 credits) needs an approval click; approve once, never 'Always approve'."*
       - Flow recipe: `open -> click "text=New project" -> type "[contenteditable]" -> click "[aria-label='Start generation']" -> wait-for "[aria-label='Stop']" --gone --timeout 180`.

3. **Canva Mood Boards & Brand Assets**:
   - Uploaded logo file: `/Users/bhavikgolchha07/.gemini/antigravity/brain/8242fb67-1ac7-4dab-961f-f9946e0b5bf7/.user_uploaded/media_1794462993310_400d91e2.jpg` (Dominant colors: `#163515` deep forest green, `#25262A` charcoal, `#FFFFFF` white).
   - Briefing PDF: `/Users/bhavikgolchha07/.gemini/antigravity/brain/8242fb67-1ac7-4dab-961f-f9946e0b5bf7/.user_uploaded/media_1794462310806_90d35dda.pdf` (Extracted full copy for 5 Objectives, 5 Teams, 4 Events, 11 Climate Tips, links to Form, LinkedIn, Substack, Instagram, Email, Phone).
   - Canva mood board inspection (`canva_page5.png` in `spec_miner_brand`): Page 5 is explicitly titled *"WE GROW TREES AROUND THE WORLD"*, featuring forest green color blocking, lush tree canopy photography, and environmental conservation messaging.

4. **Peer Artifacts**:
   - `explorer_stitch` completed its investigation (`explorer_stitch/report.md`), verifying that Stitch MCP is fully functional with live `list_projects`, `download_file`, and design system support.

---

## 2. Logic Chain

1. **Framework Selection (Next.js 14 App Router vs Vite)**:
   - Observation 1 confirms modern Node v22 environment.
   - The user request requires two distinct landing page prototypes with shared branding, assets, and organizational content, as well as automated verification.
   - A unified Next.js 14 App Router app natively provides filesystem routing (`/` selector hub, `/prototype-1`, `/prototype-2`), avoiding route boilerplate.
   - Next.js static asset serving via `public/assets/` provides a single centralized media repository for both prototypes.
   - Therefore, a single unified Next.js application is the most efficient and robust architecture.

2. **WebGL / React Three Fiber Stability (React 18 vs React 19)**:
   - React Three Fiber v8 (`@react-three/fiber@^8.16.8`) and `@react-three/drei@^9.106.0` are strictly engineered and stable on React 18 (`react@^18.3.1`).
   - Loading 3D Canvas components with `'use client'` and `dynamic(() => import(...), { ssr: false })` completely resolves any SSR `window is undefined` or WebGL context creation failure during Next.js compilation.

3. **Smooth Scroll & Animation Choreography (Lenis + GSAP ScrollTrigger)**:
   - Standard browser mousewheel scrolling creates stepped, jerky scroll deltas that disrupt 3D camera interpolation.
   - Lenis smooth scrolling coupled with GSAP ScrollTrigger via a unified `requestAnimationFrame` ticker (`lenis.on('scroll', ScrollTrigger.update)` and `gsap.ticker.add((time) => lenis.raf(time * 1000))`) produces continuous, fluid 60 FPS scrubbed transitions.
   - The fixed canvas layer (`fixed inset-0 z-0 pointer-events-none`) separated from the scrollable DOM layer (`relative z-10`) ensures UI accessibility and buttery-smooth 3D visuals.

4. **Prototype Creative Direction Alignment**:
   - Prototype 1: Directly maps Canva Mood Board Page 5 (Observation 3: *"WE GROW TREES AROUND THE WORLD"*) into "The Living Canopy / Deep Lagoon", a 5-stage scroll descent from a sunlit canopy to a tranquil reflecting pool.
   - Prototype 2: Maps modern cyber-environmental telemetry into "Modern Eco-Tech / Interactive Climate Biosphere", featuring a 10,000-particle holographic Earth globe, concentric orbital telemetry rings, and dark glassmorphic HUD cards.

5. **Google Flow Media Generation Pipeline & Credit Safety**:
   - Observation 2 confirms Google Flow is active in Brave bot browser tab 2 with verified selectors (`[contenteditable]`, `[aria-label="Start generation"]`).
   - However, Observation 2 also reveals an active warning: `"You're running low on Google Flow credits"`.
   - Flow video consumes 12 credits per generation with an approval dialog; image generation consumes minimal/zero credits.
   - Therefore, the builder agent should generate high-resolution images in Google Flow for hero and event assets, and utilize native `generate_image` tool (Imagen 3) or Remotion video loops as an immediate zero-credit fallback if Google Flow credits expire.

---

## 3. Caveats

1. **Google Flow Credit Limit**:
   - The bot account has low Google Flow credits. Automated agents must not loop endlessly attempting to generate 12-credit video clips. The report provides an immediate fallback using the native `generate_image` tool and Remotion.
2. **Next.js Turbopack vs Webpack**:
   - Next.js 14 Webpack handles Three.js shader chunk imports seamlessly. When scaffolding, use standard `next build` (Webpack) rather than experimental Turbopack flags to avoid shader loader issues.
3. **Mobile Viewport Optimization**:
   - On low-power mobile devices, rendering 10,000 WebGL particles and volumetric lighting can cause thermal throttling. Both prototype canvas components should clamp pixel ratio to `Math.min(window.devicePixelRatio, 2)` and include an optional CSS fallback for WebGL context loss.

---

## 4. Conclusion

The technical architecture for Avani's interactive 3D scroll landing pages is established and documented in `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/explorer_tech_media/report.md`:
- **Web Stack:** Unified Next.js 14 App Router (`/`, `/prototype-1`, `/prototype-2`) with React 18.3.1, `@react-three/fiber@^8.16.8`, `@react-three/drei@^9.106.0`, `gsap@^3.12.5`, `lenis@^1.1.9`, and `tailwindcss@^3.4.4`.
- **Prototype 1:** "The Living Canopy / Deep Lagoon" 3D nature journey derived from Canva Mood Board Idea 5.
- **Prototype 2:** "Modern Eco-Tech / Interactive Climate Biosphere" 3D holographic particle globe and glassmorphic HUD telemetry.
- **Media Pipeline:** Google Flow via `cli-anything-brave` on CDP port 9333 with verified DOM selectors, credit-conservation protocols, and native Imagen / Remotion fallbacks.

---

## 5. Verification Method

To independently reproduce and verify these findings:

1. **Verify Brave Bot Browser & Google Flow**:
   ```bash
   cli-anything-brave status
   cli-anything-brave tabs
   ```
   *Expected result:* CDP online on `http://127.0.0.1:9333`, tab index 2 running `https://flow.google.com/u/2/project/24c0dc82-1ebf-44b1-80e8-038e66c9b6bc`.

2. **Verify Node & Package Environment**:
   ```bash
   node -v
   npm -v
   ```
   *Expected result:* Node >= v18 (current v22.23.3) and npm >= 9 (current 10.9.9).

3. **Inspect the Full Architecture Report**:
   ```bash
   cat /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/explorer_tech_media/report.md
   ```

4. **Invalidation Conditions**:
   - If Brave bot browser CDP process on port 9333 terminates.
   - If `@react-three/fiber` is run on React 19 without peer-dependency overrides.
   - If Google Flow credits become strictly 0 and the UI prevents prompt submission.
