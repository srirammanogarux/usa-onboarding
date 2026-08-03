# Animation and glow reference

Every value here is the one that actually ships; they were read out of
`index.html` and `tokens.css` rather than written from memory. 43 `@keyframes`
are defined in total - this covers the ones that carry meaning.

---

## Motion tokens

```css
--dur-fast:   .14s
--dur-base:   .26s
--dur-slow:   .45s
--ease-out:   cubic-bezier(.2,.7,.2,1)     /* everything that arrives */
--ease-spring:cubic-bezier(.34,1.56,.64,1) /* things that pop: dots, pills, badges */
```

`--ease-out` is the default. Reach for `--ease-spring` only when something should
feel like it landed rather than slid.

**Reduced motion.** `const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches`
is checked at the top of the script and every JS-driven animation branches on it,
jumping straight to the end state. There is also a `@media (prefers-reduced-motion: reduce)`
block. Any new animation must handle both.

---

## Graph animations

### The plan trajectory curve (`.tr-wrap`, plan section B)

A staged reveal, ~3.6 s end to end. Each element has its own delay so the graph
narrates itself: axis, then the start dot, then the line drawing, then the second
dot, then the fill, then the end marker and pill.

| element | animation | delay |
|---|---|---|
| `.tr-axis`, `.tr-arrow`, `.tr-axlab` | `trFade .5s var(--ease-out)` | `.1s` |
| `.tr-d0` (start dot) | `trPop .5s var(--ease-spring)` | `.3s` |
| `.tr-l0` (start label) | `trFade .5s var(--ease-out)` | `.55s` |
| `.tr-line` | `trDraw 2.2s cubic-bezier(.4,.05,.3,.98)` | `.8s` |
| `.tr-d1` (mid dot) | `trPop .5s var(--ease-spring)` | `1.55s` |
| `.tr-l1` (mid label) | `trFade .5s var(--ease-out)` | `1.7s` |
| `.tr-area`, `.tr-drop` (the fill) | `trFade .7s var(--ease-out)` | `2.3s` |
| `.tr-glow`, `.tr-d2`, `.tr-tick` | `trPop .55s var(--ease-spring)` | `2.9s` |
| `.tr-pill` (the badge) | `trPill .55s var(--ease-spring)` | `3.05s` |

The line is drawn with `stroke-dasharray:1; stroke-dashoffset:1` animated to 0 by
`trDraw` (`pathLength="1"` normalises it, so the same rule works at any path length).

**The fill must never precede the line.** The area fades in at 2.3 s, after the
2.2 s draw that starts at 0.8 s has finished. An earlier version used a hard-edged
clip sweep that ran *ahead* of the line - a linear-in-x clip cannot track a path
being drawn by length, so the fill outran the stroke on the steep sections. If
you touch this, keep the fill on a delay rather than trying to sync it.

### The outcome curve (`ctxout`)

`.pg-up` is the rising stroke:

```css
.pg-up { stroke:url(#pgUp); stroke-width:5; stroke-linecap:round;
         filter:drop-shadow(0 0 12px rgba(108,99,255,.35)); }
```

| element | animation |
|---|---|
| the curve | `pgDraw 1.1s var(--ease-out) .95s forwards` |
| the sweep | `sweepX .88s cubic-bezier(.36,.02,.28,1) .62s forwards` |
| the fill fade | `pgFade .4s var(--ease-out) 1.65s forwards` |
| the end dot | `dotPop .3s var(--ease-out) forwards` |
| the waypoint labels | `markIn .32s var(--ease-out) forwards` |

`markIn` animates **opacity only**. Two waypoint labels are positioned with
`transform: translate(-50%,-100%)`, and animating `transform` in the keyframe
silently wipes that positioning.

### The score gauge (`score`)

A 240° arc, `cx=110 cy=110 r=88` in a `0 0 220 164` viewBox, drawn from 210° to
-30°. Arc length is 369.

