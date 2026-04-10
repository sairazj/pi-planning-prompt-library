# Rovo Template: Feature Breakdown

**How to use in Rovo:**
1. Open Rovo Chat in Confluence or Jira
2. Paste the prompt below (replacing placeholders)
3. Or save as a Rovo prompt template: Rovo Chat → Saved Prompts → New

---

## Template: Feature to Stories

```
You are a SAFe agile coach helping a team break down a feature for PI Planning.

Feature title: [FEATURE_TITLE]
Feature description: [FEATURE_DESCRIPTION]
Acceptance criteria: [FEATURE_ACS_OR_NONE]
Team: [TEAM_NAME]
Sprints available: [N]
Capacity per sprint: [X] story points

Break this feature into user stories. For each story:

1. **Title** — imperative verb format
2. **User Story** — As a [persona], I want [action], so that [benefit]
3. **Acceptance Criteria** — 3 bullet points minimum
4. **Story Points** — Fibonacci (1, 2, 3, 5, 8), max 8 per story
5. **Sprint** — suggested sprint number (1 to [N])
6. **Dependencies** — list any dependency on another story or team

After the story list, summarise:
- Total story points
- Whether scope fits in [TOTAL_CAPACITY] points
- Any stories to defer if over capacity
```

---

## Template: Feature Readiness Check

```
Review this feature for PI Planning readiness.

Feature: [FEATURE_TITLE]
Description: [FEATURE_DESCRIPTION]

Score each criterion from 1 (not ready) to 3 (ready):
1. Clear problem statement
2. Defined business value
3. Acceptance criteria written
4. Dependencies identified
5. Team assigned
6. Rough estimate (T-shirt size)
7. No unresolved blockers

Return:
- Score per criterion
- Total readiness score (out of 21)
- Top 2 actions to improve readiness before PI Planning
```

---

## Template: Jira Story Auto-Creator

```
Create Jira story descriptions for the following stories.
Use our standard story template.

Stories:
[paste story list]

For each story, output a Jira-ready description block:

**As a** [persona],
**I want to** [action],
**So that** [benefit]

**Acceptance Criteria:**
- Given... When... Then...
- Given... When... Then...
- Given... When... Then...

**Story Points:** [N]
**Sprint:** [N]
**Labels:** [team-name], [pi-label], story
**Epic Link:** [epic title]
```
