# Review cleanup authority

Review a temporary-artifact cleanup design only. The handler accepts a user-supplied
file path, verifies that its raw string begins with the configured temp directory,
and then recursively deletes it. Symbolic links and dot segments are permitted,
no ownership token is checked, and a validation error falls back to deleting the
entire temp directory. No live filesystem access is authorized.

Identify the asset and trust boundary, concrete failure paths and controls that
must be established before deletion. Do not delete files, print credentials or
claim that merely resolving a path eliminates races.
