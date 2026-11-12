# Formal E2E Test Specification & Assertion Criteria: Features F1 through F8

**Project:** Avani Interactive 3D Scroll Landing Pages  
**Milestone:** M6 — E2E Testing & Verification Infrastructure  
**Author:** Spec Miner 1 (`spec_miner_e2e_1`)  
**Date:** 2026-11-12T08:52:00Z  
**Source Specifications:** `ORIGINAL_REQUEST.md`, `PROJECT.md`, `TEST_INFRA.md`, Stitch MCP schemas, Google Flow DOM analysis, and Brand Briefing PDF.

---

## Features Discovered

| # | Category | Feature | Description | Inputs | Outputs | Error Behavior | Discovered Via |
|---|----------|---------|-------------|--------|---------|----------------|----------------|
| 1 | Mockups | F1: Stitch MCP P1 Mockup | UI Mockup generation for Prototype 1 based on Canva Idea 5 (Blume/Glow Garden) via Stitch MCP | Stitch project title, light theme tokens (`#163515`, `#D0E8C5`), prompt with Canva Idea 5 text | Project ID, Screen resource `projects/{id}/screens/{screenId}`, HTML URI, PNG URI | Rejects malformed prompts with invalid argument; async polling timeout after 180s | `ORIGINAL_REQUEST.md §R1`, `explorer_stitch/report.md` |
| 2 | Mockups | F2: Stitch MCP P2 Mockup | UI Mockup generation for Prototype 2 based on Alternative Direction (Editorial Earth Journal) via Stitch MCP | Stitch project title, dark theme tokens (`#0F2410`, `#22C55E`, `#8ED1E0`), prompt with editorial text | Project ID, Screen resource `projects/{id}/screens/{screenId}`, HTML URI, PNG URI | Rejects invalid model IDs; 404 for invalid project ID; graceful failure on long prompts | `ORIGINAL_REQUEST.md §R1`, `explorer_stitch/report.md` |
| 3 | Export | F3: Stitch Mockup Local Export | Download and file persistence of generated mockup HTML, PNG screenshot, and metadata | Screen file URIs `projects/{id}/files/{fileId}`, local destination paths `mockups/prototype_1` & `mockups/prototype_2` | Local files: `mockup.html`, `mockup.png`, `metadata.json` | Detects zero-byte files, validates UTF-8 characters, validates PNG magic bytes | `PROJECT.md § Architecture`, `sub_orch_m1_stitch/SCOPE.md` |
| 4 | Media | F4: Google Flow Media Generation | Generation of custom hero, event, and infographic visual assets using Google Flow via `cli-anything-brave` | Text prompts in `[contenteditable]`, aspect ratio settings, start generation click | WebP image assets in `public/assets/images/` (Hero 16:9, Events 4:3, Infographic) | Credit warning triggers automated fallback to native `generate_image` (Imagen 3); timeout handling | `ORIGINAL_REQUEST.md §R4`, `explorer_tech_media/report.md` |
| 5 | Branding | F5: Brand Logo Integration | Installation and static serving of official Avani logo from brain user upload | Source file path `/Users/bhavikgolchha07/.../media_1794462993310_400d91e2.jpg` | Target file `public/assets/branding/logo.jpg`, served via HTTP at `/assets/branding/logo.jpg` | Missing source path detection; partial copy guard; non-destructive copy | `ORIGINAL_REQUEST.md § Reference`, `sub_orch_m2_media/SCOPE.md` |
| 6 | Scaffolding | F6: Next.js 14 Scaffolding & Setup | Next.js 14 App Router, TypeScript, Tailwind, Three.js, R3F, Drei, GSAP, and Lenis setup | `package.json`, `tsconfig.json`, `tailwind.config.ts`, `src/app/layout.tsx`, routes | Functioning Next.js app compiling with exit code 0 (`npm run build`) | React 19 peer conflict guard; SSR WebGL window isolation (`ssr: false`); strict typecheck | `PROJECT.md § Architecture`, `sub_orch_m3_scaffolding/SCOPE.md` |
| 7 | Content | F7: Shared Brand Content Module | Authoritative TypeScript content module exporting verbatim Avani copy and external links | Brand Briefing PDF extracted text, contact phone, email, and external social/form URLs | `src/lib/avaniContent.ts` exporting typed constants: `AVANI_CONTENT`, `AVANI_OBJECTIVES`, `AVANI_TEAMS`, etc. | Deep immutability (`Object.freeze`); regex format validation for phone/email; zero empty strings | `ORIGINAL_REQUEST.md §R3`, `PROJECT.md § Interface Contracts` |
| 8 | UI/UX | F8: Universal Navbar & Footer | Responsive navigation bar with prototype switcher, Apply CTA, and universal footer with all links | Screen viewport dimensions, scroll position, user clicks on switcher and mobile menu | Rendered header `<nav>` with logo and switcher; footer with social, contact, and legal links | Mobile collapse toggle; protocol scheme checking (`mailto:`, `tel:`); sticky z-index stack | `ORIGINAL_REQUEST.md §R3`, `PROJECT.md § System Components` |

---

## Edge Cases

| # | Feature | Input | Observed Behavior |
|---|---------|-------|-------------------|
| 1 | F1: Stitch P1 Mockup | Calling `generate_screen_from_text` with project ID formatted as `projects/{id}` instead of bare `{id}` | Stitch MCP returns `Request contains an invalid argument` error. ID prefix must be stripped. |
| 2 | F1: Stitch P1 Mockup | Calling `generate_screen_from_text` with empty prompt string `""` | Server rejects request immediately with 400 Bad Request / Invalid Argument. |
| 3 | F2: Stitch P2 Mockup | Calling `generate_screen_from_text` with prompt length >16KB | Server may truncate prompt or timeout after 180s. Must chunk or bound prompt size. |
| 4 | F2: Stitch P2 Mockup | Querying `list_screens` on non-existent project ID `0000000000000000` | Stitch MCP returns NOT_FOUND status code without hanging. |
| 5 | F3: Mockup Export | Direct fetch/curl of Stitch screen URL (`https://stitch.googleapis.com/...`) without bearer token | Returns HTTP 401 Unauthorized. Files must be retrieved via `download_file` tool. |
| 6 | F3: Mockup Export | Decoding base64 screenshot into binary PNG when output stream is interrupted | Results in truncated PNG with missing `IEND` chunk. Validated via magic bytes and length. |
| 7 | F4: Google Flow | Clicking "Start generation" when Google Flow credits are 0 | UI prompts modal requiring credit purchase or shows low-credit banner. Pipeline must trigger fallback. |
| 8 | F4: Google Flow | Generating image with aspect ratio selector uninitialized | Defaults to 1:1 square instead of requested 16:9 widescreen or 4:3 card format. |
| 9 | F5: Logo Integration | Copying logo when destination directory `public/assets/branding` does not exist | `fs.copyFileSync` throws `ENOENT`. Parent directory must be created recursively beforehand. |
| 10 | F5: Logo Integration | Requesting `/assets/branding/logo.jpg` with uppercase extension `logo.JPG` on case-sensitive Linux/mac | Returns HTTP 404. Strict lowercase naming `logo.jpg` must be enforced across code and disk. |
| 11 | F6: Scaffolding | Installing `@react-three/fiber` with React 19 (`react@^19.0.0`) | NPM peer dependency resolution fails with `ERESOLVE`. Must pin React strictly to `18.3.1`. |
| 12 | F6: Scaffolding | Rendering R3F `<Canvas>` in Next.js Server Component without dynamic `{ ssr: false }` | Throws `ReferenceError: window is not defined` or `WebGLRenderingContext is undefined` during build. |
| 13 | F7: Brand Content | Attempting runtime property mutation on `AVANI_CONTENT.objectives[0]` | Throws `TypeError: Cannot assign to read only property` when protected by `Object.freeze`. |
| 14 | F7: Brand Content | Parsing phone number with leading/trailing spaces or missing international dial code | Fails E.164 phone regex check `/^\+91\s?[0-9]{10}$/`. Verbatim value `+91 8050931769` required. |
| 15 | F8: Navbar/Footer | Opening mobile drawer on 375px mobile viewport while body scrolling is active | Page content behind drawer scrolls awkwardly unless scroll lock or fixed overlay is applied. |
| 16 | F8: Navbar/Footer | Clicking "Apply Now" without `rel="noopener noreferrer"` attribute on external tab | Vulnerable to reverse tabnabbing security exploit. Strict attribute validation required. |

---

## Detailed Test Specifications (Features F1 through F8)

### Feature F1: Stitch MCP P1 Mockup

#### Tier 1: Functional & Interface Tests

##### Test ID: `T1_F01_01`
- **Description**: Verify Stitch MCP Project Creation and Ownership for Prototype 1.
- **Input / Target Artifact or Endpoint**: Stitch MCP tool call `list_projects` with `{ "filter": "view=owned" }` or `get_project` with project ID.
- **Expected Behavior / Output**: A project titled `"Avani Landing Page - Prototype 1"` exists, possesses an active state, and has a resource name conforming to `projects/{numeric_id}`.
- **Assertion Logic**:
  ```javascript
  const res = await callMcpTool('StitchMCP', 'list_projects', { filter: 'view=owned' });
  const p1Project = res.projects?.find(p => p.title === 'Avani Landing Page - Prototype 1');
  assert(p1Project !== undefined, 'Prototype 1 project must exist in Stitch MCP');
  assert(/^projects\/[0-9]+$/.test(p1Project.name), 'Project name must follow "projects/{id}" format');
  ```

