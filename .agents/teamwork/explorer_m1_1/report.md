# Stitch MCP Technical Toolchain & Execution Guide for Avani Landing Page Mockups (Milestone M1)

**Agent:** explorer_m1_1  
**Date:** 2026-11-12  
**Milestone:** M1 — Stitch MCP UI Mockups  
**Working Directory:** `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages`  
**State Folder:** `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/explorer_m1_1`  
**Target Output Artifacts:**  
- `mockups/prototype_1/mockup.html` (Standalone Tailwind CSS HTML)  
- `mockups/prototype_1/mockup.png` (High-resolution Desktop UI screenshot)  
- `mockups/prototype_1/metadata.json` (Screen & Project Metadata)  
- `mockups/prototype_2/mockup.html` (Standalone Tailwind CSS HTML)  
- `mockups/prototype_2/mockup.png` (High-resolution Desktop UI screenshot)  
- `mockups/prototype_2/metadata.json` (Screen & Project Metadata)  

---

## 1. Executive Summary & Live Verification

This report provides the authoritative technical reference and unambiguous execution roadmap for generating, extracting, and verifying Avani landing page design mockups via Google's **Stitch MCP** server.

### Live Verification Status
- **Stitch MCP Connectivity**: Verified live via `call_mcp_tool` on server `StitchMCP`.
- **Tool Schemas**: All 17 JSON schemas in `/Users/bhavikgolchha07/.gemini/antigravity/mcp/StitchMCP/` have been analyzed line by line.
- **Live Tool Executions**:
  - `list_projects` executed successfully and returned active user projects.
  - `list_screens` executed successfully with bare `projectId` parameter, returning structured screen lists containing `htmlCode.name` and `screenshot.name`.
  - `download_file` verified for both HTML code (returning full standalone Tailwind HTML) and PNG screenshot (returning base64-encoded binary string with dimensions).
- **Execution Viability**: 100% verified. Zero blocking issues.

---

## 2. Stitch MCP Core Tool Suite & Interface Contracts

The Stitch MCP tool suite operates under the server name `StitchMCP`. Six primary tools comprise the end-to-end generation and extraction chain.

### 2.1 Parameter Format & Prefix Reference Table

One of the most frequent causes of tool invocation failure in Stitch MCP is improper resource name formatting. The table below specifies the exact format required by each tool:

| Tool Name | Parameter Name | Expected Format | Example | Common Mistake (Fails) |
| :--- | :--- | :--- | :--- | :--- |
| `create_project` | `title` | string (optional) | `"Avani Landing Page - Prototype 1"` | N/A |
| `get_project` | `name` | `projects/{id}` | `"projects/4044680601076201931"` | `"4044680601076201931"` |
| `create_design_system` | `projectId` | Bare string (no prefix) | `"4044680601076201931"` | `"projects/4044680601076201931"` |
| `list_screens` | `projectId` | Bare string (no prefix) | `"4044680601076201931"` | `"projects/4044680601076201931"` |
| `generate_screen_from_text` | `projectId` | Bare string (no prefix) | `"4044680601076201931"` | `"projects/4044680601076201931"` |
| `get_screen` | `name` | `projects/{id}/screens/{screenId}` | `"projects/4044/screens/98b50e"` | `"98b50e"` or `"screens/98b50e"` |
| `download_file` | `name` | `projects/{id}/files/{fileId}` | `"projects/4044/files/ea26dc"` | Passing raw `downloadUrl` |

---

### 2.2 Detailed Tool Specifications

#### 1. `create_project`
- **Purpose**: Creates an isolated container project for UI screens and design tokens.
- **Signature**:
  ```json
  {
    "title": "Avani Landing Page - Prototype 1"
  }
  ```
- **Return Value**:
  ```json
  {
    "name": "projects/4044680601076201931",
    "title": "Avani Landing Page - Prototype 1",
    "createTime": "...",
    "projectType": "PROJECT_DESIGN"
  }
  ```
- **Key Extraction**: Extract `projectId = name.split("/")[1]` (e.g. `"4044680601076201931"`).

