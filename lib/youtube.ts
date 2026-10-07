import { person } from "./site";
import { personalVideoIds } from "./personal-videos";
import { videoCatalog } from "./video-catalog";

/**
 * VIDEO SYSTEM
 * Source of truth: YouTube channel @jason_wheeler. Video = YouTube only.
 *
 * Classification FAILS CLOSED. A video is only ever treated as qualifying
 * property content when its own title or description carries deterministic
 * evidence for it. Anything ambiguous is never auto-featured on Home or a
 * service page, and never enters a property collection.
 */

export type PropertyCategory = "for-sale" | "renovated" | "rentals-vacant";
export type Classification = PropertyCategory | "lifestyle" | "unclassified";

export type Video = {
  id: string;
  title: string;
  published: string;
  description: string;
  thumbnail: string;
  url: string;
  /** Property categories this video qualifies for. Empty unless proven. */
  categories: PropertyCategory[];
  classification: Classification;
  /** True only for confirmed property content eligible for featuring. */
  qualifying: boolean;
};

/** Filters for the property-video collection. */
export const propertyFilters: { id: PropertyCategory | "latest"; label: string }[] = [
  { id: "latest", label: "Latest" },
  { id: "for-sale", label: "For sale" },
  { id: "renovated", label: "Renovated" },
  { id: "rentals-vacant", label: "Rentals and vacant" },
];

/**
 * ABSOLUTE DENYLIST. This video must never be featured, archived, linked,
 * mentioned or surfaced anywhere on the site. Matched by stable video ID when
 * known, with normalised title matching as a secondary safeguard so the rule
 * survives ordinary title edits.
 */
const DENY_IDS = new Set<string>([]);
const DENY_TITLE_PATTERNS = [
  /turbo\s*scan/i,
  /scan\s+document/i,
  /document\s+scan/i,
  /iphone.*scan|scan.*iphone/i,
];

/**
 * R5 FIX — the ten curated personal videos are classified by ID, not by
 * title heuristics.
 *
 * The title heuristics below were misclassifying real personal content as
 * property content. The clearest case: "001 Chevy Silverado 2500HD 4x4 WORK
 * TRUCK utility bed 3\" lift video walk thru" matched GENERAL_PROPERTY on
 * `\bbed\b` (from "utility bed") and would have been eligible for featuring
 * as a property walkthrough. The iced tea, dog treat, crypto, disruptive-tech
 * and keto videos were also outside every LIFESTYLE pattern.
 *
 * Matching by stable ID makes this deterministic and immune to title edits,
 * and satisfies the requirement that personal content is never presented as
 * real-estate advice or as proof of professional expertise.
 */
const PERSONAL_IDS = new Set<string>(personalVideoIds);

/** Lifestyle content. Segregated from all property modules. */
const LIFESTYLE_PATTERNS = [
  /\bgrappling\b/i,
  /\bkrav\s*maga\b/i,
  /\bnomad\b/i,
  /\bjiu[\s-]?jitsu\b/i,
  /\bbjj\b/i,
  /\bsparring\b/i,
  /\bfishing\b/i,
  /\bfish\b/i,
  /\bangler\b/i,
  /\btraining\b/i,
  /\bworkout\b/i,
  /\bgym\b/i,
  /\bmartial\s*arts\b/i,
];

/** Non-property tutorials. Never eligible for automatic featuring. */
const TUTORIAL_PATTERNS = [/\btutorial\b/i, /\bhow to\b/i, /\bapp review\b/i];

const PROPERTY_EVIDENCE: Record<PropertyCategory, RegExp> = {
  "for-sale": /\b(for sale|just listed|new listing|listing|listed|on the market|open house|short sale|mls)\b/i,
  renovated: /\b(renovat\w*|remodel\w*|rehab\w*|flip(?:ped|ping)?|fully updated|before and after|new kitchen|quartz|cabinets?)\b/i,
  "rentals-vacant": /\b(vacant|empty|rental|rent[- ]ready|for rent|tenant|turnover|possession|move[- ]out)\b/i,
};

