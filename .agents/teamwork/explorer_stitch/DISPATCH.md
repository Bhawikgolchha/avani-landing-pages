## 2026-11-12T08:05:15Z
You are a teamwork_explorer.
Read the original request at `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/ORIGINAL_REQUEST.md` (and `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/ORIGINAL_REQUEST.md`) before doing anything.

Working directory: `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages`
State folder: `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/explorer_stitch`

Your mission:
Investigate Stitch MCP capabilities, schema, and workflow for creating UI design mockups for Avani's two landing page prototypes:
1. Check the Stitch MCP tool definitions and schemas in `/Users/bhavikgolchha07/.gemini/antigravity/mcp/StitchMCP/` or via call_mcp_tool / schema inspection. Tools include:
   `create_project`, `get_project`, `update_project`, `delete_project`, `list_projects`, `list_screens`, `get_screen`, `update_screen`, `download_file`, `generate_screen_from_text`, `edit_screens`, `generate_variants`, `upload_design_md`, `create_design_system`, `create_design_system_from_design_md`, `update_design_system`, `list_design_systems`, `apply_design_system`.
2. Map out the exact step-by-step procedure to:
   - Create a Stitch project for Avani (or two projects, one per prototype).
   - Set up or upload design system / DESIGN.md with Avani brand colors, typography, and styling tokens.
   - Generate screens for Prototype 1 (representing the 5th mood board idea) and Prototype 2 (alternative creative direction) using `generate_screen_from_text` or relevant tools.
   - Download or extract the generated screen files, HTML, screenshots, or assets using `download_file` / `get_screen` to local files in the project so they are locally viewable and documented.
3. Test or verify tool invocation patterns using `call_mcp_tool` (read schemas first!) to confirm connectivity and required arguments.
4. Document the exact actionable plan, prompt formats, parameter specs, and artifact paths in `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/explorer_stitch/report.md`.
5. Write `handoff.md` in your state folder and notify the orchestrator with send_message when complete.
