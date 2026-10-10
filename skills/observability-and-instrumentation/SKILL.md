---
name: observability-and-instrumentation
description: Instruments code so production behavior is visible and diagnosable. Use when adding logging, metrics, tracing, or alerting. Use when shipping any feature that runs in production and you need evidence it works. Use when production issues are reported but you can't tell what happened from the available data.
---

# Signals That Answer an Operating Question

## Overview

Design telemetry from the questions operators and developers must answer. A useful signal connects behavior to a decision without exposing sensitive data or exhausting the telemetry system.

## When to Use

Use for logs, metrics, traces, alerting or a production behavior that cannot currently be explained.

## Process

### Define what operators need to know

Before adding instrumentation, write the user-visible outcome, likely failure and response decision. Examples: did a committed export reach its worker; is a payment outcome unknown or rejected; are retries stuck; did a release change the user success rate? State the signal and evidence needed to answer each question.

### Choose the right signal

Use structured logs for specific events, bounded metrics for rates/distributions and traces for causal paths. Correlation ids belong in events/traces, not unbounded metric labels. Avoid account ids, URLs, request ids or arbitrary errors as label values. Record units and aggregation semantics.

A structured event identifies event type, outcome, release/component and a safe correlation identifier. Redact secrets and minimize personal data. Allowlist useful fields rather than logging whole request bodies. Define retention and access for sensitive events.

### Trace actual boundaries

Propagate context through authorized requests and durable jobs without confusing retry attempts with logical operations. Capture queue wait separately from processing duration. Instrument the state transition that establishes completion; a log before transaction commit does not prove the work persisted.

### Make alerts actionable

Alert on an observable symptom affecting the service objective or a condition requiring timely action. Define baseline/threshold rationale, observation window, owner, runbook and recovery check. Apply the service's error-budget policy where it exists instead of inventing universal percentages. A noisy resource metric alone is not proof of user impact.

### Verify the telemetry

Exercise success, failure and redelivery in a representative permitted environment. Verify that events arrive, metric labels stay bounded, traces join across the relevant boundaries and sensitive fields are absent. Test an alert's routing and runbook when possible; configuring a dashboard does not prove on-call delivery.

Report which questions are now answerable, observation evidence, limits and residual blind spots. Do not claim production instrumentation was observed when only configuration was reviewed.

## Common Rationalizations

| Shortcut | Correction |
|---|---|
| Log every payload to make diagnosis easy | Collect the minimum safe fields that answer the question. |
| More dashboards means better operations | Tie each signal to an operating decision. |

## Red Flags

- Telemetry records success before durable completion.
- Metric labels contain user-controlled identifiers.
- An alert has no owner or useful response.

## Verification

- [ ] Operating questions precede signal selection.
- [ ] Logs are structured and safely correlated.
- [ ] Metric cardinality and sensitive fields are controlled.
- [ ] Alerts have symptom, owner, runbook and verified limits.

## Relevant Resources

Use [the observability checklist](../../references/observability-checklist.md) when checking signal coverage.