#### 2. `create_design_system`
- **Purpose**: Configures global design tokens (palette, typography, corner roundness, light/dark appearance) for the project.
- **Signature**:
  ```json
  {
    "projectId": "<bare_project_id>",
    "designSystem": {
      "displayName": "Avani Organic Youth - Blume Garden",
      "theme": {
        "colorMode": "LIGHT",
        "headlineFont": "PLUS_JAKARTA_SANS",
        "bodyFont": "INTER",
        "labelFont": "INTER",
        "customColor": "#163515",
        "overridePrimaryColor": "#163515",
        "overrideSecondaryColor": "#88C999",
        "overrideTertiaryColor": "#F59E0B",
        "overrideNeutralColor": "#F9FAF7",
        "roundness": "ROUND_TWELVE"
      }
    }
  }
  ```
- **Valid Enums**:
  - `colorMode`: `"LIGHT"`, `"DARK"`
  - `headlineFont` / `bodyFont` / `labelFont`: `"PLUS_JAKARTA_SANS"`, `"INTER"`, `"SOURCE_SERIF_4"`, `"SPACE_GROTESK"`, `"MANROPE"`, `"OUTFIT"`, `"GEIST"`, `"DM_SANS"`, `"RUBIK"`
  - `roundness`: `"ROUND_FOUR"`, `"ROUND_EIGHT"`, `"ROUND_TWELVE"`, `"ROUND_FULL"`

#### 3. `generate_screen_from_text`
- **Purpose**: Generates a responsive desktop landing page screen from prompt specifications.
- **Signature**:
  ```json
  {
    "projectId": "<bare_project_id>",
    "prompt": "<authoritative_prompt_text>",
    "deviceType": "DESKTOP",
    "modelId": "GEMINI_3_8_FLASH"
  }
  ```
- **Parameter Requirements**:
  - `projectId`: Bare numeric/alphanumeric string without `projects/` prefix.
  - `deviceType`: MUST be `"DESKTOP"` (enum values: `DEVICE_TYPE_UNSPECIFIED`, `MOBILE`, `DESKTOP`, `TABLET`, `AGNOSTIC`).
  - `modelId`: MUST be `"GEMINI_3_8_FLASH"` (optimal quality, highest fidelity Tailwind code generation).
  - `designSystem`: Optional asset path (e.g. `"assets/..."`). If omitted, Stitch automatically infers and creates a design system that fits the prompt.

#### 4. `list_screens`
- **Purpose**: Lists all generated screen instances in a project. Used for polling generation status.
- **Signature**:
  ```json
  {
    "projectId": "<bare_project_id>"
  }
  ```
- **Return Value**:
  ```json
  {
    "screens": [
      {
        "name": "projects/4044680601076201931/screens/c3ffda8c1042427d8f4b9e13ff57b648",
        "title": "Avani Landing Page",
        "screenshot": {
          "name": "projects/4044680601076201931/files/893cc8b14fe54a8eb92dfe8ef8b91b88",
          "downloadUrl": "https://stitch.googleapis.com/...",
          "mimeType": "png"
        },
        "htmlCode": {
          "name": "projects/4044680601076201931/files/ad9da2ac4d654c46b4902d0ffec21c9a",
          "downloadUrl": "https://stitch.googleapis.com/...",
          "mimeType": "text/html"
        },
        "width": "1440",
        "height": "3200",
        "deviceType": "DESKTOP",
        "screenType": "DESIGN"
      }
    ]
  }
  ```

#### 5. `download_file`
- **Purpose**: Downloads either the raw UTF-8 HTML or the base64-encoded PNG screenshot.
- **Signature**:
  ```json
  {
    "name": "projects/{projectId}/files/{fileId}"
  }
  ```
- **Important**: NEVER attempt to fetch `downloadUrl` with `curl` or `fetch`. Those URLs require internal Google session authentication headers and will return an HTTP error or JSON envelope. `download_file` executes the authenticated retrieval server-side.
- **Return Types**:
  - For HTML files: `{"html": "<!DOCTYPE html>..."}`
  - For Screenshot files: `{"image": "iVBORw0KGgo...", "image_metadata": {"mime_type": "image/png", "width": 1440, "height": 3200}}`

---

## 3. Authoritative Creative Prompts & Design Token Payloads

To guarantee that the generated mockups fulfill all requirements (R1, R3) from `ORIGINAL_REQUEST.md`, the prompts embed all organization objectives, team roles, event summaries, climate tips, external links, and brand colors.

### 3.1 Prototype 1: "Blume / Glow Garden" (Canva Mood Board Idea 5)

