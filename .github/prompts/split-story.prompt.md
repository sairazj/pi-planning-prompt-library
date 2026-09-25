---
description: Split an oversized story into vertical slices of 5 points or less, then stop for review
agent: agent
---

Use the `story-splitter` skill on the story below. Target slices of ${input:target:5} points or fewer.
Name the splitting pattern and why, make slice 1 the walking skeleton, map every original AC
to a slice, and end with the `human-review-gate`.

Story:
${input:story:Paste the story with its current estimate}
