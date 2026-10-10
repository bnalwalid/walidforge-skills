---
name: using-agent-skills
description: Discovers and invokes agent skills. Use when starting a session, or when you need to decide which skill or workflow applies to the piece of work at hand. This is the meta-skill that governs how all other skills are discovered and invoked.
---

# Choose the Workflow That Resolves the Next Decision

## Overview

Route work by its actual intent and carry the project contract through design, implementation and evidence. Use specialized workflows when they answer the current need.

## When to Use

Use at session start or when selecting a skill for the next task. Skill availability and host execution capabilities must be checked rather than assumed.

## Process

### Identify the intent

Read the current user objective, authorization, project rules and existing artifacts. Distinguish explanation, design, implementation, diagnosis, review and release. Preserve earlier choices across turns; a status question does not cancel the active task.

### Select the owner of the next decision

| Need | Workflow |
|---|---|
| Clarify an underspecified outcome | `interview-me` or `idea-refine` |
| Specify behavior and architecture | `spec-driven-development` |
| Schedule established requirements | `planning-and-task-breakdown` |
| Implement an authorized slice | `incremental-implementation` and relevant `test-driven-development` |
| Reproduce a failure | `debugging-and-error-recovery` |
| Explain or resume a codebase | `context-engineering` |
| Design a public/module contract | `api-and-interface-design` |
| Build web/native interaction | `frontend-ui-engineering` |
| Observe browser behavior | `browser-testing-with-devtools` |
| Preserve behavior while simplifying | `code-simplification` |
| Review a change | `code-review-and-quality` |
| Protect a trust boundary | `security-and-hardening` |
| Improve measured performance | `performance-optimization` |
| Make operating behavior visible | `observability-and-instrumentation` |
| Establish a quality contract | `constraint-driven-development` |
| Verify framework/library facts | `source-driven-development` |
| Challenge an uncertain consequential claim | `doubt-driven-development` |
| Automate verification and delivery | `ci-cd-and-automation` |
| Migrate an existing consumer/data contract | `deprecation-and-migration` |
| Document reasons or behavior | `documentation-and-adrs` |
| Organize history or versions | `git-workflow-and-versioning` |
| Prepare a release decision | `shipping-and-launch` |

Load the selected skill through the host's skill mechanism, or read its `SKILL.md`
when the host provides no invocation tool. Use only workflows actually available.
Personas contribute a review perspective; commands choose orchestration. A persona
does not invoke other personas.

### Carry the architectural contract

WalidForge defaults to architecture and useful documentation before implementation,
across all stacks. Reuse settled decisions instead of writing duplicate specs.
Choose patterns from constraints, preserve framework idioms and trace implementation
tasks to acceptance criteria. A local correction can use its existing task contract.

### Keep evidence and authority distinct

State confirmed inputs and consequential assumptions. Resolve contradictions rather
than concealing them. Verify claims with the actual project commands/runtime and
report unavailable environments. A passing test is not permission to publish,
deploy, send a message or erase unrelated work.

When verification fails, route to diagnosis before continuing dependent work. When
facts change a decision, update the relevant spec/task and explain the consequence.
Do not lower checks simply to obtain green results.

### Deliver a useful handoff

Report outcome, important decision, proof, limits and next incomplete action where
one remains. Use plain language that a developer can act on. Do not claim independent
review, production execution or native behavior that was not observed.

The optional read-only Project Doctor is `node scripts/forge.js doctor [project-directory]`
when this whole checkout is available. It inventories supported metadata, not overall
quality, and need not be installed to use an individual skill.

## Common Rationalizations

| Shortcut | Correction |
|---|---|
| Every request needs every workflow | Choose the next decision owner and load only relevant skills. |
| The skill authorizes release | Follow the actual user and project authority boundary. |

## Red Flags

- A design-only request becomes application implementation.
- A unavailable tool is described as having run.
- The same architecture is imposed across every stack.

## Verification

- [ ] The selected workflow matches the next actual decision.
- [ ] Confirmed inputs, assumptions and authority are distinguished.
- [ ] Evidence matches the claim and target runtime.
- [ ] The result preserves user scope and a restartable handoff.

## Relevant Resources

Use [the shared completion criteria](../../references/definition-of-done.md) when evaluating task completion.
