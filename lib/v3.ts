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

/** Light foreground on photographs and the dark-on-light solid pairs. */
export const WHITE = "#FFFFFF";

export type SolidColors = { bg: string; fg: string };

export const palette = {
  home: { hue: "#0B1830", bio: { bg: "#176FC1", fg: WHITE }, videos: { bg: "#EB52B1", fg: "#171A2C" } },
  buy: { hue: "#102B40", s2: { bg: "#5AC3E0", fg: "#102B40" }, s3: { bg: "#174D78", fg: WHITE } },
  sell: { hue: "#141E2D", s2: { bg: "#8FB34E", fg: "#172719" }, s3: { bg: "#244B35", fg: WHITE } },
  invest: {
    hue: "#152A32",
    s2: { bg: "#DB873C", fg: "#291C16" },
    s3: { bg: "#075A7A", fg: WHITE },
    s4: { bg: "#C87D4B", fg: "#291C16" },
  },
  renovations: {
    hue: "#301B15",
    s2: { bg: "#DF8650", fg: "#301B15" },
    s3: { bg: "#8E3D29", fg: WHITE },
    s4: { bg: "#CE845A", fg: "#301B15" },
  },
  videos: { hue: "#0B1B2E", s2: { bg: "#086674", fg: WHITE }, s3: { bg: "#DEAA45", fg: "#0B1B2E" } },
  about: {
    hue: "#0F1C31",
    s2: { bg: "#1551A0", fg: WHITE },
    s3: { bg: "#6435B1", fg: WHITE },
    s4: { bg: "#E7A65B", fg: "#0F1C31" },
  },
  reviews: { hue: "#301B15", s2: { bg: "#DF8650", fg: "#301B15" }, s3: { bg: "#075B93", fg: WHITE } },
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
  // About: T1 P(72/34) → T2 P(66/28) → A1 P(66/28) → A2 P(72/34).
  about: [v2("arena", 0, [0.72, 0.34]), v2("arena", 1, [0.66, 0.28]), v2("arena", 2, [0.66, 0.28]), v2("arena", 3, [0.72, 0.34])],
  // Reviews: approved single-source exception — C2 wide → tighter crop.
  reviews: [v2("calico", 1, [0.7, 0.32]), v2("calico", 1, [0.7, 0.32], TIGHT)],
  // Contact: approved single-source exception — M wide → tighter crop.
  contact: [v2("speedway", 0, [0.72, 0.36]), v2("speedway", 0, [0.72, 0.36], TIGHT)],
} satisfies Record<string, CineFrame[]>;

/** Home §2 headshot C, approved 4:5 crop. */
export const headshot = {
  alt: "Jason Wheeler",
  width: 1245,
  height: 1556,
  avif: srcset("home", "jason-wheeler-headshot-4x5", "avif", [440, 880, 1245]),
  webp: srcset("home", "jason-wheeler-headshot-4x5", "webp", [440, 880, 1245]),
  fallback: "/images/home/jason-wheeler-headshot-4x5-880.webp",
};
