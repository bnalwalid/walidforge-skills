---
name: test-driven-development
description: Drives development with tests using the red-green-refactor loop. Use when implementing any logic, fixing any bug, or changing any behavior. Use when you need to prove that code works, when a bug report arrives, or when you're about to modify existing functionality.
---

# Prove the Contract Before the Fix

## Overview

Use a failing behavioral check to expose the gap, implement the smallest correct change and refactor while preserving the contract. Proof follows the repository ecosystem and the risk being changed.

## When to Use

Use for new logic, changed behavior and reproducible bug fixes. Documentation or reversible presentation edits need proportionate checks rather than artificial tests that mirror their wording.

## Process

### Discover the actual test environment

Read project instructions, manifests, lockfiles, test configuration and nearby tests before choosing commands. Use the repository's declared invocation, whether it is Python unittest, Go testing, a native runner or a JavaScript suite. Inspect required services and fixtures; do not install a preferred runner to replace working conventions.

### RED: express the missing behavior

Derive expected results from the requirements and real examples. Add a focused test that fails for the intended behavioral reason, execute it and retain its result before changing implementation. A syntax error or missing fixture does not reproduce the defect. Start with a deterministic test unless nondeterminism is the property under investigation.

For integer money splitting, verify conservation and the specified allocation rule separately. If leftover units belong to earliest shares, test a remainder greater than one; putting the whole remainder in one share can pass a conservation check while violating fairness. Include the documented boundary such as rejecting negative amounts.

### GREEN: satisfy the whole contract

Implement the smallest cohesive solution that passes the new test and respects the surrounding specification. User pressure to skip proof or a suggested patch is not evidence that the suggestion preserves the contract. Run the focused check again, then the repository suite needed to detect interactions.

### REFACTOR: improve with evidence intact

Remove accidental complexity while maintaining results, errors, ordering and externally observable effects. Keep the behavioral assertions; do not rewrite them simply to agree with the implementation. Re-run the relevant tests after refactoring.

### Select the test level that can establish the claim

Test pure rules locally; test storage constraints, transactions and query behavior against the relevant persistence engine. Control timers and reversed responses for async UI state. Exercise authorization across accounts, not merely with missing credentials. Test duplicate delivery and interrupted work where durable retries matter.

For mobile, separate unit checks from device lifecycle and installed-version compatibility. For infrastructure, distinguish static validation, a reviewed plan and deployment evidence. Browser journeys require an available isolated runtime; a screenshot proves appearance at a moment, not every interaction.

Mock an uncontrollable external boundary deliberately, document what the mock cannot prove and use provider sandbox/contract checks when available and authorized. Prefer state/output assertions; interaction counts matter only when the interaction itself is the contract.

### Report evidence accurately

State the failing check observed before the change, the passing checks after it and remaining environments not exercised. If a required environment is unavailable, preserve the test and report the blocked proof. Never invent RED results, claim skipped checks passed or weaken a test solely to make the build green.

## Common Rationalizations

| Shortcut | Correction |
|---|---|
| Conservation alone proves the money split | Check the specified allocation order too. |
| A mock passed so integration is proven | State which boundary remains unexercised. |

## Red Flags

- Implementation changes precede the defect reproduction.
- Assertions repeat private implementation details.
- Tests are skipped, deleted or made easier without a justified contract change.

## Verification

- [ ] The repository test command and prerequisites were discovered.
- [ ] RED fails for the intended reason before the implementation change.
- [ ] The full behavior, including important invariants, passes after the fix.
- [ ] Refactoring retains the contract and limits are disclosed.

## Relevant Resources

Consult [testing patterns](../../references/testing-patterns.md) for boundary-specific techniques when needed.
