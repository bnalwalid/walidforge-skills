# Evaluate Packaging, Routing and Behavior Separately

WalidForge uses three kinds of evidence. They answer different questions and must
not be combined into a claim that the pack performs better than another project.

## Packaging and integration

Run the catalog, reference, adapter and artifact validators:

```bash
node scripts/validate-skills.js
node scripts/validate-reference-links.js
node scripts/validate-commands.js
node scripts/validate-artifact-paths.js
node scripts/validate-versions.js
```

These establish supported metadata, local reference resolution and integration
consistency. They do not establish model reasoning quality.

## Deterministic routing

```bash
node scripts/run-evals.js --min-rank1 95
```

Positive prompts should rank their intended workflow. Negative prompts belong to
another owner and should rank that owner above the excluded skill. The runner uses
lexical similarity, validates behavioral case definitions and checks fixture paths.
Its rank-1 rate is a lexical routing result, not a live host activation rate.

Keep realistic prompts stable when a description regresses. Correct the description
rather than changing the prompt or lowering the CI threshold to disguise the issue.
The current threshold is 95%; it allows limited variation while keeping regressions
visible. Passing case-schema checks does not mean behavioral cases ran.

## Behavioral execution

First inspect the planned execution without model calls:

```bash
node scripts/run-evals.js --behavioral spec-driven-development --dry-run
```

An actual run omits `--dry-run`. It uses the installed `claude` CLI, an isolated
fixture workspace and a model grader. It invokes real model calls, has tool access
and may incur account cost. Use the applicable authorization for that execution.
Never call a dry run or case-definition review a passing behavioral evaluation.

The executor gets the skill and realistic task artifacts. Review the trace and
resulting files, not only the grader's label. Results belong under `evals/results/`
and must identify the actual environment/model when reporting model effectiveness.
The runner validates grader output and records execution failures distinctly.

Whole-plugin cases under `evals/plugin/` can be used when the installed host supports
its evaluation interface. Verify that host's current commands before invoking them.
An invocation indicator establishes selection; pair it with a behavioral outcome
check rather than equating skill activation with useful work.

## Case contract

Each skill has `evals/cases/<skill-name>.json` with:

- `skill_name`: the published skill identifier.
- `trigger.positive`: realistic prompts and optional `top_k` (default 3).
- `trigger.negative`: adjacent prompts with an intended `owner` where known.
- `evals`: unique ids, prompt, expected_output, expectations and fixture paths.

Behavioral cases default to `kind: "execution"` and require nonempty `files` paths
relative to `evals/fixtures/`. A genuinely conversational deliverable may use
`kind: "dialogue"` without fixtures; it is not an exemption for execution workflows.
Directory fixtures retain their relative directory in the isolated workspace.
The minimum is three positive prompts, two negatives and one behavioral case.

Expectations describe observable results rather than preferred prose. Include the
failure that can defeat the architectural claim: concurrent stock consumption,
response ordering, interrupted account-scoped mobile work, destructive data recovery
or replay after deduplication expiry. Preserve application code in design/review-only
cases and assert that scope explicitly when relevant.

## Reporting a result

State the revision, check type, command, environment and result. Distinguish passed,
failed, unavailable and not run. Describe test limits, especially mock versus real
persistence, web versus native and local validation versus hosted deployment.
Measurements from earlier skill versions or another collection do not establish the
performance of the current WalidForge workflows.

## Original scenario coverage

The authoring pass adds scenarios for account-scoped caching, pinned framework
semantics, outcome interviews, architectural option selection, durable-job signals,
report-only quality checks, unavailable browser evidence, proposed ADRs, installed
client transitions, shared Git state, interrupted exports, lazy config defaults,
design-only routing, measurement-first performance and destructive cleanup.

The executable `quota-ledger` fixture is shared by TDD and incremental implementation.
Its deliberately incomplete Python implementation passes three ordinary baseline
checks but violates replay/payload invariants. The task asks the evaluator to add
regressions before fixing it, preserve account isolation and report its single-process,
non-durable limits. Local fixture validation in a temporary workspace established
three regression failures before a reference correction and eight passing checks
afterward. This validates the scenario, not an agent's ability to complete it.

The 17 new evaluation workspaces were materialized and cleaned through the actual
runner without model calls. Existing regression scenarios remain available; their
presence does not imply they were independently authored or behaviorally rerun.
