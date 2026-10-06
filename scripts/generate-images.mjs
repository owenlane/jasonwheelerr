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
  { dir: "park", match: /^(mesa-park|fox-hill-park)-/ },
  { dir: "speedway", match: /^las-vegas-motor-speedway-/ },
];

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
  "fox-hill-park-1-cinematic-backdrop": 46,           // turf + foliage
  "las-vegas-motor-speedway-1-backdrop": 46,          // dense aerial detail
};

const files = (await readdir(SRC)).filter((f) => f.endsWith(".png")).sort();
const blur = {};
let total = 0;

for (const file of files) {
  const group = GROUPS.find((g) => g.match.test(file));
  if (!group) {
    console.warn(`  SKIP (no group): ${file}`);
    continue;
  }
  const out = path.join("public/images", group.dir);
  await mkdir(out, { recursive: true });
  const base = file.replace(/\.png$/, "");
  const sizes = [];

  for (const w of WIDTHS) {
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
      if (w === 1920) sizes.push(`${fmt} ${((await stat(dest)).size / 1024).toFixed(0)}KB`);
    }
  }

  const buf = await sharp(path.join(SRC, file)).resize(16).webp({ quality: 30 }).toBuffer();
  blur[base] = `data:image/webp;base64,${buf.toString("base64")}`;
  total++;
  console.log(`  ${group.dir.padEnd(11)} ${base}  @1920 ${sizes.join("  ")}`);
}

await writeFile("assets/blur-placeholders.json", JSON.stringify(blur, null, 2));
console.log(`\n${total} source images processed, ${total * WIDTHS.length * 2} derivatives written.`);
