# Report-only quality checks

The project already has a test runner and a coverage report. Its declared
check:coverage command exits zero even when the reported value drops. Current
coverage is 68%, and no changed-line coverage calculator exists. The team wants
non-regression enforcement without making today's branch permanently red.

Define the adoption plan and CONSTRAINTS.md content only. Do not silently install a
new checker or claim that producing a report enforces a threshold. Explain required
measurement consistency, verdict mechanism and check placement.
