# Navigate WalidForge as a Contributor

Start with the maintainer's [engineering style](walidforge-style.md), then choose the
part of the system your change affects. You do not need to memorize all skills.

## The content path

A developer asks for an outcome. The host discovers a description or a command loads
the workflow. The skill establishes inputs, decisions and evidence; optional
references supply deeper checks. A persona can add a specialist perspective when
selected by the orchestrator. The final result reports what was established.

## Find the owning files

| Task | Start here |
|---|---|
| Improve a workflow decision | skills/<id>/SKILL.md and its eval case |
| Correct discovery | Skill description and positive/negative trigger prompts |
| Align a command | .claude/commands/, .gemini/commands/ and commands/ |
| Improve a specialist report | agents/ and the corresponding workflow |
| Fix a utility or validator | scripts/ and its behavior tests |
| Explain a hook | hooks/ source, operating guide and relevant suite |
| Improve adoption | getting-started.md, adoption-guide.md and developer-handbook.md |

## Understand the evidence

Catalog validators check metadata and layout. Reference validators check links in
workflow resources. Command validation checks equivalent entry points and description
parity. Routing checks use lexical prompts. Behavioral evaluations inspect actual
model traces/artifacts when executed; their fixtures must preserve realistic hazards.
These layers are complementary, not interchangeable.

## Make a reviewable change

Inspect existing source and user changes, identify the observed gap, then describe
the resulting behavior and its limits. Follow [CONTRIBUTING.md](../CONTRIBUTING.md),
[skill anatomy](skill-anatomy.md) and [evaluation guidance](../evals/README.md).
Extending the existing owner is usually clearer than adding a neighboring duplicate.

Run the relevant checks and report actual commands/results. Preserve important
failure and authorization behavior while improving prose. A formatting-only change
need not add tests that mirror its text; executable behavior needs meaningful checks.

## Ownership of the next step

Implementation, review and release are different scopes. Existing user direction
remains valid, while publication, live data changes or outbound communication use
actual authority. Unknown runtime or host behavior stays unknown until tested.

Contributor configuration lives in root AGENTS.md and CLAUDE.md. Application users
receive reusable skills and their required assets rather than those repository rules.
