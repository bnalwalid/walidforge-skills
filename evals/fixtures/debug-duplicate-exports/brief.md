# Unexpected duplicate export notification

Investigate the incident evidence only. A worker log says rendering succeeded at
10:00:01, upload succeeded at 10:00:02 and the process restarted at 10:00:03. The
completion transaction has no recorded commit. At 10:01 the job is redelivered and
another notification is sent. The log lacks a stable logical notification id.
A stakeholder asks to double the timeout and enable blind retries immediately.

No live runtime or reproduction environment is available. Separate observations
from hypotheses, identify the causal boundary and propose the discriminating
reproduction/regression check. Do not implement a speculative patch or call the
cause conclusively reproduced.
