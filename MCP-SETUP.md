# MCP Setup — Jira & Confluence Integration

Connect Jira and Confluence to VS Code so GitHub Copilot and Claude can read and write
live data during sprint ceremonies — no more copy-pasting from Atlassian.

---

## What this enables

| Without MCP | With MCP |
|---|---|
| Paste sprint backlog manually | `/standup fetch PROJ` auto-pulls live sprint status |
| Copy-paste stories for refinement | `/refinement PROJ-123` fetches and refines the story |
| Write risks by hand | `/roam identify PROJ PI-27` scans Jira for blocked items |
| Manually create stories in Jira | `/sprint-plan` creates and assigns stories automatically |
| Export Confluence notes | Retro summaries and ROAM boards posted back automatically |

---

## Prerequisites

- Python 3.10+ with `uv` or `pip`
- VS Code with GitHub Copilot extension
- An Atlassian Cloud account with API token access
- Claude Code (for Claude slash commands)

---

## Step 1 — Install the MCP server

The `mcp-atlassian` package supports both Jira and Confluence via a single server.

```bash
# Recommended: install via uv (faster, isolated)
pip install uv
uvx mcp-atlassian  # test it runs

# Alternative: pip
pip install mcp-atlassian
```

---

## Step 2 — Generate an Atlassian API token

1. Go to: https://id.atlassian.com/manage-profile/security/api-tokens
2. Click **Create API token**
3. Name it: `mcp-vs-code`
4. Copy the token — you only see it once

---

## Step 3 — Set environment variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

```env
JIRA_URL=https://your-org.atlassian.net
JIRA_USERNAME=your-email@company.com
JIRA_API_TOKEN=your-api-token

CONFLUENCE_URL=https://your-org.atlassian.net
CONFLUENCE_USERNAME=your-email@company.com
CONFLUENCE_API_TOKEN=your-api-token
```

> **Security:** `.env` is gitignored. Never commit real credentials.

---

## Step 4 — VS Code MCP configuration

`.vscode/mcp.json` is already configured in this repo.
VS Code reads it automatically when you open the project.

To verify: open VS Code → Command Palette → `MCP: List Servers`
You should see `jira` listed as an available server.

To start it manually: `MCP: Start Server → jira`

---

## Step 5 — Enable MCP in Copilot Chat

`.vscode/settings.json` already enables MCP for Copilot.
No further setup needed.

To verify: open Copilot Chat → type `@` — you should see `jira` as an available tool.

---

## Step 6 — Test the connection

In Copilot Chat:
```
@jira search issues in project MYPROJ, last 5 stories
```

In Claude Code:
```
/standup fetch MYPROJ
```

Both should return live Jira data.

---

## Available MCP Tools

Once connected, the following tools are available to both Copilot and Claude:

### Jira
| Tool | What it does |
|---|---|
| `search_issues(jql)` | Run any JQL query |
| `get_issue(key)` | Fetch full issue details |
| `create_issue(project, type, summary, ...)` | Create a story, bug, epic, etc. |
| `update_issue(key, fields)` | Update any field (points, sprint, status, AC) |
| `transition_issue(key, transition)` | Move issue to Done, In Progress, etc. |
| `add_comment(key, body)` | Add a comment to an issue |
| `create_issue_link(from, to, type)` | Link issues (blocks, depends on, split from) |
| `get_board(boardId)` | Get board info |
| `get_sprints(boardId, state)` | List sprints (active, closed, future) |
| `get_sprint_issues(sprintId)` | All issues in a sprint |
| `update_sprint(sprintId, goal)` | Update sprint goal |
| `get_projects()` | List all accessible projects |

### Confluence
| Tool | What it does |
|---|---|
| `search_content(query, space)` | Search pages and blogs |
| `get_page(pageId)` | Fetch full page content |
| `create_page(space, title, body, parent)` | Create a new Confluence page |
| `update_page(pageId, title, body)` | Update an existing page |
| `get_spaces()` | List accessible spaces |

---

## Claude Command Usage with MCP

All Claude commands in `.claude/commands/` are MCP-aware.
They use live Jira/Confluence data when a project key or space is provided.

```bash
# Pull live sprint status
/standup fetch MYPROJ

# Fetch and refine a specific story
/refinement MYPROJ-456

# Full refinement session on top backlog items
/refinement session MYPROJ

# Auto-scan PI risks from Jira
/roam identify MYPROJ PI-27

# Sprint plan with live velocity and backlog
/sprint-plan MYPROJ sprint 5

# PI Planning with live feature data
/pi-plan pre-prep MYPROJ PI-27

# Post retro summary to Confluence
/retro summary TEAM-SPACE
```

---

## Copilot Chat Usage with MCP

```
# In VS Code Copilot Chat (agent mode)
@jira get all blocked stories in project MYPROJ this sprint
@jira create a story in MYPROJ: "Add SSO login for enterprise users" with 5 story points
@confluence search for "PI 27 Planning" in the PLATFORM space
@confluence create a page titled "Sprint 5 Retrospective" in the TEAM space
```

---

## Troubleshooting

**MCP server not starting:**
```bash
# Check Python and uv are installed
python --version
uv --version

# Test mcp-atlassian directly
JIRA_URL=https://... JIRA_USERNAME=... JIRA_API_TOKEN=... uvx mcp-atlassian
```

**Authentication error:**
- Verify your API token is correct (regenerate if needed)
- Ensure `JIRA_USERNAME` is your full email address, not a display name
- Check your Atlassian account has API token access enabled

**VS Code not detecting MCP server:**
- Reload VS Code window: Cmd/Ctrl + Shift + P → `Developer: Reload Window`
- Check `.vscode/mcp.json` is in the project root
- Ensure the `github.copilot.chat.experimental.mcp.enabled` setting is `true`

**Environment variables not loading:**
- If using `.env` file, ensure your shell loads it before starting VS Code
- Or set the variables in your shell profile (`~/.zshrc` or `~/.bashrc`)
- Or export them directly: `export JIRA_URL=https://...` then open VS Code from that terminal
