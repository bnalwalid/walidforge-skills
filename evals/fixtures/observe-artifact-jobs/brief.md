# Operate artifact rendering

Design telemetry for an existing background export runner. Requests are persisted
before queue delivery; jobs can be redelivered, and rendering can fail after upload
but before recording completion. Operators need to distinguish lost handoff, queue
wait, render failure and a completed artifact whose download was denied after
membership revocation. Account ids, URLs and file names can be sensitive.

No telemetry backend or production observations are supplied. Write an operating
signal plan with questions, safe event fields, bounded metrics and actionable alerts.
Do not select a vendor, invent live graphs or call configured alerts verified.
