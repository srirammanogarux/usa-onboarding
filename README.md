# USA Onboarding

A working prototype of Stimuler's first-run onboarding: 40 screens that take a
new user from the splash to a paywall, personalising almost every screen along
the way from five answers they give in the first two minutes.

**Live:** https://usa-onboarding.vercel.app

This is a design prototype, not production code. It ships as three static files
and has no build step, no framework and no dependencies. It exists so the flow,
the copy and the motion can be reviewed and argued about in a browser before any
of it is built for real.

---

## Run it

```bash
python3 -m http.server 8000     # or any static server
open http://localhost:8000
```

Opening `index.html` directly with `file://` mostly works, but video autoplay and
some fetches behave differently. Use a server.

Deploy:

```bash
vercel deploy --prod --yes
```

---

## What is in here

| path | what it is |
|---|---|
| `index.html` | ~250 KB. All markup, all CSS, all behaviour. The whole app. |
| `practice.js` | **The speaking task content.** Scenario, question, model answer and drill
words for all 12 cohorts, plus the beginner affirmations. Edit copy here. |
| `content.js` | ~50 KB. Every other authored string, as plain top-level `const` maps. |
| `tokens.css` | Colour, type and spacing variables. Fonts declared here. |
| `images/`, `videos/`, `video/`, `fonts/` | See [`docs/ASSETS.md`](docs/ASSETS.md) |
| `tools/export-docs.js` | Regenerates the docs from source. Run after changing branch data. |
| `docs/` | The four reference documents below |

**The split that matters:** if it is a *string a user reads*, it belongs in
`content.js`. If it is *structure or behaviour*, it belongs in `index.html`.
That line is what makes the copy reviewable without reading code, and it is worth
defending.

### Review tools

Standalone pages that sit next to `index.html` and share its `tokens.css`, so
they must stay at the repo root to keep working.

| file | what it shows |
|---|---|
| `funnel.html` | every screen as a live, branch-aware embed, side by side |
| `matrix.html` | the branch matrix: which context screens appear for each goal x mode x JTBD |
| `branch-map.html` | the flow as a graph |
| `blueprint.html` | screen-by-screen annotations |
| `style-guide.html` | the live token and component reference |
| `ack-library.html` | the acknowledgement copy variants |
| `build-map.py` | regenerates `funnel.html`. Resolves paths from its own location, so run it in place. |
| `build-persona.py` | builds the standalone persona demo. Same constraint. |

`docs/notes/` holds the working design documents from the build: phase plans,
the context inventory, the checklist. They are history, not specification, and
some are stale.

### Reference documents

| document | covers |
|---|---|
| [`docs/BRANCHING.md`](docs/BRANCHING.md) | the five axes, work modes, all 20 reachable branches, how a JTBD list is built |
| [`docs/COPY.md`](docs/COPY.md) | every branch-keyed string, where it lives, and the house copy rules |
| [`docs/ASSETS.md`](docs/ASSETS.md) | every video, image and font, and which screen loads it |
| [`docs/ANIMATIONS.md`](docs/ANIMATIONS.md) | motion tokens, the graph reveals, the glow recipes, the fingerprint interaction |
| [`docs/PRACTICE.md`](docs/PRACTICE.md) | all 12 speaking tasks as one readable table, generated from `practice.js` |
| [`docs/data/*.json`](docs/data) | the same information machine-readable, generated |

---

## Architecture

### One page, 40 sections

Every screen is a `<section class="screen" id="...">` in `index.html`. Exactly one
carries `.is-active` at a time. There is no router library and no URL change
between screens.

```js
go(id)   // hide the current section, show the target, run its render hook
```

`go()` does five things: push the current screen onto `navStack` (unless the
target is in `SKIP_BACK`), swap `.is-active`, update the progress bar, show or
hide the back button (hidden for anything in `NO_BACK`), and run that screen's
render block.

`goingBack` distinguishes a back navigation from a forward one, so screens can
skip their entry animation when you arrive from behind.

### Render hooks

Everything dynamic happens in one long dispatch:

```js
if (id === 'plan')   { /* build the plan from `answers` */ }
if (id === 'score')  { runScore(fam, sk, iel); }
if (id === 'ctxba')  { /* pick artwork and copy for goal|family|gender */ }
```

