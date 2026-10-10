---
name: code-review-and-quality
description: Conducts multi-axis code review. Use before merging any change. Use when reviewing code written by yourself, another agent, or a human. Use when you need to assess code quality across multiple dimensions before it enters the main branch. Use when asked to review a diff or a pull request, even when the diff is pasted inline.
---

# Review Consequences Before Cosmetics

## Overview

Review an actual change against its intended behavior, architectural boundaries and evidence. Findings must explain a concrete consequence and point to the responsible code.

## When to Use

Use for a diff, pull request or pre-merge review. Review-only scope leaves implementation unchanged unless fixes are also requested.

## Process

### Establish scope and contract

Read the diff, surrounding ownership boundaries, requirements and relevant tests. Identify changed behavior rather than reviewing every file equally. If source or execution is unavailable, state that limit. Author claims and CI badges are evidence to inspect, not guarantees.

### Review across the affected axes

Inspect correctness, readability, architecture, security and performance. Cover the axes implicated by the change; do not manufacture findings to fill headings. Follow input from trust boundary to storage/output, inspect authorization and concurrency, and assess whether the structure puts rules in their intended owner.

For backend changes, examine atomic writes, query bounds and retries. For UI, examine stale responses, optimistic rollback and focus. For mobile, examine process interruption, account isolation and installed clients. For delivery, inspect credential scope, promoted artifact identity and data-aware recovery.

### Verify the verification story

Read assertions before treating a suite as proof. Match tests to acceptance criteria and important failure modes. Confirm commands and available results; execute focused checks when the review environment permits it. Never say tests passed because the author said so. Identify untested boundaries such as concurrency against real persistence or native lifecycle.

### Write findings by consequence

Each finding includes severity, exact location, triggering condition, resulting failure and a concrete remedy or decision. Keep repository-compatible labels:

| Label | Meaning |
|---|---|
| **Critical:** | Merge-blocking vulnerability, data loss or broken core behavior |
| **Required:** | A demonstrated contract or maintainability defect needing correction |
| **Optional:** / **Consider:** | An improvement with an explicit tradeoff |
| **Nit:** | An optional cosmetic preference |
| **FYI** | Relevant information requiring no change |

Required is the explicit form of previously unprefixed required comments. Lead with high-impact, high-confidence findings. Distinguish a verified failure, a reasoned risk and an unanswered question. Avoid hypothetical issues that the contract rules out or repeated reports of one underlying defect.

### Deliver a bounded verdict

State whether the change is ready within the reviewed scope, list blockers and identify evidence needed to resolve them. A review verdict does not execute merge or release. If no substantive findings remain, say so and report residual test limits without inventing praise or certification.

For broader controls consult the shared security/performance references only where the affected boundary warrants them. Independent reviewers can help when orchestration is available and authorized; the skill itself does not mandate additional models or external transmission.

## Common Rationalizations

| Shortcut | Correction |
|---|---|
| Five axes require five criticisms | Review each relevant axis and report only supported findings. |
| The CI badge proves this diff | Verify which revision and checks the result covers. |

## Red Flags

- Cosmetic comments bury a data-loss finding.
- A finding has no triggering condition or location.
- A hypothetical concern is stated as an observed exploit.

## Verification

- [ ] The review uses the actual diff and intended contract.
- [ ] Findings use severity labels and concrete consequences.
- [ ] Input security and applicable domain boundaries were examined.
- [ ] The verdict identifies blockers, executed evidence and limits.

## Relevant Resources

Use [security checks](../../references/security-checklist.md) and [performance checks](../../references/performance-checklist.md) for applicable deeper review.
