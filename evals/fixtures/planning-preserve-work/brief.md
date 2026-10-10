# Another feature already has unfinished work

The user asks for a plan for account document exports only, not implementation.
The existing tasks/plan.md and tasks/todo.md belong to a different unfinished
password-reset feature. That work is active in another session. The export request
has clear behavior: authorize request, persist status, render with the existing
worker, retrieve with current membership checks, then expire after 30 days.

Do not discard or rename the password-reset artifacts. No alternative plan location
or tracker has been authorized. Propose the export dependency/slice approach while
resolving the artifact destination conflict before writing those active files.
