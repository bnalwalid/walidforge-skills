---
name: git-workflow-and-versioning
description: Structures git workflow practices. Use when making any code change. Use when committing, branching, resolving conflicts, splitting uncommitted work in a messy working tree into clean atomic commits, opening or reviewing a pull request (PR), pushing to a remote, or when you need to organize work across multiple parallel streams. Use when cutting a release, choosing a semantic version bump, tagging, or writing a changelog.
---

# History That Preserves Work and Explains Change

## Overview

Organize changes into independently reviewable history while protecting the shared working tree. Branching and versioning follow the repository release model.

## When to Use

Use for commits, mixed work, branches, conflicts, pull requests or releases. Source-edit authorization does not by itself request a push or publication.

## Process

### Inspect before mutating history

Check status, staged/unstaged diffs, current branch, repository conventions and relevant history. Separate your changes from user work. If no baseline commit exists, do not assume staged files are your complete change. Never reset, discard or bulk-stage unknown work to get a clean tree.

### Separate coherent behavior

For a mixed refactor, defect fix and feature, identify the smallest independently valid states and their dependency order. Stage exact paths or hunks, review the index and verify each commit's state. A refactor must preserve the pre-fix behavior; the fix then establishes its regression; the feature adds its own contract.

If work cannot be split safely in place, use a temporary isolated checkout/worktree while preserving the original tree. Confirm what the repository supports before creating isolation. Do not manufacture green intermediate commits by weakening checks or silently changing scope.

### Commit the verified slice

When committing is requested or part of the authorized workflow, use an imperative, standalone message describing the resulting behavior. Include rationale or validation only where it helps future readers. Inspect the staged diff and exclude secrets, unrelated files and generated artifacts outside policy.

### Resolve conflicts by contract

Read both versions and the intended behavior. Preserve independently valid changes and re-run affected checks. Do not choose an entire side simply because it is newer. Avoid rewriting shared history, deleting branches or force pushing without the required authorization.

### Prepare a reviewable PR or release

A PR explains the concrete problem, final behavior, design consequences and relevant evidence. Keep its title/body aligned with the final diff. Follow the repository version policy; a breaking consumer contract deserves the corresponding version/migration treatment even if the code diff is small. Tags, pushes and release publication use their actual authorized destination.

Report created commits and checks or, if committing was outside scope, the proposed grouping. Never claim a local commit is merged, pushed or deployed.

## Common Rationalizations

| Shortcut | Correction |
|---|---|
| All staged files belong to this task | Inspect index ownership before committing. |
| A conflict can be resolved by taking ours | Reconstruct the intended combined behavior. |

## Red Flags

- A clean tree is achieved by discarding unknown changes.
- Unrelated outcomes are bundled without reason.
- Local history changes are represented as a published release.

## Verification

- [ ] Existing user work and staged changes are accounted for.
- [ ] Commit boundaries represent independently valid outcomes.
- [ ] Messages are standalone and the exact staged state is reviewed.
- [ ] Remote mutations and release claims match actual authorization/evidence.
