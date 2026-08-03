# The plan screen — the six jobs, and the section that does each

Ideation. Nothing built yet beyond the dev-rail cohort chips.

Sriram's brief, restated as jobs the screen must do:

| | Job |
|---|---|
| **A** | Convince them this plan reaches their goal, and that we take their JTBD seriously — not just naming it in a title |
| **B** | Show what they will actually **do** in the app, feature by feature |
| **C1** | Show how many words / sounds / rules they will have mastered, weighted to the area they picked |
| **C2** | Show that we practise their picked area most, and what one day looks like |
| **D** | Summarise their profile so it is obvious we captured their intent |
| **E** | Social proof: stats and testimonials |

Today the screen does a weak version of **D** and **E** and nothing else.

---

## Section map

| # | Section | Jobs | New content |
|---|---|---|---|
| 1 | The promise | A | 11 lines |
| 2 | Your profile, as we understood it | D | none |
| 3 | The climb | A | 11 lines |
| 4 | A day in your plan | B, C2 | ~12 lines |
| 5 | What you will have mastered by *date* | C1 | none (computed) |
| 6 | Week one, by name | A | 33 lines |
| 7 | What changes for you | A | **none — already written** |
| 8 | Someone like you | E | **none — already written** |
| 9 | Sarah closes | A | 11 lines |

---

## 1 · The promise — job A

A title that names the JTBD is not the same as taking it seriously. The way to take it seriously is
to **state the outcome in the language of that conversation**, then immediately show the actual
conversations. So the promise and the proof sit in the same fold.

```
              Built from your 12 answers

              Sriram, in 3 months you will
              defend your price
              without flinching.

              B1 today  →  Advanced by October
```

**Per cohort:** one promise line per JTBD family (11), written in that conversation's own words.

| Family | Promise |
|---|---|
| interview | walk into an interview and lead the room |
| pitch | defend your price without flinching |
| crew | say the plan once and have it land |
| meetings | say the thing you were going to say after the meeting, in the meeting |
| fastspeech | follow fast speakers without asking them to repeat |
| customer | take any customer call without rehearsing first |
| services | handle a doctor, a bank or an office on your own |
| smalltalk | start the conversation instead of waiting for it |
| family | speak to your child's teacher as an equal |
| exam | walk into the exam with nothing left to guess |
| pronunciation | be understood the first time, every time |

---

## 2 · Your profile, as we understood it — job D

Directly under the promise, because "did they actually listen?" is the question being asked in the
first two seconds. Six facts, one glance, no prose.

```
   Who you are      Freelancer
   Why you're here  Grow my career
   What you'll fix  Explain and defend my price
   Where you are    B1 · from your 20-second practice
   How fast         3 months
   How much time    15 minutes a day
```

**Per cohort:** every row. **New content:** none, all six are answers.
**Replaces:** the "A plan that suits you" card currently fourth of five.

---

## 3 · The climb — job A

Their level, their target, **their timeframe on the axis**. Two milestones, both named rather than
abstract:

```
                                        ● Advanced
                                ╭───────╯  October
                        ╭───────╯
              ╭─────────╯ Week 3
    ● B1 ─────╯           first time you hear it yourself
    today
```

**Per cohort:** start (7 levels), target (relative, +2 capped), timeframe (5), and a week-3
milestone line per family (11).
**Bug fixed:** `const MONTHS=6` currently ignores the timeframe answer entirely.

---

## 4 · A day in your plan — jobs B and C2

The feature explanation, told as *what you will do* rather than what the app has. Minutes are split
live from their own answer, and the section visibly gives their chosen skill the most time.

```
   Your 15 minutes

   ●  Speak            7 min   A real client asks what you charge.
                               You answer out loud, unscripted.

   ●  Get corrected    3 min   Sarah marks every sentence. You see
                               exactly which words cost you.

   ●  Drill            3 min   The sounds and words that slipped,
                               practised until they stop slipping.

   ●  Bank it          2 min   One phrase you keep, for tomorrow.

   Most of your time goes to Fluency, because that is what you chose.
```

**Per cohort:** the minute split (6 minutes × 4 skills), the "speak" line keyed to their JTBD family
(11), and the closing line naming their chosen skill (4).

This is the section that also answers job B — every feature appears as a verb they will perform.

---

## 5 · What you will have mastered by *date* — job C1

Four counters, computed from their own two answers (minutes a day × timeframe), weighted by the
skill split from section 4. The number for the skill they picked is the largest and is shown biggest.

The totals we already have in `SKILLOUT`: **500+** scenarios · **44** sounds · **3,000** words ·
**120** grammar rules. The counters are a fraction of those, so the paywall still has somewhere to go.

