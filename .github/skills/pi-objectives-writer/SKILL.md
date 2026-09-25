---
name: pi-objectives-writer
description: Clusters a team's planned stories into 3 to 5 outcome-focused SAFe PI Objectives, rewrites task-style drafts as outcomes (showing before and after), marks Committed vs Uncommitted, and leaves Business Value blank for Business Owners to score. Stops at a human review gate. Use at the end of PI Planning Day 1 or Day 2, or when the user says "PI objectives".
---

# PI Objectives Writer

## Steps

1. Group the stories into 3–5 themes by the outcome they deliver.
2. Write each objective in 1–2 sentences: *who benefits, what changes, and how we'll know*.
3. If draft objectives were provided, rewrite task-style ones as outcomes and show before/after.
4. Propose Committed vs Uncommitted based on confidence and dependencies.
5. Leave **Business Value** as `BO to score (1–10)`. Never fill it in.
6. Stop at the Review Gate.

## Output

| # | PI Objective | Supporting stories | Success measure | Committed? | BV (planned) |
|---|---|---|---|---|---|
| 1 | Customers can reset passwords without calling support, cutting reset tickets by 40% | S-12, S-13, S-14 | Support ticket tag "pw-reset" | Committed | BO to score |

## Guardrails

- An objective that starts with "Implement", "Build" or "Complete" is a task. Rewrite it.
- Uncommitted objectives are still planned work, not a wish list. Say so if the reviewer treats them that way.
