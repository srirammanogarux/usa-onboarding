# Branching logic

Everything the flow personalises hangs off five answers. This document is the
complete map of them, and of every branch they can produce.

Machine-readable version: [`data/branching.json`](data/branching.json).
Regenerate both with `node tools/export-docs.js`.

---

## The five axes

| answer key | screen | values | what it drives |
|---|---|---|---|
| `qocc` | `qocc` | 8 occupations | collapses to a **work mode**, which picks the JTBD list; also names the cohort in the plan's proof line |
| `qgoal` | `qgoal` | 6 goals | the outcome screen, the plan's long-lane claim, half of the copy key |
| `fam` | `qjtbd` | 9 reachable families | the other half of the copy key; drives before/after, the plan's JTBD section, the practice question |
| `qskill` | `qskill` | 4 skills | the skill beat, the plan's focus section, which score lands lowest |
| `qlevel` | `qlevel` | 5 CEFR levels | the target level, the trajectory graph, and whether the practice uses scaffolding or a model answer |

Two more answers shape the plan without branching copy: `qtime` (timeframe) picks
the title's **lane**, and `minutes` × timeframe picks its **tier**. See
[`COPY.md`](COPY.md).

---

## Occupation collapses to work mode

The user picks a specific situation. The flow does not branch on all eight of
those directly, because several of them want the same conversations. `WORKMODE`
collapses them, and the JTBD list is chosen by the **mode**, never by the raw
occupation.

`OCCWHO` is the one place the raw occupation still matters: it names the cohort
in the plan's proof line, and only when the goal is `career`. For every other
goal, `GOALWHO` names them by goal instead, because a traveller's job is not the
interesting thing about them.

<!-- occupations:start -->
| occupation key | work mode | shown as | proof-line cohort |
|---|---|---|---|
| `careerbreak` | `careerbreak` | Career break | people returning to work |
| `office` | `office` | Office professional | office professionals |
| `freelancer` | `ownboss` | Freelancer | freelancers |
| `business` | `ownboss` | Business owner | business owners |
| `jobseek` | `jobhunt` | Job seeker | job seekers |
| `home` | `athome` | At home | parents |
| `student` | `student` | Student | students |
| `other` | `other` | Learner | learners |
<!-- occupations:end -->

`freelancer` and `business` share `ownboss`; everything else is one to one.
Eight occupations, seven modes.

---

## Goal x family is the copy key

`qjtbd` shows a list of concrete, human-readable options ("Ace a job interview",
"Sort out any mix-up abroad"). There are 47 distinct labels across the flow.
Each one carries a `fam` - a **JTBD family** - and the families are what the copy
is actually keyed on. Nine are reachable.

A family alone is not enough. Five of the nine are reached from more than one
goal, and the same family means a different thing under each: `exam` under
`ielts` is IELTS Part 2, under `school` it is a classroom oral. So the copy key
is **`goal|family`**, and there are 20 reachable pairs.

Resolution order for every branch-keyed string on the plan:

```
PLAN_GF['goal|family']  ->  the family map  ->  the 'smalltalk' fallback
```

`PLAN_GF` holds only the pairs where the goal genuinely changes the meaning -
12 of the 20. The other 8 fall through to the family map, which is written for
the goal that owns that family most (`career` for interview / pitch / meetings /
customer / fastspeech, `convo` for services / smalltalk / family, `ielts` for
exam).