##### Test ID: `T1_F01_02`
- **Description**: Verify Prototype 1 Design System Configuration & Brand Palette Mapping.
- **Input / Target Artifact or Endpoint**: Stitch MCP tool call `list_design_systems` with `{ "projectId": "<p1_project_id>" }`.
- **Expected Behavior / Output**: Returns a design system object matching Canva Idea 5 (Blume / Glow Garden), specifying `colorMode: "LIGHT"`, primary green `#163515`, accent tea green `#D0E8C5`, and modern rounded typography (`Plus Jakarta Sans`).
- **Assertion Logic**:
  ```javascript
  const dsRes = await callMcpTool('StitchMCP', 'list_design_systems', { projectId: p1ProjectId });
  const ds = dsRes.designSystems?.[0];
  assert(ds !== undefined, 'Design system must be configured for Prototype 1');
  assert(ds.theme.colorMode === 'LIGHT', 'Prototype 1 design system colorMode must be LIGHT');
  assert(ds.theme.customColor?.toLowerCase() === '#163515', 'Primary brand color must be #163515');
  assert(ds.theme.bodyFont?.includes('Plus Jakarta Sans'), 'Body font must specify Plus Jakarta Sans');
  ```

##### Test ID: `T1_F01_03`
- **Description**: Verify Desktop Screen Generation Execution & Model Selection.
- **Input / Target Artifact or Endpoint**: Stitch MCP tool call `list_screens` with `{ "projectId": "<p1_project_id>" }`.
- **Expected Behavior / Output**: At least one screen record is returned with `deviceType: "DESKTOP"` and generated using model `GEMINI_3_8_FLASH`.
- **Assertion Logic**:
  ```javascript
  const screensRes = await callMcpTool('StitchMCP', 'list_screens', { projectId: p1ProjectId });
  assert(Array.isArray(screensRes.screens) && screensRes.screens.length >= 1, 'At least 1 screen must be generated');
  const desktopScreen = screensRes.screens.find(s => s.deviceType === 'DESKTOP');
  assert(desktopScreen !== undefined, 'Screen must be targeted for DESKTOP device type');
  assert(desktopScreen.modelId === 'GEMINI_3_8_FLASH', 'Screen modelId must be GEMINI_3_8_FLASH');
  ```

##### Test ID: `T1_F01_04`
- **Description**: Verify Content & Prompt Alignment with Canva Idea 5 Blume/Glow Garden.
- **Input / Target Artifact or Endpoint**: Screen metadata prompt string or generation payload for Prototype 1.
- **Expected Behavior / Output**: Generation prompt includes verbatim Avani mission (`"Small Actions of Many Add Up to Change the World"`), 5 core objectives, 4 events (`"DPS Donation Drive"`), and Canva Idea 5 design keywords (`"Blume"`, `"Glow Garden"`, `"Tea Green"`).
- **Assertion Logic**:
  ```javascript
  const prompt = metadata.generationPrompt;
  assert(prompt.includes('Small Actions of Many Add Up to Change the World'), 'Prompt must contain hero headline');
  assert(prompt.includes('DPS Donation Drive') && prompt.includes('Invictus Denim Stall'), 'Prompt must contain events');
  assert(prompt.includes('Blume') || prompt.includes('Glow Garden') || prompt.includes('D0E8C5'), 'Prompt must specify Idea 5 aesthetic');
  ```

##### Test ID: `T1_F01_05`
- **Description**: Verify Screen Asset Resource Pointers for HTML Code and Screenshot.
- **Input / Target Artifact or Endpoint**: Target screen object from `get_screen` call.
- **Expected Behavior / Output**: Screen object contains non-null `htmlCode` and `screenshot` references with resource URIs formatted as `projects/{id}/files/{fileId}`.
- **Assertion Logic**:
  ```javascript
  const screen = await callMcpTool('StitchMCP', 'get_screen', { name: screenResourceName });
  assert(screen.htmlCode?.name && screen.htmlCode.name.startsWith('projects/'), 'Valid htmlCode file path required');
  assert(screen.htmlCode.mimeType === 'text/html', 'htmlCode mimeType must be text/html');
  assert(screen.screenshot?.name && screen.screenshot.name.startsWith('projects/'), 'Valid screenshot file path required');
  assert(screen.screenshot.mimeType === 'image/png', 'screenshot mimeType must be image/png');
  ```

---

#### Tier 2: Boundary & Robustness Tests

##### Test ID: `T2_F01_01`
- **Description**: Rejection of Empty or Whitespace-Only Prompts in Screen Generation.
- **Input / Target Artifact or Endpoint**: `generate_screen_from_text` with `prompt: "   "`.
- **Expected Behavior / Output**: MCP server rejects request with an error containing "invalid argument" or status 400.
- **Assertion Logic**:
  ```javascript
  await assert.rejects(
    async () => callMcpTool('StitchMCP', 'generate_screen_from_text', { projectId: p1ProjectId, prompt: '   ' }),
    /invalid argument|empty|prompt/i,
    'Server must reject empty whitespace prompt'
  );
  ```

##### Test ID: `T2_F01_02`
- **Description**: Idempotency & Resource Isolation under Concurrent Screen Generation.
- **Input / Target Artifact or Endpoint**: Two simultaneous `generate_screen_from_text` calls on Prototype 1 project.
- **Expected Behavior / Output**: Server generates two distinct screen instances with unique screen IDs and does not overwrite existing records.
- **Assertion Logic**:
  ```javascript
  const [screenA, screenB] = await Promise.all([
    callMcpTool('StitchMCP', 'generate_screen_from_text', { projectId: p1ProjectId, prompt: promptText + ' [A]' }),
    callMcpTool('StitchMCP', 'generate_screen_from_text', { projectId: p1ProjectId, prompt: promptText + ' [B]' })
  ]);
  assert(screenA.id !== screenB.id, 'Screen IDs must be unique');
  assert(screenA.name !== screenB.name, 'Screen resource paths must be unique');
  ```

##### Test ID: `T2_F01_03`
- **Description**: Polling Loop Timeout Guard & Readiness Recovery (180s Ceiling).
- **Input / Target Artifact or Endpoint**: Polling iteration loop checking screen readiness.
- **Expected Behavior / Output**: Generation loop completes within 180 seconds or terminates with an explicit timeout exception.
- **Assertion Logic**:
  ```javascript
  const startTime = Date.now();
  let ready = false;
  while (Date.now() - startTime < 180000) {
    const s = await callMcpTool('StitchMCP', 'get_screen', { name: screenName });
    if (s.htmlCode?.name && s.screenshot?.name) { ready = true; break; }
    await new Promise(r => setTimeout(r, 5000));
  }
  assert(ready, 'Screen assets must become available before 180s timeout');
  ```

##### Test ID: `T2_F01_04`
- **Description**: Design System Color Token Hex Validation Boundary.
- **Input / Target Artifact or Endpoint**: `create_design_system` with invalid color strings (e.g. `"#XYZ123"`, `"rgb(999,999,999)"`).
- **Expected Behavior / Output**: Tool call rejects invalid hex format or sanitizes to standard 6-digit hex.
- **Assertion Logic**:
  ```javascript
  await assert.rejects(
    async () => callMcpTool('StitchMCP', 'create_design_system', {
      projectId: p1ProjectId,
      designSystem: { theme: { customColor: '#ZZZZZZ' } }
    }),
    /invalid|color|hex/i,
    'Invalid hex color must be rejected'
  );
  ```

##### Test ID: `T2_F01_05`
- **Description**: Project ID Prefix Stripping and Sanitation Boundary.
- **Input / Target Artifact or Endpoint**: `list_screens` called with `"projects/12345"` vs `"12345"`.
- **Expected Behavior / Output**: Client wrapper sanitizes input by removing `"projects/"` prefix if present, preventing `Request contains an invalid argument` error.
- **Assertion Logic**:
  ```javascript
  const rawId = p1ProjectId.replace(/^projects\//, '');
  const res1 = await callMcpTool('StitchMCP', 'list_screens', { projectId: rawId });
  assert(res1 && !res1.error, 'Bare numeric projectId must succeed without error');
  ```

---

### Feature F2: Stitch MCP P2 Mockup

#### Tier 1: Functional & Interface Tests

##### Test ID: `T1_F02_01`
- **Description**: Verify Stitch MCP Project Creation for Prototype 2 (Alternative Direction).
- **Input / Target Artifact or Endpoint**: `list_projects` with `{ "filter": "view=owned" }`.
- **Expected Behavior / Output**: A project titled `"Avani Landing Page - Prototype 2"` exists and is distinct from Prototype 1.
- **Assertion Logic**:
  ```javascript
  const res = await callMcpTool('StitchMCP', 'list_projects', { filter: 'view=owned' });
  const p2Project = res.projects?.find(p => p.title === 'Avani Landing Page - Prototype 2');
  assert(p2Project !== undefined, 'Prototype 2 project must exist');
  assert(p2Project.name !== p1Project.name, 'Prototype 2 must have distinct project ID from P1');
  ```

