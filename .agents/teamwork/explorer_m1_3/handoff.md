# Milestone M1 Explorer Handoff Report: Artifact Layout & Quality Standards

**Agent:** explorer_m1_3  
**Date:** 2026-11-12  
**Target Milestone:** Milestone M1 (Stitch MCP UI Mockups)  
**Parent Conversation ID:** `ceb60abf-eca0-4fbd-9eea-f06775212a62`  
**State Folder:** `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/explorer_m1_3`  

---

## 1. Observation

1. **Original User Request & Requirements**:
   - `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/ORIGINAL_REQUEST.md`, lines 29–30:
     > "R1. Stitch MCP Design Mockups: Generate UI mockups using Stitch MCP for two landing page prototypes before implementation: Prototype 1 based on the 5th idea from the Canva mood boards, and Prototype 2 based on an alternative creative direction chosen by the team. Present mockups during planning."
   - `ORIGINAL_REQUEST.md`, lines 48–49:
     > "- [ ] Stitch MCP mockups for Prototype 1 and Prototype 2 are created and viewable."
2. **Architecture & Project Layout**:
   - `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/PROJECT.md`, lines 12–14:
     > "Saved locally in `mockups/prototype_1/` and `mockups/prototype_2/` as standalone Tailwind HTML and high-res PNG screenshots."
   - `PROJECT.md`, lines 126–134:
     ```
     ├── mockups/
     │   ├── prototype_1/
     │   │   ├── mockup.html             # Stitch MCP downloaded HTML
     │   │   ├── mockup.png              # Stitch MCP high-res PNG screenshot
     │   │   └── metadata.json           # Screen & project metadata
     │   └── prototype_2/
     │       ├── mockup.html
     │       ├── mockup.png
     │       └── metadata.json
     ```
3. **Stitch MCP Tool Behavior & Base64 Payload Extraction**:
   - `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/explorer_stitch/report.md`, lines 60–65:
     > "MANDATORY: Use the `download_file` MCP tool. It securely decodes and returns:
     > - HTML files: raw UTF-8 string in `{ "html": "<!DOCTYPE html>..." }`.
     > - Screenshots: base64 string in `{ "image": "iVBORw0KGgo...", "image_metadata": {"mime_type": "image/png", "width": 1440, "height": 3200} }`."
4. **Current File System State**:
   - `ls -la /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages`:
     The `mockups/` directory does not currently exist. Only `ORIGINAL_REQUEST.md`, `PROJECT.md`, `TEST_INFRA.md`, and `.agents/` exist.
5. **Runtime Environment**:
   - `python3 --version` returned `Python 3.9.6`.
   - `node --version` returned `v22.23.3`.

---

## 2. Logic Chain

1. **Step 1 (Path & Layout Determinism)**:
   - *Observation Reference*: Observation 2 (`PROJECT.md` lines 126–134).
   - *Inference*: The project code layout strictly designates `mockups/prototype_1/` and `mockups/prototype_2/` as the destinations for generated UI mockups. Each directory must house exactly three canonical files: `mockup.html`, `mockup.png`, and `metadata.json`. No ad-hoc filenames or alternate paths can be permitted.
2. **Step 2 (Binary File Integrity & Magic Byte Enforcement)**:
   - *Observation Reference*: Observation 3 (`explorer_stitch/report.md` line 64).
   - *Inference*: Stitch MCP returns the screenshot as a base64 encoded string. Binary PNG files conform to ISO/IEC 15948:2004 requiring the exact 8-byte magic header `\x89PNG\r\n\x1a\n` (`89 50 4E 47 0D 0A 1A 0A`), an `IHDR` chunk defining positive integer width/height, and an `IEND` chunk. A raw string decode without padding normalization or stripping data URL prefixes (`data:image/png;base64,`) risks silent byte corruption. Thus, an explicit decoding sanitization and header inspection routine is essential.
3. **Step 3 (Textual Integrity & HTML Standards)**:
   - *Observation Reference*: Observation 3 (`explorer_stitch/report.md` line 63).
   - *Inference*: The HTML extracted from `download_file` must be a self-contained, valid HTML document starting with `<!DOCTYPE html>`, containing `<head>`, `<body>`, and UTF-8 encoding without unescaped corruption (`\uFFFD`). Minimum size threshold is established at 5,000 bytes to prevent false-positive validation of empty or truncated error responses.
