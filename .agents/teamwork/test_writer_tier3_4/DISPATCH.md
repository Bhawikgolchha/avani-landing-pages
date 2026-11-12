## 2026-11-12T10:31:16Z
You are assigned to implement Tier 3 Pairwise Combinations and Tier 4 Real-World Application Scenario E2E Tests for the Avani interactive landing pages project.

Working Directory: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages
Your State Folder: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/test_writer_tier3_4/

Mandatory Reference Files:
- User Request: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/ORIGINAL_REQUEST.md
- Master Blueprint: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/PROJECT.md
- Test Infra Blueprint: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/TEST_INFRA.md
- Task Assignment: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/test_writer_tier3_4/DISPATCH.md
- Test Harness: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/tests/e2e/harness.js

Write Ownership:
You exclusively own:
- tests/e2e/tier3-combinations/
- tests/e2e/tier4-scenarios/

Requirements:
1. Read ORIGINAL_REQUEST.md, TEST_INFRA.md, and tests/e2e/harness.js.
2. Implement `tests/e2e/tier3-combinations/t3_pairwise_interactions.test.js`:
   - At least 16 pairwise interaction tests covering major cross-feature pairs:
     - Pair 1 (F1 x F3): P1 Stitch Mockup generation x Local HTML/PNG export integrity
     - Pair 2 (F2 x F3): P2 Stitch Mockup generation x Local HTML/PNG export integrity
     - Pair 3 (F4 x F11): Google Flow generated media x P1 scroll overlay card rendering
     - Pair 4 (F4 x F13): Google Flow media x P2 dark glassmorphic HUD tabs rendering
     - Pair 5 (F5 x F8): Brand logo asset x Universal Navbar rendering and brand link
     - Pair 6 (F5 x F9): Brand logo asset x Central Comparison Hub (/) header rendering
     - Pair 7 (F6 x F10): Next.js App Router layout x P1 3D Canvas SSR isolation
     - Pair 8 (F6 x F12): Next.js App Router layout x P2 3D Canvas particle system initialization
     - Pair 9 (F7 x F11): Shared avaniContent.ts module x P1 5-stage scroll journey cards
     - Pair 10 (F7 x F13): Shared avaniContent.ts module x P2 HUD interactive sections
     - Pair 11 (F7 x F14): Shared avaniContent.ts link data x Contact & Link verification across all social channels
     - Pair 12 (F8 x F9): Universal Navbar prototype switcher x Navigation routes (/, /prototype-1, /prototype-2)
     - Pair 13 (F10 x F11): P1 3D scene canvas fixed positioning x GSAP ScrollTrigger overlay scrub coordination
     - Pair 14 (F12 x F13): P2 3D particle globe canvas x HUD telemetry cards synchronized scroll rotation
     - Pair 15 (F14 x F8): Universal Footer social links x Verified Avani external URLs
     - Pair 16 (F15 x F16): Next.js build compilation gate x Browser visual styling and contrast assertions
3. Implement `tests/e2e/tier4-scenarios/t4_real_world_workloads.test.js`:
   - At least 5 end-to-end user journeys:
     - Scenario 1: Prospective Student Explorer (Hub -> P1 -> 5 scroll stages -> application form)
     - Scenario 2: Climate Action Advocate (Direct to P2 -> 11 tips -> Substack link)
     - Scenario 3: Event Attendee & Donor (4 events exploration -> Instagram / LinkedIn links)
     - Scenario 4: Mobile Device Responsive Journey (Mobile 375x667 viewport navigation, typography, no horizontal overflow)
     - Scenario 5: Design & Architecture Consistency Audit (Stitch mockups, media, and live code color harmony #163515, logo dimensions, verbatim copy)
4. Import harness functions: `const { describe, test, it, assertFileExists, assertFileNonEmpty, assertFileContains, assertJsonMatches, assertValidUrl, assertColorContrast, assert } = require('../harness');`
5. Verify by running `node tests/e2e/runner.js --tier=3` and `node tests/e2e/runner.js --tier=4`.
6. Deliver handoff report in `handoff.md` in your state folder.
