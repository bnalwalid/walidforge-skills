---
name: spec-driven-development
description: Creates specs before coding. Use when starting a new project, feature, or significant change and no specification exists yet. Use when drafting a PRD or requirements document with objectives and scope, or when requirements are unclear, ambiguous, or only exist as a vague idea. Use when a single requirement spans several independently testable capabilities and needs decomposing into a capability map of modules before specifying.
---

# Architecture Before Implementation

## Overview

Turn a requested outcome into a design that another developer can implement and
review without guessing its boundaries. WalidForge defaults to documented
architecture before implementation, across languages and platforms. Choose an
architecture for the actual constraints; a pattern name is not a justification.

## When to Use

Use for a new capability, unclear requirements, or a change that alters ownership,
data flow, contracts or deployment. For a local correction with an established
contract, record its acceptance condition in the existing task rather than creating
an architectural dossier. Reuse an approved specification when it already applies.

## Process

### 1. Establish the decision inputs

Read the request, relevant source, existing architecture decisions and repository
instructions. Separate confirmed requirements, observations from code, provisional
assumptions and unanswered questions. Cite source paths for repository facts.

Record the user outcome, consumers, non-goals, compatibility constraints, data
sensitivity, workload evidence and who will operate the result. Unknown traffic,
budgets or latency targets remain unknown; propose a measurement or ask a focused
question when the answer changes the design. Do not substitute invented numbers.

Use the current stack and conventions unless the task provides a reason to change
them. A framework installed elsewhere says nothing about this project's needs.

### 2. Decide whether the request needs a capability map

If independently testable capabilities have separate consumers, data or acceptance
criteria, propose a small map before drafting their specifications:

| Module id | Owned responsibility | Required provider contracts |
|---|---|---|
| identity | Account identity and membership | — |
| exports | Export requests and artifact lifecycle | identity |
| delivery | Sending artifact availability notices | exports |

Use stable kebab-case ids and a dependency order that can drive implementation.
A module is a responsibility boundary, not automatically a service or deployment.
Show one-way source dependencies. If a proposed cycle appears, inspect ownership
and contracts: moving a contract, introducing a coordinator or combining inseparable
responsibilities can resolve it. Runtime callbacks do not by themselves prove a
source dependency cycle.

Present the map for approval before per-module specifications unless those exact
boundaries are already authorized. Store the approved map at the project root with
an explicit index of module specifications such as `SPEC-exports.md`. Specify each
module against its own criteria and provider contracts rather than repeating the
whole initiative. A single capability proceeds directly to the next step.

### 3. Compare architectures against the constraints

Compare the current design, the smallest credible extension and a materially
different option when it could solve a real requirement. Evaluate these separate
choices rather than bundling every fashionable pattern together:

| Choice | Evidence to consider |
|---|---|
| Deployment topology | Independent releases, scaling, failure isolation, operational capacity |
| Domain boundaries | Who owns each rule and record; which changes belong together |
| Dependency structure | Test seams, external systems and existing framework conventions |
| Communication | Required consistency, response time, retries and delivery semantics |

For each viable option record fit, costs, failure modes and reason for selection
or rejection. Start with cohesive modules inside the existing deployment when that
meets the requirements. Separate services when their benefits justify distributed
operations and consistency costs. Use dependency inversion where it creates a
useful boundary; do not wrap every framework primitive. Apply domain modeling,
CQRS or event-driven processing only to an identified problem.

Record a decision with its consequences and a concrete reconsideration trigger.
An architecture diagram must label ownership, request/data flow, trust boundaries
and synchronous versus asynchronous work. It must agree with the written design.

### 4. Specify behavior through the boundaries

Describe the normal path and relevant failure paths. Include inputs, outputs,
authorization ownership, state transitions and invariants. Make retries,
cancellation, partial completion and incompatible clients explicit where applicable.

Select concerns from the feature rather than forcing every domain into every spec:

- Backend: transaction scope, concurrent writes, tenant isolation and external effects.
- Frontend: request races, interaction states, accessibility and state ownership.
- Mobile: interrupted lifecycle, offline persistence, account switching and recovery.
- Operations: artifact identity, configuration, rollout signals and data-aware recovery.

