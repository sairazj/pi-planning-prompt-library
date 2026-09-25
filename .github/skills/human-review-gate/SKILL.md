---
name: human-review-gate
description: Shared checkpoint that every PI prep skill ends with. Presents drafts as a numbered review table, waits for the reviewer's approve / edit / reject decision per item, and logs the decision. Use whenever AI-drafted backlog content is about to be accepted, written to Jira, or passed to the next skill.
---

# Human Review Gate

The gate that keeps a person in charge of the backlog. Other skills call this one at the end
of their output. It can also be invoked on its own to review any pasted drafts.

## When to use

- At the end of `acceptance-criteria-drafter`, `story-splitter`, `invest-checker`,
  `definition-of-ready`, `feature-breakdown` and every other drafting skill.
- Before any write to Jira, Confluence or a repo file.
- When the reviewer asks "what's still pending?"

## Output format

End the response with exactly this block:

```
────────────────────────────────────────
REVIEW GATE: <skill name> · <n> items awaiting review
────────────────────────────────────────
| # | Item | Confidence | Flags |
|---|------|------------|-------|
| 1 | <short title> | High/Medium/Low | [ASSUMPTION] ×n, needs-PO, >8pts … |

Questions for PO:
- <question tied to an item number>

Reply with one of:
  approve all
  approve 1,3
  edit 2: <your change>
  reject 4: <reason>
  hold: park everything, no changes
Nothing is saved or sent until you reply.
────────────────────────────────────────
```

## Handling the reply

| Reply | What you do |
|---|---|
| `approve all` / `approve <ids>` | Mark items **Approved**. Offer the next skill in the pipeline. Ask before any external write. |
| `edit <id>: …` | Apply the change, show the revised item only, and re-open the gate for that item. |
| `reject <id>: reason` | Mark **Rejected**, keep the reason, do not regenerate unless asked. |
| `hold` | Summarise pending items and stop. |
| Anything ambiguous | Ask one clarifying question. Never assume approval. |

## Decision log

After a decision, and only once the reviewer approves writing the log, append rows to
`pi-prep/review-log.md` using `templates/review-log.md`:

```
| Date | Story | Skill | Item | Decision | Reviewer note |
```

## Rules

- Never infer approval from silence, thanks, or "looks good" on a different item.
- Approval is per item and per session. An approval yesterday does not cover today's drafts.
- Low-confidence items are listed first so they get the most attention.
