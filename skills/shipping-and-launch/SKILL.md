---
name: shipping-and-launch
description: Prepares production launches. Use when preparing to deploy to production, or when asking what needs to be in place before shipping. Use when you need a pre-launch checklist, when setting up monitoring, when planning a staged rollout, or when you need a rollback strategy.
---

# A Release Decision With Evidence and Recovery

## Overview

Prepare a clear GO or NO-GO decision for the identified artifact and environment. Readiness is established by applicable evidence, operating ownership and a viable recovery path.

## When to Use

Use for launch preparation, staged exposure, release checks or rollback/recovery design. Preparing a release does not execute it.

## Process

### Identify the release and decision owner

Name source revision/artifact, target environment, changed contracts and authorized scope. Read the project completion criteria and release policy. Separate local checks, hosted CI, staging behavior and production observations; evidence from a different revision cannot certify this release.

### Establish applicable readiness gates

Map the change to its required correctness, security, compatibility, performance, accessibility and operating checks. Do not demand irrelevant web metrics from a backend service or silently waive a required failed journey. Record each gate as passed, failed, unavailable or inapplicable with a reason.

Confirm monitor/alert availability, observation ownership and response instructions. A health endpoint returning success does not prove the critical user journey or alert routing. Authority pressure, deadlines and seniority do not transform failed gates into passing evidence.

### Design rollout from the service constraints

Choose direct compatible deployment, controlled exposure, canary or another project-supported strategy. Specify cohort, representative observation window, baseline, advance/hold/stop conditions and owner. Derive thresholds from actual objectives and representative data; universal percentages or waiting periods are not release evidence.

If flags are used, test relevant states and name ownership and cleanup conditions. Native/store releases need installed-version compatibility and realistic control over exposure; a server flag cannot recover every client defect.

### Establish recovery before GO

Identify the last compatible artifact and the action that stops harm. Explain code, configuration, data and external-effect implications. Rollback may be safe before a writer/schema transition but unsafe afterward. Include forward repair or restore procedures where needed, and do not call an untested backup usable evidence.

Validate the recovery mechanism in a representative authorized setting where feasible. Record recovery time/data-loss assumptions as unverified until measured. A local git revert does not prove a production rollback path.

### Deliver and follow the decision

State GO only when applicable required gates and authority are satisfied; otherwise state NO-GO with concrete blockers and the work needed to reach GO. If deployment is explicitly authorized, follow the existing runbook and observe its stop conditions. Do not send announcements or publish solely because a launch checklist exists.

After an executed release, report artifact/environment, user-path and telemetry observations, exposure state, recovery status and remaining monitoring action. If only preparation was done, say so.

## Common Rationalizations

| Shortcut | Correction |
|---|---|
| The release owner wants it now | Document required failures and the path to a safe decision. |
| Redeploying old code undoes everything | Account for data and external effects already produced. |

## Red Flags

- A required end-to-end failure is waived without evidence.
- Monitoring has no response owner.
- A rollback plan ignores incompatible data writes.

## Verification

- [ ] The verdict names the artifact, environment and actual gates.
- [ ] Monitoring and recovery readiness are verified or explicit blockers.
- [ ] GO/NO-GO and the path to resolve blockers are clear.
- [ ] Release execution and communications match actual authorization.

## Relevant Resources

Use applicable [completion](../../references/definition-of-done.md), [security](../../references/security-checklist.md), [performance](../../references/performance-checklist.md) and [accessibility](../../references/accessibility-checklist.md) checks.
