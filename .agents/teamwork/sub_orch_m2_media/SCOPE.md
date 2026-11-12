# Scope: Milestone M2 — Brand Assets & Media Pipeline

## Architecture
Milestone M2 establishes the complete static visual and motion asset pipeline for the Avani Interactive 3D Scroll Landing Pages. All assets are located in `public/assets/` to be served statically by Next.js and referenced directly by Prototype 1, Prototype 2, and the `/` Comparison Hub.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 4 | F4: Google Flow Media Generation | Generate custom hero, event, infographic, and video media via Google Flow / native fallback | M2 | R4, §4.4 |
| 5 | F5: Brand Logo Integration | Copy official Avani logo from brain user upload to `public/assets/branding/logo.jpg` | M2 | R3 |

## Required Assets
| Asset ID | File Path | Media Type | Purpose | Source / Generation Method |
|---|---|---|---|---|
| A1 | `public/assets/branding/logo.jpg` | Image (JPEG) | Official Brand Logo | Copy from `/Users/bhavikgolchha07/.gemini/antigravity/brain/8242fb67-1ac7-4dab-961f-f9946e0b5bf7/.user_uploaded/media_1794462993310_400d91e2.jpg` |
| A2 | `public/assets/images/hero_nature_canopy.webp` | Image (16:9) | Prototype 1 Hero Background | Google Flow or `generate_image` fallback |
| A3 | `public/assets/images/hero_ecotech_globe.webp` | Image (16:9) | Prototype 2 Hero Background | Google Flow or `generate_image` fallback |
| A4 | `public/assets/images/event_dps_drive.webp` | Image (4:3) | DPS Donation Drive Card | Google Flow or `generate_image` fallback |
| A5 | `public/assets/images/event_invictus_denim.webp` | Image (4:3) | Invictus Denim Stall Card | Google Flow or `generate_image` fallback |
| A6 | `public/assets/images/event_orphanage_aarogi.webp` | Image (4:3) | Aarogi Orphanage Drive Card | Google Flow or `generate_image` fallback |
| A7 | `public/assets/images/event_waste_workshop.webp` | Image (4:3) | Beyond the Waste Workshop Card | Google Flow or `generate_image` fallback |
| A8 | `public/assets/images/climate_tips_infographic.webp` | Image (16:9) | 11 Climate Actions Infographic | Google Flow or `generate_image` fallback |
| A9 | `public/assets/videos/canopy_ambient_loop.mp4` | Video (16:9, ~6s) | Ambient Canopy Motion Loop | Google Flow or Remotion motion loop |

## Milestones & Iteration Plan
| Step | Task | Assigned To | Status |
|---|---|---|---|
| M2.1 | Exploration & Readiness Assessment | 3 Explorers | IN_PROGRESS |
| M2.2 | Asset Generation & Installation | 1 Worker | PLANNED |
| M2.3 | Independent Quality & Visual Review | 2 Reviewers | PLANNED |
| M2.4 | Adversarial & Empirical Validation | 2 Challengers | PLANNED |
| M2.5 | Forensic Integrity Verification | 1 Auditor | PLANNED |
| M2.6 | Milestone Gate & Orchestrator Handoff | Sub-Orchestrator | PLANNED |

## Interface Contracts
- All image files must be valid WebP or JPEG format with dimensions matching their aspect ratios (16:9 ≥ 1280x720, 4:3 ≥ 800x600).
- `public/assets/branding/logo.jpg` must match the uploaded official logo binary.
- All assets must have non-zero file sizes and genuine image encoding.
- The video asset must be an H.264/MP4 valid video stream if generated.
