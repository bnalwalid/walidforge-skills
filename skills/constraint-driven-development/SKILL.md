---
name: constraint-driven-development
description: Establishes a project's quality bar as a written contract and stops agents quietly lowering it. Interviews the user on which dimensions matter, supplies sane default thresholds when they have no number in mind, records everything in CONSTRAINTS.md, and watches the diff for a weakened bar — new @ts-ignore or eslint-disable suppressions, skipped or deleted tests, assertions stripped out, unimplemented stubs, thresholds edited down. Use when no quality bar is written down, when the user says "set up constraints" or "define our standards", when the user wants dimensions they care about — accessibility, web performance, coverage — set up as enforced constraints, when an agent keeps silencing checks or skipping tests to get to green, when you need a coverage or performance threshold and don't know what number to pick, or when an agent writes more code than anyone will read.
---

# Make the Quality Bar Executable and Honest

## Overview

Convert chosen engineering standards into checks whose meaning, owner and cost are visible. Preserve the bar during implementation without pretending measurement alone is enforcement.

## When to Use

Use when establishing standards, adding quality budgets or investigating checks being weakened to obtain green results.

## Process

### Inspect existing checks before interviewing

Read the stack, runner, lint/type/security configuration, CI stages and available baseline results. Report what is already enforced. Ask at most four focused questions for missing choices, offering usable defaults: relevant dimensions, blocking versus reporting, baseline versus targets and acceptable check cost. Existing explicit preferences remain valid.

### Choose adoptable rules

If a numeric target is unknown, measure today's value and propose holding it rather than inventing a universal percentage. A project at 62% coverage cannot immediately pass an 85% gate; explain the permanently red baseline and propose a 62% non-regression rule with a separate improvement plan. Every number needs its metric definition, rationale and measurement conditions.

### Write the contract in CONSTRAINTS.md

Record dimension, rule, command that returns its verdict, lifecycle stage, owner and current status. Distinguish proposed, measured-only and enforced checks. Include no secrets and no silently weakened tests/checks or unfinished placeholders; a justified exception must have scope, reason, owner and revisit/expiry condition.

Use project-supported tooling, verified against its installed version. Do not imply a coverage-report command enforces changed-line coverage unless a real check calculates and gates it. Validate that wrapper scripts and CI apply the documented rules.

### Place checks by prerequisites and cost

Keep focused lint/type/behavior checks in the edit loop when practical. Put integration, browser and expensive analysis in the stages that can supply their environments. Accessibility for a web target can use axe-core: if the project uses npm and no checker exists, propose `npm install --save-dev @axe-core/cli`, then the installed CLI's verified invocation such as `npx axe <preview-url> --exit` with the selected policy and a compatible browser/driver environment. The [maintainer CLI guide](https://github.com/dequelabs/axe-core-npm/blob/develop/packages/cli/README.md) documents the failure-exit flag; a report-only scan is not an enforced gate. It needs a running URL and belongs at preview/runtime verification rather than each edit. Ask for the URL or mark the dimension inapplicable when there is no web surface.

Installation and CI changes follow the requested scope; do not install a menu of unused tools. Redact secret scanner output. Record unavailable prerequisites as pending rather than claiming a working gate.

### Guard the controls themselves

Review changes to thresholds, suppressions, skipped/deleted tests, removed assertions, stubs and exceptions. Distinguish an approved contract correction from silencing evidence. Use [the existing floor-guard implementation](references/floor-guard.md) when its diff-scoped patterns fit; it is a heuristic aid, not semantic proof for every language.

Exercise the actual chosen checks on a representative branch. Report baseline failures and the path to adoption. A written-only contract can be useful, but label it written-only until enforcement exists.

## Common Rationalizations

| Shortcut | Correction |
|---|---|
| Any numerical rule is a gate | Name and exercise the command that enforces it. |
| A failing target will motivate improvement | Separate an adoptable baseline from the improvement target. |

## Red Flags

- A rule cannot run in its designated stage.
- An assertion or threshold changes solely to obtain green.
- A measured-only metric is presented as enforced.

## Verification

- [ ] Existing tools and baselines were inspected before questions.
- [ ] Each rule names rationale, command, stage and current enforcement status.
- [ ] Targets are adoptable or have an explicit adoption plan.
- [ ] Exceptions and weakened controls are reviewed and visible.