```css
.g-fg { stroke:url(#scg); stroke-dasharray:369; stroke-dashoffset:369;
        transition:stroke-dashoffset 1.15s var(--ease-out); }
```

Set `strokeDashoffset = 369 * (1 - score/100)` on the second `requestAnimationFrame`
after render - one frame is not enough, the browser needs to commit the initial
`369` first or there is nothing to transition from.

The per-skill rings use the same technique at `r=18`, circumference 113, staggered
110 ms apart:

```css
.sc-ring .rf { stroke:currentColor; stroke-dasharray:113; stroke-dashoffset:113;
               transition:stroke-dashoffset .9s var(--ease-out); }
```

Band colour is set by a class on the wrapper and inherited through `currentColor`:
`.sc-strong{color:#5DC48C}` (>=70), `.sc-mid{color:#E2A03F}` (50-69),
`.sc-weak{color:#E8695E}` (<50).

### The loader ring

`.ldr-fg` - `stroke-dasharray:327`, driven imperatively over a 7.2 s sequence
(600 ms when reduced).

---

## Counting numbers

Two helpers, same easing, both in `index.html`:

- `countUp(el, to, dur)` - plan stat tiles
- `countUpPct(el, to, dur)` - score gauge and rings, appends `%`

```js
const t0 = performance.now();
const k  = Math.max(0, Math.min(1, (performance.now() - t0) / dur));
el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));   // cubic ease-out
```

Three things in there are load-bearing and were each a real bug:

1. **`k` is clamped at both ends.** An animation frame can carry a timestamp that
   precedes `t0`; unclamped, `1-(1-k)³` goes negative and the counter briefly
   renders a negative number.
2. **One clock.** The elapsed time is measured with `performance.now()` inside the
   callback, not from the timestamp `requestAnimationFrame` passes in. The two are
   not guaranteed to share a time base.
3. **A guaranteed finish.** `setTimeout(finish, dur + 120)` snaps to the target.
   Frames stall in background tabs, and a number frozen at 43 on the way to 96 is
   worse than no animation.

### Scroll-triggered counting

The plan's stat tiles render as `0` with the target in `data-to`, and count up the
first time the section scrolls into view, staggered 90 ms apart over 900 ms.
`armCounters()` attaches a passive `scroll` listener to `#planScroll` and fires
once, then removes itself. It checks the grid against the scroll container's own
rect rather than the viewport, because the plan scrolls inside a child element.

An `IntersectionObserver` is the more natural tool and was tried first; it did not
fire reliably against a scrolling ancestor root in this setup, so the explicit
check stands.

---

## Glows

Glow is how depth is signalled in this UI - there are no drop shadows in the
conventional sense, everything is coloured light. Three recurring recipes.

### 1. Card lit from inside

An inner glow plus a hairline highlight. Used on the outcome card and the
"after" panel of the before/after screen.

```css
.out-card {
  background:
    radial-gradient(112% 84% at 58% 74%, rgba(108,99,255,.32), rgba(108,99,255,.06) 58%, transparent 78%),
    linear-gradient(158deg, rgba(255,255,255,.07), rgba(255,255,255,.02));
  border:1px solid rgba(255,255,255,.15);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.12),
    inset 0 -22px 46px -20px rgba(108,99,255,.35),
    0 22px 50px -26px rgba(0,0,0,.8);
}
```

The "after" panel pushes the same idea harder, because it has to out-weigh the
"before" panel next to it:

```css
.ba-col.after {
  border:1px solid rgba(139,132,255,.6);
  background:
    radial-gradient(120% 80% at 50% 22%, rgba(139,132,255,.42), rgba(108,99,255,.16) 52%, rgba(108,99,255,.06) 78%),
    linear-gradient(170deg, rgba(108,99,255,.20), rgba(108,99,255,.05));
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.22),
    inset 0 0 44px -8px rgba(139,132,255,.5),
    0 20px 46px -22px rgba(108,99,255,.6);
}
```

