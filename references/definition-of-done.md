# Completion Is an Evidence Contract

Use this reference to define completion for the current project. Task acceptance
criteria describe the requested behavior; the standing completion contract names
the evidence and operating conditions that every applicable change must satisfy.

## Select the applicable evidence

| Change | Evidence that matters |
|---|---|
| Rule or regression | Behavioral assertion, relevant failure case and regression result |
| Persistence boundary | Constraint/transaction/query behavior against relevant storage |
| User interaction | Ordinary/failure journey, accessible interaction and real runtime limits |
| Public contract | Validation, authorization, error semantics and consumer compatibility |
| Delivery/data transition | Artifact identity, rollout observations and viable recovery |
| Documentation | Claims checked against source, valid links and example execution status |

A local prose edit does not need an invented integration test. A critical database
invariant cannot be established only by a unit mock. Use the check level capable
of falsifying the claim, with proportionate cost.

## Before marking a task complete

- Confirm acceptance criteria and design boundaries are satisfied.
- Record executed commands, their outcomes and relevant environment/revision.
- Account for pre-existing failures and required unavailable evidence.
- Check that tests, assertions and quality thresholds were not weakened to pass.
- Preserve unrelated user changes and update the actual task list target.
- Reconcile changed decisions with the specification and documentation.

## Before declaring a feature delivered

Exercise the integrated user outcome and relevant interruption/failure behavior.
Check compatibility, required configuration, data lifecycle and operator visibility.
Report supported behavior and explicit limits; don't call a placeholder complete.

## Before a release decision

Use `shipping-and-launch` for artifact/environment readiness, required gates,
observation ownership and data-aware recovery. Implementation completion does not
itself authorize deployment, merge, publication or outbound communication.

## Completion report

State outcome, consequential decisions, proof and remaining limits. If work remains,
name the next incomplete action. Distinguish passed, failed, unavailable and
inapplicable checks instead of flattening them into a green checklist.
