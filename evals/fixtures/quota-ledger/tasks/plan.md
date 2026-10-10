# Quota reservation delivery plan

Approved local implementation and local per-slice commits in the isolated evaluation
workspace. No push or publication. Keep the existing Python API and runner.

1. Establish account-scoped replay behavior while retaining original response.
2. Reject a reused key with a changed payload without mutation.
3. Verify failed attempts do not occupy a success key and record evidence limits.

Tasks are tracked in tasks/todo.md. Preserve valid baseline tests. Each outcome has
its own observed behavioral RED and subsequent GREEN evidence before its commit.
