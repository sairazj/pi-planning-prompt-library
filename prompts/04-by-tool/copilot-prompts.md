# GitHub Copilot Prompts for PI Planning

Prompts optimised for GitHub Copilot Chat in VS Code. Use `@workspace` for codebase-aware responses.

> **Tip:** Save `vscode/pi-planning.code-snippets` to your `.vscode/` folder to use these as tab-completable snippets.

---

## Pre-Planning

### Complexity Estimate
```
@workspace Estimate the complexity of implementing [feature description].
Based on the current codebase, tell me:
- Effort: XS / S / M / L / XL
- Files most likely to change
- Existing patterns or utilities we can reuse
- Risks or unknowns
```

### Tech Debt Surface
```
@workspace What areas of tech debt in this codebase could slow down delivery of [feature]?
List by risk level: High / Medium / Low.
```

### API Contract Check
```
@workspace If we add [new endpoint or capability], what existing contracts, 
interfaces, or consumers could be affected?
List all impacted files and suggest if any need updating before we start.
```

---

## Story Breakdown

### Full Story Breakdown
```
@workspace Break the following feature into implementation stories.
Feature: [description]
Each story should: be under 8 points, deployable independently, follow existing code patterns.
Include ACs aligned to how tests are written in this repo.
```

### Spike Story
```
We don't have enough information to estimate [topic].
Write a spike story: objective, timebox (8h or 16h), approach, definition of done.
```

### Test Coverage Gaps
```
@workspace Which areas of the codebase have low test coverage 
that relate to [feature area]?
List files and suggest what tests we should add as part of the next PI.
```

---

## During PI Planning

### Story Points Estimate
```
@workspace Given the current codebase, estimate story points (Fibonacci) for:
[paste story title and description]
Justify your estimate based on complexity, not just line count.
```

### Dependency Check
```
@workspace If Team B changes [module/service], which of our files or 
features would be affected?
List direct and indirect dependencies.
```

### Definition of Done Check
```
Does the following story meet a standard Definition of Done?
[paste story]
Check: AC defined, testable, no external blockers, fits one sprint, independently valuable.
```

---

## Post-Planning

### PR Description from Story
```
Write a PR description for the following story.
Story: [paste story]
Include: summary, what changed, how to test, linked issue number: #[N]
```

### Release Notes Draft
```
@workspace Based on the changes in this PI (commits/PRs in this branch), 
draft release notes for:
- End users (non-technical, benefits-focused)
- Internal stakeholders (feature list)
- Developers (technical changes, breaking changes, migration notes)
```
