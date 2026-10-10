# Reservation boundary
Design a reservation API for an existing modular service backed by a relational
store with transactions and unique constraints. Do not introduce new services.
Each authenticated tenant owns its inventory. A tenant can reserve its last item;
two requests for different orders can arrive simultaneously. Inventory cannot
become negative. Ownership and quantity arrive in user JSON today.
The payment provider accepts a stable client intent key and supports lookup by key.
A payment request can time out after being accepted. The worker may crash after
the provider call but before acknowledging the queue. A DLQ can be replayed after
seven days. The current deduplication retention is 24 hours.
Old mobile clients continue calling the API for at least 90 days. We need to add
reservation expiry without breaking them. Write a concrete design and test plan
into reservation-contract.md; implementation and provider access are out of scope.
