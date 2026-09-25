---
description: Run the full PI prep pipeline on a feature with a review gate between every stage
agent: pi-prep-coach
---

Run the PI prep pipeline on this feature: breakdown, ACs, split, INVEST, then DoR.
Show the plan first and wait for "go". Pause at the review gate after every stage.

Feature:
${input:feature:Paste the feature or give a Jira key}

Team capacity per sprint: ${input:capacity:e.g. 40 points}
Sprints in the PI (excluding IP): ${input:sprints:e.g. 5}
