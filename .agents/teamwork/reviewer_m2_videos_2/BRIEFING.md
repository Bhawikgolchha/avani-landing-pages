# BRIEFING — 2026-11-12T12:26:00Z

## Mission
Independently review and adversarial stress-test M2 background video loops, poster fallbacks, performance, and integrity.

## 🔒 My Identity
- Archetype: reviewer_critic
- Roles: reviewer, critic
- Working directory: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages
- State folder: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/reviewer_m2_videos_2/
- Original parent: ebb1a02a-9cc8-4d94-bea5-87ee2aea86b0
- Milestone: M2 Expansion: Background Video Loops
- Instance: 2 of 2

## 🔒 Key Constraints
- Review-only — do NOT modify implementation code
- Check integrity violations: hardcoded test results, dummy implementations, shortcuts, fabricated verification, self-certifying.
- If ANY integrity violation found, verdict MUST be REQUEST_CHANGES with Critical finding tagged as INTEGRITY VIOLATION.
- Do NOT approve work that cheats, regardless of test scores.
- Evidence-based findings; do not write "feels wrong".
- Handoff report in state folder with 5 sections.

## Current Parent
- Conversation ID: ebb1a02a-9cc8-4d94-bea5-87ee2aea86b0
- Updated: 2026-11-12T12:26:00Z

## Review Scope
- **Files to review**:
  - `public/assets/videos/canopy_bioluminescent_loop.mp4`
  - `public/assets/videos/biosphere_telemetry_loop.mp4`
  - Poster fallbacks in `public/assets/videos/` and `public/assets/images/`
  - Associated tests and component integration
- **Interface contracts**: PROJECT.md, SCOPE.md, ORIGINAL_REQUEST.md, worker handoff.md
- **Review criteria**: existence, non-zero size < 10MB, h264 codec, 1920x1080 16:9, 4-8s duration, visual aesthetic fit, test & build pass, graceful fallbacks, reduced motion compliance.

## Review Checklist
- **Items reviewed**: Initializing review
- **Verdict**: pending
- **Unverified claims**: worker claims about file sizes, codec, resolution, looping, test coverage, and visual fidelity.

## Attack Surface
- **Hypotheses tested**: None yet
- **Vulnerabilities found**: None yet
- **Untested angles**: Video codec compatibility, mobile autoplay / battery / data saver, reduced-motion preferences, poster image fallback mismatch, file corruption, browser decoding performance.

## Key Decisions Made
- Initialized review environment and briefing.

## Artifact Index
- handoff.md — final review report and adversarial critique
- progress.md — liveness heartbeat
- DISPATCH.md — dispatch records
