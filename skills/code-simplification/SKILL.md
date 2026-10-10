---
name: code-simplification
description: Simplifies code for clarity. Use when refactoring code for clarity without changing behavior. Use when code works but is harder to read, maintain, or extend than it should be. Use when reviewing code that has accumulated unnecessary complexity.
---

# Remove Complexity Without Moving the Contract

## Overview

Simplify the selected code while preserving its externally observable behavior. Judge the result by clearer responsibility and fewer reasoning steps, not line count alone.

## When to Use

Use for behavior-preserving refactoring, tangled control flow or unnecessary abstraction. A behavior change needs a separate specification and verification.

## Process

### Discover the behavior worth preserving

Read callers, tests and boundary contracts. List outputs, errors, side effects, ordering, validation and public interfaces that must stay stable. Record ambiguities before assuming a strange branch is unused. An awkward conversion can encode backward compatibility.

### Identify the source of complexity

Choose a concrete burden: duplicated policy, unnecessary indirection, nested branching, hidden mutation or scattered ownership. Explain why removing it helps the developer follow the behavior. Avoid replacing obvious framework idioms with a personal abstraction.

### Make a small equivalence-preserving change

Prefer naming that exposes responsibility, early exits that preserve evaluation order and extraction around a cohesive rule. Keep meaningful differences visible instead of collapsing them into flags or configuration. Preserve lazy work and failure timing where callers depend on them.

Example: a parser accepting absent, empty and malformed values may have distinct defaults and errors. Combining them into one truthiness check can be shorter while changing behavior. Establish those cases before flattening its branches.

### Prove equivalence

Run the existing relevant tests unchanged where possible. Add characterization tests only for meaningful uncovered behavior. Explain equivalence concretely when executable verification is unavailable; do not equate compilation with unchanged semantics.

### Review the resulting boundary

Inspect the whole selected diff. Ensure complexity was removed rather than relocated into a generic utility or a large configuration table. Keep feature work, dependency upgrades and unrelated formatting separate. Report removed complexity, preserved behavior and checks.

## Common Rationalizations

| Shortcut | Correction |
|---|---|
| Fewer lines always means simpler | Check evaluation order, ownership and failure behavior. |
| A refactor is a good time for features | Keep new behavior separate and explicitly authorized. |

## Red Flags

- A generic helper has more modes than the removed branches.
- Tests change to match altered behavior during a refactor.
- Unrelated files are reformatted.

## Verification

- [ ] The preserved contract includes errors and effects, not only return values.
- [ ] The change removes a named reasoning burden.
- [ ] Existing behavioral tests remain valid and relevant checks pass.
- [ ] No new feature or interface break is hidden in the simplification.
