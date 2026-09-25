---
name: story-splitter
description: Splits an oversized user story (more than 8 points, or too big for one sprint) into smaller vertical slices using named splitting patterns, estimates each slice, checks each against INVEST, and stops at a human review gate. Use when the user says "split", "too big", "break this down", "13 points", or when invest-checker flags Small or Estimable.
---

# Story Splitter

Breaks one story into thin, independently valuable vertical slices. Never splits by
technical layer (front end / back end / database) unless the reviewer asks.

## Inputs

- The story: title, description, ACs, current estimate.
- Team sprint capacity (optional, used to sanity-check slice sizes).
- Target slice size (default: 5 points or less).

## Splitting patterns

Pick the one or two that fit best, and say why the others don't.

| # | Pattern | Use when |
|---|---|---|
| 1 | Workflow steps | The story walks through several user steps |
| 2 | Business rule variations | Several rules or validations are bundled |
| 3 | Data / input variations | Different input types, formats or sources |
| 4 | User roles | Different personas need different behaviour |
| 5 | Happy path, then unhappy paths | Error handling is a big share of the work |
| 6 | Interface / channel | API first, then UI; or web first, then mobile |
| 7 | Simple, then complex | A basic version delivers value now; sophistication later |
| 8 | Defer performance | "Make it work" now, "make it fast" as a follow-on with a measurable target |
| 9 | Spike first | Too many unknowns to split sensibly. Recommend `spike-writer` |

## Steps

1. **Check the story is worth splitting.** If it is ≤ 8 points and fits a sprint, say so and stop.
2. **Choose the pattern(s)** and give a one-line rationale.
3. **Draft slices.** For each: title (imperative verb), user story, 2–4 Gherkin ACs, Fibonacci estimate, confidence.
4. **Order the slices.** Slice 1 is the walking skeleton: the thinnest path that delivers value end to end.
5. **Quick INVEST pass** on each slice (one line each; run `invest-checker` for the full check).
6. **Conservation check.** Confirm every original AC landed in exactly one slice. List any that were dropped or duplicated.
7. **Stop at the Review Gate.**

## Output format

**Pattern used:** <name> · **Why:** <one line>

| # | Slice | Points | Conf. | Depends on | INVEST |
|---|---|---|---|---|---|
| 1 | Enable … (walking skeleton) | 3 | High | none | ✓ I N V E S T |

Each slice in detail below the table, then:

**Original ACs → slice mapping** · **Dropped / deferred scope** · Review Gate.

## Guardrails

- Every slice must deliver something a user or stakeholder can see or verify.
- A slice that only exists to enable another slice is an *enabler*. Label it as one.
- If the sum of slice points exceeds the original estimate by more than 50%, say so. It usually means hidden scope was found, which is useful news for the PO.
- Do not create issues in Jira. After approval, offer to, and wait for a yes.
