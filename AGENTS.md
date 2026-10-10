# Working on WalidForge

This file applies to contributors working in
[bnalwalid/walidforge-skills](https://github.com/bnalwalid/walidforge-skills).
Install the reusable skills into other projects; do not copy this repository's
contributor rules into an unrelated application.

## The engineering contract

Read [the maintainer's style](docs/walidforge-style.md). The pack supports all stacks,
defaults to documented architecture before implementation and chooses patterns from
actual constraints. Instructions must help developers make decisions and produce
evidence, without claiming universal architecture, invented seniority or uniqueness.

Preserve the user's requested scope and current project conventions. Do not turn
an explanation, design or review request into application changes or release work.
Existing authorization stays valid; request input only for a consequential missing
decision or action outside that scope.

## Use the relevant workflow

Load an applicable skill through the host's skill mechanism. If the host has no
skill tool, read `skills/<name>/SKILL.md` and follow its process. Do not describe an
unavailable invocation as having occurred. Select the owner of the next decision
rather than loading the whole catalog; the full mapping is in
[using-agent-skills](skills/using-agent-skills/SKILL.md).

| Intent | Workflow |
|---|---|
| Define a feature/architectural boundary | spec-driven-development |
| Order established requirements | planning-and-task-breakdown |
| Implement an authorized outcome | incremental-implementation and relevant test-driven-development |
| Diagnose unexpected behavior | debugging-and-error-recovery |
| Review a change | code-review-and-quality |
| Simplify while preserving behavior | code-simplification |
| Design contracts or interfaces | api-and-interface-design |
| Build web/native interaction | frontend-ui-engineering |

An approved specification can proceed through planning, building and verification
within existing authority. Reuse settled decisions and preserve unfinished tasks.
For documentation-only changes, use source/reference and scenario checks rather
than inventing runtime tests that repeat the prose.

## Keep layers distinct

Skills own procedures. Personas contribute one perspective. Commands are user entry
points and may orchestrate work. The user or command is the orchestrator; personas
do not invoke other personas. Independent review, when available and authorized,
uses separate read-only perspectives followed by a merge in the main context.
See [personas](docs/agents.md) and [orchestration](references/orchestration-patterns.md).

## Authoring and validation

Follow [CONTRIBUTING.md](CONTRIBUTING.md) and
[the format contract](docs/skill-anatomy.md). Before a new skill directory, complete
[the gap review](CONTRIBUTING.md#before-proposing-a-new-skill). Extend an existing
owner when the workflow overlaps it. Published identifiers and host adapter paths
are compatibility contracts; do not rename them merely to disguise similarity.

Use the repository's Node validators and relevant behavior tests. The commands and
check selection live in [local verification](CONTRIBUTING.md#local-verification).
Report structural checks, lexical routing and model/runtime results separately.
Preserve user edits, applicable notices, unfinished work and private data.
