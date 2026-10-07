# Jason Wheeler — V3

Next.js 15 (App Router) · React 19 · Tailwind 4 · TypeScript.

**Status: V3 revision build, browser verification incomplete, nothing deployed.** Read `docs/00-handoff.md` before shipping anything.

## Install and run

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Preview a production build

```bash
npm run build
npm start
```

Also on <http://localhost:3000>. This is the build to look at when checking
image loading, motion and layout, because `dev` does not apply production
image handling.

## Checks

```bash
npx tsc --noEmit                  # types
npx next lint                     # lint
node scripts/check-contrast.mjs   # V3 colour contrast — expect 80/80
node scripts/generate-images.mjs  # rebuild image derivatives (idempotent)
```

## Environment

Copy `.env.example` to `.env.local`. Both variables are optional for running
the site — only the contact form's email delivery needs `RESEND_API_KEY`.
Without it the form fails honestly and points the visitor at the phone number.

## Where things are

```
app/                    routes (App Router)
  api/inquiry/          contact form endpoint
components/
  CinematicSequence     homepage-only Strip backdrop crossfade
  PhotoSections          static photo stories, bands, palettes and captions
  ThemeToggle            light/dark default theme switch
  PersonalVideoCollection  the ten personal videos, used by /about and /videos
  primitives.tsx        Section, Display, Body, Cta, Steps, DataRows
lib/
  site.ts               protected facts, nav, contact intents
  images.ts             the 20-image asset lock: alt text, captions, crops
  personal-videos.ts    P01–P10, one shared source for both destinations
  youtube.ts            live channel feed + property/personal classification
app/globals.css         default themes and photo palette system
assets/source-images/   the 20 original PNGs — never served, kept for regeneration
public/images/          generated AVIF/WebP derivatives at 4 widths
content/site-copy.md    the finished copy as a reference document
docs/                   handoff, ledger, manifests, verification, fact gates
```

`assets/source-images/` is ~68 MB of originals. They are not served and are only
needed to regenerate derivatives. Drop the folder if you want a lighter repo —
`public/images/` already contains everything the site serves.

## Rollback

V1 originals: `assets/v1-globals.css.bak`, `assets/v1-home.tsx.bak`.