- **Aesthetic Direction**: Organic tactile youth, gentle tea-green tinting, leaf motifs, tactile card containers, and rounded pill badges.
- **Color Palette**:
  - Primary / Logo Forest: `#163515`
  - Accent / Tea Green: `#D0E8C5` / `#88C999`
  - Vitality / Sunlit Ochre: `#F59E0B`
  - Surface Background: `#F9FAF7` (organic light paper)
  - Card Containers: `#FFFFFF`
  - Text Neutral: `#25262A`
- **Typography Tokens**:
  - Headline: `PLUS_JAKARTA_SANS`
  - Body: `INTER`
  - Roundness: `ROUND_TWELVE`

#### Design System Payload for Prototype 1:
```json
{
  "projectId": "<PROTOTYPE_1_PROJECT_ID>",
  "designSystem": {
    "displayName": "Avani Organic Youth - Blume Garden",
    "theme": {
      "colorMode": "LIGHT",
      "headlineFont": "PLUS_JAKARTA_SANS",
      "bodyFont": "INTER",
      "labelFont": "INTER",
      "customColor": "#163515",
      "overridePrimaryColor": "#163515",
      "overrideSecondaryColor": "#88C999",
      "overrideTertiaryColor": "#F59E0B",
      "overrideNeutralColor": "#F9FAF7",
      "roundness": "ROUND_TWELVE"
    }
  }
}
```

#### Complete Screen Generation Prompt for Prototype 1:
```text
Design a complete, responsive modern desktop landing page for "Avani", a youth-led environmental and climate action organization based in Bangalore, India. 

Visual Style (Canva Mood Board Idea 5 - Blume / Glow Garden / We Growe):
- Aesthetic: Fresh, organic, tactile, playful, youth-centric environmentalism.
- Color Palette: Deep forest green (#163515) for logo and primary accents, soothing tea green (#D0E8C5, #C7E9C0), warm sunlit ochre (#F59E0B), clean card surfaces (#FFFFFF), and natural organic paper background (#F9FAF7).
- Typography: Rounded, modern sans-serif (Plus Jakarta Sans for prominent headlines, Inter for clean legible body text).
- Visual elements: Rounded pill badges, soft tactile card containers with subtle drop shadows, leaf/seedling SVG icons, interactive toggle tabs, and dynamic grid layouts.

Landing Page Structure & Sections:
1. Navigation Bar:
   - Left: Avani Logo with tagline "Youth for a Greener India".
   - Center links: About, Teams, Community Events, Climate Tips, Articles.
   - Right Action: "Join the Movement" CTA button linking to Google Form, and social icon links (Instagram @avani_yocc, LinkedIn, Substack).

2. Hero Section:
   - Headline: "Small Actions of Many Add Up to Change the World"
   - Subheadline: "Avani is Bangalore's youth-led climate collective uniting students across campuses to advocate for environmental restoration, pollution reduction, and conscious living."
   - Primary CTA: "Apply to Join Avani" (prominent rounded button) and secondary CTA: "Explore Our Impact".
   - Interactive Visual: 3D interactive hero placeholder card depicting Bangalore's green canopy and student community drives.

3. Mission & 5 Core Objectives:
   - Clean 5-card grid with modern icons:
     1. Advocate for urgent climate action.
     2. Upliftment and restoration of natural resources in India.
     3. Raise a relentless voice against all forms of pollution.
     4. Implement effective zero-waste and recycling management.
     5. Promote sustainable brands and activist movements across social platforms.

4. The 5 Avani Student Teams:
   - Interactive tabbed container showcasing team focus and responsibilities:
     1. Research and Writing: Deep-dive environmental articles and policy reporting.
     2. Design: High-impact graphics, brand identity, and campaign visuals.
     3. HR and Communications: Member recruitment, culture, and inter-organizational outreach.
     4. Social Media: Viral reels, awareness campaigns, and digital activist publicity.
     5. Event Planning: Organizing on-ground cleanliness drives, donation stalls, and workshops.

5. Realized Events Showcase:
   - 4 card grid with badge tags, dates, and impact stats:
     - "DPS Donation Drive": Mobilizing campus faculty and students to distribute essential supplies and clothing.
     - "Invictus Denim Stall": Upcycled fashion showcase demonstrating student entrepreneurship and circular textile economy.
     - "Orphanage Donation Drive (with Aarogi)": Grassroots community partnership providing goods and emotional warmth to children.
     - "Beyond the Waste Workshop": Hands-on upcycling workshop turning everyday discarded items into functional art.

6. Interactive "11 Ways to Help the Climate" Checklist:
   - Gamified checklist component where users can check off daily eco-actions:
     1. Switch off lights, fans, and electronics when leaving a room.
     2. Unplug idle chargers and appliances.
     3. Turn off tap while brushing teeth or shaving.
     4. Carry reusable water bottle, cloth bag, and food container.
     5. Compost vegetable peels and kitchen scraps.
     6. Plan meals and utilize leftovers to eliminate food waste.
     7. Repair, reuse, or donate clothing and appliances.
     8. Run washing machine/dishwasher on full loads only.
     9. Decline single-use plastics, extra cutlery, and unnecessary prints.
     10. Repurpose glass jars for home storage.
     11. Print double-sided and embrace digital-first notes.

7. Publications & Substack Articles:
   - Direct cards linking to latest Substack notes and environmental essays.

8. Recruitment & Application Section:
   - Clear banner: "How to Apply for Avani Cohort 2026"
   - 5-step application process outline (Form Submission -> Document format NAME_AVANI_SUBMISSION -> Interview Round -> Team Assignment -> Voluntary Student Climate Leadership).
   - Direct button to Application Form.

9. Footer:
   - Contact info: Email avaniyocc@gmail.com, Phone +91 8050931769, Bangalore, India.
   - Social links: Substack, LinkedIn, Instagram, Google Form.
   - Copyright 2026 Avani Youth Organization for Climate Change.
```