4. **Step 4 (Traceability via Metadata Schema)**:
   - *Observation Reference*: Observation 2 and Observation 3.
   - *Inference*: Downstream auditing requires verifying which Stitch project and screen generated each file. `metadata.json` must record `projectId`, `screenId`, `dimensions`, file byte counts, SHA-256 hashes, and ISO-8601 timestamps.
5. **Step 5 (Objective Milestone Gate)**:
   - *Observation Reference*: Observation 1 (`ORIGINAL_REQUEST.md` lines 48–49) and SCOPE.md.
   - *Inference*: Milestone M1 completion requires four unambiguous gate levels: Level 1 (Artifact existence), Level 2 (Binary/text integrity), Level 3 (Avani brand coverage), and Level 4 (Consensus approval by 2 reviewers, 2 challengers, and 1 auditor). A turnkey verification script guarantees zero ambiguity.

---

## 3. Caveats

1. **Stitch MCP Upstream Availability**: The specifications assume the Stitch MCP server remains reachable and returns standard responses for `download_file`. If Stitch returns transient errors, the polling and retry mechanisms defined in `explorer_stitch/report.md` must be observed.
2. **Screen Render Length**: The exact vertical height of generated full-page landing page screenshots varies depending on AI model layout generation (typically 2,000px to 6,000px). The minimum height threshold is safely set to 1024px.
3. **Font Rendering in Screenshots**: Base64 screenshots captured by Stitch rely on headless Chrome rendering against Google Fonts (`Plus Jakarta Sans`, `Source Serif 4`, `Inter`, `Space Grotesk`). Slight font anti-aliasing variations do not invalidate the PNG binary integrity.

---

## 4. Conclusion

The output artifact layout and quality standards for Milestone M1 are fully formulated, documented, and ready for worker implementation:
1. **Layout**: Canonical paths `mockups/prototype_1/{mockup.html, mockup.png, metadata.json}` and `mockups/prototype_2/{mockup.html, mockup.png, metadata.json}` under `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/`.
2. **Integrity Protocol**: Validated against 8-byte PNG magic header (`\x89PNG\r\n\x1a\n`), IHDR chunk dimensions (`≥1024x1024`), HTML doctype (`<!DOCTYPE html>`), UTF-8 cleanliness, and minimum byte size thresholds (HTML ≥ 5,000 bytes; PNG ≥ 20,000 bytes).
3. **Decoding Protocol**: Safe base64 decoding with URL prefix stripping, whitespace removal, padding repair, atomic `.tmp` file writing, and SHA-256 checksum generation.
4. **Gate Script**: Complete standalone Python script (`verify_m1_mockups.py` detailed in `report.md` § 6) ready to validate the M1 gate with exit code 0.

---

## 5. Verification Method

To independently verify this specification:
1. **Inspect Report Content**:
   Read `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/explorer_m1_3/report.md` to review the metadata schema, binary decoding implementation, and verification script.
2. **Execute Gate Validation against Output Directory**:
   Once the Worker populates `mockups/`, run:
   ```bash
   python3 -c "
   import sys, os, re, json, struct, hashlib
   # Run verify_m1_mockups logic
   "
   ```
   Or execute the script in `report.md § 6`.
3. **Binary Header Verification on Generated PNGs**:
   ```bash
   # Verify magic bytes
   head -c 8 mockups/prototype_1/mockup.png | xxd -p
   # Expected output: 89504e470d0a1a0a

   # Verify macOS image inspection
   file mockups/prototype_1/mockup.png
   sips -g pixelWidth -g pixelHeight mockups/prototype_1/mockup.png
   ```
4. **HTML Doctype Verification**:
   ```bash
   head -n 5 mockups/prototype_1/mockup.html
   # Expected output starts with <!DOCTYPE html>
   ```
5. **Invalidation Conditions**:
   - If `mockups/prototype_X/mockup.png` does not begin with `89 50 4E 47 0D 0A 1A 0A`.
   - If `mockups/prototype_X/mockup.html` does not begin with `<!DOCTYPE html>` or is under 5,000 bytes.
   - If `metadata.json` is missing required provenance fields or checksums mismatch.
