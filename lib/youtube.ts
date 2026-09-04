import { person } from "./site";

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

function classify(title: string, description: string): {
  classification: Classification;
  categories: PropertyCategory[];
  qualifying: boolean;
} {
  const text = `${title}\n${description}`;

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

function parseFeed(xml: string): Video[] {
  const out: Video[] = [];
  for (const raw of xml.split("<entry>").slice(1)) {
    const block = raw.split("</entry>")[0];
    const id = pick(block, "yt:videoId");
    const title = pick(block, "title");
    if (!id || !title) continue;

    const description = pick(block, "media:description");
    if (isDenied({ id, title, description })) continue;

    const thumb = block.match(/<media:thumbnail[^>]*url="([^"]+)"/);
    const { classification, categories, qualifying } = classify(title, description);

    out.push({
      id,
      title,
      published: pick(block, "published"),
      description,
      thumbnail: thumb ? thumb[1] : `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`,
      url: `https://www.youtube.com/watch?v=${id}`,
      categories,
      classification,
      qualifying,
    });
  }
  return out;
}

/** Recent uploads. Empty array on failure — the site never breaks on a feed outage. */
export async function fetchVideos(): Promise<Video[]> {
  const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${person.youtubeChannelId}`;
  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 },
      headers: { "user-agent": "jasonwheeler-site/2.0" },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return [];
    return parseFeed(await res.text());
  } catch {
    return [];
  }
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
    : d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}
