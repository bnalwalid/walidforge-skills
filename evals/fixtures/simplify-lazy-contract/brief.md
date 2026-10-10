# Refactor boundary

Review a simplification proposal only. The current config resolver checks an explicit
value first, then lazily invokes an expensive default provider when the explicit
value is absent. Empty string is an explicitly supported value. The provider can
throw, and callers rely on it not being invoked when a value is present.

The proposed replacement evaluates the default first, then uses a truthiness
fallback. Explain whether this preserves results, error timing and side effects.
Propose a clearer equivalent shape and meaningful characterization cases without
implementing a new feature or changing the contract.
