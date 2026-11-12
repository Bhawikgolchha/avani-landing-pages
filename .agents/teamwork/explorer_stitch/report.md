# Stitch MCP Architecture, Capability Analysis & Implementation Workflow for Avani Landing Page Prototypes

**Date:** 2026-11-12  
**Author:** explorer_stitch  
**Status:** Completed & Verified  
**Working Directory:** `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages`  
**State Folder:** `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/explorer_stitch`  

---

## 1. Executive Summary

This investigation establishes the complete technical specification, tool interface contracts, and end-to-end execution pipeline for using **Stitch MCP** (`https://stitch.withgoogle.com`) to generate, manage, and extract high-fidelity UI design mockups for Avani's two landing page prototypes:
- **Prototype 1 (Canva Mood Board Idea 5 - "Blume / Glow Garden / We Growe")**: An organic, vibrant, youth-centric, tactile eco-aesthetic with soft tea green (`#D0E8C5`), forest accents (`#163515`), and friendly modern typography (Plus Jakarta Sans / Inter).
- **Prototype 2 (Alternative Direction - "Editorial Earth Journal & Kinetic Climate Advocacy")**: A high-impact, editorial-grade narrative direction utilizing deep forest darkness (`#0F2410` / `#163515`), crisp biological greens (`#22C55E`), warm parchment neutral (`#F7F5EE`), and sophisticated serif/grotesk typography (Source Serif 4 / Space Grotesk) optimized for 3D scroll-driven transitions.

### Verification Milestone
Live tool calls were executed via `call_mcp_tool` against the active Stitch MCP server to verify connectivity, schema compliance, authentication, parameter semantics, and output formats. All operations—including project queries, design system serialization, and binary file extraction (`download_file` for raw HTML and base64 PNGs)—succeeded with zero errors.

---

## 2. Stitch MCP Tool Suite Inventory & Interface Specifications

Stitch MCP exposes 17 dedicated tools under the server name `StitchMCP`. All tool schemas have been inspected from `/Users/bhavikgolchha07/.gemini/antigravity/mcp/StitchMCP/`.

### 2.1 Tool Classification Matrix

| Category | Tool Name | Key Arguments | Return Value / Role |
| :--- | :--- | :--- | :--- |
| **Project Lifecycle** | `create_project` | `title` (string) | Creates container; returns `name: "projects/{projectId}"` |
| | `get_project` | `name` ("projects/{projectId}") | Full project metadata, theme, and canvas screen instances |
| | `list_projects` | `filter` ("view=owned"), `pageSize`, `pageToken` | Paginated listing of user's projects |
| | `update_project` | `name`, `title`, `backgroundTheme`, `screenInstances` | Updates metadata, theme, and canvas layout |
| | `delete_project` | `name` ("projects/{projectId}") | Permanent deletion |
| **Design Systems** | `upload_design_md` | `projectId`, `designMdBase64` | Ingests base64 `DESIGN.md` and generates a screen instance |
| | `create_design_system_from_design_md` | `projectId`, `selectedScreenInstance`, `deviceType` | Binds uploaded DESIGN.md into the active project theme |
| | `create_design_system` | `projectId`, `designSystem` (theme, fonts, colors) | Creates a programmatic design token asset (`assets/{assetId}`) |
| | `update_design_system` | `name`, `projectId`, `designSystem` | Modifies existing design system asset |
| | `list_design_systems` | `projectId` (without `projects/` prefix) | Returns all design systems and active style guidelines |
| | `apply_design_system` | `projectId`, `assetId`, `selectedScreenInstances` | Applies token palette to specific existing screen instances |
| **Screen Generation** | `generate_screen_from_text` | `projectId`, `prompt`, `deviceType`, `modelId`, `designSystem` | Generates a new responsive UI screen from descriptive text |
| | `edit_screens` | `projectId`, `selectedScreenIds`, `prompt`, `deviceType` | Modifies existing screens via prompt instructions |
| | `generate_variants` | `projectId`, `selectedScreenIds`, `prompt`, `variantOptions` | Explores 1–5 variations across layout, color, or content |
| | `list_screens` | `projectId` (without `projects/` prefix) | Lists all screens with screen IDs, thumbnail, and file references |
| | `get_screen` | `name` ("projects/{projectId}/screens/{screenId}") | Detailed screen metadata, dimensions, and file links |
| | `update_screen` | `name`, `htmlCodeBase64`, `screenshotBase64`, `updateMask` | Manual overwrite of screen HTML or screenshot PNG |
| **Asset Extraction** | `download_file` | `name` ("projects/{projectId}/files/{fileId}") | Returns raw `html` or base64 `image` with dimensions |

