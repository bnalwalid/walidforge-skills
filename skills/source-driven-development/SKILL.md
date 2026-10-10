---
name: source-driven-development
description: Grounds every implementation decision in official documentation. Use when you want to verify an approach against the official docs before implementing it, or when you want authoritative, source-cited code free from outdated patterns. Use when building with any framework or library where correctness matters.
---

# Use the Documentation for the Installed Version

## Overview

Ground library and framework choices in authoritative sources that match the actual project. Source evidence and runtime evidence answer different questions.

## When to Use

Use when framework/API behavior, supported configuration or version compatibility must be verified before implementation.

## Process

### Discover local reality

Read manifests, lockfiles, generated types, existing usage and project instructions. Identify exact relevant versions and runtime/platform constraints. Do not replace installed behavior with the newest release's examples simply because search ranks them first.

### Ask a narrow source question

State the behavior to verify: API availability, lifecycle semantics, defaults, deprecation, migration or runtime restrictions. Prefer official versioned documentation, maintainer release notes and source/types for the installed revision. Technical third-party summaries can suggest a search but should not establish the final claim.

### Compare source and project

Record the source URL/version, relevant supported behavior and consequence for the design. Distinguish documented guarantees from examples and observed implementation. Where sources conflict, determine version/context before choosing. If access is unavailable, state the uncertainty and use local source evidence rather than inventing a citation.

### Apply the verified pattern

Implement within the existing architecture when requested, preserving project conventions and consumer compatibility. Avoid deprecated patterns for the target version; if compatibility requires one, document its scope and transition. Do not upgrade the stack silently to make a preferred example work.

### Verify and cite accurately

Run the actual repository checks applicable to the change. Cite primary sources near the technical claim or decision they support. Record runtime results separately: documentation that an API exists does not prove this project's integration works. Keep copied excerpts short and avoid embedding external manuals into the skill.

Deliver chosen approach, version evidence, executed checks and unresolved limitations. Source verification does not authorize deployment or unrelated dependency updates.

## Common Rationalizations

| Shortcut | Correction |
|---|---|
| The current docs must fit this project | Match installed versions and runtime context. |
| The official example passing proves our integration | Run the repository-specific boundary checks. |

## Red Flags

- A claim cites an unrelated version or search result page.
- A dependency is upgraded without a requested reason.
- Missing source access becomes invented certainty.

## Verification

- [ ] Installed version and context are established.
- [ ] Technical claims cite applicable primary sources.
- [ ] Deprecated or unsupported patterns are avoided or explicitly scoped.
- [ ] Documentation evidence and runtime proof are reported separately.
