# Phase briefs — why each one, and exactly what changes

Companion to `CHECKLIST.md`. Order matters: each phase leaves the prototype coherent, and each one
depends on the last being done.

---

## Phase 1 — Tooling

**Why it matters.** We branch on goal (6) × work mode (8) × JTBD family (11). Nobody — including me —
can currently see whether a career/site/crew user gets a sensible before/after, because checking means
hand-editing a URL for every combination. That is exactly how the freelancer mismatch survived until
you happened to spot it. Every phase after this involves comparing variants, so building the lens
first makes all of them cheaper and stops us shipping blind.

**Exact changes**
- Dev rail gains a **Variants** group that appears only when a context screen is open, with chips for
  that screen's own dimensions: Outcome → goal × work mode · Before/After → occupation × JTBD family ·
  Skill beat → the four skills · Level beat → the seven levels. Clicking re-renders in place.
- A **branch matrix** generated from `content.js`: goal × mode → the JTBD list it produces and the
  families behind it. Gaps show up as blanks.
- The funnel map gets the same per-card variant switch.

**Done when** I can sit on the outcome screen and cycle all six goals across all eight modes without
touching the URL, and the matrix has no unintended blanks.

---

## Phase 2 — Cadence

**Why it matters.** Seven questions run with no payoff, and four of them (phone, source, age, identity)
give the user nothing back — we personalise with none of them. That stretch sits immediately after the
warmest moment in the flow (Meet Sarah) and immediately before any value is delivered, which is the
worst possible place for a drop-off. Moving the extractive block after activation also flips the phone
ask from a cost into a reward: they have just spoken English and seen a score, so a number buys them
their report instead of buying us a lead.

**Exact changes**
- Re-wire to: Meet Sarah → situation (+field) → **new situation acknowledgement** → goal → outcome →
  JTBD → JTBD context → skill → skill beat → level → level beat → timeframe → daily → runway → mic.
- Move phone, source, age and identity to after the practice result.
- Build the **situation acknowledgement**: occupation-keyed, short, using the industry stat we already
  have per field.
- Reflow every `data-w` progress value end to end.
- Update `NO_BACK` / `SKIP_BACK` and re-verify back from every screen in the new order.
- Update the rail groups and the map floors to match.

**Done when** no more than two questions run without a payoff before activation, and back behaves
correctly from every screen.

---

## Phase 3 — Level contradiction

**Why it matters.** This is the highest churn risk in the flow. A user who self-reports B2 and is then
told by a twenty-second sample that they are a beginner heading to "Advanced" is being contradicted by
a product they have used for four minutes. It is also not one screen: the hint meter, the level beat
and the plan trajectory all assert the same thing, so fixing it in one place leaves two contradictions
behind.

**Exact changes**
- Scope every score to the **scenario**, not the person: "Your interview English", never "your English
  level". Pulled from their JTBD.
- Add the explanation rather than the assertion: *"You placed yourself at B2. Under pressure you spoke
  at B1 — that gap is exactly what we drill."*
- Replace every hardcoded "Advanced" with a **relative target** (their level + 2, capped at Native)
  across the hint meter, the level beat and the plan trajectory.
- Branch the hint by stated level: **A0–B1** keeps today's scaffolding and encouragement framing;
  **B2+** gets "See a model answer" instead of a hint, and results that name strengths first, then the
  single thing costing them the band.
- Walk an A2 and a B2 end to end.

**Done when** neither an A2 nor a B2 is told something that contradicts their own answer.

---

## Phase 4 — Context screen redesign

**Why it matters.** Every context screen is built identically — headline, subhead, card, caption — so
the eye never knows where to land, and because they all look the same the flow feels repetitive
instead of escalating. The outcome screen is the clearest case: the claim, the citation, the graph and
the mechanism line all compete to be read first.

**Exact changes**
- Adopt the budget: **one visual, at most two text elements above it, one below.** Test: delete all
  the text — does the visual still carry the message?
- **Outcome → stat hero.** The metric becomes the screen; the claim shrinks to a caption; the curve
  becomes a sparkline; the card disappears.
- **Before/After → comparison.** Cut to two bullets a side.
- **Skill beat →** one number, chips, one line.
- **Level beat → comparison**, paragraph deleted.
- Build the three JTBD-specific templates: **speed demo** (comprehension), **outcome split**
  (transaction), **moment card** (relational). Before/after stays for confrontation only, and each
  family maps to exactly one template.

**Done when** every context screen passes the delete-the-text test.

---

## Phase 5 — Value proposition

**Why it matters.** Removing the three-feature carousel left the product's capabilities explained
nowhere in the entire flow. A user reaches the paywall having never been told what the app actually
does. Placing this after the practice result means it lands with evidence — they have just spoken and
seen a number, so "here is how we move that number" is a demonstration rather than a brochure.

**Exact changes**
- Three beats after the result, before the loader: real conversations · instant correction · a plan
  that adapts.
- Each written as a consequence for **their** goal and JTBD, not a feature name.

**Done when** a user could say in one sentence what the product does, and it references their goal.

---

## Phase 6 — Plan

**Why it matters.** This is the payoff for twelve questions and the last screen before the ask. Every
answer is already wired into it — the problem is that it presents personal data in the visual language
of a settings summary, so it reads generic even though it is not.

**Exact changes**
- **Name it**: "Sriram's interview plan", not "Your personal plan is ready".
- **Built-from strip** at the top: situation · goal · JTBD · level, so twelve questions have a visible
  receipt.
- **Trajectory becomes theirs**: starts at their stated level, ends at their target, their timeframe
  on the axis.
- **Week-one preview**: the first three sessions named from their JTBD.
- Sarah's closing line names their JTBD.

**Done when** two different personas' plans are unmistakably different at a glance.

---

## Phase 7 — Review

**Why it matters.** Per-screen work cannot catch arc problems. Everything above improves individual
screens; only a full walk shows whether the emotional escalation holds and whether a given persona is
served throughout rather than in patches.

**Exact changes**
- Walk five personas end to end: office/interview · freelancer/pitch · frontline/customer ·
  student/exam · homemaker/family.
- Judge each against the three lenses: value per persona, unbroken build to the paywall, copy and
  localisation.
- Produce a fix list and work it.

**Done when** the fix list is empty or consciously deferred.
