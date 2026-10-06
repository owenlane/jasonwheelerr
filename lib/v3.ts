/**
 * V3 APPROVED DESIGN — Phase 3 colours and photo treatments, Phase 4 Home.
 *
 * Every value here is frozen by the approved specification. Solid sections
 * are 100% opaque background/foreground pairs. Photo sections use the page's
 * dark base hue under the image and a per-frame overlay P(a/b): a = opacity
 * across the whole text footprint, b = opacity over image-only areas.
 * Do not tune these to hide an implementation problem.
 */
import { group, WIDTHS } from "./images";

export type Align = "C" | "L" | "R";

/** "#RRGGBB" → "R G B" for rgb(var(--x) / alpha) usage. */
export function rgb(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
}

/** Light foreground on photographs and the dark-on-light solid pairs. */
export const WHITE = "#FFFFFF";

export type SolidColors = { bg: string; fg: string };

/**
 * JWV3-FINAL-2 FEATURE bases: starting deeper bases from the blueprint, raised in
 * HSL lightness (≤0.06; hue and saturation unchanged) to the brightest value that
 * keeps white text ≥5.8:1 over the base with a pure-white faint still at 14%
 * (floor 5.46). Recorded tokens:
 *   Home § 2        #176FC1 → start #0F4A81 → final #10508C (+0.023 L)
 *   Buy § 2         #5AC3E0 → start #0F414F → final #145567 (+0.056 L)
 *   Sell § 2        #8FB34E → start #39471E → final #425223 (+0.031 L)
 *   Renovations § 2 #DF8650 → start #773A16 → final #7D3D17 (+0.013 L)
 *   Renovations § 3 #8E3D29 → start #622A1C → final #7A3423 (+0.060 L)
 *   About § 2       #1551A0 → start #0E366B → final #124486 (+0.060 L)
 */
export const feature = {
  home: "#10508C",
  buy: "#145567",
  sell: "#425223",
  renovations2: "#7D3D17",
  renovations3: "#7A3423",
  about: "#124486",
} as const;

/** JWV3-FINAL-2 PINK: approved #EB52B1 is the darkest (bottom) stop. */
export const PINK = "linear-gradient(180deg,#ED5CB6 0%,#EC57B4 50%,#EB52B1 100%)";

export const palette = {
  home: { hue: "#0B1830", videos: { bg: "#EB52B1", fg: "#171A2C", hue: "23 26 44" } },
  buy: { hue: "#102B40", s3: { bg: "#174D78", fg: WHITE } },
  sell: { hue: "#141E2D", s3: { bg: "#244B35", fg: WHITE } },
  invest: {
    hue: "#152A32",
    s3: { bg: "#075A7A", fg: WHITE },
    s4: { bg: "#C87D4B", fg: "#291C16" },
  },
  renovations: {
    hue: "#301B15",
    s4: { bg: "#CE845A", fg: "#301B15" },
  },
  videos: { hue: "#0B1B2E", s2: { bg: "#086674", fg: WHITE }, s3: { bg: "#DEAA45", fg: "#0B1B2E" } },
  about: {
    hue: "#0F1C31",
    s3: { bg: "#6435B1", fg: WHITE },
    s4: { bg: "#E7A65B", fg: "#0F1C31" },
  },
  reviews: { hue: "#301B15" },
  contact: { hue: "#102438", s2: { bg: "#78B5DF", fg: "#102438" }, s3: { bg: "#163957", fg: WHITE } },
} as const;

/** One cinematic frame: a source image plus its own overlay treatment. */
export type CineFrame = {
  key: string;
  avif: string;
  webp: string;
  fallback: string;
  focal: string;
  /** P(a/b) as fractions. */
  a: number;
  b: number;
  /** Single-source crop-fade: the tighter crop, at most 8% tighter. */
  scale?: number;
};

function srcset(dir: string, base: string, ext: "avif" | "webp", widths: readonly number[]) {
  return widths.map((w) => `/images/${dir}/${base}-${w}.${ext} ${w}w`).join(", ");
}

function frame(
  dir: string,
  base: string,
  focal: string,
  [a, b]: [number, number],
  widths: readonly number[] = WIDTHS,
  scale?: number,
): CineFrame {
  return {
    key: scale ? `${base}-tight` : base,
    avif: srcset(dir, base, "avif", widths),
    webp: srcset(dir, base, "webp", widths),
    fallback: `/images/${dir}/${base}-1280.webp`,
    focal,
    a,
    b,
    scale,
  };
}

/** Frame from the existing V2 asset lock, keeping its approved focal point. */
function v2(key: Parameters<typeof group>[0], index: number, p: [number, number], scale?: number) {
  const g = group(key);
  const f = g.frames[index];
  return frame(g.dir, f.base, f.focal, p, WIDTHS, scale);
}

