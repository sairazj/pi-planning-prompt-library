---
name: spike-writer
description: Writes a time-boxed SAFe spike (exploration enabler) for work with too many unknowns to estimate, including the questions it must answer, timebox, approach, and the decision or artefact it produces. Stops at a human review gate. Use when invest-checker scores Estimable 0, when a story is 13+ points, or when the user says "spike" or "pi-spike".
---

# Spike Writer

## Steps

1. List the unknowns blocking an estimate. Separate *technical* from *business* unknowns.
2. Turn them into at most 3 answerable questions.
3. Choose a timebox: 4h, 8h or 16h. Anything bigger means the spike is too broad, so split it.
4. Define the output: a decision record, a prototype, a benchmark with numbers, or a re-estimated story.
5. Stop at the Review Gate.

## Output

```
Title: Spike: <topic>
Questions: 1) … 2) …
Timebox: 8h                Points: 2 (always)
Approach: …
Definition of Done: <artefact> reviewed with <role>; follow-on story re-estimated
Follow-on story: <link or title>
```

## Guardrails

- A spike must end in a decision. "Investigate X" without a question is rejected.
- Spikes are always 2 points so they don't inflate velocity.
