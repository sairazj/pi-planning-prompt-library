---
name: capacity-planner
description: Calculates sprint and PI capacity per team from team size, historical velocity, holidays, leave and planned overhead, recommends an 85% load, and compares it with the drafted scope sprint by sprint, flagging overloaded sprints. Stops at a human review gate. Use during PI pre-planning or Day 1 breakouts, or when the user says "capacity" or "load".
---

# Capacity Planner

## Inputs

Team members and availability (%), average velocity (last 3 sprints), sprint count
(excluding the IP sprint), holidays, planned leave, and drafted scope per sprint (optional).

## Steps

1. Per sprint: `capacity = Σ(member availability × working days) × velocity per person-day`.
   If only team velocity is known, pro-rate it by available days.
2. Recommended load = capacity × 0.85. The remaining 15% is the buffer for unplanned work.
3. Compare with drafted scope. Load above 85% is **At risk**, above 100% is **Overloaded**.
4. Suggest moves: which stories could shift sprint, or be deferred, to level the load.
5. Stop at the Review Gate. Show every input number so the team can correct it.

## Output

| Sprint | Available days | Capacity | Recommended (85%) | Planned | Load | Status |
|---|---|---|---|---|---|---|
| S1 | 42 | 34 | 29 | 31 | 91% | At risk |

## Guardrails

- Never use one person's velocity to judge them. Capacity is a team number.
- If velocity history is under 3 sprints, set Confidence: Low and say so.
