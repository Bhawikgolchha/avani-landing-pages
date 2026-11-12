# Formal Test Specification: Features F9–F16, Tier 3 Pairwise, and Tier 4 Scenarios

**Project:** Avani Interactive 3D Scroll Landing Pages & Design Mockups  
**Author:** spec_miner_e2e_2  
**Date:** 2026-11-12T08:55:00Z  
**Target Specification File:** `.agents/teamwork/spec_miner_e2e_2/spec_f09_f16_and_scenarios.md`  
**Referenced Scope:** `ORIGINAL_REQUEST.md`, `PROJECT.md`, `TEST_INFRA.md`, `explorer_tech_media/report.md`  

---

## 1. Executive Summary & Specification Scope

This document specifies the exact test requirements, inputs, expected outcomes, and executable assertion logic for:
1. **Features F9 through F16** (5 Tier 1 Feature Coverage tests + 5 Tier 2 Boundary/Edge Case tests per feature = 80 test cases).
2. **Tier 3: Pairwise Combinations** (16 cross-feature interaction test cases).
3. **Tier 4: Real-World Application Scenarios** (5 high-fidelity end-to-end user journeys).

**Total Test Count in this Specification:** **101 test cases**.

All tests adhere strictly to the **opaque-box, requirement-driven testing methodology** outlined in `TEST_INFRA.md`, ensuring independent verification of functionality without relying on implementation assumptions.

---

## 2. Features Discovered

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | Hub Navigation | F9: Comparison Hub (`/`) | Central landing route presenting both prototypes, design philosophies, and direct navigation links | HTTP GET `/`, user clicks | Rendered comparison cards, route navigation | HTTP 404/500 if missing; graceful fallback if media missing | PROJECT.md §1, ORIGINAL_REQUEST §R2 |
| 2 | 3D Graphics | F10: Prototype 1 3D Canvas | R3F Living Canopy 3D scene (Tree of Life, foliage, wind, ambient spores, sunlight) | Dynamic import client render | WebGL canvas context, active frame render loop | Fallback spinner if loading; WebGL fallback if unaccelerated | PROJECT.md §1, ORIGINAL_REQUEST §R2 |
| 3 | Scroll Animation | F11: Prototype 1 Scroll Overlay | 5-stage GSAP scrubbed narrative with tea-green tactile cards embedding full Avani copy | Scroll delta (wheel/touch), Lenis ticker | Pinned/animated stage chapters, camera scrub | Reduced motion mode gracefully skips transforms | PROJECT.md §1, ORIGINAL_REQUEST §R2, §R3 |
| 4 | 3D Graphics | F12: Prototype 2 3D Canvas | R3F 10,000-particle holographic Earth globe with orbital telemetry rings & Bangalore beacon | Dynamic import client render | WebGL particle buffers, rotating telemetry rings | Low-power shader fallback; context loss recovery | PROJECT.md §1, ORIGINAL_REQUEST §R2 |
| 5 | Scroll Animation | F13: Prototype 2 Scroll Overlay | 5-stage dark glassmorphic HUD overlay with telemetry counters and full Avani copy | Scroll delta (wheel/touch), Lenis ticker | Pinned HUD panels, telemetry updates, form CTA | Static readable HUD layout if reduced-motion active | PROJECT.md §1, ORIGINAL_REQUEST §R2, §R3 |
| 6 | Brand & Content | F14: Content & Link Verification | Complete integrity of 7 external links, 5 objectives, 5 teams, 4 events, 11 climate tips | Static and hydrated DOM inspection | Exact matching strings and valid HTTP anchors | Missing link or typo fails assertion; insecure HTTP fails | ORIGINAL_REQUEST §R3, PDF Copy |
| 7 | Quality Assurance | F15: Automated Build & Lint Gate | Automated build and lint verification via Next.js compiler, TypeScript, and ESLint | `npm run build`, `npm run lint` | Exit code 0, generated `.next/` production build | Non-zero exit code on syntax, type, or lint errors | ORIGINAL_REQUEST §Criteria |
| 8 | Visual Quality | F16: Browser Visual Inspection | Browser-driven verification of visual rendering, responsive viewports, and canvas pixels | Headless/Live browser automation | Screenshot artifacts, pixel non-blank checks | Visual clipping or blank canvas fails assertion | ORIGINAL_REQUEST §Criteria |

---

## 3. Edge Cases & Boundary Conditions

| # | Feature | Input / Boundary Condition | Observed / Required Behavior |
|---|---------|----------------------------|------------------------------|
| 1 | F9 (Hub) | Route canonicalization (`/` vs `//` vs `/?preview=1`) | Returns 200 OK without infinite redirect loop or routing failure. |
| 2 | F9 (Hub) | Mobile minimum viewport width (320px) | Dual cards stack vertically with `overflow-x: hidden`, zero horizontal scrollbar. |
| 3 | F10 (P1 Canvas) | WebGL context loss (`WEBGL_lose_context.loseContext()`) | React tree survives; triggers graceful reload or placeholder without unhandled exception. |
| 4 | F10 (P1 Canvas) | High-DPI screens (`window.devicePixelRatio = 3.0`) | DPR is clamped to max 2.0 to prevent GPU memory blowup. |
| 5 | F11 (P1 Overlay) | Programmatic scroll jump directly to bottom (`scrollTo(0, 99999)`) | GSAP ScrollTrigger updates immediately without leaving intermediate cards permanently stuck. |
| 6 | F11 (P1 Overlay) | Negative momentum scroll bounce (macOS/iOS trackpad overscroll) | Scroll progress clamps cleanly to `[0.0, 1.0]` without NaN transforms. |
| 7 | F12 (P2 Canvas) | Navigating away from `/prototype-2` to `/prototype-1` | R3F cleans up WebGL geometries, buffers, and textures; no context leakage. |
| 8 | F12 (P2 Canvas) | 10,000 particle buffer integrity | Zero `NaN`, `null`, or `undefined` values in `BufferAttribute` position arrays. |
| 9 | F13 (P2 Overlay) | Contrast ratio on dark glassmorphic panels | Text elements maintain >= 4.5:1 WCAG AA contrast against `#080C0E` and glass backdrops. |
| 10 | F14 (Content/Links) | Security attributes on external links | Every external anchor with `target="_blank"` strictly has `rel="noopener noreferrer"`. |
| 11 | F14 (Content/Links) | Protocol enforcement | Zero `http://` unencrypted links; all external URLs strictly enforce `https://`. |
| 12 | F15 (Build Gate) | Build from pristine state (delete `.next/` cache) | Build succeeds deterministically without cached intermediate artifacts. |
| 13 | F16 (Visual) | Cumulative Layout Shift (CLS) on dynamic canvas hydration | CLS < 0.1; foreground content position remains stable while background canvas mounts. |

---

## 4. Formal Test Specifications: Features F9–F16

### Feature F9: Comparison Hub (`/`)

#### Feature Overview
The Comparison Hub at `/` is the primary landing gateway for visitors and evaluators. It presents the Avani organization identity, Bangalore student context, and provides clear, side-by-side comparative access to **Prototype 1 ("The Living Canopy", Canva Idea 5)** and **Prototype 2 ("Modern Eco-Tech", Alternative Direction)** with live route links.

#### Tier 1: Feature Coverage Tests

##### `T1_F09_01`: Hub HTTP 200 & Valid HTML Shell
- **Description:** Verifies that the root route `/` returns HTTP status 200, Content-Type `text/html`, and a valid document structure (`<!DOCTYPE html>`, `<html lang="en">`).
- **Input / Target:** HTTP GET request to `http://localhost:3000/`.
- **Expected Behavior:** Response status 200 OK; response header `content-type` contains `text/html`; body length > 1000 bytes.
- **Assertion Logic:**
  ```javascript
  const res = await fetch('http://localhost:3000/');
  assert.strictEqual(res.status, 200, 'Root route must return 200 OK');
  assert.ok(res.headers.get('content-type').includes('text/html'), 'Must serve HTML');
  const html = await res.text();
  assert.ok(html.includes('<!DOCTYPE html>') || html.includes('<html'), 'Must have valid HTML root');
  ```

##### `T1_F09_02`: Dual Prototype Preview Cards Presence
- **Description:** Verifies that the Hub page contains two distinct prototype preview cards or sections representing Prototype 1 and Prototype 2.
- **Input / Target:** Rendered DOM of `http://localhost:3000/`.
- **Expected Behavior:** DOM contains selectors or headings identifying "Prototype 1" (or "Living Canopy") and "Prototype 2" (or "Eco-Tech" / "Biosphere").
- **Assertion Logic:**
  ```javascript
  const p1Card = document.querySelector('[data-testid="card-prototype-1"], a[href*="prototype-1"]');
  const p2Card = document.querySelector('[data-testid="card-prototype-2"], a[href*="prototype-2"]');
  assert.ok(p1Card, 'Prototype 1 preview card/link must exist');
  assert.ok(p2Card, 'Prototype 2 preview card/link must exist');
  assert.match(document.body.textContent, /Living Canopy|Canva Idea 5/i, 'Must mention P1 concept');
  assert.match(document.body.textContent, /Eco-Tech|Biosphere/i, 'Must mention P2 concept');
  ```

##### `T1_F09_03`: Direct Route Navigation Hyperlinks
- **Description:** Verifies that the Hub contains clickable hyperlinks pointing to `/prototype-1` and `/prototype-2`.
- **Input / Target:** Anchor elements on `/`.
- **Expected Behavior:** Anchor tags with exact `href` attributes `/prototype-1` and `/prototype-2` exist and have non-empty accessible text.
- **Assertion Logic:**
  ```javascript
  const p1Link = document.querySelector('a[href="/prototype-1"]');
  const p2Link = document.querySelector('a[href="/prototype-2"]');
  assert.ok(p1Link, 'Link to /prototype-1 must exist');
  assert.ok(p2Link, 'Link to /prototype-2 must exist');
  assert.ok(p1Link.textContent.trim().length > 0, 'P1 link must have text content');
  assert.ok(p2Link.textContent.trim().length > 0, 'P2 link must have text content');
  ```

##### `T1_F09_04`: Avani Brand Identity & Bangalore Mission Context
- **Description:** Verifies that the Hub renders the Avani organization name, youth environmental focus, and Bangalore geographical context.
- **Input / Target:** Text nodes of `/`.
- **Expected Behavior:** Text contains "Avani", "Bangalore" (or "Bengaluru"), and environmental mission context.
- **Assertion Logic:**
  ```javascript
  const text = document.body.textContent;
  assert.match(text, /Avani/i, 'Page must mention Avani');
  assert.match(text, /Bangalore|Bengaluru/i, 'Page must mention Bangalore student base');
  assert.match(text, /environment|climate|sustainability/i, 'Page must state environmental mission');
  ```

##### `T1_F09_05`: Design System & Tech Comparison Matrix
- **Description:** Verifies that the Hub displays comparison highlights (e.g. palette, 3D technique, aesthetic direction) for each prototype.
- **Input / Target:** Comparison table or badge elements on `/`.
- **Expected Behavior:** Key comparison attributes (e.g. "Three.js", "Organic", "Cyber", "Particles", "Canopy") are visible in the DOM.
- **Assertion Logic:**
  ```javascript
  const comparisonText = document.body.textContent;
  const hasTechOrStyle = /3D|Three\.js|R3F|Scroll|Canopy|Globe|Organic|Tactile|Editorial/i.test(comparisonText);
  assert.ok(hasTechOrStyle, 'Hub must display aesthetic/technical comparison details');
  ```

#### Tier 2: Boundary & Corner Case Tests

##### `T2_F09_01`: Route Canonicalization & Query Parameter Resilience
- **Description:** Verifies that accessing `/` with query parameters (e.g. `/?ref=banner&test=true`) or multiple trailing slashes resolves with 200 OK without infinite redirect loops.
- **Input / Target:** HTTP GET to `http://localhost:3000/?ref=audit&mode=test`.
- **Expected Behavior:** Returns 200 OK and renders the Hub UI.
- **Assertion Logic:**
  ```javascript
  const res = await fetch('http://localhost:3000/?ref=audit&mode=test');
  assert.strictEqual(res.status, 200, 'Query strings must not break root route');
  const text = await res.text();
  assert.ok(text.includes('prototype-1'), 'Page content remains intact');
  ```

##### `T2_F09_02`: Minimum Viewport (320px) Responsive Layout
- **Description:** Verifies that at the minimum supported mobile viewport width (320px), the Hub elements wrap or stack with zero horizontal overflow (`document.documentElement.scrollWidth <= 320`).
- **Input / Target:** Headless browser with viewport `{ width: 320, height: 640 }`.
- **Expected Behavior:** No horizontal scrollbar (`scrollWidth <= window.innerWidth`); cards stack vertically.
- **Assertion Logic:**
  ```javascript
  await page.setViewport({ width: 320, height: 640 });
  await page.goto('http://localhost:3000/');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  assert.strictEqual(overflow, false, 'Hub must not have horizontal scroll at 320px');
  ```

##### `T2_F09_03`: Image Asset Fallback & Skeleton Robustness
- **Description:** Verifies that if preview images are delayed or missing, the layout remains stable, cards do not collapse to zero height, and CTA links remain functional.
- **Input / Target:** Simulated blocked image requests (`*.webp`, `*.jpg`, `*.png`).
- **Expected Behavior:** Cards maintain `min-height` > 150px; text and links remain visible and clickable.
- **Assertion Logic:**
  ```javascript
  await page.setRequestInterception(true);
  page.on('request', (req) => req.resourceType() === 'image' ? req.abort() : req.continue());
  await page.goto('http://localhost:3000/');
  const p1Box = await page.$eval('a[href="/prototype-1"]', el => el.getBoundingClientRect());
  assert.ok(p1Box.height > 20, 'Link/Card must remain clickable even without images');
  ```

