# Account quota reservations

A Python standard-library, single-process ledger. Run checks from this fixture
folder with `python3 -m unittest -v`. No provider or database is required.

Implement idempotent quota reservations. reserve(account, operation_key, units)
returns the remaining account budget. A replay with the same account/key/units must
return the original result without consuming quota again, even after other operations.
The same key in a different account is a separate operation. Reusing a key with a
different units payload raises ValueError without mutating balances. An operation
that exceeds available quota raises ValueError without recording a successful key.
Units must be a positive integer (not bool); unknown accounts are rejected.

Existing tests exercise only ordinary and invalid reservations. Add meaningful
regressions and observe them fail before fixing the implementation. The ledger is
not designed as a database transaction or durable concurrent service; do not claim
its tests establish distributed atomicity or crash persistence.
