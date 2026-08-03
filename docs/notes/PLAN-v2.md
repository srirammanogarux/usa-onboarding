# Onboarding v2 — diagnosis and execution plan

Written 31 Jul 2026. Nothing in the prototype has been changed for this document.

---

## 0. Two facts worth correcting first

**The dry run is longer than it felt.** After *Meet Sarah* there are **seven** questions before the
next payoff, not five or six: phone, source, age, identity, situation, field, goal. Measured cadence
across the whole flow, counting questions between context screens:

```
1  ·  2  ·  7  ·  1  ·  1  ·  1  ·  3  ·  1
```

That single 7 is the whole problem. Everything else is already well paced.

**The plan screen does use every answer.** It reads goal, JTBD label, skill, level, minutes and the
resolved occupation — the title, the scenario chips, the practice donut, the trajectory and the
"a plan that suits you" rows are all driven by real answers. So this is **not** a data-capture gap.
It is a *dramatisation* gap: the plan presents personal data in the visual language of a settings
summary, so it reads as generic even though it isn't. That changes the fix entirely — we are not
plumbing more data in, we are making the data that is already there feel earned.

---

## 1. Cadence — the real problem is *which* questions, not how many

The seven-question run splits into two kinds that deserve opposite treatment:

| Kind | Questions | What the user gets | What we personalise with it |
|---|---|---|---|
| **Generative** | situation, field, goal | the entire downstream flow | everything |
| **Extractive** | phone, source, age, identity | nothing | nothing (source is attribution, age/identity are analytics) |

Padding the extractive run with acknowledgement screens would reward the user for nothing and make
the flow longer. The fix is to **move the extractive block out of the critical path** entirely.

### Proposed sequence

```
Splash → Sign up
Language → ¡Perfecto! → App language
Name → Meet Sarah
Situation (+ Field) → SITUATION ACK ▲new
Goal → Outcome
JTBD → JTBD context
Skill → Skill beat
Level → Level beat
Timeframe → Daily minutes → Runway
Mic → Practice → Results
VALUE PROP ▲new
Phone → Source → Age → Identity   ← extractive block, moved here
Loader → Plan → Promise → Paywall
```

New cadence: **never more than two questions without a payoff** until the extractive block, which
now sits *after* the user has spoken English and seen a score — the one moment where a phone number
buys them something real (their report) rather than costing them trust.

**Decision needed:** moving the phone ask after activation trades lead capture from abandoners for
warmer, higher-intent captures. That is a business call, not a design one.

---

## 2. Context screens — a design language, not one-off layouts

Every context screen today is built the same way: headline, subhead, card, caption. Four text blocks.
They read as slides. The outcome screen is the clearest case — the claim, the citation, the graph and
the mechanism line are each competing to be the thing you read first.

### The rule

> **A context screen carries one idea in one visual, with at most two text elements above it and one
> below. If the message survives deleting all the text, the visual is doing its job.**

### Five archetypes

| Archetype | Carries | Use for | Text budget |
|---|---|---|---|
| **Stat hero** | one enormous number | outcome | 5-word claim + source |
| **Comparison** | two states side by side | before/after, level now → next | 2 words per side |
| **Artifact** | a believable object (report, paper, phone screen) | proof, weekly report | 1 caption |
| **Scene** | the illustrated moment | JTBD moments | 1 caption |
| **Trajectory** | a curve with waypoints | plan projection | 3 labels + 1 line |

### Applied to the outcome screen

Current: 3-line headline + citation + graph card + badge + mechanism line.
Proposed **stat hero**: the metric becomes the screen (72–96px), the claim shrinks to a caption
beneath it, the curve becomes a small sparkline rather than a card, and the mechanism line stays as
the single bottom element. One idea, three text elements, no card.

---

## 3. The level contradiction (the sharpest problem here)

A user who self-reports **B2** and is then shown a beginner-flavoured hint flow and told "this will
take you to Advanced" is being contradicted by the product on the strength of one 20-second sample.
Being told you are worse than you think, by an app you have used for four minutes, is a churn moment.

### Three moves, together

1. **Scope the score to the scenario, not the person.** "Your interview English", never "your English
   level". A number about one hard moment is credible; a verdict about them is not.
