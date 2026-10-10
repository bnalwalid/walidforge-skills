---
name: planning-and-task-breakdown
description: Breaks work into ordered tasks. Use when you have a spec or clear requirements and need to break work into implementable tasks. Use when a task feels too large to start, when you need to estimate scope, or when parallel work is possible.
---

# Plan Around Verifiable Outcomes

## Overview

Translate an approved design into ordered changes with observable completion conditions. A WalidForge plan explains why the sequence works, where uncertainty remains and how another session can resume it.

## When to Use

Use when requirements are established and work needs decomposition, dependency ordering or delivery checkpoints. Planning-only requests produce artifacts, not implementation.

## Process

### Establish the active contract

Identify the specification, selected module and project constraints. Record the architectural decisions that govern this plan, without redesigning settled boundaries. If a missing decision changes ownership, data compatibility or the user outcome, resolve it through `spec-driven-development` before scheduling dependent work.

Inspect existing work before creating artifacts. The default plan is `tasks/plan.md`; the default task list target is `tasks/todo.md`. A designated external tracker replaces the checklist, while the plan keeps an ordered index of its item ids. Never maintain two competing task lists. Do not overwrite incomplete work for another objective: present the conflict and obtain its destination or disposition. Revisions of the same authorized objective update its existing plan.

### Make dependencies explain the sequence

List the contracts, data transitions and tool prerequisites each outcome needs. Distinguish implementation dependency from work that merely shares a file. Schedule a high-impact uncertainty early as a bounded experiment with a decision it will unlock. A spike is complete when the question is answered, not when a prototype becomes production code.

Build vertical slices that carry one useful behavior through its affected boundaries. For an export feature: authorized request with persisted status; worker completion and retrieval; failure/retry/expiration. Avoid a schedule of all tables, then all APIs, then all screens that leaves nothing independently verifiable.

### Define tasks a developer can finish

Each task records: stable id, user-visible outcome or decision, prerequisite ids, likely files, acceptance criteria, verification commands and relevant recovery behavior. Estimate by uncertainty and reviewability rather than a universal file-count limit. Split tasks that mix independently useful behaviors or cannot explain their completion conditions plainly.

Example task: reject downloads after membership revocation. Dependencies: artifact lookup and membership contract. Acceptance: the former member cannot obtain a file while a current member can. Verification: focused authorization integration test against both states. Recovery: preserve stored artifacts while correcting access checks.

### Place checkpoints where risk changes

Check the integration contract after connecting modules, data compatibility before switching writers and the user journey before declaring delivery complete. Identify required runtime environments and unavailable evidence. Do not schedule every test after every edit or substitute a mock for a real boundary result.

Record the next ready task and unresolved blockers. If only planning is authorized, finish with the plan. Otherwise hand the selected task to `incremental-implementation`; approval already given does not need another ritual confirmation.

## Common Rationalizations

| Shortcut | Correction |
|---|---|
| A long checklist proves the plan is detailed | Trace every task to an outcome, dependency and acceptance condition. |
| We can replace the old checklist | Preserve incomplete work and reconcile its scope first. |

## Red Flags

- Tasks are grouped only by technical layer.
- A prerequisite or unresolved architectural decision is hidden in a task.
- Unchecked work disappears when the plan is rewritten.

## Verification

- [ ] The plan names its active specification/module and task list target.
- [ ] Every task has acceptance criteria, dependencies and a verification step.
- [ ] Vertical slices and checkpoints reflect actual boundary risks.
- [ ] Unfinished work is preserved and the next ready action is explicit.

## Relevant Resources

Use [the completion contract](../../references/definition-of-done.md) when establishing the project-wide evidence bar.
