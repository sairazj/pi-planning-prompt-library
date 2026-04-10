# ROAM Risks Prompts

Finalise risk classification and ownership after PI Planning sessions.

---

## 1. ROAM Board Finaliser

**Tool:** GPT  
**When:** End of PI Planning day 2 — risk review

```
Finalise the ROAM board for PI [number].

Identified risks:
[paste risk list from planning]

For each risk:
1. Assign ROAM status: Resolved / Owned / Accepted / Mitigated
2. If Owned: name the owner (role or team)
3. If Mitigated: describe the mitigation action and timeline
4. If Accepted: note the implication if the risk materialises
5. If Resolved: explain why it is no longer a risk

Output: Final ROAM table ready to paste into Confluence.

| # | Risk | ROAM Status | Owner | Action / Note | Review Date |
```

---

## 2. Risk to Story Converter

**Tool:** GPT  
**When:** When a risk requires active work to mitigate

```
The following risks require concrete actions to mitigate. 
Convert each into a story or task that can be assigned to a sprint.

Risks:
[list risks that need active mitigation]

For each, create:
- Story title: "Mitigate: [risk description]"
- Acceptance criteria: what does done look like for this mitigation?
- Suggested sprint: when must this be done by?
- Story points: 1-3 (mitigation tasks should be small)
- Owner: team or person
```

---

## 3. Mid-PI Risk Review Prompt

**Tool:** GPT, Rovo  
**When:** Mid-PI checkpoint (after Sprint 2)

```
Review our PI risk register mid-increment.

Original ROAM board from PI Planning:
[paste original ROAM board]

Current status update:
[describe what has changed, any new risks, any risks that have resolved]

Produce an updated ROAM board showing:
1. Risks that have been resolved (mark as CLOSED)
2. Risks that have escalated in severity (flag in red)
3. New risks identified since PI Planning
4. Overall risk health: Green / Amber / Red

Recommend 2-3 actions for the RTE to take this week.
```