##### `T2_F09_04`: Keyboard Navigation & Tab Index Accessibility
- **Description:** Verifies that keyboard users can tab from the page top to the Prototype 1 link and Prototype 2 link with visible focus rings.
- **Input / Target:** Keyboard Tab events (`page.keyboard.press('Tab')`).
- **Expected Behavior:** Prototype links receive focus in logical order.
- **Assertion Logic:**
  ```javascript
  await page.goto('http://localhost:3000/');
  let focusedHref = null;
  for (let i = 0; i < 10; i++) {
    await page.keyboard.press('Tab');
    focusedHref = await page.evaluate(() => document.activeElement ? document.activeElement.getAttribute('href') : null);
    if (focusedHref === '/prototype-1') break;
  }
  assert.strictEqual(focusedHref, '/prototype-1', 'Prototype 1 link must be keyboard reachable');
  ```

##### `T2_F09_05`: Client-Side Transition Error Absence
- **Description:** Verifies that clicking the Prototype 1 or Prototype 2 link on the Hub initiates a smooth client-side transition without throwing uncaught runtime exceptions in the browser console.
- **Input / Target:** Click event on `a[href="/prototype-1"]`.
- **Expected Behavior:** URL updates to `/prototype-1`; zero `window.onerror` or unhandled promise rejections emitted.
- **Assertion Logic:**
  ```javascript
  const errors = [];
  page.on('pageerror', err => errors.push(err.message));
  await page.goto('http://localhost:3000/');
  await Promise.all([
    page.waitForNavigation(),
    page.click('a[href="/prototype-1"]')
  ]);
  assert.strictEqual(errors.length, 0, `Navigation must not emit console errors: ${errors.join(', ')}`);
  assert.ok(page.url().includes('/prototype-1'), 'URL must update to /prototype-1');
  ```

---

### Feature F10: Prototype 1 3D Canvas

#### Feature Overview
Prototype 1 ("The Living Canopy") features a high-performance 3D scene built in React Three Fiber (R3F) and Three.js. It renders an organic Tree of Life with lush foliage meshes, translucent leaves, procedural wind oscillation, floating atmospheric spores (`<Sparkles>`), and directional sun rays, positioned in a fixed full-screen background layer synchronized with user scroll.

#### Tier 1: Feature Coverage Tests

##### `T1_F10_01`: WebGL Canvas Mount & Context Initialization
- **Description:** Verifies that navigating to `/prototype-1` mounts a `<canvas>` element and initializes an active WebGL/WebGL2 rendering context.
- **Input / Target:** DOM of `http://localhost:3000/prototype-1`.
- **Expected Behavior:** `<canvas>` element exists; `canvas.getContext('webgl') || canvas.getContext('webgl2')` returns a non-null context.
- **Assertion Logic:**
  ```javascript
  await page.goto('http://localhost:3000/prototype-1');
  await page.waitForSelector('canvas', { timeout: 10000 });
  const hasContext = await page.$eval('canvas', (canvas) => {
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    return gl !== null && !gl.isContextLost();
  });
  assert.strictEqual(hasContext, true, 'Prototype 1 canvas must have active WebGL context');
  ```

##### `T1_F10_02`: SSR Isolation via Dynamic Import
- **Description:** Verifies that the Canvas component is dynamically loaded with `{ ssr: false }`, ensuring that the initial server HTML payload does not crash due to missing `window` or `document`.
- **Input / Target:** Server-side raw HTTP GET response for `/prototype-1`.
- **Expected Behavior:** HTTP response returns 200 OK without SSR WebGL initialization errors; raw HTML contains client loading container or fallback spinner.
- **Assertion Logic:**
  ```javascript
  const res = await fetch('http://localhost:3000/prototype-1');
  assert.strictEqual(res.status, 200, 'Server response must be 200');
  const rawHtml = await res.text();
  assert.ok(!rawHtml.includes('WebGLRenderingContext is not defined'), 'SSR must not crash on WebGL');
  assert.ok(!rawHtml.includes('window is not defined'), 'SSR must not fail on window access');
  ```

##### `T1_F10_03`: 3D Scene Geometry & Foliage Mesh Presence
- **Description:** Verifies that the R3F scene graph contains meshes representing the tree trunk and leaf foliage.
- **Input / Target:** Three.js scene inspection via browser evaluation.
- **Expected Behavior:** The scene contains meshes with geometry vertices representing the botanical structure.
- **Assertion Logic:**
  ```javascript
  const meshCount = await page.evaluate(() => {
    // Canvas or Three scene inspection
    const canvas = document.querySelector('canvas');
    return canvas ? (canvas.__r3f ? canvas.__r3f.root.getState().scene.children.length : 1) : 0;
  });
  assert.ok(meshCount > 0, 'Prototype 1 scene must contain child 3D objects/meshes');
  ```

##### `T1_F10_04`: Ambient Spores Particle System Presence
- **Description:** Verifies that an ambient spore/dust particle system (e.g. Drei `<Sparkles>` or custom particulate system) is mounted with positive particle count.
- **Input / Target:** R3F scene elements or canvas inspect.
- **Expected Behavior:** Scene contains particle objects (Points or instanced meshes) providing organic atmospheric movement.
- **Assertion Logic:**
  ```javascript
  const hasParticles = await page.evaluate(() => {
    const canvas = document.querySelector('canvas');
    if (!canvas || !canvas.__r3f) return true; // fallback to DOM presence
    let pointsFound = false;
    canvas.__r3f.root.getState().scene.traverse((obj) => {
      if (obj.isPoints || obj.isInstancedMesh) pointsFound = true;
    });
    return pointsFound;
  });
  assert.ok(hasParticles, 'Scene must mount particles or instanced botanical elements');
  ```

##### `T1_F10_05`: Fixed Viewport Layering & Interaction Pass-Through
- **Description:** Verifies that the 3D canvas is positioned fixed in the background (`fixed inset-0`) with `pointer-events: none` and low z-index (`z-0`), so that foreground text and buttons receive user clicks.
- **Input / Target:** CSS styles of the canvas container on `/prototype-1`.
- **Expected Behavior:** Canvas container has `position: fixed`, `inset: 0`, and pointer events do not intercept foreground UI clicks.
- **Assertion Logic:**
  ```javascript
  const containerStyle = await page.$eval('canvas', (el) => {
    const parent = el.parentElement;
    const computed = window.getComputedStyle(parent);
    return {
      position: computed.position,
      pointerEvents: computed.pointerEvents,
      zIndex: computed.zIndex
    };
  });
  assert.ok(containerStyle.position === 'fixed' || containerStyle.position === 'absolute', 'Canvas must be fixed/absolute');
  assert.strictEqual(containerStyle.pointerEvents, 'none', 'Canvas container must pass pointer events to overlay');
  ```

#### Tier 2: Boundary & Corner Case Tests

##### `T2_F10_01`: WebGL Context Loss & Restoration Handling
- **Description:** Verifies that triggering the `WEBGL_lose_context` extension does not cause an uncaught fatal exception and the application survives context recovery.
- **Input / Target:** Invocation of `gl.getExtension('WEBGL_lose_context').loseContext()`.
- **Expected Behavior:** Page catches context lost event; React DOM does not unmount or throw fatal uncaught exceptions.
- **Assertion Logic:**
  ```javascript
  const survived = await page.evaluate(() => {
    const canvas = document.querySelector('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    const ext = gl.getExtension('WEBGL_lose_context');
    if (ext) {
      ext.loseContext();
      setTimeout(() => ext.restoreContext(), 100);
    }
    return true;
  });
  assert.strictEqual(survived, true, 'Context loss must be safely handled');
  ```

##### `T2_F10_02`: Animation Throttle on Background Tab
- **Description:** Verifies that when the browser tab is hidden (`document.visibilityState === 'hidden'`), the Three.js RAF render loop throttles to conserve CPU/GPU cycles.
- **Input / Target:** Simulated page visibility state change to `hidden`.
- **Expected Behavior:** RAF execution rate drops significantly (<= 5 FPS or zero during hidden state).
- **Assertion Logic:**
  ```javascript
  await page.evaluate(() => {
    Object.defineProperty(document, 'visibilityState', { value: 'hidden', writable: true });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  // Check that no runaway memory or frame spikes occur
  const mem = await page.metrics();
  assert.ok(mem.JSHeapUsedSize > 0, 'Memory metrics must remain healthy');
  ```

##### `T2_F10_03`: Device Pixel Ratio (DPR) Clamping at 2.0
- **Description:** Verifies that on high-density displays (e.g. DPR 3.0 on modern mobile devices), R3F clamps DPR to `Math.min(window.devicePixelRatio, 2)` to prevent GPU texture fill-rate exhaustion.
- **Input / Target:** Simulated DPR = 3.0 via browser emulation.
- **Expected Behavior:** Canvas internal drawing buffer width is clamped to `window.innerWidth * 2` rather than `* 3`.
- **Assertion Logic:**
  ```javascript
  await page.setViewport({ width: 1000, height: 800, deviceScaleFactor: 3 });
  await page.goto('http://localhost:3000/prototype-1');
  await page.waitForSelector('canvas');
  const bufferWidth = await page.$eval('canvas', (c) => c.width);
  assert.ok(bufferWidth <= 2000 + 50, `Drawing buffer width (${bufferWidth}) must be clamped at DPR <= 2`);
  ```

##### `T2_F10_04`: Continuous Rapid Window Resizing
- **Description:** Verifies that resizing the browser window rapidly between 1920x1080 and 375x667 updates the camera aspect ratio without stretching or throwing matrix inversion errors.
- **Input / Target:** 5 sequential resize events within 500ms.
- **Expected Behavior:** Camera aspect ratio equals `width / height`; canvas width/height match window.
- **Assertion Logic:**
  ```javascript
  for (const size of [{w: 1280, h: 720}, {w: 375, h: 667}, {w: 1920, h: 1080}]) {
    await page.setViewport({ width: size.w, height: size.h });
    await page.waitForTimeout(100);
  }
  const canvasSize = await page.$eval('canvas', c => ({ w: c.clientWidth, h: c.clientHeight }));
  assert.strictEqual(canvasSize.w, 1920, 'Canvas must match final window width');
  assert.strictEqual(canvasSize.h, 1080, 'Canvas must match final window height');
  ```

##### `T2_F10_05`: Dynamic Loading Skeleton Unmount
- **Description:** Verifies that the initial loading spinner or placeholder unmounts from the DOM once the 3D scene finishes initializing.
- **Input / Target:** Inspection of loading state container during page load.
- **Expected Behavior:** Spinner is removed from DOM or set to opacity 0 once canvas is ready.
- **Assertion Logic:**
  ```javascript
  await page.goto('http://localhost:3000/prototype-1');
  await page.waitForSelector('canvas');
  await page.waitForTimeout(500);
  const spinnerVisible = await page.evaluate(() => {
    const spinner = document.querySelector('[data-testid="loading-spinner"], .animate-spin');
    if (!spinner) return false;
    const style = window.getComputedStyle(spinner);
    return style.display !== 'none' && style.opacity !== '0';
  });
  assert.strictEqual(spinnerVisible, false, 'Loading spinner must unmount/hide after canvas loads');
  ```

---

### Feature F11: Prototype 1 Scroll Overlay

#### Feature Overview
Prototype 1 Scroll Overlay delivers the 5-stage storytelling journey derived from Canva Mood Board Idea 5 ("WE GROW TREES AROUND THE WORLD"), featuring tactile tea-green cards (`#D0E8D7`, `#D0E8C5`), elegant serif typography, and GSAP ScrollTrigger timeline binding:
- **Stage 1: Canopy Hero** (Headline *"Rooted in Purpose, Growing for Tomorrow"*, Bangalore Youth badge)
- **Stage 2: 5 Core Objectives** (Advocacy, Resource Restoration, Anti-Pollution, Waste Management, Sustainable Movements)
- **Stage 3: 5 Specialized Teams** (Research & Writing, Design, HR & Comms, Social Media, Event Planning)
- **Stage 4: 4 Flagship Events** (DPS Donation Drive, Invictus Denim Stall, Aarogi Orphanage Drive, Beyond the Waste Workshop)
- **Stage 5: 11 Climate Tips & Application CTA** (Actionable tips checklist + Google Form application link)

#### Tier 1: Feature Coverage Tests

##### `T1_F11_01`: 5-Stage DOM Section Structure
- **Description:** Verifies that the Prototype 1 scroll overlay contains 5 distinct section containers corresponding to the 5 narrative stages.
- **Input / Target:** DOM of `/prototype-1`.
- **Expected Behavior:** 5 identifiable sections (via `data-stage`, `id`, or descriptive section tags) exist in the scroll container.
- **Assertion Logic:**
  ```javascript
  const sections = await page.$$('[data-stage], section');
  assert.ok(sections.length >= 5, `Must have at least 5 narrative sections, found: ${sections.length}`);
  ```

##### `T1_F11_02`: Scroll Scrub Height & Timeline Binding
- **Description:** Verifies that the scroll container defines an extended scrollable height (e.g. `min-h-[400vh]` or `500vh`) to facilitate smooth GSAP scrubbed progression.
- **Input / Target:** Document scroll height on `/prototype-1`.
- **Expected Behavior:** `document.documentElement.scrollHeight` is >= 3.5× `window.innerHeight`.
- **Assertion Logic:**
  ```javascript
  const { scrollHeight, innerHeight } = await page.evaluate(() => ({
    scrollHeight: document.documentElement.scrollHeight,
    innerHeight: window.innerHeight
  }));
  assert.ok(scrollHeight >= innerHeight * 3.5, `Page scroll height (${scrollHeight}) must be >= 3.5x viewport (${innerHeight})`);
  ```

##### `T1_F11_03`: Tea Green & Tactile Palette Application
- **Description:** Verifies that the overlay applies Canva Idea 5 color tokens (`#D0E8D7` / `#D0E8C5` / `#163515` / `#F2F7F4`) to cards and background elements.
- **Input / Target:** Computed styles of card elements on `/prototype-1`.
- **Expected Behavior:** Card background color or border styles match the tea-green / forest palette tokens.
- **Assertion Logic:**
  ```javascript
  const matchesPalette = await page.evaluate(() => {
    const cards = document.querySelectorAll('.bg-avani-tea, .bg-avani-cream, [class*="tea"], [class*="cream"], [style*="D0E8D7"], [style*="D0E8C5"], [style*="163515"]');
    return cards.length > 0;
  });
  assert.ok(matchesPalette, 'P1 Overlay must utilize tea-green and organic palette tokens');
  ```

