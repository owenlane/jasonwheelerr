# jasonwheeler

Production website for Jason Wheeler, licensed Nevada real estate salesperson with Blue Diamond
Realty, serving Las Vegas and Southern Nevada.

**Current state: V2.** Built against the Final Design Report (Component 2), which is the authority
for design, UX, conversion hierarchy, media placement, route scope, copy and business meaning.

## Stack

- Next.js 15 (App Router) · React 19 · TypeScript
- Tailwind CSS 4
- Fonts self-hosted from npm — Michroma (display), Manrope (body). No external font request.
- No CMS, no database, no analytics vendor, no auth, no CRM

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run start
npm run lint
npm run typecheck
```

## Routes

| Route | Visible label | Notes |
| --- | --- | --- |
| `/` | Home | Contact-dominant hero, no player in first viewport |
| `/buy` | Buy | Strongest route emphasis |
| `/sell` | Sell | Second-strongest |
| `/invest` | Invest | |
| `/property-help` | Property Help | Absorbs the out-of-state-owner content |
| `/videos` | YouTube Videos | Slug preserved; label only differs |
| `/about` | About Me | Slug preserved; label only differs |
| `/contact` | Contact | |
| `/privacy` | Privacy | |

`/property-help/out-of-state-owners` is a permanent redirect to
`/property-help#out-of-state-owners`. Do not restore standalone content there.

Navigation order is fixed: Buy, Sell, Invest, Property Help, YouTube Videos, About Me, Contact.
Do not reorder or rename without explicit authorisation.

## Design system

Light default. Warm ivory is the reading surface; dark is reserved for film and selected
high-impact surfaces. Sans-only, sharp geometry, thin rules, no rounded cards or pill UI.

| Token | Value | Role |
| --- | --- | --- |
| `--color-field` | `#E8E6DF` | Principal light field |
| `--color-ink` | `#1E1B14` | Primary dark text and structure |
| `--color-media` | `#11100B` | Deepest film/media surface |
| `--color-accent` | `#A89C8A` | Rules, separators, selective emphasis |
| `--color-support` | `#7B5E41` | Secondary emphasis only |

`--color-ink` being named "primary" does not authorise an all-dark site. Light default wins.

Section labels use `.microlabel` — a function label only. Numbered section branding
(`01`, `02`, `03`) is forbidden and must not return.

## Video system

Source of truth is the YouTube channel `@jason_wheeler`, read server-side from the public upload
feed and revalidated hourly. No API key, no client credential, no CMS.

Classification **fails closed** (`lib/youtube.ts`):

- A video is only `qualifying` when its own title or description carries deterministic property
  evidence. Anything ambiguous is never auto-featured and never enters a property collection.
- Tutorials are never auto-featured, even when they mention a house.
- Lifestyle content (fishing, training, grappling, Krav Maga) is classified separately and may
  appear **only** on About Me and in the dedicated archive section of `/videos`. It can never share
  a row, grid, carousel or cluster with property content, and can never surface as "Latest".
- The TurboScan / iPhone document-scan tutorial is on an absolute denylist, matched by stable video
  ID and by normalised title patterns so the rule survives title edits. It is filtered out at parse
  time and can never render anywhere.

Foreground playback is user-initiated only. `CinematicVideo` renders a still-frame facade and
mounts the YouTube iframe only after a click, so nothing autoplays and no iframe loads on first
paint.

## Contact and form delivery

Required methods are all exposed: form (primary), phone 714-928-8905, SMS, email, Instagram,
YouTube. A persistent Contact affordance sits in the desktop header; mobile has a sticky Call +
Contact bar, with `<main>` padded so it never covers content.

Intent routing is preserved: `?intent=buyer|seller|investor|property-help`.

The form submits on-site to `/api/inquiry`, which emails the submission to Jason and returns an
on-site confirmation state. There is no mail-client handoff.

**Required environment variable: `RESEND_API_KEY`** (server scope only).
Optional: `INQUIRY_FROM_ADDRESS`.

Without `RESEND_API_KEY` the route returns 503 and the form shows an honest error with direct
phone and email fallbacks — it never shows a false success. The route implements payload-size
limits, per-IP rate limiting, control-character stripping, server-side validation, a honeypot, and
generic error messages that do not leak configuration. **No submitted value is logged. Do not add
logging that changes this.**

## Protected facts

Do not alter or expand: licence S.169016, public ID 226550, Blue Diamond Realty, managing broker
Kimiko Leong, office 6675 S Tenaya Way Suite 200 Las Vegas NV 89113, phone 714-928-8905, email
buyerslv@gmail.com, Instagram @buyerslv, YouTube @jason_wheeler, Equal Housing Opportunity, and the
`/privacy` legal meaning.

Never present construction, inspection, legal, tax, accounting or property-management services. No
invented testimonials, results, certifications, guarantees or statistics.

## Deployment

GitHub `owenlane/jasonwheeler`, production branch `main`. Hosting: Vercel project `jasonwheeler`.
Pushes to `main` deploy automatically once the repository is linked.
