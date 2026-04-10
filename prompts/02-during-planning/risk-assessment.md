# Risk Assessment Prompts

Identify, classify, and plan for PI risks during planning sessions.

---

## 1. Risk Identification from Stories

**Tool:** GPT  
**When:** After story breakdown, before iteration planning

```
Review the following stories planned for PI [number] and identify potential risks.

Stories:
[paste story list]

For each risk identified:
1. Risk description (what could go wrong)
2. Affected stories or features
3. Likelihood: Low / Medium / High
4. Impact: Low / Medium / High
5. Risk owner (team or role)
6. Initial ROAM classification: Resolved / Owned / Accepted / Mitigated

Present as a risk register table.
```

---

## 2. ROAM Classification

**Tool:** GPT  
**When:** During PI Planning confidence vote / risk review

```
Classify the following risks using the ROAM framework.
For each risk decide: Resolved, Owned, Accepted, or Mitigated.

Risks:
[paste risk list]

ROAM definitions:
- Resolved: Risk is no longer a concern — explain why
- Owned: Someone has committed to managing this risk — assign an owner
- Accepted: The team acknowledges the risk and will proceed — note the implication
- Mitigated: A plan is in place to reduce likelihood or impact — describe the mitigation

Output a ROAM board table: Risk | Classification | Owner | Action / Note
```

---

## 3. Technical Risk Scan

**Tool:** GitHub Copilot (@workspace)  
**When:** Tech leads reviewing planned work

```
@workspace We are planning to implement the following in the next PI:
[list features or architectural changes]

Analyse the codebase and identify:
1. Areas of high complexity or tech debt that could slow delivery
2. Missing test coverage in modules we plan to change
3. Known fragile integrations or third-party dependencies
4. Performance or scalability concerns for planned changes

Rate each finding: Low / Medium / High risk to PI delivery.
```

---

## 4. Dependency Risk Matrix

**Tool:** GPT

```
We have the following cross-team dependencies for PI [number]:
[paste dependency list with teams and sprint targets]

Build a risk matrix showing:
- Which dependencies are on the critical path (delay = PI failure)
- Which teams have the most dependencies (bottleneck risk)
- Which sprint is most at risk from dependency delays
- Top 3 risks to escalate to the RTE

Format: Dependency | Teams | Sprint | Critical Path? | Risk Level | Mitigation
```

---

## 5. Confidence Vote Analyser

**Tool:** GPT  
**When:** After confidence vote — interpreting low scores

```
Our team gave a PI Planning confidence vote with the following scores:
[member 1]: [score]/5 — comment: [optional]
[member 2]: [score]/5 — comment: [optional]
...

Average score: [X]/5

Analyse the low-confidence votes and:
1. Group concerns into themes (scope, dependencies, unknowns, team capacity, etc.)
2. List the top 3 issues to address before PI starts
3. Suggest specific actions for each issue
4. Recommend whether to proceed, adjust scope, or re-plan
```