const SELL_WIDTHS = [640, 960, 1280, 1672] as const;
/** Single-source exceptions dissolve to a crop no more than 8% tighter. */
const TIGHT = 1.08;

export const frames = {
  // Home hero: existing Strip S1 → S4, P(68/30).
  homeHero: [0, 1, 2, 3].map((i) => v2("strip", i, [0.68, 0.3])),
  // Home §4: latest aerial A (lighter) P(72/34) → B (darker) P(68/28).
  homeContact: [
    frame("home", "home-aerial-a-cinematic-backdrop", "50% 55%", [0.72, 0.34]),
    frame("home", "home-aerial-b-cinematic-backdrop", "50% 55%", [0.68, 0.28]),
  ],
  // Buy: W1 → W2 → W3, P(72/36).
  buy: [0, 1, 2].map((i) => v2("charleston", i, [0.72, 0.36])),
  // Sell: SP1 (dusk) P(66/24) → SP2 (daytime park) P(72/36).
  sell: [
    frame("sell", "sell-photo-1-cinematic-backdrop", "35% 55%", [0.66, 0.24], SELL_WIDTHS),
    frame("sell", "sell-photo-2-cinematic-backdrop", "40% 60%", [0.72, 0.36], SELL_WIDTHS),
  ],
  // Invest: L (Lake Mead) → B (bypass bridge) → D (Hoover Dam), P(70/32).
  invest: [v2("water", 2, [0.7, 0.32]), v2("water", 1, [0.7, 0.32]), v2("water", 0, [0.7, 0.32])],
  // Renovations: C1 → C2 → C3, P(70/32).
  renovations: [0, 1, 2].map((i) => v2("calico", i, [0.7, 0.32])),
  // Videos: authorised Home Strip reuse, P(68/30).
  videos: [0, 1, 2, 3].map((i) => v2("strip", i, [0.68, 0.3])),
  // About (JWV3-FINAL-2 R85): T-Mobile day P(72/34) → T-Mobile night P(66/28) → Allegiant night P(66/28).
  // The verified daytime Allegiant (allegiant-stadium-2) moved to About § 2 (R84).
  about: [v2("arena", 0, [0.72, 0.34]), v2("arena", 1, [0.66, 0.28]), v2("arena", 2, [0.66, 0.28])],
  // Reviews (JWV3-FINAL-2 R88): single C2 wide still, Ken Burns; no crop-fade.
  reviews: v2("calico", 1, [0.7, 0.32]),
  // Invest § 2 (JWV3-FINAL-2 R80/R82): full-bleed supplied still, #152A32 at 0.78 text / 0.38 image-only.
  invest2: frame("feature", "page4section2image", "62% 50%", [0.78, 0.38]),
  // Contact: approved single-source exception — M wide → tighter crop.
  contact: [v2("speedway", 0, [0.72, 0.36]), v2("speedway", 0, [0.72, 0.36], TIGHT)],
} satisfies Record<string, CineFrame[] | CineFrame>;

/** Home §2 headshot C, approved 4:5 crop. */
export const headshot = {
  alt: "Jason Wheeler",
  width: 1245,
  height: 1556,
  avif: srcset("home", "jason-wheeler-headshot-4x5", "avif", [440, 880, 1245]),
  webp: srcset("home", "jason-wheeler-headshot-4x5", "webp", [440, 880, 1245]),
  fallback: "/images/home/jason-wheeler-headshot-4x5-880.webp",
};

/** FEATURE images: one source per section, used for both the faint still and the framed photo. */
export type FeatureImage = { avif: string; webp: string; fallback: string; focal: string; width: number; height: number };
function featureImage(dir: string, base: string, focal: string, widths: readonly number[], width: number, height: number): FeatureImage {
  return { avif: srcset(dir, base, "avif", widths), webp: srcset(dir, base, "webp", widths), fallback: `/images/${dir}/${base}-960.webp`, focal, width, height };
}
const BUY_WIDTHS = [640, 960, 1280, 1672] as const;
export const featureImages = {
  home: featureImage("feature", "page1section2image", "50% 40%", WIDTHS, 1920, 1080),
  buy: featureImage("feature", "page2section2image", "55% 45%", BUY_WIDTHS, 1672, 941),
  sell: featureImage("feature", "page3section2image", "62% 45%", WIDTHS, 1920, 1080),
  renovations2: featureImage("feature", "page5section2image", "50% 55%", WIDTHS, 1920, 1080),
  renovations3: featureImage("feature", "page5section3image", "68% 55%", WIDTHS, 1920, 1080),
  // R84: verified daytime Allegiant (allegiant-stadium-2, sha256 ce3da3c4…0214).
  about: featureImage("arena", "allegiant-stadium-2-cinematic-backdrop", "40% 50%", WIDTHS, 1920, 1080),
};
