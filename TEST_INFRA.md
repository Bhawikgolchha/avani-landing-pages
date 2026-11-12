# E2E Test Infra: Avani Landing Pages

## Test Philosophy
- **Opaque-box, requirement-driven**: Tests derive strictly from `ORIGINAL_REQUEST.md` and user specifications, treating internal implementations as a black box.
- **Progressive testability**: Test verification mechanisms do not require features more complex than what they verify (e.g. exit codes, file existence, content contracts, static markup, and HTTP responses precede dynamic WebGL canvas rendering).
- **Methodology**: Systematic 4-tier testing combining Category-Partition, Boundary Value Analysis (BVA), Pairwise Combinatorial Testing, and Real-World User Workloads.

---

## Feature Inventory

Every feature from `PROJECT.md § Feature Inventory` is mapped below to requirement sources and test tier allocations:

| # | Feature | Source (requirement) | Tier 1 (Min) | Tier 2 (Min) | Tier 3 (Pairwise) |
|---|---------|----------------------|:------------:|:------------:|:-----------------:|
| 1 | F1: Stitch MCP P1 Mockup | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ |
| 2 | F2: Stitch MCP P2 Mockup | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ |
| 3 | F3: Stitch Mockup Local Export | ORIGINAL_REQUEST §R1 | 5 | 5 | ✓ |
| 4 | F4: Google Flow Media Generation | ORIGINAL_REQUEST §R4 | 5 | 5 | ✓ |
| 5 | F5: Brand Logo Integration | ORIGINAL_REQUEST §R3 | 5 | 5 | ✓ |
| 6 | F6: Next.js 14 Scaffolding | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ |
| 7 | F7: Shared Brand Content Module | ORIGINAL_REQUEST §R3 | 5 | 5 | ✓ |
| 8 | F8: Universal Navbar & Footer | ORIGINAL_REQUEST §R3 | 5 | 5 | ✓ |
| 9 | F9: Comparison Hub (`/`) | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ |
| 10 | F10: Prototype 1 3D Canvas | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ |
| 11 | F11: Prototype 1 Scroll Overlay | ORIGINAL_REQUEST §R2, §R3 | 5 | 5 | ✓ |
| 12 | F12: Prototype 2 3D Canvas | ORIGINAL_REQUEST §R2 | 5 | 5 | ✓ |
| 13 | F13: Prototype 2 Scroll Overlay | ORIGINAL_REQUEST §R2, §R3 | 5 | 5 | ✓ |
| 14 | F14: Content & Link Verification | ORIGINAL_REQUEST §R3 | 5 | 5 | ✓ |
| 15 | F15: Automated Build & Lint Gate | ORIGINAL_REQUEST §Criteria | 5 | 5 | ✓ |
| 16 | F16: Browser Visual Inspection | ORIGINAL_REQUEST §Criteria | 5 | 5 | ✓ |

---

## Test Architecture

### 1. Test Runner & Harness
- **Location**: `tests/e2e/runner.js`
- **Invocation**: `node tests/e2e/runner.js` (or `npm run test:e2e`)
- **Pass/Fail Semantics**: Standard POSIX exit codes:
  - Exit code `0`: 100% of tests passed across all tiers.
  - Non-zero exit code: One or more test assertion failures with detailed stack trace, failure summary, and category metrics.
- **Reporting**: Emits structured console summaries and optional JSON report at `tests/e2e/results.json`.

