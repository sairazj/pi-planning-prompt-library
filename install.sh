#!/usr/bin/env bash
# Copy PI Planning Copilot skills, agents and prompts into another repository.
#   ./install.sh /path/to/repo                          # everything
#   ./install.sh /path/to/repo skill invest-checker     # one skill (+ review gate)
#   ./install.sh /path/to/repo agent pi-prep-coach      # one agent
#   ./install.sh /path/to/repo prompt draft-ac          # one prompt
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
target="${1:?usage: install.sh <target-repo> [skill|agent|prompt <name>]}"
kind="${2:-all}"; name="${3:-}"
src="$here/.github"; dst="$target/.github"
mkdir -p "$dst/skills" "$dst/agents" "$dst/prompts"

# Skills each agent or prompt calls, so a partial install still works.
needs() {
  case "$1" in
    pi-prep-coach|pi-prep) echo feature-breakdown acceptance-criteria-drafter story-splitter invest-checker definition-of-ready dependency-mapper wsjf-prioritizer capacity-planner spike-writer ;;
    story-refiner) echo acceptance-criteria-drafter story-splitter invest-checker definition-of-ready ;;
    draft-ac)      echo acceptance-criteria-drafter ;;
    split-story)   echo story-splitter ;;
    invest-check)  echo invest-checker ;;
    dor-check)     echo definition-of-ready ;;
  esac
}
skills=()
case "$kind" in
  all)    cp -R "$src/skills/." "$dst/skills/"; cp -R "$src/agents/." "$dst/agents/"; cp -R "$src/prompts/." "$dst/prompts/" ;;
  skill)  skills=("$name") ;;
  agent)  cp "$src/agents/$name.agent.md" "$dst/agents/"; skills=($(needs "$name")) ;;
  prompt) cp "$src/prompts/$name.prompt.md" "$dst/prompts/"; skills=($(needs "$name"))
          [ "$name" = pi-prep ] && cp "$src/agents/pi-prep-coach.agent.md" "$dst/agents/" ;;
  *) echo "unknown kind: $kind"; exit 1 ;;
esac
if [ "$kind" != all ]; then
  for s in "${skills[@]}" human-review-gate; do cp -R "$src/skills/$s" "$dst/skills/"; done
fi

[ -f "$dst/copilot-instructions.md" ] && echo "! $dst/copilot-instructions.md exists; merge by hand" \
  || cp "$src/copilot-instructions.md" "$dst/"
mkdir -p "$target/templates"; [ -f "$target/templates/review-log.md" ] || cp "$here/templates/review-log.md" "$target/templates/"
echo "Done. Reload VS Code, then try /draft-ac in Copilot Chat."
