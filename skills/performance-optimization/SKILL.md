---
name: performance-optimization
description: Optimizes application performance across frontend, backend, queries, and databases. Use when performance requirements exist, when you suspect performance regressions, when Core Web Vitals or load times need improvement, when N+1 query patterns need fixing, or when profiling reveals bottlenecks.
---

# Optimize the Measured Constraint

## Overview

Improve the bottleneck that limits the actual user outcome, while preserving correctness and comparing representative evidence before and after.

## When to Use

Use for measured or suspected regressions, slow queries, excessive client work or an explicit performance requirement.

## Process

### Define the outcome and measurement

Identify the user-facing metric, workload, environment and relevant constraint. Separate a product target from a current observation. Read available profiles, traces, query plans or runtime measurements before choosing an optimization. Do not invent a latency target or transplant web budgets into native or backend systems.

### Establish a repeatable baseline

Measure representative data and interactions with documented warm/cold cache conditions, tool version and repetitions appropriate to variability. Preserve correctness tests. Synthetic data and local timing can guide diagnosis but cannot by themselves prove production percentile behavior.

### Localize the limiting work

Trace where time/resources are spent: network/queue delay, repeated queries, scans, serialization, rendering, memory pressure or contention. Count total work before optimizing one iteration. A faster query that increases total request count may worsen the experience.

Choose the smallest intervention supported by evidence. Bound fetching, remove proven redundant work, fix access paths or move suitable work off the critical interaction. Cache only with explicit ownership, invalidation, authorization scope and stale-result behavior.

### Compare under the same conditions

Re-run the baseline workload after the change and report absolute/relative results with variability and limits. Confirm the output and failure behavior remain correct. If the bottleneck or user metric did not improve, reconsider or revert your isolated change while preserving unrelated work.

### Guard the actual outcome

Add a justified synthetic budget or field-monitoring guard tied to the measured user-facing metric. Avoid flaky unit timing thresholds without a stable harness. Record workload scale and reconsideration conditions; the result is not a universal performance guarantee.

Use deeper patterns only after measurement identifies the corresponding cause. Deliver the baseline, causal finding, chosen change, comparison and remaining uncertainty.

## Common Rationalizations

| Shortcut | Correction |
|---|---|
| This loop looks slow | Measure its contribution to the user outcome. |
| A cache always helps | Define invalidation, tenant scope and stale behavior first. |

## Red Flags

- Optimization precedes a baseline.
- Before/after workloads differ without explanation.
- An improvement trades away authorization or correctness.

## Verification

- [ ] A representative baseline exists before implementation.
- [ ] The change targets the measured bottleneck.
- [ ] The comparison preserves workload and behavior.
- [ ] A guard tracks the user-facing outcome with stated limits.

## Relevant Resources

For a measured cause, consult [optimization patterns](references/optimization-patterns.md). Use [shared performance checks](../../references/performance-checklist.md) for release evidence.