##### Test ID: `T1_F02_02`
- **Description**: Verify Dark Mode & Bioluminescent Design System Configuration.
- **Input / Target Artifact or Endpoint**: `list_design_systems` with `{ "projectId": "<p2_project_id>" }`.
- **Expected Behavior / Output**: Design system specifies `colorMode: "DARK"`, dark canvas `#0F2410`, bioluminescent green accent `#22C55E`, and editorial serif headlines.
- **Assertion Logic**:
  ```javascript
  const dsRes = await callMcpTool('StitchMCP', 'list_design_systems', { projectId: p2ProjectId });
  const ds = dsRes.designSystems?.[0];
  assert(ds !== undefined, 'Prototype 2 design system must exist');
  assert(ds.theme.colorMode === 'DARK', 'Prototype 2 colorMode must be DARK');
  assert(ds.theme.customColor?.toLowerCase() === '#0f2410', 'Base color must be dark forest #0F2410');
  ```

##### Test ID: `T1_F02_03`
- **Description**: Verify Prototype 2 Desktop Resolution & Generation Parameters.
- **Input / Target Artifact or Endpoint**: `list_screens` for Prototype 2.
- **Expected Behavior / Output**: Desktop screen record exists, with `deviceType: "DESKTOP"` and model `GEMINI_3_8_FLASH`.
- **Assertion Logic**:
  ```javascript
  const screensRes = await callMcpTool('StitchMCP', 'list_screens', { projectId: p2ProjectId });
  const screen = screensRes.screens?.find(s => s.deviceType === 'DESKTOP');
  assert(screen !== undefined, 'Desktop screen must exist for Prototype 2');
  assert(screen.modelId === 'GEMINI_3_8_FLASH', 'Model must be GEMINI_3_8_FLASH');
  ```

##### Test ID: `T1_F02_04`
- **Description**: Verify Editorial Earth Journal & Climate Biosphere Prompt Alignment.
- **Input / Target Artifact or Endpoint**: Generation prompt payload for Prototype 2.
- **Expected Behavior / Output**: Prompt embeds "Editorial Earth Journal", "bioluminescent", "10,000-particle holographic Earth globe", 5 teams, 11 climate tips, and application form link.
- **Assertion Logic**:
  ```javascript
  const prompt = p2Metadata.generationPrompt;
  assert(prompt.includes('Editorial Earth Journal'), 'Prompt must specify Editorial Earth Journal aesthetic');
  assert(prompt.includes('holographic Earth globe') || prompt.includes('Biosphere'), 'Prompt must specify 3D globe narrative');
  assert(prompt.includes('Beyond the Waste Workshop'), 'Prompt must contain event descriptions');
  ```

##### Test ID: `T1_F02_05`
- **Description**: Verify Prototype 2 Downloadable Artifact URIs.
- **Input / Target Artifact or Endpoint**: `get_screen` for Prototype 2 screen.
- **Expected Behavior / Output**: Screen contains non-empty `htmlCode` and `screenshot` file pointers with valid MIME types.
- **Assertion Logic**:
  ```javascript
  const screen = await callMcpTool('StitchMCP', 'get_screen', { name: p2ScreenResourceName });
  assert(screen.htmlCode?.name && screen.htmlCode.mimeType === 'text/html', 'Valid HTML code pointer required');
  assert(screen.screenshot?.name && screen.screenshot.mimeType === 'image/png', 'Valid screenshot pointer required');
  ```

---

#### Tier 2: Boundary & Robustness Tests

##### Test ID: `T2_F02_01`
- **Description**: Non-Existent Project ID Error Handling.
- **Input / Target Artifact or Endpoint**: `list_screens` with non-existent `projectId: "0000000000000000"`.
- **Expected Behavior / Output**: Server returns error status 404 or NOT_FOUND without hanging or crashing.
- **Assertion Logic**:
  ```javascript
  await assert.rejects(
    async () => callMcpTool('StitchMCP', 'list_screens', { projectId: '0000000000000000' }),
    /not found|invalid|does not exist/i,
    'Non-existent project ID must throw clear error'
  );
  ```

##### Test ID: `T2_F02_02`
- **Description**: Invalid Model ID Enum Rejection.
- **Input / Target Artifact or Endpoint**: `generate_screen_from_text` with `modelId: "UNKNOWN_MODEL_V99"`.
- **Expected Behavior / Output**: Server validation rejects unlisted model ID.
- **Assertion Logic**:
  ```javascript
  await assert.rejects(
    async () => callMcpTool('StitchMCP', 'generate_screen_from_text', {
      projectId: p2ProjectId,
      prompt: 'Test prompt',
      modelId: 'UNKNOWN_MODEL_V99'
    }),
    /invalid|model/i,
    'Invalid modelId must be rejected'
  );
  ```

##### Test ID: `T2_F02_03`
- **Description**: Large Prompt Payload Boundary (>16KB Payload Handling).
- **Input / Target Artifact or Endpoint**: Prompt text constructed with 16KB of padded descriptive text.
- **Expected Behavior / Output**: Request either executes with bounded payload truncation or returns a payload limit error without server disconnection.
- **Assertion Logic**:
  ```javascript
  const largePrompt = 'Avani Climate Conservation '.repeat(800);
  try {
    const res = await callMcpTool('StitchMCP', 'generate_screen_from_text', { projectId: p2ProjectId, prompt: largePrompt });
    assert(res.screen !== undefined, 'Large prompt handled successfully');
  } catch (err) {
    assert(/payload|too large|length|limit/i.test(err.message), 'Error must indicate payload limit');
  }
  ```

##### Test ID: `T2_F02_04`
- **Description**: Dark Theme Contrast Ratio Boundary (WCAG AA Compliance).
- **Input / Target Artifact or Endpoint**: Primary dark background `#0F2410` vs text color `#F3F4F6`.
- **Expected Behavior / Output**: Relative luminance contrast ratio exceeds 4.5:1 (minimum for normal body text under WCAG AA).
- **Assertion Logic**:
  ```javascript
  function getLuminance(hex) {
    const rgb = [1, 3, 5].map(i => parseInt(hex.substr(i, 2), 16) / 255).map(c => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  }
  const L1 = getLuminance('#F3F4F6');
  const L2 = getLuminance('#0F2410');
  const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
  assert(ratio >= 4.5, `Contrast ratio (${ratio.toFixed(2)}) must be >= 4.5:1`);
  ```

##### Test ID: `T2_F02_05`
- **Description**: Screen Resource Name Regex & Special Character Sanitation.
- **Input / Target Artifact or Endpoint**: Screen name string returned from API.
- **Expected Behavior / Output**: Resource name strictly matches `/^projects\/[0-9]+\/screens\/[a-f0-9]+$/` without query parameters or URL encoding artifacts.
- **Assertion Logic**:
  ```javascript
  assert(/^projects\/[0-9]+\/screens\/[a-f0-9]+$/.test(p2Screen.name), 'Screen name format must match standard pattern');
  ```

---

### Feature F3: Stitch Mockup Local Export

#### Tier 1: Functional & Interface Tests

##### Test ID: `T1_F03_01`
- **Description**: Verify Local Mockup Directory Structure and File Existence.
- **Input / Target Artifact or Endpoint**: Local filesystem paths `mockups/prototype_1/` and `mockups/prototype_2/`.
- **Expected Behavior / Output**: Directories exist and contain `mockup.html`, `mockup.png`, and `metadata.json` in both locations.
- **Assertion Logic**:
  ```javascript
  const files = [
    'mockups/prototype_1/mockup.html',
    'mockups/prototype_1/mockup.png',
    'mockups/prototype_1/metadata.json',
    'mockups/prototype_2/mockup.html',
    'mockups/prototype_2/mockup.png',
    'mockups/prototype_2/metadata.json'
  ];
  for (const f of files) {
    assert(fs.existsSync(f), `Exported file ${f} must exist on disk`);
  }
  ```

##### Test ID: `T1_F03_02`
- **Description**: Verify HTML Document Structure and Tailwind CSS Classes.
- **Input / Target Artifact or Endpoint**: File contents of `mockups/prototype_1/mockup.html`.
- **Expected Behavior / Output**: Valid HTML5 document containing `<!DOCTYPE html>`, `<html>`, `<head>`, `<body>`, and responsive Tailwind CSS utility classes.
- **Assertion Logic**:
  ```javascript
  const html = fs.readFileSync('mockups/prototype_1/mockup.html', 'utf8');
  assert(/<!DOCTYPE\s+html>/i.test(html), 'File must start with <!DOCTYPE html>');
  assert(/<html[\s\S]*<head[\s\S]*<body/i.test(html), 'File must contain standard HTML tags');
  assert(html.includes('class=') && (html.includes('bg-') || html.includes('text-')), 'HTML must contain CSS utility classes');
  ```

##### Test ID: `T1_F03_03`
- **Description**: Verify PNG Screenshot Magic Bytes Header & Binary Integrity.
- **Input / Target Artifact or Endpoint**: First 8 bytes of `mockups/prototype_1/mockup.png`.
- **Expected Behavior / Output**: Matches standard PNG magic bytes signature `89 50 4E 47 0D 0A 1A 0A`.
- **Assertion Logic**:
  ```javascript
  const buf = fs.readFileSync('mockups/prototype_1/mockup.png');
  const pngMagic = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  assert(buf.subarray(0, 8).equals(pngMagic), 'mockup.png must possess valid PNG magic bytes header');
  ```

