## 2026-11-12T08:56:21Z

You are the Worker for Milestone M1 (Stitch MCP UI Mockups) on the Avani Landing Pages project.
Working directory: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages
State folder: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/worker_m1_stitch

MANDATORY FIRST STEP: Read /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/ORIGINAL_REQUEST.md before doing anything.

Also read:
- /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/PROJECT.md
- /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/sub_orch_m1_stitch/SCOPE.md
- /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/explorer_m1_1/report.md
- /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/explorer_m1_2/report.md
- /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/explorer_m1_3/report.md

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A teamwork_auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

YOUR WRITE OWNERSHIP:
You exclusively own all files under:
`mockups/prototype_1/*`
`mockups/prototype_2/*`
and your state folder `.agents/teamwork/worker_m1_stitch/*`.

YOUR MISSION & EXECUTION STEPS:
1. Call Stitch MCP `create_project` for Prototype 1 ("Avani Landing Page - Prototype 1") and Prototype 2 ("Avani Landing Page - Prototype 2").
   - Remember: extract the bare project ID (without `projects/` prefix) for subsequent tool calls.
2. Call `create_design_system` for each project using the design token specifications in `explorer_stitch/report.md § 3.1` (Prototype 1) and `§ 3.2` (Prototype 2).
3. Call `generate_screen_from_text` on server `StitchMCP`:
   - Prototype 1: `projectId: <bare_p1_id>`, `deviceType: "DESKTOP"`, `modelId: "GEMINI_3_8_FLASH"`, using the enriched prompt from `explorer_m1_2/report.md § 3.4 (Prompt 1)`.
   - Prototype 2: `projectId: <bare_p2_id>`, `deviceType: "DESKTOP"`, `modelId: "GEMINI_3_8_FLASH"`, using the enriched prompt from `explorer_m1_2/report.md § 3.4 (Prompt 2)`.
   - If the call times out or is asynchronous, DO NOT reissue `generate_screen_from_text`. Instead, poll `list_screens` with `projectId` every 30 seconds until the generated screen is listed with `htmlCode.name` and `screenshot.name`.
4. Call `download_file` on server `StitchMCP`:
   - Pass `name: screen.htmlCode.name` to get the raw HTML string.
   - Pass `name: screen.screenshot.name` to get the base64-encoded PNG screenshot string and dimensions metadata.
5. Save the outputs into the local workspace following the atomic decoding and file writing procedure in `explorer_m1_3/report.md § 5`:
   - `mockups/prototype_1/mockup.html` (raw UTF-8 HTML string, > 5KB, starts with `<!DOCTYPE html>`)
   - `mockups/prototype_1/mockup.png` (clean base64 decode to binary PNG, > 20KB, begins with 8-byte magic header `\x89PNG\r\n\x1a\n`)
   - `mockups/prototype_1/metadata.json` (provenance metadata including projectId, screenId, dimensions, file sizes, SHA-256 checksums, and ISO-8601 timestamps)
   - `mockups/prototype_2/mockup.html`
   - `mockups/prototype_2/mockup.png`
   - `mockups/prototype_2/metadata.json`
6. Run the standalone verification script defined in `explorer_m1_3/report.md § 6` (`verify_m1_mockups.py` or inline python check) to verify:
   - All 6 files exist and match integrity criteria.
   - Magic bytes and dimensions are verified.
7. Document all actions, tool parameters, Stitch IDs, and verification results in `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/worker_m1_stitch/handoff.md`.
8. Send a completion message via `send_message` to the sub-orchestrator.