Example: a document export can remain one application with a background worker.
The request authorizes the account and records durable job ownership; the worker
renders an artifact and records completion. Retried work must not expose another
account's file. Downloads recheck authorization and expiration. Worker separation
alone does not require separate services or databases. The spec must decide what
happens on duplicate delivery, interrupted rendering and expired artifacts before
implementation begins.

### 5. Write a specification developers can use

Save to `SPEC.md` or `docs/SPEC.md` unless the project already has an external
specification system; retain that system's artifacts rather than duplicating them.
Include the following content at a depth proportionate to the decision:

1. **Objective and scope:** user outcome, non-goals and observable acceptance criteria.
2. **Architecture:** options, chosen boundaries, rationale, data flow and consequences.
3. **Contracts and behavior:** ownership, ordinary/failure paths and compatibility.
4. **Commands:** exact build/test/check invocations supported by repository evidence;
   label unverified commands and missing prerequisites. Avoid destructive auto-fix flags.
5. **Project structure and code style:** actual implementation/test locations, relevant
   naming/error conventions and a representative existing example when available.
6. **Testing strategy:** map each important invariant to a test level and observable
   result, including integration boundaries that a mock cannot establish.
7. **Operational lifecycle:** applicable rollout, observability, migration and recovery.
8. **Boundaries and open decisions:** work already authorized, decisions needing input,
   prohibited actions and unresolved assumptions with their impact.

Detailed documentation means resolved decisions and usable contracts, not a target
page count. Keep optional concerns explicitly inapplicable when that explains scope.
Do not invent code samples and present them as the maintainer's historical style.

### 6. Hand off according to the authorized scope

For a specification-only request, deliver the document and open decisions without
implementation. Where design approval is required and absent, request review of the
concrete document and stop dependent work. Existing approval remains valid; do not
require another turn solely to repeat it. Changed scope or consequential unanswered
questions need resolution before the affected implementation proceeds.

If planning and implementation are authorized, use `planning-and-task-breakdown`
for the plan in `tasks/plan.md` and tasks in `tasks/todo.md`, or the designated external
tracker. Preserve unfinished work and identify the selected module. Continue with
`incremental-implementation` and appropriate `test-driven-development` verification.
Use `context-engineering` to load the selected contracts and source boundaries.

Update the specification when implementation evidence changes a decision. Explain
what changed, its effect on acceptance criteria and whether existing authorization
still covers the new approach. Never report a drafted test strategy as passing tests.

## Common Rationalizations

| Shortcut | Required correction |
|---|---|
| "Senior architecture means microservices" | Show the isolation or release need and the operational tradeoff. |
| "All stacks need the same layers" | Preserve idiomatic project structure and justify each new boundary. |
| "We can decide failure behavior in code" | Specify the invariant and recovery outcome before building the affected path. |
| "Detailed design must predict everything" | Identify uncertainty and the experiment that will resolve it. |
| "Approval means every later decision is approved" | Check whether new scope or consequences exceed the actual authorization. |

## Red Flags

- Architecture chosen before reading constraints or existing code.
- A directory diagram with no ownership, contracts or failure behavior.
- Assumed workload or compliance requirements presented as facts.
- Multiple independently testable capabilities hidden in one undifferentiated spec.
- A rollback claim that ignores already-written data or external effects.
- A document whose commands, diagrams and acceptance criteria contradict each other.

## Verification

- [ ] Requirements, source observations and assumptions are distinguishable.
- [ ] The architecture has a stated reason, meaningful alternatives and revisit criteria.
- [ ] A required capability map is approved and each spec identifies its stable module.
- [ ] Applicable authorization, concurrency and lifecycle invariants have failure cases.
- [ ] Commands and code conventions are grounded in this repository.
- [ ] Acceptance criteria have planned evidence; executed checks are reported separately.
- [ ] Documents use existing artifact conventions and preserve unfinished work.
- [ ] The handoff respects specification-only scope and any unresolved approval boundary.
