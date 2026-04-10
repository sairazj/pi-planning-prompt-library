# Story Breakdown Prompts

Use during team breakout sessions to decompose features into sprint-ready stories.

---

## 1. Feature to Stories (Full Breakdown)

**Tool:** GitHub Copilot Chat, GPT  
**When:** Team breakout sessions

```
Break the following feature into user stories that are each completable within one sprint.

Feature: [Feature title]
Description: [Feature description]
Acceptance criteria: [Feature-level ACs]
Team capacity per sprint: [X] story points

For each story provide:
1. Title (imperative verb format: "Add...", "Enable...", "Fix...")
2. User story: As a [persona], I want to [action], so that [benefit]
3. Acceptance criteria (3 bullet points minimum, Gherkin if technical)
4. Story points (Fibonacci: 1, 2, 3, 5, 8)
5. Suggested sprint (1-[N])
6. Dependencies on other stories (if any)

Constraints:
- No story should exceed 8 points
- Each story must be independently deployable where possible
- Flag any stories that are actually spikes
```

---

## 2. Spike Story Generator

**Tool:** Copilot Chat, GPT  
**When:** When a story has too many unknowns to estimate

```
The following work item has too many unknowns to estimate directly.
Write a time-boxed spike story for it.

Work item: [description]
Key unknowns: [list what we don't know]

Spike story format:
- Title: "Spike: [topic]"
- Objective: What question(s) will this spike answer?
- Timebox: [hours — keep to 4h, 8h, or 16h max]
- Approach: How will the team investigate?
- Definition of Done: What artefact or decision will be produced?
- Story points: 2 (spikes are always 2 points regardless of timebox)
```

---

## 3. Codebase-Aware Story Breakdown

**Tool:** GitHub Copilot (@workspace)  
**When:** Technical story breakdown

```
@workspace Break the following feature into implementation stories.
Use the existing codebase patterns and architecture as a guide.

Feature: [description]

For each story:
1. Title and user story format
2. Which files/modules are likely to change
3. Are there existing utilities or patterns we should reuse?
4. Acceptance criteria aligned to the existing test style
5. Story points estimate based on codebase complexity
6. Any tech debt that should be addressed as part of this story
```

---

## 4. Acceptance Criteria — Gherkin Format

**Tool:** Copilot Chat, GPT

```
Write Gherkin acceptance criteria for the following story.
Include: 1 happy path, 1 edge case, 1 error/failure scenario.

Story: [story title and description]
Context: [any relevant system/domain context]

Format:
Scenario: [scenario name]
  Given [precondition]
  When [action]
  Then [expected outcome]
```

---

## 5. Story Splitting — INVEST Check

**Tool:** GPT  
**When:** A story is too large or feels like a mini-project

```
The following story feels too large to complete in one sprint. 
Split it using one or more of these techniques: by workflow step, by data/input type, 
by user role, by business rule, or by happy/unhappy path.

Story: [story title and description]
Current estimate: [X] points
Target: stories of 5 points or less

For each resulting story, confirm it is INVEST-compliant:
- Independent
- Negotiable
- Valuable
- Estimable
- Small
- Testable
```

---

## 6. Enabler Story Generator

**Tool:** Copilot Chat, GPT  
**When:** Infrastructure or architectural work needs to be planned

```
We need to do the following foundational/architectural work to support 
upcoming features in PI [number]:
[describe the enabling work]

Write this as a SAFe Enabler story with:
- Type: Architecture / Infrastructure / Technical Debt / Exploration
- Title
- Purpose: What future capability does this enable?
- Acceptance criteria
- Story points
- Which sprint it should land in (should be Sprint 1 or 2 to unblock later stories)
```

---

## 7. Story Map Generator

**Tool:** GPT  
**When:** Visualising the full feature journey

```
Create a user story map for the following feature.

Feature: [title and description]
Primary user: [persona]
Core user journey steps: [list the high-level activities in order]

For each journey step, list:
- The stories that support it (walking skeleton in Sprint 1, enhancements later)
- Which sprint each story targets
- Any gaps in the journey

Format as a table: Journey Step | Sprint 1 Stories | Sprint 2+ Stories | Gaps
```

---

## 8. Definition of Ready Validator

**Tool:** GPT, Rovo

```
Check whether the following story meets our Definition of Ready before sprint planning.

Story:
[paste full story with title, description, ACs, and estimate]

Definition of Ready criteria:
- [ ] User story format (As a / I want / So that)
- [ ] Acceptance criteria defined (minimum 2)
- [ ] Story points estimated by the team
- [ ] Dependencies identified and flagged
- [ ] No unresolved blockers
- [ ] Fits in one sprint

Return: READY / NOT READY and list any criteria not met.
```
