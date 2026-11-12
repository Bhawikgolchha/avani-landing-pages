# BRIEFING — 2026-11-12T12:28:00Z

## Mission
Adversarially challenge and stress-test M2 background video loops (bitrate/GOP, poster CLS/fallbacks, audio invariants).

## 🔒 My Identity
- Archetype: challenger
- Roles: critic, specialist
- Working directory: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages
- State folder: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/challenger_m2_videos_2
- Original parent: ebb1a02a-9cc8-4d94-bea5-87ee2aea86b0
- Milestone: M2 Expansion: Background Video Loops
- Instance: 2 of 2

## 🔒 Key Constraints
- Review-only — do NOT modify implementation code
- Run verification tests yourself, do not trust claims
- Write report to .agents/teamwork/challenger_m2_videos_2/handoff.md
- Send completion message via send_message to parent ebb1a02a-9cc8-4d94-bea5-87ee2aea86b0

## Current Parent
- Conversation ID: ebb1a02a-9cc8-4d94-bea5-87ee2aea86b0
- Updated: not yet

## Review Scope
- **Files to review**: public/assets/videos/canopy_bioluminescent_loop.mp4, public/assets/videos/biosphere_telemetry_loop.mp4, poster fallback images, and integration code
- **Interface contracts**: SCOPE.md, PROJECT.md, ORIGINAL_REQUEST.md
- **Review criteria**: Bitrate & GOP analysis, WebP fallback integrity & CLS prevention, Audio track compliance with autoplay policies

## Key Decisions Made
- Initiated empirical challenge setup; will inspect files using ffprobe/mediainfo/custom python scripts.

## Artifact Index
- DISPATCH.md — Parent dispatch instructions
- BRIEFING.md — Situational awareness
- progress.md — Heartbeat and execution step tracker

## Attack Surface
- **Hypotheses tested**: TBD
- **Vulnerabilities found**: TBD
- **Untested angles**: Bitrate budget, GOP size, poster dimensions, audio streams, autoplay failure degradation

## Loaded Skills
- None specified in dispatch
