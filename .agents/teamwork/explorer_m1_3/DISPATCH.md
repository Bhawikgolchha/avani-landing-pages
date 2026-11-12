## 2026-11-12T08:46:31Z
Sender: ceb60abf-eca0-4fbd-9eea-f06775212a62
Priority: MESSAGE_PRIORITY_HIGH

You are an Explorer for Milestone M1 (Stitch MCP UI Mockups) on the Avani Landing Pages project.
Working directory: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages
State folder: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/explorer_m1_3

MANDATORY FIRST STEP: Read /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/ORIGINAL_REQUEST.md before doing anything.

Also read:
- /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/PROJECT.md
- /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/sub_orch_m1_stitch/SCOPE.md
- /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/explorer_stitch/report.md

Your focus: Output Artifact Layout & Quality Standards
1. Define the exact file storage layout under `mockups/`:
   - `mockups/prototype_1/mockup.html`
   - `mockups/prototype_1/mockup.png`
   - `mockups/prototype_1/metadata.json`
   - `mockups/prototype_2/mockup.html`
   - `mockups/prototype_2/mockup.png`
   - `mockups/prototype_2/metadata.json`
2. Specify exact file integrity checks (non-empty files, valid HTML doctype, valid PNG magic bytes/header, valid JSON metadata containing screen ID and timestamps).
3. Outline how the Worker should decode base64 PNG data into binary files and ensure no corrupted bytes.
4. Define the exact pass/fail criteria for the Milestone M1 Gate.
5. Write your findings to /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/explorer_m1_3/report.md and /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/explorer_m1_3/handoff.md.
6. Send a completion message to the sub-orchestrator when finished.
