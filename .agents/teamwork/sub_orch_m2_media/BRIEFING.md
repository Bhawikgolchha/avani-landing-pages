# BRIEFING — 2026-11-12T08:45:00Z

## Mission
Orchestrate and execute Milestone M2: Brand Assets & Media Pipeline for Avani Landing Pages.

## 🔒 My Identity
- Archetype: teamwork_orchestrator
- Roles: orchestrator, user_liaison, human_reporter, successor
- Working directory: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages
- State folder: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/sub_orch_m2_media
- Original parent: Project Orchestrator
- Original parent conversation ID: ac7e2cdd-aed0-49d4-acd7-75a2107e2cad

## 🔒 My Workflow
- **Pattern**: Project Pattern (Sub-orchestrator)
- **Scope document**: /Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/sub_orch_m2_media/SCOPE.md
1. **Decompose**: Decompose Milestone M2 into Explorer -> Worker -> Reviewer -> Challenger -> Auditor cycle per Pattern 2B.
2. **Dispatch & Execute**:
   - Direct iteration loop (2B):
     a. Spawn 3 Explorers (Google Flow state, Asset filesystem & fallback tools, Prompt & format specifications).
     b. Spawn 1 Worker to execute logo installation and media generation (Google Flow + fallback pipeline).
     c. Spawn 2 Reviewers independently.
     d. Spawn 2 Challengers for empirical verification.
     e. Spawn 1 Forensic Auditor (`teamwork_auditor`).
     f. Gate check and completion report to parent orchestrator.
3. **On failure** (in this order): Retry -> Replace -> Skip (non-critical) -> Redistribute -> Redesign -> Escalate to parent.
4. **Succession**: At 16 spawns, write handoff.md and spawn successor.
- **Work items**:
  1. Exploration & Pipeline Design [pending]
  2. Asset Generation & Installation Execution [pending]
  3. Quality & Format Review [pending]
  4. Adversarial & Empirical Validation [pending]
  5. Forensic Integrity Audit [pending]
  6. Milestone Gate & Parent Handoff [pending]
- **Current phase**: 1 (Exploration)
- **Current focus**: Spawning 3 Explorers for Milestone M2

## 🔒 Key Constraints
- NEVER write, modify, or create source code / asset files directly — orchestrator is DISPATCH-ONLY.
- NEVER run build/test commands yourself — require workers/challengers/reviewers/auditors to do so.
- Read ORIGINAL_REQUEST.md, PROJECT.md, and explorer_tech_media/report.md before taking action.
- Always include path to ORIGINAL_REQUEST.md in every subagent dispatch prompt.
- Mandatory integrity warning in Worker dispatch.
- Binary veto on Forensic Auditor failure.
- Never reuse a subagent after it has delivered its handoff — always spawn fresh.

## Current Parent
- Conversation ID: ac7e2cdd-aed0-49d4-acd7-75a2107e2cad
- Updated: 2026-11-12T08:44:29Z

## Key Decisions Made
- Selected Project Pattern 2B (direct iteration loop for Milestone M2).
- Primary generation: Google Flow via `cli-anything-brave` on CDP port 9333.
- Resilient fallback: Native `generate_image` tool + Remotion for video loops if credits/rate limits restrict Flow.

## Team Roster
| Agent | Type | Work Item | Status | Conv ID |
|---|---|---|---|---|
| explorer_1 | teamwork_explorer | Google Flow CDP Explorer | in-progress | 2d95991b-658d-47e5-9177-f4b846e4ee13 |
| explorer_2 | teamwork_explorer | Asset Filesystem & Tooling Explorer | in-progress | c2a9eb8b-3f9b-4d36-b89a-a5e18c813ab0 |
| explorer_3 | teamwork_explorer | Prompt & Fallback Pipeline Explorer | in-progress | 63b349fc-6108-48ef-a84e-2b0c1b9203da |

## Succession Status
- Succession required: no
- Spawn count: 3 / 16
- Pending subagents: 2d95991b-658d-47e5-9177-f4b846e4ee13, c2a9eb8b-3f9b-4d36-b89a-a5e18c813ab0, 63b349fc-6108-48ef-a84e-2b0c1b9203da
- Predecessor: none
- Successor spawned: not yet spawned
- Successor generation: none
- Successor state folder: none

## Active Timers
- Heartbeat cron: 1d827cf4-fd77-4641-86cc-f87dca752d8c/task-20
- Safety timer: 1d827cf4-fd77-4641-86cc-f87dca752d8c/task-84

## Artifact Index
- `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/ORIGINAL_REQUEST.md` — User requirements
- `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/PROJECT.md` — Global architecture blueprint
- `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/explorer_tech_media/report.md` — Pre-survey technical & media report
- `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/sub_orch_m2_media/SCOPE.md` — Milestone M2 scope definition
- `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/sub_orch_m2_media/progress.md` — Heartbeat and progress checklist
- `/Users/bhavikgolchha07/teamwork_projects/avani_landing_pages/.agents/teamwork/sub_orch_m2_media/GATE_STATUS.md` — Gate verdicts