Worked examples straight from the model:

| Cohort | Conversations | Words | Rules | Sounds |
|---|---|---|---|---|
| Freelancer · 15 min · 3 months · **fluency** | **96** | 153 | 58 | all 44 |
| Student · 30 min · 1 month · **vocabulary** | 38 | **222** | 39 | 29 |
| Nurse · 10 min · 6 months · **pronunciation** | 77 | 204 | 78 | **all 44, 2× each** |

```
   By October you will have

        96                 153            58           44
   conversations       new words     grammar rules    sounds
       had              learned        mastered      drilled
```

**Per cohort:** all four numbers change with minutes, timeframe and skill. **New content:** none.

### ⚠ Two honest problems with this section

1. **Short, low commitments produce embarrassing numbers.** A homemaker at 5 minutes a day for
   2 weeks gets *5 conversations, 7 words, 3 rules*. That undersells the product and reads as a
   reason not to buy. Options: show the counters at a fixed 3-month horizon regardless of their
   timeframe; or switch to a weekly rate under 30 days ("every week: 3 conversations, 12 new words");
   or drop the counters for those cohorts and lead with the week-3 milestone instead.
   **This needs your call.**
2. **The rates are invented.** Words per minute, minutes per grammar rule — I made them up so the
   arithmetic is consistent. They need real product numbers before this ships, the same caveat as the
   outcome-screen stats.

---

## 6 · Week one, by name — job A

The only concrete thing on the screen. Everything else is projection. This is what proves we took the
JTBD seriously.

```
   Week one

   1   "So what do you charge for this?"          Day 1 · 4 min
   2   Explaining what is included                Day 2 · 5 min
   3   Holding your price when they push back     Day 3 · 5 min
```

**Per cohort:** 3 sessions × 11 families = 33 lines.
**Replaces:** the broken scenario chip list, and the arbitrary "30 days of practice".

---

## 7 · What changes for you — job A

Already written in `OCCBA`, for all 14 occupations, and rendered nowhere today.

```
   In six weeks, when a client asks
   "So what do you charge for this?"

   Today    "… It depends… I can send… email later?"

   After    "My rate is fixed, and here is exactly
             what you get for it."
```

**Per cohort:** 14 occupations. **New content: none.**

---

## 8 · Someone like you — job E

Two halves. The stat comes from `FAMSTATS` × `OCCWHO` (11 × 14, written, currently unreachable
because it lives on the dormant `ctxstat` screen). The testimonial comes from `OCCBA[occ].testi`
(14, written, rendered nowhere).

```
   84% of freelancers on Stimuler quote their price
   without hesitating within a month.

   ★★★★★
   "I stopped undercharging the moment I could
    explain my value."
   Andrea C. · Austin · freelancer
```

**Per cohort:** 154 stat combinations, 14 testimonials. **New content: none.**
**Replaces:** the anonymous "2,340,000+ learners" block, or sits above it.

---

## 9 · Sarah closes, naming the thing

```
   "I will be in every session with you.
    We start with what you charge."
   Sarah, your coach
```

**Per cohort:** 11. Today it says "your first scenario" to everyone.

---

## What gets cut

| Cut | Why |
|---|---|
| The 3-item checklist | All three lines duplicate other sections |
| "30 days of practice" | Derived from no answer |
| The scenario chip list | Wrong list for override cohorts, nothing highlighted, replaced by week one |
| "Paced for 15 minutes a day" | Third statement of the same number |
| "Starts at your B1 level" | Second statement of the same fact |
| "2,340,000+ learners" | Replaced by a stat about people in their own job |

---

## Bugs to fix regardless of design

1. `const MONTHS=6` ignores the timeframe answer — a "within 2 weeks" user is told "6 months"
2. `planChips` reads the base JTBD list, not the work-mode override list, so a freelancer sees
   corporate scenarios with nothing highlighted
3. The practice score is computed, animated, then discarded — section 2 needs it
4. Sarah's closing line does not name their JTBD

---

## New content to write

| Item | Count |
|---|---|
| Promise line per family | 11 |
| Week-3 milestone per family | 11 |
| Session "speak" line per family | 11 |
| Week-one sessions | 33 |
| Sarah's close per family | 11 |
| **Total** | **77 lines** |

Sections 2, 5, 7 and 8 need no new copy at all.

---

## Open question: does this absorb Phase 5?

Section 4 explains every feature as something the user will do. If that lands, the three
value-proposition screens planned for Phase 5 have nothing left to say, and the flow gets three
screens shorter. Worth deciding before building either.
