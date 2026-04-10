# GPT Prompts for PI Planning

General-purpose prompts for ChatGPT or any GPT-based assistant.
Replace all `[placeholders]` with your actual context before using.

---

## Pre-Planning

### Feature Priority Matrix
```
I have [N] features for PI [number]. Prioritise them using a value/effort matrix.

Features:
[paste list]

For each: assign Business Value (1-10) and Effort (1-10).
Group into: Quick Wins / Strategic / Fill-ins / Time Sinks.
Recommend a delivery order.
```

### Capacity Sanity Check
```
Team: [N] devs, [X] sprints, [Y] pts/sprint avg.
Adjustments: [holidays, leave, IP sprint].

Planned scope: [total story points].

Can we deliver this? What should we cut if not?
Recommend which stories to defer, lowest business value first.
```

### Pre-PI Readiness Report
```
Rate the following feature for PI Planning readiness (score 1-3 per criterion):
Feature: [description]

Criteria: problem statement, business value, ACs, dependencies, team assigned, sized.
Return: readiness score, top 2 gaps, recommended actions.
```

---

## During Planning

### Story Breakdown (no codebase)
```
Break [Feature title] into sprint-ready stories (each under 8 points).
For each: user story format, 3 ACs (Gherkin), story points, sprint suggestion, dependencies.
```

### ROAM Board
```
Classify these risks using ROAM (Resolved/Owned/Accepted/Mitigated):
[paste risks]

For each: classification, owner, action/note.
Output as a table.
```

### Confidence Vote Analysis
```
PI confidence votes: [list scores and comments].
Average: [X]/5.
Group concerns by theme. List top 3 issues. Recommend: proceed / adjust scope / re-plan.
```

---

## Post-Planning

### PI Objectives Refinement
```
Rewrite these PI Objectives to be outcome-focused and measurable.
Current objectives: [paste]
PI Theme: [theme]
Return: improved objectives, business value scores (1-10), committed vs stretch labels.
```

### Stakeholder Email
```
Write a PI [number] planning outcomes email for [audience: executives / business stakeholders].
Include: PI theme, key features (3-5), team objectives, risks being managed, next update date.
Tone: confident, brief, under 300 words.
```

### Sprint Retrospective Prep
```
Our sprint [N] commitments were: [list].
We delivered: [list].
We did not deliver: [list] — reasons: [reasons].

Suggest 3 retrospective discussion points and 2 actionable improvements for next sprint.
```
