# Onboarding v2 — working checklist

Ordered so each phase leaves the prototype coherent. Reasoning lives in `PLAN-v2.md`.
Tick as we go. Nothing here is built yet.

---

## Decisions (block Phase 2)

- [x] **D1 — Phone placement.** Keep it early (more leads from abandoners) or move it after
      activation (fewer, warmer, and it buys them their report). Business call.
- [x] **D2 — Age + identity.** Keep as two screens, merge into one, or drop? Nothing upstream
      personalises with them today.
- [x] **D3 — Spanish reach.** Today only ¡Perfecto! and the loader testimonials are localised.
      How far past those should the Spanish path extend?

---

## Phase 1 — Tooling (do first; makes everything after reviewable)

- [x] 1.1 Variant chips in the dev rail — when a context screen is open, show chips for *that*
      screen's variants (goal / work mode / JTBD) so switching is one tap, not a URL edit
- [x] 1.2 Branch matrix: for every goal × mode × JTBD family, which context screens appear and in
      which variant — the artefact that makes gaps visible
- [~] 1.3 Same variant switching in the funnel map — map already has global dials; per-card switching deferred as the matrix covers the review need

## Phase 2 — Cadence (structural; everything later sits inside this order)

- [x] 2.1 Re-sequenced (phone stays early per D1): situation+field moved ahead of the demographics (phone, source, age, identity) to after activation
- [x] 2.2 ~~Situation acknowledgement~~ — built, then **removed**: it repeated the outcome screen's job (recognition + industry stat) and existed only to pad rhythm. Replaced by merging age+gender and re-sequencing.
- [x] 2.3 Reflow every progress-bar percentage end to end
- [x] 2.4 Re-verify back-button history against the new order (skip/no-back sets)
- [x] 2.5 Update dev rail groups + funnel map floors to match

## Phase 3 — Level contradiction (highest churn risk today)

- [~] 3.1 ~~Scenario scoping~~ — user chose to keep "your English level" — "your interview English", never "your English level"
- [x] 3.2 Add the gap explanation: most people speak a band below their comfortable level under
      pressure, so the gap reads as insight, not insult
- [x] 3.3 Relative targets everywhere (their level + 2, capped at Native) — hint meter, level beat,
      plan trajectory. No hardcoded "Advanced"
- [x] 3.4 Branch the hint flow by stated level: A0–B1 keeps scaffolding framing; B2+ gets
      "see a model answer" and refinement framing
- [x] 3.5 Walk an A2 and a B2 persona end to end to confirm neither is contradicted

## Phase 4 — Context screen redesign

- [ ] 4.1 Adopt the text budget rule: one visual, ≤2 text elements above, ≤1 below
- [x] 4.1a `ack` gated by language: Spanish keeps the Spanish build, all six other languages get English
- [~] 4.2 Outcome — **rebuilt to Sriram's layout**: Sarah avatar + branch-specific bubble on top,
      the curve card (badge kept, waypoints moved clear of the line), then the stat statement and
      citation below the graph, then CTA. Old headline-first layout gone. 12 Sarah lines added
      (`SARAH_OUT` / `SARAH_OUT_MODE`, same axis as the stat). Open: half-body Sarah cutout to
      replace the circular avatar
- [x] 4.3 Before/After rebuilt to the Before/After reference layout: two panels, After
      offset and lit, big Before/After words, quoted answer + 3 bullets + character per side,
      curved arrow between. **Quoted moment re-keyed from occupation to JTBD family**
      (`BA_SAY`, 10) with occupation overrides where the question genuinely differs
      (`BA_SAY_OCC`, 8). 60 new bullets in `BA_BULLETS`. Artwork prefers `images/ba2/`
      (family x gender) and falls back to the occupation set until those land
- [x] 4.4 Skill beat — **rebuilt**: left title, "You'll practice/drill/learn/master" label, one big
      number counting 0 → n, the unit line, then 10 topic pills that physically drop into a pile and
      can be dragged. Capsule verlet solver, no library. `SKILLOUT` gained title/lead/n/unit/tags
- [ ] 4.5 Level beat → **comparison**, cut the paragraph
- [ ] 4.6 JTBD-specific templates: **speed demo** (comprehension), **outcome split** (transaction),
      **moment card** (relational) — before/after stays for confrontation only

## Phase 6 — Plan (moved ahead of Phase 5 per Sriram)

Structure agreed A–G. Phone mockups stay separate from output stats.

- [x] 6.A Title driven by goal × JTBD × timeframe × commitment. Timeframe picks the lane
      (<=30 days → JTBD-led, longer → goal-led); minutes × days picks the tier (light/std/deep) so a
      small commitment never makes a big claim. Target level now scales with tier too (+1/+2/+3)
- [x] 6.B End outcome: graph with the milestone named per JTBD, plus 4 outcome bullets per family
- [x] 6.C Output stats as a clean number grid, mockups removed, focus stat highlighted
- [ ] 6.D "How you achieve it" — features explained with phone mockups, tied to their goal
- [x] 6.E Focus skill is now its own section with the prototype slot, removed from the stats grid
- [x] 6.F "Here’s why this plan suits you" (renamed from "A plan that suits you")
- [~] 6.G Proof line now names their cohort ("freelancers practising their price conversations with Sarah"); FAMSTATS stat + occupation testimonial still to add
- [ ] 6.H Bugs: planChips base-list defect, practice score discarded, Sarah names the JTBD

## Phase 5 — Value proposition (currently absent from the whole flow)

> **Re-ordered 31 Jul:** runs after Phase 6 and after a full review pass, not before.

- [ ] 5.1 Three beats after the practice result, before the loader
- [ ] 5.2 Each stated as a consequence for *their* goal, not a feature name

## Phase 7 — Review against the three lenses

- [ ] 7.1 Walk five personas: office/interview, freelancer/pitch, frontline/customer,
      student/exam, homemaker/family
- [ ] 7.2 **Lens 1** — does every screen say something that could only be said to that person?
- [ ] 7.3 **Lens 2** — unbroken escalation: belonging → outcome → evidence → their voice →
      their score → their plan → the ask
- [ ] 7.4 **Lens 3** — A2-readable copy throughout; Spanish path holds where D3 says it should

---

## Backlog (known gaps, not blocking)

- [ ] Freelancer and career-break before/after image pairs (both currently borrow other artwork)
- [ ] Real numbers for the placeholder stats (skill coverage counts, mode outcome metrics)
- [ ] Decide on the "Featured in" press logos — only if the coverage is real
- [ ] Retire the dormant screens (progress curve, old feature demo) or bring them back
