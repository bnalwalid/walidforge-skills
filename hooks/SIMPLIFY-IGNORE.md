# Optional Refactoring Exclusions With On-Disk Recovery

The simplify-ignore hook hides annotated blocks during compatible tool events.
It does this by temporarily rewriting the working file. It is not a secrecy
boundary, a read-only filter or a substitute for behavior-preserving review.

## Decide whether it is appropriate

Prefer an explicit refactoring scope when that is sufficient. This hook is useful
only when its temporary disk changes, cache ownership and recovery procedure fit
the project. External editors, compilers and watchers can encounter placeholders
while it is active. Project-scoped cache storage does not isolate concurrent sessions.

Keep an understood baseline before enabling it. Do not run competing sessions or
rename protected files while relying on this cache for their content. No hook is
authority to modify or reveal private code outside the user's scope.

## Mark a deliberate exclusion

Use dedicated marker lines and state the reason:

```text
/* simplify-ignore-start: preserve this compatibility boundary */
existing implementation to preserve
/* simplify-ignore-end */
```

The text above illustrates annotations, not executable code. The parser supports
several comment prefixes and handles `*/` and `-->` suffixes. A single-line block
hides the whole line, including code outside its markers. Nonstandard template
comment closers may not round-trip cleanly.

## Understand the tool events

| Event | Actual file/cache behavior |
|---|---|
| PreToolUse Read | Cache the block and replace it on disk with a hashed placeholder |
| PostToolUse Edit or Write | Expand retained placeholders, preserve edits and filter again |
| Stop | Expand current placeholders; if their location is lost, use recovery fallback |

Changes made through a shell/editor can survive when placeholders remain intact.
If an edit deletes a placeholder, the script reports the missing marker and avoids
updating its backup with that incomplete state. At Stop it may restore the backup
and preserve the edited version as a `.recovered` file for manual reconciliation.
The warning supplies the recovery path. A restored backup is not proof that every
concurrent edit was integrated.

## Enable and exercise it deliberately

The implementation uses Bash, jq and shasum or sha1sum. Register
`hooks/simplify-ignore.sh` for the compatible host's Read pre-event, Edit/Write
post-event and Stop event using its installed hook interface. Resolve script paths
against the project/installation layout; do not assume a single-skill copy includes
this root-level hook.

```bash
bash hooks/simplify-ignore-test.sh
```

The suite checks preservation, round-trips, removed markers and recovery behavior.
It does not prove safety for every template syntax, file move or concurrent editor.
Keep `.claude/.simplify-ignore-cache/` out of commits and preserve it until recovery
has been reviewed; it contains actual source blocks and backups.

## Recover after interruption

From the correct project root, the existing script accepts an empty payload to run
its stop/recovery path:

```bash
printf '%s\n' '{}' | bash hooks/simplify-ignore.sh
```

Inspect the resulting diff, warnings and `.recovered` files before deleting cache
state or continuing compilation. A moved file can retain placeholders; reconcile
its recovered content into the new location deliberately. Hash-only fallback may
leave formatting debris, so inspect the restored boundary rather than trusting
successful exit alone.
