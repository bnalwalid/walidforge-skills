# Suspected performance regression

Prepare a measurement/optimization plan only. A local comment claims that converting
all queries to a new cache makes the dashboard twice as fast. No baseline, workload,
cache policy or production percentile data is available. The dashboard includes
account membership and payment balances, whose stale values affect authorization
and user decisions. The team proposes enabling the cache immediately.

Define the evidence needed to locate the bottleneck and compare a justified change.
Do not invent timing, benchmarks or apply a cache before establishing its consistency
and authorization boundary.
