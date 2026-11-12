# BRIEFING — 2026-11-12T08:45:00Z

## Mission
Sub-Orchestrator for Milestone M1 (Stitch MCP UI Mockups): execute Stitch project creation, design system configuration, screen generation for Prototype 1 & 2, extract local artifacts into mockups/, and verify via gate checks.

## 🔒 My Identity
- Archetype: sub_orch
- Roles: orchestrator, user_liaison, human_reporter, successor
- Working directory: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages
- State folder: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/sub_orch_m1_stitch
- Original parent: Project Orchestrator
- Original parent conversation ID: ac7e2cdd-aed0-49d4-acd7-75a2107e2cad

## 🔒 My Workflow
- **Pattern**: Project Pattern (Sub-orchestrator, Level: Milestone M1)
- **Scope document**: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/sub_orch_m1_stitch/SCOPE.md
1. **Decompose**: Milestone M1 scoped to direct iteration loop (Pattern 2B).
2. **Dispatch & Execute**: Direct (iteration loop)
   - Step a: 3 Explorers (Stitch API parameters, brand content coverage, output export & verification)
   - Step b: 1 Worker (Stitch MCP tool invocations, project creation, generation, downloading, and local file writing)
   - Step c: 2 Reviewers (HTML validity, brand fidelity, responsiveness, link verification)
   - Step d: 2 Challengers (empirical asset inspection, visual check, edge condition stress-testing)
   - Step e: 1 Forensic Auditor (integrity verification, static/runtime anti-cheat verification)
   - Step f: Gate evaluation in GATE_STATUS.md
3. **On failure** (in this order):
   - Retry: nudge stuck agent or re-send task
   - Replace: spawn fresh agent with partial progress
   - Skip: proceed without (only if non-critical)
   - Redistribute: split stuck agent's remaining work
   - Redesign: re-partition decomposition
   - Escalate: report to parent (sub-orchestrators only, last resort)
4. **Succession**: At 16 spawns, write handoff.md, spawn successor.
- **Work items**:
  1. Milestone M1: Stitch MCP UI Mockups [in-progress]
- **Current phase**: 2B Iteration 1
- **Current focus**: Step a - Explorer dispatch

## 🔒 Key Constraints
- Never write, modify, or create source code files directly.
- Never run build/test commands yourself — require workers to do so.
- Never investigate or explore the problem at the code level — dispatch Explorers for technical investigation.
- File-editing tools ONLY for metadata/state files (.md) in your .agents/teamwork/ folder.
- DO NOT CHEAT: zero tolerance for fake/facade outputs.
- Binary veto by Forensic Auditor: INTEGRITY VIOLATION means unconditional failure.
- Never reuse a subagent after it has delivered its handoff.

## Current Parent
- Conversation ID: ac7e2cdd-aed0-49d4-acd7-75a2107e2cad
- Updated: not yet

## Key Decisions Made
- Decomposed M1 into single Iteration Loop 2B with 3 Explorers, 1 Worker, 2 Reviewers, 2 Challengers, and 1 Auditor.
- Follow authoritative tool signatures and prompts established in `explorer_stitch/report.md`.

## Team Roster
| Agent | Type | Work Item | Status | Conv ID |
|---|---|---|---|---|
| explorer_m1_1 | teamwork_explorer | Stitch Toolchain & Invocation Path | completed | 51b2754b-1baf-4f3d-9e5c-8cf4d041aa5e |
| explorer_m1_2 | teamwork_explorer | Avani Brand Content Coverage & Matrix | completed | cc375002-0f43-43bf-9815-6422464d71f9 |
| explorer_m1_3 | teamwork_explorer | Output Artifact Standards & Verification | completed | 0c536640-2d68-4398-a250-d0d839d38af2 |
| worker_m1_stitch | teamwork_worker | Generate & Export Stitch Mockups | failed (stream error) | a0d0446a-85c3-479d-95f6-0d1f6594ad8f |

## Succession Status
- Succession required: no
- Spawn count: 4 / 16
- Pending subagents: none
- Predecessor: none
- Successor spawned: not yet spawned
- Successor generation: none
- Successor state folder: none

## Active Timers
- Heartbeat cron: ceb60abf-eca0-4fbd-9eea-f06775212a62/task-22
- Safety timer: none
- On succession: kill all timers before spawning successor
- On context truncation: handle timers as step 4 of the State Recovery section of your prompt says

## Artifact Index
- SCOPE.md — Milestone M1 scope definition
- DISPATCH.md — Parent dispatch log
- progress.md — Sub-orchestrator heartbeat and checklist
- GATE_STATUS.md — Gate verdicts per iteration
