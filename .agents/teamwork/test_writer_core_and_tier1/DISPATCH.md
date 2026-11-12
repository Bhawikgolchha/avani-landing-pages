## 2026-11-12T09:03:17Z
You are Test Writer Core & Tier 1 for Avani Landing Pages E2E Testing.
Working directory: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages
State folder: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/test_writer_core_and_tier1

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

CRITICAL: Read the original request at /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/ORIGINAL_REQUEST.md, the project blueprint at /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/PROJECT.md, the test infra plan at /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/TEST_INFRA.md, and your dispatch instructions at /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/test_writer_core_and_tier1/DISPATCH.md before starting.

References:
- Runner & Harness Architecture: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/explorer_e2e_3/test_harness_architecture.md
- F1-F8 Specifications: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/spec_miner_e2e_1/spec_f01_f08.md
- F9-F16 Specifications: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/spec_miner_e2e_2/spec_f09_f16_and_scenarios.md

Your exclusive write boundaries:
- tests/e2e/harness.js
- tests/e2e/runner.js
- tests/e2e/tier1-features/ (all 16 test files: t1_f01_stitch_p1.test.js to t1_f16_visual_inspection.test.js)

Tasks:
1. Implement `tests/e2e/harness.js` using the exact implementation from Section 4 of `test_harness_architecture.md`.
2. Implement `tests/e2e/runner.js` using the exact implementation from Section 3 of `test_harness_architecture.md`.
3. Create `tests/e2e/tier1-features/` and author all 16 test files (5 tests each = 80 tests total):
   - `t1_f01_stitch_p1.test.js`
   - `t1_f02_stitch_p2.test.js`
   - `t1_f03_mockup_export.test.js`
   - `t1_f04_google_flow_media.test.js`
   - `t1_f05_brand_logo.test.js`
   - `t1_f06_scaffolding.test.js`
   - `t1_f07_content_module.test.js`
   - `t1_f08_navbar_footer.test.js`
   - `t1_f09_comparison_hub.test.js`
   - `t1_f10_p1_3d_canvas.test.js`
   - `t1_f11_p1_overlay.test.js`
   - `t1_f12_p2_3d_canvas.test.js`
   - `t1_f13_p2_overlay.test.js`
   - `t1_f14_links_verification.test.js`
   - `t1_f15_build_lint.test.js`
   - `t1_f16_visual_inspection.test.js`
4. Run `node tests/e2e/runner.js --tier=1` and ensure the runner executes all 16 files and 80 tests cleanly.
5. Write your handoff report to `handoff.md` in your state folder.
6. When complete, notify parent orchestrator via send_message.