---

### 3.2 Prototype 2: "Editorial Earth Journal & Kinetic Scroll" (Alternative Direction)

- **Aesthetic Direction**: Cinematic, editorial conservation magazine aesthetic designed to precede interactive 3D scroll effects. Deep night forest canvas, bioluminescent green highlights, and authoritative serif typography.
- **Color Palette**:
  - Primary / Night Forest: `#0F2410` / `#0A160B`
  - Accent / Bioluminescent Leaf: `#22C55E` / `#4ADE80`
  - Accent / Raw Earth Terra: `#C27803`
  - Frosted Glass Containers: `rgba(22, 53, 21, 0.45)` with 1px border highlight
  - Light Text: `#F3F4F6`
- **Typography Tokens**:
  - Headline: `SOURCE_SERIF_4`
  - Body: `INTER`
  - Label: `SPACE_GROTESK`
  - Roundness: `ROUND_EIGHT`

#### Design System Payload for Prototype 2:
```json
{
  "projectId": "<PROTOTYPE_2_PROJECT_ID>",
  "designSystem": {
    "displayName": "Avani Editorial Earth Journal",
    "theme": {
      "colorMode": "DARK",
      "headlineFont": "SOURCE_SERIF_4",
      "bodyFont": "INTER",
      "labelFont": "SPACE_GROTESK",
      "customColor": "#22C55E",
      "overridePrimaryColor": "#22C55E",
      "overrideSecondaryColor": "#0F2410",
      "overrideTertiaryColor": "#C27803",
      "overrideNeutralColor": "#0A160B",
      "roundness": "ROUND_EIGHT"
    }
  }
}
```

