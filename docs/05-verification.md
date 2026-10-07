# Verification Record — V2

All results below were produced by running the commands named. Anything not run
is marked NOT RUN rather than assumed.

Environment: Next 15.5.25, React 19.2, Tailwind 4.3, Node 22.22, local
production server (`next start`). Date: September 5, 2026.

## Build and static analysis

| Check | Method | Result |
|---|---|---|
| Types | `npx tsc --noEmit` | **PASS** — clean |
| Lint | `npx next lint` | **PASS** — no warnings or errors |
| Production build | `npm run build` | **PASS** — 14 routes compiled |

## Routes and redirects

| Check | Result |
|---|---|
| `/`, `/buy`, `/sell`, `/invest`, `/renovations`, `/videos`, `/about`, `/reviews`, `/contact`, `/privacy` | **200** each |
| Unknown path `/nope` | **404** |
| `/property-help` → `/renovations` | **308 permanent** |
| `/property-help/out-of-state-owners` → `/renovations#out-of-state-owners` | **308**, anchor preserved |
| `?intent=property-help` | Resolves to the Renovations topic via `resolveIntent` |
| Sitemap | Lists `/renovations`; no `/property-help` |

## R3 — naming migration, measured on rendered HTML

Public occurrences of the old term, per route:

| Route | "Property Help" | "Contact Jason" | "Get in touch with me" |
|---|---|---|---|
| `/` | 0 | 0 | 7 |
| `/buy` | 0 | 0 | 5 |
| `/sell` | 0 | 0 | 5 |
| `/invest` | 0 | 0 | 5 |
| `/renovations` | 0 | 0 | 5 |
| `/videos` | 0 | 0 | 5 |
| `/about` | 0 | 0 | 7 |
| `/reviews` | 0 | 0 | 7 |
| `/contact` | 0 | 0 | 7 |
| `/privacy` | 0 | 0 | 1 |

**PASS.** The old term survives only in `next.config.ts` redirect source and in
internal audit files, which is permitted.

## R5 — personal videos in both destinations

| Check | Result |
|---|---|
| `/videos` — unique IDs P01–P10 in server-rendered HTML | **10 / 10** |
| `/about` — initial render + labelled expansion | 4 rendered, `aria-expanded` control present for the remaining 6 |
| Global metadata leaking the old service name | **Defect found and fixed** — the root layout OpenGraph description still said "property help" and was inherited by `/privacy`. Rewritten. Public occurrences now **0 across all 10 routes** |
| Iframes mounted before any click | **0** on both pages |
| "Watch on YouTube" fallback per card | present |
| Duplicate ID guard | `lib/personal-videos.ts` throws at import on any duplicate |

`/videos` renders all ten through the same `.map()` the expansion uses, which
is the evidence that the expanded state produces all ten cards. **A real click
was not performed — no browser is available in this environment.** Playback and
embed permission per video are therefore **NOT RUN**; a well-formed URL does not
prove playback.

### Classifier defect found and fixed

The property library is fetched live from the channel RSS feed and classified by
title regex. `001 Chevy Silverado 2500HD 4x4 WORK TRUCK utility bed 3" lift`
matched the general property pattern on `\bbed\b` (from "utility bed") and was
eligible to be featured as a property walkthrough. The iced tea, dog treat,
crypto, disruptive-tech and keto videos matched no lifestyle pattern either.
Fixed by matching the ten curated IDs deterministically ahead of every title
heuristic (`lib/youtube.ts`).

## R2 — images

Received **20 of 20**. Integrated **20 of 20**.

| Route | Group | Frames verified in HTML | Behaviour |
|---|---|---|---|
| `/` | Strip | **4 / 4** | Full-bleed hero sequence; 1 eager, 3 lazy; pause + prev/next present |
| `/buy` | Charleston winter | **3 / 3** | In-page sequence, captions, controls present |
| `/renovations` | Calico | **3 / 3** | In-page sequence, captions, controls present |
| `/invest` | Water (3 locations) | **3 / 3** | Multi-location sequence, captions name each location |
| `/about` | Arena (2 venues) | **4 / 4** | One mixed four-image sequence |
| `/sell` | Park (2 locations) | **2 / 2** | Two-location sequence |
| `/contact` | Speedway | **1 / 1** | **Static — 0 pause control, 0 prev/next, no sequence role.** A single image never fades into itself |
| `/videos` | Strip reuse | 1 still | Restrained reuse of an existing derivative |
| `/reviews` | Park reuse | 1 still | Restrained reuse of an existing derivative |