/** Generic property signal — supports qualification without a specific filter. */
const GENERAL_PROPERTY =
  /\b(walkthrough|walk through|house|home|condo|townhouse|townhome|property|bedroom|bed\b|bath\b|sq ?ft|square feet|garage|hoa|realty|real estate|acre|lot\b|fixer|foreclosur\w*|probate|notice of default)\b/i;

function isDenied(v: { id: string; title: string; description: string }): boolean {
  if (DENY_IDS.has(v.id)) return true;
  const normalised = `${v.title} ${v.description}`.replace(/[^a-z0-9\s]/gi, " ");
  return DENY_TITLE_PATTERNS.some((re) => re.test(normalised));
}

function classify(id: string, title: string, description: string): {
  classification: Classification;
  categories: PropertyCategory[];
  qualifying: boolean;
} {
  const text = `${title}\n${description}`;

  // Deterministic ID match wins over every title heuristic below.
  if (PERSONAL_IDS.has(id)) {
    return { classification: "lifestyle", categories: [], qualifying: false };
  }

  if (LIFESTYLE_PATTERNS.some((re) => re.test(text))) {
    return { classification: "lifestyle", categories: [], qualifying: false };
  }

  const categories = (Object.keys(PROPERTY_EVIDENCE) as PropertyCategory[]).filter((id) =>
    PROPERTY_EVIDENCE[id].test(text),
  );
  const hasProperty = categories.length > 0 || GENERAL_PROPERTY.test(text);

  // A tutorial is never auto-featured, even if it mentions a house.
  if (TUTORIAL_PATTERNS.some((re) => re.test(text))) {
    return { classification: "unclassified", categories: [], qualifying: false };
  }

  if (!hasProperty) {
    // Ambiguity fails closed.
    return { classification: "unclassified", categories: [], qualifying: false };
  }

  return {
    classification: categories[0] ?? "for-sale",
    categories,
    qualifying: true,
  };
}

function pick(block: string, tag: string): string {
  const m = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`));
  return m ? decode(m[1]) : "";
}

function decode(s: string): string {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&")
    .trim();
}

type Entry = { id: string; title: string; published: string; description: string; thumbnail: string };

const ID_RE = /^[A-Za-z0-9_-]{11}$/;
const validDate = (s: string) => !!s && !Number.isNaN(new Date(s).getTime());

/** Raw feed entries; structurally invalid entries are dropped, never repaired. */
function parseEntries(xml: string): Entry[] {
  const out: Entry[] = [];
  for (const raw of xml.split("<entry>").slice(1)) {
    const block = raw.split("</entry>")[0];
    const id = pick(block, "yt:videoId");
    const title = pick(block, "title");
    if (!ID_RE.test(id) || !title) continue;
    const thumb = block.match(/<media:thumbnail[^>]*url="([^"]+)"/);
    out.push({ id, title, published: pick(block, "published"), description: pick(block, "media:description"), thumbnail: thumb ? thumb[1] : "" });
  }
  return out;
}

function toVideo(e: Entry): Video | null {
  if (isDenied(e)) return null;
  const { classification, categories, qualifying } = classify(e.id, e.title, e.description);
  return {
    id: e.id,
    title: e.title,
    published: e.published,
    description: e.description,
    thumbnail: e.thumbnail || `https://i.ytimg.com/vi/${e.id}/maxresdefault.jpg`,
    url: `https://www.youtube.com/watch?v=${e.id}`,
    categories,
    classification,
    qualifying,
  };
}

/**
 * P2-R14 deterministic resolution: durable catalog + validated live entries.
 * Live values update known fields only when valid; a record absent from the live
 * window is kept. Catalog relative order is preserved. A new dated ID goes right after
 * the last catalog record dated on/after it (or first if none); each bucket is sorted
 * by date desc then ID; undated new IDs append in ID order. Classification and the
 * deny/personal rules are reapplied to the merged metadata.
 */