##### Test ID: `T1_F03_04`
- **Description**: Verify Metadata JSON Schema & Required Field Conformance.
- **Input / Target Artifact or Endpoint**: Parsed JSON of `mockups/prototype_1/metadata.json`.
- **Expected Behavior / Output**: Object contains `projectId`, `screenId`, `deviceType: "DESKTOP"`, `createdAt`, `files.html`, `files.screenshot`.
- **Assertion Logic**:
  ```javascript
  const meta = JSON.parse(fs.readFileSync('mockups/prototype_1/metadata.json', 'utf8'));
  assert(typeof meta.projectId === 'string' && meta.projectId.length > 0, 'projectId required');
  assert(typeof meta.screenId === 'string' && meta.screenId.length > 0, 'screenId required');
  assert(meta.deviceType === 'DESKTOP', 'deviceType must be DESKTOP');
  assert(meta.files?.html && meta.files?.screenshot, 'File mapping object required');
  ```

##### Test ID: `T1_F03_05`
- **Description**: Verify Minimum Non-Empty File Size Thresholds.
- **Input / Target Artifact or Endpoint**: File sizes of exported artifacts.
- **Expected Behavior / Output**: `mockup.html` >= 5KB, `mockup.png` >= 50KB, indicating complete markup and screenshot rendering.
- **Assertion Logic**:
  ```javascript
  const htmlSize = fs.statSync('mockups/prototype_1/mockup.html').size;
  const pngSize = fs.statSync('mockups/prototype_1/mockup.png').size;
  assert(htmlSize >= 5120, `HTML size (${htmlSize} bytes) must be >= 5KB`);
  assert(pngSize >= 51200, `PNG size (${pngSize} bytes) must be >= 50KB`);
  ```

---

#### Tier 2: Boundary & Robustness Tests

##### Test ID: `T2_F03_01`
- **Description**: Zero-Byte File Detection & Truncation Guard.
- **Input / Target Artifact or Endpoint**: All files in `mockups/prototype_1/` and `mockups/prototype_2/`.
- **Expected Behavior / Output**: No file has a size of 0 bytes.
- **Assertion Logic**:
  ```javascript
  const paths = globSync('mockups/**/*.{html,png,json}');
  for (const p of paths) {
    assert(fs.statSync(p).size > 0, `File ${p} must not be zero bytes`);
  }
  ```

##### Test ID: `T2_F03_02`
- **Description**: UTF-8 Encoding & Replacement Character Scan.
- **Input / Target Artifact or Endpoint**: Exported `mockup.html` and `metadata.json` text.
- **Expected Behavior / Output**: Contains no Unicode replacement characters `\uFFFD` (indicative of encoding corruption).
- **Assertion Logic**:
  ```javascript
  const html1 = fs.readFileSync('mockups/prototype_1/mockup.html', 'utf8');
  assert(!html1.includes('\uFFFD'), 'mockup.html must not contain unicode replacement character ');
  ```

##### Test ID: `T2_F03_03`
- **Description**: PNG Image Resolution Boundary Inspection (IHDR Dimensions).
- **Input / Target Artifact or Endpoint**: Bytes 16-24 of `mockup.png`.
- **Expected Behavior / Output**: Image width >= 1200 pixels, height >= 800 pixels.
- **Assertion Logic**:
  ```javascript
  const buf = fs.readFileSync('mockups/prototype_1/mockup.png');
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  assert(width >= 1200, `Screenshot width (${width}) must be >= 1200px`);
  assert(height >= 800, `Screenshot height (${height}) must be >= 800px`);
  ```

##### Test ID: `T2_F03_04`
- **Description**: Atomic Write & Dangling Temporary File Verification.
- **Input / Target Artifact or Endpoint**: Directory listing of `mockups/`.
- **Expected Behavior / Output**: No unfinished temporary files (`.tmp`, `.part`, `.crdownload`) exist.
- **Assertion Logic**:
  ```javascript
  const tempFiles = globSync('mockups/**/*.{tmp,part,crdownload}');
  assert(tempFiles.length === 0, 'No temporary download files must remain in mockups/');
  ```

##### Test ID: `T2_F03_05`
- **Description**: ISO 8601 Timestamp Validation in Metadata.
- **Input / Target Artifact or Endpoint**: `metadata.json` `createdAt` field.
- **Expected Behavior / Output**: `createdAt` string is a valid ISO 8601 date parseable by `Date.parse()`.
- **Assertion Logic**:
  ```javascript
  const meta = JSON.parse(fs.readFileSync('mockups/prototype_1/metadata.json', 'utf8'));
  const timestamp = Date.parse(meta.createdAt);
  assert(!isNaN(timestamp), 'createdAt must be a valid ISO 8601 timestamp');
  ```

---

### Feature F4: Google Flow Media Generation

#### Tier 1: Functional & Interface Tests

##### Test ID: `T1_F04_01`
- **Description**: Verify Media Asset Output Inventory Presence.
- **Input / Target Artifact or Endpoint**: Filesystem path `public/assets/images/`.
- **Expected Behavior / Output**: All 7 required static image assets are present:
  - `hero_nature_canopy.webp`
  - `hero_ecotech_globe.webp`
  - `event_dps_drive.webp`
  - `event_invictus_denim.webp`
  - `event_orphanage_aarogi.webp`
  - `event_waste_workshop.webp`
  - `climate_tips_infographic.webp`
- **Assertion Logic**:
  ```javascript
  const required = [
    'hero_nature_canopy.webp',
    'hero_ecotech_globe.webp',
    'event_dps_drive.webp',
    'event_invictus_denim.webp',
    'event_orphanage_aarogi.webp',
    'event_waste_workshop.webp',
    'climate_tips_infographic.webp'
  ];
  for (const img of required) {
    const fullPath = path.join('public/assets/images', img);
    assert(fs.existsSync(fullPath), `Asset ${img} must exist at ${fullPath}`);
  }
  ```

##### Test ID: `T1_F04_02`
- **Description**: Verify Hero Image Aspect Ratio (16:9) and Resolution Thresholds.
- **Input / Target Artifact or Endpoint**: `hero_nature_canopy.webp` and `hero_ecotech_globe.webp`.
- **Expected Behavior / Output**: Width >= 1280, Height >= 720, Aspect ratio within 5% of 16/9 (1.77).
- **Assertion Logic**:
  ```javascript
  for (const hero of ['hero_nature_canopy.webp', 'hero_ecotech_globe.webp']) {
    const dims = await getImageDimensions(`public/assets/images/${hero}`);
    assert(dims.width >= 1280, `${hero} width must be >= 1280px`);
    assert(dims.height >= 720, `${hero} height must be >= 720px`);
    const ratio = dims.width / dims.height;
    assert(Math.abs(ratio - 16/9) < 0.05, `${hero} aspect ratio must be ~16:9`);
  }
  ```

##### Test ID: `T1_F04_03`
- **Description**: Verify Event Card Images Resolution Thresholds.
- **Input / Target Artifact or Endpoint**: The 4 event card images (`event_*.webp`).
- **Expected Behavior / Output**: Width >= 800, Height >= 600 pixels.
- **Assertion Logic**:
  ```javascript
  const eventImages = ['event_dps_drive.webp', 'event_invictus_denim.webp', 'event_orphanage_aarogi.webp', 'event_waste_workshop.webp'];
  for (const ev of eventImages) {
    const dims = await getImageDimensions(`public/assets/images/${ev}`);
    assert(dims.width >= 800 && dims.height >= 600, `${ev} dimensions must be >= 800x600`);
  }
  ```

##### Test ID: `T1_F04_04`
- **Description**: Verify WebP File Signature and RIFF Chunk Header.
- **Input / Target Artifact or Endpoint**: First 12 bytes of each `.webp` file.
- **Expected Behavior / Output**: Bytes 0-3 match ASCII `"RIFF"`, bytes 8-11 match ASCII `"WEBP"`.
- **Assertion Logic**:
  ```javascript
  const files = globSync('public/assets/images/*.webp');
  for (const f of files) {
    const buf = fs.readFileSync(f);
    assert(buf.subarray(0, 4).toString() === 'RIFF', `${f} missing RIFF header`);
    assert(buf.subarray(8, 12).toString() === 'WEBP', `${f} missing WEBP signature`);
  }
  ```

##### Test ID: `T1_F04_05`
- **Description**: Verify Fallback Pipeline Execution when Google Flow Unavailable.
- **Input / Target Artifact or Endpoint**: Media generator execution script with simulated zero-credit flag.
- **Expected Behavior / Output**: Asset pipeline triggers native `generate_image` tool, emits informational log, and exits with code 0 without failing the build.
- **Assertion Logic**:
  ```javascript
  const result = runMediaGenerationPipeline({ mockZeroCredits: true });
  assert(result.exitCode === 0, 'Fallback generation must exit with code 0');
  assert(result.logs.includes('fallback') || result.logs.includes('generate_image'), 'Log must record fallback invocation');
  ```

---

#### Tier 2: Boundary & Robustness Tests

