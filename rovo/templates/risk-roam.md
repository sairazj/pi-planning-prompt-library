# Rovo Template: Risk & ROAM

**How to use:** Use in Rovo Chat during or after PI Planning to manage the risk board.

---

## Template: Risk Identification

```
Review the following PI plan and identify potential risks.

Features and stories planned for PI [PI_NUMBER]:
[PASTE_PLAN]

For each risk identified:
1. **Risk description** — what could go wrong
2. **Affected features** — which stories or features are impacted
3. **Likelihood** — Low / Medium / High
4. **Impact** — Low / Medium / High
5. **Initial ROAM** — your suggestion: Resolved / Owned / Accepted / Mitigated

Present as a risk register table. Limit to the top 10 risks.
```

---

## Template: ROAM Board Builder

```
Facilitate a ROAM board exercise for PI [PI_NUMBER].

Identified risks:
[PASTE_RISK_LIST]

ROAM definitions:
- **Resolved** — no longer a risk, explain why
- **Owned** — assigned to someone to manage, name the owner
- **Accepted** — team acknowledges and accepts the consequence
- **Mitigated** — active plan in place to reduce likelihood or impact

For each risk, assign ROAM status and provide:
- Owner (if Owned or Mitigated)
- Action or mitigation plan
- Review date

Output as a table formatted for Confluence:

| # | Risk | ROAM | Owner | Action / Note | Review Date |
```

---

## Template: Mid-PI Risk Review

```
We are at the mid-point of PI [PI_NUMBER]. Review our risk status.

Original ROAM board from PI Planning:
[PASTE_ORIGINAL_ROAM]

What has changed since PI Planning:
[DESCRIBE_CHANGES_NEW_RISKS_RESOLVED_RISKS]

Produce an updated ROAM board:
1. Mark resolved risks as CLOSED
2. Flag escalated risks with ⚠️
3. Add new risks identified since planning
4. Overall risk health: 🟢 Green / 🟡 Amber / 🔴 Red

End with 3 recommended actions for the RTE this week.
```

---

## Template: Risk to Action Story

```
The following risks require active mitigation work.
Convert each into a sprint task or story that can be tracked in Jira.

Risks:
[PASTE_RISKS_TO_MITIGATE]

For each, create:
- **Title:** Mitigate: [risk]
- **Description:** What work is needed to reduce this risk?
- **Acceptance criteria:** What does done look like?
- **Sprint:** Which sprint must this land in?
- **Points:** 1-3 (keep mitigation work small)
- **Owner:** Team or person
```
