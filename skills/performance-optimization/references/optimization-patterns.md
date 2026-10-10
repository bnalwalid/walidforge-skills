# Diagnose the Cost Before Applying a Pattern

Use the section matching measured evidence. These are design checks across stacks,
not a catalog of mandatory frameworks or copy/paste optimizations.

## N+1 Queries (Backend)

Observe query count as returned entities increase. If it grows with each entity,
inspect relation loading and serialization paths. Batch the specific access or use
an appropriate join/preload while checking row multiplication, authorization and
memory. Compare total request work, not merely the speed of one query.

## Unbounded Data Fetching

Identify materialized rows/bytes and time before the first useful result. Introduce
bounds or streaming that preserve stable ordering and documented pagination.
Compatibility can require an additive paged path before removing an old response.
Verify memory and total data volume under the same workload.

## Queries That Ignore Their Index

Inspect the actual query plan with representative filters and data distribution.
An index existing does not prove its use or suitability. Compare predicate/order
shape, selectivity and write cost before adding or changing indexes. Production
plan analysis must follow permitted access and avoid exposing sensitive rows.

## Connection Pool Exhaustion

Measure active/queued connections, transaction lifetime and concurrent work. Inspect
leaks, long-held transactions and per-request fan-out before raising the pool size.
A larger pool can transfer pressure to storage. Check timeouts, cancellation and
resource release when work fails or is interrupted.

## Missing Image Optimization (Frontend)

Measure transfer and decode/render contribution for the target route. Choose formats,
sizes and loading behavior supported by the platform and current framework. Preserve
layout dimensions and relevant content priority; lazy-loading a critical asset can
worsen the user-facing outcome.

## Unnecessary Re-renders (React)

When the project uses React, use its applicable profiler and installed-version
semantics. Identify expensive repeated work and the state/subscription owner before
adding memoization. Equivalent reasoning applies to other UI frameworks through
their own runtime tools. Verify interaction correctness as well as render duration.

## Large Bundle Size

Inspect the actual initial and deferred dependency graph. Remove unnecessary payload,
choose supported narrower imports or split genuinely deferred work. Moving every
module into a dynamic boundary can add latency and failure paths. Compare the user's
first useful interaction under equivalent cache/network conditions.

## Missing Caching (Backend)

Cache only when repeated computation is a measured cost and stale behavior is
acceptable. Define identity, authorization scope, invalidation and expiry. Coalesce
in-flight requests without mixing permissions or leaving poisoned pending entries
on failure. Verify the cache under writes and account changes, not only repeated reads.
Consult [cache evidence](../../../references/performance-checklist.md#caching-strategies)
when assessing whether the optimization preserves correctness.
