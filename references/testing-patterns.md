# Select Proof by the Boundary

Consult this reference when choosing a test that can establish the feature's
invariant. Use the current project's runner and conventions.

## Pure behavior

Arrange explicit inputs, invoke the rule and assert the observable result. Test
boundary values and invalid transitions. Examples must come from the specification;
random property checks can complement them when meaningful invariants are known.
For money splitting, conservation and allocation ordering are separate assertions.

## Persistence and concurrent writes

Run competing operations against the actual relevant transaction/constraint model.
Coordinate their start so the intended race is exercised; do not rely on incidental
timing. Assert final state and each operation's outcome. Clean up only fixture data
owned by the test, and avoid pointing disposable fixtures at shared production state.

## External effects and durable work

Model accepted, rejected and unknown outcomes. Assert stable logical identity across
redelivery, retained deduplication state and reconciliation after a timeout. A mock
can establish local branching; it cannot certify the provider's contract or storage
atomicity. Record sandbox/integration proof separately.

## Async interface state

Control promise completion, clocks and response order. Assert the newer request
owns visible state, failure recovery preserves later successes and loading/error
states remain usable. A state-model check does not establish rendering, focus or
screen-reader behavior; verify those in the actual interface runtime.

## Native lifecycle

Check durable intent and account scope locally. Use the relevant native runtime for
process death, interrupted upgrade, background delivery and offline replay claims.
Reopening a web page is not a substitute for native persistence evidence.

## Deployment and recovery

Static configuration validation, infrastructure plans, staging rollouts and restore
exercises establish different things. Identify the artifact/environment each result
covers. Do not represent a checked backup file as a successful restoration.

## Test quality review

A useful check can fail if the contract is broken. Avoid assertions that only mirror
private implementation, snapshots that hide meaningful changes and mocks that
remove the hazard under test. Keep each test's setup understandable and failure
messages specific. Record RED before behavioral implementation and GREEN afterward.
