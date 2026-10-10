---
name: doubt-driven-development
description: Challenges consequential decisions through tested assumptions and adversarial review. Use when not confident in an approach and requesting review of your reasoning in a fresh context, when independent review is available. Use when you want every assumption cross-examined before proceeding, when stress-testing a plan for hidden failure modes, when correctness matters more than speed, when working in unfamiliar code, when stakes are high (production auth, security-sensitive logic, a high-stakes migration, irreversible operations), or any time a confident output would be cheaper to verify now than to debug later.
---

# Challenge the Claim With a Counterexample

## Overview

Test consequential reasoning before it hardens into an architectural assumption. A challenge ends with reconciled evidence and a bounded decision, not endless skepticism.

## When to Use

Use for uncertain architectural claims, irreversible transitions or an explicit adversarial review. Apply scrutiny to the consequential decision rather than every mechanical edit.

## Process

### Extract the claim and contract

State the claim, consequence of being wrong and the artifact to examine. Separate verified inputs from assumptions. For a migration, extract claims about compatibility, data preservation, replay and recovery individually; do not accept “safe migration” as one indivisible assertion.

### Design a disproof attempt

For each important claim, identify a concrete counterexample and the check that can expose it. Use the smallest source inspection, regression test, dry-run or isolated experiment that tests the assumption. A second opinion without evidence is another opinion.

Examples: run an old reader against the expanded schema; replay an operation after key expiry; interrupt a backfill between durable checkpoints. Do not execute an irreversible production operation to investigate whether it is safe.

### Obtain independent review when available and authorized

Provide the artifact, contract and necessary raw evidence without leading conclusions. Ask for consequential contract violations, not agreement. The orchestrator chooses reviewers; personas do not spawn other personas. A self-review may still expose a counterexample but must not be described as independent fresh-context review.

External model/CLI review is optional and requires appropriate authorization for cost and transmission. Preserve authorization already given for the same scope; do not impose repeated confirmation ceremonies. Verify the installed interface and read-only boundary before use. Pass artifacts as data through a file/stdin rather than interpolating them into shell commands.

### Reconcile findings with the artifact

Classify each finding as a contract misunderstanding, actionable violation, consciously accepted tradeoff or unsupported concern. Verify it against source and evidence. Fix an unclear contract before treating its disagreement as an implementation defect. Record accepted consequences and their owner.

### Stop with a decision

Continue only while a changed artifact or new discriminating evidence can resolve substantive uncertainty. Stop when relevant claims are established or when unresolved doubts block the affected decision. Bound review rounds to the agreed scope; repeated identical opinions add no proof.

Deliver verified claims, tested assumptions, surviving doubts and a proceed/hold verdict. Passing a review does not authorize the underlying irreversible operation.

## Common Rationalizations

| Shortcut | Correction |
|---|---|
| The reviewer agrees so the claim is true | Inspect its evidence and test a meaningful assumption. |
| Every concern requires a redesign | Classify it against the actual contract and tradeoffs. |

## Red Flags

- No assumption is tested.
- Reviewers receive the desired conclusion as their answer.
- A review verdict is treated as production authority.

## Verification

- [ ] Important claims are extracted and challenged individually.
- [ ] At least one material assumption is checked rather than accepted.
- [ ] Findings are reconciled against artifact and contract.
- [ ] The verdict separates verified claims from surviving doubts.

## Relevant Resources

Use [orchestration guidance](../../references/orchestration-patterns.md) when an independently authorized reviewer is involved.
