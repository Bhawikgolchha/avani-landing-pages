## 2026-11-12T08:44:07Z

You are the E2E Testing Orchestrator for Avani Landing Pages.
Read the original request at `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/ORIGINAL_REQUEST.md` and project blueprint at `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/PROJECT.md` before doing anything.

Working directory: `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages`
State folder: `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/sub_orch_e2e_testing`
Your parent orchestrator conversation ID: `ac7e2cdd-aed0-49d4-acd7-75a2107e2cad`

Your mission:
You own the E2E Testing Track per Project Pattern:
1. Create `TEST_INFRA.md` at project root using the standard template in your instructions.
2. Design a comprehensive opaque-box test suite derived strictly from `ORIGINAL_REQUEST.md` and user requirements, covering:
   - Tier 1: Feature Coverage (>=5 tests per feature across all 16 features in Feature Inventory)
   - Tier 2: Boundary & Corner Cases (>=5 tests per feature)
   - Tier 3: Cross-Feature Combinations (pairwise interactions)
   - Tier 4: Real-World Application Scenarios (>=5 application-level scenarios: e.g. student exploring both prototypes, checking off 11 climate tips, verifying 3D scroll movement, navigating to external links, mobile viewport check)
3. Delegate test creation to specialized subagents (e.g. `teamwork_test_writer`) to author test runners and test scripts under `tests/e2e/`. Tests must test the real running application (e.g. via Playwright, Puppeteer, or Node HTTP + DOM assertion runner).
4. When the test runner and all test cases across Tiers 1-4 are fully written and verified ready to execute against local server, publish `TEST_READY.md` at project root.
5. Record all progress in your state folder (`BRIEFING.md`, `progress.md`, `GATE_STATUS.md`) and notify your parent orchestrator with `send_message` when `TEST_READY.md` is published.
