---
name: dependency-mapper
description: Finds cross-team and cross-story dependencies in a set of features or stories (and, with @workspace, in code such as shared APIs, contracts and schemas), rates each by risk, and produces a dependency matrix for the program board. Stops at a human review gate. Use 3 to 5 days before PI Planning, or when invest-checker scores Independent low, or the user says "pi-deps".
---

# Dependency Mapper

## Steps

1. Read the stories or features. With Atlassian MCP, also read `is blocked by` and `depends on` links.
2. With `@workspace`, check shared modules, API contracts and migrations that more than one story touches.
3. For each dependency record: upstream (what's needed), downstream (who needs it), teams, needed-by sprint, risk (Low/Med/High), and a suggested resolution.
4. Flag **critical path** chains of 3 or more stories and anything needed in the same sprint it is produced.
5. Stop at the Review Gate. Dependencies are only "agreed" once the other team confirms, which the reviewer records.

## Output

| # | Upstream | Downstream | Teams | Needed by | Risk | Resolution | Status |
|---|---|---|---|---|---|---|---|

Then a Mermaid graph of the critical path:

```mermaid
graph LR
  A[Auth token API · Team Orion · S1] --> B[SSO login · Team Vega · S2]
```

## Guardrails

- "Status" starts as `Proposed`. Only the reviewer can change it to `Agreed`.
- Same-sprint dependencies are always rated at least Medium.
