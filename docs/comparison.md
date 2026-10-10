# Choosing an Engineering Workflow

WalidForge is a portable workflow pack, not a runtime or a replacement for your
project's engineering judgment. Choose it when you need consistent decisions
across backend, frontend, mobile and DevOps work.

## Evaluate fit

| Need | What to inspect |
|---|---|
| A small bug fix | Reproduction, focused tests and a review proportional to the change |
| A cross-stack feature | Contract ownership, vertical slices and integration evidence |
| An offline mobile flow | Durable local state, lifecycle recovery and account-safe reconciliation |
| A stateful release | Mixed-version compatibility, rollout signals and data-aware recovery |
| Team adoption | Clear ownership, shared acceptance criteria and maintainable project conventions |
| Skill quality | Discovery accuracy, distinct responsibilities and observable behavioral outcomes |

Run the pack on representative tasks from your own repository. Record stack,
model/runtime, task, actual checks, outcome and remaining evidence gaps. No
external benchmark or endorsement is implied by this project.

## Combine carefully

Use the host's native discovery when available. Otherwise, load the
`using-agent-skills` discovery workflow. Avoid two always-on routers competing
for the same task. Individual specialist skills can coexist when their scope,
authorization and verification contracts are clear.

Start with a relevant workflow, preserve the project's stack, and expand adoption
only when the observed outcome justifies it. See [adoption guidance](adoption-guide.md)
and [evaluations](../evals/README.md).

## What was compared

A public-source review on 2026-10-11 looked at
[Superpowers](https://github.com/obra/superpowers),
[a mobile skill collection](https://github.com/almasumdev/awesome-mobile-agent-skills),
and [a full-lifecycle collection](https://github.com/arjunprabhulal/agent-skills).
Their README material demonstrates overlapping workflow and domain coverage;
this was a qualitative review, not an execution benchmark or exhaustive survey.

WalidForge's current product choices combine a read-only metadata diagnosis CLI,
command provenance, practical task entry points, cross-domain failure scenarios
and an outcome-to-evidence handoff. Inspect
[the CLI](../scripts/forge.js), [its tests](../scripts/forge-test.js),
[the handbook](developer-handbook.md) and [the cases](../evals/cases/).
This combination describes what was implemented here; worldwide exclusivity,
superior model results and support for every developer stack remain unproven.