#### Complete Screen Generation Prompt for Prototype 2:
```text
Design a complete, high-contrast, editorial desktop landing page for "Avani", an elite Bangalore student environmental organization. 

Visual Style (Alternative Direction - Editorial Earth Journal & Kinetic Climate Advocacy):
- Aesthetic: Immersive, sophisticated, editorial conservation magazine aesthetic designed to precede interactive 3D scroll effects. High visual gravitas, dramatic dark-forest canvas with bioluminescent accents and elegant typography.
- Color Palette: Deep night forest green (#0F2410, #0A160B), bioluminescent electric leaf (#22C55E, #4ADE80) for active scroll states, warm terra cotta accent (#C27803), semi-transparent frosted glass containers (rgba(22, 53, 21, 0.45)), and crisp white/silver text (#F3F4F6).
- Typography: Authoritative editorial serif (Source Serif 4) for grand editorial headlines; technical monospace/grotesk (Space Grotesk / Inter) for metadata, stats, tags, and body copy.
- Visual elements: Full-bleed dark backdrop, subtle topographic contour lines, glassmorphism cards with 1px border highlights, sticky progress indicators, and cinematic layout pacing.

Landing Page Structure & Sections:
1. Editorial Masthead / Header:
   - Minimalist top bar: "AVANI // BANGALORE YOUTH CLIMATE ACTION"
   - Right: Real-time status indicator "VOLUNTEER COHORT OPEN", direct links to Substack, LinkedIn, Instagram (@avani_yocc), and Application Form.

2. Cinematic Hero Section:
   - Monolithic Serif Headline: "Mobilizing a Generation to Restore the Earth."
   - Subtitle: "Bangalore's pioneering youth collective tackling climate crisis, resource degradation, and waste through investigative research, direct action, and sustainable cultural shifts."
   - Key Metric Ticker: 4 Major Community Drives · 5 Specialized Divisions · 11 Everyday Climate Protocols · 100% Student-Driven.
   - Interactive Scroll Cue: "SCROLL TO WITNESS THE RESTORATION JOURNEY ↓" with 3D viewport canvas placeholder.

3. The Five Core Directives (Objectives):
   - High-contrast numbered editorial layout (01 to 05) with bold typography:
     - 01. CLIMATE ADVOCACY: Policy awareness campaigns and direct demonstrations.
     - 02. RESOURCE RESTORATION: Active rejuvenation of Bangalore's local water bodies and green covers.
     - 03. POLLUTION REDUCTION: Zero-tolerance accountability across air, soil, and water.
     - 04. CIRCULAR WASTE SYSTEMS: Eliminating single-use items across institutions.
     - 05. MOVEMENT PUBLICITY: Amplifying ethical, sustainable Indian brands and eco-initiatives.

4. Operational Divisions (The 5 Teams):
   - Horizontal split-screen showcase with technical team dossiers:
     - [01] RESEARCH & WRITING // Deep investigations on climate reality.
     - [02] DESIGN & VISUAL ARTS // Crafting the visual language of climate defense.
     - [03] HR & STRATEGIC COMMS // Talent onboarding, school outreach, and organizational alliances.
     - [04] SOCIAL BROADCASTING // Digital activism on Instagram & Substack.
     - [05] ON-GROUND OPERATIONS // Coordinating donation drives, workshops, and street demonstrations.

5. Field Operations & Impact Archive (The 4 Events):
   - Timeline / Case-Study dossier format:
     - Archive 01: "DPS DONATION DRIVE" — Community resource redistribution uniting schools and underserved neighborhoods.
     - Archive 02: "INVICTUS DENIM STALL" — Campus upcycling initiative pioneering circular denim fashion and conscious consumption.
     - Archive 03: "ORPHANAGE PARTNERSHIP (WITH AAROGI)" — Grassroots aid, essential distribution, and empathy-driven youth engagement.
     - Archive 04: "BEYOND THE WASTE WORKSHOP" — Hands-on upcycling masterclass transforming urban discard into artistic innovation.

6. The Climate Action Codex (11 Practical Protocols):
   - Technical protocol cards categorized into Energy, Water, Waste, and Consumption:
     - 01. Power conservation (room clearance).
     - 02. Vampire power cutoff (appliances).
     - 03. Water valve discipline (hygiene).
     - 04. Reusable vessel mandate.
     - 05. Organic bio-composting.
     - 06. Zero food waste meal planning.
     - 07. Repair & donate over repurchase.
     - 08. Appliance load optimization.
     - 09. Packaging denial (single-use cutleries).
     - 10. Glass storage repurposing.
     - 11. Dual-sided print & digital transition.

7. Dispatches from Substack:
   - Curated article cards featuring excerpts from Avani's Substack notes.

8. Joining the Ranks (Application Protocol):
   - Clear dossier on the 5-stage selection process: Form -> Submission -> Interview -> Core Placement -> Active Deployment.
   - Primary Call to Action: "COMMENCE APPLICATION PROTOCOL" button.

9. Institutional Colophon (Footer):
   - Emergency contact: avaniyocc@gmail.com | +91 8050931769
   - Bangalore, Karnataka, India.
   - Comprehensive link index and legal attribution.
```

---

## 4. Unambiguous Step-by-Step Invocation Guide for the Worker

The Worker subagent can execute this sequence deterministically using `call_mcp_tool` and shell commands.

### Phase 1: Prototype 1 Execution

