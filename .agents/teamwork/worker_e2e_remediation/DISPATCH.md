# Task Assignment: Remediation of E2E Test Suite per Reviewer Feedback

## Working Directory
`/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages`

## State Folder
`/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/worker_e2e_remediation/`

## Mandatory Reference Files
- User Request: `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/ORIGINAL_REQUEST.md`
- Master Blueprint: `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/PROJECT.md`
- Test Infra Blueprint: `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/TEST_INFRA.md`
- Scope Document: `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/sub_orch_e2e_gen3/SCOPE.md`
- Reviewer 1 Handoff: `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/reviewer_e2e_1/handoff.md`
- Reviewer 2 Handoff: `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/reviewer_e2e_2/handoff.md`

## Instructions
1. In `tests/e2e/tier2-boundaries/t2_f06_f09_route_bounds.test.js`:
   Add test case `F9.5` under Feature F9 so that F9 has at least 5 tests in Tier 2 (e.g. verifying prototype card route URLs, badges, and accessible CTA button states under boundary conditions). Total Tier 2 tests will become 104.
2. In `tests/e2e/runner.js`:
   Fix the silent pass on invalid flags or missing files:
   If `testFilesQueue.length === 0` (due to invalid `--tier`, unmatched filters, or missing file arguments), set `exitCode = 1` and report an error instead of reporting `PASSED` with exit code 0.
3. In `tests/e2e/tier1-features/t1_f10_p1_3d_canvas.test.js` and `tests/e2e/tier2-boundaries/t2_f10_f13_canvas_bounds.test.js`:
   Relax the SSR regex from `/\{\s*ssr:\s*false\s*\}/` to `/ssr:\s*false/` so that additional options like `loading: () => ...` don't cause false failures.
4. Support modular component reading:
   In test files that inspect Prototype 1 / Prototype 2 pages (`t1_f10_p1_3d_canvas.test.js`, `t1_f11_p1_overlay.test.js`, `t1_f16_visual_inspection.test.js`, `t2_f10_f13_canvas_bounds.test.js`, `t2_f14_f16_content_bounds.test.js`, `t3_pairwise_interactions.test.js`, `t4_real_world_workloads.test.js`):
   When reading page content, concatenate the content of modular components if imported (`src/components/prototype1/P1Overlay.tsx`, `P1Scene.tsx`, `src/components/prototype2/P2Overlay.tsx`, `P2Scene.tsx`) so tests pass reliably whether code is inlined or decomposed into clean React components.
5. Run the test suite:
   - `node tests/e2e/runner.js --all` (verify all 232 tests pass with exit code 0)
   - `node tests/e2e/runner.js --tier=2` (verify 104 tests pass, including all 5 F9 tests)
   - `node tests/e2e/runner.js --tier=invalid` (verify it exits with code 1)
   - `npm run build && npm run lint` (verify build passes)
6. Update `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/TEST_READY.md`:
   Update total tests to 232 (Tier 1: 95, Tier 2: 104, Tier 3: 18, Tier 4: 15) and update the F9 row in the feature checklist table to show Tier 2: 5 tests (or 6 tests if applicable) and 100% pass.
7. MANDATORY INTEGRITY WARNING: DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.
8. Write your completion report in `handoff.md` in your state folder and message your parent when complete.


## 2026-11-12T12:28:02Z
You are the E2E Test Suite Remediation Worker.
Your working directory: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages
Your state folder: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/worker_e2e_remediation/
Caller conversation ID: 35f04c01-a2be-487a-bcda-a43e0b988035