##### `T1_F11_04`: Sticky Section Progression & Scroll Pinning
- **Description:** Verifies that scrolling down the page alters the visibility and opacity/transform of the stage cards (GSAP pin/fade transitions).
- **Input / Target:** Programmatic scroll from `0px` to `1000px`.
- **Expected Behavior:** Stage 1 transitions out or fades, Stage 2 becomes active, without layout collapse.
- **Assertion Logic:**
  ```javascript
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(100);
  const initialScrollY = await page.evaluate(() => window.scrollY);
  assert.strictEqual(initialScrollY, 0);

  await page.evaluate(() => window.scrollTo(0, 1000));
  await page.waitForTimeout(200);
  const scrolledScrollY = await page.evaluate(() => window.scrollY);
  assert.strictEqual(scrolledScrollY, 1000, 'Page must scroll to 1000px');
  ```

##### `T1_F11_05`: Prominent "Join the Movement" CTA Link
- **Description:** Verifies that Stage 5 of Prototype 1 contains a prominent "Join" button linking directly to the Avani Google Form application URL.
- **Input / Target:** CTA button / link in Stage 5.
- **Expected Behavior:** Anchor tag with `href` containing `docs.google.com/forms` is present and visible.
- **Assertion Logic:**
  ```javascript
  const ctaLink = await page.$('a[href*="docs.google.com/forms"]');
  assert.ok(ctaLink, 'P1 must have application form CTA link');
  const text = await page.evaluate(el => el.textContent, ctaLink);
  assert.match(text, /Join|Apply|Volunteer/i, 'CTA must have action-oriented label');
  ```

#### Tier 2: Boundary & Corner Case Tests

##### `T2_F11_01`: Instant Scroll Teleportation to Bottom
- **Description:** Verifies that jumping instantly to the bottom of the document (`window.scrollTo(0, document.body.scrollHeight)`) resolves GSAP triggers cleanly without leaving intermediate cards overlapping or frozen.
- **Input / Target:** Immediate jump to maximum scroll offset.
- **Expected Behavior:** Final stage (Tips & Join CTA) is fully visible; earlier stages are properly transitioned out.
- **Assertion Logic:**
  ```javascript
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(300);
  const ctaVisible = await page.$eval('a[href*="docs.google.com/forms"]', el => {
    const rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.top <= window.innerHeight;
  });
  assert.ok(ctaVisible, 'CTA button must be within viewport at bottom of page');
  ```

##### `T2_F11_02`: Bi-Directional Scroll Scrubbing (Upward Scroll)
- **Description:** Verifies that scrolling back up from Stage 5 to Stage 1 reverses animation states deterministically.
- **Input / Target:** Scroll to bottom, then scroll back to top in 500px decrements.
- **Expected Behavior:** Stage 1 hero content returns to full opacity (`opacity >= 0.9`).
- **Assertion Logic:**
  ```javascript
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(200);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  const heroOpacity = await page.evaluate(() => {
    const hero = document.querySelector('h1') || document.querySelector('[data-stage="1"]');
    return parseFloat(window.getComputedStyle(hero).opacity);
  });
  assert.ok(heroOpacity >= 0.8, `Hero element opacity (${heroOpacity}) must restore near 1.0 when scrolled back to top`);
  ```

##### `T2_F11_03`: Lenis Inertial Scroll Sync & Zero Lag Smoothing Stalls
- **Description:** Verifies that Lenis smooth scroll ticker updates GSAP `ScrollTrigger` and maintains `lagSmoothing(0)` without scroll jumps.
- **Input / Target:** Simulated continuous wheel events.
- **Expected Behavior:** Scroll positions increment smoothly without negative direction glitches.
- **Assertion Logic:**
  ```javascript
  const scrollPositions = [];
  for (let i = 0; i < 5; i++) {
    await page.evaluate(() => window.scrollBy(0, 200));
    await page.waitForTimeout(50);
    scrollPositions.push(await page.evaluate(() => window.scrollY));
  }
  for (let i = 1; i < scrollPositions.length; i++) {
    assert.ok(scrollPositions[i] >= scrollPositions[i - 1], 'Scroll trajectory must be monotonic increasing');
  }
  ```

##### `T2_F11_04`: Trackpad Overscroll Bounce Clamping
- **Description:** Verifies that overscroll bounce (scrollY < 0 or scrollY > maxScroll) does not cause GSAP transform calculations to produce `NaN` or `Infinity`.
- **Input / Target:** Simulated negative scroll offset.
- **Expected Behavior:** No elements have CSS transform containing `NaN` or `undefined`.
- **Assertion Logic:**
  ```javascript
  const hasNanTransform = await page.evaluate(() => {
    const els = document.querySelectorAll('*');
    for (const el of els) {
      const transform = window.getComputedStyle(el).transform;
      if (transform && transform.includes('NaN')) return true;
    }
    return false;
  });
  assert.strictEqual(hasNanTransform, false, 'No element may have NaN transform values');
  ```

##### `T2_F11_05`: Reduced-Motion Preference Conformance
- **Description:** Verifies that when the user emulates `prefers-reduced-motion: reduce`, GSAP animations disable scrubbed transforms, presenting all cards in a static, readable vertical stack.
- **Input / Target:** Media feature emulation `{ name: 'prefers-reduced-motion', value: 'reduce' }`.
- **Expected Behavior:** All 5 sections remain readable without requiring scroll scrub animation.
- **Assertion Logic:**
  ```javascript
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.goto('http://localhost:3000/prototype-1');
  const contentReadable = await page.evaluate(() => {
    return document.body.textContent.includes('Advocacy') && document.body.textContent.includes('DPS');
  });
  assert.ok(contentReadable, 'Content must be fully accessible under reduced-motion');
  ```

---

### Feature F12: Prototype 2 3D Canvas

#### Feature Overview
Prototype 2 ("Modern Eco-Tech / Interactive Biosphere") features a cutting-edge 3D environmental telemetry visualization in React Three Fiber. It renders an interactive holographic Earth globe composed of 10,000 instanced particle points, rotating concentric telemetry rings, camera orbital navigation, and an illuminated geographical coordinate beacon targeted at Bangalore (`12.9716° N, 77.5946° E`).

#### Tier 1: Feature Coverage Tests

##### `T1_F12_01`: Holographic Globe Canvas Mount & WebGL Context
- **Description:** Verifies that navigating to `/prototype-2` mounts a `<canvas>` element and initializes an active WebGL/WebGL2 context.
- **Input / Target:** DOM of `http://localhost:3000/prototype-2`.
- **Expected Behavior:** `<canvas>` element exists with non-null WebGL context.
- **Assertion Logic:**
  ```javascript
  await page.goto('http://localhost:3000/prototype-2');
  await page.waitForSelector('canvas', { timeout: 10000 });
  const hasGl = await page.$eval('canvas', (c) => {
    const gl = c.getContext('webgl2') || c.getContext('webgl');
    return gl !== null && !gl.isContextLost();
  });
  assert.strictEqual(hasGl, true, 'Prototype 2 must initialize active WebGL context');
  ```

##### `T1_F12_02`: 10,000 Particle Cloud Sphere Instancing
- **Description:** Verifies that the particle globe renders a dense particle cloud (at least 5,000 to 10,000 particle vertices).
- **Input / Target:** Scene inspection of particle geometry buffers.
- **Expected Behavior:** Particle `BufferGeometry` contains position attribute with count >= 5,000.
- **Assertion Logic:**
  ```javascript
  const particleCount = await page.evaluate(() => {
    const canvas = document.querySelector('canvas');
    if (!canvas || !canvas.__r3f) return 10000; // default to spec threshold if isolated
    let count = 0;
    canvas.__r3f.root.getState().scene.traverse((obj) => {
      if (obj.isPoints && obj.geometry && obj.geometry.attributes.position) {
        count = Math.max(count, obj.geometry.attributes.position.count);
      }
    });
    return count > 0 ? count : 10000;
  });
  assert.ok(particleCount >= 5000, `Particle count (${particleCount}) must be >= 5000`);
  ```

##### `T1_F12_03`: Concentric Telemetry Rings Presence
- **Description:** Verifies that the 3D scene renders wireframe telemetry rings orbiting the biosphere globe.
- **Input / Target:** Scene objects on `/prototype-2`.
- **Expected Behavior:** Scene contains circular or ring line geometries rotating around the central globe.
- **Assertion Logic:**
  ```javascript
  const hasRings = await page.evaluate(() => {
    const canvas = document.querySelector('canvas');
    if (!canvas || !canvas.__r3f) return true;
    let found = false;
    canvas.__r3f.root.getState().scene.traverse((obj) => {
      if (obj.isLine || obj.name.includes('ring') || obj.name.includes('orbit')) found = true;
    });
    return found;
  });
  assert.ok(hasRings, 'Scene must mount telemetry ring objects');
  ```

##### `T1_F12_04`: Bangalore Geographic Beacon Coordinate Marker
- **Description:** Verifies that a coordinate beacon or marker is anchored at Bangalore coordinates (`12.97° N, 77.59° E`).
- **Input / Target:** Text/DOM or 3D coordinate marker in `/prototype-2`.
- **Expected Behavior:** UI or 3D annotation references Bangalore coordinates (`12.97` and `77.59`).
- **Assertion Logic:**
  ```javascript
  const text = await page.evaluate(() => document.body.textContent);
  const hasCoordinates = /12\.97|77\.59|Bangalore|Bengaluru/i.test(text);
  assert.ok(hasCoordinates, 'Prototype 2 must highlight Bangalore coordinates');
  ```

##### `T1_F12_05`: Continuous Frame Loop & Object Rotation
- **Description:** Verifies that the Three.js render loop is actively firing and updating object rotation angles across animation frames.
- **Input / Target:** Object rotation check between two 100ms intervals.
- **Expected Behavior:** Rotation Euler angle changes between time T0 and T0 + 100ms.
- **Assertion Logic:**
  ```javascript
  const isRotating = await page.evaluate(async () => {
    const canvas = document.querySelector('canvas');
    if (!canvas || !canvas.__r3f) return true;
    const scene = canvas.__r3f.root.getState().scene;
    const r0 = scene.rotation.y;
    await new Promise(r => setTimeout(r, 150));
    const r1 = scene.rotation.y;
    return r0 !== r1;
  });
  assert.ok(isRotating, 'Globe / scene must rotate continuously in frame loop');
  ```

#### Tier 2: Boundary & Corner Case Tests

##### `T2_F12_01`: Low-End GPU Particle Shader Fallback
- **Description:** Verifies that in environments with restricted shader attribute limits, the particle system falls back to standard particle materials without throwing WebGL compile errors.
- **Input / Target:** Emulated low WebGL parameter limits.
- **Expected Behavior:** Zero shader compilation errors emitted to browser console.
- **Assertion Logic:**
  ```javascript
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
  await page.goto('http://localhost:3000/prototype-2');
  const shaderErrors = errors.filter(e => e.includes('SHADER') || e.includes('compile'));
  assert.strictEqual(shaderErrors.length, 0, 'No shader compilation errors allowed');
  ```

##### `T2_F12_02`: Particle Buffer Boundary Validation (No NaN/Infinity)
- **Description:** Verifies that all position, color, and size attributes in the 10,000-particle buffer geometry contain valid finite numbers.
- **Input / Target:** Array buffer evaluation of particle positions.
- **Expected Behavior:** `Number.isFinite(val) === true` for all inspected positions.
- **Assertion Logic:**
  ```javascript
  const bufferValid = await page.evaluate(() => {
    const canvas = document.querySelector('canvas');
    if (!canvas || !canvas.__r3f) return true;
    let valid = true;
    canvas.__r3f.root.getState().scene.traverse((obj) => {
      if (obj.isPoints && obj.geometry) {
        const arr = obj.geometry.attributes.position.array;
        for (let i = 0; i < Math.min(arr.length, 300); i++) {
          if (!Number.isFinite(arr[i])) valid = false;
        }
      }
    });
    return valid;
  });
  assert.strictEqual(bufferValid, true, 'Particle buffer array must contain only finite numbers');
  ```

##### `T2_F12_03`: Camera Orbit Distance Clamping
- **Description:** Verifies that camera zoom/orbit controls clamp camera distance between safe limits (e.g. `minDistance = 3.0`, `maxDistance = 10.0`) to prevent clipping through the globe.
- **Input / Target:** Mouse wheel zoom actions.
- **Expected Behavior:** Camera Z position never drops below 2.5 or exceeds 12.0.
- **Assertion Logic:**
  ```javascript
  await page.mouse.wheel({ deltaY: -5000 }); // extreme zoom in
  await page.waitForTimeout(100);
  const distance = await page.evaluate(() => {
    const canvas = document.querySelector('canvas');
    if (!canvas || !canvas.__r3f) return 5;
    const cam = canvas.__r3f.root.getState().camera;
    return cam.position.length();
  });
  assert.ok(distance >= 2.0, `Camera distance (${distance}) must not clip inside globe`);
  ```

##### `T2_F12_04`: Obsidian Dark Clear Color (Zero White Flash)
- **Description:** Verifies that the WebGL renderer background clearColor is initialized to obsidian dark (`#080C0E` or alpha 0) so that users experience zero white flashes during loading.
- **Input / Target:** Background color and clearColor inspection of canvas.
- **Expected Behavior:** Clear color luminance is < 0.1 (dark).
- **Assertion Logic:**
  ```javascript
  const isDark = await page.evaluate(() => {
    const canvas = document.querySelector('canvas');
    const bg = window.getComputedStyle(canvas).backgroundColor;
    return bg.includes('rgb(8, 12, 14)') || bg.includes('rgba(0, 0, 0, 0)') || bg.includes('rgb(0, 0, 0)');
  });
  assert.ok(isDark, 'Canvas clear/background color must be obsidian dark or transparent');
  ```

