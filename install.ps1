<#
.SYNOPSIS
  Copy PI Planning Copilot skills, agents and prompts into another repository.

.EXAMPLE
  .\install.ps1 -Target C:\code\my-repo                      # everything
  .\install.ps1 -Target C:\code\my-repo -Skill invest-checker # one skill (+ review gate)
  .\install.ps1 -Target C:\code\my-repo -Agent pi-prep-coach  # one agent
#>
param(
  [Parameter(Mandatory)] [string] $Target,
  [string[]] $Skill,
  [string[]] $Agent,
  [string[]] $Prompt
)

$src = Join-Path $PSScriptRoot '.github'
$dst = Join-Path $Target '.github'
$all = -not ($Skill -or $Agent -or $Prompt)

# Skills each agent or prompt calls, so a partial install still works.
$needs = @{
  'pi-prep-coach'             = 'feature-breakdown','acceptance-criteria-drafter','story-splitter','invest-checker','definition-of-ready','dependency-mapper','wsjf-prioritizer','capacity-planner','spike-writer'
  'story-refiner'             = 'acceptance-criteria-drafter','story-splitter','invest-checker','definition-of-ready'
  'backlog-readiness-scanner' = @()
  'draft-ac'                  = 'acceptance-criteria-drafter'
  'split-story'               = 'story-splitter'
  'invest-check'              = 'invest-checker'
  'dor-check'                 = 'definition-of-ready'
  'pi-prep'                   = @()
}
foreach ($n in @($Agent) + @($Prompt) | Where-Object { $_ }) { $Skill = @($Skill) + $needs[$n] }
if ($Prompt -contains 'pi-prep') { $Agent = @($Agent) + 'pi-prep-coach' | Select-Object -Unique; $Skill = @($Skill) + $needs['pi-prep-coach'] }

function Copy-Item-Safe($from, $to) {
  if (Test-Path $from -PathType Container) {
    # Copy contents so re-running doesn't nest folders (skills\skills).
    New-Item -ItemType Directory -Force $to | Out-Null
    Copy-Item "$from\*" $to -Recurse -Force
  } else {
    New-Item -ItemType Directory -Force (Split-Path $to) | Out-Null
    Copy-Item $from $to -Force
  }
  Write-Host "  + $($to.Replace($Target, '').TrimStart('\'))"
}

Write-Host "Installing into $Target"

if ($all) {
  Copy-Item-Safe "$src\skills"  "$dst\skills"
  Copy-Item-Safe "$src\agents"  "$dst\agents"
  Copy-Item-Safe "$src\prompts" "$dst\prompts"
} else {
  # Every skill ends at the review gate, so it always comes along.
  $Skill = @($Skill) + 'human-review-gate' | Where-Object { $_ } | Select-Object -Unique
  foreach ($s in $Skill)  { Copy-Item-Safe "$src\skills\$s"             "$dst\skills\$s" }
  foreach ($a in $Agent)  { Copy-Item-Safe "$src\agents\$a.agent.md"    "$dst\agents\$a.agent.md" }
  foreach ($p in $Prompt) { Copy-Item-Safe "$src\prompts\$p.prompt.md"  "$dst\prompts\$p.prompt.md" }
}

$instr = "$dst\copilot-instructions.md"
if (Test-Path $instr) {
  Write-Host "  ! $instr exists; merge .github\copilot-instructions.md by hand"
} else {
  Copy-Item-Safe "$src\copilot-instructions.md" $instr
}
if (-not (Test-Path "$Target\templates\review-log.md")) {
  Copy-Item-Safe "$PSScriptRoot\templates\review-log.md" "$Target\templates\review-log.md"
}
if ($Agent) { Write-Host "Done. Reload VS Code, then pick '$($Agent[0])' from the agent dropdown in Copilot Chat." }
else        { Write-Host "Done. Reload VS Code, then open Copilot Chat and type / to see the prompts." }
