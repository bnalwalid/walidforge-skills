# Billing release
Existing deployment: one managed container service, PostgreSQL, a queue worker.
The proposed release renames invoices.total_cents to amount_cents in one migration,
then rolls application containers gradually. Old containers still read total_cents.
The rollback document says "redeploy the old image". New invoices may be written
before a rollback. The infrastructure plan replaces the database with a new empty
instance because an immutable setting changed; a successful nightly backup job
exists, but no restore has been tested.
PR workflows run contributor code on a persistent runner with production deploy
credentials. Staging and production each rebuild the image separately from main.
Readiness always succeeds. No one specified release stop conditions.
Keep the managed topology. Prepare devops-data-recovery/release-plan.md and a
reviewable pipeline sketch (not provider-specific commands). Do not apply, deploy,
access secrets or claim live CI/restore evidence. Repository policy requires
release-owner approval immediately before production deployment.
