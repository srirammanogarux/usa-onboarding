# Character cutouts — production spec

Fourteen characters, one per occupation. Used first on the **outcome screen** (standing at the top of
the rising curve) and reusable afterwards on the plan screen, the score screen and anywhere a persona
needs to be recognised. The existing `images/ba/*.webp` set stays as it is — this is a third pose,
delivered as a cutout rather than a framed scene.

---

## Technical

| | |
|---|---|
| Format | WebP with alpha (PNG-24 source) |
| Canvas | 800 × 900, character occupying the centre 70% |
| Background | **Fully transparent.** No painted scene, no ground shadow, no vignette |
| Crop | Mid-thigh up. Not head-and-shoulders — we need a stance, not a portrait |
| Anchor | Character's feet-line at the bottom edge of the canvas, horizontally centred |
| Safe area | 60px transparent margin on all four sides so the glow can bleed without clipping |
| Lighting | Key light from the **upper right**, warm. The gold curve endpoint sits to their lower right, so the light should read as coming from the outcome |
| Naming | `images/hero/hero_<key>.webp` |

Keys: `office` `freelancer` `business` `jobseek` `student` `healthcare` `restaurant` `retail`
`driver` `construction` `factory` `home` `careerbreak` `other`

---

## Style

Match `images/ba/*_after.webp` exactly: semi-cartoon illustration, soft cel shading, warm skin
tones, clean outlines, no texture noise. Same face construction and same line weight as the existing
set, so the two libraries read as one cast.

**Pose brief for all fourteen:** arrived, not celebrating. Standing, weight settled, shoulders open,
chin level, a real smile rather than a grin. Arms doing something with purpose. This is the same
person from the "after" frame, one week later, when it has stopped being a surprise.

**Avoid:** arms crossed (defensive), thumbs up (cheap), fists in the air (hollow), leaning back
(smug), hands in pockets (disengaged).

---

## The fourteen

| Key | Work mode | Who they are | Wardrobe and prop |
|---|---|---|---|
| `office` | corporate | Office professional | Blazer over a plain top, lanyard, laptop held closed at their side |
| `freelancer` | independent | **NEW** — freelancer or contractor | Casual shirt, headphones round the neck, tablet with a proposal open |
| `business` | independent | Small business or shop owner | Apron over a shirt, sleeves rolled, order pad or card reader |
| `jobseek` | seeking | Job seeker | Interview-smart, slim folder of CVs under one arm |
| `student` | academic | University student | Hoodie or casual layer, backpack strap, notebook |
| `healthcare` | frontline | Nurse or care worker | Scrubs, stethoscope, clipboard |
| `restaurant` | frontline | Server or kitchen staff | Apron, notepad and pen |
| `retail` | frontline | Shop floor assistant | Branded polo or apron, handheld scanner |
| `driver` | frontline | Driver or delivery rider | Jacket, lanyard, keys or phone mount |
| `construction` | site | Tradesperson | Hard hat, hi-vis vest, rolled drawings |
| `factory` | site | Production or line worker | Work shirt, ear defenders round the neck, tablet or clipboard |
| `home` | domestic | Parent at home | Everyday casual, school bag or a child's drawing in hand |
| `careerbreak` | returning | **NEW** — returning after a break | Smart-casual, notebook, a bag that reads as first-day-back |
| `other` | general | Neutral learner | Plain casual, nothing occupation-specific, hands relaxed and open |

Diversity across the fourteen, not within each one: vary age, gender, body type and skin tone across
the set rather than producing two gendered versions of each. That keeps the library at 14 renders
instead of 28, and it means the cast as a whole looks like the user base.

---

## Order of work

1. **`freelancer` and `careerbreak` first** — they are the only two occupations with no artwork of
   their own anywhere. They currently borrow `business` and `jobseek` on the before/after screen too,
   so these two also need their `_before` and `_after` frames in the original 560×560 framed style.
2. The remaining twelve hero cutouts.

Until the real cutouts land, the outcome screen falls back to the existing `_after` artwork under a
soft circular mask. Add a key to `HERO_READY` in `content.js` as each one ships and it swaps over
with no other change.
