# PI Planning Prompt Library

A curated library of AI prompts for Product Increment (PI) Planning, designed for teams using **GitHub Copilot**, **Rovo (Atlassian)**, and **GPT**.

## Structure

```
prompts/
  01-pre-planning/       # Backlog grooming, capacity, dependency mapping
  02-during-planning/    # Story breakdown, risk, iteration allocation
  03-post-planning/      # PI objectives, ROAM, stakeholder comms
  04-by-tool/            # Prompts organised by AI tool
vscode/
  pi-planning.code-snippets   # Import into VS Code for Copilot Chat
rovo/
  templates/             # Rovo prompt templates for Jira/Confluence
  agents/                # Rovo Agent configuration guides
```

## Quick Start

### VS Code / GitHub Copilot
1. Copy `vscode/pi-planning.code-snippets` into `.vscode/` in your project
2. In Copilot Chat, type the snippet prefix (e.g. `pi-story`) and press Tab

### Rovo (Atlassian)
1. Open Rovo Chat in Confluence or Jira
2. Copy prompts from `rovo/templates/` — paste directly or save as Rovo prompt templates

### GPT / ChatGPT
1. Browse `prompts/04-by-tool/gpt-prompts.md`
2. Replace `[placeholders]` with your context and paste into GPT

## Prompt Categories

| Category | Prompts | Best Tool |
|---|---|---|
| Backlog Grooming | 6 | Rovo, GPT |
| Capacity Planning | 4 | GPT, Copilot |
| Dependency Mapping | 4 | Rovo, Copilot |
| Story Breakdown | 8 | Copilot, GPT |
| Risk Assessment | 5 | GPT, Rovo |
| Iteration Allocation | 4 | GPT |
| PI Objectives | 4 | Rovo, GPT |
| ROAM Risks | 3 | GPT |
| Stakeholder Comms | 3 | GPT |

## Contributing

Found a prompt that works well? Open a PR or use the issue template to suggest additions.
