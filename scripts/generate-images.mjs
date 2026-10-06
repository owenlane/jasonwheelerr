/**
 * Generates responsive derivatives for every asset-lock source image.
 *
 * Source PNGs in assets/source-images/ are preserved untouched and are never
 * served. Derivatives are written to public/images/<group>/ at four widths in
 * AVIF and WebP, plus a tiny inline blur placeholder.
 *
 * Run: node scripts/generate-images.mjs
 */
import sharp from "sharp";
import { readdir, mkdir, stat, writeFile, access } from "node:fs/promises";
import path from "node:path";

const SRC = "assets/source-images";
const WIDTHS = [640, 960, 1280, 1920];

/** Maps a source filename prefix to its output directory. */
const GROUPS = [
  { dir: "strip", match: /^las-vegas-strip-/ },
  { dir: "charleston", match: /^mount-charleston-winter-/ },
  { dir: "calico", match: /^calico-basin-/ },
  { dir: "water", match: /^(hoover-dam|bypass-bridge|lake-mead)-/ },
  { dir: "arena", match: /^(t-mobile-arena|allegiant-stadium)-/ },
  { dir: "speedway", match: /^las-vegas-motor-speedway-/ },
  // V3: Home §4 aerials A/B and the two supplied Sell photographs.
  { dir: "home", match: /^home-aerial-/ },
  { dir: "sell", match: /^sell-photo-/ },
  // JWV3-FINAL-2 R103: supplied feature/section images (Home/Buy/Sell/Invest/Renovations).
  { dir: "feature", match: /^page\d+section\d+image$/ },
];

/**
 * V3 Home §2 headshot. Portrait 4:5 crop of the landscape original, keeping
 * the full head and face (approved crop; slight shoulder trim). Composition
 * and colour are otherwise unchanged. Focal point: x 1076 / y 778 of the
 * 2121×1556 original.
 */
const HEADSHOT = {
  file: "jason-wheeler-headshot-c.jpeg",
  dir: "home",
  base: "jason-wheeler-headshot-4x5",
  crop: { left: 454, top: 0, width: 1245, height: 1556 },
  widths: [440, 880, 1245],
};

/**
 * Per-source AVIF quality overrides. Falling snow is high-frequency noise and
 * encodes badly at the default: mount-charleston-winter-3 came out at 207KB
 * @1920, over the 140KB per-frame budget. q=40 brings it to 136KB with no
 * visible loss at the sizes it is displayed.
 */
const AVIF_QUALITY = {
  // High-frequency detail encodes badly at the default and overshoots the
  // 180KB @1920 budget. Each value below is the highest quality that fits.
  "mount-charleston-winter-3-cinematic-backdrop": 40, // falling snow
  "calico-basin-1-cinematic-backdrop": 44,            // sandstone grain
  "calico-basin-2-cinematic-backdrop": 44,
  "calico-basin-3-cinematic-backdrop": 46,
  "las-vegas-motor-speedway-1-backdrop": 46,          // dense aerial detail
};

const files = (await readdir(SRC)).filter((f) => f.endsWith(".png")).sort();
const blur = {};
let total = 0;

for (const file of files) {
  const group = GROUPS.find((g) => g.match.test(file.replace(/\.png$/, "")));
  if (!group) {
    console.warn(`  SKIP (no group): ${file}`);
    continue;
  }
  const out = path.join("public/images", group.dir);
  await mkdir(out, { recursive: true });
  const base = file.replace(/\.png$/, "");
  const sizes = [];
  // Never upscale: widths above the source are replaced by the source width.
  const { width: srcWidth } = await sharp(path.join(SRC, file)).metadata();
  const widths = WIDTHS.filter((w) => w <= srcWidth);
  if (!widths.includes(srcWidth) && srcWidth < WIDTHS.at(-1)) widths.push(srcWidth);
  const largest = widths.at(-1);

  for (const w of widths) {
    for (const [fmt, opts] of [
      ["avif", { quality: AVIF_QUALITY[base] ?? 52, effort: 4 }],
      ["webp", { quality: 74 }],
    ]) {
      const dest = path.join(out, `${base}-${w}.${fmt}`);
      // Idempotent: existing derivatives are left alone so reruns are cheap.
      const exists = await access(dest).then(() => true).catch(() => false);
      if (!exists) {
        await sharp(path.join(SRC, file)).resize(w).toFormat(fmt, opts).toFile(dest);
      }
      if (w === largest) sizes.push(`${fmt} ${((await stat(dest)).size / 1024).toFixed(0)}KB`);
    }
  }

  const buf = await sharp(path.join(SRC, file)).resize(16).webp({ quality: 30 }).toBuffer();
  blur[base] = `data:image/webp;base64,${buf.toString("base64")}`;
  total++;
  console.log(`  ${group.dir.padEnd(11)} ${base}  @${largest} ${sizes.join("  ")}`);
}

{
  const out = path.join("public/images", HEADSHOT.dir);
  await mkdir(out, { recursive: true });
  for (const w of HEADSHOT.widths) {
    for (const [fmt, opts] of [
      ["avif", { quality: 60, effort: 4 }],
      ["webp", { quality: 82 }],
    ]) {
      const dest = path.join(out, `${HEADSHOT.base}-${w}.${fmt}`);
      const exists = await access(dest).then(() => true).catch(() => false);
      if (!exists) {
        await sharp(path.join(SRC, HEADSHOT.file)).extract(HEADSHOT.crop).resize(w).toFormat(fmt, opts).toFile(dest);
      }
    }
  }
  console.log(`  ${HEADSHOT.dir.padEnd(11)} ${HEADSHOT.base}  4:5 crop ${HEADSHOT.widths.join("/")}w`);
}

await writeFile("assets/blur-placeholders.json", JSON.stringify(blur, null, 2));
console.log(`\n${total} source images processed, plus the Home headshot crop.`);
