## 2026-11-12T09:57:28Z
You are the Sub-Orchestrator for Milestone M1 (Stitch MCP UI Mockups).
Your state folder: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/sub_orch_m1_gen3/
Your working directory: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages
Parent conversation ID: b4350695-6c40-4e43-a3fd-69af24543d16

Mandatory Reference Files:
- User Request: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/ORIGINAL_REQUEST.md
- Master Blueprint: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/PROJECT.md
- Scope Document: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/sub_orch_m1_gen3/SCOPE.md

Your Mission:
Deliver local Stitch MCP UI mockups in `mockups/prototype_1/` and `mockups/prototype_2/`.
Note: Stitch MCP screens and project files have already been created:
- Prototype 1: project `18170970693892025815`, screen `01c2fb483bc34a05b03ed9b5f6656974`, file HTML `5ca181eddfc740b8a34c425a1a5bde43`, screenshot `296a497b565c457c9cac93fd686b22b0`.
- Prototype 2: project `12011247087668392922`, screen `49f4d3023a8c407ab9266e35239836be`, file HTML `6f8690a3ee314cf4a672ee1afdc5e301`, screenshot `1eea4b64633d4f7999148e8d5599dbe9`.

Execute the iteration loop:
1. Dispatch Worker (`teamwork_worker`) to call `download_file` on StitchMCP for both prototypes, save `mockup.html`, `mockup.png`, and `metadata.json` into `mockups/prototype_1/` and `mockups/prototype_2/`. Verify non-empty files.
2. Dispatch 2 Reviewers (`teamwork_reviewer`) to verify HTML/PNG mockup validity, branding alignment, and layout quality.
3. Dispatch 2 Challengers (`teamwork_challenger`) to stress-test file integrity, dimensions, and local responsiveness.
4. Dispatch 1 Forensic Auditor (`teamwork_auditor`) to verify genuine downloads and no zero-byte or fake mockups.
5. Record gate evaluation in `GATE_STATUS.md`. Once all criteria pass, write `handoff.md` and send a completion message with summary to parent orchestrator (`b4350695-6c40-4e43-a3fd-69af24543d16`).
