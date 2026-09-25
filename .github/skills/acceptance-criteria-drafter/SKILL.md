---
name: acceptance-criteria-drafter
description: Drafts testable Gherkin acceptance criteria for a user story or feature, covering the happy path, edge cases, error paths and relevant NFRs, then stops at a human review gate. Use when a story has missing, vague or untestable acceptance criteria, or when the user says "write ACs", "acceptance criteria", "Given/When/Then" or "pi-ac".
---

# Acceptance Criteria Drafter

Turns a story into acceptance criteria a tester could automate, and flags what the
story doesn't say yet.

## Inputs

- Story text (title, description, any existing ACs) **or** a Jira key if the Atlassian MCP server is connected.
- Optional: persona, domain context, linked designs, `@workspace` for codebase-aware ACs.

If the story itself is unclear (no persona, no benefit), say so first and propose a
rewrite before drafting ACs.

## Steps

1. **Restate the story** in `As a / I want / So that` form. Mark inferred parts `[ASSUMPTION]`.
2. **Review existing ACs** (if any). Classify each: keep, rewrite (show before/after), or remove (with reason).
3. **Draft scenarios**, minimum three:
   - `@happy` the main success path
   - `@edge` boundary values, empty states, limits, concurrency
   - `@error` invalid input, dependency failure, permission denied
4. **Add NFR criteria** only where they apply: performance (with a number), security, accessibility (WCAG 2.2 AA), audit/logging.
5. **Testability check**: every `Then` must be observable. Replace words like *fast, easy, intuitive, correctly* with measurable outcomes.
6. **Coverage matrix**: map each business rule in the story to at least one scenario. Any rule with no scenario is a gap.
7. **Stop at the Review Gate** (`human-review-gate`).

## Output format

```gherkin
Feature: <story title>

  @happy
  Scenario: <name>
    Given <precondition>
    When <action>
    Then <observable outcome>

  @edge
  Scenario Outline: <name>
    Given ...
    When ... "<input>"
    Then ... "<result>"
    Examples:
      | input | result |
```

Then:

| Business rule | Covered by | Gap? |
|---|---|---|

**Questions for PO**: numbered, each tied to a scenario.

## Guardrails

- Never more than 8 scenarios for one story. More than 8 usually means the story needs splitting: recommend `story-splitter`.
- Don't invent business rules. If one is needed to finish a scenario, write it as a question.
- Keep UI wording out of `Then` steps unless the copy itself is the requirement.

## Example

> **Input:** "As a customer I want to reset my password."
>
> **Output (abridged):** restated story with `[ASSUMPTION] so that I can regain access without calling support`;
> 4 scenarios (`@happy` reset via emailed link, `@edge` link expires after 30 min `[ASSUMPTION]`,
> `@error` unknown email shows the same neutral message, `@nfr` link is single-use);
> Questions for PO: "Is 30 minutes the right expiry?", "Do we lock the account after N attempts?"
> → Review Gate with 4 items.