---

### 2.2 Critical Tool Constraints & ID Conventions

1. **ID Prefix Conventions**:
   - `create_project` returns `name: "projects/4044680601076201931"`.
   - `list_screens`, `upload_design_md`, `generate_screen_from_text`, and `list_design_systems` require `projectId` **WITHOUT** the `projects/` prefix (e.g. `"4044680601076201931"`).
   - `get_project` and `delete_project` require the full resource name `name: "projects/4044680601076201931"`.
   - `get_screen` requires `name: "projects/4044680601076201931/screens/{screenId}"`.
   - `download_file` requires the exact file reference `name: "projects/4044680601076201931/files/{fileId}"` as returned in `htmlCode.name` or `screenshot.name`.

2. **File Downloads & Credentials**:
   - Screen objects contain `downloadUrl` (e.g. `https://stitch.googleapis.com/...`), but fetching these URLs directly via `curl` or browser fails with auth errors or returns internal JSON wrappers.
   - **MANDATORY**: Use the `download_file` MCP tool. It securely decodes and returns:
     - HTML files: raw UTF-8 string in `{ "html": "<!DOCTYPE html>..." }`.
     - Screenshots: base64 string in `{ "image": "iVBORw0KGgo...", "image_metadata": {"mime_type": "image/png", "width": 1440, "height": 3200} }`.

3. **Asynchronous Generation & Polling**:
   - `generate_screen_from_text` can take 60 to 180 seconds.
   - **Instruction Rule**: DO NOT RETRY immediately if a network timeout occurs. The background server worker continues generation. The client agent must poll with `list_screens` or `get_screen` every 30 seconds for up to 10 attempts.

4. **Typography & Styling Enums**:
   - Headline/Body font enums: `PLUS_JAKARTA_SANS`, `INTER`, `MANROPE`, `SPACE_GROTESK`, `SOURCE_SERIF_4`, `OUTFIT`, `DM_SANS`, `SYNE`, `GEIST`, `RUBIK`.
   - Device types: `DESKTOP`, `MOBILE`, `TABLET`, `AGNOSTIC`. For landing page prototypes, `DESKTOP` must be selected.
   - Models: `GEMINI_3_8_FLASH` (recommended for fastest and most compliant UI code) or `GEMINI_3_5_FLASH_LITE`.
   - Roundness: `ROUND_FOUR`, `ROUND_EIGHT`, `ROUND_TWELVE`, `ROUND_FULL`.

---

## 3. Avani Brand Token Definitions & Design System Setup

Based on the verified Avani briefing PDF (`media_1794462310806_90d35dda.pdf`), official logo extraction (`media_1794462993310_400d91e2.jpg`), and Canva Mood Board analysis (Idea 5 "Blume/Glow Garden"), two distinct design systems are formulated.

### 3.1 Design System 1: Organic Tactile Youth (Prototype 1 - Idea 5)

- **Aesthetic**: Warm, tactile, playful, youth-led, soft-cornered paper/card containers, badge pills, natural green gradients.
- **Color Tokens**:
  - `Primary / Brand Green`: `#163515` (from Avani Logo)
  - `Secondary / Tea Green Accent`: `#88C999` / `#C7E9C0` (Canva Idea 5 Tea Green)
  - `Tertiary / Sunflower Ochre`: `#F59E0B` / `#D97706` (Youthful vitality & action)
  - `Surface / Background Light`: `#F9FAF7` (Organic unbleached paper)
  - `Surface Container`: `#FFFFFF`
  - `Neutral Dark (Text)`: `#25262A`
  - `Outline / Hairline`: `#E2E8F0`
- **Typography Tokens**:
  - `Headline Font`: `PLUS_JAKARTA_SANS`
  - `Body Font`: `INTER`
  - `Label Font`: `INTER`
- **Shape & Elevation**:
  - `Roundness`: `ROUND_TWELVE` (or `ROUND_FULL` for pill tags)
  - `Elevation`: Soft 1px bordered cards with subtle ambient glow (`0 8px 30px rgba(22, 53, 21, 0.06)`).

