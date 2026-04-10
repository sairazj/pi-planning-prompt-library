# Dependency Mapping Prompts

Identify and visualise cross-team and cross-system dependencies before PI Planning.

---

## 1. Cross-Team Dependency Extraction

**Tool:** Rovo, GPT  
**When:** Pre-PI Planning — ART sync

```
Review the following features across teams and identify all cross-team dependencies.

Features:
[Team A]:
- [Feature 1]
- [Feature 2]

[Team B]:
- [Feature 3]
- [Feature 4]

[Team C]:
- [Feature 5]

For each dependency, output:
| Needs | From Team | Needed By | By Team | Sprint Needed | Risk (L/M/H) |

Then summarise: which team has the most dependencies, and which sprint has the highest dependency risk.
```

---

## 2. Dependency Risk Assessment

**Tool:** GPT

```
I have the following dependencies for PI [number]:
[paste dependency list]

For each, assess:
1. What happens if this dependency is not met on time?
2. Is there a workaround or interim solution?
3. Suggested mitigation strategy

Risk levels:
- High: blocks another team's sprint goal
- Medium: delays delivery but workaround exists
- Low: nice-to-have, no hard blocker
```

---

## 3. Codebase Dependency Scan

**Tool:** GitHub Copilot (@workspace)  
**When:** Tech leads preparing for PI Planning

```
@workspace Identify which modules and services would be affected by changes to [module/service name].

List:
1. Direct dependencies (imports this module)
2. Indirect dependencies (2 levels deep)
3. Teams likely to own each dependent module
4. Any circular dependencies to be aware of

This is to help us understand the blast radius of [Feature X] during PI Planning.
```

---

## 4. External Dependency Tracker

**Tool:** GPT, Rovo

```
We have the following features that depend on external teams, vendors, or APIs outside our ART:
[list features with their external dependencies]

For each external dependency, create a dependency entry with:
- What we need
- Who provides it (team/vendor/system)
- When we need it (sprint)
- Escalation path if delayed
- Whether it needs a formal dependency ticket in Jira

Output in a format ready to paste into Confluence.
```
