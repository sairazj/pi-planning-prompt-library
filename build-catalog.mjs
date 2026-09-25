// Regenerates catalog.html from the files in .github/ and templates/.
// Usage: node build-catalog.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const read = (p) => readFileSync(join(root, p), 'utf8').replace(/\r\n/g, '\n');
const UP = 'https://github.com/sairazj/pi-planning-prompt-library/blob/main/';

// Split YAML frontmatter from body (simple key: value parser, enough for our files).
function parse(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { meta: {}, body: text };
  const meta = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { meta, body: text.slice(m[0].length) };
}

const ps = (flag) => `.\\install.ps1 -Target ..\\my-repo ${flag}`;
const sh = (args) => `./install.sh ../my-repo ${args}`;

// order = position in the PI prep pipeline; stage = when in the PI cycle it's used.
const skills = [
  ['acceptance-criteria-drafter', 'story-quality', 'Refinement · Pre-PI', 2, true, ['prompts/02-during-planning/story-breakdown.md', 'prompts/01-pre-planning/backlog-grooming.md']],
  ['story-splitter', 'story-shaping', 'Refinement · Day 1', 3, true, ['.claude/commands/refinement.md', 'prompts/02-during-planning/story-breakdown.md']],
  ['invest-checker', 'story-quality', 'Refinement · Pre-PI', 4, true, ['prompts/02-during-planning/story-breakdown.md']],
  ['human-review-gate', 'human-in-the-loop', 'Every stage', 0, true, []],
  ['definition-of-ready', 'story-quality', 'Pre-PI', 5, false, ['prompts/02-during-planning/story-breakdown.md', '.claude/commands/refinement.md']],
  ['feature-breakdown', 'story-shaping', 'Pre-PI · Day 1', 1, false, ['prompts/02-during-planning/story-breakdown.md']],
  ['spike-writer', 'story-shaping', 'Refinement · Day 1', 6, false, ['prompts/02-during-planning/story-breakdown.md']],
  ['dependency-mapper', 'pi-planning', 'Pre-PI · Day 1', 7, false, ['prompts/01-pre-planning/dependency-mapping.md', 'rovo/agents/dependency-scanner.md']],
  ['wsjf-prioritizer', 'pi-planning', 'Pre-PI · PO Sync', 8, false, ['.claude/commands/refinement.md', '.github/copilot-instructions.md']],
  ['capacity-planner', 'pi-planning', 'Pre-PI · Day 1', 9, false, ['.claude/commands/capacity.md']],
  ['roam-risk-board', 'pi-planning', 'Day 2', 10, false, ['.claude/commands/roam.md']],
  ['pi-objectives-writer', 'pi-planning', 'Day 1 · Day 2', 11, false, ['.claude/commands/pi-objectives.md']],
].map(([name, category, stage, order, core, upstream]) => {
  const path = `.github/skills/${name}/SKILL.md`;
  const { meta, body } = parse(read(path));
  return { type: 'skill', name, category, stage, order, core, path, description: meta.description, body,
    install: { ps: ps(`-Skill ${name}`), sh: sh(`skill ${name}`) }, upstream };
});

const agents = [
  ['pi-prep-coach', 'Pre-PI · Day 1', 1, ['.claude/commands/pi-plan.md']],
  ['story-refiner', 'Refinement', 2, ['.claude/commands/refinement.md']],
  ['backlog-readiness-scanner', 'Pre-PI (T-5 days)', 3, ['rovo/agents/backlog-groomer.md']],
].map(([name, stage, order, upstream]) => {
  const path = `.github/agents/${name}.agent.md`;
  const { meta, body } = parse(read(path));
  return { type: 'agent', name, category: 'orchestration', stage, order, core: name === 'pi-prep-coach', path,
    description: meta.description, tools: meta.tools, body,
    install: { ps: ps(`-Agent ${name}`), sh: sh(`agent ${name}`) }, upstream };
});