### 2. Directory Layout
```
tests/e2e/
├── runner.js                           # Master E2E runner executing Tiers 1-4
├── harness.js                          # Test assertion utilities & fixture loaders
├── tier1-features/
│   ├── t1_f01_stitch_p1.test.js        # F1 test cases (5 tests)
│   ├── t1_f02_stitch_p2.test.js        # F2 test cases (5 tests)
│   ├── t1_f03_mockup_export.test.js    # F3 test cases (5 tests)
│   ├── t1_f04_google_flow_media.test.js# F4 test cases (5 tests)
│   ├── t1_f05_brand_logo.test.js       # F5 test cases (5 tests)
│   ├── t1_f06_scaffolding.test.js      # F6 test cases (5 tests)
│   ├── t1_f07_content_module.test.js   # F7 test cases (5 tests)
│   ├── t1_f08_navbar_footer.test.js    # F8 test cases (5 tests)
│   ├── t1_f09_comparison_hub.test.js   # F9 test cases (5 tests)
│   ├── t1_f10_p1_3d_canvas.test.js     # F10 test cases (5 tests)
│   ├── t1_f11_p1_overlay.test.js       # F11 test cases (5 tests)
│   ├── t1_f12_p2_3d_canvas.test.js     # F12 test cases (5 tests)
│   ├── t1_f13_p2_overlay.test.js       # F13 test cases (5 tests)
│   ├── t1_f14_links_verification.test.js# F14 test cases (5 tests)
│   ├── t1_f15_build_lint.test.js       # F15 test cases (5 tests)
│   └── t1_f16_visual_inspection.test.js# F16 test cases (5 tests)
├── tier2-boundaries/
│   ├── t2_f01_f03_mockup_bounds.test.js# Boundary tests for mockups (15 tests)
│   ├── t2_f04_f05_media_bounds.test.js # Boundary tests for media & assets (10 tests)
│   ├── t2_f06_f09_route_bounds.test.js # Boundary tests for routes & scaffolding (20 tests)
│   ├── t2_f10_f13_canvas_bounds.test.js# Boundary tests for 3D canvases & scroll (20 tests)
│   └── t2_f14_f16_content_bounds.test.js# Boundary tests for links & viewports (15 tests)
├── tier3-combinations/
│   └── t3_pairwise_interactions.test.js# Pairwise cross-feature interactions (16 tests)
└── tier4-scenarios/
    └── t4_real_world_workloads.test.js # Full end-to-end user journeys (5 scenarios)
```

---

## Real-World Application Scenarios (Tier 4)

| # | Scenario | Features Exercised | Complexity |
|---|----------|--------------------|------------|
| 1 | **Prospective Student Explorer**: User lands on `/` Hub, reviews both design directions, transitions to `/prototype-1`, scrolls through all 5 sections, and verifies application form link. | F5, F7, F8, F9, F10, F11, F14 | High |
| 2 | **Climate Action Advocate**: User navigates directly to `/prototype-2`, inspects the 11 climate action tips, validates tip categories, and clicks Substack publication link. | F5, F7, F8, F12, F13, F14 | High |
| 3 | **Event Attendee & Donor**: User explores the 4 events (DPS Drive, Invictus Denim, Orphanage Drive, Waste Workshop), checks imagery, and triggers Instagram/LinkedIn links. | F4, F5, F7, F8, F11, F13, F14 | Medium |
| 4 | **Mobile Device Responsive Journey**: User accesses `/`, `/prototype-1`, and `/prototype-2` under mobile viewport (375x667), verifying no overflow, mobile navigation collapse, and readable typography. | F6, F8, F9, F11, F13, F16 | High |
| 5 | **Design & Architecture Consistency Audit**: User validates that Stitch MCP mockups, generated Google Flow media, and Next.js live pages share congruent palettes (`#163515`), logo dimensions, and verbatim organizational objectives. | F1, F2, F3, F4, F5, F7, F15, F16 | High |

---

## Coverage Thresholds
- **Tier 1 (Feature Coverage)**: ≥5 test cases per feature across all 16 features = **80 test cases**.
- **Tier 2 (Boundary & Corner Cases)**: ≥5 test cases per feature = **80 test cases**.
- **Tier 3 (Cross-Feature Combinations)**: Pairwise coverage across major feature pairs = **16 test cases**.
- **Tier 4 (Real-World Scenarios)**: High-fidelity end-to-end user journeys = **5 scenarios**.
- **Total Minimum Test Count**: **181 test cases**.
