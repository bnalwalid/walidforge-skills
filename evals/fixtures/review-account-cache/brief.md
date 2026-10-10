# Review account-scoped caching

Review the proposed account settings endpoint only. The authenticated account is
available, but the new cache key uses only the settings resource id. The storage
query is account-scoped on a cache miss; cache hits return the cached payload before
checking the current account. Resource ids are unique within an account, not globally.
The change also parses the page limit with no upper bound and calls the settings
repository once for each returned item. Existing tests cover a single account with
a warm cache. No production data or runtime is available.

Produce a review with concrete consequences, relevant evidence gaps and prioritized
remedies. Do not edit code, invent a reproduced exploit or call the endpoint secure.
