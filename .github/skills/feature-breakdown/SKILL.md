---
name: feature-breakdown
description: Decomposes a SAFe Feature into sprint-sized user stories, enablers and spikes with draft acceptance criteria, Fibonacci estimates, suggested sprint and dependencies, optionally using @workspace to ground estimates in the codebase. Stops at a human review gate. Use in pre-planning or team breakouts, or when the user says "break this feature into stories" or "pi-story".
---

# Feature Breakdown

## Inputs

- Feature title, description, benefit hypothesis, feature-level ACs.
- Team capacity per sprint and number of sprints in the PI (optional).
- `@workspace` (optional) to identify files and modules likely to change.

## Steps

1. Restate the benefit hypothesis. If missing, draft one and tag `[ASSUMPTION]`.
2. Build a thin **story map**: user journey steps across the top, stories under each step.
3. Draft stories. Each gets a title (imperative verb), user story, 2–3 draft ACs, points (1–8), confidence, and a type: `Story`, `Enabler` or `Spike`.
4. Suggest sprint placement: walking skeleton and enablers in Sprint 1–2, enhancements later, nothing in the IP sprint.
5. List dependencies (other stories, other teams, external).
6. Compare total points with capacity. If the total exceeds 85% of capacity, flag what to cut.
7. Stop at the Review Gate. Recommend running `invest-checker` on the approved set.

## Output

| # | Type | Title | Pts | Conf. | Sprint | Depends on |
|---|---|---|---|---|---|---|

Then story details, the story map table (`Journey step | Sprint 1 | Sprint 2+ | Gaps`), and the capacity check.

## Guardrails

- No story over 8 points. Anything bigger goes to `story-splitter` before review.
- Codebase-aware estimates list the files they were based on, so the team can check them.