#### Programmatic `create_design_system` Payload for Prototype 1:
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
      "roundness": "ROUND_TWELVE",
      "spacing": {
        "gutter": "24px",
        "margin-desktop": "64px",
        "stack-sm": "8px",
        "stack-md": "16px",
        "stack-lg": "32px",
        "stack-xl": "64px"
      },
      "typography": {
        "display-hero": {
          "fontFamily": "Plus Jakarta Sans",
          "fontSize": "56px",
          "fontWeight": "800",
          "lineHeight": "1.1",
          "letterSpacing": "-0.03em"
        },
        "heading-section": {
          "fontFamily": "Plus Jakarta Sans",
          "fontSize": "36px",
          "fontWeight": "700",
          "lineHeight": "1.2"
        },
        "body-lg": {
          "fontFamily": "Inter",
          "fontSize": "18px",
          "fontWeight": "400",
          "lineHeight": "1.6"
        },
        "body-md": {
          "fontFamily": "Inter",
          "fontSize": "15px",
          "fontWeight": "400",
          "lineHeight": "1.5"
        },
        "label-badge": {
          "fontFamily": "Inter",
          "fontSize": "12px",
          "fontWeight": "600",
          "letterSpacing": "0.05em"
        }
      }
    }
  }
}
```

---

### 3.2 Design System 2: Editorial Earth Journal (Prototype 2 - Alternative Direction)

- **Aesthetic**: Immersive, deep contrast, editorial conservation journalism, dark forest glassmorphism, bioluminescent accents, refined serif titles with technical sans body.
- **Color Tokens**:
  - `Primary / Deep Forest`: `#0F2410` (Dark background mode)
  - `Secondary / Bioluminescent Lime`: `#22C55E` / `#4ADE80` (High contrast scroll highlights)
  - `Tertiary / Raw Earth Terra`: `#C27803` (Earth upliftment accent)
  - `Background Dark`: `#0A160B`
  - `Surface Dark Glass`: `rgba(22, 53, 21, 0.45)` with `backdrop-filter: blur(16px)`
  - `Text Light`: `#F3F4F6`
  - `Outline`: `rgba(255, 255, 255, 0.12)`
- **Typography Tokens**:
  - `Headline Font`: `SOURCE_SERIF_4`
  - `Body Font`: `INTER`
  - `Label Font`: `SPACE_GROTESK`
- **Shape & Elevation**:
  - `Roundness`: `ROUND_EIGHT`
  - `Elevation`: High contrast glass border with ambient backlight.

#### Programmatic `create_design_system` Payload for Prototype 2:
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
      "roundness": "ROUND_EIGHT",
      "spacing": {
        "gutter": "32px",
        "margin-desktop": "80px",
        "stack-sm": "8px",
        "stack-md": "16px",
        "stack-lg": "40px",
        "stack-xl": "80px"
      },
      "typography": {
        "display-hero": {
          "fontFamily": "Source Serif 4",
          "fontSize": "64px",
          "fontWeight": "700",
          "lineHeight": "1.05"
        },
        "heading-section": {
          "fontFamily": "Source Serif 4",
          "fontSize": "40px",
          "fontWeight": "600",
          "lineHeight": "1.2"
        },
        "body-lg": {
          "fontFamily": "Inter",
          "fontSize": "18px",
          "fontWeight": "300",
          "lineHeight": "1.7"
        },
        "label-badge": {
          "fontFamily": "Space Grotesk",
          "fontSize": "13px",
          "fontWeight": "600",
          "letterSpacing": "0.08em"
        }
      }
    }
  }
}
```

---

## 4. End-to-End Step-by-Step Execution Plan

Below is the verified, executable sequence for the builder/orchestrator agent to generate and export both mockups.

```
┌────────────────────────────────────────────────────────────────────────┐
│ Phase 1: Project Provisioning                                          │
│   • call create_project {"title": "Avani Landing Page - Prototype 1"}   │
│   • call create_project {"title": "Avani Landing Page - Prototype 2"}   │
│   • Extract projectId1 and projectId2                                  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│ Phase 2: Design System Configuration                                   │
│   • Option A: Call create_design_system with token theme               │
│   • Option B: Call upload_design_md with base64 DESIGN.md, then         │
│     call create_design_system_from_design_md                           │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│ Phase 3: Screen Generation                                             │
│   • call generate_screen_from_text for Prototype 1                      │
│     (deviceType: "DESKTOP", modelId: "GEMINI_3_8_FLASH")               │
│   • call generate_screen_from_text for Prototype 2                      │
│     (deviceType: "DESKTOP", modelId: "GEMINI_3_8_FLASH")               │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│ Phase 4: Status Polling & Screen Metadata Retrieval                    │
│   • If synchronous returns screen, proceed to Phase 5                  │
│   • If timeout, poll list_screens / get_screen (interval: 30s)         │
│   • Extract htmlCode.name and screenshot.name                          │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────────────────────┐
│ Phase 5: Local File Extraction & Verification                          │
│   • call download_file {"name": screen.htmlCode.name}                  │
│     Save output to: mockups/prototype_1_stitch.html                    │
│   • call download_file {"name": screen.screenshot.name}                │
│     Decode base64 image and save to: mockups/prototype_1_stitch.png    │
│   • Repeat for Prototype 2                                             │
│   • Run visual verification on local mockups                           │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Authoritative Prompts for `generate_screen_from_text`