#### Step 1: Provision Project 1
```json
// Tool: call_mcp_tool
{
  "ServerName": "StitchMCP",
  "ToolName": "create_project",
  "Arguments": {
    "title": "Avani Landing Page - Prototype 1"
  }
}
```
*Action*: Parse response `name` (e.g. `"projects/1234567890"`). Extract `projectId_1 = "1234567890"`.

#### Step 2: Configure Design System 1
```json
// Tool: call_mcp_tool
{
  "ServerName": "StitchMCP",
  "ToolName": "create_design_system",
  "Arguments": {
    "projectId": "<projectId_1>",
    "designSystem": {
      "displayName": "Avani Organic Youth - Blume Garden",
      "theme": {
        "colorMode": "LIGHT",
        "headlineFont": "PLUS_JAKARTA_SANS",
        "bodyFont": "INTER",
        "labelFont": "INTER",
        "customColor": "#163515",
        "overridePrimaryColor": "#163515",
        "overrideSecondaryColor": "#88C999",
        "overrideTertiaryColor": "#F59E0B",
        "overrideNeutralColor": "#F9FAF7",
        "roundness": "ROUND_TWELVE"
      }
    }
  }
}
```

#### Step 3: Trigger Screen Generation for Prototype 1
```json
// Tool: call_mcp_tool
{
  "ServerName": "StitchMCP",
  "ToolName": "generate_screen_from_text",
  "Arguments": {
    "projectId": "<projectId_1>",
    "prompt": "<Full Prototype 1 Prompt text from Section 3.1>",
    "deviceType": "DESKTOP",
    "modelId": "GEMINI_3_8_FLASH"
  }
}
```
*Note*: This tool call may take 60–180 seconds.

#### Step 4: Verify Screen Generation / Status Polling
If Step 3 returns screen metadata with `htmlCode.name` and `screenshot.name`, proceed directly to Step 5.  
If Step 3 returns with a timeout error, **DO NOT RE-RUN `generate_screen_from_text`**. Instead, poll `list_screens`:
```json
// Tool: call_mcp_tool
{
  "ServerName": "StitchMCP",
  "ToolName": "list_screens",
  "Arguments": {
    "projectId": "<projectId_1>"
  }
}
```
Poll every 30 seconds (up to 10 attempts) until `screens` array contains at least 1 object with non-null `htmlCode.name` and `screenshot.name`.

#### Step 5: Download & Save Prototype 1 HTML
From the screen record, extract `htmlFile = screen["htmlCode"]["name"]` (e.g. `projects/.../files/...`).
```json
// Tool: call_mcp_tool
{
  "ServerName": "StitchMCP",
  "ToolName": "download_file",
  "Arguments": {
    "name": "<htmlFile>"
  }
}
```
*Handling output*:
- If returned inline: Save `response["html"]` to `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/mockups/prototype_1/mockup.html`.
- If saved to a temp file (`The output was large and was saved to: file:///path/output.txt`), extract using Python:
  ```bash
  python3 -c '
  import json
  with open("/path/output.txt") as f:
      d = json.load(f)
  with open("/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/mockups/prototype_1/mockup.html", "w") as out:
      out.write(d["html"])
  '
  ```

#### Step 6: Download & Save Prototype 1 PNG Screenshot
From the screen record, extract `imageFile = screen["screenshot"]["name"]` (e.g. `projects/.../files/...`).
```json
// Tool: call_mcp_tool
{
  "ServerName": "StitchMCP",
  "ToolName": "download_file",
  "Arguments": {
    "name": "<imageFile>"
  }
}
```
*Handling output*:
- Decode the base64 string `response["image"]` and write binary bytes to `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/mockups/prototype_1/mockup.png`.
- Using Python:
  ```bash
  python3 -c '
  import json, base64
  with open("/path/output.txt") as f:
      d = json.load(f)
  img_data = base64.b64decode(d["image"])
  with open("/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/mockups/prototype_1/mockup.png", "wb") as out:
      out.write(img_data)
  '
  ```

#### Step 7: Write Prototype 1 Metadata
Save `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/mockups/prototype_1/metadata.json`:
```json
{
  "prototype": "prototype_1",
  "title": "Avani Landing Page - Blume Garden (Idea 5)",
  "projectId": "<projectId_1>",
  "screenName": "<screen.name>",
  "htmlFileName": "<htmlFile>",
  "screenshotFileName": "<imageFile>",
  "dimensions": {
    "width": 1440,
    "height": "<height_from_metadata>"
  },
  "timestamp": "2026-11-12T...",
  "theme": "Light / Organic Youth / Blume Garden",
  "primaryColor": "#163515"
}
```

