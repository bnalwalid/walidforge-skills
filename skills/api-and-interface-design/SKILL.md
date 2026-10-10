---
name: api-and-interface-design
description: Guides stable API and interface design. Use when designing APIs, module boundaries, or any public interface. Use when creating REST or GraphQL endpoints, defining type contracts between modules, or establishing boundaries between frontend and backend.
---

# Contracts That Survive Retries and Old Clients

## Overview

Design an interface around ownership, observable behavior and compatibility. A contract includes failure semantics and lifecycle, not only field names.

## When to Use

Use for public endpoints, module contracts, frontend/backend boundaries and external integrations. Honor a contract-only request without creating services or implementation.

## Process

### Establish owners and consumers

Read the feature specification and existing interfaces. Identify the owner of each resource and invariant, caller identities, trust boundaries and deployed consumer versions. Name unknown requirements explicitly. Choose REST, GraphQL, messages or an in-process interface according to consumers and existing conventions.

### Specify the ordinary and failure contract

Define inputs, validation, outputs, state transitions and documented error semantics. For HTTP, include status codes and a consistent error shape with a stable machine-readable code and safe message. Do not leak internals. Distinguish invalid input, unauthorized/forbidden access, conflict, throttling and dependency failure according to the chosen protocol.

Derive tenant/account identity from trusted authentication; supplied identifiers still require resource authorization. State pagination ordering, tie-breakers and cursor consistency. Bound list queries and explain indexes or query constraints where relevant. For user-supplied URLs include scheme, destination/network and redirect validation; parsing alone does not establish a safe fetch.

### Design concurrency and retry behavior

State where an invariant becomes atomic. Inventory cannot go below zero through a read-then-write check outside the protected transaction. Use a conditional mutation or equivalent storage constraint and test two distinct orders competing for the final item.

Give each logical external effect a stable identity across timeouts and redelivery. A new request id on each payment retry is not idempotency. Distinguish a rejected operation from an unknown provider outcome and specify reconciliation before repeating it. Key scope, payload binding, concurrent claims and retention must cover the actual replay horizon.

Define a durable handoff for committed work, such as an outbox within the same transaction when appropriate. An in-memory callback after commit cannot guarantee eventual processing. Specify redelivery, failure handling and retention rather than claiming exactly-once delivery.

### Preserve installed and deployed consumers

Prefer additive changes when they preserve existing semantics. Document optional-field defaults, unknown-field behavior, enum evolution and the support window for old clients. Plan removal using observed usage and explicit expiry conditions, not only a version label. Native clients may remain installed longer than server releases.

Model inputs and outputs separately where their responsibilities differ. Represent mutually exclusive states explicitly rather than allowing impossible combinations. Use the current language's idioms; a type-system technique is optional when the stack cannot express it directly.

### Deliver a reviewable contract

Include examples for success, invalid input, cross-account access, duplicate/replayed requests and compatibility. Map invariants to planned contract and integration checks. Record open product decisions and checks not actually executed. Use `security-and-hardening` for a requested deeper boundary audit and `deprecation-and-migration` for breaking consumer transitions.

## Common Rationalizations

| Shortcut | Correction |
|---|---|
| An idempotency header handles every retry | Define durable key scope, concurrent handling, retention and unknown outcomes. |
| Clients will upgrade immediately | Base removal on the actual consumer support window. |

## Red Flags

- A client-provided tenant id establishes authority.
- External effects can be lost after a successful commit.
- Pagination or retries have no stable identity or ordering.

## Verification

- [ ] Ownership, validation and success/error semantics are explicit.
- [ ] Concurrency and replay invariants have boundary-level verification.
- [ ] Consumer compatibility and removal conditions are documented.
- [ ] The requested artifact is delivered without invented implementation or test results.
