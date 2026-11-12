# Task Assignment: Tier 2 Boundary & Corner Cases (F1-F16)

**Objective**:
Implement comprehensive opaque-box Tier 2 boundary and corner case test suites (minimum 5 tests per feature across all 16 features F1-F16, total >= 80 test cases) in `tests/e2e/tier2-boundaries/`.

**Mandatory Reference Files**:
- User Request: `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/ORIGINAL_REQUEST.md`
- Master Blueprint: `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/PROJECT.md`
- Test Infra Blueprint: `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/TEST_INFRA.md`
- Test Harness: `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/tests/e2e/harness.js`

**Write Ownership**:
You exclusively own the entire directory:
- `tests/e2e/tier2-boundaries/`

**Test Structure**:
Create the following 5 boundary test files covering all 16 features (minimum 80 tests total):
1. `tests/e2e/tier2-boundaries/t2_f01_f03_mockup_bounds.test.js` (F1, F2, F3 - 15 boundary tests):
   - Empty/truncated HTML boundary checks, malformed HTML tag detection, minimum HTML document size limits (>= 500 bytes).
   - Corrupted/truncated PNG image detection (checking full PNG signature bytes `89 50 4E 47 0D 0A 1A 0A`, IHDR chunk presence, dimensions >= 100x100).
   - Missing/malformed JSON metadata fields (checking missing screenId, invalid timestamps, zero width/height).
2. `tests/e2e/tier2-boundaries/t2_f04_f05_media_bounds.test.js` (F4, F5 - 10 boundary tests):
   - Zero-byte asset detection, missing hero image fallbacks, unsupported image extensions.
   - Logo color boundary tests: WCAG 2.1 color contrast checks on extreme background pairs (pure black, pure white, translucent tea-green, dark emerald).
   - Aspect ratio and image dimension boundaries for hero banners and event cards.
3. `tests/e2e/tier2-boundaries/t2_f06_f09_route_bounds.test.js` (F6, F7, F8, F9 - 20 boundary tests):
   - Next.js package dependency version compatibility boundaries (Next.js >= 14.0.0, React >= 18.0.0, Three.js >= 0.160.0).
   - Content array boundary checks: exactly 5 objectives (rejecting <5 or >5), exactly 5 teams, exactly 4 events, exactly 11 climate tips (none missing or duplicated IDs).
   - Route path resolution boundaries: exact matching on `/`, `/prototype-1`, `/prototype-2`, trailing slash handling, 404/not-found layout boundaries.
   - Navbar responsive breakpoint limits (mobile < 768px, tablet 768px-1024px, desktop > 1024px).
4. `tests/e2e/tier2-boundaries/t2_f10_f13_canvas_bounds.test.js` (F10, F11, F12, F13 - 20 boundary tests):
   - Particle count boundary tests for Prototype 2 globe (>= 10,000 particles configured in code/constants).
   - ScrollTrigger progress boundaries: progress normalized between 0.0 and 1.0 (clamping, negative scroll handling, overscroll handling).
   - WebGL context loss handling and SSR canvas isolation `{ ssr: false }` verification.
   - 5-stage scroll section boundaries: start/end scroll triggers for all 5 stages in P1, tab switching boundaries in P2 HUD overlay.
5. `tests/e2e/tier2-boundaries/t2_f14_f16_content_bounds.test.js` (F14, F15, F16 - 15 boundary tests):
   - URL protocol boundaries: rejecting `javascript:`, `data:`, or malformed URL schemes.
   - Substack article URL format validation: regex matching note/post IDs.
   - Contact phone number E.164 / international format validation (+91 8050931769).
   - Viewport boundary stress tests: extreme narrow mobile (320px width), extreme wide 4K (3840px width), ultra-tall viewports.
   - Build script boundaries: verifying exit code expectations and timeout thresholds.

**Harness Import**:
```js
const { describe, test, it, assertFileExists, assertFileNonEmpty, assertFileContains, assertJsonMatches, assertValidUrl, assertColorContrast, assert } = require('../harness');
```

**Verification**:
Run `node tests/e2e/runner.js --tier=2` to ensure all Tier 2 boundary test files are discovered and properly executed.
Document your results and test counts in `handoff.md`.

DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.


## 2026-11-12T10:30:37Z
Sender: b58e1816-cf0e-4426-b0bc-8725ea44b308
You are assigned to implement Tier 2 Boundary & Corner Case E2E Tests for the Avani interactive landing pages project.

Working Directory: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages
Your State Folder: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/test_writer_tier2/

Mandatory Reference Files:
- User Request: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/ORIGINAL_REQUEST.md
- Master Blueprint: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/PROJECT.md
- Test Infra Blueprint: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/TEST_INFRA.md
- Task Assignment: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/test_writer_tier2/DISPATCH.md
- Test Harness: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/tests/e2e/harness.js

Write Ownership:
You exclusively own:
- tests/e2e/tier2-boundaries/ (all 5 test files)

Requirements:
1. Read ORIGINAL_REQUEST.md, TEST_INFRA.md, and tests/e2e/harness.js.
2. Implement 5 boundary test files in `tests/e2e/tier2-boundaries/`:
   - `t2_f01_f03_mockup_bounds.test.js` (F1, F2, F3 - >=15 boundary tests: HTML truncation, PNG magic byte corruption, JSON metadata schema boundaries)
   - `t2_f04_f05_media_bounds.test.js` (F4, F5 - >=10 boundary tests: zero-byte detection, aspect ratio limits, logo color contrast on extreme backgrounds)
   - `t2_f06_f09_route_bounds.test.js` (F6, F7, F8, F9 - >=20 boundary tests: package version constraints, exact array lengths 5 objectives/5 teams/4 events/11 tips, route matching, responsive breakpoint limits)
   - `t2_f10_f13_canvas_bounds.test.js` (F10, F11, F12, F13 - >=20 boundary tests: particle count >= 10,000, scroll clamping 0.0-1.0, SSR canvas isolation, 5-stage triggers)
   - `t2_f14_f16_content_bounds.test.js` (F14, F15, F16 - >=15 boundary tests: URL protocol rejection of javascript/data, phone regex, viewport stress tests 320px to 3840px, build timeouts)
   Total: at least 80 tests.
3. Import harness functions: `const { describe, test, it, assertFileExists, assertFileNonEmpty, assertFileContains, assertJsonMatches, assertValidUrl, assertColorContrast, assert } = require('../harness');`
4. Verify by running `node tests/e2e/runner.js --tier=2`.
5. Deliver handoff report in `handoff.md` in your state folder.
