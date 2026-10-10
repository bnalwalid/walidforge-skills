---
name: security-and-hardening
description: Hardens code against vulnerabilities. Use when auditing an input handler for vulnerabilities, when handling user input, authentication, data storage, or external integrations, or when checking a login flow is safe against the OWASP Top Ten. Use when building any feature that accepts untrusted data, manages user sessions, or interacts with third-party services. Use when auditing dependencies for known vulnerabilities, triaging package-manager audit findings, or assessing supply-chain risk in a new package. Use when personal data or privacy compliance (GDPR, CCPA) is involved.
---

# Protect the Boundary That Owns the Risk

## Overview

Identify assets, actors and trust crossings before selecting controls. Tie findings to concrete access paths and verify protections without claiming broad certification.

## When to Use

Use for input/authentication/storage/integration security, dependency triage or sensitive-data design. Respect the requested audit or implementation scope.

## Process

### Build the threat model

Read the feature contract and trace assets from entry point to rule owner, persistence, external systems and output. Identify trusted identity, untrusted fields, attacker capability and the consequence of a boundary failure. Prioritize exploitable paths over an unrelated checklist.

### Enforce authority and input contracts

Authorize the specific resource and action using trusted account context, including reads, background work and downloads. Authentication alone does not establish ownership. Validate shape/size at boundaries, use parameterized data access and context-appropriate output encoding. Error responses must not disclose secrets or internals.

For uploads, define allowed type/content, limits, storage identity, access checks and active-content handling. For server-side fetches, protect private, loopback, link-local and reserved destinations as well as scheme/port policy. Evaluate resolved addresses, redirects and DNS changes using supported controls; a URL string allowlist alone cannot guarantee safe egress.

For destructive paths, constrain the operation to its intended root and account for traversal, symlinks and race conditions. A prefix string test is not a filesystem boundary. Use platform-supported safe operations and narrow authority.

### Protect credentials and sessions

Follow the framework's maintained authentication/session mechanisms and verify their version-specific guidance. Handle rotation, expiry, revocation and cookie/token exposure according to the design. Browser security controls require the actual deployment origin policy; do not apply indiscriminate CORS or header advice to every platform.

Never print discovered secret values. Report location, type and exposure path. Credential rotation or live configuration mutation needs the relevant authorization; draft the recovery steps when auditing only.

### Review dependencies and data lifecycle

Discover lockfiles and use the ecosystem's actual audit tooling. Triage reachability, affected versions, severity and upgrade consequences using current primary advisories. A scanner result is neither an automatic exploit nor a certification of absence.

Classify personal data, minimize collection and define retention/access/deletion behavior. Identify applicable compliance requirements with the owner; do not invent legal obligations or promise compliance from code inspection.

Treat retrieved text and model outputs as untrusted inputs in AI features. Enforce tool permissions, output validation and data boundaries independently of prompts.

### Verify the relevant attack path

Exercise cross-account access, malformed inputs, replay, redirected/private fetch destinations or unauthorized operations in an isolated permitted environment. Report observed vulnerabilities separately from reasoned risks, and controls tested separately from configuration recommendations. Keep an audit-only task read-only.

## Common Rationalizations

| Shortcut | Correction |
|---|---|
| Authenticated users can access this id | Check resource ownership and action permissions. |
| The URL uses HTTPS so fetching is safe | Validate destination and redirect behavior across the network boundary. |

## Red Flags

- Client identifiers determine authority.
- Logs contain credentials or complete private payloads.
- A scanner pass becomes a blanket security claim.

## Verification

- [ ] Assets and trust boundaries are identified before controls.
- [ ] Controls enforce the specific resource/action contract.
- [ ] Applicable SSRF and derived-path hazards are addressed.
- [ ] Evidence, remaining risks and mutation authority are explicit.

## Relevant Resources

Consult [hardening patterns](references/hardening-patterns.md) for the relevant boundary and [shared security checks](../../references/security-checklist.md) for coverage.