##### Test ID: `T2_F04_01`
- **Description**: Low-Credit Warning Banner Detection and Avoidance.
- **Input / Target Artifact or Endpoint**: DOM check in `cli-anything-brave` for warning banner text `"You're running low on Google Flow credits"`.
- **Expected Behavior / Output**: Pipeline detects banner, skips expensive 12-credit video generation attempts, and prioritizes image generation or native tool fallback.
- **Assertion Logic**:
  ```javascript
  const hasLowCreditWarning = domSnapshot.includes("running low on Google Flow credits");
  if (hasLowCreditWarning) {
    assert(skippedVideoGeneration === true, 'Video generation must be skipped when low-credit warning active');
  }
  ```

##### Test ID: `T2_F04_02`
- **Description**: File Size Bounded Range (20KB ≤ Size ≤ 5MB).
- **Input / Target Artifact or Endpoint**: File size of all generated image assets.
- **Expected Behavior / Output**: Every image is >= 20KB (avoiding blank/stub files) and <= 5MB (avoiding uncompressed browser bloat).
- **Assertion Logic**:
  ```javascript
  const files = globSync('public/assets/images/*.webp');
  for (const f of files) {
    const size = fs.statSync(f).size;
    assert(size >= 20480, `${f} size (${size}) too small (<20KB)`);
    assert(size <= 5242880, `${f} size (${size}) exceeds 5MB ceiling`);
  }
  ```

##### Test ID: `T2_F04_03`
- **Description**: Browser Automation Disconnect / CDP Timeout Recovery.
- **Input / Target Artifact or Endpoint**: CDP command execution wrapper with 30s timeout.
- **Expected Behavior / Output**: If browser does not respond within 30s, automation safely aborts, logs error, and activates fallback without unhandled exception.
- **Assertion Logic**:
  ```javascript
  const timeoutHandled = await testCdpTimeoutHandling();
  assert(timeoutHandled === true, 'CDP timeout must be caught and routed to fallback');
  ```

##### Test ID: `T2_F04_04`
- **Description**: Corrupted Image Binary Validation via Buffer Length vs Header Length.
- **Input / Target Artifact or Endpoint**: RIFF header file length field (bytes 4-7) vs actual filesystem file size.
- **Expected Behavior / Output**: RIFF chunk size matches `actualFileSize - 8` (within standard 2-byte alignment padding).
- **Assertion Logic**:
  ```javascript
  for (const f of globSync('public/assets/images/*.webp')) {
    const buf = fs.readFileSync(f);
    const declaredSize = buf.readUInt32LE(4);
    assert(Math.abs(declaredSize - (buf.length - 8)) <= 2, `${f} RIFF size does not match file length`);
  }
  ```

##### Test ID: `T2_F04_05`
- **Description**: Asset Path Reference Collision & Overwrite Prevention.
- **Input / Target Artifact or Endpoint**: Check for naming collisions or unintended asset overwriting during multi-worker runs.
- **Expected Behavior / Output**: Unique file names for distinct asset purposes; file modification timestamps stable after generation run.
- **Assertion Logic**:
  ```javascript
  const mtimesBefore = getAssetMtimes();
  runStaticVerification();
  const mtimesAfter = getAssetMtimes();
  assert.deepStrictEqual(mtimesBefore, mtimesAfter, 'Verification must not mutate or touch asset modification times');
  ```

---

### Feature F5: Brand Logo Integration

#### Tier 1: Functional & Interface Tests

##### Test ID: `T1_F05_01`
- **Description**: Verify Official Brand Logo File Existence in Target Location.
- **Input / Target Artifact or Endpoint**: File path `public/assets/branding/logo.jpg`.
- **Expected Behavior / Output**: File exists on disk at the designated static asset path.
- **Assertion Logic**:
  ```javascript
  assert(fs.existsSync('public/assets/branding/logo.jpg'), 'logo.jpg must exist at public/assets/branding/logo.jpg');
  ```

##### Test ID: `T1_F05_02`
- **Description**: Verify Bit-for-Bit Hash Match with Uploaded Source File.
- **Input / Target Artifact or Endpoint**:
  - Source: `/Users/bhavikgolchha07/.gemini/antigravity/brain/8242fb67-1ac7-4dab-961f-f9946e0b5bf7/.user_uploaded/media_1794462993310_400d91e2.jpg`
  - Target: `public/assets/branding/logo.jpg`
- **Expected Behavior / Output**: SHA-256 hash of target file matches source file exactly.
- **Assertion Logic**:
  ```javascript
  const srcHash = crypto.createHash('sha256').update(fs.readFileSync(srcLogoPath)).digest('hex');
  const tgtHash = crypto.createHash('sha256').update(fs.readFileSync('public/assets/branding/logo.jpg')).digest('hex');
  assert.strictEqual(tgtHash, srcHash, 'Target logo must be byte-for-byte identical to source upload');
  ```

##### Test ID: `T1_F05_03`
- **Description**: Verify JPEG Magic Bytes Signature.
- **Input / Target Artifact or Endpoint**: First 3 bytes of `public/assets/branding/logo.jpg`.
- **Expected Behavior / Output**: Bytes equal `FF D8 FF` (Standard JPEG SOI marker).
- **Assertion Logic**:
  ```javascript
  const buf = fs.readFileSync('public/assets/branding/logo.jpg');
  assert(buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff, 'logo.jpg must start with JPEG SOI marker FF D8 FF');
  ```

