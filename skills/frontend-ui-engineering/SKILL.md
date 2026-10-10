---
name: frontend-ui-engineering
description: Builds production-quality, accessible, responsive user-facing UIs. Use when building or modifying interfaces and pages, creating components, implementing layouts, meeting WCAG accessibility requirements, managing state, or delivering native mobile screens with offline sync, deep links and app lifecycle recovery.
---

# Interfaces With Explicit State and Recovery

## Overview

Design and implement user flows whose state, accessibility and failure recovery remain coherent under real interaction. Apply the same ownership discipline to web and native clients while keeping their runtime evidence distinct.

## When to Use

Use for interface construction, interaction behavior, async state, accessibility or mobile user flows. Follow the existing visual system and target platform.

## Process

### Define the experience before the components

Identify the user task, navigation context, visual constraints and acceptance criteria. Describe loading, empty, success, error, unavailable and partial states that actually apply. Establish which boundary owns server data, local drafts, navigation and durable intents. Avoid duplicating the same truth across components.

Keep the design distinctive through a coherent hierarchy, typography, spacing and interaction model that serves the product. Respect existing tokens and components. Do not replace the whole design system to improve one screen.

### Make asynchronous behavior deterministic

Distinguish reads from mutations. A stale read must not replace newer state: use request identity, cancellation or equivalent ordering protection. Cancellation is only effective if the underlying result cannot still overwrite the active state.

For optimistic mutations, isolate the affected record/version and reconcile with authoritative responses. Rolling back an entire old cache can erase a later successful change. Handle failure when mutations overlap or responses arrive in reverse order. Loading flags need defined scope rather than one global boolean for unrelated requests.

### Make interaction accessible

Use native semantics and labels before custom interaction. Preserve keyboard reachability, visible focus and understandable error associations. For dialogs, move focus into the opened content, contain navigation where appropriate and return focus to a meaningful trigger on close. Initial rendering before opening is not dialog focus management.

Check responsive layout, text enlargement, reduced motion and relevant assistive technology. Automated checks complement manual keyboard and screen-reader journeys. Document the actual runtime used; static inspection alone cannot prove focus behavior.

### Design native lifecycle explicitly

For mobile, distinguish temporary screen state from durable queued intent. Persist pending operations with stable keys before background interruption and specify recovery after process death. Associate local data and retries with the authenticated account; logout or account switching must prevent one account's intent from executing as another.

Define offline conflicts, expiration, network changes and client-version compatibility. Deep links need resource authorization, not only route parsing. Respect platform navigation, safe areas, accessibility settings and lifecycle APIs. A browser prototype cannot establish native persistence or background behavior.

### Verify the user's path

Test ordinary completion plus the failure case that challenges ownership: reversed responses, interrupted mutation, permission change, offline replay or process restart. Use the existing runner and controlled timing for races. Use `browser-testing-with-devtools` when a real browser is available and relevant; record unavailable native/device evidence.

Deliver changed behavior, design rationale, screenshots or runtime observations where useful, executed checks and known limits. Do not claim a simulated state model verifies rendering or assistive technology.

## Common Rationalizations

| Shortcut | Correction |
|---|---|
| The latest response must be the correct one | Arrival order and request order differ; preserve active request ownership. |
| A web preview verifies the mobile app | State which native lifecycle claims still need device evidence. |

## Red Flags

- A failed optimistic update restores a whole stale cache.
- Durable offline work loses account ownership.
- Loading and error states leave the user without a next action.

## Verification

- [ ] State and navigation owners are explicit.
- [ ] Async ordering and relevant interrupted paths are tested.
- [ ] Accessibility and visual checks identify the runtime and their limits.
- [ ] Native lifecycle evidence is distinguished from web or unit simulation.
