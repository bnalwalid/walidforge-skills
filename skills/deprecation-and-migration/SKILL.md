---
name: deprecation-and-migration
description: Manages deprecation and migration. Use when removing old systems, APIs, or features. Use when migrating users from one implementation to another. Use when migrating a database schema in production, such as renaming or dropping a column without downtime (expand/contract). Use when deciding whether to maintain or sunset existing code.
---

# Change Contracts Without Abandoning Consumers

## Overview

Plan a transition whose compatibility, remaining usage and recovery are visible. Removing code is the final step of migrating its real consumers.

## When to Use

Use for API removal, system replacement, database evolution or installed-client migration.

## Process

### Inventory the contract and its consumers

Identify entry points, data owners, deployed clients, jobs, integrations and historical replay paths. Establish why replacement or removal is needed. Unknown consumers and unmeasured usage are risks, not evidence of absence.

### Define a compatible transition

Specify old/new coexistence, replacement behavior and the boundary that routes each consumer. Choose an adapter, gradual replacement or versioned contract based on actual coupling. State compatibility limitations and data provenance where both versions write.

For schema changes, expand first with compatible reads/writes, backfill with resumable bounded work, validate results and switch consumers before contracting old structures. A migration that drops data cannot be undone simply by redeploying old code. Avoid uncontrolled dual writes whose partial failures violate ownership.

### Communicate actionable migration steps

Prepare consumer guidance with replacement examples, support window, dates or proposed dates, owner and contact channel. Distinguish mandatory security retirement from advisory modernization. Draft announcements when requested; sending them requires the task's explicit communication authority.

### Measure readiness to remove

Track old contract usage, client versions, job/backlog age and data validation. Choose a removal criterion that covers dormant and replaying consumers. A calendar deadline can start escalation but does not alone establish safe removal. Mobile clients and third-party integrations may need a longer compatibility strategy.

### Recover at each transition point

Describe which switches are reversible before and after new writes. Preserve enough evidence to reconcile conflicts. Validate backup/restore capability when recovery relies on it. Record rollback versus forward repair choices and the point where old readers stop being safe.

### Remove deliberately

After the agreed conditions and authorization are satisfied, remove old implementation, obsolete flags, documentation and monitors that no longer serve a consumer. Keep the migration record and report remaining exceptions. Do not leave an undocumented adapter indefinitely or call migration complete while traffic still depends on it.

## Common Rationalizations

| Shortcut | Correction |
|---|---|
| The date has arrived so removal is safe | Check actual migration and replay usage. |
| The database downgrade restores everything | Account for data already deleted or transformed. |

## Red Flags

- Consumer inventory is missing.
- Two writers have no reconciliation rule.
- Removal occurs before compatibility evidence.

## Verification

- [ ] Consumers receive actionable guidance before the breaking transition.
- [ ] Coexistence and measured migration criteria are explicit.
- [ ] Data validation and recovery cover each transition phase.
- [ ] Removal follows evidence and authorization, with exceptions recorded.
