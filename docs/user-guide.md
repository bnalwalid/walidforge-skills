# WalidForge User Guide

Use WalidForge to understand a project, design a change, implement it in verified
steps and prepare it for release. The pack contains 25 Markdown skills, four review
personas, host-specific command adapters and two local developer tools.

Skills guide your coding assistant. Project Doctor and Change Compass are Node
programs you run locally. Installing a skill does not automatically install the
CLI, command adapters or every shared reference.

## Contents

- [Quick start](#quick-start)
- [Choose your installation](#choose-your-installation)
- [Confirm the integration](#confirm-the-integration)
- [Write a useful request](#write-a-useful-request)
- [Choose a workflow](#choose-a-workflow)
- [Complete example: fix duplicate invoices](#complete-example-fix-duplicate-invoices)
- [Plan and build a feature](#plan-and-build-a-feature)
- [Everyday examples](#everyday-examples)
- [Use Project Doctor](#use-project-doctor)
- [Use Change Compass](#use-change-compass)
- [Commands and review personas](#commands-and-review-personas)
- [Continue across sessions](#continue-across-sessions)
- [Troubleshooting](#troubleshooting)
- [Verify your WalidForge checkout](#verify-your-walidforge-checkout)
- [Further reading](#further-reading)

## Quick start

1. Install the desired skills using your host's setup guide, or load the selected
   `SKILL.md` as task context. See [installation choices](#choose-your-installation).
2. Open the application you want to work on in your coding assistant.
3. Describe one outcome and its acceptance criteria:

   > Use debugging-and-error-recovery and test-driven-development. Reproduce the
   > duplicate invoice created when the same request is retried. Add a failing
   > regression, fix the cause and run the relevant checks. Preserve existing
   > behavior outside this fix. Report checks actually run and remaining limits.

4. Inspect the result: changed behavior, relevant diff, executed checks and any
   unverified runtime boundaries. A written test plan is not a test result.

For orientation without editing, start with:

> Use context-engineering. Trace an actual request from entry point through the
> business rule and persistence to the response. Cite source paths and identify
> the project's canonical checks. Keep application code unchanged.

## Choose your installation

### Whole checkout

Choose a checkout when you want shared references, personas, adapters and CLI tools.
Git is needed for cloning. Node is needed only for the local tools and validators;
your application can use any language. The repository validation workflow uses
Node 22. The CLI uses Node built-ins and needs no `npm install` in this checkout.

```bash
git clone https://github.com/bnalwalid/walidforge-skills.git
cd walidforge-skills
node scripts/forge.js --help
```

Cloning downloads the assets; it does not register skills with your assistant.
Use your host's installer/discovery mechanism or load a selected skill file into
the task context. Run the local tools from this checkout or use its absolute path
while working elsewhere:

```bash
node /path/to/walidforge-skills/scripts/forge.js doctor /path/to/application
```

### Native host installation

Use the setup document for your host and confirm the interface against your
installed version. These guides are integration instructions, not a record that
every installation has been exercised.

| Host | Setup guide | What to confirm |
|---|---|---|
| Codex | [Codex setup](codex-setup.md) | Marketplace/plugin or skill discovery, available resources |
| Gemini CLI | [Gemini setup](gemini-cli-setup.md) | Native skills and command adapter availability |
| Cursor | [Cursor setup](cursor-setup.md) | Project/user skill discovery and existing rules |
| Copilot | [Copilot setup](copilot-setup.md) | Supported skill or prompt integration |
| Copilot CLI | [Copilot CLI setup](copilot-cli-setup.md) | Installed version and skill discovery |
| Antigravity | [Antigravity setup](antigravity-setup.md) | Skill loading and workspace configuration |
| Windsurf | [Windsurf setup](windsurf-setup.md) | Workflow context and rule integration |
| CommandCode | [CommandCode setup](commandcode-setup.md) | Installed interface and entry points |
| Claude Code | [Command adapters](#commands-and-review-personas) and the local `.claude-plugin/` manifests | Host plugin installation, discovery and command namespace |
| Another host, including OpenCode | [Portable host integration](other-hosts.md#adapting-another-host) | How the host loads Markdown skills and exposes tools |

For hosts without native discovery, ask the assistant to read the chosen entry
point, for example `/path/to/walidforge-skills/skills/context-engineering/SKILL.md`,
then apply it to the requested task. If the host cannot read local files, attach
that entry point using its supported context mechanism. Check linked resources
when the workflow needs them.

### Individual skills

A per-skill installation is useful when you need a small workflow set. Confirm
that it includes the selected entry point and any supporting files it references.
The shared pack-level `references/`, `agents/`, adapters and `scripts/forge.js`
may be absent. Use the full checkout when those resources are needed.

Keep your application's existing configuration. The root `AGENTS.md` and
`CLAUDE.md` in WalidForge configure work on this repository; they are not templates
for your application. Let native discovery load skills on demand instead of
pasting the entire catalog into always-on rules.

## Confirm the integration

Before a substantial task, use an isolated sample project or a read-only request:

> Identify the WalidForge skills available in this session. Use context-engineering
> to explain this project's entry points and validation commands with source
> evidence. Report unavailable resources. Do not change files.

Confirm the selected workflow is available through the host's actual skill loader
or trace, when exposed. Verify the returned file references against the project.
A list repeated in chat does not prove the host loaded the skill.

If command wrappers are missing, invoke the underlying skill by name in the
request. If tools are unavailable, request the concrete manual verification steps
and an explicit not-run result. For CLI availability, run `--help` from the full
checkout. An older checkout may need updating before Compass is available.

## Write a useful request

Give the assistant an outcome, relevant context and observable acceptance criteria.
Mention an approved spec or issue when it already exists.

```text
Outcome: Allow account owners to export their invoices.
Context: Use the existing API, worker and storage conventions. Read the current
account authorization code and export flow before proposing a design.
Acceptance: Only the owning account can request and download an export; retries
produce one durable result; an expired export cannot be downloaded.
Scope: Document architecture and plan first, then implement the authorized plan
in verified slices. Preserve unrelated work. Do not deploy or publish.
Evidence: Report changed behavior, exact checks run, results and untested boundaries.
```

Use source identifiers or paths when they are known. Do not provide credentials
or production customer data as task context. A short local correction can use its
existing contract; it does not need a new architectural dossier.

## Choose a workflow

You can name the skill explicitly or describe the outcome and use the host's
native discovery. Load the workflows relevant to the changed boundary.

| Need | Skill | Expected result |
|---|---|---|
| Discover the workflow | [using-agent-skills](../skills/using-agent-skills/SKILL.md) | Intent-to-workflow selection when native discovery is absent |
| Understand or resume a project | [context-engineering](../skills/context-engineering/SKILL.md) | Source-backed context and current work state |
| Resolve unclear requirements | [interview-me](../skills/interview-me/SKILL.md) | Focused questions resolving consequential uncertainty |
| Develop a raw idea | [idea-refine](../skills/idea-refine/SKILL.md) | Alternatives, assumptions and an actionable direction |
| Design before coding | [spec-driven-development](../skills/spec-driven-development/SKILL.md) | Acceptance contract, architecture and failure behavior |
| Set engineering constraints | [constraint-driven-development](../skills/constraint-driven-development/SKILL.md) | Measured baselines, proposed rules and explicit gates |
| Order the work | [planning-and-task-breakdown](../skills/planning-and-task-breakdown/SKILL.md) | Dependency-ordered, verifiable outcomes |
| Implement approved work | [incremental-implementation](../skills/incremental-implementation/SKILL.md) | Small complete slices with evidence |
| Establish behavioral proof | [test-driven-development](../skills/test-driven-development/SKILL.md) | Observed failing check, correction and regression verification |
| Diagnose a failure | [debugging-and-error-recovery](../skills/debugging-and-error-recovery/SKILL.md) | Reproduction, root cause and a verified correction |
| Verify unfamiliar APIs | [source-driven-development](../skills/source-driven-development/SKILL.md) | Decisions grounded in actual source and authoritative contracts |
| Challenge a risky assumption | [doubt-driven-development](../skills/doubt-driven-development/SKILL.md) | A bounded experiment resolving uncertainty |
| Design an API or contract | [api-and-interface-design](../skills/api-and-interface-design/SKILL.md) | Ownership, compatibility, authorization and failure semantics |
| Build web or mobile UI | [frontend-ui-engineering](../skills/frontend-ui-engineering/SKILL.md) | State ownership, accessible interaction and lifecycle behavior |
| Test a browser journey | [browser-testing-with-devtools](../skills/browser-testing-with-devtools/SKILL.md) | Runtime observations and reproducible interaction evidence |
| Review a change | [code-review-and-quality](../skills/code-review-and-quality/SKILL.md) | Consequence-based findings against the actual diff |
| Simplify working code | [code-simplification](../skills/code-simplification/SKILL.md) | Less complexity with preserved behavior |
| Assess trust boundaries | [security-and-hardening](../skills/security-and-hardening/SKILL.md) | Concrete security findings and relevant checks |
| Improve performance | [performance-optimization](../skills/performance-optimization/SKILL.md) | Measured bottleneck, targeted change and comparison |
| Automate delivery | [ci-cd-and-automation](../skills/ci-cd-and-automation/SKILL.md) | Verified pipeline and infrastructure decisions |
| Make behavior observable | [observability-and-instrumentation](../skills/observability-and-instrumentation/SKILL.md) | Useful signals tied to real failure modes |
| Prepare a launch | [shipping-and-launch](../skills/shipping-and-launch/SKILL.md) | Bounded GO/NO-GO decision, rollout and recovery |
| Organize Git work | [git-workflow-and-versioning](../skills/git-workflow-and-versioning/SKILL.md) | Reviewable commits and preserved existing work |
| Migrate a contract | [deprecation-and-migration](../skills/deprecation-and-migration/SKILL.md) | Compatibility-aware transition and removal criteria |
| Document behavior or decisions | [documentation-and-adrs](../skills/documentation-and-adrs/SKILL.md) | Accurate documentation and recorded architectural rationale |

## Complete example: fix duplicate invoices

The following is an illustrative workflow, not a claim that your application has
these files or that its tests have passed. Replace identifiers with the real ones.

### 1. Understand the affected boundary

> Use context-engineering to trace invoice creation and request retry behavior.
> Identify the rule owner, transaction boundary, external effects and existing
> tests. Cite actual paths and confirm canonical check commands. Do not edit yet.

With the full checkout, obtain local discovery evidence:

```bash
node scripts/forge.js doctor /path/to/application --json
node scripts/forge.js compass /path/to/application --intent "invoice retry" --kind bug --json > /tmp/invoice-compass.json
```

Compass needs matching filename identifiers. Its candidates are investigation
leads, not confirmed impact. Keep the snapshot outside the application.

### 2. Establish the intended behavior

> Reproduce the duplicate invoice when the same intent is retried after a lost
> response. Confirm whether the contract requires one durable invoice. Identify
> what is already guaranteed and what needs a decision before implementation.

For a changed transaction or API contract, document the architectural decision
with `spec-driven-development` before building. Reuse an approved contract when
it already covers the correction.

### 3. Implement and verify

> Use debugging-and-error-recovery, incremental-implementation and
> test-driven-development. Observe a failing regression for the confirmed retry
> contract, fix the root cause and verify normal requests and relevant concurrent
> retries. Use the actual persistence boundary when needed. Preserve unrelated work.

Ask for exact commands, observed results and environment limits. A mocked storage
check does not establish the database's concurrency behavior.

### 4. Review the result

```bash
node scripts/forge.js compass /path/to/application --review --baseline /tmp/invoice-compass.json
```

Inspect changed candidates, untouched candidates and unmatched changes. The saved
Git commit is the comparison base; any pre-existing dirty work is included.
Untouched candidates may not need editing. Unmatched changes need inspection,
not an automatic defect verdict.

> Use code-review-and-quality to review the actual diff against the retry contract.
> Check tenant boundaries, durable effects and verification evidence. Report
> concrete consequences and checks that remain unrun.

The final handoff should say what changed, which regression passed and what still
needs runtime verification. Publication and deployment use their actual authority.

## Plan and build a feature

For significant new behavior, use this sequence:

1. **Define:** resolve missing requirements with `interview-me`; use
   `spec-driven-development` for architecture, contracts and acceptance criteria.
2. **Plan:** use `planning-and-task-breakdown` for small complete outcomes with
   dependencies and observable verification.
3. **Build:** use `incremental-implementation` with relevant behavioral tests.
4. **Verify:** exercise the boundary the claim depends on, such as the database,
   browser, device or provider sandbox.
5. **Review:** inspect the actual diff, required security/performance concerns and
   evidence gaps.
6. **Prepare release:** establish rollout criteria and data-aware recovery before
   an authorized deployment.

Default artifacts are `SPEC.md` or `docs/SPEC.md`, `tasks/plan.md` and
`tasks/todo.md` in **your application**. An existing external spec/tracker stays
canonical. These paths are workflow outputs; the WalidForge checkout does not
need a root `tasks/` directory to function. Preserve another objective's unfinished
artifacts and resolve their destination before overwriting anything.

For planning only:

> Use spec-driven-development and planning-and-task-breakdown. Design account-scoped
> invoice exports using our existing stack. Document retry, expiry and authorization
> behavior. Produce the spec and ordered plan for review; do not implement yet.

For authorized implementation:

> Implement the approved invoice-export plan in verified slices. Continue remaining
> dependency-ready tasks within this scope. Preserve unrelated changes, report
> unavailable checks, and resolve missing consequential decisions before dependent
> work. Do not deploy or publish.

The architecture should fit the project's constraints. Naming a pattern does not
justify a new service, queue or generic abstraction.

## Everyday examples

| Situation | Copyable request |
|---|---|
| Backend/API | Use api-and-interface-design. Design this endpoint against existing account ownership, transaction and compatibility rules. Specify duplicate requests and partial failure before implementation. |
| Frontend search | Use frontend-ui-engineering and test-driven-development. Keep the newest search results when responses arrive out of order. Verify stale success/error responses, keyboard interaction and recovery. Report browser coverage separately. |
| Mobile offline save | Use frontend-ui-engineering. Design account-scoped durable intent across process recreation, reconnect and account switching. Implement the authorized change and report actual device coverage. |
| Legacy refactor | Use code-simplification. Characterize the affected behavior, simplify ownership and preserve outputs, errors and side effects. Avoid unrelated modernization. |
| Performance | Use performance-optimization. Measure the reported slow path in a representative environment, identify the bottleneck and compare the targeted change with the baseline. Do not invent a latency target. |
| Security review | Use security-and-hardening. Review this diff for authorization across accounts, unsafe input handling and sensitive-data exposure. Cite triggering conditions and verify findings. |
| CI change | Use ci-cd-and-automation. Improve this pipeline using its actual commands and trust boundaries. Explain artifact provenance, required permissions and recovery; distinguish configuration checks from hosted execution. |
| Migration | Use deprecation-and-migration. Plan this API transition for existing clients, with compatibility checks, rollout order, recovery and a removal condition. |
| Observability | Use observability-and-instrumentation. Add signals for failed export delivery without logging sensitive payloads. Tie alerts to an observable symptom and operator action. |
| Documentation | Use documentation-and-adrs. Update the setup guide from actual configuration and CLI behavior. Separate executed examples from unverified host instructions. |
| Release | Use shipping-and-launch. Prepare a GO/NO-GO assessment for this revision and environment, with blockers, rollout criteria and data-aware recovery. Do not deploy yet. |

## Use Project Doctor

```bash
node scripts/forge.js doctor /path/to/application
node scripts/forge.js doctor /path/to/application --json
```

Doctor reads supported root metadata and reports ecosystem/framework markers,
command provenance, conflicts and next discovery steps. It does not recursively
inspect workspace packages. Run it against the package involved in your change.

| Output | Interpretation |
|---|---|
| `declared` command | Supported metadata declares the script and supports its manager invocation |
| `candidate` command | A conventional command could fit an observed marker; confirm locally |
| `needs-attention` | Discovery found an ambiguity or follow-up |
| `ready-to-inspect` | No metadata findings; inspection and checks still remain |
| No test command | No test invocation discovered from supported metadata; inspect README and CI |

Doctor never runs discovered scripts, installs dependencies, writes to the target
or calls the network. A declared script can still be unsafe or fail. Exit 0 means
diagnosis completed, not that the project passed verification. Exit 2 means invalid
usage or an unreadable project. See [the handbook](developer-handbook.md) for
supported markers and metadata limits.

## Use Change Compass

### Create a planning snapshot

```bash
node scripts/forge.js compass /path/to/application --intent "add account permissions" --kind feature
node scripts/forge.js compass /path/to/application --intent "invoice retry" --kind bug --json > /tmp/invoice-compass.json
```

`--intent` is required for planning and accepts 1–2000 characters. `--kind`
accepts `feature` or `bug` and defaults to `feature`. Omit the directory to inspect
the current working directory. Use `--json` for the versioned machine-readable
report; plain output is easier to review interactively.

The report includes filename-token candidates, possible direct relative references,
test candidates, decisions, an ordered plan and Doctor verification commands.
Matching is lexical, not semantic analysis or automatic translation. No matches
means unknown impact, not that no files need changing.

The source scan is bounded to 5000 entries, depth 12, 128 KiB per source file and
4 MiB total. Symlinks and built-in excluded paths are skipped; `.gitignore` is not
parsed for source discovery. The scan is not a secret detector. It does not emit
source bodies, but paths and your intent appear in the report.

### Review later changes

```bash
node scripts/forge.js compass /path/to/application --review --baseline /tmp/invoice-compass.json --json
```

Review requires a baseline for the same project and reuses its intent/kind; do not
add `--intent` or `--kind` to this invocation. It compares the saved HEAD commit
against the current worktree, including later commits, staged/unstaged changes
and non-ignored untracked files. Moves appear as deletion/addition.

| Review field | Meaning |
|---|---|
| `changed_candidates` | Saved candidate paths that changed |
| `untouched_candidates` | Saved candidates that did not change; not mandatory edits |
| `unmatched_changes` | Changes absent from the saved candidate set; inspect their purpose |
| `status: unavailable` | Required Git evidence could not be read |
| `check_results: []` | No actual check results are collected by Compass |
| `completion: not-established` | Implementation completion remains unproven |

The baseline is a Git commit, not a worktree copy. Pre-existing dirty changes are
included. A non-Git project, unborn repository, selected Git subdirectory, missing
baseline object or read limit can make review unavailable. Invalid, oversized,
symlinked or cross-project baseline files fail with exit 2. Save fresh snapshots
when moving the project or changing the objective.

Compass uses bounded read-only Git commands; it disables optional locks and
filesystem monitor execution, and avoids external diff/text-conversion helpers.
It does not execute application checks. See [the complete Compass contract](change-compass.md).

## Commands and review personas

The checkout contains nine command adapters. Their availability and exact syntax
are determined by the installed host. These are chat entry points, not shell
commands; use the host's displayed namespace. Without adapters, name the underlying
workflow in a normal request.

| Entry point | Purpose | Underlying workflow |
|---|---|---|
| `/spec` | Define scope and architecture | spec-driven-development |
| `/plan` | Order verifiable outcomes | planning-and-task-breakdown |
| `/build` | Implement the next ready task | incremental-implementation and test-driven-development |
| `/test` | Exercise behavior and investigate failures | test-driven-development and debugging-and-error-recovery |
| `/review` | Review the actual change | code-review-and-quality |
| `/ship` | Prepare a release decision | shipping-and-launch |
| `/constraints` | Establish measurable constraints | constraint-driven-development |
| `/code-simplify` | Reduce complexity while preserving behavior | code-simplification |
| `/webperf` | Diagnose and improve measured browser performance | performance-optimization and browser-testing-with-devtools |

Where the adapter is available, `/build` without arguments selects one ready task;
`/build auto` or `/build all` continues the remaining authorized plan. The Gemini
and generic TOML adapters use `planning` for the plan entry. Hosts with native skill
discovery do not necessarily install these wrappers.

Four personas provide focused perspectives: `code-reviewer`, `security-auditor`,
`test-engineer` and `web-performance-auditor`. The user or command orchestrator
selects them; personas do not spawn each other. Independent review depends on
host capabilities and authority. A direct review should disclose when independent
review was not performed. See [personas and composition](agents.md).

## Continue across sessions

Save a short handoff in your existing issue, plan or project notes:

```text
Objective: Fix invoice retries without changing unrelated billing behavior.
Contract: The approved spec/issue and relevant acceptance criteria.
Current state: Completed tasks, changed paths and relevant revision.
Evidence: Exact commands, results and environment used.
Limits: Integration/device/provider checks not run and why.
Next action: The next incomplete dependency-ready task.
```

Then request:

> Use context-engineering to reconcile this handoff with current source, Git changes
> and check results. Preserve unfinished work and continue the next authorized task.
> Do not repeat completed side effects.

Recheck saved Compass evidence if the objective, project location or relevant
architecture changed. Previous approval covers its original scope, not unrelated
features or publication.

## Troubleshooting

| Symptom | What to inspect or do |
|---|---|
| Skill does not activate | Verify native installation/discovery, reopen the session if required by the host, or explicitly load the selected `SKILL.md` |
| Shared reference is missing | Check whether installation copied only the skill directory; use the full checkout when the resource is needed |
| Slash command is unknown | Verify adapter installation and host namespace; invoke the owning skill directly |
| Agent writes code before design | Request spec/plan-only work explicitly and point to the existing architectural contract |
| Too many rules or repeated workflows | Keep native discovery authoritative; avoid preloading the full catalog into global context |
| Doctor reports the wrong package | Run against the relevant monorepo package, then inspect its README/CI |
| Doctor finds no checks | Inspect project documentation, task runners and CI; do not treat discovery limits as absent tests |
| Compass finds no candidates | Include actual filename identifiers or start with manual context discovery |
| Compass coverage is partial | Inspect skipped paths and limits; narrow the selected directory for planning or perform targeted manual inspection |
| Compass review is unavailable | Check Git installation, repository root, baseline commit availability and output limits |
| Baseline is rejected | Use a valid current Compass JSON report for the same project; avoid symlinks and files over 1 MiB |
| Review lists unrelated changes | Separate existing work from this task; inspect ownership instead of discarding changes |
| Required runtime is unavailable | Keep that result explicitly not run and record the environment needed to establish it |
| Tests pass but behavior is unclear | Compare assertions to acceptance criteria and verify the actual integration boundary |

## Verify your WalidForge checkout

These commands check the pack itself. They do not test your application's behavior.
Run them from the WalidForge checkout with the repository's supported Node runtime:

```bash
node --test scripts/*-test.js scripts/lib/*-test.js
node scripts/validate-skills.js
node scripts/run-evals.js --min-rank1 95
node scripts/validate-reference-links.js
node scripts/validate-commands.js
node scripts/validate-artifact-paths.js
node scripts/validate-versions.js
bash hooks/session-start-test.sh
bash hooks/sdd-cache-test.sh
bash hooks/simplify-ignore-test.sh
```

The wildcard invocation above assumes a shell that expands these patterns. The
hook tests require Bash and their script prerequisites. Deterministic routing
checks approximate discovery; they do not prove a host activated a skill.
Behavioral model evaluations are separate and require their own executable/account
setup. See [evaluation instructions](../evals/README.md) before running them.

## Further reading

- [Getting started](getting-started.md): portable loading and the lifecycle.
- [Developer handbook](developer-handbook.md): local diagnosis and evidence interpretation.
- [Change Compass](change-compass.md): output fields, limits and review semantics.
- [Engineering style](walidforge-style.md): architecture and verification defaults.
- [Domain workflows](senior-engineering.md): backend, frontend, mobile and DevOps concerns.
- [Gradual adoption](adoption-guide.md): introduce workflows into an existing project.
- [Host integration](other-hosts.md): adapters and portable loading.
- [Contributing](../CONTRIBUTING.md): extend an existing owner from a demonstrated gap.
