# Changelog

## 1.0.0 — 2026-10-11

Initial WalidForge release: portable engineering workflows, local project discovery
and evidence-linked change planning and review.

### Included

- 25 skills spanning requirements, architecture, implementation, testing, review,
  backend, frontend/mobile, security, performance, operations and release work.
- Four focused review personas and nine lifecycle commands across three adapters.
- Project Doctor: bounded, read-only metadata discovery with command provenance.
- Change Compass: candidate source/test impact, relative-reference evidence,
  architectural questions and a verification plan for feature and bug work.
- Saved Compass snapshots and Git change review, including deleted candidates,
  committed/staged/unstaged changes and non-ignored untracked files.
- Complete English user guide, practical prompts, host integration guidance and
  troubleshooting.
- Catalog, command, artifact-path and version validators; hook checks and
  deterministic routing checks; behavioral evaluation fixtures.

### Compatibility and limits

- Markdown workflows are stack-neutral; host discovery and adapters depend on the
  installed host. A full checkout carries CLI tools and shared pack resources.
- The validation workflow uses Node 22; local CLI tools require no npm dependencies.
- Compass impact matching is lexical. Its Git review does not execute application
  checks or establish implementation completion.
- Behavioral model grading and real host/device verification are separate from
  the local tooling suite. No such results are implied by this release.
