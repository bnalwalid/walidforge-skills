# Operating Evidence Checklist

Use for a feature whose production outcome or failure must be diagnosable.

## Questions and ownership

- [ ] The user outcome and important failure are named before telemetry selection.
- [ ] Each signal answers a question or supports an operator decision.
- [ ] A response owner and useful runbook exist for actionable alerts.

## Structured events

- [ ] Event names, outcomes, units and safe correlation fields are documented.
- [ ] Committed completion is distinguishable from attempted work.
- [ ] Retry attempt identity is distinguishable from logical operation identity.
- [ ] Secrets are excluded and personal data has appropriate access/retention.

## Metrics and traces

- [ ] Labels use bounded categories, not arbitrary user/request identifiers.
- [ ] Duration, queue wait and end-to-end experience are not conflated.
- [ ] Context joins across the applicable synchronous and durable boundaries.
- [ ] Aggregation and sampling limits are visible when interpreting the result.

## Alerts and release decisions

- [ ] Thresholds and observation windows come from service objectives/baselines.
- [ ] Alerts describe actionable symptoms with investigation and recovery steps.
- [ ] Routing and delivery are tested where the environment permits.
- [ ] Success, failure and redelivery exercise the signal paths.
- [ ] Configured, observed and unavailable production evidence are reported separately.
