# Task Assignment: E2E Test Execution & TEST_READY Verification

## Working Directory
`/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages`

## State Folder
`/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/worker_e2e_runner/`

## Mandatory Reference Files
- User Request: `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/ORIGINAL_REQUEST.md`
- Master Blueprint: `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/PROJECT.md`
- Test Infra Blueprint: `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/TEST_INFRA.md`
- Scope Document: `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/sub_orch_e2e_gen3/SCOPE.md`

## Instructions
1. Read all mandatory reference files.
2. Execute the master test runner across all tiers:
   - `node tests/e2e/runner.js --all`
   - `node tests/e2e/runner.js --tier=1`
   - `node tests/e2e/runner.js --tier=2`
   - `node tests/e2e/runner.js --tier=3`
   - `node tests/e2e/runner.js --tier=4`
   - `node tests/e2e/runner.js --json`
3. Document exact test counts, pass rates, and execution time per tier.
4. Author and publish `TEST_READY.md` at `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/TEST_READY.md` strictly formatted with:
   - Runner command (`node tests/e2e/runner.js`)
   - Coverage summary table (Tiers 1-4 with exact counts)
   - Complete 16-feature checklist (F1 through F16) detailing Tier 1 count, Tier 2 count, Tier 3 pairwise status, and Tier 4 scenario status.
5. MANDATORY INTEGRITY WARNING: DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.
6. Write a complete handoff report to `handoff.md` in your state folder and message your parent when complete.


## 2026-11-12T11:47:47Z
You are the E2E Test Execution Worker.
Your working directory: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages
Your state folder: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/worker_e2e_runner/
Caller conversation ID: 35f04c01-a2be-487a-bcda-a43e0b988035

Read your task assignment in:
/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/worker_e2e_runner/DISPATCH.md

Mandatory reference files:
- User Request: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/ORIGINAL_REQUEST.md
- Master Blueprint: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/PROJECT.md
- Test Infra Blueprint: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/TEST_INFRA.md
- Scope Document: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/sub_orch_e2e_gen3/SCOPE.md

Your mission:
1. Execute the master test runner across all tiers:
   - `node tests/e2e/runner.js --all`
   - `node tests/e2e/runner.js --tier=1`
   - `node tests/e2e/runner.js --tier=2`
   - `node tests/e2e/runner.js --tier=3`
   - `node tests/e2e/runner.js --tier=4`
   - `node tests/e2e/runner.js --json`
2. Document exact test counts, pass rates, and execution time per tier.
3. Author and publish `TEST_READY.md` at `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/TEST_READY.md` strictly formatted with:
   - Runner command (`node tests/e2e/runner.js`)
   - Coverage summary table (Tiers 1-4 with exact counts)
   - Complete 16-feature checklist (F1 through F16) detailing Tier 1 count, Tier 2 count, Tier 3 pairwise status, and Tier 4 scenario status.
4. MANDATORY INTEGRITY WARNING: DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.
5. Write your full report in `handoff.md` in your state folder, and send a completion message with send_message to recipient 35f04c01-a2be-487a-bcda-a43e0b988035.
