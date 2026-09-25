---
description: Score one or more stories against INVEST with evidence, then stop for review
agent: agent
---

Use the `invest-checker` skill. Score each letter 0–2 with quoted evidence and a fix for any score
below 2. For several stories, show the batch summary table first, worst first.
End with the `human-review-gate`. The reviewer may overrule any score.

Stories:
${input:stories:Paste one story or a list}
