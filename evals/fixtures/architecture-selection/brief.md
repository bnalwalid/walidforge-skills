# Account document exports

Produce a design specification only. Do not implement the feature.

We have one application maintained by three developers, a relational database,
private object storage and an existing background job runner. Keep our current
language, framework and hosting. The repository's documented verification commands
are `make test` and `make check`; their execution has not been verified in this brief.

Account members need PDF exports of their account's records. Rendering currently
takes around four seconds in a local experiment; this is not a production SLA.
We expect about 2,000 exports per day, but have no measured peak traffic. Files expire
after 30 days. Downloads must check current account membership, including after
membership revocation. Jobs can be delivered more than once and workers restart.
The UI should let the user leave and return to the export status.

There is no requirement for independently deployed teams or services. A colleague
suggests microservices, full CQRS and event sourcing because these are senior patterns.
Compare appropriate alternatives and document the decision, boundaries, failure
cases and verification strategy. Identify any missing product decisions; do not
invent throughput guarantees, regulatory duties or operational capabilities.
