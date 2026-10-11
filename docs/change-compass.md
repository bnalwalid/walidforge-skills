# Change Compass

## Contract and architecture

A local, read-only companion for feature and bug work. Run:

```bash
node scripts/forge.js compass /path/to/project --intent "fix duplicate invoice" --kind bug
node scripts/forge.js compass /path/to/project --intent "add account permissions" --kind feature --json
```

The CLI reuses Project Doctor for command provenance. A separate compass module
owns bounded source discovery, filename matching, relative-reference candidates,
and an evidence-linked plan. No dependencies, network, project scripts or writes.
Git inspection uses fixed argument arrays without a shell, disables optional locks
and filesystem-monitor hooks, and limits time/output. No diff helpers or text
conversion programs are executed.
A remote model could understand meaning better but would add account, cost and
code-transfer requirements. Full compiler analysis requires language-specific
adapters. This first version chooses deterministic local candidates and exposes
its uncertainty. Reconsider adapters when measured missed dependencies justify them.

Intent matching uses Unicode words and filename tokens, not semantic reasoning.
Arabic requests work when filenames share tokens; for English source names supply
English identifiers alongside the Arabic request. No automatic translation occurs.
Matching files are candidates, not confirmed impact. Relative import-like string
references identify possible direct consumers, not a complete dependency graph.
Only bounded allowlisted source files are inspected; ignored folders, symlinks,
large files, read errors and exhausted limits make coverage incomplete.
Source excerpts and file bodies are never included in the report. Exclusions are
a built-in list; `.gitignore` rules are not parsed, and the scan is not a secret
detector. Reports include paths and your request, so review them before sharing.

Output schema version 1 includes intent, kind, diagnosis, candidates with path/line
and reasons, decision questions, ordered plan, verification commands and limits.
Neither a suggested plan nor a discovered command proves implementation or tests.
An empty match produces explicit discovery questions rather than invented files.
Save a JSON snapshot before implementation to review changes against its candidate
paths and Git commit. A snapshot records evidence; it does not record user approval.
Review does not grade completed implementation or fabricate check results.

## Acceptance and implementation order

1. Preserve doctor behavior; validate compass arguments and source privacy.
2. Discover deterministic bounded candidates, test neighbors and direct consumers.
3. Link feature/bug plan and verification to observed paths and doctor provenance.
4. Document usage, run focused behavior tests and repository checks.

Proof: `node --test scripts/compass-test.js scripts/forge-test.js`, then the full
Node suite and catalog/reference/command/artifact validators. Test unrelated code,
no matches, Arabic identifiers, symlink escape, ignored secrets, read limits,
invalid arguments and absence of project mutation. Native runtimes and semantic
correctness of arbitrary applications are outside these checks.

## Report fields

| Field | Meaning |
|---|---|
| `candidates[].reason = intent-token` | Filename shares a nontrivial token with the request |
| `candidates[].reason = relative-reference` | A quoted relative string in this file resolves to a matched candidate |
| `candidates[].line` | One-based line of the relative reference; inspect it to confirm its meaning |
| `coverage.skipped` | Excluded or unreadable entries, including intentionally ignored directories |
| `coverage.truncated` | An entry, depth or byte limit prevented complete scanning |
| `verification[].confidence` | Project Doctor provenance, never a recorded check result |
| `plan[].evidence` | Observed paths or command sources supporting the proposed investigation |

Exit 0 means the report was produced, including unknown impact or partial coverage.
Exit 2 means invalid input or an unreadable project root. Neither is a merge gate.

## Local verification

The initial implementation passed all 217 Node tests, including 8 new Compass
behavior checks and the existing Doctor checks. Catalog, routing (94/94 positive
prompts), reference, command, artifact-path and version validators also passed.
A quota-ledger fixture run produced implementation/test candidates while leaving
undiscovered check commands explicitly unknown. These checks establish local CLI
behavior, not semantic impact accuracy across arbitrary applications.

## Review changes against a saved snapshot

Save outside the project to avoid making the report itself an untracked change:

```bash
node scripts/forge.js compass /path/to/project --intent "fix duplicate invoice" --kind bug --json > /tmp/invoice-compass.json
# Implement the authorized change, then inspect:
node scripts/forge.js compass /path/to/project --review --baseline /tmp/invoice-compass.json
```

Review reuses the saved intent/kind, validates the project identity and keeps the
saved candidate paths even if files were deleted. It compares the snapshot's Git
HEAD commit to the current worktree, including committed, staged and unstaged
changes, and separately includes non-ignored untracked files. Rename detection is
disabled: moves appear as deletion/addition. This is a commit baseline, not a copy
of the exact worktree at snapshot time; pre-existing dirty changes are included.

`review.changed_candidates` lists saved candidates that changed;
`review.untouched_candidates` lists candidates for inspection, not required edits;
`review.unmatched_changes` lists changed paths absent from the candidate set,
not defects or automatically unauthorized work. Filename matching is incomplete.
`review.check_results` remains empty and `review.completion` remains
`not-established`; review reports observations, never a merge verdict.

Non-Git projects, repositories without a baseline commit, selected subdirectories,
missing baseline objects, timeouts and output over 1 MiB produce an explicit
`unavailable` review. Invalid baseline JSON, symlinks, oversized snapshots or a
snapshot for another project produce exit 2. Baselines from before snapshot support
must be regenerated. Review reads paths/status only; source diffs are not printed.

### Review acceptance and implementation order

1. Save bounded Git commit identity with the planning report.
2. Validate the supplied snapshot and collect read-only change evidence.
3. Compare to saved paths, including deleted candidates and untracked additions.
4. Preserve unknown completion and document unavailable evidence.

Regression proof covers clean repositories, committed deletion, modified and
untracked paths, no-Git projects and invalid/cross-project snapshots.

Review implementation verification: all 225 Node tests passed with no failures,
skips or cancellations; focused Doctor/Compass tests passed 31/31. Catalog,
reference, command, artifact-path, version and routing validators passed. A local
review of this repository observed seven changed paths without claiming completion
or check results. These are CLI/protocol checks, not a semantic correctness verdict.
