# Capacity Planning Prompts

Use these to calculate team capacity and validate scope before PI Planning.

---

## 1. Capacity Calculator

**Tool:** GPT  
**When:** 1 week before PI Planning

```
Help me calculate team capacity for PI [number].

Team details:
- Number of developers: [N]
- Number of sprints in PI: [X] (typically 4-5)
- Sprint length: [2 weeks]
- Average velocity per developer per sprint: [Z] story points

Adjustments:
- Public holidays in this PI: [list dates]
- Team members on leave: [names and durations]
- Innovation/IP sprint: [yes/no — last sprint, no feature work]

Calculate:
1. Total available capacity in story points
2. Adjusted capacity after holidays/leave
3. Recommended story point budget (80% of adjusted capacity to allow for unplanned work)
4. Breakdown per sprint
```

---

## 2. Scope vs Capacity Validation

**Tool:** GPT  
**When:** Day before PI Planning

```
I have the following stories planned for PI [number]:

[paste story list with point estimates]

Team capacity: [X] total story points across [N] sprints.

Tell me:
1. Does the scope fit within capacity?
2. How many points over/under are we?
3. Which stories should be deferred if we are over capacity?
4. Which sprint is most at risk of being overloaded?

Prioritise by deferring stories with lowest business value first.
```

---

## 3. Unplanned Work Buffer

**Tool:** GPT

```
Our team historically spends [X]% of each sprint on unplanned work (bugs, support, incidents).

Given total PI capacity of [Y] story points across [N] sprints, calculate:
1. Points to reserve for unplanned work each sprint
2. Net available points for planned features
3. Recommendation: should we reduce PI scope, and by how much?
```

---

## 4. Cross-Team Capacity Overview

**Tool:** GPT, Rovo  
**When:** PI Planning day — RTE/Scrum of Scrums

```
Summarise capacity for the following teams in PI [number]:

[Team 1]: [X] developers, [Y] sprints, [Z] avg velocity = [total] points
[Team 2]: ...
[Team 3]: ...

For each team, show:
- Total capacity
- Planned load (from committed features)
- % utilisation
- Risk flag if utilisation > 85%

Output as a table.
```
