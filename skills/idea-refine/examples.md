# Original Refinement Examples

These examples illustrate decisions; their settings are hypothetical and do not
claim measured user or market validation.

## A developer asks for an architecture generator

Initial idea: generate a full microservice platform from a sentence.
Sharpening question: what decision is hard today when you design a feature?
Answer in this example: deciding ownership and remembering why an option was rejected.

Refined direction: draft a reviewable decision record from explicit constraints and
existing project boundaries. Compare alternatives and retain unanswered questions.
First useful outcome: a developer can explain and review the selected boundary.
Not Doing: automatic deployment, stack replacement or claims that generated design
is validated. Next check: apply the draft to one real feature and compare its missing
inputs with the developer's actual design review.

## A team asks for an offline mobile queue

Initial idea: queue every action and replay automatically.
Sharpening question: which action must survive interruption, and who owns it after
logout or account switching?

Refined direction: preserve one durable account-scoped intent with a stable logical
identity. Specify expiry, conflict and unknown remote outcomes before expanding.
Not Doing: replaying all operations indiscriminately or executing one account's work
under another identity. Next check: exercise interruption and account switch with
controlled fixtures before promising a generalized offline engine.
