---
name: definition-of-ready
description: Checks one story or a backlog batch against the team's Definition of Ready, scoring 1–3 per criterion (target 12/15 or better), and returns a READY / NOT READY list with the specific gap for each story. Stops at a human review gate, and only the reviewer can mark a story Ready. Use before sprint or PI planning, or when the user says "DoR", "ready check" or "pi-dor".
---

# Definition of Ready Check

## Default criteria (override with the team's own DoR if provided)

| Criterion | 3 | 2 | 1 |
|---|---|---|---|
| Story format | As a / I want / So that, persona named | Partial | Missing |
| Acceptance criteria | ≥ 3 testable Gherkin scenarios | 1–2 or vague | None |
| Estimated | Team-estimated, ≤ 8 pts | AI-suggested only | Not estimated or > 8 |
| Dependencies | Identified and agreed with the other team | Identified, not agreed | Unknown |
| Fits a sprint | Yes, with room | Tight | No |

**Ready** = ≥ 12 / 15 and no criterion scored 1.

## Steps

1. Load the stories (pasted, file, or JQL via Atlassian MCP such as
   `project = X AND sprint is EMPTY AND status = Backlog`).
2. Score each story. Quote the evidence for any score below 3.
3. For each gap, name the fixing skill (`acceptance-criteria-drafter`, `story-splitter`, `invest-checker`, `dependency-mapper`).
4. Stop at the Review Gate. Say "AI assessment: Ready". Never "Ready" alone: the label belongs to the team.

## Output

| Key | Story | Format | AC | Est. | Deps | Fit | Total | AI assessment | Gap → skill |
|---|---|---|---|---|---|---|---|---|---|

Summary line: `Reviewed N · likely ready N · needs work N · blocked N`.

## Guardrails

- AI-suggested estimates score 2 at most. Only a team estimate earns 3.
- After approval, offer to add a `dor-reviewed` label in Jira. Wait for an explicit yes.