<!-- pairs:start -->
| # | goal | family | plan copy | JTBD options that lead here |
|---|---|---|---|---|
| 1 | `career` | `customer` | family default | "Handle a walk-in customer"<br>"Handle customer calls" |
| 2 | `career` | `fastspeech` | family default | "Understand fast clients"<br>"Understand fast coworkers" |
| 3 | `career` | `interview` | family default | "Ace a job interview"<br>"Answer "tell me about yourself""<br>"Explain a gap in my CV"<br>"Land an internship"<br>"Speak up in interviews"<br>"Start working again"<br>"Talk about skills I built at home"<br>"Talk to my boss with confidence" |
| 4 | `career` | `meetings` | family default | "Speak up in meetings"<br>"Speak up in meetings again" |
| 5 | `career` | `pitch` | family default | "Chase a late payment"<br>"Explain and defend my price"<br>"Negotiate the offer"<br>"Pitch on a client call"<br>"Win a new client" |
| 6 | `career` | `smalltalk` | `PLAN_GF` override | "Handle work small talk again"<br>"Make friends at a new workplace"<br>"Network on campus"<br>"Network to find openings" |
| 7 | `convo` | `family` | family default | "Support my kids at school"<br>"Win over my partner’s family" |
| 8 | `convo` | `services` | family default | "Handle doctors and offices solo"<br>"Talk to teachers and doctors solo" |
| 9 | `convo` | `smalltalk` | family default | "Chat with colleagues outside work"<br>"Get back into everyday chat"<br>"Make friends at the school gate"<br>"Make friends on campus"<br>"Make small talk feel natural"<br>"Meet new people and make friends"<br>"Meet new people at events" |
| 10 | `ielts` | `exam` | `PLAN_GF` override | "Pass the speaking test"<br>"Speak two minutes without freezing" |
| 11 | `ielts` | `fastspeech` | `PLAN_GF` override | "Understand fast native audio" |
| 12 | `other` | `fastspeech` | `PLAN_GF` override | "Understand native speakers at full speed" |
| 13 | `other` | `interview` | `PLAN_GF` override | "Be ready when opportunity knocks" |
| 14 | `other` | `smalltalk` | `PLAN_GF` override | "Speak without overthinking"<br>"Start conversations anywhere" |
| 15 | `school` | `exam` | `PLAN_GF` override | "Pass my speaking exam" |
| 16 | `school` | `fastspeech` | `PLAN_GF` override | "Keep up with fast lectures" |
| 17 | `school` | `meetings` | `PLAN_GF` override | "Speak up in class discussions" |
| 18 | `school` | `smalltalk` | `PLAN_GF` override | "Make friends on campus" |
| 19 | `travel` | `services` | `PLAN_GF` override | "Breeze through airports and hotels"<br>"Sort out any mix-up abroad" |
| 20 | `travel` | `smalltalk` | `PLAN_GF` override | "Make friends while traveling" |
<!-- pairs:end -->

### How a JTBD list is built

`renderJtbd()` does exactly this, and `tools/export-docs.js` mirrors it:

```js
const mode = WORKMODE[occupation];
let list = JTBD_MODE[goal]?.[mode] || GOALS[goal].jtbd;   // mode override, else the goal default
const extra = OCC_EXTRA[occupation];                      // one occupation-specific option
if (extra && (!extra.goals || extra.goals.includes(goal)) && !list.some(j => j.id === extra.id)) {
  list = [extra, ...list];
}
```

So a list can differ by mode in two ways: `JTBD_MODE` replaces the whole list for
that goal, and `OCC_EXTRA` prepends a single extra option. Only `career` and
`convo` define `JTBD_MODE` overrides; the other four goals show the same options
to everyone.

---

## Level

`LEVELS` runs A2 to C2 (A0 and A1 were removed). Two things branch off it:

- **Target level** is relative, never hardcoded: their level plus one, two or
  three rungs depending on the plan tier, capped at Native. Nothing in the flow
  promises "Advanced" to someone who is already advanced.
- **Practice mode** comes from `LEVELS[qlevel].mode`. A2 to B1 gets the scaffolded
  four-part hint; B2 and above gets "see a model answer" framing instead. This is
  derived from `qlevel` at render time rather than stored on click, so deep links
  and dev rail chips land on the right variant.

---

## Skill

Four skills. `qskill` picks one, and it drives three places:

1. `ctxfeat`, the skill beat - a claim, one big number counting up, ten topic pills.
2. The plan's focus section - the same claim in second person, plus the matching
   product video.
3. The score report - the chosen skill is scored **lowest on purpose**
   (`SCORE_BASE[skill] - 14`), so the report gives the plan a reason to exist.

---

## IELTS is a sub-flow, not a branch

Picking `ielts` at `qgoal` routes through three extra screens (`ackielts`,
`qwhen`, `qband`) and swaps several strings via the `IELTS` map, including the
skill question's labels and the score screen's eyebrow. It still resolves to a
normal `goal|family` pair afterwards.

---

## Verifying a change

Two mechanical checks, both used throughout development:

```bash
# every reachable pair still resolves to real copy, and no map lost a key
node tools/export-docs.js

# every screen renders without a console error, on every branch
#   see README, "Headless verification"
```

Any new goal, family or occupation should be added to `content.js` and then
confirmed by re-running the exporter. The pair count in `data/branching.json` is
the number to watch.
