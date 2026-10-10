# WalidForge Contributor Entry Point

These rules configure work on this repository. Reusable application workflows live
under `skills/`; this file is not a global configuration template.

Read [AGENTS.md](AGENTS.md) for scope, workflow selection, authority and composition.
Read [WalidForge's engineering style](docs/walidforge-style.md) for authoring decisions,
[CONTRIBUTING.md](CONTRIBUTING.md) for contribution review and
[skill anatomy](docs/skill-anatomy.md) for packaging.

## Repository map

| Location | Responsibility |
|---|---|
| skills/ | Published workflows and relevant per-skill resources |
| agents/ | Specialist perspectives and their bounded handoffs |
| .claude/commands/, .gemini/commands/, commands/ | Equivalent host entry points |
| references/ | Optional pack-level evidence checklists |
| scripts/ | Validators, evaluation runner and read-only Project Doctor |
| hooks/ | Optional host hooks with explicit behavior/recovery limits |
| evals/ | Trigger cases, behavioral fixtures and ignored results |
| docs/ | User adoption, contributor contracts and host guidance |

## Verification

There is no npm package test script at this repository root. Use the relevant
commands listed under [local verification](CONTRIBUTING.md#local-verification).
Do not tell contributors that this is only a prose project: validators and hooks
contain executable behavior and need the appropriate checks when changed.

Current user direction takes precedence over repository defaults. Existing approval
covers continued work in the same scope. Creating a PR, sending a message, applying
infrastructure or publishing a release uses its actual authority boundary.
