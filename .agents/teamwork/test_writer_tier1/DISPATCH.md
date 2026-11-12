# Task Assignment: Tier 1 Feature Coverage Tests (F1-F16)

**Objective**:
Implement comprehensive opaque-box Tier 1 test cases (minimum 5 tests per feature across all 16 features F1-F16, total >= 80 test cases) in `tests/e2e/tier1-features/`.

**Mandatory Reference Files**:
- User Request: `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/ORIGINAL_REQUEST.md`
- Master Blueprint: `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/PROJECT.md`
- Test Infra Blueprint: `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/TEST_INFRA.md`
- Test Harness: `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/tests/e2e/harness.js`

**Write Ownership**:
You exclusively own the entire directory:
- `tests/e2e/tier1-features/`

**Test Structure**:
Create the following 16 test files (each containing at least 5 distinct, robust, opaque-box tests tagged with their respective feature and tier):
1. `tests/e2e/tier1-features/t1_f01_stitch_p1.test.js`:
   - F1: Stitch MCP P1 Mockup (validates existence of `mockups/prototype_1/mockup.html`, `mockup.png`, `metadata.json`, HTML content reflects Living Canopy / Canva Idea 5, screen metadata valid).
2. `tests/e2e/tier1-features/t1_f02_stitch_p2.test.js`:
   - F2: Stitch MCP P2 Mockup (validates existence of `mockups/prototype_2/mockup.html`, `mockup.png`, `metadata.json`, HTML content reflects Modern Eco-Tech Biosphere / Alternative direction, screen metadata valid).
3. `tests/e2e/tier1-features/t1_f03_mockup_export.test.js`:
   - F3: Stitch Mockup Local Export (verifies HTML files are valid HTML5 with <!DOCTYPE html>, non-zero byte size, PNG files are valid images with PNG magic bytes `\x89PNG`, metadata JSON contains valid screen dimensions).
4. `tests/e2e/tier1-features/t1_f04_google_flow_media.test.js`:
   - F4: Google Flow Media Generation (verifies presence of generated visual assets in `public/assets/images/`, including hero canopy, hero ecotech globe, event images, climate tips infographic).
5. `tests/e2e/tier1-features/t1_f05_brand_logo.test.js`:
   - F5: Brand Logo Integration (verifies `public/assets/branding/logo.jpg` exists, matches original uploaded logo or dimensions, Avani brand green `#163515` compliance).
6. `tests/e2e/tier1-features/t1_f06_scaffolding.test.js`:
   - F6: Next.js 14 Scaffolding (verifies `package.json` contains Next.js 14, Tailwind, Three.js, R3F, Drei, GSAP, Lenis, TypeScript, `tsconfig.json` exists, `tailwind.config.ts` configured).
7. `tests/e2e/tier1-features/t1_f07_content_module.test.js`:
   - F7: Shared Brand Content Module (verifies `src/lib/avaniContent.ts` exports exactly 5 objectives, 5 teams, 4 events, 11 climate tips, and valid contact links with verbatim copy from ORIGINAL_REQUEST.md).
8. `tests/e2e/tier1-features/t1_f08_navbar_footer.test.js`:
   - F8: Universal Navbar & Footer (verifies presence of navigation component, prototype switcher links `/`, `/prototype-1`, `/prototype-2`, footer contact info, external links).
9. `tests/e2e/tier1-features/t1_f09_comparison_hub.test.js`:
   - F9: Comparison Hub (`/`) (verifies route `src/app/page.tsx` exists, renders comparison between Prototype 1 and Prototype 2, direct links to both prototypes).
10. `tests/e2e/tier1-features/t1_f10_p1_3d_canvas.test.js`:
    - F10: Prototype 1 3D Canvas (verifies Living Canopy tree canvas component, SSR isolation `{ ssr: false }`, fixed background canvas styling).
11. `tests/e2e/tier1-features/t1_f11_p1_overlay.test.js`:
    - F11: Prototype 1 Scroll Overlay (verifies 5-stage GSAP scroll journey sections, soft tactile cards, Avani content integration).
