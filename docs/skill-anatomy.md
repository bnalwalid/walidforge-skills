# Package a Workflow Without Obscuring Its Purpose

A skill's entry point should change the developer agent's next decision in a useful
way. Packaging supplies discovery and portability; added folders are justified by
what they enable.

## File location and discovery

Use `skills/<published-id>/SKILL.md`. The id is lowercase kebab-case and matches the
frontmatter name. Preserve existing published ids unless a real compatibility
migration is planned.

```yaml
---
name: example-workflow
description: Resolves a specific engineering decision. Use when its concrete trigger occurs.
---
```

The description communicates capability and trigger, without becoming a second
procedure or attracting every task. The current validator limits it to 1024
characters and accepts the specification fields name, description, license,
compatibility, metadata and allowed-tools. See [the Agent Skills specification](https://agentskills.io/specification)
for the format and [host configuration](advanced-per-agent-configuration.md) for
runtime-specific distinctions. Do not place arbitrary model/tool controls at the
top level or assume a metadata key has runtime effect on every host.

## Workflow sections

The catalog convention is Overview, When to Use, Process, Common Rationalizations,
Red Flags and Verification. Equivalent process/section headings are supported by
the validator; established exceptional entry points have explicit exemptions.
Use the layout to make these questions answerable:

| Concern | Content that helps |
|---|---|
| Purpose | What outcome or decision the workflow resolves |
| Activation | A concrete trigger and a useful exclusion where needed |
| Procedure | Inputs, ownership, consequential choices and failure behavior |
| Shortcuts | A tempting error and its practical correction |
| Diagnosis | Observable signs that the workflow went wrong |
| Completion | Evidence that establishes the bounded claim |

Avoid generic tutorials, invented benchmarks and universal folder hierarchies.
Use the actual repository test/build commands rather than imposing npm on every
stack. Examples are hypothetical unless a real source is cited; do not present them
as the maintainer's historical coding style.

## Supporting resources

Put substantial mode-specific guidance beside its owning skill and link it from the
entry point with a reason to read it. Add a script when repeatable execution improves
reliability, not solely to make the directory look complete. Use the language and
runtime appropriate to that script; Bash is not mandatory for every helper.

Pack-level checklists shared by skills live under the root `references/`. Whole-pack
installs can carry them; copying one skill directory alone may leave them behind.
Keep the entry point's essential workflow usable without optional pack references,
and explain a missing reference rather than claiming it was loaded.

There is no automatic line-count threshold for creating a supporting file. Split
when it reduces irrelevant context or gives a resource a real execution purpose.

## Write the procedure, not the workaround

Describe the required outcome and capabilities, preserving user scope and authority.
Do not add a universal ritual because one model once failed a call. A claim about
host behavior or a measured improvement needs its actual source and environment.

Keep core reasoning stack-neutral while making relevant hazards concrete: atomic
writes, response ordering, account-scoped durable intent or mixed-version recovery.
Host-specific syntax belongs in an adapter; installed framework semantics require
version-appropriate official evidence.

## Executable helpers

Document accepted inputs, side effects, outputs, runtime prerequisites and failure
status. Preserve user data and unrelated work. Use structured input or file/stdin
handling instead of interpolating artifact text into shell commands. A read-only
label must match implementation, including network and target-write behavior.

## Validate the deliverable

Follow [local verification](../CONTRIBUTING.md#local-verification). Check actual
frontmatter, local references, command parity and relevant behavioral scenarios.
Describe packaging/routing results separately from model and runtime evidence.
