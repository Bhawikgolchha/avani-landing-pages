# Scope: Milestone M1 — Stitch MCP UI Mockups

## Objective
Generate, download, and verify Stitch MCP UI design mockups for Avani landing page Prototype 1 (Canva Idea 5 - Blume/Glow Garden) and Prototype 2 (Editorial Earth Journal & Kinetic Climate Advocacy) into local project storage (`mockups/prototype_1` and `mockups/prototype_2`).

## Context & Inputs
- `ORIGINAL_REQUEST.md`: Original user requirements R1 (Stitch MCP design mockups) and brand details.
- `PROJECT.md`: Project architecture, Feature Inventory (F1, F2, F3), and code layout.
- `explorer_stitch/report.md`: Verified tool interface signatures, JSON payloads, and authoritative prompts.

## Deliverables & Acceptance Criteria
1. Project Creation & Design System:
   - Stitch project "Avani Landing Page - Prototype 1" with Design System 1 (Organic Tactile Youth - Blume Garden).
   - Stitch project "Avani Landing Page - Prototype 2" with Design System 2 (Editorial Earth Journal).
2. Screen Generation:
   - Prototype 1 desktop screen generated via `generate_screen_from_text` (DESKTOP, GEMINI_3_8_FLASH) using the full Blume/Glow Garden prompt.
   - Prototype 2 desktop screen generated via `generate_screen_from_text` (DESKTOP, GEMINI_3_8_FLASH) using the full Editorial Earth Journal prompt.
3. Local Artifact Export:
   - `mockups/prototype_1/mockup.html` (downloaded HTML)
   - `mockups/prototype_1/mockup.png` (decoded screenshot PNG)
   - `mockups/prototype_1/metadata.json` (metadata with IDs, dimensions, timestamps)
   - `mockups/prototype_2/mockup.html` (downloaded HTML)
   - `mockups/prototype_2/mockup.png` (decoded screenshot PNG)
   - `mockups/prototype_2/metadata.json` (metadata with IDs, dimensions, timestamps)
4. Verification & Gate:
   - Valid, non-empty, renderable files.
   - Accurate Avani brand representation (objectives, teams, events, tips, links).
   - 2 Reviewers APPROVE, 2 Challengers confirm correctness, 1 Forensic Auditor reports CLEAN.