2. **Explain the gap instead of asserting it.** Most people speak roughly a band below their
   comfortable level when under pressure. Said out loud, the gap becomes an insight rather than an
   insult: *"You placed yourself at B2. Under pressure you spoke at B1 — that gap is the whole game,
   and it is exactly what we drill."*
3. **Branch the hint flow by stated level.**
   - **A0–B1** — current flow. The hint is scaffolding, and the framing is encouragement.
   - **B2+** — the hint is reframed as *"see a model answer"* (a reference, not a crutch), and the
     result is refinement, not remediation: their strong areas are named first, then the specific
     thing costing them the band.
4. **The target must be relative.** Never a hardcoded "Advanced" — always their level plus two bands,
   capped at Native, so a B2 sees C2 and an A2 sees B2.

---

## 4. The plan — dramatise what is already there

The data is all present. What is missing is the sense that it was *built for them*.

- **Name the plan.** "Sriram's interview plan", not "Your personal plan is ready".
- **Show the inputs.** A "built from" strip at the top — situation · goal · JTBD · level — so the
  receipt for twelve questions is explicit and visible in one glance.
- **Make the trajectory theirs.** Start it at their stated level, end at their target, with their
  timeframe on the axis. Today's curve would look the same for anyone.
- **Preview week one by name.** The actual first three sessions, titled from their JTBD, so the plan
  contains something concrete rather than only projections.
- **Sarah should name the thing.** Her closing line should reference their JTBD, not "your first scenario".

---

## 5. Value proposition — currently nowhere

Removing the three-feature carousel from the splash left the product's actual capabilities
unexplained anywhere in the flow. The strongest slot is **after the practice result, before the loader**:
the user has just spoken and seen a number, so "here is how we move that number" lands with evidence
behind it rather than as a brochure.

Proposed: **three beats, one screen each, tied to what they just did** — real conversations, instant
correction, a plan that adapts — each stated as a consequence for *their* goal rather than a feature name.

---

## 6. Branching — the map we do not have

We branch on goal (6), work mode (8) and JTBD family (11), and the context screens vary across all
three. Nobody can currently see that. Two deliverables:

1. **A branch matrix** — for every (goal × mode × JTBD family), which context screens appear and in
   which variant. This is the artefact that makes gaps visible, e.g. a career/site/crew user seeing a
   before/after built for confrontation.
2. **Variant chips in the dev rail.** When a context screen is open, the rail should show chips for
   that screen's own variants (goal, mode, JTBD) so switching between them is one tap rather than a
   URL edit. This is the tooling that makes reviewing 78 permutations actually possible.

---

## 7. Acceptance — the three lenses

Every phase below is judged against these, not against "is it built".

1. **Value per persona** — walk the flow as five personas (office/interview, freelancer/pitch,
   frontline/customer, student/exam, homemaker/family). Does each screen say something that could
   only have been said to *that* person?
2. **Emotional build to the paywall** — is there an unbroken escalation: belonging → outcome →
   evidence → their own voice → their own score → their plan → the ask? Any screen that flattens it
   is cut.
3. **Copy and localisation** — is every line answerable at A2 reading level, and does the Spanish
   path stay Spanish where it matters? Currently only ¡Perfecto! and the loader testimonials are
   localised; the rest of the flow is English regardless of the language answer. That is a gap.

---

## 8. Execution order

Sequenced so that each phase leaves the prototype coherent and reviewable.

| Phase | Work | Why first |
|---|---|---|
| **1. Tooling** | Variant chips in the rail + branch matrix doc | Everything after this is easier to review; we stop editing URLs |
| **2. Cadence** | Re-sequence per §1, add the situation ack | Structural; every later screen sits inside this order |
| **3. Level fix** | Scenario-scoped scoring, relative targets, B2+ branch | Highest churn risk in the flow today |
| **4. Context redesign** | Apply the five archetypes to outcome, before/after, skill, level | The bulk of the visual work, done once the structure is stable |
| **5. Value prop** | Three beats after the result | New screens, slot now exists |
| **6. Plan** | Dramatise, name, preview week one | Last because it consumes everything above |
| **7. Review** | Five-persona walk against the three lenses | Judgement pass, expect a round of fixes |

**Open decisions before phase 2:** phone placement (lead capture vs trust), whether age/identity
survive at all, and how far the Spanish path should extend beyond the two screens it covers today.