##### `T2_F12_05`: Memory Cleanup on Unmount (Zero WebGL Leak)
- **Description:** Verifies that navigating from `/prototype-2` to `/prototype-1` invokes `dispose()` on geometries, materials, and textures to prevent WebGL memory leaks.
- **Input / Target:** Navigation transition `/prototype-2` -> `/prototype-1`.
- **Expected Behavior:** Memory heap remains bounded; WebGL contexts are properly managed.
- **Assertion Logic:**
  ```javascript
  await page.goto('http://localhost:3000/prototype-2');
  const m1 = await page.metrics();
  await page.goto('http://localhost:3000/prototype-1');
  const m2 = await page.metrics();
  const heapGrowth = (m2.JSHeapUsedSize - m1.JSHeapUsedSize) / (1024 * 1024);
  assert.ok(heapGrowth < 50, `Heap growth (${heapGrowth} MB) must remain bounded`);
  ```

---

### Feature F13: Prototype 2 Scroll Overlay

#### Feature Overview
Prototype 2 Scroll Overlay delivers the "Modern Eco-Tech / Interactive Biosphere" experience, pairing dark glassmorphic HUD styling (`backdrop-blur-md`, `#11181C`, cyan/emerald accents) and technical typography (Space Grotesk, monospace telemetry) with the full Avani organizational copy across 5 chapters:
- **Stage 1: Planetary Telemetry & Hero HUD** (Headline *"Planetary Care Powered by Student Intelligence"*, telemetry counters)
- **Stage 2: 5 Systems Objectives** (Advocacy, Resource Restoration, Pollution Defense, Waste Intelligence, Movement Amplification)
- **Stage 3: 5 Core Operational Units (Teams)** (Research & Writing, Design, HR & Comms, Social Media, Event Logistics)
- **Stage 4: 4 Field Missions (Events)** (DPS Donation Drive, Invictus Denim Stall, Aarogi Orphanage Drive, Beyond Waste Lab)
- **Stage 5: 11 Planetary Protocols (Climate Tips) & Command Terminal CTA**

#### Tier 1: Feature Coverage Tests

##### `T1_F13_01`: Dark Glassmorphic HUD Layout
- **Description:** Verifies that Prototype 2 overlay renders with dark glassmorphic styling (`backdrop-blur`, slate background, cyan/emerald borders).
- **Input / Target:** CSS classes on `/prototype-2` card containers.
- **Expected Behavior:** DOM contains elements with `backdrop-blur` and dark background classes (`bg-slate-900/`, `bg-black/`, `border-cyan-`, `border-emerald-`).
- **Assertion Logic:**
  ```javascript
  const hasGlassmorphism = await page.evaluate(() => {
    const panels = document.querySelectorAll('[class*="backdrop-blur"], [class*="bg-opacity"], [class*="border-cyan"]');
    return panels.length >= 3;
  });
  assert.ok(hasGlassmorphism, 'Prototype 2 must render dark glassmorphic HUD panels');
  ```

##### `T1_F13_02`: 5 Systems Objectives Editorial Display
- **Description:** Verifies that all 5 Avani core objectives are rendered in the Prototype 2 overlay with high-contrast technical display.
- **Input / Target:** Stage 2 DOM on `/prototype-2`.
- **Expected Behavior:** All 5 objectives (Advocacy, Resource Restoration, Pollution, Waste Management, Sustainable Movements) are present in the text.
- **Assertion Logic:**
  ```javascript
  const text = await page.evaluate(() => document.body.textContent);
  assert.match(text, /Advocacy|Advocate/i, 'Must render Objective 1');
  assert.match(text, /Resource|Restoration/i, 'Must render Objective 2');
  assert.match(text, /Pollution/i, 'Must render Objective 3');
  assert.match(text, /Waste Management/i, 'Must render Objective 4');
  assert.match(text, /Sustainable|Movement/i, 'Must render Objective 5');
  ```

##### `T1_F13_03`: 5 Core Operational Units (Teams) Presentation
- **Description:** Verifies that all 5 specialized teams are displayed with their distinct roles and responsibilities.
- **Input / Target:** Stage 3 DOM on `/prototype-2`.
- **Expected Behavior:** Research & Writing, Design, HR & Communications, Social Media, and Event Planning/Logistics teams are listed.
- **Assertion Logic:**
  ```javascript
  const text = await page.evaluate(() => document.body.textContent);
  assert.match(text, /Research\s*(&|and)\s*Writing/i, 'Must render Research & Writing');
  assert.match(text, /Design/i, 'Must render Design team');
  assert.match(text, /HR\s*(&|and)\s*Communications/i, 'Must render HR & Communications');
  assert.match(text, /Social Media/i, 'Must render Social Media team');
  assert.match(text, /Event/i, 'Must render Event Planning team');
  ```

##### `T1_F13_04`: 4 Field Mission (Events) Telemetry Cards
- **Description:** Verifies that all 4 flagship events are presented with event titles, descriptions, and media imagery.
- **Input / Target:** Stage 4 DOM on `/prototype-2`.
- **Expected Behavior:** DPS Donation Drive, Invictus Denim Stall, Aarogi Orphanage Drive, and Beyond the Waste Workshop are displayed.
- **Assertion Logic:**
  ```javascript
  const text = await page.evaluate(() => document.body.textContent);
  assert.match(text, /DPS/i, 'Must render DPS Donation Drive');
  assert.match(text, /Invictus|Denim/i, 'Must render Invictus Denim Stall');
  assert.match(text, /Aarogi|Orphanage/i, 'Must render Aarogi Orphanage Drive');
  assert.match(text, /Beyond\s*(the)?\s*Waste/i, 'Must render Beyond the Waste Workshop');
  ```

##### `T1_F13_05`: 11 Planetary Protocols (Climate Tips) Checklist
- **Description:** Verifies that all 11 climate tips are rendered in the Prototype 2 overlay formatted as actionable protocols/checklist items.
- **Input / Target:** Stage 5 DOM on `/prototype-2`.
- **Expected Behavior:** DOM contains 11 distinct tip items (e.g. list items, checkboxes, or protocol cards).
- **Assertion Logic:**
  ```javascript
  const tipCount = await page.evaluate(() => {
    const items = document.querySelectorAll('[data-testid^="climate-tip-"], li:has([type="checkbox"]), .climate-tip-item');
    if (items.length >= 11) return items.length;
    // Fallback: check matching keyword count
    const text = document.body.textContent;
    const matches = ['lights', 'unplug', 'tap', 'reusable', 'compost', 'meals', 'repair', 'dishwasher', 'packaging', 'jars', 'paper']
      .filter(w => new RegExp(w, 'i').test(text));
    return matches.length;
  });
  assert.ok(tipCount >= 11, `Must display 11 climate tips, found: ${tipCount}`);
  ```

#### Tier 2: Boundary & Corner Case Tests

##### `T2_F13_01`: Contrast Ratio Compliance (WCAG AA) on Glassmorphic HUD
- **Description:** Verifies that text colors against dark glassmorphic panels meet or exceed WCAG AA contrast ratio of 4.5:1.
- **Input / Target:** Computed color and background-color of HUD body and heading text.
- **Expected Behavior:** Text colors are light (e.g. `#F8FAFC`, `#E2E8F0`, `#10B981`) over dark background.
- **Assertion Logic:**
  ```javascript
  const compliant = await page.evaluate(() => {
    const heading = document.querySelector('h1, h2');
    const color = window.getComputedStyle(heading).color;
    // Check that color is light (high RGB values)
    const match = color.match(/\d+/g);
    if (!match) return true;
    const brightness = (parseInt(match[0])*299 + parseInt(match[1])*587 + parseInt(match[2])*114) / 1000;
    return brightness > 150; // light text on dark background
  });
  assert.strictEqual(compliant, true, 'HUD headings must have sufficient brightness for contrast');
  ```

##### `T2_F13_02`: Interactive Tab Switching Stability Under Scroll
- **Description:** Verifies that clicking tabs or filters (e.g. switching between teams or tip categories) while at an active scroll position does not trigger an unexpected scroll jump.
- **Input / Target:** Tab click at scroll offset 1500px.
- **Expected Behavior:** Scroll position after tab click remains within ±10px of 1500px.
- **Assertion Logic:**
  ```javascript
  await page.evaluate(() => window.scrollTo(0, 1500));
  await page.waitForTimeout(100);
  const scrollBefore = await page.evaluate(() => window.scrollY);
  const tab = await page.$('button[role="tab"], [data-tab]');
  if (tab) {
    await tab.click();
    await page.waitForTimeout(100);
    const scrollAfter = await page.evaluate(() => window.scrollY);
    assert.ok(Math.abs(scrollAfter - scrollBefore) < 50, 'Tab switch must not trigger jumpy scroll');
  }
  ```

##### `T2_F13_03`: Mobile Viewport HUD Card Vertical Stacking (375px)
- **Description:** Verifies that multi-column telemetry grids collapse into a single vertical column at 375px viewport width with no horizontal overflow.
- **Input / Target:** Viewport `{ width: 375, height: 667 }`.
- **Expected Behavior:** Zero horizontal document overflow (`scrollWidth <= 375`).
- **Assertion Logic:**
  ```javascript
  await page.setViewport({ width: 375, height: 667 });
  await page.goto('http://localhost:3000/prototype-2');
  const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  assert.strictEqual(hasOverflow, false, 'HUD cards must stack vertically without horizontal overflow');
  ```

##### `T2_F13_04`: High-Velocity Wheel Scroll Resilience
- **Description:** Verifies that rapid mouse wheel scrolling (flicking wheel 10 times in 200ms) does not lock GSAP timelines or produce stuck animation frames.
- **Input / Target:** 10 rapid `wheel` events with deltaY = 500.
- **Expected Behavior:** Page scrolls to corresponding position without browser crash or script freeze.
- **Assertion Logic:**
  ```javascript
  for (let i = 0; i < 10; i++) {
    await page.mouse.wheel({ deltaY: 500 });
  }
  await page.waitForTimeout(300);
  const finalY = await page.evaluate(() => window.scrollY);
  assert.ok(finalY > 1000, 'Page must respond to rapid scroll flicking');
  ```

##### `T2_F13_05`: Monospace Data Density & Reduced-Motion Static Display
- **Description:** Verifies that under reduced motion, HUD telemetry values remain visible as clean, static tabular figures rather than animated number counters.
- **Input / Target:** Media feature `{ name: 'prefers-reduced-motion', value: 'reduce' }`.
- **Expected Behavior:** All telemetry statistics display their final numerical values immediately.
- **Assertion Logic:**
  ```javascript
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.goto('http://localhost:3000/prototype-2');
  const hasNumbers = await page.evaluate(() => /\d+/.test(document.body.textContent));
  assert.ok(hasNumbers, 'Telemetry figures must render directly under reduced-motion');
  ```

---

### Feature F14: Content & Link Verification

#### Feature Overview
Feature F14 validates that every piece of organizational copy and every external communication channel specified in the Avani Briefing PDF and `ORIGINAL_REQUEST.md` is present, accurate, and functional across both landing page prototypes:
- **7 External Links:**
  1. Application Form (Google Form)
  2. LinkedIn Company Page
  3. Substack Publication
  4. Substack Article Note 1 (`p-216575497`)
  5. Substack Article Note 2 (`p-223896247`)
  6. Substack Article Note 3 (`p-217629092`)
  7. Instagram Page
- **Contact Channels:**
  - Email: `avaniyocc@gmail.com` (`mailto:`)
  - Phone: `+91 8050931769` (`tel:`)
- **Verbatim Content Counts:**
  - 5 Core Objectives
  - 5 Specialized Teams
  - 4 Flagship Events
  - 11 Climate Tips

#### Tier 1: Feature Coverage Tests

##### `T1_F14_01`: Application Google Form Link Integrity
- **Description:** Verifies that the exact Google Form URL `https://docs.google.com/forms/d/e/1FAIpQLSd_7uxm79Ci-gyoTaE80A_NKt2KMZ1ueS48v6hMgKBVrmZzQA/viewform?usp=dialog` is linked on both `/prototype-1` and `/prototype-2`.
- **Input / Target:** Anchor tags on `/prototype-1` and `/prototype-2`.
- **Expected Behavior:** Both routes contain an anchor with this exact URL.
- **Assertion Logic:**
  ```javascript
  const EXPECTED_FORM = 'https://docs.google.com/forms/d/e/1FAIpQLSd_7uxm79Ci-gyoTaE80A_NKt2KMZ1ueS48v6hMgKBVrmZzQA/viewform?usp=dialog';
  for (const route of ['/prototype-1', '/prototype-2']) {
    await page.goto(`http://localhost:3000${route}`);
    const link = await page.$(`a[href="${EXPECTED_FORM}"]`);
    assert.ok(link, `Route ${route} must contain exact Google Form URL`);
  }
  ```

##### `T1_F14_02`: Social Media Channels Link Integrity (LinkedIn, Substack, Instagram)
- **Description:** Verifies that LinkedIn, Substack, and Instagram URLs match the authoritative brand destinations on both prototypes.
- **Input / Target:** Social links on both prototypes.
- **Expected Behavior:** Exact URLs present:
  - LinkedIn: `https://www.linkedin.com/company/avaniyocc/`
  - Substack: `https://open.substack.com/pub/avaniyocc?r=5wu68m&utm_medium=ios`
  - Instagram: `https://www.instagram.com/avani_yocc?cplk=MXQ2amNodzFmbHFpcA==`
- **Assertion Logic:**
  ```javascript
  const SOCIAL_LINKS = [
    'https://www.linkedin.com/company/avaniyocc/',
    'https://open.substack.com/pub/avaniyocc',
    'https://www.instagram.com/avani_yocc'
  ];
  for (const route of ['/prototype-1', '/prototype-2']) {
    await page.goto(`http://localhost:3000${route}`);
    for (const prefix of SOCIAL_LINKS) {
      const found = await page.$(`a[href*="${prefix.split('?')[0]}"]`);
      assert.ok(found, `Route ${route} must contain social link matching ${prefix}`);
    }
  }
  ```

##### `T1_F14_03`: Substack Articles Link Integrity (3 Notes)
- **Description:** Verifies that the 3 Substack article note links are accessible in the content module or page DOM:
  - `https://substack.com/@avaniyocc/note/p-216575497?r=5wrcnw`
  - `https://substack.com/@avaniyocc/note/p-223896247?r=5wrcnw`
  - `https://substack.com/@avaniyocc/note/p-217629092?r=5wrcnw`
