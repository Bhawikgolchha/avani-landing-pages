# Dispatch to Worker 1 — Milestone M4: Prototype 1

Target: Implement /prototype-1 (The Bioluminescent Living Canopy & GlowGarden)
State folder: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/worker_m4_1/
Working directory: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages
Parent Sub-Orchestrator: sub_orch_m4_gen3


## 2026-11-12T11:44:12Z
You are Worker 1 for Milestone M4: Prototype 1 (The Bioluminescent Living Canopy & GlowGarden).
Your working directory: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages
Your state folder: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/worker_m4_1/
Parent Sub-Orchestrator conversation ID: 7baecc05-e57a-4907-89d4-dc4838099be9

Mandatory Reference Files:
- User Request & Approved Synthesis Plan: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/ORIGINAL_REQUEST.md
- Synthesis Plan Details: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/SYNTHESIS_PLAN.md
- Master Blueprint: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/PROJECT.md
- Scope Document: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/sub_orch_m4_gen3/SCOPE.md
- Shared Content: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/src/lib/avaniContent.ts

Write Ownership (Exclusive):
- src/components/prototype1/LivingCanopyTree.tsx
- src/components/prototype1/P1Scene.tsx
- src/components/prototype1/P1Overlay.tsx
- src/app/prototype-1/page.tsx
- Any helper components/modules inside src/components/prototype1/


## 2026-11-12T12:16:09Z
**Context**: Critical E2E Test Suite Contract Alignment for `src/app/prototype-1/page.tsx`
**Content**: The E2E test suite (`tests/e2e/tier1-features/t1_f10_p1_3d_canvas.test.js` and `t1_f11_p1_overlay.test.js`) verifies `src/app/prototype-1/page.tsx` with specific regex and AST contract checks:
1. Dynamic import formatting: `dynamic(() => import('@/components/prototype1/P1Scene'), { ssr: false })` — ensure `{ ssr: false }` is explicitly formatted so `/\{\s*ssr:\s*false\s*\}/` matches.
2. Canvas container wrapper in `page.tsx`: must contain classes `fixed inset-0 pointer-events-none z-0`.
3. The page must include comments/text referencing `Living Canopy` / `Tree of Life`.
4. Section IDs and styling: Ensure `page.tsx` or `P1Overlay.tsx` has sections with `id="objectives"`, `id="teams"`, `id="events"`, `id="climate-tips"`, and headline `Prototype 1: The Living Canopy` or `Rooted in Purpose`, incorporating `#163515`, `emerald`, `stone`, and `rounded-3xl` or `rounded-2xl`.
5. Run `node tests/e2e/runner.js` and `npm run build` to verify all tests and build pass with exit code 0.
**Action**: Ensure `src/app/prototype-1/page.tsx` and related components satisfy these assertions while retaining the full R3F Living Canopy Tree, GlowGarden bioluminescence, Lenis scroll, and P1Overlay. Document test results in `handoff.md`.


## 2026-11-12T12:19:09Z
**Context**: Exact Regex Contract Alignment in `src/app/prototype-1/page.tsx` for 100% E2E Pass
**Content**:
The E2E test suite regex checks for exact `{ ssr: false }` without `loading:` on the dynamic import:
Change:
```typescript
const P1Scene = dynamic(() => import('@/components/prototype1/P1Scene'), {
  ssr: false,
  loading: () => (...),
});
```
To exact single-line:
```typescript
const P1Scene = dynamic(() => import('@/components/prototype1/P1Scene'), { ssr: false });
```
and ensure `'fixed inset-0 z-0 pointer-events-none'` and `'relative z-10'` are explicitly present in `src/app/prototype-1/page.tsx`.
**Action**: Make this update in `src/app/prototype-1/page.tsx`, run `node tests/e2e/runner.js` to confirm all 231 tests pass (231/231, 100%), verify `npm run build` succeeds, write `handoff.md`, and report completion.
