# Start With the Project You Already Have

WalidForge is a collection of developer workflows for agents that can load Markdown
instructions. It adds a way to reason and verify; it does not require replacing your
framework, folder layout or existing engineering process.

## Choose an outcome

Ask for a concrete result: explain a code path, diagnose a failing test, design a
feature, implement an approved slice or review a release. The owning workflow uses
your project's source, constraints and verification commands. See
[the engineering style](walidforge-style.md) for the design standard.

For an unfamiliar project, start with `context-engineering`. With a whole checkout,
Project Doctor can inspect supported root metadata without executing project scripts:

```bash
node scripts/forge.js doctor /path/to/project --json
```

Its command suggestions and ready-to-inspect status are discovery evidence, not
passing tests or a quality verdict. See [the handbook](developer-handbook.md).

## Load the right artifact

Use your host's documented installation and activation mechanism. If it supports
native skill discovery, install the individual workflows and let their descriptions
select the relevant entry point. If it accepts only prompts/rules, read or attach
the selected `skills/<name>/SKILL.md` to the task context.

When native discovery is absent, `using-agent-skills` supplies an intent table.
Avoid adding a second always-on router to a host that already discovers skills.
The optional session-start hook is for compatible hosts that need that injection;
it is not automatically registered by the plugin.

A whole-pack install and a single-skill copy carry different resources. Pack-level
references, personas, command adapters and Project Doctor are not guaranteed to
accompany a per-skill install. Essential workflow instructions live in each entry
point; unavailable optional resources should be reported honestly.

Do not copy this repository's root AGENTS.md or CLAUDE.md into your application.
Those configure contributors to WalidForge itself.

## Design, build and show the proof

For a substantial feature, define behavior and architecture with
`spec-driven-development`, plan outcomes with `planning-and-task-breakdown`, then
use `incremental-implementation` and relevant `test-driven-development` checks.
Re-use existing approved specs and project artifact conventions. Default files are
SPEC.md or docs/SPEC.md, tasks/plan.md and tasks/todo.md; a designated external
specification or tracker remains authoritative.

Choose architecture according to ownership, workload, compatibility and operating
constraints. A local correction can use its established task contract. The workflow
does not impose a microservice platform or mandatory documentation volume.

## Working across sessions

Preserve the objective, active spec/task, architectural decisions, relevant source
locations, changed files, current check outcomes and next incomplete action. Use
`context-engineering` to compare stale plans against actual code and current evidence.
Earlier approval remains valid within its scope; new consequential decisions need
resolution, rather than a repeated confirmation for every turn.

## Know what was established

A lexical routing result does not prove host activation. A unit test does not prove
native lifecycle or production recovery. Distinguish observed, inferred, unavailable
and not-run checks. Review the actual runtime/authorization boundary before release.

Follow [gradual adoption](adoption-guide.md) and [host-specific guidance](other-hosts.md)
for your situation. Host capability varies; verify installation interfaces against
the installed host rather than assuming Markdown compatibility guarantees all tools.
