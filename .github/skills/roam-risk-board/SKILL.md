---
name: roam-risk-board
description: Turns a raw list of PI risks, or a draft PI plan, into a ROAM board (Resolved, Owned, Accepted, Mitigated), restating each risk as IF/THEN, rating likelihood × impact, and proposing an owner and mitigation. Stops at a human review gate because ROAM classification happens in the room. Use on PI Planning Day 2 or when the user says "ROAM" or "risks".
---

# ROAM Risk Board

## Steps

1. Restate each risk as `IF <cause> THEN <effect on PI objective>`.
2. Rate likelihood and impact (1–3 each). Score = L × I.
3. **Propose** a ROAM category with a one-line reason. Category, owner and mitigation are proposals until the ART agrees.
4. For Owned or Mitigated risks, draft the mitigation as a story that can go on the backlog.
5. Stop at the Review Gate, highest score first.

## Output

| # | Risk (IF/THEN) | L | I | Score | Proposed ROAM | Proposed owner | Mitigation |
|---|---|---|---|---|---|---|---|

End with **Top 3 risks to watch**.

## Guardrails

- Never mark a risk Resolved or Accepted on your own. Those are ART decisions.
- If a risk has no owner, the proposed owner is "RTE to assign", not a guessed name.