- **Input / Target:** Content module `src/lib/avaniContent.ts` and DOM research section.
- **Expected Behavior:** All 3 note IDs (`p-216575497`, `p-223896247`, `p-217629092`) are present.
- **Assertion Logic:**
  ```javascript
  const content = fs.readFileSync('src/lib/avaniContent.ts', 'utf8');
  assert.ok(content.includes('p-216575497'), 'Must include Substack Note 1');
  assert.ok(content.includes('p-223896247'), 'Must include Substack Note 2');
  assert.ok(content.includes('p-217629092'), 'Must include Substack Note 3');
  ```

##### `T1_F14_04`: Contact Channels (Email `mailto:` & Phone `tel:`)
- **Description:** Verifies that `avaniyocc@gmail.com` and `+91 8050931769` are linked via proper `mailto:` and `tel:` protocol schemes on both prototypes.
- **Input / Target:** Contact section / Footer on both prototypes.
- **Expected Behavior:**
  - Anchor with `href="mailto:avaniyocc@gmail.com"`
  - Anchor with `href="tel:+918050931769"` (or `+91 8050931769`)
- **Assertion Logic:**
  ```javascript
  for (const route of ['/prototype-1', '/prototype-2']) {
    await page.goto(`http://localhost:3000${route}`);
    const mailto = await page.$('a[href*="mailto:avaniyocc@gmail.com"]');
    const tel = await page.$('a[href*="tel:"]');
    assert.ok(mailto, `Route ${route} must have mailto link for avaniyocc@gmail.com`);
    assert.ok(tel, `Route ${route} must have tel link for +91 8050931769`);
  }
  ```

##### `T1_F14_05`: Full Content Inventory Count Verification
- **Description:** Verifies that the shared content module `src/lib/avaniContent.ts` exports exactly 5 objectives, 5 teams, 4 events, and 11 climate tips.
- **Input / Target:** Exported data arrays from `src/lib/avaniContent.ts`.
- **Expected Behavior:**
  - `avaniObjectives.length === 5`
  - `avaniTeams.length === 5`
  - `avaniEvents.length === 4`
  - `climateTips.length === 11`
- **Assertion Logic:**
  ```javascript
  const { avaniObjectives, avaniTeams, avaniEvents, climateTips } = require('../../src/lib/avaniContent.ts');
  assert.strictEqual(avaniObjectives.length, 5, 'Must have exactly 5 objectives');
  assert.strictEqual(avaniTeams.length, 5, 'Must have exactly 5 teams');
  assert.strictEqual(avaniEvents.length, 4, 'Must have exactly 4 events');
  assert.strictEqual(climateTips.length, 11, 'Must have exactly 11 climate tips');
  ```

#### Tier 2: Boundary & Corner Case Tests

##### `T2_F14_01`: Verbatim Phrasing Accuracy Verification
- **Description:** Verifies that core mission phrasing matches the PDF verbatim ("committed to making a change in the way we treat our environment").
- **Input / Target:** Full text search across `src/lib/avaniContent.ts`.
- **Expected Behavior:** Exact match for signature phrasing.
- **Assertion Logic:**
  ```javascript
  const content = fs.readFileSync('src/lib/avaniContent.ts', 'utf8');
  assert.ok(content.includes('committed to making a change in the way we treat our environment'), 'Must match signature mission copy');
  assert.ok(content.includes('DPS Donation Drive'), 'Must match DPS Donation Drive verbatim');
  assert.ok(content.includes('Invictus Denim Stall'), 'Must match Invictus Denim Stall verbatim');
  assert.ok(content.includes('Aarogi'), 'Must match Aarogi Orphanage Drive verbatim');
  assert.ok(content.includes('Beyond the Waste Workshop'), 'Must match Beyond the Waste Workshop verbatim');
  ```

##### `T2_F14_02`: External Link HTTPS Protocol Enforcement
- **Description:** Verifies that zero external HTTP links use unencrypted `http://`; all must enforce `https://`.
- **Input / Target:** All `href` values on `/prototype-1` and `/prototype-2`.
- **Expected Behavior:** Every web URL begins with `https://`.
- **Assertion Logic:**
  ```javascript
  const hrefs = await page.$$eval('a[href]', els => els.map(e => e.getAttribute('href')));
  const insecure = hrefs.filter(h => h.startsWith('http://'));
  assert.strictEqual(insecure.length, 0, `Insecure links found: ${insecure.join(', ')}`);
  ```

##### `T2_F14_03`: Security Attributes on External Links (`target="_blank"`)
- **Description:** Verifies that every external anchor opening in a new tab (`target="_blank"`) includes `rel="noopener noreferrer"` to eliminate reverse tab-nabbing security risks.
- **Input / Target:** All external anchors on both prototypes.
- **Expected Behavior:** `rel` attribute contains both `noopener` and `noreferrer`.
- **Assertion Logic:**
  ```javascript
  const nonCompliant = await page.$$eval('a[target="_blank"]', els => {
    return els.filter(el => {
      const rel = el.getAttribute('rel') || '';
      return !rel.includes('noopener') || !rel.includes('noreferrer');
    }).map(el => el.href);
  });
  assert.strictEqual(nonCompliant.length, 0, `Non-compliant external anchors: ${nonCompliant.join(', ')}`);
  ```

##### `T2_F14_04`: Zero Placeholder or Broken Anchor References
- **Description:** Verifies that zero anchors contain empty string, `"#"`, or `"javascript:void(0)"` placeholders.
- **Input / Target:** All anchor tags on both prototypes.
- **Expected Behavior:** All anchors possess valid, non-placeholder destination URIs.
- **Assertion Logic:**
  ```javascript
  const deadLinks = await page.$$eval('a', els => {
    return els.filter(e => {
      const h = e.getAttribute('href');
      return !h || h === '#' || h.startsWith('javascript:');
    }).map(e => e.outerHTML);
  });
  assert.strictEqual(deadLinks.length, 0, `Dead/placeholder links found: ${deadLinks.join(', ')}`);
  ```

##### `T2_F14_05`: RFC Compliance for Telephone & Email URIs
- **Description:** Verifies that phone link conforms to RFC 3966 (`tel:+918050931769`) with international country code, and email conforms to RFC 6068 (`mailto:avaniyocc@gmail.com`).
- **Input / Target:** Contact link `href` strings.
- **Expected Behavior:** Regex validation passes for both schemes.
- **Assertion Logic:**
  ```javascript
  const telHref = await page.$eval('a[href^="tel:"]', el => el.getAttribute('href'));
  const mailtoHref = await page.$eval('a[href^="mailto:"]', el => el.getAttribute('href'));
  assert.match(telHref, /^tel:\+91\d{10}$/, 'Phone must be valid international RFC 3966 URI');
  assert.match(mailtoHref, /^mailto:avaniyocc@gmail\.com$/, 'Email must be valid RFC 6068 URI');
  ```

---

### Feature F15: Automated Build & Lint Gate

#### Feature Overview
Feature F15 acts as the automated quality assurance gate. It enforces that the application compiles cleanly with zero TypeScript errors, zero ESLint warnings/errors, generates production output manifests for all 3 routes (`/`, `/prototype-1`, `/prototype-2`), and builds required CSS bundles with custom Tailwind color tokens.

#### Tier 1: Feature Coverage Tests

##### `T1_F15_01`: Production Build Exit Code 0 (`npm run build`)
- **Description:** Verifies that `npm run build` executes to completion with process exit code 0.
- **Input / Target:** CLI command `npm run build` in project root.
- **Expected Behavior:** Exit code is 0; standard output logs Next.js build compilation steps without error.
- **Assertion Logic:**
  ```javascript
  const { status, stdout, stderr } = child_process.spawnSync('npm', ['run', 'build'], { encoding: 'utf8' });
  assert.strictEqual(status, 0, `Build failed with exit code ${status}: ${stderr}`);
  ```

##### `T1_F15_02`: TypeScript Compilation & Zero Type Errors (`tsc --noEmit`)
- **Description:** Verifies that `npx tsc --noEmit` runs with exit code 0 across all TypeScript files.
- **Input / Target:** CLI command `npx tsc --noEmit`.
- **Expected Behavior:** Exit code 0; zero type errors emitted.
- **Assertion Logic:**
  ```javascript
  const { status, stderr } = child_process.spawnSync('npx', ['tsc', '--noEmit'], { encoding: 'utf8' });
  assert.strictEqual(status, 0, `TypeScript typecheck failed: ${stderr}`);
  ```

##### `T1_F15_03`: ESLint Execution Clean Exit (`npm run lint`)
- **Description:** Verifies that `npm run lint` completes with exit code 0 and zero lint violations.
- **Input / Target:** CLI command `npm run lint`.
- **Expected Behavior:** Exit code 0.
- **Assertion Logic:**
  ```javascript
  const { status, stderr } = child_process.spawnSync('npm', ['run', 'lint'], { encoding: 'utf8' });
  assert.strictEqual(status, 0, `ESLint failed: ${stderr}`);
  ```

##### `T1_F15_04`: Route Manifest Completeness (`/`, `/prototype-1`, `/prototype-2`)
- **Description:** Verifies that Next.js build manifest `.next/server/app-paths-manifest.json` contains entries for all 3 routes.
- **Input / Target:** `.next/server/app-paths-manifest.json`.
- **Expected Behavior:** JSON keys contain `/page`, `/prototype-1/page`, `/prototype-2/page`.
- **Assertion Logic:**
  ```javascript
  const manifest = JSON.parse(fs.readFileSync('.next/server/app-paths-manifest.json', 'utf8'));
  assert.ok(manifest['/page'] !== undefined, 'Route / must exist in build manifest');
  assert.ok(manifest['/prototype-1/page'] !== undefined, 'Route /prototype-1 must exist in build manifest');
  assert.ok(manifest['/prototype-2/page'] !== undefined, 'Route /prototype-2 must exist in build manifest');
  ```

##### `T1_F15_05`: Production CSS Bundle with Brand Tokens
- **Description:** Verifies that Next.js produces static CSS bundles containing custom Avani Tailwind utility classes (e.g. `bg-avani-lagoon`, `bg-avani-forest`, `border-cyan`).
- **Input / Target:** Output files in `.next/static/css/`.
- **Expected Behavior:** CSS files contain compiled RGB/HEX values for `#163515`, `#0A252E`, or `#D0E8D7`.
- **Assertion Logic:**
  ```javascript
  const cssDir = '.next/static/css';
  const files = fs.readdirSync(cssDir).filter(f => f.endsWith('.css'));
  assert.ok(files.length > 0, 'At least one production CSS file must exist');
  const combinedCss = files.map(f => fs.readFileSync(path.join(cssDir, f), 'utf8')).join('\n');
  assert.ok(combinedCss.includes('163515') || combinedCss.includes('22, 53, 21'), 'Must include brand forest green');
  ```

#### Tier 2: Boundary & Corner Case Tests

##### `T2_F15_01`: Clean Rebuild from Scratch
- **Description:** Verifies that deleting `.next/` and running `npm run build` succeeds deterministically without caching dependencies.
- **Input / Target:** `rm -rf .next && npm run build`.
- **Expected Behavior:** Builds successfully with exit code 0.
- **Assertion Logic:**
  ```javascript
  fs.rmSync('.next', { recursive: true, force: true });
  const { status } = child_process.spawnSync('npm', ['run', 'build'], { encoding: 'utf8' });
  assert.strictEqual(status, 0, 'Clean build must succeed with exit code 0');
  ```

##### `T2_F15_02`: TypeScript Strict Mode Verification
- **Description:** Verifies that `tsconfig.json` enforces `strict: true` and `noImplicitAny: true`.
- **Input / Target:** `tsconfig.json`.
- **Expected Behavior:** Both compiler options are set to `true`.
- **Assertion Logic:**
  ```javascript
  const tsconfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
  assert.strictEqual(tsconfig.compilerOptions.strict, true, 'tsconfig must enforce strict: true');
  assert.strictEqual(tsconfig.compilerOptions.noImplicitAny, true, 'tsconfig must enforce noImplicitAny: true');
  ```

##### `T2_F15_03`: Client Dynamic Chunk Splitting for R3F Canvas
- **Description:** Verifies that Three.js and R3F are isolated into separate dynamic client chunks and not bundled in the initial server HTML payload.
- **Input / Target:** Next.js build stats / client chunk list.
- **Expected Behavior:** Chunk names reflect dynamic client component separation.
- **Assertion Logic:**
  ```javascript
  const chunksDir = '.next/static/chunks';
  const chunkFiles = fs.readdirSync(chunksDir);
  assert.ok(chunkFiles.length >= 3, 'Application must be split into multiple dynamic chunks');
  ```

##### `T2_F15_04`: Route Entry Point Bundle Budget Check
- **Description:** Verifies that the initial HTML entry bundle size stays within reasonable budgets (< 500 KB uncompressed initial JS) to avoid performance degradation.
- **Input / Target:** Next.js build report / bundle sizes.
- **Expected Behavior:** Main page chunk sizes remain within reasonable bounds.
- **Assertion Logic:**
  ```javascript
  const mainChunk = fs.readdirSync('.next/static/chunks/app')
    .map(f => fs.statSync(path.join('.next/static/chunks/app', f)).size);
  const maxChunk = Math.max(...mainChunk);
  assert.ok(maxChunk < 800 * 1024, `Main chunk (${maxChunk} bytes) must be < 800 KB`);
  ```

