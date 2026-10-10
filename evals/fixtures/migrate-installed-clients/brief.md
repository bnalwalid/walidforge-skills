# Retire an export status field

Plan a migration only. The server currently sends status=ready; a proposed release
renames it to complete and drops ready immediately. Native clients may remain
installed for 90 days and old retry jobs can replay for seven days. Existing telemetry
counts API requests but does not identify client contract versions. A calendar
removal date is proposed without adoption evidence.

Design coexistence, consumer guidance, usage measurement and a removal condition.
Do not deploy, send announcements or assume all clients upgrade together.
