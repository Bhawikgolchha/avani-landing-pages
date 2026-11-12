# Task Assignment: E2E Test Harness & Runner Setup

**Objective**:
Implement the core test runner and test assertion harness in `tests/e2e/runner.js` and `tests/e2e/harness.js`.

**Mandatory Reference Files**:
- User Request: `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/ORIGINAL_REQUEST.md`
- Master Blueprint: `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/PROJECT.md`
- Test Infra Blueprint: `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/TEST_INFRA.md`
- Scope Document: `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/sub_orch_e2e_gen3/SCOPE.md`

**Write Ownership**:
You exclusively own:
- `tests/e2e/runner.js`
- `tests/e2e/harness.js`

**Requirements**:
1. Implement `tests/e2e/harness.js`:
   - Standalone test runner utilities using `node:assert` and clean test registration (`describe`, `test`, `it`, `before`, `after`).
   - Assertion helpers:
     - `assertFileExists(filePath, message)`
     - `assertFileNonEmpty(filePath, minBytes, message)`
     - `assertFileContains(filePath, patternOrString, message)`
     - `assertJsonMatches(filePath, schemaValidatorFn, message)`
     - `assertExitCode(cmd, expectedCode, options)`
     - `assertColorContrast(foregroundHex, backgroundHex, minRatio)`
     - `assertValidUrl(url, message)`
   - Progressive testability: All assertions provide clear, human-readable diagnostics and capture failures gracefully without crashing the runner process.
2. Implement `tests/e2e/runner.js`:
   - Discovers and executes all test suites across `tests/e2e/tier1-features/`, `tests/e2e/tier2-boundaries/`, `tests/e2e/tier3-combinations/`, and `tests/e2e/tier4-scenarios/`.
   - Supports CLI flags: `--tier=1`, `--tier=2`, `--tier=3`, `--tier=4`, `--all`, `--json`, `--verbose`.
   - Aggregates test counts by Tier and by Feature (F1 through F16).
   - Generates summary report to console and optionally writes `tests/e2e/results.json`.
   - Exits with POSIX exit code 0 if all executed tests pass, or exit code 1 if any failure occurs.
   - Handles the case where test files for upcoming tiers are still being populated (skips or reports 0 if empty/missing directory).
3. Verify your implementation by running:
   `node tests/e2e/runner.js --help` and a dry-run test with the harness.
4. Document all verification commands and outcomes in `handoff.md` in your state folder.

DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.


## 2026-11-12T10:02:28Z
You are assigned to build the E2E Test Harness and Master Runner for the Avani interactive landing pages project.

Working Directory: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages
Your State Folder: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/test_writer_harness/

Mandatory Reference Files:
- User Request: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/ORIGINAL_REQUEST.md
- Master Blueprint: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/PROJECT.md
- Test Infra Blueprint: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/TEST_INFRA.md
- Task Assignment: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/test_writer_harness/DISPATCH.md

Write Ownership:
You exclusively own:
- tests/e2e/harness.js
- tests/e2e/runner.js


## 2026-11-12T10:23:57Z
**Context**: Test Harness & Runner Setup
**Content**: Implementation in `tests/e2e/harness.js` and `tests/e2e/runner.js` appears complete. Please finalize your `handoff.md` and send your completion report.
**Action**: Write handoff.md and reply with completion report.
