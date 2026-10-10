# Review the Actual Trust Crossings

Use with `security-and-hardening` for an applicable boundary review. Identify the
asset, adversary capability and observable consequence before selecting controls.

## Authority and input

- [ ] Trusted identity is separate from user-supplied resource identifiers.
- [ ] Every relevant read, write, job and download checks its resource/action scope.
- [ ] Validation, query parameterization and output encoding match the context.
- [ ] Session expiry/revocation and account switching preserve isolation.
- [ ] Errors and logs exclude credentials and unnecessary private data.

## External and filesystem boundaries

- [ ] URL fetching restricts destinations, ports and redirects as applicable.
- [ ] Resolved addresses and network policy address private/reserved access hazards.
- [ ] Upload content, size, storage identity and retrieval authorization are defined.

## Destructive Path Operations

- [ ] The target belongs below the intended root and carries ownership evidence.
- [ ] Traversal and symlink handling use appropriate filesystem semantics.
- [ ] Validation and deletion account for race conditions; resolution alone is insufficient.
- [ ] A refusal does not fall back to a broader default or remove the root itself.
- [ ] Cleanup is limited to the resources created for this task.

## Credentials and supply chain

- [ ] Credential scope/lifetime matches the authorized operation.
- [ ] Untrusted code cannot access privileged delivery authority.
- [ ] Locked dependency versions and current primary advisories inform audit triage.
- [ ] Reachability and upgrade consequences are considered alongside severity.
- [ ] Installation scripts and build inputs receive the relevant trust review.

## Data and AI features

- [ ] Data minimization, retention, access and deletion behavior have named ownership.
- [ ] Legal/compliance requirements are confirmed rather than inferred from a checklist.
- [ ] Retrieved content/model output cannot authorize tools or bypass data policy.
- [ ] Output handling and external actions enforce authority outside the prompt.

## Evidence and handoff

- [ ] Relevant malformed, replayed and cross-account paths are exercised safely.
- [ ] Observed defects are distinguished from reasoned risks and pending controls.
- [ ] Live credential/data changes remain within actual authorization.
- [ ] The report includes checked scope and avoids certification claims.
