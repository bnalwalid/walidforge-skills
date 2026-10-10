# Contribute a Decision Developers Can Use

WalidForge accepts changes that improve a concrete engineering outcome. Start with
a reproducible gap, the existing workflow that should own it and the evidence that
would show the proposed correction helped.

## Before proposing a new skill

Search the [catalog](README.md) for the same decision or boundary. Read its workflow,
relevant cases and [recorded evaluation decisions](evals/skill-impact.md). Prefer an
extension when the existing owner can express the missing behavior clearly.

When proposing a PR, inspect the actual destination repository's open work for
overlap, using its PR interface or `gh pr list --state open` with the correct repo.
Do not assume remotes named origin/upstream or claim a remote check was completed
without access. Local work explicitly requested by the maintainer can continue
without publishing a proposal or inventing an online coordination requirement.

A genuinely new skill needs a distinct trigger, useful procedure and verifiable
exit condition. Explain why an existing owner cannot cover it, then follow
[skill anatomy](docs/skill-anatomy.md) and [the evaluation contract](evals/README.md).

## Structure

Each skill is `skills/<kebab-case-id>/SKILL.md`, with supported YAML frontmatter and
a workflow that preserves the user's scope. Existing published ids are compatibility
contracts. Use optional resources only when they supply needed detail or executable
behavior; route to them from the entry point.

The content follows [the maintainer-selected style](docs/walidforge-style.md):
constraints, credible options, responsibility boundaries, consequences, proof and
reconsideration conditions. Keep instructions portable across stacks. Platform
syntax belongs in the appropriate adapter or host guide.

## Changing an existing workflow

State the trigger that currently produces a poor result. Explain the final changed
behavior, architectural consequence and meaningful validation. Preserve important
failure cases and authorization boundaries when shortening prose. If a description
change misroutes an existing realistic prompt, fix the description rather than
rewriting that prompt or reducing the quality threshold.

A reviewable change can be broad when original authorship is explicitly requested.
Do not preserve inherited tone at the expense of the maintainer's direction. Report
what was actually rewritten and what remains inherited without implying global
uniqueness or legal independence from a byte-difference result.

## Local verification

The Node tools use built-ins and need no dependency installation. Run the checks
appropriate to the changed boundary:

```bash
node scripts/validate-skills.js
node scripts/run-evals.js --min-rank1 95
node scripts/validate-reference-links.js
node scripts/validate-commands.js
node scripts/validate-artifact-paths.js
node scripts/validate-versions.js
```

For executable changes, run the relevant behavior suite. The complete local set is:

```bash
node --test scripts/*-test.js scripts/lib/*-test.js
bash hooks/session-start-test.sh
bash hooks/sdd-cache-test.sh
bash hooks/simplify-ignore-test.sh
```

The [validation workflow](.github/workflows/validate.yml) runs these checks. It does
not execute paid model evaluations or establish deployment/host activation evidence.
For model scenarios follow [the evaluation guide](evals/README.md) and distinguish
case definition, dry run and actual execution in the report.

## Adding a host guide

Document the package/artifacts carried by the installation and the host-specific
invocation mechanism. Verify current vendor interfaces against official sources;
record a maintainer-tested status only after a real run. A supported format, plausible
install command and successful local validation are different evidence.

Keep reusable workflows separate from repository contributor configuration. Never
instruct users to copy this root AGENTS.md or CLAUDE.md into their applications.
Shared root references and whole-checkout utilities may be absent in per-skill
installs; explain the limit rather than implying they are always available.

## Translations

The maintained catalog and contributor documents currently use English. Discuss a
translation's owner, synchronization process and validation before adding a parallel
maintained copy. Conversation with a developer can use their preferred language;
that does not create a second documentation release.

## Reporting a gap

Use [the skill-gap form](https://github.com/bnalwalid/walidforge-skills/issues/new?template=skill-gap.yml)
with the relevant instruction, real project context, observed behavior and useful
alternative. Remove credentials and private customer data. A small reproducible
scenario is more actionable than a claim that the pack needs to be more senior.

## Contribution terms

New contributions use the repository's [MIT license](LICENSE). Preserve applicable
copyright and permission notices for retained third-party material. Do not treat
rebranding or rewritten prose as permission to remove notices from retained code.
