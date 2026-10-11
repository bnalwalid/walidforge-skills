![WalidForge — Understand. Build. Verify.](assets/walidforge-banner.png)

# WalidForge

**Understand your project. Make the change. Show the proof.**

WalidForge brings backend, frontend, mobile and DevOps workflows into one portable
skill pack. Define the outcome, choose the simplest suitable design, deliver in
small slices, and verify the failure paths before calling the work complete.

Maintained by [bnalwalid](https://github.com/bnalwalid). Repository:
[bnalwalid/walidforge-skills](https://github.com/bnalwalid/walidforge-skills).

> Engineering defaults: [document the architecture before implementation](docs/walidforge-style.md), choose boundaries from project constraints, and show evidence for the delivered behavior. All stacks are welcome.

## Learn the workflow

Read the [complete user guide](docs/user-guide.md) for installation choices, all
25 skills, practical examples, Doctor/Compass usage, change review and
troubleshooting. Start with [the quick start](docs/user-guide.md#quick-start)
for your first task.

## Start with your project

From this checkout, inspect the project you want to work on:

```bash
node scripts/forge.js doctor /path/to/your-project
node scripts/forge.js doctor /path/to/your-project --json
```

Project Doctor reports observed stack markers, declared check commands, candidate
commands and metadata conflicts. It uses Node built-ins with no dependencies,
network calls, project-script execution or target writes. A discovered command
is not a test result; review it against your README and CI before running it.

It recognizes common markers for JavaScript/TypeScript, PHP, Python, Go, Rust,
Ruby, JVM, .NET, Dart/Flutter, Swift, containers and Terraform at the selected
root. Nested packages and unsupported stacks need manual discovery.

Then ask your agent for the outcome you need: understand code, fix a failure,
build a feature, improve a boundary, prepare a release or explain a concept.
No catalog memorization is required. See the
[Developer Handbook](docs/developer-handbook.md) for daily tasks, supported
markers, command provenance and limits.

## Plan a change with evidence

Change Compass links a feature or bug request to candidate source files, tests and
possible direct consumers, then produces decision questions and a verification
plan using Project Doctor command provenance:

```bash
node scripts/forge.js compass /path/to/project --intent "fix duplicate invoice" --kind bug
node scripts/forge.js compass /path/to/project --intent "add account permissions" --json
```

It runs locally without a model account or network. Matching is lexical: include
identifiers used by your project. Candidates require inspection, and no suggested
command is executed. See [Change Compass](docs/change-compass.md) for the contract,
coverage limits and what the report can establish. Save its JSON output before
implementation, then use `--review --baseline /path/to/snapshot.json` to compare
Git changes with the saved candidate paths. Review does not claim tests passed.

## How WalidForge earns trust

- **Project evidence before assumptions:** work from the actual stack, owner and
  canonical commands, including legacy projects and monorepos.
- **Proportionate workflows:** keep routine changes focused; deepen checks for
  data, permissions, concurrency, device lifecycle and release risks.
- **An outcome-to-evidence handoff:** report what changed, the consequential
  decision, executed checks, remaining limits and the next unfinished action.
- **Evaluated decisions:** structural and routing checks plus realistic behavioral
  scenarios; report which tiers actually ran.

These are design choices you can inspect and test, not a claim that no other
project shares them or that every platform has been validated.

## Four engineering perspectives

| Domain | Decisions covered | Entry skill |
|---|---|---|
| Backend | Atomic invariants, tenant boundaries, bounded queries, durable delivery and compatible migrations | [API and interface design](skills/api-and-interface-design/SKILL.md) |
| Frontend | Component boundaries, state ownership, stale requests, accessible interaction and runtime verification | [Frontend UI engineering](skills/frontend-ui-engineering/SKILL.md) |
| Mobile | Offline intent, process recreation, account isolation, native interaction and installed-client compatibility | [Native mobile delivery](skills/frontend-ui-engineering/SKILL.md#design-native-lifecycle-explicitly) |
| DevOps | Infrastructure plans, privilege separation, artifact promotion, release signals and data-aware recovery | [CI/CD and automation](skills/ci-cd-and-automation/SKILL.md) |

Use the project's existing stack. Load the relevant workflow when needed. A simple
change should not introduce an elaborate architecture, and a risky change should
not hide behind a green build.

## Install

The commands below target `bnalwalid/walidforge-skills`. Choose an installation
that matches your host and verify which resources it carries.

For hosts supported by the skills installer:

```bash
npx skills add bnalwalid/walidforge-skills
```

For a complete local checkout, including shared references and adapters:

```bash
git clone https://github.com/bnalwalid/walidforge-skills.git
cd walidforge-skills
```

Per-skill installs may omit the shared `references/` directory. Use a whole-repo
integration when a workflow needs those checklists. See
[getting started](docs/getting-started.md),
[Codex setup](docs/codex-setup.md), and
[other host commands](docs/other-hosts.md).

## The workflow

Define → Plan → Build → Verify → Review → Ship.

Lifecycle wrappers expose `/spec`, `/plan`, `/build`, `/test`, `/review`, `/ship`,
`/constraints`, `/code-simplify` and `/webperf` where the host supports them.
Other hosts discover the full skill names directly. Do not assume installation
of individual skills also installs command wrappers or shared reference files.

| Phase | Skills |
|---|---|
| Define | [interview-me](skills/interview-me/SKILL.md), [idea-refine](skills/idea-refine/SKILL.md), [spec-driven-development](skills/spec-driven-development/SKILL.md), [constraint-driven-development](skills/constraint-driven-development/SKILL.md) |
| Plan | [planning-and-task-breakdown](skills/planning-and-task-breakdown/SKILL.md), [context-engineering](skills/context-engineering/SKILL.md) |
| Build | [incremental-implementation](skills/incremental-implementation/SKILL.md), [source-driven-development](skills/source-driven-development/SKILL.md), [doubt-driven-development](skills/doubt-driven-development/SKILL.md), [api-and-interface-design](skills/api-and-interface-design/SKILL.md), [frontend-ui-engineering](skills/frontend-ui-engineering/SKILL.md) |
| Verify | [test-driven-development](skills/test-driven-development/SKILL.md), [debugging-and-error-recovery](skills/debugging-and-error-recovery/SKILL.md), [browser-testing-with-devtools](skills/browser-testing-with-devtools/SKILL.md) |
| Review | [code-review-and-quality](skills/code-review-and-quality/SKILL.md), [code-simplification](skills/code-simplification/SKILL.md), [security-and-hardening](skills/security-and-hardening/SKILL.md), [performance-optimization](skills/performance-optimization/SKILL.md) |
| Operate and ship | [ci-cd-and-automation](skills/ci-cd-and-automation/SKILL.md), [observability-and-instrumentation](skills/observability-and-instrumentation/SKILL.md), [shipping-and-launch](skills/shipping-and-launch/SKILL.md), [git-workflow-and-versioning](skills/git-workflow-and-versioning/SKILL.md), [deprecation-and-migration](skills/deprecation-and-migration/SKILL.md), [documentation-and-adrs](skills/documentation-and-adrs/SKILL.md) |
| Discovery | [using-agent-skills](skills/using-agent-skills/SKILL.md) |

The pack includes 25 skills and four focused review personas. Published skill IDs
stay stable; plugin namespaces and marketplace identity use `walidforge-skills`.

## What counts as done

Requirements are explicit. Decisions name their constraints and tradeoffs.
Verification targets observable behavior, including relevant interruption,
concurrency, authorization and recovery paths. Reports distinguish actual checks
from planned or unavailable checks.

Skills are Markdown workflows, supported by shared references, host adapters and
an evaluation harness. They guide decisions; they do not confer professional
experience or guarantee production correctness.

Read the [domain workflow guide](docs/senior-engineering.md),
[skill anatomy](docs/skill-anatomy.md) and
[contribution guide](CONTRIBUTING.md).

## Validate the pack

```bash
node --test scripts/*-test.js scripts/lib/*-test.js
node scripts/validate-skills.js
node scripts/run-evals.js --min-rank1 95
node scripts/validate-reference-links.js
node scripts/validate-commands.js
node scripts/validate-artifact-paths.js
node scripts/validate-versions.js
bash hooks/session-start-test.sh
```

[The validation workflow](.github/workflows/validate.yml) runs the local tooling
and catalog checks on pull requests and pushes. Hosted execution results must be checked for the revision being published.

Structural checks validate packaging. Routing checks approximate discovery.
Behavioral evaluations run separately and grade execution against realistic
scenarios; see [evaluation instructions](evals/README.md).

## License

[MIT](LICENSE). Redistribution must preserve applicable copyright and permission notices.
