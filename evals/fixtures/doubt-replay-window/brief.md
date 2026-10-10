# Review the claim, not production

Review this proposed payment retry design only. Do not call a provider or execute a
migration. The team's contract permits jobs to remain queued/replayed for seven days.
The proposed deduplication records expire after 24 hours. A retry uses the original
logical operation key if the record exists, but generates a new key if it has expired.
A provider timeout is recorded as failed and immediately retried without reconciliation.

The proposal claims every redelivery is safe and cannot duplicate a payment. Test
these assumptions with a concrete timeline/counterexample based on the supplied
contract. No independent reviewer or provider sandbox is available in this scenario.
Separate verified contradictions from matters that need external evidence.
