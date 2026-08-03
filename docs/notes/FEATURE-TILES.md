# Feature tile prototypes — production spec

Five tiles live in the plan's bento. Four of them show a real product moment; the fifth is a pure
stat. The bento is built and running with **CSS placeholder mocks** — this spec is what replaces them.

Live now: https://stimuler-onboarding-form.vercel.app/?jump=plan — scroll to *"What you will do, and
how much of it"*.

---

## The mechanic you are building for

The tile for the skill the user picked is promoted to the **hero slot** (full width, indigo border,
"Your focus" tag). The other three sit below as squares. So **every tile needs to work at two sizes**,
and the composition has to survive being cropped from 16:9 to roughly 1:1.

Design each mock once, at hero size, with a clearly defined **hero zone** in the middle that stays
legible when the sides are cropped away.

| Slot | Aspect | Rendered size (390pt phone) | Contents |
|---|---|---|---|
| Hero | 16:9 | 306 × 172 | Full moment, 2 elements max |
| Square | 4:3 | 143 × 107 | One element only |

---

## Technical

| | |
|---|---|
| Format | WebP, or MP4 (muted, looping, ≤3s) if the motion carries the idea |
| Export | @3x — hero 918 × 516, square 429 × 321 |
| Background | **Transparent, or `#06050E`.** The tile draws its own card; do not include one |
| Device chrome | **None.** No status bar, no phone frame, no home indicator |
| Safe area | 10px inset all round — the tile clips to an 11px radius |
| Naming | `images/tiles/tile_<key>_hero.webp`, `tile_<key>_sq.webp` |

Keys: `fluency` · `vocabulary` · `pronunciation` · `grammar`

## Style

Match the onboarding, not the current app. The existing `videos/*.mp4` are black-and-gold on the older
UI; dropped into this bento they read as a different product, and `Practice_c` has Hindi baked in,
which is wrong for a Spanish-speaking cohort.

| Token | Value |
|---|---|
| Surface | `#06050E` |
| Text high / mid / low | `#F4F2FA` / `#B7B2C8` / `#7E7994` |
| Indigo (the user's own voice, actions) | `#6C63FF`, light `#A9A2FF` |
| Green (a correction, an improvement) | `#5DC48C` |
| Gold (**progress and reward only**) | `#F0A32F` |
| Type | InterDisplay for numbers and labels, Geist for body |

No emoji anywhere. Gold never used for decoration.

---

## The four tiles

### 1 · `fluency` — a real conversation
The user speaks to Sarah about their own work, unscripted.

- **Hero:** two chat bubbles. Sarah's question on the left in grey, the user's spoken answer on the
  right in indigo, with a small waveform or play control on the user's bubble to signal it was spoken
  rather than typed.
- **Square:** the user's bubble alone.
- **Note:** the question text is cohort-specific in the live build (`BENTO_ASK`, 11 families —
  *"So what do you charge for this?"* for a freelancer, *"Walk me through the plan for today"* for a
  site worker). If the mock has baked-in text it will contradict that. Either leave the bubble text
  as a live overlay slot, or ship 11 hero variants.

### 2 · `vocabulary` — Sarah upgrades your word
- **Hero:** the sentence the user said with one weak word underlined, and the stronger word arriving
  above it. Weak word struck through in grey, replacement in green.
- **Square:** just `good → outstanding`.

### 3 · `pronunciation` — the syllable that slipped
- **Hero:** the word broken into syllables with the failing one marked, a waveform beneath, and a
  score or a "say it again" control.
- **Square:** the syllabified word plus the waveform.

### 4 · `grammar` — the fix in your own sentence
- **Hero:** the user's own sentence with the blank, and three options with the correct one marked
  green.
- **Square:** the sentence with the blank, no options.

### 5 · `time` — no artwork needed
Pure stat tile, built in CSS: hours of speaking out loud, computed from their answers.

---

## Numbers are computed, not designed

Do not bake numbers into the artwork. Every counter comes from the user's own timeframe and minutes:

```
days   = {2 weeks:14, 1 month:30, 3 months:90, 6 months:180, 1 year:365}[their timeframe]
total  = minutes/day × days
split  = fluency 35 / pronunciation 25 / vocabulary 22 / grammar 18,
         their chosen skill +15, the other three −5 each
count  = (total × split) ÷ rate,  capped at 500 / 44 / 3,000 / 120
```

Worked examples from the live build:

| Cohort | Hero tile | Counters |
|---|---|---|
| Freelancer · 15 min · 3 months · fluency | 96 real conversations | 153 words · 44 sounds · 58 fixes |
| Nurse · 10 min · 6 months · pronunciation | 44 sounds mastered | 77 conversations · 204 words · 78 fixes |
| Trades · 30 min · 3 months · grammar | 120 grammar fixes | 116 conversations · 306 words · 44 sounds |

**The rates are invented.** Words per minute, minutes per grammar rule — chosen so the arithmetic is
consistent. They need real product numbers before this ships.

---

## Order of work

1. `fluency` hero and square — it is the most common focus, so it is the hero slot most often
2. `pronunciation`, then `vocabulary`, then `grammar`
3. Decide the `BENTO_ASK` question: live text overlay, or 11 baked hero variants