### 2. Device mockups

Dark shadow for weight, indigo for lift, white hairline for the bezel edge.

```css
.vp-phone {
  border:2px solid rgba(255,255,255,.14);
  box-shadow:
    0 30px 64px -18px rgba(0,0,0,.95),
    0 0 52px -16px rgba(108,99,255,.5),
    inset 0 1px 0 rgba(255,255,255,.14);
}
```

### 3. Ambient background

Four slow radial gradients drifting behind everything, on `.fs`:

```css
animation: aur-a 17s ease-in-out infinite alternate;   /* and aur-b 21s, aur-c 25s, aur-d 29s */
```

Prime-ish, mutually non-repeating durations so the background never visibly loops.

### Reference palette

| use | value |
|---|---|
| indigo core | `rgba(108,99,255,…)` |
| indigo light | `rgba(139,132,255,…)` |
| indigo highlight | `rgba(169,161,255,…)` / `rgba(180,172,255,…)` |
| gold, progress and reward only | `rgba(240,163,47,…)`, `--gold-300`, `--gold-500` |
| score bands | `#5DC48C` strong, `#E2A03F` mid, `#E8695E` weak |

---

## The commitment fingerprint (`letter`)

The most involved interaction in the flow, and the one with the most non-obvious
constraints.

**Structure.** Two stacked copies of the same ridge paths inside `.fp-stack`: a
dim base at 28 % opacity, and a solid white copy that is revealed bottom to top.

```css
.fp-lit { position:absolute; inset:0; clip-path:inset(100% 0% 0% 0%);
          transition:clip-path .24s var(--ease-out); }
.fingerp.holding .fp-lit { clip-path:inset(0% 0% 0% 0%);
                           transition:clip-path 1.15s linear; }
```

- **Both endpoints are percentages.** Mixing `inset(100% 0 0 0)` with `inset(0)`
  gives you a px/% interpolation that does not animate cleanly.
- **`linear`, not eased.** The fill is a progress readout - where it has reached
  tells you how much of the 1150 ms hold is left. Easing it would lie.
- **The glow is on the unclipped parent.** `clip-path` applies after `filter`, so a
  `drop-shadow` on `.fp-lit` gets sliced into a hard-edged rectangle. It lives on
  `.fp-stack` instead.

**The gradient bloom.** On completion a full-screen gradient is revealed by
`clip-path: circle()` anchored at the fingerprint's measured centre:

```css
.seal-bloom { clip-path:circle(0px at var(--sx,50%) var(--sy,70%));
              transition:clip-path 1.15s cubic-bezier(.42,0,.3,1); }
.seal.grow .seal-bloom { clip-path:circle(145% at var(--sx,50%) var(--sy,70%)); }
```

Scaling a gradient element up instead renders flat colour, because every stop
ends up off-screen. Reveal a full-size gradient; do not scale a small one.

The fingerprint sits at `z-index:40` above the bloom's `30`, so the print stays
visible while the circle grows out from under it. The hold is 1150 ms and the
bloom transition is 1.15 s so they land together; "Commitment made" appears only
at that point, not at the hold threshold.

**The idle glow** breathes so the target invites a press:

```css
@keyframes fpBreathe {
  0%,100% { opacity:.55; transform:translate(-50%,-50%) scale(.9); }
  50%     { opacity:1;   transform:translate(-50%,-50%) scale(1.05); }
}
```

---

## Notes on verification

Animation is the one thing you cannot check headlessly here. Under
`--virtual-time-budget`, Chrome resolves CSS transitions instantly and does not
reliably deliver `requestAnimationFrame` callbacks, so a computed style read
mid-transition tells you nothing. What works:

- force the end state (add the class, set `transition:none`) and screenshot it
- force intermediate states by setting the driving property directly, e.g.
  `el.style.clipPath = 'inset(45% 0% 0% 0%)'`
- assert the *values* - dash lengths, delays, final numbers - rather than trying
  to observe the interpolation
