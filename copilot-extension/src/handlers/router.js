/**
 * Command router — maps slash commands to ceremony handlers.
 *
 * Each handler receives: args (string), messages (history), res (SSE stream)
 * and streams back an assistant response using the Copilot SSE format.
 */

const { streamResponse } = require('./stream');
const { SYSTEM_PROMPTS } = require('../prompts');

const COMMAND_MAP = {
  'pi-plan':       handlePiPlan,
  'sprint-plan':   handleSprintPlan,
  standup:         handleStandup,
  retro:           handleRetro,
  'sprint-review': handleSprintReview,
  refinement:      handleRefinement,
  roam:            handleRoam,
  'pi-objectives': handlePiObjectives,
  capacity:        handleCapacity,
  'inspect-adapt': handleInspectAdapt,
  'art-sync':      handleArtSync,
  'po-sync':       handlePoSync,
  'system-demo':   handleSystemDemo,
  help:            handleHelp,
};

async function routeCommand(command, args, messages, res) {
  const handler = COMMAND_MAP[command] ?? COMMAND_MAP['help'];
  await handler(args, messages, res);
}

// ─── Ceremony Handlers ────────────────────────────────────────────────────────

async function handlePiPlan(args, messages, res) {
  await streamResponse(SYSTEM_PROMPTS.piPlan, args || 'What phase of PI Planning do you need help with? (pre-prep / day1-breakout / day1-review / day2-rework / day2-close)', messages, res);
}

async function handleSprintPlan(args, messages, res) {
  const prompt = args || 'Provide: sprint number, team capacity in points, and paste your candidate stories.';
  await streamResponse(SYSTEM_PROMPTS.sprintPlan, prompt, messages, res);
}

async function handleStandup(args, messages, res) {
  const prompt = args || 'Paste your team standup updates, or type: "blockers", "summary", or "agenda".';
  await streamResponse(SYSTEM_PROMPTS.standup, prompt, messages, res);
}

async function handleRetro(args, messages, res) {
  const prompt = args || 'Paste team feedback, or choose a format: starfish / 4ls / mad-sad-glad / sailboat / timeline / lean-coffee';
  await streamResponse(SYSTEM_PROMPTS.retro, prompt, messages, res);
}

async function handleSprintReview(args, messages, res) {
  const prompt = args || 'Type: "prep", "metrics", "incomplete", or paste stakeholder feedback from the review.';
  await streamResponse(SYSTEM_PROMPTS.sprintReview, prompt, messages, res);
}

async function handleRefinement(args, messages, res) {
  const prompt = args || 'Paste a story to refine, or type: "prioritise", "split", "ac", "estimate", or "ready".';
  await streamResponse(SYSTEM_PROMPTS.refinement, prompt, messages, res);
}

async function handleRoam(args, messages, res) {
  const prompt = args || 'Paste your risk list, or type: "identify", "update", or "convert".';
  await streamResponse(SYSTEM_PROMPTS.roam, prompt, messages, res);
}

async function handlePiObjectives(args, messages, res) {
  const prompt = args || 'Paste committed stories/features, draft objectives to refine, or type: "rollup", "metrics", "score".';
  await streamResponse(SYSTEM_PROMPTS.piObjectives, prompt, messages, res);
}

async function handleCapacity(args, messages, res) {
  const prompt = args || 'Provide: number of developers, sprint count, average velocity, holidays, and leave. Or type: "pi", "sprint", or "compare".';
  await streamResponse(SYSTEM_PROMPTS.capacity, prompt, messages, res);
}

async function handleInspectAdapt(args, messages, res) {
  const prompt = args || 'Paste PI metrics and outcomes, or type: "problem-solving", "summary", or "improvement-backlog".';
  await streamResponse(SYSTEM_PROMPTS.inspectAdapt, prompt, messages, res);
}

async function handleArtSync(args, messages, res) {
  const prompt = args || 'Paste team status updates, or type: "agenda", "impediments", "dependencies", or "summary".';
  await streamResponse(SYSTEM_PROMPTS.artSync, prompt, messages, res);
}

async function handlePoSync(args, messages, res) {
  const prompt = args || 'Paste PO updates, or type: "agenda", "prioritise", "alignment", or "summary".';
  await streamResponse(SYSTEM_PROMPTS.poSync, prompt, messages, res);
}

async function handleSystemDemo(args, messages, res) {
  const prompt = args || 'Paste completed features to demo, or type: "script", "stakeholders", "feedback", or "summary".';
  await streamResponse(SYSTEM_PROMPTS.systemDemo, prompt, messages, res);
}

async function handleHelp(args, messages, res) {
  const helpText = `## PI Planning Copilot Extension

I can help with every SAFe sprint ceremony. Use these commands:

| Command | Ceremony | Example |
|---|---|---|
| \`/pi-plan\` | PI Planning (all phases) | \`/pi-plan day1-breakout\` |
| \`/sprint-plan\` | Sprint Planning | \`/sprint-plan sprint 5, 60pts, 6 devs\` |
| \`/standup\` | Daily Standup | \`/standup [paste updates]\` |
| \`/retro\` | Sprint Retrospective | \`/retro starfish\` |
| \`/sprint-review\` | Sprint Review & Demo | \`/sprint-review prep\` |
| \`/refinement\` | Backlog Refinement | \`/refinement [paste story]\` |
| \`/roam\` | ROAM Risk Board | \`/roam [paste risks]\` |
| \`/pi-objectives\` | PI Objectives | \`/pi-objectives [paste stories]\` |
| \`/capacity\` | Capacity Planning | \`/capacity pi\` |
| \`/inspect-adapt\` | Inspect & Adapt | \`/inspect-adapt problem-solving\` |
| \`/art-sync\` | ART Sync / SoS | \`/art-sync agenda\` |
| \`/po-sync\` | PO Sync | \`/po-sync prioritise\` |
| \`/system-demo\` | PI System Demo | \`/system-demo script\` |

Type any command with no arguments for a guided walkthrough.
`;

  // Stream the help text directly
  const encoder = new TextEncoder();
  const chunks = helpText.split('\n').map((line) => line + '\n');
  for (const chunk of chunks) {
    res.write(`data: ${JSON.stringify({ choices: [{ delta: { content: chunk } }] })}\n\n`);
  }
  res.write('data: [DONE]\n\n');
  res.end();
}

module.exports = { routeCommand };