---

### Phase 2: Prototype 2 Execution

Repeat the identical sequence for Prototype 2:

1. **`create_project`**: Title `"Avani Landing Page - Prototype 2"`. Extract `projectId_2`.
2. **`create_design_system`**: Use Dark / Editorial Earth Journal tokens from Section 3.2.
3. **`generate_screen_from_text`**: Pass `projectId_2`, the full Prototype 2 prompt from Section 3.2, `deviceType: "DESKTOP"`, `modelId: "GEMINI_3_8_FLASH"`.
4. **`list_screens` polling**: Retrieve `screens[0]`.
5. **`download_file` (HTML)**: Save to `mockups/prototype_2/mockup.html`.
6. **`download_file` (Screenshot PNG)**: Decode and save to `mockups/prototype_2/mockup.png`.
7. **`metadata.json`**: Save to `mockups/prototype_2/metadata.json`.

---

## 5. Local Artifact Directory Structure & Validation Standards

The generated files must reside in the exact directory tree specified in `PROJECT.md` and `SCOPE.md`:

```
/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/
└── mockups/
    ├── prototype_1/
    │   ├── mockup.html          # Standalone valid HTML with Tailwind classes
    │   ├── mockup.png           # Valid decoded PNG image (> 50KB, valid PNG header)
    │   └── metadata.json        # Project and screen provenance metadata
    └── prototype_2/
        ├── mockup.html          # Standalone valid HTML with Tailwind classes
        ├── mockup.png           # Valid decoded PNG image (> 50KB, valid PNG header)
        └── metadata.json        # Project and screen provenance metadata
```

### Validation Gate Checks
The Worker and Reviewer subagents should verify the artifacts with the following commands:
1. **File Existence & Non-Empty**:
   ```bash
   test -s mockups/prototype_1/mockup.html && test -s mockups/prototype_1/mockup.png && test -s mockups/prototype_1/metadata.json
   test -s mockups/prototype_2/mockup.html && test -s mockups/prototype_2/mockup.png && test -s mockups/prototype_2/metadata.json
   ```
2. **PNG Binary Verification**:
   ```bash
   file mockups/prototype_1/mockup.png mockups/prototype_2/mockup.png
   # Expected: PNG image data, ...
   ```
3. **HTML Content Verification**:
   ```bash
   grep -E "DPS Donation Drive|Invictus Denim Stall|Beyond the Waste|Aarogi" mockups/prototype_1/mockup.html
   grep -E "DPS Donation Drive|Invictus Denim Stall|Beyond the Waste|Aarogi" mockups/prototype_2/mockup.html
   ```

---

## 6. Edge Case & Failure Recovery Runbook

| Failure Mode | Root Cause | Recovery Procedure |
| :--- | :--- | :--- |
| `Request contains an invalid argument` | Passing `"projects/{id}"` instead of bare string to `projectId`. | Strip `"projects/"` prefix: pass only the numeric/alphanumeric ID. |
| Tool invocation timeout (> 120s) | AI generation in Stitch takes up to 3 minutes under load. | **DO NOT RETRY `generate_screen_from_text`**. Wait 30 seconds and call `list_screens`. Poll every 30s. |
| `curl: (401) Unauthorized` on `downloadUrl` | Direct fetch of Google internal CDN URL. | Do not use `curl`. Call MCP tool `download_file` with `screenshot.name` or `htmlCode.name`. |
| Truncated or corrupted PNG file | Direct writing of base64 string as raw bytes. | Base64 decode using `base64.b64decode()` before writing to binary file (`"wb"`). |
| `output was large and was saved to: file://...` | Context token cap exceeded by large HTML/PNG payload. | Read the file directly via Python script, parse JSON, and write to destination path. |

---

## 7. Conclusion

The Stitch MCP toolchain is verified, authenticated, and fully capable of delivering high-fidelity desktop UI mockups for both Avani prototypes. By following the exact resource identifiers, design tokens, complete prompt texts, and file extraction patterns documented here, the Worker can execute Milestone M1 with zero friction and 100% compliance with acceptance criteria.
