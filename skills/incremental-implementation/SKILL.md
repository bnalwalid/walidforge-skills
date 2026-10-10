---
name: incremental-implementation
description: Delivers changes incrementally in thin, verifiable slices. Use when implementing any feature or change that touches more than one file, or when picking up the next task from a plan. Use when rolling a change out behind a feature flag, when you're about to write a large amount of code at once, or when a task feels too big to land in one step.
---

# Build One Proven Behavior at a Time

## Overview

Implement the selected design through small changes that preserve a usable system. Each increment ends with evidence and a restartable handoff.

## When to Use

Use while executing approved tasks or reducing a large implementation into independently verifiable behavior. Do not turn an explanation or design-only request into code changes.

## Process

### Select one outcome

Read the active spec, task list and relevant source. Confirm the next task's prerequisites and actual authorization. Explain the behavior being added and its boundaries before editing. If the existing architecture cannot support it, document the mismatch and revise the affected decision instead of silently expanding the design.

### Establish the proof

Run the relevant baseline where feasible and note pre-existing failures. Use `test-driven-development` for changed behavior and regression fixes. Define the ordinary case and the failure most likely to invalidate the design: concurrent write, stale response, interrupted process or incompatible deployed client.

### Deliver a vertical increment

Connect the smallest complete path through the required boundaries. Keep unrelated cleanup out of it. Add abstractions when they own a real rule or isolate a genuine external dependency; do not create future-facing services merely to populate a diagram.

For a queued export, the first increment can authorize and persist a request with a readable status. A subsequent increment renders and records completion. The final increments establish duplicate delivery, download authorization and expiry. Do not label a placeholder download button as a completed user flow.

Incomplete behavior must remain inaccessible or explicitly represented as incomplete. A flag is useful when deployment needs to precede exposure; local branches or a compatibility-preserving extension may be simpler. Name its owner and removal condition when adding one.

### Verify the changed boundary

Run focused checks, then the integration/build checks needed by the increment. For concurrent data writes, exercise competing operations against the actual persistence mechanism. For UI races, control response order. Native lifecycle proof needs native runtime evidence; a web preview cannot establish process-death recovery. Deployment checks distinguish configuration validation from a real rollout.

If the increment fails, localize the cause with `debugging-and-error-recovery` before starting the next task. Do not dilute tests or commit a failing batch because substantial work is already invested.

### Record a resumable result

Update the task with behavior delivered, checks and outcomes, limits, changed decisions and the next action. When committing is part of the authorized workflow, commit each independently verified slice separately using `git-workflow-and-versioning`. Do not include unrelated staged changes or automatically push.

Use the project completion criteria before calling the whole feature done. A green focused test establishes that behavior within its tested scope; it does not prove deployment, native behavior or provider recovery.

## Common Rationalizations

| Shortcut | Correction |
|---|---|
| The batch is too large to discard | Preserve useful work and split it into verifiable slices before committing. |
| The architecture is cleaner with extra layers | Add only boundaries justified by the selected behavior. |

## Red Flags

- The task list is marked complete ahead of evidence.
- Multiple unverified slices accumulate.
- A runtime claim rests only on static inspection.

## Verification

- [ ] The increment traces to an authorized task and architectural contract.
- [ ] The changed behavior and relevant failure path are verified.
- [ ] Unrelated work and existing failures are accounted for.
- [ ] The handoff records limits and the next incomplete action.

## Relevant Resources

Reconcile completion with [the shared evidence contract](../../references/definition-of-done.md).
