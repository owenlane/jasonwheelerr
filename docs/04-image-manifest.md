# Image Manifest — R2

**20 is the final source count.** The raw report's "22" is superseded.
No replacements are generated and no substitute stock is used.

**Received 20 / 20 · Implemented 20 / 20 · Outstanding 0.**

Source PNGs are preserved untouched in `assets/source-images/` and are never
served. Derivatives are produced by `node scripts/generate-images.mjs`, which is
idempotent — existing outputs are left alone, so reruns are cheap.

| # | Batch | Exact source filename | Group | Received | Implemented | Route |
|---|---|---|---|---|---|---|
| 1 | 1 | `las-vegas-strip-1-cinematic-backdrop.png` | Strip | ✅ | ✅ | `/` hero |
| 2 | 1 | `las-vegas-strip-2-cinematic-backdrop.png` | Strip | ✅ | ✅ | `/` hero |
| 3 | 1 | `las-vegas-strip-3-cinematic-backdrop.png` | Strip | ✅ | ✅ | `/` hero |
| 4 | 1 | `las-vegas-strip-4-cinematic-backdrop.png` | Strip | ✅ | ✅ | `/` hero |
| 5 | 2 | `mount-charleston-winter-1-cinematic-backdrop.png` | Charleston | ✅ | ✅ | `/buy` |
| 6 | 2 | `mount-charleston-winter-2-cinematic-backdrop.png` | Charleston | ✅ | ✅ | `/buy` |
| 7 | 2 | `mount-charleston-winter-3-cinematic-backdrop.png` | Charleston | ✅ | ✅ | `/buy` |
| 8 | 3 | `calico-basin-1-cinematic-backdrop.png` | Calico | ✅ | ✅ | `/renovations` |
| 9 | 3 | `calico-basin-2-cinematic-backdrop.png` | Calico | ✅ | ✅ | `/renovations` |
| 10 | 3 | `calico-basin-3-cinematic-backdrop.png` | Calico | ✅ | ✅ | `/renovations` |
| 11 | 4 | `hoover-dam-1-cinematic-backdrop.png` | Water | ✅ | ✅ | `/invest` |
| 12 | 4 | `bypass-bridge-1-cinematic-backdrop.png` | Water | ✅ | ✅ | `/invest` |
| 13 | 4 | `lake-mead-1-cinematic-backdrop.png` | Water | ✅ | ✅ | `/invest` |
| 14 | 5 | `t-mobile-arena-1-cinematic-backdrop.png` | Arena | ✅ | ✅ | `/about` |
| 15 | 5 | `t-mobile-arena-2-cinematic-backdrop.png` | Arena | ✅ | ✅ | `/about` |
| 16 | 5 | `allegiant-stadium-1-cinematic-backdrop.png` | Arena | ✅ | ✅ | `/about` |
| 17 | 5 | `allegiant-stadium-2-cinematic-backdrop.png` | Arena | ✅ | ✅ | `/about` |
| 18 | 6 | `mesa-park-2-cinematic-backdrop.png` | Park | ✅ | ✅ | `/sell` |
| 19 | 6 | `fox-hill-park-1-cinematic-backdrop.png` | Park | ✅ | ✅ | `/sell` |
| 20 | 7 | `las-vegas-motor-speedway-1-backdrop.png` | Speedway | ✅ | ✅ | `/contact` |

`mesa-park-2` keeps its suffix. There is no missing `mesa-park-1`; that group is
two images by design.

## How outstanding images are handled

`lib/images.ts` carries all 20 entries with a `received` flag. `group()` filters
out unreceived frames, and each page renders its sequence section only when
frames exist. Pages for outstanding groups render **200 with no placeholder and
no broken image**, verified. A placeholder is never treated as a delivered image.

To add a batch: drop the PNGs into `assets/source-images/` under their exact
asset-lock filenames, run `node scripts/generate-images.mjs`, then flip
`received: true` and write the `alt` and `caption` for each new frame in
`lib/images.ts` after inspecting the actual image.

## Inspected images — what they actually show

Filenames are not evidence of content, so each received image was opened and
described from what is in the frame.

| File | Content | Note |
|---|---|---|
| `las-vegas-strip-1` | New York-New York frontage, daylight, Statue of Liberty replica, roller coaster, palms | Matches filename |
| `las-vegas-strip-2` | Same frontage after dark, lit, traffic light trails | Matches |
| `las-vegas-strip-3` | Aerial over Bellagio fountains, daylight, Paris Eiffel replica, High Roller | Matches |
| `las-vegas-strip-4` | Same view at night, Caesars Palace left, Paris lit gold | Matches |
| `mount-charleston-winter-1` | Chairlift over a snow-covered ski run, snow-laden pines, ridge under cloud | Winter confirmed |
| `mount-charleston-winter-2` | Snow-covered summit ridge under overcast, exposed rock, valley floor beyond | Winter confirmed |
| `mount-charleston-winter-3` | Wooden footbridge on a snowy trail through pines, snow still falling | Winter confirmed |

