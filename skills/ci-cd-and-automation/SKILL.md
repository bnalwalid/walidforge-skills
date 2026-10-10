---
name: ci-cd-and-automation
description: Automates CI/CD pipeline setup. Use when setting up or modifying build and deployment pipelines. Use when you need to automate quality gates, configure test runners in CI, establish deployment strategies, or prepare infrastructure as code and container delivery with safe recovery.
---

# Delivery Pipelines With Traceable Authority

## Overview

Build automation that produces trustworthy artifacts and makes delivery decisions reviewable. Separate untrusted verification from privileged release operations.

## When to Use

Use to create or change CI gates, container builds, infrastructure automation or deployment pipelines. Infrastructure review does not authorize apply.

## Process

### Inspect the delivery system

Read declared build/test commands, lockfiles, workflow conventions, runtime images and infrastructure plans. Identify source inputs, artifact outputs, credential holders and environment owners. State the accepted architecture and deployment topology before changing them.

Use official documentation for the installed provider/tool version when generating configuration. Reuse existing package managers and scripts. A pull request should trigger relevant quality checks, and any required check failure must fail the run rather than being hidden behind continue-on-error.

### Separate trust levels

Run untrusted pull-request source without delivery secrets or privileged write tokens. Avoid executing a fork's code in a privileged workflow context. Declare least-privilege permissions and constrain credential lifetime. Keep secrets out of logs, caches and artifacts. A mask is not permission to print credentials.

Place privileged delivery behind the project's actual release authority. Workflow triggers, branch filters and protected environments must reflect it. Do not treat successful tests as authorization to publish, apply or deploy.

### Build and promote one artifact

Use reproducible declared inputs, immutable image/artifact identity and explicit provenance. Verify the artifact that will be promoted; do not independently rebuild per environment and call it the same release. Cache dependencies using lockfile/tool inputs, while keeping caches optional and outside the trust chain for final artifact integrity.

Bound execution with appropriate timeouts and cancellation/concurrency semantics. Integration checks require ready services and deterministic cleanup; credentials and disposable databases must not accidentally target production.

### Review infrastructure and data transitions

Inspect replacement/deletion plans rather than assuming a green plan is safe. Keep apply pending when destructive scope or release authority is unresolved. Preserve managed topology unless redesign is requested.

For schema changes with mixed deployed versions, plan expand, compatible rollout, controlled backfill and later contract. Define the new writer behavior and old reader compatibility. Reverting a container cannot restore deleted rows. A listed nightly backup becomes recovery evidence only after an applicable restore exercise establishes usability and time/data-loss limits.

### Define rollout and recovery evidence

Include readiness, user-visible smoke checks, release baseline, observation window, stop conditions and the owner of the next decision. Choose thresholds from service objectives and representative baseline data. Recovery may be disabling exposure, promoting a previous compatible artifact or a data-aware forward fix; document where each ceases to be safe.

Deliver the workflow/configuration and release runbook requested. Validate syntax and local checks, then state which hosted runs, provider plans or deploys were not performed. Use `shipping-and-launch` for a launch verdict and `deprecation-and-migration` for the transition design.

## Common Rationalizations

| Shortcut | Correction |
|---|---|
| A green infrastructure plan is ready to apply | Inspect destructive actions and release authority. |
| Rebuilding the release is promotion | Verify and identify the exact artifact promoted. |

## Red Flags

- Untrusted code can access delivery credentials.
- A destructive migration has only a code rollback plan.
- Pipeline failures are converted into successful status.

## Verification

- [ ] PR gates invoke the actual repository checks and propagate failure.
- [ ] Privilege and artifact identity are explicit.
- [ ] Data compatibility, rollout observations and recovery are documented.
- [ ] Validation is distinguished from hosted execution and deployment.
