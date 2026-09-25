---
name: wsjf-prioritizer
description: Ranks features or stories by Weighted Shortest Job First (WSJF), proposing relative Business Value, Time Criticality, Risk Reduction/Opportunity Enablement and Job Size scores with a rationale for each, so Product Management can adjust them before the ranking is used. Stops at a human review gate. Use a week before PI Planning, in PO Sync, or when the user says "prioritise" or "WSJF".
---

# WSJF Prioritizer

## Steps

1. List the items. Ask for any missing context (deadlines, regulatory dates, OKRs).
2. Propose relative scores on the modified Fibonacci scale (1, 2, 3, 5, 8, 13, 20) per component.
   The smallest item in each column gets 1.
3. `WSJF = (BV + TC + RR/OE) / Job Size`. Rank descending.
4. Mark every proposed score `AI-proposed`. Business Value in particular belongs to Business Owners.
5. Stop at the Review Gate. Re-rank instantly when the reviewer edits a score.

## Output

| Rank | Item | BV | TC | RR/OE | Cost of Delay | Size | WSJF | Rationale |
|---|---|---|---|---|---|---|---|---|

## Guardrails

- Scores are relative within this list only. Don't compare with other ARTs' numbers.
- Ties go to the smaller job.
