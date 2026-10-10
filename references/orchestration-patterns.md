# Coordinate Reviews Without Losing Ownership

The user or a command orchestrates work. Personas supply a perspective and report;
they do not invoke other personas. Skills provide the work procedure.

## Start with one accountable execution context

A direct workflow is sufficient when one developer can inspect the relevant contract
and artifact. Do not add a router persona or a chain of paraphrasing agents merely
to make the pack appear sophisticated.

## Independent fan-out with a merge step

For a release review with multiple consequential perspectives, an authorized main
orchestrator may provide the same immutable artifact, contract and necessary raw
evidence to independent code, security and test reviewers. They produce read-only
reports rather than competing edits. No reviewer depends on another's conclusion.

The main orchestrator verifies findings, removes duplicates, resolves conflicting
assumptions and returns a single readiness decision. Findings need source locations,
consequences and evidence, not agreement counts. A majority vote cannot override a
verified defect or a missing required gate.

## Execution boundaries

Check actual host capabilities and delegation authority first. Do not invent model
names, tool permissions or platform support. User-customized persona definitions
and project instructions remain authoritative within their scope.

Pass artifacts as data, minimize sensitive context and use safe structured inputs
or file/stdin handling. Independent reviewers cannot expand release authority. An
external service/model needs the authorization appropriate to cost and data access.

If delegation is unavailable, conduct the applicable review directly and disclose
that independent review did not happen. Sequential self-analysis must not be called
parallel or fresh-context evidence.

## Preserve a single decision record

Record selected artifact/revision, reviewers actually used, reconciled findings,
executed checks, blockers, tradeoffs and next action. Keep implementation, review and
release authorization distinguishable. Do not spawn nested persona trees, transmit
unnecessary repository data or loop on unchanged artifacts for more opinions.
