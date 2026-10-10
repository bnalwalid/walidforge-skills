# Adopt the Workflow at the Next Useful Boundary

Start with the work already planned for your project. WalidForge is useful when it
helps make a decision or establish evidence; adopting it does not require a broad
application rewrite.

## Existing application

1. Use `context-engineering` to trace the affected input, rule owner, persistence and
   response. Separate current behavior from old task checkboxes and assumptions.
2. Establish the relevant baseline with the project's declared commands. Record old
   failures honestly instead of treating them as caused by the new task.
3. For a bug, reproduce it with `debugging-and-error-recovery`, then use a regression
   check to establish the correction. Add characterization only for meaningful
   uncovered behavior that the change depends on.
4. For a new boundary, write the architectural decision before implementation. Keep
   compatibility with existing consumers explicit and avoid unrelated modernization.
5. Deliver a thin outcome with evidence, then assess whether more workflow coverage
   would resolve an actual gap.

## New capability or project

Define user outcome, non-goals, constraints and important uncertainties. Compare
credible designs, select owners/contracts and describe ordinary/failure behavior.
Use the existing stack when one exists; a greenfield request still needs explicit
choices rather than an assumed favorite framework.

Plan vertical outcomes in dependency order. Verify each at the boundary that can
establish its invariant. Record a release/recovery strategy when delivery introduces
operating or data-transition risk. Creating specs and passing tests does not authorize
publication or deployment.

## Cross-domain selection

| Change touches | Look for |
|---|---|
| Backend/storage | Resource authority, atomicity, bounds, retries and durable effects |
| Web interaction | State ownership, reversed responses, accessible recovery |
| Native mobile | Durable account-scoped intent, lifecycle interruption and old clients |
| Delivery/infrastructure | Credential trust, artifact identity, compatibility and recovery |

Load the relevant owner rather than imposing every checklist. These concerns can
combine in one feature without requiring separate services or a new folder hierarchy.

## Introduce quality rules gradually

Use `constraint-driven-development` to distinguish proposed rules, measured baselines
and enforced gates. Where no numeric target is known, a justified current baseline
can be an adoptable non-regression rule. Keep fast checks in the edit loop and put
runtime/expensive checks where their prerequisites exist.

Do not silently weaken assertions, skip required checks or call a written standard
an active gate. Exceptions need reason, scope, owner and a reconsideration condition.

## Continue authorized work

The default `/build` entry point selects one ready task; `auto` or `all` continues the
authorized plan. Existing approval carries across tasks in its scope. Missing
consequential decisions or external mutations outside authority remain genuine
boundaries. Preserve unfinished work and resolve artifact conflicts before replacing
someone else's active plan.

## Review the adoption itself

Ask whether decisions became clearer, failures were found earlier and handoffs became
usable. Record examples and actual evidence. Do not attribute improvement to a skill
without accounting for workload, model/host and project context. For lasting handoffs,
see [working across sessions](getting-started.md#working-across-sessions).
