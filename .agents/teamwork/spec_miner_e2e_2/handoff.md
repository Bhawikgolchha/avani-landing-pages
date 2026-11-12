# Handoff Report: E2E Test Specifications (F9–F16, Tier 3 Pairwise, Tier 4 Scenarios)

**Agent:** spec_miner_e2e_2  
**Date:** 2026-11-12T08:59:00Z  
**Parent Orchestrator:** `83cfb165-d24d-4c0a-864a-f5ee948de313`  
**State Folder:** `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/spec_miner_e2e_2`  
**Delivered Artifact:** `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/spec_miner_e2e_2/spec_f09_f16_and_scenarios.md`  

---

## 1. Observation
- `ORIGINAL_REQUEST.md` (lines 27–63) defines four core requirements (R1 Stitch MCP mockups, R2 Two 3D scroll landing page prototypes, R3 Brand identity/content/links, R4 Media generation via Google Flow) and acceptance criteria including local builds, 3D scroll effects, brand logo, external links, verbatim copy, and build/visual verification.
- `PROJECT.md` (lines 24–47) enumerates 16 features, mapping:
  - F9: Comparison Hub (`/`)
  - F10: Prototype 1 3D Canvas (Living Canopy tree, procedural wind, sunbeams, floating spores)
  - F11: Prototype 1 Scroll Overlay (5-stage GSAP scrubbed journey with tea-green tactile cards)
  - F12: Prototype 2 3D Canvas (10,000-particle holographic Earth globe with telemetry rings)
  - F13: Prototype 2 Scroll Overlay (Editorial dark glassmorphic HUD overlay)
  - F14: Content & Link Verification (7 external links, 5 objectives, 5 teams, 4 events, 11 tips)
  - F15: Automated Build & Lint Gate (`npm run build`, `npm run lint` exit code 0)
  - F16: Browser Visual Inspection (3D scroll animation, responsive layout, visual fidelity)
- `TEST_INFRA.md` (lines 10–98) establishes the opaque-box test architecture, requiring >=5 Tier 1 tests and >=5 Tier 2 tests per feature, 16 Tier 3 pairwise interaction tests, and 5 Tier 4 real-world workload scenarios.
- `explorer_tech_media/report.md` (lines 388–438) provides verified verbatim copy and external URLs:
  - Google Form: `https://docs.google.com/forms/d/e/1FAIpQLSd_7uxm79Ci-gyoTaE80A_NKt2KMZ1ueS48v6hMgKBVrmZzQA/viewform?usp=dialog`
  - LinkedIn: `https://www.linkedin.com/company/avaniyocc/`
  - Substack: `https://open.substack.com/pub/avaniyocc?r=5wu68m&utm_medium=ios`
  - Substack notes: `p-216575497`, `p-223896247`, `p-217629092`
  - Instagram: `https://www.instagram.com/avani_yocc?cplk=MXQ2amNodzFmbHFpcA==`
  - Contact: `avaniyocc@gmail.com`, `+91 8050931769`
  - Verbatim 5 objectives, 5 teams, 4 events, 11 climate tips.
- The delivered artifact `.agents/teamwork/spec_miner_e2e_2/spec_f09_f16_and_scenarios.md` was generated and verified at 107,098 bytes, containing all 101 fully articulated test specifications.

---

## 2. Logic Chain
1. *From Requirement to Test Decomposition*: Each assigned feature (F9 through F16) was broken down using Category-Partition and Boundary Value Analysis into 5 Tier 1 functional tests (verifying baseline execution, DOM presence, HTTP status, and user interactions) and 5 Tier 2 boundary tests (handling viewport extremes, context losses, scroll velocity, accessibility, and malformed inputs). This produced 80 feature-specific tests.
2. *From System Interdependence to Pairwise Matrix*: Major feature pairs (Hub × P1 Canvas, Hub × P2 Canvas, P1 Canvas × P1 Overlay, P2 Canvas × P2 Overlay, Navbar × Hub, Navbar × P1, Navbar × P2, Logo × Navbar, Flow Media × P1, Flow Media × P2, Content × Links, Content × P1, Content × P2, P1 Canvas × P2 Canvas, Overlay × Form Link, Build × Visual Inspection) were synthesized into 16 Tier 3 Pairwise Combinatorial test cases.
3. *From Stakeholder Personas to End-to-End Scenarios*: 5 high-fidelity Tier 4 scenarios were formulated representing distinct real-world journeys:
   - Scenario 1: Prospective Student Volunteer Explorer (Hub -> P1 -> Teams -> Application Form)
   - Scenario 2: Climate Action Advocate & Policy Researcher (Direct P2 -> 11 Tips -> Substack notes)
   - Scenario 3: Community Partner & Event Sponsor (P1 & P2 Events -> Social channels & Contact)
   - Scenario 4: Mobile Smartphone User Journey (375x667 viewport, touch gestures, drawer navigation)
   - Scenario 5: Cross-Prototype Brand & Architectural Consistency Audit (Asset integrity, verbatim parity, build gate)
4. *Executable Precision*: Every single test case includes a unique Test ID, detailed description, input/target artifact, expected output, and executable assertion logic with code snippets suitable for direct integration into `tests/e2e/runner.js` and sub-suites.

---

## 3. Caveats
- Tests assume a running local dev/production server at `http://localhost:3000` during live HTTP and browser execution.
- WebGL pixel sampling assertions (`readPixels`) require an environment with WebGL capability (e.g. Chrome with hardware acceleration or SwiftShader in headless mode). Fallback DOM checks are provided.
- No caveats regarding completeness: all 101 tests across F9-F16, Tier 3, and Tier 4 are fully specified.

---

## 4. Conclusion
The specification mining phase for Features F9 through F16, Tier 3 Pairwise Combinations, and Tier 4 Real-World Application Scenarios is complete. The delivered document `spec_f09_f16_and_scenarios.md` provides an exhaustive, unambiguous blueprint for test authors to implement the test suites in `tests/e2e/tier1-features/`, `tests/e2e/tier2-boundaries/`, `tests/e2e/tier3-combinations/`, and `tests/e2e/tier4-scenarios/`.

---

## 5. Verification Method
1. Inspect the generated specification:
   ```bash
   ls -lh /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/spec_miner_e2e_2/spec_f09_f16_and_scenarios.md
   ```
2. Verify test case count:
   ```bash
   grep -E '##### `(T1_|T2_|T3_|T4_)' /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/spec_miner_e2e_2/spec_f09_f16_and_scenarios.md | wc -l
   ```
   *Expected count: 101 test cases (80 Tier 1/2 tests + 16 Tier 3 tests + 5 Tier 4 scenarios).*
3. Invalidation conditions: Any missing test ID, missing assertion logic snippet, or discrepancy in the 7 external links / verbatim copy invalidates this specification.
