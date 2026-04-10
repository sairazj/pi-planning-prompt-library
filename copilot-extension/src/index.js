/**
 * PI Planning Copilot Extension
 *
 * A GitHub Copilot Extension (chat participant) that assists with all SAFe
 * sprint ceremonies: PI Planning, Sprint Planning, Standup, Retrospective,
 * Sprint Review, Backlog Refinement, System Demo, ART Sync, PO Sync,
 * Inspect & Adapt, ROAM, Capacity Planning, and PI Objectives.
 *
 * Setup:
 * 1. Register a GitHub App at github.com/settings/apps
 * 2. Enable Copilot Extension in the GitHub App settings
 * 3. Set the callback URL to your server: https://your-server/api/copilot
 * 4. Run: npm start
 *
 * Usage in GitHub Copilot Chat:
 *   @pi-planning /sprint-plan sprint 5, team of 6, 60 points capacity
 *   @pi-planning /retro mad-sad-glad
 *   @pi-planning /roam [paste risks]
 */

const express = require('express');
const { verifySignature } = require('./middleware/verify');
const { routeCommand } = require('./handlers/router');

const app = express();
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', extension: 'PI Planning Copilot Extension' });
});

// GitHub Copilot Extension endpoint
app.post('/api/copilot', verifySignature, async (req, res) => {
  try {
    const { messages } = req.body;
    const lastMessage = messages?.[messages.length - 1]?.content ?? '';

    // Parse command from message (e.g. "/sprint-plan ..." or "/retro ...")
    const { command, args } = parseCommand(lastMessage);

    // Stream the response back to Copilot
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    await routeCommand(command, args, messages, res);
  } catch (err) {
    console.error('Extension error:', err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * Parse a Copilot message for a slash command and its arguments.
 * e.g. "/sprint-plan sprint 5, 6 devs" → { command: 'sprint-plan', args: 'sprint 5, 6 devs' }
 */
function parseCommand(message) {
  const match = message.trim().match(/^\/([a-z-]+)\s*(.*)?$/s);
  if (match) {
    return { command: match[1], args: (match[2] ?? '').trim() };
  }
  return { command: 'help', args: message };
}

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`PI Planning Copilot Extension running on port ${PORT}`);
});

module.exports = app;
