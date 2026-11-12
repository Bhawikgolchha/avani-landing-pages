# Scope: M1 — Stitch MCP UI Mockups

## Objective
Generate, download, and store local UI mockups for Prototype 1 and Prototype 2 using Google Stitch MCP.

## Deliverables
- `mockups/prototype_1/mockup.html` (downloaded HTML)
- `mockups/prototype_1/mockup.png` (high-res PNG screenshot)
- `mockups/prototype_1/metadata.json` (screen & project IDs)
- `mockups/prototype_2/mockup.html` (downloaded HTML)
- `mockups/prototype_2/mockup.png` (high-res PNG screenshot)
- `mockups/prototype_2/metadata.json` (screen & project IDs)

## Known Stitch Project IDs
- Prototype 1 (Canva Idea 5 - Living Canopy / Glow Garden):
  - Project ID: `projects/18170970693892025815`
  - Screen ID: `projects/18170970693892025815/screens/01c2fb483bc34a05b03ed9b5f6656974`
  - HTML file: `projects/18170970693892025815/files/5ca181eddfc740b8a34c425a1a5bde43`
  - Screenshot: `projects/18170970693892025815/files/296a497b565c457c9cac93fd686b22b0`
- Prototype 2 (Modern Eco-Tech Biosphere / Cyber-Environmental):
  - Project ID: `projects/12011247087668392922`
  - Screen ID: `projects/12011247087668392922/screens/49f4d3023a8c407ab9266e35239836be`
  - HTML file: `projects/12011247087668392922/files/6f8690a3ee314cf4a672ee1afdc5e301`
  - Screenshot: `projects/12011247087668392922/files/1eea4b64633d4f7999148e8d5599dbe9`

## Iteration Procedure
1. Worker: Use `download_file` from StitchMCP to download files, write them to `mockups/prototype_1/` and `mockups/prototype_2/`, write `metadata.json`. Verify non-empty files.
2. Reviewers (2): Verify visual quality, complete Avani branding, valid HTML/PNG.
3. Challengers (2): Verify local file integrity, aspect ratio, responsive structure.
4. Auditor: Forensic audit for authentic downloads.
5. Gate & Handoff: Record GATE_STATUS.md and notify parent orchestrator.
