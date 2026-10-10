# Offline field report
An existing Flutter app lets technicians write reports in basements without
connectivity. Reports have text and photos. The prototype stores its upload queue
in memory and shows "synced" as soon as the technician taps Save.
The OS can kill the process during upload; a successful server response may be
lost. The server accepts an intent key, returns status by key and authorizes
resources per account. Technicians can switch accounts on the same phone.
A notification deep link opens a report; it may arrive while logged out. Camera
permission can be denied. A new release will change the local report schema.
No Flutter SDK, device, backend or store credentials are available in this fixture.
Produce mobile-offline-lifecycle/delivery-plan.md with state transitions, storage
and sync ownership, a migration/recovery plan and testable acceptance criteria.
Use the existing app stack; adding a new platform is out of scope.
