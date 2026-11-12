# Dispatch: Test Writer Core (Harness & Runner)

## Mandatory Inputs
- Original Request: `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/ORIGINAL_REQUEST.md`
- Project Blueprint: `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/PROJECT.md`
- Test Infrastructure: `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/TEST_INFRA.md`
- Harness & Runner Architecture: `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/explorer_e2e_3/test_harness_architecture.md`
- Working Directory: `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages`
- State Folder: `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/test_writer_core`

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Exclusive Write Boundaries
You have exclusive write ownership over:
- `tests/e2e/harness.js`
- `tests/e2e/runner.js`

## Assigned Objectives
1. Read `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/explorer_e2e_3/test_harness_architecture.md`.
2. Implement `tests/e2e/harness.js` using the exact, complete, production-ready implementation from Section 4 of `test_harness_architecture.md`.
3. Implement `tests/e2e/runner.js` using the exact, complete, production-ready implementation from Section 3 of `test_harness_architecture.md`.
4. Verify by running `node tests/e2e/runner.js --list` and `node tests/e2e/runner.js --help`.
5. Write your handoff report to `handoff.md` in your state folder.
6. Notify parent orchestrator via `send_message`.
