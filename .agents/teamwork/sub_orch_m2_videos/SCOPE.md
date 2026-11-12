# Scope: M2 Expansion — Background Video Loops

## Objective
Generate and integrate background video loops in `public/assets/videos/` with WebP poster fallbacks and mobile `playsInline` attributes.

## Deliverables
1. `public/assets/videos/canopy_bioluminescent_loop.mp4` (P1 ambient background loop: glowing flora, drifting light motes, seamless organic loop)
2. `public/assets/videos/biosphere_telemetry_loop.mp4` (P2 ambient background loop: 3D holographic earth/cyber-particle telemetry loop)
3. WebP poster fallbacks (`hero_nature_canopy.webp` and `hero_ecotech_globe.webp`)
4. Verification: valid MP4 container, H.264/AAC or silent, under 10MB each, fast browser decoding.

## Pipeline
- Google Flow via `cli-anything-brave` on CDP port 9333 (`https://flow.google.com/u/2/project/24c0dc82-1ebf-44b1-80e8-038e66c9b6bc`)
- Fallback/encoding: ffmpeg or canvas-based procedural animation exporter if browser session is throttled.

## Verification Gate
- Verify both files exist, non-zero, valid MP4 headers.
- Reviewers (2), Challengers (2), Auditor (1).
- Record GATE_STATUS.md.