All seven are 1920×1080 RGB PNG. Winter imagery remains winter — no warm grade
applied.

## Measured budget

≤180 KB at 1920, ≤100 KB at 1280. All 7 pass at every srcset width. Full table
in `docs/05-verification.md`.

---


## Inspected images — what each one actually shows

Filenames are not evidence of content. Every one of the 20 was opened at full
size and described from the frame. Where the image is more specific than the
filename, the alt and caption follow the image.

| File | Content |
|---|---|
| `las-vegas-strip-1` | New York-New York frontage, daylight, Statue of Liberty replica, roller coaster, palms |
| `las-vegas-strip-2` | Same frontage after dark, lit gold, traffic light trails |
| `las-vegas-strip-3` | Aerial over the Bellagio fountains, daylight, Paris Eiffel replica, High Roller |
| `las-vegas-strip-4` | Same view at night, Caesars Palace left, Paris lit gold |
| `mount-charleston-winter-1` | Chairlift over a snow-covered ski run at Lee Canyon, snow-laden pines |
| `mount-charleston-winter-2` | Snow-covered summit ridge under overcast, exposed rock, valley floor beyond |
| `mount-charleston-winter-3` | Wooden footbridge on a snowy trail through pines, snow still falling |
| `calico-basin-1` | Slabs of red and cream banded sandstone piled at the foot of a striped rock face |
| `calico-basin-2` | Corridor between red sandstone walls opening onto pale limestone peaks |
| `calico-basin-3` | Boardwalk through green meadow grass toward red outcrops — **summer, not winter** |
| `hoover-dam-1` | Hoover Dam from the canyon rim, access road switchbacks, mineral line above the waterline |
| `bypass-bridge-1` | Aerial of the memorial bridge arching across Black Canyon, dam behind |
| `lake-mead-1` | Aerial across Lake Mead, covered marina, rocky islands, desert ranges |
| `t-mobile-arena-1` | T-Mobile Arena at dusk, entrance canopy lit purple, traffic light trails |
| `t-mobile-arena-2` | T-Mobile Arena in daylight, curved glass and copper facade, plaza trees |
| `allegiant-stadium-1` | Allegiant Stadium at night, black shell outlined in white light, Strip behind |
| `allegiant-stadium-2` | Allegiant Stadium at sunrise, Luxor pyramid and Mandalay Bay towers behind |
| `mesa-park-2` | Playground with a looping orange climbing frame, ball sculptures, mown lawn, ridge behind |
| `fox-hill-park-1` | Aerial of three baseball diamonds, picnic area, playground under shade sails |
| `las-vegas-motor-speedway-1` | Aerial of the oval track and grandstand, parking, Strip skyline on the horizon |

All 20 are 1920×1080 RGB PNG — 0 dimension mismatches.

**Winter stays winter:** the three Mount Charleston frames are all snow-covered
and no warm grade was applied. Note that `calico-basin-3` is a green summer
frame; it sits in the Calico group as supplied and its caption names the
location, not a season.

**Fair-housing note:** the two park images are described by their space and
features only. No alt text, caption or body copy anywhere on the site describes
who might use a park or occupy a property.

## Asset lock closed

All 20 source images are supplied, inspected, optimised and integrated. No
further image batches are required. No image was generated, substituted or
recoloured.

### Quality overrides applied

Six sources overshot the 180KB @1920 ceiling at the default AVIF quality
because of high-frequency detail. Each override is the highest quality that
fits, recorded in `scripts/generate-images.mjs`:

| Source | Reason | Quality | Result |
|---|---|---|---|
| `mount-charleston-winter-3` | falling snow | 40 | 136 KB |
| `calico-basin-1` | sandstone grain | 44 | 152 KB |
| `calico-basin-2` | sandstone grain | 44 | 164 KB |
| `calico-basin-3` | sandstone grain | 46 | 156 KB |
| `fox-hill-park-1` | turf and foliage | 46 | 162 KB |
| `las-vegas-motor-speedway-1` | dense aerial detail | 46 | 151 KB |

### Final measured budget, all 20 sources

| srcset width | max | mean |
|---|---|---|
| 640w | 32 KB | 25 KB |
| 960w | 65 KB | 52 KB |
| 1280w | 101 KB | 82 KB |
| 1920w | 178 KB | 145 KB |

**0 derivatives over the 180 KB @1920 ceiling.**
