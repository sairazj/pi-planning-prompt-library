# Rovo Template: PI Objectives

**How to use:** Paste into Rovo Chat in Confluence, or use after a PI Planning Confluence page is drafted.

---

## Template: PI Objectives Generator

```
You are an agile coach helping a team write SAFe PI Objectives.

PI Number: [PI_NUMBER]
PI Theme: [PI_THEME]
Team name: [TEAM_NAME]

Committed features and stories:
Sprint 1: [list]
Sprint 2: [list]
Sprint 3: [list]
Sprint 4: [list]

Write 3-5 PI Objectives. For each:
1. **Objective** — one to two sentences, outcome-focused (what value is delivered, not what tasks are done)
2. **Business Value** — self-score 1-10 based on strategic importance
3. **Type** — Committed or Stretch
4. **Connects to PI Theme** — yes/no, brief note

End with a one-paragraph ART-level summary of what this team will achieve in PI [PI_NUMBER].
```

---

## Template: PI Objectives Polisher

```
Improve these PI Objectives. They were written quickly during planning and need refinement.

Current objectives:
[PASTE_OBJECTIVES]

For each objective:
1. Rewrite to be outcome-focused (what the customer or business gains, not what the team builds)
2. Make it specific enough that we'll know at PI System Demo whether we achieved it
3. Keep to 1-2 sentences
4. Keep the Business Value score if present, or suggest one

Flag any objective that is actually a task (starts with "implement", "build", "create") and rewrite it.
```

---

## Template: ART Objectives Rollup

```
Summarise the following team-level PI Objectives into an ART-level PI Summary for stakeholders.

[TEAM_1] Objectives:
[list]

[TEAM_2] Objectives:
[list]

[TEAM_3] Objectives:
[list]

Output:
1. **ART PI Summary** — 3-5 sentences for a business audience
2. **Key Themes** — group related objectives across teams (2-4 themes)
3. **Total Committed Business Value** — sum of all team BV scores
4. **Cross-Team Dependencies** — objectives that depend on another team's delivery
5. **Gaps vs PI Theme** — anything missing from: [PI_THEME]
```

---

## Template: Objective Success Metrics

```
For each PI Objective below, suggest 1-2 measurable success metrics.

PI Objectives:
[PASTE_OBJECTIVES]

For each metric:
- **Metric name**
- **How measured** (data source or method)
- **Target value** or acceptable range
- **When measured** — mid-PI check / PI System Demo / post-PI

Prefer leading indicators (things we can check during the PI) over lagging indicators.
```
