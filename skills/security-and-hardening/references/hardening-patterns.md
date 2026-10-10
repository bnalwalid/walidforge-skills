# Controls by Trust Boundary

Read the section needed by the actual threat model. These controls require adaptation
to the project's framework, runtime and permitted verification environment.

## Injection

Keep untrusted values separate from executable query, shell or template syntax. Use
supported parameterized interfaces, validate allowed structure separately and avoid
interpolating artifact text into shell arguments. Test malformed input at the real
boundary without using shared/live destructive targets.

## Broken Authentication

Use maintained platform/framework authentication, documented session lifecycle and
appropriate revocation. Distinguish authentication failures from resource authority.
Verify expiry, reused credentials and account change behavior under the actual design.

## Cross-Site Scripting (XSS)

Apply encoding appropriate to the output context. Treat rich content and model output
as untrusted; sanitize with maintained controls when rich rendering is required.
Do not assume a JSON string or URL validation automatically makes HTML rendering safe.

## Broken Access Control

Determine the owner of each resource and action. Enforce authorization at reads,
writes, background processing and download, using trusted identity rather than a
client-supplied tenant. Test two accounts, revoked permissions and guessed identifiers.

## Security Misconfiguration

Inspect actual origins, privileged credentials, debug behavior and environment
exposure. Select browser headers and CORS according to the supported deployment
policy. Disabling a protection to resolve an integration failure changes the threat
model and needs an explicit justified decision.

## Sensitive Data Exposure

Minimize collected fields and keep credentials out of logs, errors and artifacts.
Classify storage/transit/access requirements and retention ownership. Report secret
location and exposure path without printing the value; live rotation requires the
appropriate authority.

## Server-Side Request Forgery (SSRF)

Model the caller's ability to reach services through your server. Validate allowed
schemes/ports/destinations, resolved private and reserved addresses and redirect
behavior. Consider DNS changes and enforce supported egress controls where needed.
A string check followed by an unconstrained fetch leaves a time-of-check/use gap.
Verify refusal paths in an isolated environment, not by probing live internal systems.

## Schema Validation at Boundaries

Validate shape, size, allowed variants and context-sensitive business constraints.
Parsing input into a typed object does not establish ownership or permission. Return
stable safe errors and avoid inconsistent validation between entry points.

## File Upload Safety

Define acceptable content, size and destination independent of caller filenames.
Store artifacts with controlled identity and authorization; do not make them public
by default. Establish active-content handling, expiration and cleanup ownership.

## Destructive Operations on Derived Paths

Require the intended root, a target below it and evidence that the operation owns
that resource. Handle traversal, symlinks and races with appropriate filesystem
operations; resolution alone does not make later mutation atomic. Refusal must not
fall back to a wider default. See [path checks](../../../references/security-checklist.md#destructive-path-operations).

## Dependency Audit Triage

Use current primary advisories and actual lockfiles. Separate affected version,
reachability, consequence and upgrade compatibility. Audit tools may require network
access and up-to-date databases; record those limits. Never declare absence of all
vulnerabilities from a single scanner result.

## Rate Limiting

Define protected resource, scope and failure behavior. Consider unauthenticated and
account-scoped abuse, replay and distributed instances. A local in-memory limit may
not establish a global policy. Verify that throttling does not disclose private data
or produce uncontrolled repeated external effects.

## Secrets Management

Keep credential issuance, access, rotation and revocation under an explicit owner.
Use the platform's supported injection mechanism with narrow scope and avoid copying
secret files into build artifacts. Redaction is a last boundary, not a reason to log
values. Scope recovery steps to authorized environments.

## Data Classification

Record data categories, permitted users, retention and deletion behavior. Confirm
applicable obligations with the owner. A classification table or encryption setting
alone is not proof of privacy compliance.

## LLM Output Handling

Separate retrieved instructions and generated text from tool authority. Validate
outputs before using them as code, queries, URLs or user-visible rich content.
Minimize transmitted context and enforce account boundaries outside the prompt.
Exercise unauthorized-action and cross-account scenarios relevant to the feature.
