# Performance Evidence Checklist

Apply the sections relevant to the measured user outcome. Thresholds follow the
project's product objectives and representative evidence.

## Measurement

- [ ] User-facing metric, workload and scale are specified.
- [ ] Baseline includes environment, warm/cold state and relevant variability.
- [ ] Profiling identifies the limiting work before the optimization.
- [ ] Before/after conditions and correctness are comparable.

## Client work

- [ ] Loading, rendering, interaction and network time are distinguished.
- [ ] Large payloads/assets and unnecessary work have measured contribution.
- [ ] Text, images and asynchronous content preserve usable layout/interaction.
- [ ] Native resource and lifecycle claims use native observations.

## Server and storage

- [ ] Query count, returned rows and request concurrency are considered together.
- [ ] Access paths fit the actual filter/order/selectivity and query plan.
- [ ] Transactions and connection lifetimes avoid proven contention or exhaustion.
- [ ] Pagination bounds work while preserving required ordering and compatibility.

## Caching Strategies

- [ ] Cache keys include the correct ownership/authorization context.
- [ ] Staleness and invalidation are compatible with the business invariant.
- [ ] Negative caching has a bounded lifetime and creation invalidation behavior.
- [ ] Coalescing avoids duplicate work without mixing callers' permissions.
- [ ] Failed or interrupted computations do not leave permanent in-flight entries.
- [ ] Sensitive consistency decisions are not made from stale cache state.

## Regression protection

- [ ] A justified budget or field signal tracks the actual user-facing result.
- [ ] The guard's workload and tolerance avoid misleading flaky timing.
- [ ] Local/synthetic observations are distinguished from production claims.
