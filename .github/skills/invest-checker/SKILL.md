---
name: invest-checker
description: Scores a user story, or a batch of stories, against the six INVEST criteria (Independent, Negotiable, Valuable, Estimable, Small, Testable) with evidence quoted from the story, gives a pass / needs-work / fail verdict and a concrete fix per failing letter, then stops at a human review gate. Use before PI Planning, during refinement, or when the user says "INVEST", "is this story ready", or "check this story".
---

# INVEST Checker

A scored, evidence-based INVEST review. Each score must quote or point to the part of
the story that justifies it, so the reviewer can disagree with a specific line.

## Inputs

- One story, or a list of stories (table, CSV, Jira JQL result).
- Optional: team capacity per sprint (sharpens the **Small** check), known dependencies.

## Scoring rubric (0–2 per letter, 12 max)

| Letter | 2: Pass | 1: Needs work | 0: Fail |
|---|---|---|---|
| **I**ndependent | Can ship in any order | Soft dependency (same team, same sprint) | Blocked by another team or unfinished story |
| **N**egotiable | Describes the outcome, leaves the how open | Some solution detail baked in | Reads like a spec or task list |
| **V**aluable | Named persona and a clear benefit | Benefit implied | No user or business value stated (pure tech task) |
| **E**stimable | Team could size it now | Unknowns would widen the range | Too vague or too novel to size, so spike |
| **S**mall | ≤ 5 pts and fits a sprint | 8 pts | > 8 pts or spans sprints |
| **T**estable | ≥ 3 observable ACs | ACs exist but are vague | No ACs |

**Verdict:** 11–12 **Pass** · 8–10 **Needs work** · ≤ 7 or any 0 **Fail**

## Steps

1. Read the story. If it's in Jira and the MCP server is connected, also read issue links for the **I** check.
2. Score each letter with the rubric. For each score write **Evidence** (a quote or "missing") and, for scores under 2, a **Fix**.
3. Point to the skill that fixes it:
   - T low: `acceptance-criteria-drafter`
   - S or E low: `story-splitter` or `spike-writer`
   - I low: `dependency-mapper`
4. For batches, produce the summary table first, detail after, worst stories first.
5. Stop at the Review Gate. The reviewer can overrule any score: record their score and reason.

## Output format

**Single story**

| Letter | Score | Evidence | Fix |
|---|---|---|---|
| I | 1 | "after the payments API change ships" | Confirm Team Orion's delivery sprint, or stub the API |

**Score: 9 / 12, Needs work** · Confidence: Medium

**Batch**

| Story | I | N | V | E | S | T | Total | Verdict | Next skill |
|---|---|---|---|---|---|---|---|---|---|

## Guardrails

- Don't round up. A story with no ACs gets T = 0 even if everything else is perfect.
- Technical stories aren't automatically V = 0: if they enable a named feature, score 1 and suggest re-framing as an Enabler.
- Never change the story yourself here. This skill only assesses.
