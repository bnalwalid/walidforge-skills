---
name: interview-me
description: Extracts what the user actually wants instead of what they think they should want. Uses a focused one-question-at-a-time interview to resolve consequential uncertainty about the underlying intent. Use when an ask is underspecified ("build me X" without "for whom" or "why now"), when the user explicitly invokes ("interview me", "grill me", "are we sure?", "stress-test my thinking"), or when you catch yourself silently filling in ambiguous requirements before any plan, spec, or code exists.
---

# Ask the Question That Changes the Design

## Overview

Clarify the underlying user need through a short, focused interview. Stop when consequential uncertainty is resolved instead of chasing an invented confidence percentage.

## When to Use

Use for underspecified outcomes or an explicitly requested interview. Do not restart discovery after the user has already supplied actionable choices.

## Process

### Form a provisional understanding

Read existing context and separate the stated solution from the outcome it may serve. Identify audience, present pain, desired change and constraints already known. Do not infer the user's personal practices from unrelated installed tools.

### Ask one consequential question at a time

Choose the missing fact most likely to change scope or architecture. Offer a reasonable interpretation as a provisional guess when helpful, while leaving room for correction. Do not deliver a solution before understanding the need. Let each answer determine the next question rather than presenting a long intake form.

For “build me a dashboard,” the first useful question may concern the decision its users need to make, not which chart library they prefer. Challenge a stated requirement gently when it conflicts with the desired outcome; explain the tradeoff rather than overriding the preference.

### Distinguish preferences from constraints

Record what the user explicitly chose, what the project requires and what remains an assumption. A desire for detailed architecture does not imply a favorite framework or universal layering scheme. Choices already answered remain in force across turns.

### Restate the actionable intent

Use the user's terms to summarize the audience, outcome, scope/non-goals, important constraints and unresolved decisions. Seek clarification when the interpretation materially differs or authorization is still required. Explicit instructions to proceed and answers that settle the design are sufficient; do not demand a separate ceremonial yes.

### Hand off without exceeding scope

For interview-only requests deliver the clarified brief. When drafting or implementation is also authorized, proceed with `spec-driven-development` once material unknowns are resolved. Keep optional questions from blocking useful independent work. Do not claim numerical certainty about another person's intent.

## Common Rationalizations

| Shortcut | Correction |
|---|---|
| The user named a tool so the need is understood | Identify the outcome that makes the tool useful. |
| More questions guarantee better requirements | Ask the next question only if its answer changes a decision. |

## Red Flags

- Questions repeat answers already given.
- A framework is selected before audience/outcome is understood.
- The interview expands into unrelated strategy.

## Verification

- [ ] Questions follow one at a time and respond to prior answers.
- [ ] Underlying outcome and explicit preferences are recorded.
- [ ] Consequential uncertainty is resolved or named.
- [ ] The handoff matches the requested scope without duplicate approvals.