const prompts = [
  ['draft-ac', 1], ['split-story', 2], ['invest-check', 3], ['dor-check', 4], ['pi-prep', 5],
].map(([name, order]) => {
  const path = `.github/prompts/${name}.prompt.md`;
  const { meta, body } = parse(read(path));
  return { type: 'prompt', name: '/' + name, category: 'slash-commands', stage: 'Copilot Chat', order, core: false, path,
    description: meta.description + '.', body: '```text\n' + body.trim() + '\n```',
    install: { ps: ps(`-Prompt ${name}`), sh: sh(`prompt ${name}`) }, upstream: ['vscode/pi-planning.code-snippets'] };
});

const setup = [
  { name: 'copilot-instructions', path: '.github/copilot-instructions.md', order: 1,
    description: 'Repo-wide rules Copilot loads in every chat: the six human-in-the-loop rules, story standards, capacity and WSJF formulas, and the skill map.',
    upstream: ['.github/copilot-instructions.md'] },
  { name: 'review-log', path: 'templates/review-log.md', order: 2,
    description: 'The decision log the review gate appends to. One row per approved, edited, overruled or rejected AI draft, so the PI keeps an audit trail.',
    upstream: [] },
].map((s) => ({ type: 'setup', category: 'setup', stage: 'One-time', core: false, ...s, body: read(s.path),
  install: { ps: '.\\install.ps1 -Target ..\\my-repo', sh: './install.sh ../my-repo' } }));

// Related components on skills.agile36.com. Linked, not copied.
const A36 = 'https://skills.agile36.com/#/';
const companions = [
  ['skill', 'agile-product-owner', 'business-marketing', 'Generates INVEST-compliant user stories from epics, with sprint planning and velocity tracking.', 'Use it to seed stories, then run invest-checker and the review gate over the output.'],
  ['agent', 'refine-issue', 'expert-advisors', 'Copilot chat mode that enriches a GitHub issue with acceptance criteria, technical considerations, edge cases and NFRs.', 'For teams that keep stories in GitHub Issues rather than Jira. Pairs with acceptance-criteria-drafter.'],
  ['agent', 'scrum-master', 'business-marketing', 'Facilitation for sprint planning, retrospectives, impediment removal and scaling agile across teams.', 'Covers the ceremonies around PI prep: sprint planning, retros, Scrum of Scrums.'],
  ['agent', 'research-technical-spike', 'expert-advisors', 'Researches and validates a technical spike through investigation and controlled experiments.', 'spike-writer defines the spike; this agent helps run it.'],
  ['agent', 'atlassian-requirements-to-jira', 'expert-advisors', 'Turns requirements documents into Jira epics and stories with duplicate detection.', 'Push stories to Jira only after they pass the review gate.'],
  ['skill', 'requirements-clarity', 'productivity', 'Clarifies ambiguous requirements through focused dialogue before any work starts.', 'Run it before acceptance-criteria-drafter when a story has no clear persona or benefit.'],
].map(([kind, name, cat, description, pair], i) => {
  const route = kind === 'agent' ? `agents/${cat}/${name}.md` : `skills/${cat}/${name}`;
  const cmd = `npx claude-code-templates@latest --${kind}=${cat}/${name} --yes`;
  return { type: 'companion', kind, name, category: cat, stage: 'agile36 · ' + kind, order: i + 1, core: false,
    path: `${cat}/${name}`, description, pair, url: A36 + route,
    install: { npx: cmd }, body: '', upstream: [] };
});

const data = { up: UP, items: [...skills, ...agents, ...prompts, ...setup, ...companions] };
const json = JSON.stringify(data).replace(/</g, '\\u003c');
const tpl = read('catalog.template.html');
writeFileSync(join(root, 'catalog.html'), tpl.replace('/*__DATA__*/null', json));
console.log(`catalog.html: ${data.items.length} components`);