To guarantee that Stitch MCP generates production-complete landing pages that fulfill all four requirements (R1–R4) from `ORIGINAL_REQUEST.md`, the prompts must explicitly embed all Avani organizational facts, team breakdowns, event summaries, climate action points, and external links.

### 5.1 Prototype 1 Prompt (Canva Mood Board Idea 5 - "Blume / Glow Garden")

```text
Design a complete, responsive modern desktop landing page for "Avani", a youth-led environmental and climate action organization based in Bangalore, India. 

Visual Style (Canva Mood Board Idea 5 - Blume / Glow Garden / We Growe):
- Aesthetic: Fresh, organic, tactile, playful, youth-centric environmentalism.
- Color Palette: Deep forest green (#163515) for logo/accents, soft soothing tea green (#D0E8C5, #C7E9C0), warm sunlit ochre (#F59E0B), pure white card surfaces (#FFFFFF), and natural organic paper background (#F9FAF7).
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

### 5.2 Prototype 2 Prompt (Alternative Direction - "Editorial Earth Journal & Kinetic Scroll")

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

## 6. Local Artifact Storage & File Download Mechanics

When screens are generated in Stitch, the builder agent will use `download_file` to export the deliverables into local project directories.

### 6.1 Designated Local Storage Paths

```
/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/
└── mockups/
    ├── prototype_1/
    │   ├── mockup.html         <-- Standalone Tailwind HTML extracted via download_file
    │   ├── mockup.png          <-- High-resolution PNG decoded from base64 image
    │   └── metadata.json       <-- Stitch screen ID, dimensions, creation timestamp
    └── prototype_2/
        ├── mockup.html         <-- Standalone Tailwind HTML extracted via download_file
        ├── mockup.png          <-- High-resolution PNG decoded from base64 image
        └── metadata.json       <-- Stitch screen ID, dimensions, creation timestamp
```

### 6.2 Python Extraction Utility Script

The following self-contained script extracts and decodes Stitch MCP file responses into the local project structure:

```python
import os
import json
import base64

def save_stitch_screen(output_dir, html_content, image_b64, metadata):
    os.makedirs(output_dir, exist_ok=True)
    
    # Save HTML
    html_path = os.path.join(output_dir, "mockup.html")
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"Saved HTML to {html_path}")
    
    # Save Image
    if image_b64:
        img_path = os.path.join(output_dir, "mockup.png")
        img_bytes = base64.b64decode(image_b64)
        with open(img_path, "wb") as f:
            f.write(img_bytes)
        print(f"Saved Screenshot PNG to {img_path}")
        
    # Save Metadata
    meta_path = os.path.join(output_dir, "metadata.json")
    with open(meta_path, "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=2)
    print(f"Saved Metadata to {meta_path}")
```

---

## 7. Failure Recovery & Error Handling Protocol

1. **Tool Invocation Argument Errors (`Request contains an invalid argument`)**:
   - Verify that `projectId` is passed as a bare string (e.g. `"4044680601076201931"`), NOT `"projects/4044680601076201931"`.
   - Verify that `deviceType` matches the valid enum: `"DESKTOP"`.
2. **Generation Latency & Timeouts**:
   - The tool call may return after 2–3 minutes or experience client timeout. DO NOT issue duplicate calls to `generate_screen_from_text`.
   - Issue `list_screens` with `projectId` every 30 seconds. As soon as the new screen appears with non-empty `htmlCode.name` and `screenshot.name`, retrieve the files.
3. **Download URL Direct Access**:
   - Never use `curl` or `fetch` against `downloadUrl`. Always pass `name: "projects/.../files/..."` into `download_file`.
4. **Base64 UTF-8 Integrity for DESIGN.md**:
   - When calling `upload_design_md`, ensure `designMdBase64` is generated cleanly (e.g. `base64.b64encode(text.encode('utf-8')).decode('ascii')`) without invalid binary sequences.

---

## 8. Conclusion

Stitch MCP is verified and ready to deliver the UI design mockups for both Avani landing page prototypes. The step-by-step procedure, complete prompt texts, design token payloads, and extraction scripts detailed above provide the orchestrator and builder subagents with a deterministic, friction-free implementation blueprint.
