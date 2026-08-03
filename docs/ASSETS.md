# Assets

Everything the flow loads, where it is used, and how it was produced. All paths
are relative to the repo root and all of it is served statically - there is no
build step and no CDN.

Total: **~13 MB**, dominated by video.

---

## Video

`<video>` elements are always `muted loop playsinline autoplay preload="metadata"`.
Muted plus `playsinline` is what lets them autoplay on iOS.

### Value proposition carousel - `valueprop`

Five clips, one per feature, each held for **9 s** before auto-advancing. The
mockup slides out and the next slides in; after the fifth the flow continues to
the native-language question rather than looping.

| file | slide | size |
|---|---|---|
| `videos/vpf_roadmap.mp4` | Roadmap | 533 KB |
| `videos/vpf_conversation.mp4` | Conversation | 297 KB |
| `videos/vpf_call.mp4` | Call | 156 KB |
| `videos/vpf_feedback.mp4` | Feedback | 253 KB |
| `videos/vpf_exercises.mp4` | Exercises | 197 KB |

`vpf_*` are the **f**ramed crops, 520 px wide, sized to sit inside `.vp-phone`.
The `vp_*` files are the earlier unframed versions and are no longer referenced;
they are kept as masters.

### Plan focus section - `plan`

One clip per skill, chosen by `qskill`, shown inside `.pf-mock`.

| skill | file | note |
|---|---|---|
| fluency | `videos/conversation_t.mp4` | cropped to the phone screen |
| pronunciation | `videos/Improve_c.mp4` | |
| vocabulary | `videos/Feedback_c.mp4` | |
| grammar | `videos/grammar_t.mp4` | cropped to the phone screen |

`_c` = cropped to the device screen. `_t` = tightly cropped, no white surround.
The bare `Feedback.mp4` / `Improve.mp4` / `Practice.mp4` are the originals on a
white backdrop and are not loaded by the flow.

### Splash and Sarah

| file | where |
|---|---|
| `videos/splash_stimuler.mp4` | `hero`, the opening splash |
| `video/sarah_idle.mp4` | Sarah at rest |
| `video/sarah_greeting.mp4` | Sarah greeting, after the name question |
| `video/sarah_writing.mp4` | Sarah writing, during the loader |

Note the directory is `video/` singular for the Sarah clips and `videos/` for
everything else. Both are real; do not "fix" one into the other without updating
the references.

---

## Images

### Before / after artwork - `ctxba`

80 files in `images/ba2/`, 1.53 MB total, WebP at 560 px.

```
images/ba2/ba_<goal>_<family>_<f|m>_<before|after>.webp
```

20 reachable `goal|family` pairs x 2 genders x 2 states. Gender comes from the
`gender` answer via `BAGENDER`. Generated with the Gemini image API from a shared
style prompt, then content-bounds cropped so no sticker frame or white margin
survives - several source images were generated on white, which showed as bands
above and below the art in the card.

If a file is missing, `onerror` falls back to the older occupation-keyed set:

```
images/ba/ba_<occupation>_<before|after>.webp     24 files, 0.44 MB
```

That legacy set is keyed through `BAIMG`. It is a safety net, not a fallback the
design relies on.

### Everything else

| file | where |
|---|---|
| `images/sarah_av.webp` | Sarah's circular avatar, used on `ctxout`, `act`, `listen`, the plan proof line |
| `images/logo-stim.png` | wordmark |

**Open item:** `ctxout` still uses the circular avatar. A half-body cutout
(`images/sarah_half.webp`, 252x312 @3x, transparent, mid-torso up, facing right)
was specified but never produced.

---

## Fonts

Six self-hosted WOFF2 files in `fonts/`, 0.47 MB. No network font requests.

| family | weights | role |
|---|---|---|
| Inter Display | Regular, Medium, SemiBold, Bold | `--font-display`, all headings and numerals |
| Geist | latin, latin-ext | `--font-body`, body copy |

Declared in `tokens.css` with `font-display: swap`.

---

## Adding an asset

1. Drop the file in `images/` or `videos/`.
2. Reference it from `content.js` if it is branch-keyed, or `index.html` if it is
   fixed to one screen.
3. For video, crop to the phone screen first. Anything with a white surround will
   show as a bright band against the dark UI.
4. Re-run the headless walk (see the README) to confirm nothing 404s - a missing
   video fails silently, a missing image only shows if the `onerror` chain also
   misses.
