# Outstanding — what blocks what

Two separate questions. **Client delivery** means sending Jason a preview to
review. **Publication** means putting it on a public production domain.

---

## A. Browser tests — none run, no browser in the build environment

Every item below is coded and believed correct, but was never observed running.
A green build is not a tested website.

| # | Test | Blocks client delivery? | Blocks publication? |
|---|---|---|---|
| A1 | Playback and embed permission for each of the ten personal videos | **YES** | **YES** |
| A2 | Responsive layout at 320 / 390 / 768 / 1440 CSS px | **YES** | **YES** |
| A3 | Slide cadence measured in a browser (interval is clamped to 6–12s in code) | No | **YES** |
| A4 | Reduced-motion behaviour observed | No | **YES** |
| A5 | Offscreen and hidden-tab pausing observed | No | No |
| A6 | Keyboard navigation and visible focus across templates | No | **YES** |
| A7 | 200% zoom | No | **YES** |
| A8 | Screen-reader pass, including that autoplay stays silent | No | **YES** |
| A9 | Crossfade quality — no blank frame, no layout shift | **YES** | **YES** |
| A10 | Lighthouse / field performance (byte budgets measured instead) | No | No |
| A11 | Before/after captures against V1 (V1 live site unreachable from here) | No | No |

**A1, A2 and A9 block client delivery.** If a personal video will not embed, or
a page breaks on a phone, or the hero flickers between frames, Jason sees the
defect before you do. Those three are roughly an hour in a browser.

The rest block publication but not review.

---

## B. Contact form — real delivery

| # | Item | Blocks client delivery? | Blocks publication? |
|---|---|---|---|
| B1 | `RESEND_API_KEY` set and a test message received in a real inbox | No | **YES** |
| B2 | Failure path: input preserved, no false "message sent" | No | **YES** |

Without B1 the endpoint returns 503 with `contactFallback: true` and the form
points the visitor at the phone number. That is honest, so a preview can go to
Jason with the form in fallback mode — but the site must not launch that way,
and it must never be described to him as a working form until B1 passes.

---

## C. Factual confirmations — Jason and the brokerage

None of these can be resolved by engineering. Repository files are
project-supplied information, not independent verification.

| # | Item | Who | Blocks client delivery? | Blocks publication? |
|---|---|---|---|---|
| C1 | Nevada licence number, type, status, expiry | State record / brokerage | No | **YES** |
| C2 | Blue Diamond Realty entity name, office, managing broker | Brokerage | No | **YES** |
| C3 | Reviews: source platform, reviewer consent, attribution, dates | Jason | No | **YES** |
| C4 | Actual reply time, so the confirmation message is not a false promise | Jason | No | **YES** |
| C5 | Current Nevada advertising and fair-housing requirements | Brokerage / counsel | No | **YES** |
| C6 | `/privacy` — real data handling, retention, analytics | Repo owner + Jason | No | **YES** |
| C7 | Contractor licensure, in writing | Jason | No | No |
| C8 | Whether any property-management service is offered | Jason / brokerage | No | No |
| C9 | Tenure: "two decades and more" vs "29 years" | Jason | No | No |
| C10 | Jason's role per featured project — owner, flipper, or agent | Jason, per project | No | No |

**C7–C10 do not block anything** because V2 already handles them safely: the
Renovations page uses coordination language and never claims installation, the
Invest page states plainly that he is not a property manager, no tenure figure
is published anywhere, and no generic "properties we renovated" claim exists.
Confirming them would let the copy say *more*, not fix anything currently wrong.

**C6 is the one to watch.** `/privacy` still carries V1 body copy. Its naming is
correct, but its substance was deliberately left untouched — writing a privacy
policy without knowing the real data flows would mean inventing one.

---

## D. Shortest path to a client preview

1. Run A1, A2 and A9 in a browser. Fix anything they surface.
2. Deploy to a **preview** URL, not production.
3. Send Jason the preview with the note in `docs/00-handoff.md`, describing the
   contact form as not yet connected.

Everything in section C, plus B1, B2 and the remaining A items, comes before a
public launch.

---

## E. Not outstanding — verified

Types, lint and production build pass. All 10 routes return 200 and an unknown
path returns 404. `/property-help` and its former child both 308 to
`/renovations` with the anchor preserved, and the legacy `?intent=property-help`
parameter resolves to the Renovations topic. "Property Help" and "Contact Jason"
appear **0 times** across all 10 routes including metadata. All 20 source images
render in their planned locations. `/videos` renders all ten personal video IDs
server-side and `/about` renders four with a labelled expansion. `/contact`
renders its single image statically with no motion controls. Colour contrast
passes 44/44. One `<h1>` per route, no placeholder-only labels, no "click here",
and none of the banned prestige vocabulary anywhere on the site.