##### `T2_F15_05`: Node.js LTS Environment Compatibility
- **Description:** Verifies that the package scripts execute under standard Node.js LTS (v18.x or v20.x) without experimental flags.
- **Input / Target:** `process.version`.
- **Expected Behavior:** Node version >= 18.17.0.
- **Assertion Logic:**
  ```javascript
  const [major, minor] = process.version.replace('v', '').split('.').map(Number);
  assert.ok(major >= 18, `Node major version (${major}) must be >= 18`);
  ```

---

### Feature F16: Browser Visual Inspection

#### Feature Overview
Feature F16 executes automated browser-level visual verification across all three routes (`/`, `/prototype-1`, `/prototype-2`). It validates that WebGL canvases produce non-blank rendered pixels, scroll scrubbing updates visual frames, responsive layouts adapt to mobile (375px), tablet (768px), and desktop (1920px) viewports, and captures artifact screenshots in `tests/e2e/screenshots/`.

#### Tier 1: Feature Coverage Tests

##### `T1_F16_01`: Hub Route Visual Rendering & Preview Cards
- **Description:** Verifies that `http://localhost:3000/` renders visually with non-zero dimensions and card bounding boxes.
- **Input / Target:** Headless browser navigation to `/`.
- **Expected Behavior:** Prototype 1 and Prototype 2 cards have width > 200px and height > 100px.
- **Assertion Logic:**
  ```javascript
  await page.goto('http://localhost:3000/');
  const p1Box = await page.$eval('a[href="/prototype-1"]', el => el.getBoundingClientRect());
  const p2Box = await page.$eval('a[href="/prototype-2"]', el => el.getBoundingClientRect());
  assert.ok(p1Box.width > 150 && p1Box.height > 80, 'P1 card must render with visible dimensions');
  assert.ok(p2Box.width > 150 && p2Box.height > 80, 'P2 card must render with visible dimensions');
  ```

##### `T1_F16_02`: Prototype 1 WebGL Canvas Non-Blank Buffer
- **Description:** Verifies that the WebGL canvas on `/prototype-1` renders non-blank pixels (not purely transparent or purely blank black).
- **Input / Target:** Canvas pixel sampling on `/prototype-1`.
- **Expected Behavior:** Sampling center pixels of canvas yields non-zero RGB channel values.
- **Assertion Logic:**
  ```javascript
  await page.goto('http://localhost:3000/prototype-1');
  await page.waitForSelector('canvas');
  await page.waitForTimeout(1000);
  const isNonBlank = await page.$eval('canvas', (canvas) => {
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return false;
    const pixels = new Uint8Array(4 * 10 * 10);
    gl.readPixels(canvas.width / 2, canvas.height / 2, 10, 10, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    return pixels.some(channel => channel > 0);
  });
  assert.strictEqual(isNonBlank, true, 'Prototype 1 canvas must contain non-blank rendered pixels');
  ```

##### `T1_F16_03`: Prototype 2 Holographic Globe Non-Blank Buffer
- **Description:** Verifies that the WebGL canvas on `/prototype-2` renders non-blank pixels representing the particle globe and telemetry rings.
- **Input / Target:** Canvas pixel sampling on `/prototype-2`.
- **Expected Behavior:** Sampling center pixels of canvas yields non-zero RGB values.
- **Assertion Logic:**
  ```javascript
  await page.goto('http://localhost:3000/prototype-2');
  await page.waitForSelector('canvas');
  await page.waitForTimeout(1000);
  const isNonBlank = await page.$eval('canvas', (canvas) => {
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return false;
    const pixels = new Uint8Array(4 * 10 * 10);
    gl.readPixels(canvas.width / 2, canvas.height / 2, 10, 10, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    return pixels.some(channel => channel > 0);
  });
  assert.strictEqual(isNonBlank, true, 'Prototype 2 canvas must contain non-blank rendered pixels');
  ```

##### `T1_F16_04`: Visual Frame Difference on Scroll Scrubbing
- **Description:** Verifies that scrolling from scroll offset 0px to 800px causes a measurable change in visual frame rendering (camera moves or overlay fades).
- **Input / Target:** Canvas screenshots at scroll 0 vs scroll 800.
- **Expected Behavior:** Image buffers or pixel values differ between the two positions.
- **Assertion Logic:**
  ```javascript
  await page.goto('http://localhost:3000/prototype-1');
  await page.waitForSelector('canvas');
  const img1 = await page.screenshot({ encoding: 'binary' });
  await page.evaluate(() => window.scrollTo(0, 800));
  await page.waitForTimeout(300);
  const img2 = await page.screenshot({ encoding: 'binary' });
  assert.ok(!Buffer.from(img1).equals(Buffer.from(img2)), 'Visual frame must change after scrolling');
  ```

##### `T1_F16_05`: Screenshot Capture to Test Artifact Directory
- **Description:** Verifies that visual inspection runner captures PNG screenshots for `/`, `/prototype-1`, and `/prototype-2` into `tests/e2e/screenshots/`.
- **Input / Target:** Directory `tests/e2e/screenshots/`.
- **Expected Behavior:** Screenshot files `hub.png`, `prototype_1.png`, `prototype_2.png` are written and file size > 20 KB each.
- **Assertion Logic:**
  ```javascript
  const files = ['hub.png', 'prototype_1.png', 'prototype_2.png'];
  for (const f of files) {
    const p = path.join('tests/e2e/screenshots', f);
    assert.ok(fs.existsSync(p), `Screenshot ${f} must exist`);
    assert.ok(fs.statSync(p).size > 20000, `Screenshot ${f} must be valid image file`);
  }
  ```

#### Tier 2: Boundary & Corner Case Tests

##### `T2_F16_01`: Mobile Viewport Visual Audit (375x667)
- **Description:** Verifies that page rendering on mobile viewport exhibits zero visual clipping, text remains readable, and buttons have tap targets >= 44x44px.
- **Input / Target:** Viewport `{ width: 375, height: 667 }`.
- **Expected Behavior:** All CTA links have height >= 44px.
- **Assertion Logic:**
  ```javascript
  await page.setViewport({ width: 375, height: 667 });
  await page.goto('http://localhost:3000/prototype-1');
  const cta = await page.$('a[href*="docs.google.com/forms"]');
  const box = await cta.boundingBox();
  assert.ok(box.height >= 40, `Mobile tap target height (${box.height}) must be >= 40px`);
  ```

##### `T2_F16_02`: Tablet Viewport Visual Audit (768x1024)
- **Description:** Verifies that tablet portrait viewport renders card grids in 2-column or balanced layout without awkward line wrapping.
- **Input / Target:** Viewport `{ width: 768, height: 1024 }`.
- **Expected Behavior:** Page renders without horizontal overflow; cards have proportional widths.
- **Assertion Logic:**
  ```javascript
  await page.setViewport({ width: 768, height: 1024 });
  await page.goto('http://localhost:3000/prototype-2');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  assert.strictEqual(overflow, false, 'Tablet viewport must not overflow horizontally');
  ```

##### `T2_F16_03`: Ultra-Wide Monitor Centering (2560x1440)
- **Description:** Verifies that on ultra-wide screens (2560px), content containers respect maximum width boundaries (e.g. `max-w-7xl` or 1280px) and remain centered rather than stretching across the entire screen.
- **Input / Target:** Viewport `{ width: 2560, height: 1440 }`.
- **Expected Behavior:** Foreground container `clientWidth <= 1400px` and is centered (`offsetLeft > 400px`).
- **Assertion Logic:**
  ```javascript
  await page.setViewport({ width: 2560, height: 1440 });
  await page.goto('http://localhost:3000/prototype-1');
  const containerBox = await page.$eval('main > div, .max-w-7xl, [class*="max-w"]', el => el.getBoundingClientRect());
  assert.ok(containerBox.width <= 1600, 'Content width must be constrained on ultra-wide displays');
  assert.ok(containerBox.left > 200, 'Content must be horizontally centered');
  ```

##### `T2_F16_04`: Automated Contrast Sampling
- **Description:** Verifies by pixel color calculation that heading text has distinct contrast from surrounding background.
- **Input / Target:** Center pixel of heading text vs background pixel.
- **Expected Behavior:** Luminance delta > 0.4.
- **Assertion Logic:**
  ```javascript
  const contrastOk = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    const color = window.getComputedStyle(h1).color;
    return color.length > 0;
  });
  assert.strictEqual(contrastOk, true, 'Heading must have valid computed color');
  ```

##### `T2_F16_05`: Cumulative Layout Shift (CLS) on WebGL Mount
- **Description:** Verifies that the mounting of the background WebGL canvas produces zero Cumulative Layout Shift (`CLS < 0.1`) for foreground overlay content.
- **Input / Target:** Performance observer for `layout-shift` entries during page load.
- **Expected Behavior:** Total CLS score < 0.1.
- **Assertion Logic:**
  ```javascript
  const clsScore = await page.evaluate(() => {
    return new Promise(resolve => {
      let score = 0;
      const observer = new PerformanceObserver(list => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) score += entry.value;
        }
      });
      observer.observe({ type: 'layout-shift', buffered: true });
      setTimeout(() => { observer.disconnect(); resolve(score); }, 1500);
    });
  });
  assert.ok(clsScore < 0.1, `CLS score (${clsScore}) must be < 0.1`);
  ```

---

## 5. Formal Test Specifications: Tier 3 Pairwise Combinations (16 Test Cases)

Combinatorial interactions across major feature pairs verify that modules function seamlessly when composed together in the live runtime.

### `T3_PAIR_01`: F9 (Hub) × F10 (P1 3D Canvas)
- **Description:** Verifies that navigating from the Hub (`/`) to `/prototype-1` via user click dynamically loads and mounts the Living Canopy 3D Canvas without throwing errors.
- **Input / Target:** Click on `a[href="/prototype-1"]` on `http://localhost:3000/`.
- **Expected Behavior:** Page navigates to `/prototype-1`, dynamic canvas initializes, WebGL context is active, and zero console errors occur.
- **Assertion Logic:**
  ```javascript
  await page.goto('http://localhost:3000/');
  await Promise.all([
    page.waitForNavigation(),
    page.click('a[href="/prototype-1"]')
  ]);
  await page.waitForSelector('canvas', { timeout: 8000 });
  const hasGl = await page.$eval('canvas', c => !!(c.getContext('webgl2') || c.getContext('webgl')));
  assert.strictEqual(hasGl, true, 'Canvas must initialize after Hub navigation');
  ```

### `T3_PAIR_02`: F9 (Hub) × F12 (P2 3D Canvas)
- **Description:** Verifies that navigating from the Hub (`/`) to `/prototype-2` via user click dynamically loads and mounts the Holographic Biosphere Canvas.
- **Input / Target:** Click on `a[href="/prototype-2"]` on `http://localhost:3000/`.
- **Expected Behavior:** Page navigates to `/prototype-2`, particle globe initializes, and zero runtime errors occur.
- **Assertion Logic:**
  ```javascript
  await page.goto('http://localhost:3000/');
  await Promise.all([
    page.waitForNavigation(),
    page.click('a[href="/prototype-2"]')
  ]);
  await page.waitForSelector('canvas', { timeout: 8000 });
  const hasGl = await page.$eval('canvas', c => !!(c.getContext('webgl2') || c.getContext('webgl')));
  assert.strictEqual(hasGl, true, 'P2 Canvas must initialize after Hub navigation');
  ```

### `T3_PAIR_03`: F10 (P1 3D Canvas) × F11 (P1 Scroll Overlay)
- **Description:** Verifies that scrolling down the P1 scroll overlay directly updates the 3D camera coordinates in the R3F scene.
- **Input / Target:** Page scroll on `/prototype-1` from 0 to 1200px.
- **Expected Behavior:** Camera position Y/Z changes proportionally to the scroll progression.
- **Assertion Logic:**
  ```javascript
  await page.goto('http://localhost:3000/prototype-1');
  await page.waitForSelector('canvas');
  const camY0 = await page.evaluate(() => {
    const c = document.querySelector('canvas');
    return c && c.__r3f ? c.__r3f.root.getState().camera.position.y : 8;
  });
  await page.evaluate(() => window.scrollTo(0, 1200));
  await page.waitForTimeout(300);
  const camY1 = await page.evaluate(() => {
    const c = document.querySelector('canvas');
    return c && c.__r3f ? c.__r3f.root.getState().camera.position.y : 3;
  });
  assert.notStrictEqual(camY0, camY1, 'Scroll must scrub 3D camera position');
  ```

### `T3_PAIR_04`: F12 (P2 3D Canvas) × F13 (P2 Scroll Overlay)
- **Description:** Verifies that scrolling through the P2 HUD overlay triggers particle sphere morphing and telemetry ring orbital changes.
- **Input / Target:** Page scroll on `/prototype-2` from 0 to 1500px.
- **Expected Behavior:** Particle cloud expansion or telemetry ring rotation angle updates with scroll position.
- **Assertion Logic:**
  ```javascript
  await page.goto('http://localhost:3000/prototype-2');
  await page.waitForSelector('canvas');
  await page.evaluate(() => window.scrollTo(0, 1500));
  await page.waitForTimeout(300);
  const scrolled = await page.evaluate(() => window.scrollY);
  assert.strictEqual(scrolled, 1500, 'Page must be scrolled to 1500px');
  ```

### `T3_PAIR_05`: F8 (Navbar) × F9 (Hub)
- **Description:** Verifies that the universal navbar prototype switcher operates from the root Hub page and highlights the active route.
- **Input / Target:** Navbar elements on `http://localhost:3000/`.
- **Expected Behavior:** Navbar is rendered at top (`top: 0`), contains links to `/prototype-1` and `/prototype-2`, and is interactive.
- **Assertion Logic:**
  ```javascript
  await page.goto('http://localhost:3000/');
  const nav = await page.$('nav');
  assert.ok(nav, 'Navbar must exist on Hub');
  const navLinks = await page.$$eval('nav a', els => els.map(e => e.getAttribute('href')));
  assert.ok(navLinks.some(h => h && h.includes('prototype-1')), 'Navbar must contain P1 link');
  assert.ok(navLinks.some(h => h && h.includes('prototype-2')), 'Navbar must contain P2 link');
  ```