**Total: 20 / 20 unique source images rendering in their planned locations.**

No broken `<img>` and no placeholder image on any route.

### Measured byte budget

Set from the actual files, replacing the provisional estimate.

| srcset width | AVIF min | AVIF max |
|---|---|---|
| 640w | 19 KB | 32 KB |
| 960w | 41 KB | 65 KB |
| 1280w | 64 KB | 101 KB |
| 1920w | 97 KB | 178 KB |

Budget: **≤180 KB at 1920.** All 20 sources pass — 0 derivatives over the ceiling. Max at 1280 is 101 KB.
Hero first paint (`las-vegas-strip-1`, the only eager image): 63 KB at a 390 px
viewport, 98 KB at 1440, 166 KB at 1920.

Six sources overshot the ceiling at default quality because of high-frequency
detail (falling snow, sandstone grain, turf, dense aerial detail). Per-source
AVIF quality overrides bring all six within budget; the table is in
`docs/04-image-manifest.md` and the values live in `scripts/generate-images.mjs`.

### Hero contrast, solved against real pixels

A gradient scrim was measured and **rejected**. Frame 3 contains blown highlights
(relative luminance 1.0). Passing 4.5:1 for white headline text would have
required a uniform α≈0.60 wash across the whole headline band, flattening the
photography — the opposite of the R6 brief.

A contained plate was used instead. At `rgba(16,26,51,0.86)`, measured against
every pixel of all four frames in the text region:

| Element | Worst case | Required |
|---|---|---|
| Headline `#F5F7FC` | **10.57:1** | 4.5 |
| Subhead `#C3CEE6` | **7.17:1** | 4.5 |
| Amber button `#E8912B` | **4.59:1** | 3.0 |

The photography outside the plate is untouched.

## R6 — design system

| Check | Result |
|---|---|
| Token contrast, 44 pairs across 7 scenes | `node scripts/check-contrast.mjs` → **44/44 PASS** |
| V1 beige field `#e8e6df` | removed |
| V1 Michroma tracked-uppercase display | removed; Archivo, sentence case, `letter-spacing: -0.015em` |
| Fonts self-hosted | Archivo, IBM Plex Sans, IBM Plex Mono — no runtime third-party font request |

A real defect was caught by the checker: the amber button fill is only **2.33:1**
against paper, failing the 3:1 non-text boundary rule. Fixed with a deep-amber
border at 5.11:1 rather than desaturating the accent.

## Accessibility

| Check | Result |
|---|---|
| Exactly one `<h1>` per route | **PASS** — 9/9 |
| Placeholder-only form labels | **PASS** — 0 placeholder attributes site-wide |
| "click here" link text | **PASS** — 0 |
| Text contrast, token pairs | **PASS** — 44/44 |
| Text over photography | **PASS** — plate solved per frame |
| Reduced motion | Implemented: autoplay, drift and fade disabled; pause control not rendered; manual changes instant. **Not observed in a browser.** |
| Keyboard focus, 200% zoom, screen-reader announcement | **NOT RUN** — no browser available |

## Not run, and why

| Item | Reason |
|---|---|
| Video playback / embed permission per ID | No browser |
| Measured 6–12s slide cadence in a live browser | No browser; interval is clamped to 6000–12000 ms in code |
| Responsive layout at 320/390/768/1440 | No browser; layouts are authored responsive but unobserved |
| Keyboard, focus, zoom, screen-reader passes | No browser |
| Lighthouse / field performance | No browser; byte budgets measured instead |
| Before/after visual captures | V1 live site unreachable from this environment |
| Contact form delivery to a real recipient | Requires the live endpoint and an authorised test arrangement |
| Nevada advertising requirement check | Web search unavailable in this session |
