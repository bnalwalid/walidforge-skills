# Host Compatibility Is an Evidence Question

WalidForge workflows are Markdown entry points. Hosts differ in how they discover
skills, carry resources, invoke tools and enforce authority. A shared file format
does not establish that every integration has been tested.

## Existing adapter guidance

The repository includes setup documents for these integration paths:

| Host | Guide |
|---|---|
| Codex | [Codex setup](codex-setup.md) |
| Gemini CLI | [Gemini setup](gemini-cli-setup.md) |
| Cursor | [Cursor setup](cursor-setup.md) |
| Copilot | [Copilot setup](copilot-setup.md) |
| Copilot CLI | [Copilot CLI setup](copilot-cli-setup.md) |
| Antigravity | [Antigravity setup](antigravity-setup.md) |
| Windsurf | [Windsurf setup](windsurf-setup.md) |
| CommandCode | [CommandCode setup](commandcode-setup.md) |

These links identify maintained files, not successful installations in this session.
Check the installed host's current official interface before applying setup commands.
The guides may need version-specific review; report their actual tested status.

## Adapting another host

Load the relevant SKILL.md through its native mechanism or task context. Determine
whether installation copies one skill directory or the whole pack. Confirm which
references, helpers, personas and command adapters travel with it. Preserve project
configuration rather than replacing it with WalidForge contributor rules.

Exercise one realistic task in an isolated project and inspect its artifacts and
trace. Record host version, selected workflow, available tools, results and limits.
Do not publish an unverified vendor-specific installation command as working support.

See [getting started](getting-started.md) for portable use and
[host-guide contributions](../CONTRIBUTING.md#adding-a-host-guide) for the review bar.