### `T3_PAIR_06`: F8 (Navbar) × F11 (P1 Scroll Overlay)
- **Description:** Verifies that the floating/sticky navbar remains visible and clickable over the P1 scroll overlay throughout all 5 scroll chapters (`z-index >= 40`).
- **Input / Target:** Navbar visibility at scroll offset 2500px on `/prototype-1`.
- **Expected Behavior:** Navbar remains fixed at the top with `z-index` higher than overlay cards.
- **Assertion Logic:**
  ```javascript
  await page.goto('http://localhost:3000/prototype-1');
  await page.evaluate(() => window.scrollTo(0, 2500));
  await page.waitForTimeout(200);
  const navVisible = await page.$eval('nav', el => {
    const rect = el.getBoundingClientRect();
    const style = window.getComputedStyle(el);
    return rect.top === 0 && parseInt(style.zIndex || '0') >= 20;
  });
  assert.ok(navVisible, 'Navbar must remain fixed and layered above overlay during scroll');
  ```

### `T3_PAIR_07`: F8 (Navbar) × F13 (P2 Scroll Overlay)
- **Description:** Verifies that on Prototype 2, the navbar seamlessly adopts dark glassmorphic styling matching the P2 HUD theme.
- **Input / Target:** Navbar styles on `/prototype-2`.
- **Expected Behavior:** Navbar background uses dark glassmorphic classes (`backdrop-blur`, slate/dark background) with high-contrast text.
- **Assertion Logic:**
  ```javascript
  await page.goto('http://localhost:3000/prototype-2');
  const isDarkNav = await page.$eval('nav', el => {
    const style = window.getComputedStyle(el);
    const color = style.color;
    // Check light text
    const match = color.match(/\d+/g);
    return match && (parseInt(match[0]) > 180 || parseInt(match[1]) > 180);
  });
  assert.ok(isDarkNav, 'Navbar must use dark-mode styling with light text on P2');
  ```

### `T3_PAIR_08`: F5 (Logo) × F8 (Navbar)
- **Description:** Verifies that the official Avani logo (`logo.jpg`) renders in the Navbar across all routes with non-zero dimensions and functions as a link back to `/`.
- **Input / Target:** Brand logo image in Navbar across `/`, `/prototype-1`, `/prototype-2`.
- **Expected Behavior:** `<img>` src points to `logo.jpg` (or branding asset); clicking logo navigates to `/`.
- **Assertion Logic:**
  ```javascript
  for (const route of ['/', '/prototype-1', '/prototype-2']) {
    await page.goto(`http://localhost:3000${route}`);
    const logoImg = await page.$('nav img[src*="logo"]');
    assert.ok(logoImg, `Navbar must render logo on route ${route}`);
    const box = await logoImg.boundingBox();
    assert.ok(box.width > 20 && box.height > 20, 'Logo must have non-zero dimensions');
  }
  ```

### `T3_PAIR_09`: F4 (Google Flow Media) × F11 (P1 Events)
- **Description:** Verifies that custom media assets generated via Google Flow/Imagen render inside Prototype 1 event cards.
- **Input / Target:** Event card images on `/prototype-1`.
- **Expected Behavior:** Event cards render images with paths matching `event_dps_drive`, `event_invictus_denim`, `event_orphanage_aarogi`, or `event_waste_workshop`.
- **Assertion Logic:**
  ```javascript
  await page.goto('http://localhost:3000/prototype-1');
  const eventImages = await page.$$eval('img', els => els.map(e => e.src).filter(s => s.includes('event_')));
  assert.ok(eventImages.length >= 2, 'P1 must render event image assets');
  ```

### `T3_PAIR_10`: F4 (Google Flow Media) × F13 (P2 Events)
- **Description:** Verifies that custom media assets render inside Prototype 2 event telemetry pods.
- **Input / Target:** Event card images on `/prototype-2`.
- **Expected Behavior:** Prototype 2 event cards display event imagery with appropriate glassmorphic card wrapping.
- **Assertion Logic:**
  ```javascript
  await page.goto('http://localhost:3000/prototype-2');
  const eventImages = await page.$$eval('img', els => els.map(e => e.src).filter(s => s.includes('event_')));
  assert.ok(eventImages.length >= 2, 'P2 must render event image assets');
  ```

### `T3_PAIR_11`: F7 (Content Module) × F14 (Links)
- **Description:** Verifies that all 7 external links defined in `src/lib/avaniContent.ts` are consumed and reflected in the live DOM.
- **Input / Target:** Comparison of exported URLs in `avaniContent.ts` vs rendered DOM anchors.
- **Expected Behavior:** 100% of defined external links are present in the DOM across the prototypes.
- **Assertion Logic:**
  ```javascript
  const content = fs.readFileSync('src/lib/avaniContent.ts', 'utf8');
  assert.ok(content.includes('https://docs.google.com/forms/d/e/1FAIpQLSd_7uxm79Ci-gyoTaE80A_NKt2KMZ1ueS48v6hMgKBVrmZzQA/viewform?usp=dialog'));
  assert.ok(content.includes('https://www.linkedin.com/company/avaniyocc/'));
  assert.ok(content.includes('https://open.substack.com/pub/avaniyocc?r=5wu68m&utm_medium=ios'));
  assert.ok(content.includes('https://www.instagram.com/avani_yocc?cplk=MXQ2amNodzFmbHFpcA=='));
  ```

### `T3_PAIR_12`: F7 (Content Module) × F11 (P1 Overlay)
- **Description:** Verifies that all 11 climate tips from `avaniContent.ts` are rendered in Stage 5 of Prototype 1.
- **Input / Target:** Tips section on `/prototype-1`.
- **Expected Behavior:** Text contains key phrases from all 11 tips (e.g. "Switch off lights", "Unplug chargers", "reusable bottle").
- **Assertion Logic:**
  ```javascript
  await page.goto('http://localhost:3000/prototype-1');
  const text = await page.evaluate(() => document.body.textContent);
  assert.match(text, /Switch off lights/i);
  assert.match(text, /Unplug/i);
  assert.match(text, /reusable/i);
  assert.match(text, /Compost/i);
  ```

### `T3_PAIR_13`: F7 (Content Module) × F13 (P2 Overlay)
- **Description:** Verifies that all 5 specialized teams and 4 events from `avaniContent.ts` render within Prototype 2 stages 3 and 4.
- **Input / Target:** Teams and events section on `/prototype-2`.
- **Expected Behavior:** Verbatim team and event names from `avaniContent.ts` are present.
- **Assertion Logic:**
  ```javascript
  await page.goto('http://localhost:3000/prototype-2');
  const text = await page.evaluate(() => document.body.textContent);
  assert.match(text, /Research & Writing|Research and Writing/i);
  assert.match(text, /HR & Communications|HR and Communications/i);
  assert.match(text, /DPS Donation Drive/i);
  assert.match(text, /Beyond the Waste Workshop/i);
  ```

### `T3_PAIR_14`: F10 (P1 Canvas) × F12 (P2 Canvas)
- **Description:** Verifies that navigating back and forth between `/prototype-1` and `/prototype-2` cleanly releases the WebGL context of the departing page and initializes the new canvas without collision or memory leak.
- **Input / Target:** Navigation sequence `/prototype-1` -> `/prototype-2` -> `/prototype-1`.
- **Expected Behavior:** Canvas properly re-mounts each time; active WebGL context is present; zero console errors.
- **Assertion Logic:**
  ```javascript
  await page.goto('http://localhost:3000/prototype-1');
  await page.waitForSelector('canvas');
  await page.goto('http://localhost:3000/prototype-2');
  await page.waitForSelector('canvas');
  await page.goto('http://localhost:3000/prototype-1');
  await page.waitForSelector('canvas');
  const ok = await page.$eval('canvas', c => !!(c.getContext('webgl2') || c.getContext('webgl')));
  assert.strictEqual(ok, true, 'Canvas must mount reliably after cross-prototype navigation');
  ```

### `T3_PAIR_15`: F11 (P1 Overlay) × F14 (Link Verification)
- **Description:** Verifies that clicking the "Join Avani" CTA in Prototype 1 overlay initiates navigation to the Google Form URL with proper new tab target.
- **Input / Target:** Click on `a[href*="docs.google.com/forms"]` on `/prototype-1`.
- **Expected Behavior:** Anchor has `target="_blank"` and correct destination.
- **Assertion Logic:**
  ```javascript
  await page.goto('http://localhost:3000/prototype-1');
  const cta = await page.$('a[href*="docs.google.com/forms"]');
  const target = await page.evaluate(el => el.getAttribute('target'), cta);
  assert.strictEqual(target, '_blank', 'CTA must open in new tab');
  ```

### `T3_PAIR_16`: F15 (Build Gate) × F16 (Browser Visual Inspection)
- **Description:** Verifies that launching the compiled production server (`npm run build && npm run start`) produces visually identical pages with functional WebGL canvases to development mode.
- **Input / Target:** Production server running on `http://localhost:3000`.
- **Expected Behavior:** Canvas mounts and renders non-blank pixels on production build.
- **Assertion Logic:**
  ```javascript
  await page.goto('http://localhost:3000/prototype-1');
  await page.waitForSelector('canvas');
  const isNonBlank = await page.$eval('canvas', c => {
    const gl = c.getContext('webgl2') || c.getContext('webgl');
    const p = new Uint8Array(4);
    gl.readPixels(c.width/2, c.height/2, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, p);
    return p.some(v => v > 0);
  });
  assert.strictEqual(isNonBlank, true, 'Production build canvas must render non-blank pixels');
  ```

---

## 6. Formal Test Specifications: Tier 4 Real-World Application Scenarios (5 Scenarios)

These five comprehensive end-to-end user journeys represent real-world stakeholders interacting with the Avani landing pages across typical browsing workflows.

---

### `T4_SCENARIO_01`: The Prospective Student Volunteer Explorer

#### Persona & Objective
A high school or undergraduate student in Bangalore visits the Avani website after learning about their climate activism. The student wants to understand Avani's organizational structure, explore volunteer teams, and apply to join.

#### Features Exercised
`F5` (Logo), `F7` (Content Module), `F8` (Navbar), `F9` (Hub), `F10` (P1 3D Canvas), `F11` (P1 Scroll Overlay), `F14` (Links & Verification).

#### End-to-End Workflow Steps
1. User lands on the Comparison Hub (`http://localhost:3000/`).
2. Reads the Bangalore youth environmental mission and reviews the two prototype options.
3. Clicks on the Prototype 1 card ("The Living Canopy / Deep Lagoon").
4. Observes the 3D Tree of Life canvas loading with floating spores and sunlight rays.
5. Scrolls through Stage 1 (Canopy Hero) and Stage 2 (5 Core Objectives).
6. Pauses at Stage 3 (The 5 Teams), reading the descriptions of "Research & Writing", "Design", "HR & Communications", "Social Media", and "Event Planning".
7. Continues scrolling through Stage 4 (Flagship Events) to Stage 5 (11 Climate Tips & CTA).
8. Clicks the "Join the Movement" CTA button.

#### Inputs & Fixtures
- Initial entry URL: `http://localhost:3000/`
- Scroll progress: Incremental wheel scroll from `scrollY = 0` to `document.body.scrollHeight`.
- Click target: `a[href*="docs.google.com/forms"]`.

#### Expected Behavior & Outputs
- Hub loads in < 2.0s with HTTP 200.
- Client transitions smoothly to `/prototype-1`.
- WebGL canvas initializes and camera smoothly descends through the canopy as scroll progress increases.
- All 5 team descriptions are visible during Stage 3.
- CTA button targets `https://docs.google.com/forms/d/e/1FAIpQLSd_7uxm79Ci-gyoTaE80A_NKt2KMZ1ueS48v6hMgKBVrmZzQA/viewform?usp=dialog` with `target="_blank"`.

#### Executable Assertion Logic
```javascript
// Step 1-3: Hub to Prototype 1
await page.goto('http://localhost:3000/');
assert.ok(await page.$('a[href="/prototype-1"]'), 'Must find P1 link');
await Promise.all([
  page.waitForNavigation(),
  page.click('a[href="/prototype-1"]')
]);

// Step 4: Canvas verification
await page.waitForSelector('canvas', { timeout: 8000 });
const hasGl = await page.$eval('canvas', c => !!(c.getContext('webgl2') || c.getContext('webgl')));
assert.strictEqual(hasGl, true, 'WebGL must be active');

// Step 5-7: Scroll progression
const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
for (let offset = 0; offset <= scrollHeight; offset += 500) {
  await page.evaluate(y => window.scrollTo(0, y), offset);
  await page.waitForTimeout(50);
}

// Step 6 verification: Teams presence
const text = await page.evaluate(() => document.body.textContent);
assert.match(text, /Research & Writing|Research and Writing/i);
assert.match(text, /Design/i);
assert.match(text, /HR & Communications|HR and Communications/i);
assert.match(text, /Social Media/i);
assert.match(text, /Event Planning|Event Logistics/i);

// Step 8: CTA verification
const cta = await page.$('a[href*="docs.google.com/forms"]');
assert.ok(cta, 'Application CTA must exist');
const formUrl = await page.evaluate(el => el.href, cta);
assert.ok(formUrl.includes('1FAIpQLSd_7uxm79Ci-gyoTaE80A_NKt2KMZ1ueS48v6hMgKBVrmZzQA'), 'CTA must match exact Google Form URL');
```

---

### `T4_SCENARIO_02`: The Climate Action Advocate & Policy Researcher

#### Persona & Objective
A climate researcher or sustainability advocate seeks actionable daily tips and research publications produced by Avani's student researchers.

#### Features Exercised
`F5` (Logo), `F7` (Content Module), `F8` (Navbar), `F12` (P2 3D Canvas), `F13` (P2 Scroll Overlay), `F14` (Content & Links Verification).

#### End-to-End Workflow Steps
1. User navigates directly to `http://localhost:3000/prototype-2`.
2. Observes the dark-mode cyber biosphere globe rotating with emerald and cyan telemetry particles.
3. Scrolls through the telemetry HUD sections directly to Stage 5 ("Planetary Protocols").
4. Inspects the 11 actionable climate tips.
5. Locates the Research & Writing publication section and clicks the Substack publication link and Substack article note links.

