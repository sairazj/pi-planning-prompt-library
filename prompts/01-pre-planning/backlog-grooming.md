# Backlog Grooming Prompts

Use these before PI Planning to refine and prepare your feature backlog.

---

## 1. Feature Summary & Gap Analysis

**Tool:** Rovo, GPT  
**When:** 3-5 days before PI Planning

```
Summarise the features in [Epic/Board name] and identify:
1. Features with missing acceptance criteria
2. Features not assigned to a team
3. Features with unclear business value
4. Features that may be duplicates or overlapping

Format as a table with columns: Feature | Status | Gap | Recommended Action
```

---

## 2. Feature Readiness Checklist

**Tool:** Rovo, GPT  
**When:** 2-3 days before PI Planning

```
Review the following feature and assess its readiness for PI Planning.
Score each criterion 1-3 (1=not ready, 2=partially ready, 3=ready):

Feature: [Feature title and description]

Criteria:
- [ ] Clear problem statement
- [ ] Defined business value / outcome
- [ ] Acceptance criteria written
- [ ] Dependencies identified
- [ ] Team assigned
- [ ] Estimated (rough T-shirt sizing: S/M/L/XL)
- [ ] No unresolved blockers

Provide a readiness score and top 2 actions to improve it.
```

---

## 3. Backlog Prioritisation

**Tool:** GPT  
**When:** 1 week before PI Planning

```
I have the following features planned for PI [number]:
[paste feature list with one-line descriptions]

Using a value vs effort matrix, categorise each as:
- Quick Wins (high value, low effort)
- Strategic (high value, high effort)
- Fill-ins (low value, low effort)
- Time Sinks (low value, high effort)

Recommend a priority order for the PI and flag any that should be deferred.
```

---

## 4. Dependency Pre-Scan

**Tool:** Rovo (Jira), GPT  
**When:** 3 days before PI Planning

```
Review these features and identify cross-team dependencies:
[paste feature list]

For each dependency found, output:
- Upstream feature (what is needed)
- Downstream feature (what depends on it)
- Teams involved
- Risk if dependency is not resolved (Low / Medium / High)
- Suggested resolution approach
```

---

## 5. Acceptance Criteria Generator

**Tool:** Copilot Chat, GPT  
**When:** Backlog refinement sessions

```
Write acceptance criteria for the following feature using Gherkin format (Given/When/Then).
Generate at least 3 scenarios covering the happy path, an edge case, and an error state.

Feature: [Feature title]
Description: [Feature description]
Users affected: [persona or user type]
```

---

## 6. T-Shirt Sizing Assist

**Tool:** GitHub Copilot (@workspace), GPT  
**When:** Refinement or pre-PI grooming

```
@workspace Based on the current codebase, estimate the effort to implement:
[Feature description]

Provide:
- T-shirt size: XS / S / M / L / XL
- Confidence: Low / Medium / High
- Key unknowns that affect the estimate
- Files or modules most likely to change
```
