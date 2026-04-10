# PI Planning Prompt Library

A complete AI toolkit for **SAFe PI Planning** and every sprint ceremony,
built for teams using **GitHub Copilot**, **Claude**, **Rovo (Atlassian)**, and **GPT**.

---

## What's Included

| Tool | What it provides |
|---|---|
| **Claude commands** (`.claude/commands/`) | Slash commands for every ceremony — use in Claude Code or Claude.ai |
| **Copilot Extension** (`copilot-extension/`) | `@pi-planning` chat participant for VS Code, GitHub.com, JetBrains |
| **Copilot Instructions** (`.github/copilot-instructions.md`) | Repo-level custom instructions — auto-loaded in every Copilot session |
| **VS Code Snippets** (`vscode/`) | Tab-completable prompt snippets for Copilot Chat |
| **Rovo Templates** (`rovo/templates/`) | Ready-to-paste prompts for Rovo Chat in Jira/Confluence |
| **Rovo Agents** (`rovo/agents/`) | Agent configurations for automated backlog grooming and dependency scanning |
| **Prompt Library** (`prompts/`) | Organised by phase and tool for manual use |

---

## Ceremonies Covered

| Ceremony | Claude | Copilot | Rovo | GPT |
|---|---|---|---|---|
| PI Planning (all phases) | `/pi-plan` | `/pi-plan` | ✓ | ✓ |
| Sprint Planning | `/sprint-plan` | `/sprint-plan` | ✓ | ✓ |
| Daily Standup | `/standup` | `/standup` | — | ✓ |
| Backlog Refinement | `/refinement` | `/refinement` | ✓ | ✓ |
| Sprint Review & Demo | `/sprint-review` | `/sprint-review` | — | ✓ |
| Sprint Retrospective | `/retro` | `/retro` | — | ✓ |
| PI System Demo | `/system-demo` | `/system-demo` | — | ✓ |
| ROAM Risk Board | `/roam` | `/roam` | ✓ | ✓ |
| PI Objectives | `/pi-objectives` | `/pi-objectives` | ✓ | ✓ |
| Capacity Planning | `/capacity` | `/capacity` | — | ✓ |
| Inspect & Adapt | `/inspect-adapt` | `/inspect-adapt` | — | ✓ |
| ART Sync / SoS | `/art-sync` | `/art-sync` | — | ✓ |
| PO Sync | `/po-sync` | `/po-sync` | — | ✓ |

---

## Quick Start

### Claude (Claude Code or Claude.ai)

Copy `.claude/commands/` into your project root or `~/.claude/commands/` for global access.

```bash
# In your project
cp -r .claude/commands/ /your-project/.claude/commands/
```

Then use slash commands in any Claude session:

```
/pi-plan day1-breakout
/sprint-plan sprint 5, 6 devs, 60 points
/retro starfish
/roam [paste your risk list]
/refinement [paste a story]
/capacity pi
/standup [paste team updates]
```

Each command accepts arguments or guides you interactively if none are provided.

---

### GitHub Copilot — Copilot Extension (`@pi-planning`)

See [`copilot-extension/SETUP.md`](copilot-extension/SETUP.md) for full setup.

**Quick start (local dev):**

```bash
cd copilot-extension
npm install
SKIP_SIGNATURE_VERIFY=true npm run dev
# Expose with: ngrok http 3000
```

Then register the ngrok URL as a GitHub App Copilot Extension (see SETUP.md).

Once installed, use in Copilot Chat anywhere (VS Code, GitHub.com, JetBrains):

```
@pi-planning /help
@pi-planning /sprint-plan sprint 3, team of 5, 50 points
@pi-planning /retro mad-sad-glad
@pi-planning /pi-objectives [paste your stories]
```

---

### GitHub Copilot — Repo-Level Instructions

`.github/copilot-instructions.md` is auto-loaded by Copilot in any repo session.
It gives Copilot context about SAFe, story standards, estimation, and ceremony formats.

No setup needed — just having the file in the repo activates it.

---

### GitHub Copilot — VS Code Snippets

```bash
cp vscode/pi-planning.code-snippets /your-project/.vscode/
```

In Copilot Chat, type a prefix and press Tab:

| Prefix | Action |
|---|---|
| `pi-story` | Break a feature into stories |
| `pi-estimate` | Estimate complexity from codebase |
| `pi-spike` | Write a spike story |
| `pi-ac` | Generate Gherkin acceptance criteria |
| `pi-deps` | Check cross-team dependencies |
| `pi-roam` | Classify risks using ROAM |
| `pi-goal` | Generate sprint goal options |
| `pi-dor` | Check Definition of Ready |
| `pi-pr` | Write a PR description from a story |
| `pi-debt` | Surface tech debt for PI work |

---

### Rovo (Atlassian)

**Templates** — copy-paste into Rovo Chat in Confluence or Jira:
- [`rovo/templates/feature-breakdown.md`](rovo/templates/feature-breakdown.md)
- [`rovo/templates/pi-objectives.md`](rovo/templates/pi-objectives.md)
- [`rovo/templates/risk-roam.md`](rovo/templates/risk-roam.md)

**Agents** — set up automated Rovo Agents for ongoing PI health:
- [`rovo/agents/backlog-groomer.md`](rovo/agents/backlog-groomer.md) — daily backlog readiness checks
- [`rovo/agents/dependency-scanner.md`](rovo/agents/dependency-scanner.md) — cross-team dependency scans

---

## Repository Structure

```
.
├── .claude/
│   └── commands/              # Claude slash commands (one per ceremony)
│       ├── pi-plan.md
│       ├── sprint-plan.md
│       ├── standup.md
│       ├── retro.md
│       ├── sprint-review.md
│       ├── refinement.md
│       ├── roam.md
│       ├── pi-objectives.md
│       ├── capacity.md
│       ├── inspect-adapt.md
│       ├── art-sync.md
│       ├── po-sync.md
│       └── system-demo.md
├── .github/
│   ├── copilot-instructions.md    # Repo-level Copilot context
│   └── ISSUE_TEMPLATE/
│       └── prompt-suggestion.md
├── copilot-extension/             # @pi-planning chat participant (Node.js)
│   ├── src/
│   │   ├── index.js
│   │   ├── middleware/verify.js
│   │   ├── handlers/router.js
│   │   ├── handlers/stream.js
│   │   └── prompts/index.js
│   ├── package.json
│   └── SETUP.md
├── prompts/                       # Manual prompt library
│   ├── 01-pre-planning/
│   ├── 02-during-planning/
│   ├── 03-post-planning/
│   └── 04-by-tool/
├── rovo/
│   ├── templates/
│   └── agents/
└── vscode/
    └── pi-planning.code-snippets
```

---

## Contributing

Found a prompt that works well in a real PI? Open a PR or use the issue template.

1. Add the prompt to the relevant file in `prompts/`
2. If it's ceremony-specific, add a section to the relevant `.claude/commands/` file
3. If it's Copilot-specific, update `prompts/04-by-tool/copilot-prompts.md`
