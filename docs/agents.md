# Specialist Perspectives

WalidForge keeps responsibility for the task in the main execution context.
Personas provide a bounded perspective; skills define procedures; commands are
entry points and may coordinate independent work when authorized.

| Persona | Useful question | Primary workflow |
|---|---|---|
| [code-reviewer](../agents/code-reviewer.md) | What consequence does this change introduce? | code-review-and-quality |
| [security-auditor](../agents/security-auditor.md) | Which trust boundary can fail? | security-and-hardening |
| [test-engineer](../agents/test-engineer.md) | What evidence establishes the contract? | test-driven-development |
| [web-performance-auditor](../agents/web-performance-auditor.md) | What measured work limits this interaction? | performance-optimization |

## Composition

Every persona ends with a Composition section stating its handoff and delegation boundary.

The user or a command chooses a perspective. A persona may use an available skill
but does not invoke another persona. Recommendations for deeper work remain in its
report until the orchestrator acts within the authorized scope.

Commands load the owning workflows directly; they need not spawn a persona for
ordinary work. `/ship` can coordinate independent code/security/test reviews when
capabilities, authority and the release scope justify them. If reviewers are not
available, applicable direct checks still produce a useful verdict and disclose the
lack of independent review.

## Useful reviewer inputs

Provide the actual artifact/revision, requested contract, relevant raw source and
verification context. Keep input sufficient to judge consequences without leading
the reviewer toward the author's conclusion. Protect private data and avoid shared
mutations during independent reviews.

## Merge the evidence

Verify findings against the artifact, reconcile duplicates and classify disagreement
as a contract misunderstanding, supported defect or explicit tradeoff. Return one
bounded decision with blockers and limits. Neither a persona report nor reviewer
agreement authorizes deployment, publication or unrelated changes.

See [orchestration boundaries](../references/orchestration-patterns.md). Host-specific
setup and invocation syntax follow the installed host's actual capabilities.
