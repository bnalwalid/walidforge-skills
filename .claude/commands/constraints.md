---
description: Define executable quality rules and guard their enforcement
---

Invoke walidforge-skills:constraint-driven-development skill.

Task arguments: $ARGUMENTS

With no subcommand, inspect existing checks and define an adoptable quality contract in CONSTRAINTS.md. Reuse answered preferences; ask at most four focused questions with usable defaults for missing decisions.

Every rule names its rationale, verdict command, lifecycle stage and current status. Unknown targets default to a measured non-regression proposal. Do not label proposed or measured-only rules as enforced. Select tools and installation changes within actual scope, using current documented interfaces and runtime prerequisites.

Subcommands:
- check: execute available current rules and report failures or missing prerequisites.
- guard: inspect changed thresholds, test assertions, suppressions, stubs and exceptions without weakening the bar.
- ratchet: measure comparable current values and propose/update the authorized non-regression baseline; distinguish improvement goals from enforced floors.

Report executed checks, pending mechanisms and the next action. Do not install an unrelated tool collection or invent universal budgets.
