# Senior Engineering Workflows

This upgrade strengthens seven existing skills without changing published names,
host adapters or introducing competing persona routers. It encodes engineering
decisions and evidence requirements; it does not confer fifteen years of experience.

## Choose the affected domain

| Domain | Entry skill | Decisions it now makes explicit |
|---|---|---|
| Backend | [api-and-interface-design](../skills/api-and-interface-design/SKILL.md) | Atomic invariants, tenant authorization, bounded queries, durable event delivery, unknown external outcomes and mixed-version migrations |
| Frontend | [frontend-ui-engineering](../skills/frontend-ui-engineering/SKILL.md) | State ownership, stale response handling, concurrent mutation reconciliation, accessible focus and measured runtime behavior |
| Mobile | [frontend-ui-engineering](../skills/frontend-ui-engineering/SKILL.md#design-native-lifecycle-explicitly) | Durable offline intent, process recreation, account isolation, secure device boundaries, native accessibility and installed-client compatibility |
| DevOps | [ci-cd-and-automation](../skills/ci-cd-and-automation/SKILL.md) | Reviewed infrastructure plans, privilege separation, artifact promotion, bounded rollout and data-aware recovery |

The existing spec → plan → implement → verify → review → ship lifecycle still
applies. Load only the domain sections involved in the task. Preserve the project's
framework and architecture unless requirements justify a change. Infrastructure
plans and release preparation do not imply authorization to apply or deploy.

## Example requests

- "Design the reservation boundary in our existing backend. Prove stock cannot
  go negative under concurrent requests and isolate each tenant."
- "Fix search results overwriting the latest query. Use deterministic reversed
  responses and verify the rendered recovery states."
- "Make our Flutter report screen survive offline saves, process death and account
  switching. Preserve draft data during the local schema upgrade."
- "Prepare our container release and IaC plan. Promote the tested artifact and
  show how recovery works after new data is written."

For each consequential choice, capture the constraint, selected approach,
simpler alternative, tradeoff and proof. A small change may need one sentence;
a stateful release may need a migration sequence and recovery procedure.

## Evidence and evaluation

[Scenario cases](../evals/cases/) now include concurrent reservation, stale search,
native offline lifecycle and destructive deployment pressure. Their real inputs
live in [fixtures](../evals/fixtures/); grading asks for observable decisions and
artifacts, rather than matching the skill's wording.

```bash
node scripts/validate-skills.js
node scripts/run-evals.js --min-rank1 95
node scripts/validate-reference-links.js
bash hooks/session-start-test.sh

# Inspect the behavioral execution plan without model calls:
node scripts/run-evals.js --behavioral api-and-interface-design --dry-run
node scripts/run-evals.js --behavioral frontend-ui-engineering --dry-run
node scripts/run-evals.js --behavioral ci-cd-and-automation --dry-run
```

A routing score measures lexical discovery, not engineering quality. Structural
checks and fixture preparation do not mean the behavioral scenarios passed. To
execute and grade them, use the existing opt-in behavioral runner described in
[evals/README.md](../evals/README.md). Record model/runtime and actual outcomes.

Model tests do not replace browser checks; a browser preview does not replace
native device validation; a green build does not establish production health;
and a backup job does not prove restore works. Report unavailable checks directly.