Screens are re-rendered on every entry, not memoised. `answers` is the single
mutable object holding everything the user has told us. There is no other state.

**Consequence worth knowing:** `go(id)` is a no-op if `id` is already active, so
changing `answers` and calling `go('plan')` while on the plan will not re-render.
Bounce through another screen first. This bites when writing test harnesses.

### Progress

`renderPhaseA(id)` / `renderPhaseB(id)` drive the two progress bars, fed by the
`DN_A` and `DN_B` screen lists. `dnRefresh()` recomputes them. If you insert a
screen, add it to the right list or the bar will jump.

---

## The flow

Three phases, marked by comments in `index.html`.

### Phase A - motivation

| screen | what it does |
|---|---|
| `hero` | splash video, "Speak fluently with real practice" |
| `signup` | account creation |
| `valueprop` | five auto-advancing product clips, 9 s each |
| `q1` | where did you hear about us |
| `q2` | what should we call you |
| `ackname` | Sarah greets them by name |
| `q3` | a little about you |
| `q5` | native language |
| `ack` | acknowledgement, in Spanish if they picked Spanish |
| `q6` | prefer the app in Spanish? |
| `qphone` | phone number |
| `qocc` | **occupation** - sets the work mode |
| `qgoal` | **goal** - first half of the copy key |
| `ctxout` | outcome beat: Sarah, the curve, the stat |
| `qwhy` `ackielts` `qwhen` `qband` | the IELTS sub-flow, only if the goal is IELTS |
| `qjtbd` | **the conversation** - second half of the copy key |
| `ctxba` | before / after beat |
| `qskill` | **skill** to sharpen first |
| `ctxfeat` | skill beat: one number, ten pills |
| `qlevel` | **current level** |
| `ctxsci` | the 4x claim against conventional classes |
| `qtime` | timeframe - picks the plan title's lane |
| `qdaily` | minutes a day - picks the tier |
| `qnotif` | notification permission |
| `qsummary` | everything's ready |

### Phase B - activation

The user actually speaks. `act` poses a branch-specific scenario and question;
`acthint` offers a four-part scaffold (A2-B1) or a model answer (B2+); `listen`
records; `hintscore` and `score` report back.

`score` is the report screen: a 240° gauge, then a card per skill with a colour-banded
ring. The skill they chose scores lowest on purpose - the report is the argument
for the plan.

### Phase C - plan and paywall

`loader` runs a 7.2 s personalisation sequence with localised testimonials, then
`plan` renders in seven sections:

- **A** the title - name, timeframe, claim
- **B** the end outcome - trajectory graph plus four bullets
- **C** what we start with - the JTBD, named, and the first three sessions
- **D** the numbers - five stats that count up when scrolled into view
- **E** your focus - the chosen skill with a real product clip
- **F** why this plan suits you
- **G** social proof, naming their cohort

Then `letter` (the press-and-hold commitment), `paywall`, `exitoffer`, `bridge`.

---

## Deep links

Any screen, any branch, straight from the URL. This is how everything gets
reviewed.

```
?jump=plan&branch=career&occ=office&skill=fluency&level=b1&time=quarter&min=15&name=Sriram
```

| param | sets |
|---|---|
| `jump` | screen id to open |
| `branch` | goal preset, also fills a plausible JTBD |
| `occ` | occupation |
| `fam` | JTBD family |
| `skill` | fluency / pronunciation / vocabulary / grammar |
| `level` | a2 / b1 / b2 / c1 / c2 |
| `time` | twoweeks / month / quarter / halfyear / year |
| `min` | minutes a day |
| `name` | the user's name |
| `gender` | picks the before/after artwork |
| `lang` | native language |
| `jl` | JTBD label override |
| `band`, `why`, `when` | IELTS answers |
| `embed` | strips the phone frame, for embedding |

### The dev rail

A panel on the right in local development listing every screen grouped by phase,
plus variant chips for the axes that matter on the screen you are looking at
(`VARIANTS` says which). Tapping a chip re-renders in place. `AX` defines the 11
axes; `DN` defines the screen groups.

---

## Headless verification