12. `tests/e2e/tier1-features/t1_f12_p2_3d_canvas.test.js`:
    - F12: Prototype 2 3D Canvas (verifies 10,000-particle holographic Earth globe component, telemetry rings, camera orbit configuration).
13. `tests/e2e/tier1-features/t1_f13_p2_overlay.test.js`:
    - F13: Prototype 2 Scroll Overlay (verifies dark glassmorphic HUD overlay, interactive tabs, full Avani content integration).
14. `tests/e2e/tier1-features/t1_f14_links_verification.test.js`:
    - F14: Content & Link Verification (verifies all 7 external URLs: application form, LinkedIn, Substack, Instagram, 3 Substack articles, plus email and phone).
15. `tests/e2e/tier1-features/t1_f15_build_lint.test.js`:
    - F15: Automated Build & Lint Gate (verifies build/lint npm scripts are defined in `package.json`, TypeScript compiles or passes syntax check).
16. `tests/e2e/tier1-features/t1_f16_visual_inspection.test.js`:
    - F16: Browser Visual Inspection (verifies viewport styling, responsive CSS classes, meta viewport in layout, color contrast ratios).

**Harness Import**:
Each test file should import the test primitives from harness:
```js
const { describe, test, it, assertFileExists, assertFileNonEmpty, assertFileContains, assertJsonMatches, assertValidUrl, assertColorContrast, assert } = require('../harness');
```

**Verification**:
Run `node tests/e2e/runner.js --tier=1` to ensure all Tier 1 test files are discovered and properly executed.
Document your results and test counts in `handoff.md`.

DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.


## 2026-11-12T10:30:05Z
You are assigned to implement Tier 1 Feature Coverage E2E Tests for the Avani interactive landing pages project.

Working Directory: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages
Your State Folder: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/test_writer_tier1/

Mandatory Reference Files:
- User Request: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/ORIGINAL_REQUEST.md
- Master Blueprint: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/PROJECT.md
- Test Infra Blueprint: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/TEST_INFRA.md
- Task Assignment: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/test_writer_tier1/DISPATCH.md
- Test Harness: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/tests/e2e/harness.js

Write Ownership:
You exclusively own:
- tests/e2e/tier1-features/ (all 16 test files: t1_f01 through t1_f16)

Requirements:
1. Read ORIGINAL_REQUEST.md, TEST_INFRA.md, and tests/e2e/harness.js.
2. Implement 16 test files in `tests/e2e/tier1-features/`:
   - `t1_f01_stitch_p1.test.js` (F1, >=5 tests)
   - `t1_f02_stitch_p2.test.js` (F2, >=5 tests)
   - `t1_f03_mockup_export.test.js` (F3, >=5 tests)
   - `t1_f04_google_flow_media.test.js` (F4, >=5 tests)
   - `t1_f05_brand_logo.test.js` (F5, >=5 tests)
   - `t1_f06_scaffolding.test.js` (F6, >=5 tests)
   - `t1_f07_content_module.test.js` (F7, >=5 tests)
   - `t1_f08_navbar_footer.test.js` (F8, >=5 tests)
   - `t1_f09_comparison_hub.test.js` (F9, >=5 tests)
   - `t1_f10_p1_3d_canvas.test.js` (F10, >=5 tests)
   - `t1_f11_p1_overlay.test.js` (F11, >=5 tests)
   - `t1_f12_p2_3d_canvas.test.js` (F12, >=5 tests)
   - `t1_f13_p2_overlay.test.js` (F13, >=5 tests)
   - `t1_f14_links_verification.test.js` (F14, >=5 tests)
   - `t1_f15_build_lint.test.js` (F15, >=5 tests)
   - `t1_f16_visual_inspection.test.js` (F16, >=5 tests)
   Total: at least 80 tests.
3. Import harness functions: `const { describe, test, it, assertFileExists, assertFileNonEmpty, assertFileContains, assertJsonMatches, assertValidUrl, assertColorContrast, assert } = require('../harness');`
4. Verify by running `node tests/e2e/runner.js --tier=1`.
5. Deliver handoff report in `handoff.md` in your state folder.