export function resolveVideos(catalog: readonly Entry[], live: readonly Entry[]): Video[] {
  const base = new Map<string, Entry>();
  for (const e of catalog) if (ID_RE.test(e.id) && e.title && !base.has(e.id)) base.set(e.id, { ...e });
  const fresh = new Map<string, Entry>();
  for (const e of live) {
    if (!ID_RE.test(e.id) || !e.title) continue;
    const known = base.get(e.id);
    if (known) {
      base.set(e.id, {
        id: e.id,
        title: e.title || known.title,
        description: e.description || known.description,
        published: validDate(known.published) ? known.published : validDate(e.published) ? e.published : known.published,
        thumbnail: e.thumbnail || known.thumbnail,
      });
    } else if (!fresh.has(e.id)) fresh.set(e.id, { ...e, published: validDate(e.published) ? e.published : "" });
  }
  const ordered = [...base.values()];
  const buckets = new Map<number, Entry[]>(); // insert after this catalog index (-1 = before the first)
  const undated: Entry[] = [];
  for (const e of fresh.values()) {
    if (!e.published) { undated.push(e); continue; }
    const t = new Date(e.published).getTime();
    let at = -1;
    ordered.forEach((b, i) => { if (validDate(b.published) && new Date(b.published).getTime() >= t) at = i; });
    buckets.set(at, [...(buckets.get(at) ?? []), e]);
  }
  const byDateThenId = (a: Entry, b: Entry) => new Date(b.published).getTime() - new Date(a.published).getTime() || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
  const merged: Entry[] = [...(buckets.get(-1) ?? []).sort(byDateThenId)];
  ordered.forEach((b, i) => { merged.push(b, ...(buckets.get(i) ?? []).sort(byDateThenId)); });
  merged.push(...undated.sort((a, b) => (a.id < b.id ? -1 : 1)));
  return merged.map(toVideo).filter((v): v is Video => v !== null);
}

/**
 * Videos for every surface. The durable catalog renders even when the feed fails
 * (non-OK, timeout, malformed, empty); valid live entries enhance it.
 */
export async function fetchVideos(): Promise<Video[]> {
  const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${person.youtubeChannelId}`;
  let live: Entry[] = [];
  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 },
      headers: { "user-agent": "jasonwheeler-site/2.0" },
      signal: AbortSignal.timeout(6000),
    });
    if (res.ok) live = parseEntries(await res.text());
  } catch {
    live = [];
  }
  return resolveVideos(videoCatalog, live);
}

/** Property videos only. Never returns lifestyle or ambiguous content. */
export function propertyVideos(videos: Video[]): Video[] {
  return videos.filter((v) => v.qualifying);
}

/** Lifestyle videos, for About Me and the deep archive only. */
export function lifestyleVideos(videos: Video[]): Video[] {
  return videos.filter((v) => v.classification === "lifestyle");
}

export function byFilter(videos: Video[], filter: PropertyCategory | "latest"): Video[] {
  const property = propertyVideos(videos);
  return filter === "latest" ? property : property.filter((v) => v.categories.includes(filter));
}

/** Featured property proof, preferring a named category then falling back. */
export function featured(videos: Video[], prefer: PropertyCategory[], limit: number): Video[] {
  const property = propertyVideos(videos);
  const ranked = [
    ...property.filter((v) => prefer.some((c) => v.categories.includes(c))),
    ...property,
  ];
  const seen = new Set<string>();
  return ranked.filter((v) => !seen.has(v.id) && seen.add(v.id)).slice(0, limit);
}

export function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ""
    : d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "America/Los_Angeles" }); // FINAL-4: fixed zone so server (UTC) and browser render the same date — no hydration mismatch
}
