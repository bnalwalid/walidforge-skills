# WalidForge Developer Handbook

Start with your task and the repository you have. WalidForge helps you understand,
change and verify it using existing tools and conventions. It is useful to both
new and experienced developers; explanation depth can change while the evidence
required for correctness stays tied to the risk.

## First five minutes

From a whole-repo WalidForge checkout, use Node to inspect the project you want
to work on. The developer's project itself does not need to use JavaScript.

```bash
node /path/to/walidforge-skills/scripts/forge.js doctor /path/to/project
node /path/to/walidforge-skills/scripts/forge.js doctor /path/to/project --json
```

The tool reads a bounded set of root metadata and prints observed ecosystem
markers, declared check commands, conventional candidates, metadata conflicts
and relevant discovery steps. It never runs your project's commands, installs
dependencies, writes to the project, reads `.env`, uploads data or contacts services.
Read the proposed command and the repository's documentation before executing it.
A declared script can still be broken, expensive or unsafe.

| Label | What it establishes | What it does not establish |
|---|---|---|
| `declared` command | A supported manifest declares the script and the invocation's manager has supporting evidence | Dependencies installed, script safe or tests passing |
| `candidate` command | A conventional command could fit an observed marker | That this project uses that command |
| `needs-attention` status | Discovery found an ambiguity, limit or follow-up | That the code is defective or insecure |
| `ready-to-inspect` status | Discovery found no metadata findings | Readiness to merge, deploy or ship |

The CLI returns exit 0 for a completed diagnosis (including findings), and exit 2
for invalid usage or an unreadable project directory. It is an orientation tool,
not a quality gate. JSON has a versioned schema with `ecosystems`, `frameworks`,
`commands`, `findings`, `next_steps` and `limits`. Do not feed status into a deploy
gate as a quality verdict.

### What it recognizes

JavaScript/TypeScript manifests and npm, pnpm, Yarn or Bun lock evidence; Composer;
Python project markers; Go; Rust; Ruby; Maven/Gradle and wrappers; .NET project and
solution files; Dart/Flutter; Swift packages; containers and Terraform.

A marker establishes only that ecosystem's presence. Framework names come from
supported JSON dependencies; Flutter is a narrow SDK-marker check, not a full
YAML parser. Swift can be a server or library, and Dart can be a CLI. Python/Ruby
test commands need project-specific inspection. Android/Xcode projects nested
below the selected directory require opening the relevant package. Kubernetes,
Bazel, embedded tooling and other stacks use manual README/CI discovery.

For monorepos, diagnose the package involved in your task. The tool does not
recursively inspect workspaces or assume root scripts cover every package.
Metadata symlinks, files over 1 MiB and unsupported script names are skipped.
Per-skill installations do not include this CLI; the workflows also work manually.

## Choose a useful first request

| Situation | Request to your agent | What you should receive |
|---|---|---|
| Joining a codebase | "Trace a real request from entry point to data and response; cite source files. Explain the boundaries." | A source-backed map and canonical commands |
| A failing feature | "Reproduce this behavior, show the failing regression, fix the cause and run the relevant checks." | Reproduction, focused fix and actual results |
| No tests around old code | "Characterize this boundary before changing it. Preserve behavior outside the requested fix." | Limited characterization, not a forced rewrite |
| New functionality | "Define acceptance criteria, reuse our stack and deliver one complete user path first." | Reviewable scope and a verified vertical slice |
| Native mobile | "Verify local saves across process recreation, reconnect and account change. Report actual device coverage." | State ownership, lifecycle proof and honest runtime limits |
| A release | "Prepare rollout health criteria and data recovery; identify the pending production action." | A concrete release artifact and explicit authorization boundary |
| Learning | "Explain why this actual code uses this pattern, with a small example. Keep the code unchanged." | An explanation tied to the source |
| Resuming | "Reconcile saved tasks with today's diff and checks, then continue the next incomplete task." | Recovered work state without replaying completed side effects |

A prompt can be in your preferred language; the technical artifact follows your
project's naming and documentation conventions. You do not need to memorize 25
skill names. The host's native discovery, or the optional discovery skill for
hosts that lack it, selects the relevant workflow.

## Ask for evidence you can assess

Every completed slice should connect:

1. **Outcome:** what users or operators can now do.
2. **Decision:** the consequential choice and tradeoff, if applicable.
3. **Evidence:** check actually run, result and relevant environment/revision.
4. **Limits:** checks not run and assumptions that matter.
5. **Next step:** unfinished work, if any.

Example: "Search keeps the newest query's results. Controlled stale-success and
stale-error tests passed with `node --test search.test.js`. Browser keyboard and
screen-reader checks were unavailable; they remain unverified."

A tiny change may need two sentences. A database migration needs compatibility
and recovery evidence. This contract belongs in the report or PR already used;
it does not require a new document for every change.

## Extend the pack from observed gaps

Try a workflow on representative tasks, record where it failed, and add a realistic
regression scenario. Extend the existing owner first. More skills, more rules and
more confident language are not evidence of a better developer experience.
See [contributing](../CONTRIBUTING.md) and [evaluations](../evals/README.md).
