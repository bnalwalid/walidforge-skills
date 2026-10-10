# WalidForge Engineering Style

Status: maintainer-selected defaults for original content authoring. These describe
explicit preferences, not conventions inferred from a reviewed personal codebase.

## Confirmed preferences

The pack serves all stacks. Design architecture and document important decisions
before implementation. Choose established engineering approaches according to the
project's actual constraints, rather than prescribing one architecture everywhere.
Current project requirements and explicit task instructions override pack defaults.

## The decision standard

Every material architectural decision records:

- **Situation:** the user outcome, constraints and evidence that require a choice.
- **Options:** credible alternatives and the tradeoffs that matter here.
- **Decision:** ownership, dependencies and why the selected approach fits.
- **Consequences:** complexity, failure behavior and operating costs accepted.
- **Proof:** acceptance criteria and the checks that can establish them.
- **Revisit trigger:** a concrete change that would justify another design.

Separate deployment topology, domain boundaries, dependency rules and communication
patterns. A modular application may use a worker and selected ports for external
systems without becoming a microservice platform. More layers or pattern names do
not establish a better design. Microsoft's [architecture styles guide](https://learn.microsoft.com/en-us/azure/architecture/guide/architecture-styles/)
likewise grounds selection in constraints and each style's tradeoffs.

## Documentation before implementation

Specify objectives and non-goals, ownership and contracts, relevant data flows,
normal and failure behavior, architecture rationale, repository commands and
verification strategy. Add migration, rollout and recovery where the feature
requires them. Record uncertainties instead of inventing workloads or guarantees.

Documentation depth follows decision impact. A local correction can use the existing
task; a change across trust or persistence boundaries needs explicit invariants and
recovery behavior. Detailed means useful to implement and review, not simply long.

## Cross-stack application

| Domain | Decisions the design must resolve when applicable |
|---|---|
| Backend | Rule/data ownership, consistency, authorization, concurrency and retries |
| Frontend | State ownership, async ordering, interaction states and accessibility |
| Mobile | Lifecycle interruption, durable offline state and account isolation |
| DevOps | Artifact identity, deployment constraints, rollout evidence and recovery |

Follow the current project's language and framework conventions. Do not introduce
a fixed folder hierarchy, cloud provider or framework on behalf of the maintainer.
Naming and formatting preferences remain project-specific until explicitly chosen.

## Authoring coverage and limits

All 25 skill workflow bodies now follow this authoring direction, including
[architecture](../skills/spec-driven-development/SKILL.md),
[planning](../skills/planning-and-task-breakdown/SKILL.md),
[implementation](../skills/incremental-implementation/SKILL.md) and
[verification](../skills/test-driven-development/SKILL.md).
The nine command entry points are aligned across the three host adapters.
Published skill identifiers, discovery metadata and host-required paths remain
compatibility contracts. Twelve supporting documents and the four persona bodies have also been
reauthored. Contributor rules, core adoption guides and hook operating guides have also
been rewritten around these decisions. Executable helpers, remaining host-specific
guides and evaluation assets have not all been independently reauthored.

Structural and routing checks establish packaging consistency. They do not prove
that a model follows the workflow or that the pack outperforms another collection.
Behavioral case definitions provide scenarios for further evaluation, including
17 newly authored cases and an executable quota/replay fixture. Local fixture checks
and workspace preparation have been exercised; reports distinguish those from actual
agent runs, which were not executed in this authoring pass. Established engineering practices naturally
overlap with other projects; no claim of worldwide uniqueness is made.

## Worked design: account document export

The setting is one existing application, a relational database, private artifact
storage and a background runner. Three developers maintain it. Files expire after
30 days; revoked members must lose download access. Jobs can be redelivered and
workers can restart. These are constraints, not reasons to invent a new stack.

1. Compare extending the existing application with cohesive export ownership
   against a separately deployed export service. Document operational costs and
   whether independent scaling/releases justify separation.
2. Specify request authorization, durable job identity, rendering completion,
   artifact lookup, current membership checks and expiration behavior. Resolve
   ambiguous cancellation and failure semantics before affected implementation.
3. Plan vertical outcomes: request/status, render/retrieve, then retry and
   lifecycle failure handling. Each outcome owns acceptance criteria and evidence.
4. Implement against focused behavioral checks. Verify duplicate delivery and
   persistence at their real boundary; test UI responses in reversed order.
5. Instrument committed requests, job wait/completion and failed downloads with
   safe correlation. Avoid account identifiers as unbounded metric labels.
6. Prepare a release verdict from the actual artifact, required journey checks,
   observed signals and a recovery path that accounts for existing data.

A new service, event sourcing or extra architectural layer becomes a candidate
when evidence changes the constraints. Its name alone does not improve this design.