Every change in this repo was checked this way rather than by eye. Chrome
headless, a probe script injected before `</body>`, read back through the page
title.

**Walk every screen on a branch and catch console errors:**

```bash
python3 - <<'PY'
s = open('index.html').read()
s = s.replace('<head>', '<head><script>window.__E=[];'
  'window.addEventListener("error",e=>window.__E.push(e.message),true);</script>', 1)
s = s.replace('</body>', '''<script>setTimeout(()=>{
 const ids=[...document.querySelectorAll('section.screen')].map(x=>x.id); const bad=[];
 for(const id of ids){const n=window.__E.length;
   try{go(id);}catch(e){bad.push(id+':'+e.message);continue;}
   if(window.__E.length>n)bad.push(id+':'+window.__E.slice(n).join(','));}
 document.title='WALK '+ids.length+' | '+(bad.length?bad.join(' ~ '):'NO ERRORS');
},2600);</script></body>''', 1)
open('_walk.html','w').write(s)
PY

for br in career convo ielts travel school other; do
  printf "%-8s " $br
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
    --headless=new --disable-gpu --dump-dom --virtual-time-budget=5400 \
    "file://$PWD/_walk.html?jump=hero&branch=$br&name=Sriram&level=b1" 2>/dev/null \
    | grep -o "<title>[^<]*</title>" | sed 's/<[^>]*>//g'
done
rm -f _walk.html
```

**Screenshot a screen:**

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --hide-scrollbars --force-prefers-reduced-motion \
  --autoplay-policy=no-user-gesture-required --window-size=1200,1000 \
  --screenshot=out.png --virtual-time-budget=3200 \
  "file://$PWD/index.html?jump=ctxba&branch=career&fam=interview&gender=f"
```

**What this cannot check.** Under `--virtual-time-budget` Chrome resolves CSS
transitions instantly and does not reliably deliver `requestAnimationFrame`
callbacks. Reading a computed style mid-transition returns nonsense. To check
motion, force the state (add the class with `transition:none`, or set the driving
property directly) and screenshot that. See the end of
[`docs/ANIMATIONS.md`](docs/ANIMATIONS.md).

---

## Editing safely

`index.html` is a single 250 KB file, which makes scripted edits tempting and
dangerous. Both of the serious breakages during development came from the same
mistake: matching a marker like `'</div>\n</div>\n</section>'` or `'\n};'` that
also occurs further down the file, and silently swallowing everything in between.

If you are editing programmatically:

- **Match braces, do not guess end markers.** Walk the string counting depth.
- **Scope the edit to the block first.** Extract the map you mean to change by
  brace matching, edit inside that slice, splice it back. A regex for
  `^  "other": {` will happily hit a different map 300 lines earlier - that
  happened, and it silently replaced an unrelated entry.
- **Assert afterwards.** Check that key ids still exist, that map key counts are
  unchanged, and that the script still parses:
  ```bash
  node --check <(python3 -c "import re;s=open('index.html').read();\
  print([m.group(1) for m in re.finditer(r'<script>(.*?)</script>',s,re.S)][-1])")
  ```
- **Diff before committing.** `git diff --stat` should match what you intended,
  in both directions.

A few CSS traps that have each cost time:

- `.fs` centres its flex children, so `text-align:left` alone looks centred.
  You need `align-self:flex-start`.
- `#app.back-on .fs:not(.has-sarah)` (one id, two classes) outranks `#plan{padding:0}`.
  Specificity fights here are won with a second id, not `!important`.
- Class names are global. `.st` on the plan's stat tiles collided with `.scaf-card .seg .st`
  in the hint scaffold and gave the hint labels borders. Prefix new families
  (`.pstat`, `.sc-`, `.fp-`).

---

## Known gaps

- The practice score is not real: `runScore` derives from `SCORE_BASE` and the
  chosen skill, and the actual recording is not analysed.
- Most stat numbers are placeholders, including 11 of the 12 outcome stats, the
  4x claim, and the mastery-counter rates. They need real figures before this
  goes near a user.
- Spanish localisation covers `ack` and the loader testimonials only.
- `ctxout` wants a half-body Sarah cutout that was never produced; it uses the
  circular avatar.
- `ctxstat` is dormant and reachable only by deep link.