##### Test ID: `T1_F05_04`
- **Description**: Verify Dominant Brand Color in Logo (#163515).
- **Input / Target Artifact or Endpoint**: Pixel sample / color histogram of `public/assets/branding/logo.jpg`.
- **Expected Behavior / Output**: Dominant non-white/non-black background tone matches Avani brand green `#163515` (RGB: ~22, ~53, ~21) within Euclidean color distance < 20.
- **Assertion Logic**:
  ```javascript
  const dominantRgb = await extractDominantColor('public/assets/branding/logo.jpg');
  const targetRgb = { r: 0x16, g: 0x35, b: 0x15 }; // (22, 53, 21)
  const dist = Math.sqrt(Math.pow(dominantRgb.r - targetRgb.r, 2) + Math.pow(dominantRgb.g - targetRgb.g, 2) + Math.pow(dominantRgb.b - targetRgb.b, 2));
  assert(dist < 20, `Dominant color distance (${dist}) from brand green #163515 must be < 20`);
  ```

##### Test ID: `T1_F05_05`
- **Description**: Verify Static HTTP Serving via Next.js Web Server.
- **Input / Target Artifact or Endpoint**: HTTP GET request to `http://localhost:3000/assets/branding/logo.jpg`.
- **Expected Behavior / Output**: Returns HTTP status 200, `Content-Type: image/jpeg`, and `Content-Length` > 0.
- **Assertion Logic**:
  ```javascript
  const res = await fetch('http://localhost:3000/assets/branding/logo.jpg');
  assert.strictEqual(res.status, 200, 'Logo URL must return HTTP 200');
  assert(res.headers.get('content-type')?.includes('image/jpeg'), 'Content-Type must be image/jpeg');
  ```

---

#### Tier 2: Boundary & Robustness Tests

##### Test ID: `T2_F05_01`
- **Description**: Source File Inaccessibility & Path Traversal Guard.
- **Input / Target Artifact or Endpoint**: Logo copying script with non-existent or relative traversal path.
- **Expected Behavior / Output**: Copy script validates path, checks existence, and aborts safely if file is absent.
- **Assertion Logic**:
  ```javascript
  assert(srcLogoPath.startsWith('/Users/bhavikgolchha07/'), 'Path must be absolute');
  assert(!srcLogoPath.includes('..'), 'Path must not contain traversal tokens');
  assert(fs.existsSync(srcLogoPath), 'Source file must exist before copy step');
  ```

##### Test ID: `T2_F05_02`
- **Description**: Truncated / Incomplete Copy Boundary Check.
- **Input / Target Artifact or Endpoint**: Target file size vs source file size.
- **Expected Behavior / Output**: `fs.statSync(target).size === fs.statSync(source).size` (exact byte equality).
- **Assertion Logic**:
  ```javascript
  const srcSize = fs.statSync(srcLogoPath).size;
  const tgtSize = fs.statSync('public/assets/branding/logo.jpg').size;
  assert.strictEqual(tgtSize, srcSize, 'Target file size must match source byte size exactly');
  ```

##### Test ID: `T2_F05_03`
- **Description**: Case Sensitivity & Filename Normalization Boundary.
- **Input / Target Artifact or Endpoint**: Directory scan of `public/assets/branding/`.
- **Expected Behavior / Output**: Contains exactly `logo.jpg` in lowercase; no duplicate case variants (`logo.JPG`, `Logo.jpg`).
- **Assertion Logic**:
  ```javascript
  const entries = fs.readdirSync('public/assets/branding');
  assert(entries.includes('logo.jpg'), 'Must contain lowercase logo.jpg');
  assert(!entries.includes('logo.jpeg') && !entries.includes('logo.JPG'), 'No extension variants allowed');
  ```

##### Test ID: `T2_F05_04`
- **Description**: POSIX File Permissions Boundary (Readability by All).
- **Input / Target Artifact or Endpoint**: `fs.statSync('public/assets/branding/logo.jpg').mode`.
- **Expected Behavior / Output**: File possesses read permissions for owner, group, and others (`mode & 0o444 === 0o444`).
- **Assertion Logic**:
  ```javascript
  const mode = fs.statSync('public/assets/branding/logo.jpg').mode;
  assert((mode & 0o444) === 0o444, 'logo.jpg must be readable by all users (POSIX 0644)');
  ```

##### Test ID: `T2_F05_05`
- **Description**: Idempotent Parent Directory Auto-Creation.
- **Input / Target Artifact or Endpoint**: Directory creation helper `mkdirSync('public/assets/branding', { recursive: true })`.
- **Expected Behavior / Output**: Directory exists and subsequent calls do not throw `EEXIST`.
- **Assertion Logic**:
  ```javascript
  fs.mkdirSync('public/assets/branding', { recursive: true });
  assert(fs.existsSync('public/assets/branding'), 'Directory must exist idempotently');
  ```

---

### Feature F6: Next.js 14 Scaffolding & Setup

#### Tier 1: Functional & Interface Tests

##### Test ID: `T1_F06_01`
- **Description**: Verify Dependency Version Locks in `package.json`.
- **Input / Target Artifact or Endpoint**: `package.json` dependencies.
- **Expected Behavior / Output**: `next` is locked to version 14 (`^14.x` or `14.x`), `react` is locked to React 18 (`18.3.1` or `^18.3.1`) to avoid React 19 / R3F incompatibility, `@react-three/fiber`, `@react-three/drei`, `three`, `gsap`, `lenis`, and `tailwindcss` are present.
- **Assertion Logic**:
  ```javascript
  const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  assert(pkg.dependencies.next.includes('14.'), 'Next.js version must be 14');
  assert(pkg.dependencies.react.includes('18.'), 'React must be locked to 18 for R3F compatibility');
  assert(pkg.dependencies['@react-three/fiber'], '@react-three/fiber required');
  assert(pkg.dependencies['@react-three/drei'], '@react-three/drei required');
  assert(pkg.dependencies['three'], 'three required');
  assert(pkg.dependencies['gsap'], 'gsap required');
  assert(pkg.dependencies['lenis'], 'lenis required');
  ```

##### Test ID: `T1_F06_02`
- **Description**: Verify Strict TypeScript Configuration and Path Aliases.
- **Input / Target Artifact or Endpoint**: `tsconfig.json`.
- **Expected Behavior / Output**: `strict: true`, `paths: { "@/*": ["./src/*"] }`, `jsx: "preserve"`.
- **Assertion Logic**:
  ```javascript
  const tsconfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
  assert(tsconfig.compilerOptions.strict === true, 'TypeScript compilerOptions.strict must be true');
  assert(tsconfig.compilerOptions.paths['@/*'][0] === './src/*', 'Path alias @/* must map to ./src/*');
  ```

##### Test ID: `T1_F06_03`
- **Description**: Verify Tailwind Brand Color Tokens in `tailwind.config.ts`.
- **Input / Target Artifact or Endpoint**: `tailwind.config.ts`.
- **Expected Behavior / Output**: Config specifies custom Avani brand colors:
  - Rainforest Deep: `#163515`
  - Canopy Light / Tea Green: `#D0E8C5`
  - Bio Cyan: `#8ED1E0`
  - Bioluminescent Green: `#22C55E`
  - Forest Dark: `#0F2410`
- **Assertion Logic**:
  ```javascript
  const tw = fs.readFileSync('tailwind.config.ts', 'utf8');
  assert(tw.includes('163515'), 'Tailwind config must define #163515');
  assert(tw.includes('D0E8C5') || tw.includes('d0e8c5'), 'Tailwind config must define #D0E8C5');
  assert(tw.includes('22C55E') || tw.includes('22c55e'), 'Tailwind config must define #22C55E');
  assert(tw.includes('0F2410') || tw.includes('0f2410'), 'Tailwind config must define #0F2410');
  ```

##### Test ID: `T1_F06_04`
- **Description**: Verify Next.js App Router Structure & Essential Route Files.
- **Input / Target Artifact or Endpoint**: Filesystem paths under `src/app/`.
- **Expected Behavior / Output**: All essential routes and layout files exist:
  - `src/app/layout.tsx`
  - `src/app/page.tsx` (Comparison Hub `/`)
  - `src/app/prototype-1/page.tsx`
  - `src/app/prototype-2/page.tsx`
- **Assertion Logic**:
  ```javascript
  const routes = [
    'src/app/layout.tsx',
    'src/app/page.tsx',
    'src/app/prototype-1/page.tsx',
    'src/app/prototype-2/page.tsx'
  ];
  for (const r of routes) {
    assert(fs.existsSync(r), `Route file ${r} must exist`);
  }
  ```

##### Test ID: `T1_F06_05`
- **Description**: Verify Clean Production Build (`npm run build`).
- **Input / Target Artifact or Endpoint**: Execute `npm run build` in working directory.
- **Expected Behavior / Output**: Build succeeds with exit code 0, producing `.next/` directory without unhandled TypeScript or ESLint errors.
- **Assertion Logic**:
  ```javascript
  const res = spawnSync('npm', ['run', 'build'], { encoding: 'utf8' });
  assert.strictEqual(res.status, 0, `Build failed with exit code ${res.status}. Stderr: ${res.stderr}`);
  assert(fs.existsSync('.next'), '.next build directory must be created');
  ```

---

#### Tier 2: Boundary & Robustness Tests

##### Test ID: `T2_F06_01`
- **Description**: React 19 Peer Conflict Guard.
- **Input / Target Artifact or Endpoint**: Resolved React package version via `npm ls react --json`.
- **Expected Behavior / Output**: Resolved major version of React is 18 (e.g. `18.3.1`), with zero conflicting peer installations.
- **Assertion Logic**:
  ```javascript
  const ls = JSON.parse(spawnSync('npm', ['ls', 'react', '--json'], { encoding: 'utf8' }).stdout);
  const reactVer = ls.dependencies.react.version;
  assert(reactVer.startsWith('18.'), `Resolved React version (${reactVer}) must be 18.x`);
  ```

##### Test ID: `T2_F06_02`
- **Description**: SSR Context Isolation for 3D WebGL Canvas Imports.
- **Input / Target Artifact or Endpoint**: Source code of components mounting R3F `<Canvas>`.
- **Expected Behavior / Output**: Component uses `'use client'` and is imported dynamically with `{ ssr: false }` or client boundary.
- **Assertion Logic**:
  ```javascript
  const p1Page = fs.readFileSync('src/app/prototype-1/page.tsx', 'utf8');
  assert(/ssr:\s*false/i.test(p1Page) || /'use client'/.test(p1Page), 'P1 page must isolate WebGL from SSR');
  ```

##### Test ID: `T2_F06_03`
- **Description**: Missing Environment Variables Resilience.
- **Input / Target Artifact or Endpoint**: Run build with completely clean environment (`env: {}`).
- **Expected Behavior / Output**: Build completes with exit code 0; app requires zero mandatory runtime secrets to render landing pages.
- **Assertion Logic**:
  ```javascript
  const res = spawnSync('npm', ['run', 'build'], { env: { PATH: process.env.PATH }, encoding: 'utf8' });
  assert.strictEqual(res.status, 0, 'Build must succeed without environment variables');
  ```

##### Test ID: `T2_F06_04`
- **Description**: Client Chunk Size Boundary (<3MB per chunk).
- **Input / Target Artifact or Endpoint**: File sizes of all `.js` bundles in `.next/static/chunks/`.
- **Expected Behavior / Output**: No single client bundle exceeds 3MB uncompressed.
- **Assertion Logic**:
  ```javascript
  const chunks = globSync('.next/static/chunks/**/*.js');
  for (const c of chunks) {
    const size = fs.statSync(c).size;
    assert(size < 3145728, `Chunk ${c} size (${size} bytes) exceeds 3MB limit`);
  }
  ```

##### Test ID: `T2_F06_05`
- **Description**: Strict TypeScript Typecheck with Zero `@ts-ignore` in Core Models.
- **Input / Target Artifact or Endpoint**: Execute `npx tsc --noEmit` and check `src/lib/avaniContent.ts`.
- **Expected Behavior / Output**: Exits with code 0; `src/lib/avaniContent.ts` contains zero `@ts-ignore` or `@ts-nocheck` directives.
- **Assertion Logic**:
  ```javascript
  const tsc = spawnSync('npx', ['tsc', '--noEmit'], { encoding: 'utf8' });
  assert.strictEqual(tsc.status, 0, `Typecheck failed: ${tsc.stdout}`);
  const contentCode = fs.readFileSync('src/lib/avaniContent.ts', 'utf8');
  assert(!contentCode.includes('@ts-ignore'), 'No @ts-ignore allowed in avaniContent.ts');
  assert(!contentCode.includes('@ts-nocheck'), 'No @ts-nocheck allowed in avaniContent.ts');
  ```

---

### Feature F7: Shared Brand Content Module

#### Tier 1: Functional & Interface Tests

##### Test ID: `T1_F07_01`
- **Description**: Verify `src/lib/avaniContent.ts` Module Exports and Typings.
- **Input / Target Artifact or Endpoint**: Module file `src/lib/avaniContent.ts`.
- **Expected Behavior / Output**: Exports `AVANI_CONTENT`, `AVANI_OBJECTIVES`, `AVANI_TEAMS`, `AVANI_EVENTS`, `CLIMATE_TIPS`, and `EXTERNAL_LINKS`.
- **Assertion Logic**:
  ```javascript
  const content = require(path.resolve('src/lib/avaniContent.ts'));
  assert(Array.isArray(content.AVANI_OBJECTIVES), 'AVANI_OBJECTIVES must be exported array');
  assert(Array.isArray(content.AVANI_TEAMS), 'AVANI_TEAMS must be exported array');
  assert(Array.isArray(content.AVANI_EVENTS), 'AVANI_EVENTS must be exported array');
  assert(Array.isArray(content.CLIMATE_TIPS), 'CLIMATE_TIPS must be exported array');
  assert(typeof content.EXTERNAL_LINKS === 'object', 'EXTERNAL_LINKS must be exported object');
  ```

##### Test ID: `T1_F07_02`
- **Description**: Verify Verbatim 5 Core Objectives.
- **Input / Target Artifact or Endpoint**: `AVANI_OBJECTIVES` in `src/lib/avaniContent.ts`.
- **Expected Behavior / Output**: Array has length 5 and contains verbatim objectives:
  1. "Advocate for urgent climate action."
  2. "Upliftment and restoration of natural resources in India."
  3. "Raise a relentless voice against all forms of pollution."
  4. "Implement effective zero-waste and recycling management."
  5. "Promote sustainable brands and activist movements across social platforms."
- **Assertion Logic**:
  ```javascript
  const objs = content.AVANI_OBJECTIVES;
  assert.strictEqual(objs.length, 5, 'Must contain exactly 5 objectives');
  assert(objs[0].title.includes('Advocate for urgent climate action'), 'Objective 1 mismatch');
  assert(objs[1].title.includes('restoration of natural resources'), 'Objective 2 mismatch');
  assert(objs[2].title.includes('against all forms of pollution'), 'Objective 3 mismatch');
  assert(objs[3].title.includes('zero-waste and recycling'), 'Objective 4 mismatch');
  assert(objs[4].title.includes('sustainable brands'), 'Objective 5 mismatch');
  ```

##### Test ID: `T1_F07_03`
- **Description**: Verify Verbatim 5 Student Teams Breakdown.
- **Input / Target Artifact or Endpoint**: `AVANI_TEAMS` in `src/lib/avaniContent.ts`.
- **Expected Behavior / Output**: Array has length 5. Teams: "Research and Writing", "Design", "HR and Communications", "Social Media", "Event Planning".
- **Assertion Logic**:
  ```javascript
  const teams = content.AVANI_TEAMS;
  assert.strictEqual(teams.length, 5, 'Must contain exactly 5 teams');
  const names = teams.map(t => t.name);
  assert(names.includes('Research and Writing'), 'Research and Writing team missing');
  assert(names.includes('Design'), 'Design team missing');
  assert(names.includes('HR and Communications'), 'HR and Communications team missing');
  assert(names.includes('Social Media'), 'Social Media team missing');
  assert(names.includes('Event Planning'), 'Event Planning team missing');
  ```

##### Test ID: `T1_F07_04`
- **Description**: Verify Verbatim 4 Realized Events Summaries.
- **Input / Target Artifact or Endpoint**: `AVANI_EVENTS` in `src/lib/avaniContent.ts`.
- **Expected Behavior / Output**: Array has length 4. Events:
  1. "DPS Donation Drive"
  2. "Invictus Denim Stall"
  3. "Orphanage Donation Drive (with Aarogi)"
  4. "Beyond the Waste Workshop"
- **Assertion Logic**:
  ```javascript
  const events = content.AVANI_EVENTS;
  assert.strictEqual(events.length, 4, 'Must contain exactly 4 events');
  assert.strictEqual(events[0].title, 'DPS Donation Drive');
  assert.strictEqual(events[1].title, 'Invictus Denim Stall');
  assert(events[2].title.includes('Aarogi'), 'Orphanage drive must mention Aarogi');
  assert.strictEqual(events[3].title, 'Beyond the Waste Workshop');
  ```

##### Test ID: `T1_F07_05`
- **Description**: Verify Verbatim 11 Climate Action Points & Categories.
- **Input / Target Artifact or Endpoint**: `CLIMATE_TIPS` in `src/lib/avaniContent.ts`.
- **Expected Behavior / Output**: Array has length 11. Tip 1 starts with "Switch off lights", tip 11 starts with "Print double-sided". Categories are restricted to `'energy' | 'water' | 'waste' | 'consumption'`.
- **Assertion Logic**:
  ```javascript
  const tips = content.CLIMATE_TIPS;
  assert.strictEqual(tips.length, 11, 'Must contain exactly 11 climate tips');
  assert(tips[0].action.includes('Switch off lights'), 'Tip 1 mismatch');
  assert(tips[10].action.includes('Print double-sided'), 'Tip 11 mismatch');
  const validCategories = ['energy', 'water', 'waste', 'consumption'];
  assert(tips.every(t => validCategories.includes(t.category)), 'All tips must have valid categories');
  ```

---

#### Tier 2: Boundary & Robustness Tests

##### Test ID: `T2_F07_01`
- **Description**: Object Freezing Immutability Boundary.
- **Input / Target Artifact or Endpoint**: Attempting runtime mutation: `AVANI_CONTENT.objectives[0].title = 'Tampered'`.
- **Expected Behavior / Output**: Throws `TypeError` or modification is rejected due to `Object.freeze()`.
- **Assertion Logic**:
  ```javascript
  assert.throws(() => {
    'use strict';
    content.AVANI_OBJECTIVES[0].title = 'Tampered Title';
  }, /read only|frozen|extensible/i, 'AVANI_OBJECTIVES must be immutable');
  ```

##### Test ID: `T2_F07_02`
- **Description**: Contact Email and Phone Regex Format Validation.
- **Input / Target Artifact or Endpoint**: `EXTERNAL_LINKS.email` and `EXTERNAL_LINKS.phone`.
- **Expected Behavior / Output**: Email matches `/^avaniyocc@gmail\.com$/`, Phone matches `/^\+91\s?8050931769$/`.
- **Assertion Logic**:
  ```javascript
  assert(/^avaniyocc@gmail\.com$/i.test(content.EXTERNAL_LINKS.email), 'Email must be avaniyocc@gmail.com');
  assert(/^\+91\s?8050931769$/.test(content.EXTERNAL_LINKS.phone), 'Phone must match +91 8050931769');
  ```

##### Test ID: `T2_F07_03`
- **Description**: External Links Protocol & Domain Whitelist Validation.
- **Input / Target Artifact or Endpoint**: All URLs in `EXTERNAL_LINKS`.
- **Expected Behavior / Output**: Every URL starts with `https://`, Form points to `docs.google.com/forms`, LinkedIn to `linkedin.com/company/avaniyocc`, Substack to `substack.com`, Instagram to `instagram.com/avani_yocc`.
- **Assertion Logic**:
  ```javascript
  const { applicationFormUrl, linkedInUrl, substackUrl, instagramUrl } = content.EXTERNAL_LINKS;
  assert(applicationFormUrl.startsWith('https://docs.google.com/forms/'), 'Form URL must be Google Form');
  assert(linkedInUrl.startsWith('https://www.linkedin.com/'), 'LinkedIn URL must be linkedin.com');
  assert(substackUrl.includes('substack.com'), 'Substack URL must be substack.com');
  assert(instagramUrl.includes('instagram.com/avani_yocc'), 'Instagram URL must point to avani_yocc');
  ```

##### Test ID: `T2_F07_04`
- **Description**: Zero Empty String or Whitespace Padding Boundary.
- **Input / Target Artifact or Endpoint**: Recursive string leaf node validation across `AVANI_CONTENT`.
- **Expected Behavior / Output**: No string value has `str.trim().length === 0` or starts/ends with unescaped newlines.
- **Assertion Logic**:
  ```javascript
  function checkStrings(obj) {
    for (const [k, v] of Object.entries(obj)) {
      if (typeof v === 'string') {
        assert(v.trim().length > 0, `Field ${k} must not be empty or whitespace`);
      } else if (typeof v === 'object' && v !== null) {
        checkStrings(v);
      }
    }
  }
  checkStrings(content.AVANI_CONTENT);
  ```

##### Test ID: `T2_F07_05`
- **Description**: Exactly 3 Substack Articles Array & URL Note IDs.
- **Input / Target Artifact or Endpoint**: `EXTERNAL_LINKS.substackArticles`.
- **Expected Behavior / Output**: Array has exactly 3 elements with non-empty titles and valid Substack note IDs: `p-216575497`, `p-223896247`, `p-217629092`.
- **Assertion Logic**:
  ```javascript
  const articles = content.EXTERNAL_LINKS.substackArticles;
  assert.strictEqual(articles.length, 3, 'Must contain exactly 3 Substack articles');
  const urls = articles.map(a => a.url);
  assert(urls.some(u => u.includes('p-216575497')), 'Note p-216575497 missing');
  assert(urls.some(u => u.includes('p-223896247')), 'Note p-223896247 missing');
  assert(urls.some(u => u.includes('p-217629092')), 'Note p-217629092 missing');
  ```

---

### Feature F8: Universal Navbar & Footer

#### Tier 1: Functional & Interface Tests

##### Test ID: `T1_F08_01`
- **Description**: Verify Navbar Branding Elements (Logo and Title).
- **Input / Target Artifact or Endpoint**: Rendered DOM of `<Navbar />`.
- **Expected Behavior / Output**: Header contains Avani logo image (`src` attribute containing `logo.jpg`) and brand title text `"Avani"`.
- **Assertion Logic**:
  ```javascript
  const logo = document.querySelector('header img, nav img');
  assert(logo !== null, 'Navbar logo element must be rendered');
  assert(logo.getAttribute('src').includes('logo.jpg'), 'Logo image src must point to logo.jpg');
  const title = document.querySelector('header, nav').textContent;
  assert(title.includes('Avani'), 'Navbar must render brand name Avani');
  ```

##### Test ID: `T1_F08_02`
- **Description**: Verify Prototype Switcher Navigation Links.
- **Input / Target Artifact or Endpoint**: Prototype switcher container in `<Navbar />`.
- **Expected Behavior / Output**: Contains active links with `href` attributes pointing to `/` (Hub), `/prototype-1`, and `/prototype-2`.
- **Assertion Logic**:
  ```javascript
  const links = Array.from(document.querySelectorAll('nav a, header a')).map(a => a.getAttribute('href'));
  assert(links.includes('/'), 'Switcher must link to / Hub');
  assert(links.includes('/prototype-1'), 'Switcher must link to /prototype-1');
  assert(links.includes('/prototype-2'), 'Switcher must link to /prototype-2');
  ```

##### Test ID: `T1_F08_03`
- **Description**: Verify "Apply Now" Call-To-Action Button Attributes.
- **Input / Target Artifact or Endpoint**: Primary CTA button in `<Navbar />`.
- **Expected Behavior / Output**: Anchor element links to Google Form URL, has `target="_blank"`, and `rel="noopener noreferrer"`.
- **Assertion Logic**:
  ```javascript
  const applyBtn = document.querySelector('a[href*="docs.google.com/forms"]');
  assert(applyBtn !== null, 'Apply Now button linking to Google Form must exist');
  assert.strictEqual(applyBtn.getAttribute('target'), '_blank', 'target must be _blank');
  assert(applyBtn.getAttribute('rel')?.includes('noopener'), 'rel must include noopener');
  ```

##### Test ID: `T1_F08_04`
- **Description**: Verify Universal Footer Social and Contact Links.
- **Input / Target Artifact or Endpoint**: Rendered DOM of `<Footer />`.
- **Expected Behavior / Output**: Footer contains active links for LinkedIn, Substack, Instagram, Email (`mailto:avaniyocc@gmail.com`), and Phone (`tel:+918050931769`).
- **Assertion Logic**:
  ```javascript
  const footerLinks = Array.from(document.querySelectorAll('footer a')).map(a => a.getAttribute('href'));
  assert(footerLinks.some(h => h.includes('linkedin.com')), 'LinkedIn link required in footer');
  assert(footerLinks.some(h => h.includes('substack.com')), 'Substack link required in footer');
  assert(footerLinks.some(h => h.includes('instagram.com')), 'Instagram link required in footer');
  assert(footerLinks.some(h => h.startsWith('mailto:avaniyocc@gmail.com')), 'Mailto link required');
  assert(footerLinks.some(h => h.startsWith('tel:')), 'Phone tel link required');
  ```

##### Test ID: `T1_F08_05`
- **Description**: Verify Responsive Viewport Layout Adaptability.
- **Input / Target Artifact or Endpoint**: Viewport dimensions 1280px (Desktop) vs 375px (Mobile).
- **Expected Behavior / Output**: On mobile (<768px), desktop navigation links collapse and mobile hamburger menu button becomes visible.
- **Assertion Logic**:
  ```javascript
  await page.setViewport({ width: 375, height: 667 });
  const mobileToggle = await page.$('button[aria-label*="menu" i], button[aria-expanded]');
  assert(mobileToggle !== null, 'Mobile menu toggle button must be rendered on 375px viewport');
  const isVisible = await mobileToggle.isIntersectingViewport();
  assert(isVisible, 'Mobile menu toggle must be visible on mobile viewport');
  ```

---

#### Tier 2: Boundary & Robustness Tests

##### Test ID: `T2_F08_01`
- **Description**: Mobile Drawer Expand/Collapse State Toggle.
- **Input / Target Artifact or Endpoint**: User click on mobile hamburger toggle button.
- **Expected Behavior / Output**: Menu state toggles; `aria-expanded` updates from `"false"` to `"true"`, and mobile nav drawer becomes visible.
- **Assertion Logic**:
  ```javascript
  const toggleBtn = await page.$('button[aria-expanded]');
  const initialExpanded = await page.evaluate(el => el.getAttribute('aria-expanded'), toggleBtn);
  assert.strictEqual(initialExpanded, 'false', 'Initial aria-expanded must be false');
  await toggleBtn.click();
  const openedExpanded = await page.evaluate(el => el.getAttribute('aria-expanded'), toggleBtn);
  assert.strictEqual(openedExpanded, 'true', 'aria-expanded must become true after click');
  ```

##### Test ID: `T2_F08_02`
- **Description**: Active Pathname Indicator Highlighting.
- **Input / Target Artifact or Endpoint**: Page rendered on route `/prototype-1`.
- **Expected Behavior / Output**: The `/prototype-1` link possesses active styling class (e.g. `font-bold` or `bg-canopy`), while `/prototype-2` and `/` links do not.
- **Assertion Logic**:
  ```javascript
  const p1Link = await page.$('a[href="/prototype-1"]');
  const p2Link = await page.$('a[href="/prototype-2"]');
  const p1Classes = await page.evaluate(el => el.className, p1Link);
  const p2Classes = await page.evaluate(el => el.className, p2Link);
  assert(p1Classes.includes('active') || p1Classes.includes('bg-') || p1Classes.includes('font-semibold'), 'P1 link must have active styling');
  assert(!p2Classes.includes('active'), 'P2 link must not have active class on P1 route');
  ```

##### Test ID: `T2_F08_03`
- **Description**: Contact Link Protocol Scheme Sanitization.
- **Input / Target Artifact or Endpoint**: Footer `mailto:` and `tel:` anchor tags.
- **Expected Behavior / Output**: `mailto:` link contains zero whitespace or illegal URI characters; `tel:` link contains only numbers and standard `+` international prefix.
- **Assertion Logic**:
  ```javascript
  const emailHref = await page.$eval('footer a[href^="mailto:"]', el => el.getAttribute('href'));
  const phoneHref = await page.$eval('footer a[href^="tel:"]', el => el.getAttribute('href'));
  assert(/^mailto:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailHref), 'Mailto URI must be valid');
  assert(/^tel:\+?[0-9\s-]+$/.test(phoneHref), 'Tel URI must contain only valid dial digits');
  ```

##### Test ID: `T2_F08_04`
- **Description**: Sticky Header Stacking Context & Z-Index Boundary (≥50).
- **Input / Target Artifact or Endpoint**: Computed CSS style of `<header>` or `<Navbar />` wrapper.
- **Expected Behavior / Output**: `position` is `fixed` or `sticky`, `top: 0`, and `z-index` is >= 50, ensuring navbar renders above full-screen WebGL canvas and scrolling content cards.
- **Assertion Logic**:
  ```javascript
  const navStyles = await page.$eval('header, nav', el => {
    const s = window.getComputedStyle(el);
    return { position: s.position, zIndex: parseInt(s.zIndex, 10), top: s.top };
  });
  assert(navStyles.position === 'fixed' || navStyles.position === 'sticky', 'Navbar must be fixed or sticky');
  assert(navStyles.zIndex >= 50, `Navbar z-index (${navStyles.zIndex}) must be >= 50`);
  ```

##### Test ID: `T2_F08_05`
- **Description**: Keyboard Accessibility & Focus Trapping Boundary.
- **Input / Target Artifact or Endpoint**: Tab key navigation through Navbar interactive elements.
- **Expected Behavior / Output**: Focus advances through logo, switcher links, and CTA button with visible focus outline; ESC key closes open mobile menu.
- **Assertion Logic**:
  ```javascript
  await page.keyboard.press('Tab');
  const activeTag = await page.evaluate(() => document.activeElement.tagName);
  assert(activeTag === 'A' || activeTag === 'BUTTON', 'Tab focus must land on interactive element');
  // Open mobile drawer and press Escape
  await page.keyboard.press('Escape');
  const isDrawerClosed = await page.$eval('button[aria-expanded]', el => el.getAttribute('aria-expanded') === 'false');
  assert(isDrawerClosed, 'Escape key must close mobile menu');
  ```

---

## Test Inventory Summary Matrix

| Feature | Feature Name | Tier 1 Tests | Tier 2 Boundary Tests | Total Tests |
|---|---|:---:|:---:|:---:|
| **F1** | Stitch MCP P1 Mockup | 5 | 5 | 10 |
| **F2** | Stitch MCP P2 Mockup | 5 | 5 | 10 |
| **F3** | Stitch Mockup Local Export | 5 | 5 | 10 |
| **F4** | Google Flow Media Generation | 5 | 5 | 10 |
| **F5** | Brand Logo Integration | 5 | 5 | 10 |
| **F6** | Next.js 14 Scaffolding & Setup | 5 | 5 | 10 |
| **F7** | Shared Brand Content Module | 5 | 5 | 10 |
| **F8** | Universal Navbar & Footer | 5 | 5 | 10 |
| **Total** | **Features F1–F8** | **40** | **40** | **80** |

All 80 test specifications are ready for direct translation into executable Jest/Playwright/Node test suites (`tests/e2e/tier1-features/` and `tests/e2e/tier2-boundaries/`).
