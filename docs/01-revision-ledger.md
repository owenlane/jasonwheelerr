# Revision Ledger — R1–R7

Status: **RESOLVED** (implemented and verified) · **IMPLEMENTED—UNVERIFIED**
(shipped, runtime check not possible here) · **BLOCKED** (waiting on an input) ·
**NOT RUN**.

Evidence for every RESOLVED row is in `docs/05-verification.md`.

| ID | Atomic requirement | Status | Evidence |
|---|---|---|---|
| R1.1 | Inventory every authored written surface | RESOLVED | Repo read; all 10 routes plus header, footer, form, errors, 404 covered |
| R1.2 | Re-author all substantive site-owned prose | RESOLVED | 9 routes rewritten. `/privacy` deliberately untouched — see R1.8 |
| R1.3 | Rewrite utility strings per brief §19 | RESOLVED | Buttons sentence case; 0 placeholder-only labels; 0 "click here"; 404 rewritten |
| R1.4 | Record verbatim-retention exceptions | RESOLVED | One candidate: "See the house before you decide" — **not retained**, rewritten to "I'd rather you see the place before you decide" |
| R1.5 | Presentation vs assessment register by page | RESOLVED | Presentation: Home, Buy, About, Videos, Reviews, Contact. Assessment: Sell, Invest, Renovations scope, with a separated presentation module for finished work |
| R1.6 | Factual alt text, no evaluation | RESOLVED | All 20 written after opening each file at full size |
| R1.7 | Rewrite metadata and social descriptions | RESOLVED | All titles verified; root layout OpenGraph defect found and fixed |
| R1.8 | `/privacy` | **BLOCKED** | V1 copy preserved. Rewriting requires the real data practices; inventing a policy is prohibited |
| R2.1 | All 20 images placed deliberately | RESOLVED | **20/20 received, 20/20 integrated** and verified in rendered HTML |
| R2.2 | Four Strip images as homepage backdrop | RESOLVED | 4/4 in rendered HTML |
| R2.3 | 6–12s cadence, ~1.2s crossfade, drift, configurable | IMPLEMENTED—UNVERIFIED | 8000 ms clamped to 6000–12000 in code; live timing not observable without a browser |
| R2.4 | Single-image groups do not fake a slideshow | RESOLVED | `/contact` Speedway renders static: 0 pause control, 0 prev/next, no sequence role |
| R2.5 | Pause/resume and manual navigation | RESOLVED (present) | Pause + Previous/Next verified in `/buy` HTML |
| R2.6 | Reduced motion | IMPLEMENTED—UNVERIFIED | Coded; needs a browser to observe |
| R2.7 | Pause offscreen and on hidden tab | IMPLEMENTED—UNVERIFIED | IntersectionObserver + visibilitychange coded |
| R2.8 | No repeated announcement of decorative changes | IMPLEMENTED—UNVERIFIED | Live region written only by manual `go()` |
| R2.9 | Derivatives, preload only critical frame, defer rest | RESOLVED | 1 eager + 3 lazy verified; budget measured |
| R2.10 | Preserve source PNGs, keep a manifest | RESOLVED | Sources untouched in `assets/source-images/`; manifest in `lib/images.ts` |
| R2.11 | No ownership or affiliation implied by landmarks | RESOLVED | Captions name locations only |
| R3.1 | "Renovations" everywhere public | RESOLVED | 0 occurrences of "Property Help" across all 10 routes |
| R3.2 | Rewrite the service explanation, not just the label | RESOLVED | `/renovations` fully re-authored |
| R3.3 | `/renovations` canonical, permanent redirect | RESOLVED | 308 verified, both old paths |
| R3.4 | Legacy `?intent=property-help` maps correctly | RESOLVED | `resolveIntent` verified |
| R4.1 | Exact "Get in touch with me" CTA | RESOLVED | Present on all 10 routes; 0 "Contact Jason" |
| R4.2 | Plain wording for functional actions | RESOLVED | "Send the message", "Call", "Email", "See the videos" |
| R4.3 | Rough 50/50 first/third person | RESOLVED | First person throughout explanations and invitations; third person retained for identity, brokerage, licence, metadata |
| R4.4 | "we" only where the work supports it | RESOLVED | "I" for opinions and decisions, "my guys"/"we" for coordinated trade work |
| R5.1 | One shared collection keyed by ID | RESOLVED | `lib/personal-videos.ts`, duplicate guard throws at import |
| R5.2 | All ten reachable from BOTH pages | RESOLVED | `/videos` 10/10 in HTML; `/about` 4 + labelled expansion, same component and data |
| R5.3 | Click-to-load, labels, fallback | RESOLVED | 0 iframes at rest; "Watch on YouTube" per card |
| R5.4 | Clean URLs, exact IDs, drop the stray "Mak" | RESOLVED | All ten rebuilt from bare IDs |
| R5.5 | Preserve the property library and its filters | RESOLVED | `VideoLibrary` and its filters retained; feed pipeline untouched except the personal-ID exclusion |
| R5.6 | Test playback and embed restriction per video | **NOT RUN** | No browser available |
| R5.7 | Neutral identification, no recategorisation | RESOLVED | Classifier defect found and fixed — see verification record |
| R6.1 | Site-wide redesign | RESOLVED | New token system; V1 beige and Michroma removed |
| R6.2 | Licensed families, fallbacks | RESOLVED | Archivo + IBM Plex Sans/Mono, self-hosted, open-licensed |
| R6.3 | Retire tracked uppercase display | RESOLVED | Sentence case, tightened tracking, weights 600–700 |
| R6.4 | Scene palettes track the imagery | RESOLVED | 7 `[data-scene]` themes |
| R6.5 | One identity, no microsites | RESOLVED | Constant ink + constant amber across every scene |
| R6.6 | Verified contrast including over slideshow frames | RESOLVED | 44/44 token pairs; hero plate solved per pixel |
| R6.7 | Before/after captures | **NOT RUN** | V1 live site unreachable from this environment |
| R7.1 | Seven work areas have public destinations | RESOLVED | Listing/selling → `/sell`; renovations → `/renovations`; rental vacancy → `/invest`; auctions → `/invest`; probate → `/about` + `/`; quiet title → `/about`; 1031 → `/invest` |
| R7.2 | Breadth without a cramped headline | RESOLVED | H1 carries two, H2 carries five, detail on service pages |
| R7.3 | No unsupported regulated capability or guarantee | RESOLVED | Coordination language; explicit boundaries; no projections |
| R7.4 | Preserve the client quotation internally | RESOLVED | Held in `docs/02-service-scope-matrix.md`, never published as authored voice |

## Outstanding at handoff

| Item | State | What resolves it |
|---|---|---|
| R2.3, R2.6, R2.7, R2.8 — motion timing, reduced motion, offscreen pause, live-region silence | IMPLEMENTED—UNVERIFIED | A browser session. Code is in place and interval is clamped to 6000–12000 ms |
| R5.6 — playback and embed permission per video | NOT RUN | A browser session. A well-formed URL does not prove playback |
| R6.7 — before/after captures | NOT RUN | The V1 live site is unreachable from this environment |
| R1.8 — `/privacy` body copy | BLOCKED | Real data-handling practices from the repo owner and Jason. Naming is now correct; only the policy substance is untouched |
| Responsive layout at 320/390/768/1440 | NOT RUN | A browser session |
| Keyboard, focus, 200% zoom, screen reader | NOT RUN | A browser session |
| Contact form delivery to a real recipient | NOT RUN | The live endpoint and an authorised test arrangement |
| Nevada advertising requirement check | NOT RUN | Authoritative sources; web search unavailable in this session |
| Nine fact gates | OPEN | See `docs/03-fact-gates.md` |

A successful build is not a tested website. Every row above is a real
outstanding check, not a formality.