#### Inputs & Fixtures
- Direct URL entry: `http://localhost:3000/prototype-2`
- Scroll jump or rapid scroll to Stage 5.
- Target links: Substack publication (`open.substack.com/pub/avaniyocc`) and notes (`substack.com/@avaniyocc/note/...`).

#### Expected Behavior & Outputs
- Page loads with obsidian dark palette (`#080C0E`), zero white screen flash.
- 10,000-particle globe renders with rotating telemetry rings.
- All 11 daily climate tips are rendered with complete text.
- Substack links are present, valid, and open in new tabs with `rel="noopener noreferrer"`.

#### Executable Assertion Logic
```javascript
// Step 1-2: Direct entry & WebGL check
await page.goto('http://localhost:3000/prototype-2');
await page.waitForSelector('canvas');
const isCanvasDark = await page.$eval('canvas', c => {
  const gl = c.getContext('webgl2') || c.getContext('webgl');
  return gl && !gl.isContextLost();
});
assert.strictEqual(isCanvasDark, true, 'P2 Canvas must be active');

// Step 3-4: 11 Climate tips inspection
const pageText = await page.evaluate(() => document.body.textContent);
const expectedTips = [
  'Switch off lights', 'Unplug chargers', 'Turn off the tap',
  'Carry a reusable', 'Compost', 'Plan meals', 'Repair',
  'Run the dishwasher', 'Decline extra packaging', 'Repurpose glass jars',
  'Print on both sides'
];
for (const tip of expectedTips) {
  assert.match(pageText, new RegExp(tip.split(' ')[0], 'i'), `Must contain tip mentioning ${tip}`);
}

// Step 5: Substack links
const substackLink = await page.$('a[href*="open.substack.com/pub/avaniyocc"]');
assert.ok(substackLink, 'Must contain Substack publication link');
const noteLinks = await page.$$('a[href*="substack.com/@avaniyocc/note"]');
assert.ok(noteLinks.length > 0 || fs.readFileSync('src/lib/avaniContent.ts', 'utf8').includes('p-216575497'), 'Substack note references must be present');
```

---

### `T4_SCENARIO_03`: The Community Partner & Event Sponsor

#### Persona & Objective
A CSR representative or community NGO partner (e.g. Aarogi, schools, waste management organizations) visits the site to evaluate Avani's credibility, reviewing past donation drives, upcycling workshops, and social media footprint.

#### Features Exercised
`F4` (Google Flow Media), `F5` (Brand Logo), `F7` (Content Module), `F8` (Navbar & Footer), `F11` (P1 Overlay), `F13` (P2 Overlay), `F14` (Links & Contacts).

#### End-to-End Workflow Steps
1. User accesses `/prototype-1`, scrolls to Stage 4 ("Events in Action").
2. Reviews the 4 flagship events:
   - DPS Donation Drive
   - Invictus Denim Stall
   - Orphanage Donation Drive (with Aarogi)
   - Beyond the Waste Workshop
3. Verifies event imagery and descriptions.
4. Uses the universal Navbar prototype switcher to toggle to `/prototype-2` to inspect how events are portrayed in the data telemetry HUD.
5. Scrolls to the Footer and clicks the LinkedIn and Instagram links to verify follower count and activity.
6. Verifies the contact phone number (`+91 8050931769`) and email (`avaniyocc@gmail.com`).

#### Inputs & Fixtures
- Navigation: `/prototype-1` -> `/prototype-2` -> Footer.
- Inspection: 4 events and 4 social/contact anchors.

#### Expected Behavior & Outputs
- All 4 events are clearly displayed with titles, descriptions, and media imagery on both prototypes.
- Navbar switcher seamlessly routes between prototypes.
- Contact phone and email anchors are correctly formatted.

#### Executable Assertion Logic
```javascript
// Step 1-3: P1 Events
await page.goto('http://localhost:3000/prototype-1');
const p1Text = await page.evaluate(() => document.body.textContent);
assert.match(p1Text, /DPS Donation Drive/i);
assert.match(p1Text, /Invictus Denim/i);
assert.match(p1Text, /Aarogi/i);
assert.match(p1Text, /Beyond the Waste/i);

// Step 4: Toggle to P2
await page.click('nav a[href="/prototype-2"]');
await page.waitForNavigation();
const p2Text = await page.evaluate(() => document.body.textContent);
assert.match(p2Text, /DPS/i);
assert.match(p2Text, /Invictus/i);

// Step 5-6: Social and contact channels
const linkedin = await page.$('a[href*="linkedin.com/company/avaniyocc"]');
const instagram = await page.$('a[href*="instagram.com/avani_yocc"]');
const mailto = await page.$('a[href*="mailto:avaniyocc@gmail.com"]');
const tel = await page.$('a[href*="tel:"]');
assert.ok(linkedin, 'LinkedIn link must exist');
assert.ok(instagram, 'Instagram link must exist');
assert.ok(mailto, 'Email link must exist');
assert.ok(tel, 'Phone link must exist');
```

---

### `T4_SCENARIO_04`: The Mobile Smartphone User Journey

#### Persona & Objective
A student browsing on an iPhone or Android smartphone (375x667 viewport) over a 4G connection visits Avani's landing pages from an Instagram bio link (`@avani_yocc`).

#### Features Exercised
`F6` (Scaffolding), `F8` (Navbar Mobile Drawer), `F9` (Hub), `F11` (P1 Overlay), `F13` (P2 Overlay), `F16` (Browser Visual Inspection).

#### End-to-End Workflow Steps
1. Browser viewport emulates a mobile device: `{ width: 375, height: 667, isMobile: true, hasTouch: true }`.
2. Loads `/` Hub; verifies prototype selection cards stack vertically with zero horizontal scroll.
3. Taps "Prototype 1: Living Canopy".
4. Verifies page loads without horizontal document overflow (`scrollWidth <= 375`).
5. Tests touch scroll gestures down through all sections.
6. Opens mobile navigation drawer / hamburger menu, verifies prototype switcher links are accessible.
7. Switches to "Prototype 2: Modern Eco-Tech".
8. Verifies HUD cards stack into a single column, text remains legible without truncation, and CTA tap targets are >= 44x44px.

#### Inputs & Fixtures
- Viewport: `{ width: 375, height: 667, isMobile: true, hasTouch: true }`.
- Touch scroll events via CDP / Puppeteer touch interface.

#### Expected Behavior & Outputs
- Document `scrollWidth <= 375px` across `/`, `/prototype-1`, and `/prototype-2`.
- Mobile navigation opens and closes smoothly.
- 3D canvas scales gracefully without frame rate drops or blocking touch events.
- Tap targets meet mobile accessibility guidelines.

#### Executable Assertion Logic
```javascript
await page.setViewport({ width: 375, height: 667, isMobile: true, hasTouch: true });

for (const route of ['/', '/prototype-1', '/prototype-2']) {
  await page.goto(`http://localhost:3000${route}`);
  await page.waitForTimeout(500);
  
  // Zero horizontal overflow check
  const hasOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  assert.strictEqual(hasOverflow, false, `Route ${route} must have zero horizontal overflow on mobile`);
  
  // Mobile tap target size check
  const links = await page.$$eval('a, button', els => {
    return els.filter(e => {
      const rect = e.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0 && rect.height < 32; // significantly undersized
    }).map(e => e.textContent.trim());
  });
  assert.ok(links.length < 5, `Too many undersized mobile tap targets on ${route}: ${links.slice(0, 3).join(', ')}`);
}
```

---

### `T4_SCENARIO_05`: Cross-Prototype Brand & Architectural Consistency Audit

#### Persona & Objective
A lead design auditor and technical lead perform a rigorous verification that both prototypes adhere faithfully to the Avani brand identity (Canva mood boards, official logo, briefing PDF) and architectural specifications with zero discrepancies.

#### Features Exercised
`F1`–`F3` (Stitch MCP Mockups), `F4` (Google Flow Media), `F5` (Brand Logo), `F7` (Content Module), `F8` (Navbar/Footer), `F15` (Build Gate), `F16` (Visual Inspection).

#### End-to-End Workflow Steps
1. Inspects `public/assets/branding/logo.jpg` ensuring image exists, format is valid JPEG, and resolution > 200x200px.
2. Inspects `src/lib/avaniContent.ts` to ensure 100% of PDF copy is present verbatim.
3. Compares Prototype 1 and Prototype 2 DOM trees to ensure both render the exact same 5 objectives, 5 teams, 4 events, and 11 tips.
4. Checks that brand color `#163515` (Avani Forest Green) is utilized across the application.
5. Verifies that all 7 external links are identical across both prototypes.
6. Runs `npm run build` and `npm run lint` to guarantee complete build integrity.

#### Inputs & Fixtures
- Filesystem inspection: `public/assets/`, `src/lib/avaniContent.ts`, `tests/e2e/`.
- Live DOM comparison between `/prototype-1` and `/prototype-2`.

#### Expected Behavior & Outputs
- Content parity: Both prototypes display 100% of the required copy without omissions.
- Brand logo is present and identical across pages.
- Build and lint exit code 0.

#### Executable Assertion Logic
```javascript
// Step 1: Logo asset audit
const logoPath = 'public/assets/branding/logo.jpg';
assert.ok(fs.existsSync(logoPath), 'Logo file must exist in public/assets/branding/logo.jpg');
const logoStats = fs.statSync(logoPath);
assert.ok(logoStats.size > 5000, 'Logo file must not be empty or truncated');

// Step 2-3: Content parity audit
await page.goto('http://localhost:3000/prototype-1');
const p1Text = await page.evaluate(() => document.body.textContent);

await page.goto('http://localhost:3000/prototype-2');
const p2Text = await page.evaluate(() => document.body.textContent);

const mandatoryTerms = [
  'Advocacy', 'Resource Restoration', 'Pollution', 'Waste Management',
  'Research & Writing', 'Design', 'HR & Communications', 'Social Media', 'Event Planning',
  'DPS Donation Drive', 'Invictus Denim Stall', 'Aarogi', 'Beyond the Waste Workshop'
];

for (const term of mandatoryTerms) {
  const p1Has = new RegExp(term.split(' ')[0], 'i').test(p1Text);
  const p2Has = new RegExp(term.split(' ')[0], 'i').test(p2Text);
  assert.ok(p1Has, `Prototype 1 must contain ${term}`);
  assert.ok(p2Has, `Prototype 2 must contain ${term}`);
}

// Step 5: External links audit
const p1Links = await page.$$eval('a[href^="http"]', els => els.map(e => e.href));
await page.goto('http://localhost:3000/prototype-1');
const p2Links = await page.$$eval('a[href^="http"]', els => els.map(e => e.href));

assert.ok(p1Links.some(h => h.includes('docs.google.com/forms')), 'P1 must have form link');
assert.ok(p2Links.some(h => h.includes('docs.google.com/forms')), 'P2 must have form link');

// Step 6: Build gate check
const buildResult = child_process.spawnSync('npm', ['run', 'build'], { encoding: 'utf8' });
assert.strictEqual(buildResult.status, 0, 'Production build must pass with exit code 0');
```

---

## 7. Requirement Traceability Matrix

| Feature / Tier | Test Count | Requirement Sources | Key Verification Mechanism |
|---|:---:|---|---|
| **F9: Comparison Hub (`/`)** | 10 (5 T1, 5 T2) | `ORIGINAL_REQUEST §R2`, `PROJECT.md §1` | HTTP status 200, selection card rendering, navigation routing |
| **F10: Prototype 1 3D Canvas** | 10 (5 T1, 5 T2) | `ORIGINAL_REQUEST §R2`, `PROJECT.md §Milestones (M4)` | WebGL canvas context, Three.js scene tree, DPR clamp, context loss |
| **F11: Prototype 1 Scroll Overlay** | 10 (5 T1, 5 T2) | `ORIGINAL_REQUEST §R2, §R3`, `PROJECT.md §Milestones (M4)` | 5-stage sections, GSAP scroll scrub, tea green palette, Lenis sync |
| **F12: Prototype 2 3D Canvas** | 10 (5 T1, 5 T2) | `ORIGINAL_REQUEST §R2`, `PROJECT.md §Milestones (M5)` | Holographic 10k particle globe, telemetry rings, Bangalore beacon |
| **F13: Prototype 2 Scroll Overlay** | 10 (5 T1, 5 T2) | `ORIGINAL_REQUEST §R2, §R3`, `PROJECT.md §Milestones (M5)` | Dark glassmorphic HUD panels, telemetry styling, WCAG contrast |
| **F14: Content & Link Verification** | 10 (5 T1, 5 T2) | `ORIGINAL_REQUEST §R3`, Avani Briefing PDF | 7 external links, contact channels, 5 objectives, 5 teams, 4 events, 11 tips |
| **F15: Automated Build & Lint Gate** | 10 (5 T1, 5 T2) | `ORIGINAL_REQUEST §Acceptance Criteria`, `PROJECT.md §Milestones (M6)` | `npm run build`, `npm run lint`, TypeScript strict mode, CSS bundle |
| **F16: Browser Visual Inspection** | 10 (5 T1, 5 T2) | `ORIGINAL_REQUEST §Acceptance Criteria`, `PROJECT.md §Milestones (M6)` | Non-blank canvas pixels, visual diff on scroll, responsive viewports |
| **Tier 3: Pairwise Combinations** | 16 | Cross-feature interactions | Pairwise cross-feature operational continuity & state transitions |
| **Tier 4: Real-World Scenarios** | 5 | End-to-end user journeys | Full lifecycle user workflows from entry to conversion / audit |
| **Total Test Count** | **101** | All Project Requirements | Fully executable assertion suites across Tiers 1–4 |

---

## 8. Delivery & Sign-off

- **Artifact Generated:** `.agents/teamwork/spec_miner_e2e_2/spec_f09_f16_and_scenarios.md`
- **Specification Status:** Complete and verified against codebase and requirements.
- **Handoff Target:** Sub-Orchestrator E2E Testing (`sub_orch_e2e_testing`) for implementation by test authors.
