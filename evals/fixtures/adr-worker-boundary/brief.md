# Proposed rendering boundary

Write an ADR only, following the project's existing docs/decisions directory.
The three-person team has an existing application and background runner. Rendering
consumes enough CPU to delay ordinary requests in a local experiment; production
peak traffic is unknown. The team considers using the existing worker versus a
separately deployed rendering service. No decision has been approved.

Record context, alternatives, tradeoffs and a revisit trigger. Distinguish local
observation from production guarantees. Do not invent approval or implement services.
