# PI Planning Copilot Extension — Setup Guide

This is a GitHub Copilot Extension (chat participant) that brings all SAFe PI Planning
ceremonies into GitHub Copilot Chat via `@pi-planning` commands.

---

## Prerequisites

- Node.js 18+
- A GitHub account with Copilot access
- A publicly accessible server (or ngrok for local development)

---

## Local Development Setup

### 1. Install dependencies

```bash
cd copilot-extension
npm install
```

### 2. Start the server with signature verification disabled

```bash
SKIP_SIGNATURE_VERIFY=true npm run dev
```

### 3. Expose your local server with ngrok

```bash
ngrok http 3000
```

Copy the `https://xxxx.ngrok.io` URL — you'll need it for the GitHub App.

---

## GitHub App Registration

### 1. Create a GitHub App

Go to: **GitHub → Settings → Developer Settings → GitHub Apps → New GitHub App**

Fill in:
- **App name:** `pi-planning-copilot` (or your preferred name)
- **Homepage URL:** your repo URL
- **Callback URL:** `https://your-server/api/copilot`
- **Webhook URL:** `https://your-server/api/copilot`

### 2. Enable Copilot Extension

In the GitHub App settings:
- Go to **Copilot** tab
- Set **Extension type:** `Agent`
- Set **URL:** `https://your-server/api/copilot`
- Set **Pre-authorization URL:** (optional, for OAuth flows)

### 3. Install the GitHub App

- Go to your GitHub App → **Install App**
- Install on your personal account or organisation

### 4. Set the public key verification

In production, remove `SKIP_SIGNATURE_VERIFY=true`.
The extension will automatically fetch and cache GitHub's public key for request verification.

---

## Production Deployment

### Deploy to a cloud provider (e.g. Railway, Render, or AWS)

```bash
# Set environment variables
PORT=3000
NODE_ENV=production
# Do NOT set SKIP_SIGNATURE_VERIFY in production

npm start
```

Update your GitHub App's Copilot Extension URL to the production URL.

---

## Usage in GitHub Copilot Chat

Once installed, use `@pi-planning` in any GitHub Copilot Chat (VS Code, github.com, or JetBrains):

```
@pi-planning /help
@pi-planning /pi-plan day1-breakout
@pi-planning /sprint-plan sprint 5, team of 6, 60 points capacity
@pi-planning /retro starfish
@pi-planning /roam [paste your risk list]
@pi-planning /refinement [paste a story to refine]
@pi-planning /capacity pi
@pi-planning /standup [paste team updates]
```

---

## Available Commands

| Command | Ceremony |
|---|---|
| `/pi-plan [phase]` | PI Planning — all phases |
| `/sprint-plan [context]` | Sprint Planning |
| `/standup [updates\|blockers\|summary\|agenda]` | Daily Standup |
| `/retro [format\|feedback]` | Sprint Retrospective |
| `/sprint-review [prep\|metrics\|incomplete\|feedback]` | Sprint Review |
| `/refinement [story\|prioritise\|split\|ac\|estimate\|ready]` | Backlog Refinement |
| `/roam [risks\|identify\|update\|convert]` | ROAM Risk Board |
| `/pi-objectives [stories\|drafts\|rollup\|metrics\|score]` | PI Objectives |
| `/capacity [team details\|pi\|sprint\|compare]` | Capacity Planning |
| `/inspect-adapt [data\|problem-solving\|summary\|improvement-backlog]` | Inspect & Adapt |
| `/art-sync [updates\|agenda\|impediments\|dependencies\|summary]` | ART Sync |
| `/po-sync [updates\|agenda\|prioritise\|alignment\|summary]` | PO Sync |
| `/system-demo [features\|script\|stakeholders\|feedback\|summary]` | PI System Demo |
| `/help` | Show all commands |

---

## Project Structure

```
copilot-extension/
├── src/
│   ├── index.js              # Express server entry point
│   ├── middleware/
│   │   └── verify.js         # GitHub request signature verification
│   ├── handlers/
│   │   ├── router.js         # Command → handler routing
│   │   └── stream.js         # SSE streaming to Copilot API
│   └── prompts/
│       └── index.js          # System prompts per ceremony
├── package.json
└── SETUP.md
```
