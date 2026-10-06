# Jason Wheeler V2 — Handoff

## Achieved status

**IMPLEMENTATION COMPLETE + COPY COMPLETE + 20/20 IMAGES INTEGRATED.**
**NOT a verified preview** — browser-dependent checks could not be run here.

- Public production deployment: **not performed, not attempted, not authorised.**
- Client approval: **none exists.** Jason has not seen or approved this copy.
- Brokerage review: **none exists.**

## Run it

```
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npx tsc --noEmit
npx next lint
node scripts/check-contrast.mjs      # 44/44
node scripts/generate-images.mjs     # idempotent; regenerates derivatives
```

No environment variables are required to run the site. The contact form posts
to `app/api/inquiry/route.ts` — inspect its real destination before relying on
it, and see the Contact and privacy gate below.

## What changed

**Keep** — the walkthrough proposition, Keys/Walk/Film/Decide, the four service
doors, direct phone and email, the live YouTube property library with its
filters, the two sourced reviews verbatim, the scope boundaries, Equal Housing
treatment.

**Cut** — the beige `#e8e6df` field, the Michroma tracked-uppercase display, the
"Property Help" name, every "Contact Jason" CTA, the 5.0 aggregate rating
derived from two reviews, the "29 years" tenure claim, and all V1 marketing
prose.

**Elevate** — seven scene palettes that track the photography under one
identity; numeric specifications given their own typographic treatment because
specificity is the whole voice; all 20 landmark photographs integrated as
sequences with real motion controls; the ten personal videos surfaced in both
required places.

## Maintenance

**Add a property walkthrough:** nothing to do. The library reads the channel
RSS feed hourly and classifies by title. Publish on YouTube and it appears.

**Add a personal video:** append one entry to `lib/personal-videos.ts`. It
renders on both `/about` and `/videos` automatically, and is excluded from the
property classifier by ID.

**Replace or add an image:** drop the PNG into `assets/source-images/` under its
asset-lock filename, run `node scripts/generate-images.mjs`, then set `alt`,
`caption` and `focal` in `lib/images.ts` after opening the file.

**Change motion timing:** `interval` on `CinematicSequence`, clamped to the
approved 6000–12000 ms window in code so it cannot leave the range.

**Edit copy:** it lives in the page components. `content/site-copy.md` in the
delivery bundle is the reference version with register and voice notes.

**Rollback:** V1 originals are preserved at `assets/v1-globals.css.bak` and
`assets/v1-home.tsx.bak`; everything else is recoverable from git history.

## Client-facing note — prepared, NOT sent

> The site is rebuilt. Everything written on it has been rewritten from the
> ground up in your own words, working from the recordings of you walking
> properties — short sentences, real numbers, what's new and what's existing,
> and the drawbacks said out loud instead of left out. "Property Help" is now
> "Renovations" everywhere. "Contact Jason" is now "Get in touch with me."
>
> All 20 of the photos you picked are in, spread across the pages rather than
> dumped in a gallery, with the slow fades you asked for and the colour on each
> section built to match the photo above it. The Strip runs across the top of
> the homepage, Mount Charleston sits on the buy page, Calico Basin on
> renovations, and so on.
>
> The nine personal videos are added alongside the grappling one, and all ten
> now show on both the About page and the Videos page.
>
> A few things still need you before it can go live: confirming your licence
> details with the brokerage, confirming the two reviews can be published and
> how they should be attributed, and telling me how quickly you actually reply
> so the confirmation message isn't promising something that isn't true.

Do not send this without authorisation.

## Read next

`docs/05-verification.md` — what was actually tested and what was not.
`docs/03-fact-gates.md` — the nine items that block publication.
`docs/01-revision-ledger.md` — R1–R7, row by row.
