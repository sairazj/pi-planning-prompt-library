# Iteration Allocation Prompts

Assign stories to sprints based on capacity, dependencies, and priority.

---

## 1. Sprint Load Balancing

**Tool:** GPT  
**When:** After story breakdown — assigning stories to sprints

```
Distribute the following stories across [N] sprints to balance team load.

Team capacity per sprint: [X] story points
Stories:
[story title] — [points] — dependencies: [none / story name]
[story title] — [points] — dependencies: [none / story name]
...

Rules:
1. Respect dependencies (dependent story must be in a later sprint than its dependency)
2. Keep utilisation between 70-85% of capacity per sprint
3. Reserve Sprint [N] (Innovation/IP) for: tech debt, testing, documentation
4. Put enabler stories in Sprint 1 or 2
5. Put highest-value/highest-risk stories early

Output: Sprint plan table with story list per sprint and utilisation %.
```

---

## 2. Sprint Goal Generator

**Tool:** GPT, Rovo  
**When:** After iteration planning

```
Based on the following stories assigned to Sprint [N], write a sprint goal.

Sprint stories:
[paste story titles]

Sprint goal requirements:
- One sentence, outcome-focused (not a task list)
- Describes the value delivered, not the work done
- Measurable or demonstrable at sprint review
- Agreed by the whole team

Suggest 2-3 alternative sprint goal options for the team to choose from.
```

---

## 3. PI Objective Builder

**Tool:** GPT, Rovo  
**When:** Post-iteration planning — building team PI Objectives

```
Based on our committed stories for PI [number], write our team's PI Objectives.

Committed features/stories by sprint:
Sprint 1: [list]
Sprint 2: [list]
Sprint 3: [list]
Sprint 4: [list]

PI Objective format (SAFe):
1. Business objective statement (outcome, not output)
2. How this connects to the PI Theme: [PI theme]
3. Business value (team self-score: 1-10)
4. Stretch objective (uncommitted — if time permits)

Write 3-5 PI Objectives. Keep each to 1-2 sentences.
```

---

## 4. Innovation Sprint Planner

**Tool:** GPT  
**When:** Planning the IP (Innovation & Planning) sprint

```
We have the following items proposed for our Innovation & Planning sprint:
[list proposed items]

Team capacity for IP sprint: [X] days per person, [N] people

Help us plan the IP sprint:
1. Categorise each item: Tech Debt / Learning / Innovation / PI Prep / Team Health
2. Estimate effort for each (hours)
3. Check if we have capacity for all of them
4. Recommend a focused IP sprint plan that fits in the timebox
5. Flag anything that should move to a regular sprint instead
```
