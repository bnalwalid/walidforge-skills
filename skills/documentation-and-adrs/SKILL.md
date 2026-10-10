---
name: documentation-and-adrs
description: Records decisions and documentation. Use when you need to document an architecture decision (ADR) or the reasoning behind a design choice, when changing public APIs, shipping features, or when you need to record context that future engineers and agents will need to understand the codebase.
---

# Write What Future Developers Can Verify

## Overview

Document the real behavior and the reasoning behind consequential choices. Preserve uncertainty and operational caveats rather than converting them into confident prose.

## When to Use

Use for architecture decisions, API/setup documentation, feature handoffs or factual prose review.

## Process

### Establish the document's job

Identify reader, question and existing format. Read implementation and configuration relevant to each substantive claim. Keep public guidance, operating runbooks and internal decision history distinguishable. A request to rewrite prose does not authorize application changes.

### Record architectural decisions

Follow the project's ADR location/naming convention. An ADR has status (Proposed, Accepted, Superseded or Deprecated), date, context/constraints, decision, credible alternatives, consequences and a revisit condition. Mark proposed decisions accurately; do not invent approval or a maintainer identity. Supersede historical rationale instead of rewriting it as though the old choice never existed.

Describe why a boundary fits this project. “Industry best practice” does not explain why a separate service or queue is needed. Record rejected options with the tradeoff that ruled them out, not a one-sided victory narrative.

### Ground user-facing instructions

Use exact repository-supported commands and prerequisites. Distinguish a tested command, an unexecuted documented example and an unavailable interface. Do not silently replace a published interface with an invented command because its executable is absent from the fixture.

Verify units, limits, defaults and failure behavior against source. A batch count, retention period and retry count describe different constraints; shortening prose must not merge their meanings. Preserve operational warnings such as in-memory state loss on process restart or failed jobs needing operator review.

### Review prose for unsupported claims

Replace promotional openings with concrete capability descriptions. Remove or explicitly qualify unsubstantiated guarantees, benchmarks, certifications and audience claims. Keep valid documented behavior and distinguish what the inspected code cannot establish. Use comments to explain an invariant or surprising decision, not narrate obvious syntax.

### Deliver docs with an evidence trail

Check links and relevant examples. Report source files inspected, changed claims, executed checks and examples still unverified. Leave implementation unchanged for documentation-only work. Update the spec/runbook alongside an authorized behavior change so developers do not encounter contradictory contracts.

## Common Rationalizations

| Shortcut | Correction |
|---|---|
| The README can make a stronger promise | Only promise what the implementation and operating evidence support. |
| An absent executable needs a new command | Preserve the interface and mark its example unverified. |

## Red Flags

- An ADR has no alternatives or consequences.
- A caveat disappears during prose cleanup.
- The document claims a command ran when it was only read.

## Verification

- [ ] Claims map to inspected source or explicit uncertainty.
- [ ] ADRs have status, date, alternatives and consequences.
- [ ] Commands, units and operational caveats remain accurate.
- [ ] Documentation-only scope leaves application code unchanged.
