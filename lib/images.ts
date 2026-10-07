/**
 * IMAGE ASSET LOCK — R2
 *
 * All 20 source images are supplied and integrated. The raw report's "22" is
 * superseded; 20 is final.
 *
 * Source PNGs live in assets/source-images/ and are never served. Derivatives
 * are written to public/images/<group>/ by scripts/generate-images.mjs at
 * widths 640/960/1280/1920 in AVIF and WebP.
 *
 * Each `alt` was written after opening the actual file at full size, not from
 * its filename. Where an image's content is more specific than its filename
 * suggests, the alt and caption follow the image.
 *
 * These landmark backdrops are brand imagery. They are not evidence of a
 * listing's view, proximity, condition, or of Jason's photography. No caption
 * or alt text implies ownership, authorship, venue affiliation or a property
 * relationship. Park imagery describes the space and its features only, never
 * who might use it.
 *
 * Measured byte budget, set from the actual files: every AVIF derivative is
 * <= 178KB at 1920 and <= 101KB at 1280. Only the homepage hero's first frame
 * loads eagerly; at a 390px viewport it fetches the 960w variant at 63KB.
 */

export type Frame = {
  /** Maps back to the asset-lock source filename, without extension. */
  base: string;
  /** Factual description of image content. No evaluation. */
  alt: string;
  /** Names the location. Kept synchronised with the active frame. */
  caption: string;
  /** object-position for deliberate crops on narrow viewports. */
  focal: string;
  received: boolean;
  blurDataURL: string;
};

export type GroupKey =
  | "strip"
  | "charleston"
  | "calico"
  | "water"
  | "arena"
  | "speedway";

export type ImageGroup = {
  scene: GroupKey;
  label: string;
  dir: string;
  frames: Frame[];
};

export const WIDTHS = [640, 960, 1280, 1920] as const;

export function srcSet(dir: string, base: string, ext: "avif" | "webp"): string {
  return WIDTHS.map((w) => `/images/${dir}/${base}-${w}.${ext} ${w}w`).join(", ");
}

export function fallbackSrc(dir: string, base: string): string {
  return `/images/${dir}/${base}-1280.webp`;
}

const GROUPS: Record<GroupKey, ImageGroup> = {
  strip: {
    scene: "strip",
    label: "Las Vegas Strip",
    dir: "strip",
    frames: [
      {
        base: "las-vegas-strip-1-cinematic-backdrop",
        alt:
          "Night view of the Bellagio fountains and the Las Vegas Strip, with the Eiffel Tower replica and illuminated hotels.",
        caption: "The Bellagio fountains and the Strip at night",
        focal: "50% 42%",
        received: true,
        blurDataURL:
          "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAACwAQCdASoQAAkABABoJQBOgB4+r8oAAP7pXfPdoXXOFuAg7z1sLYXTCPdrg9ZUMZnRUgAYI3ZvAD5KG5PKMr+ajONQAA==",
      },
      {
        base: "las-vegas-strip-2-cinematic-backdrop",
        alt:
          "Daytime view across the Bellagio lake toward Paris Las Vegas and the Strip beneath a blue sky with white clouds.",
        caption: "The Bellagio lake and Paris Las Vegas, daytime",
        focal: "50% 45%",
        received: true,
        blurDataURL:
          "data:image/webp;base64,UklGRmAAAABXRUJQVlA4IFQAAAAwAgCdASoQAAkABABoJaACdH8AGKwn4EvBgAD+sjkPlg/9ET3Hqc9ib9HSs7fYcWS5EQVAD5X71IDD0jOuhVQs0zCvgDLD28ngm4X9Na2AExnAcAA=",
      },
      {
        base: "las-vegas-strip-3-cinematic-backdrop",
        alt:
          "New York-New York hotel towers glowing gold at dusk, with the Statue of Liberty replica and palms along the boulevard.",
        caption: "New York-New York at dusk",
        focal: "50% 50%",
        received: true,
        blurDataURL:
          "data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAADQAQCdASoQAAkABABoJbACdADOqr3NgAD+wWqeu3EXALf+pQYurbPJdyUr+YTiv7Lho75S1MKFFWmq0o84UKBB19fYiD+RXPGq1agMAAA=",
      },
      {
        base: "las-vegas-strip-4-cinematic-backdrop",
        alt:
          "New York-New York hotel in daylight, with the green Statue of Liberty replica, red roller coaster, and palm trees.",
        caption: "New York-New York in daylight",
        focal: "50% 48%",
        received: true,
        blurDataURL:
          "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAAAQAgCdASoQAAkABABoJaACdGuAAdigjIQAAN9ZPDy0xJudMgaNn9F/TsT9H6ZmhDSt2hUF9aER0oPFsxiQQgQsS9GBlp1a8SXtwAAA",
      },
    ],
  },
  charleston: {
    scene: "charleston",
    label: "Mount Charleston in winter",
    dir: "charleston",
    frames: [
      {
        base: "mount-charleston-winter-1-cinematic-backdrop",
        alt:
          "A chairlift running up a snow-covered ski run at Lee Canyon on Mount Charleston, with snow-laden pines on both sides and a ridge under cloud behind.",
        caption: "The ski run at Lee Canyon, Mount Charleston",
        focal: "55% 50%",
        received: true,
        blurDataURL:
          "data:image/webp;base64,UklGRkwAAABXRUJQVlA4IEAAAADwAQCdASoQAAkABABoJZQCsAD1c+GCezAA9dcXrpyqj+KvRsi6HG92EJ9PVp6chsGyqv2azCSaJTxx6taunAAA",
      },
      {
        base: "mount-charleston-winter-2-cinematic-backdrop",
        alt:
          "The snow-covered summit ridge of Mount Charleston under a grey overcast sky, with exposed rock bands, scattered pines and the valley floor visible far below on the right.",
        caption: "The summit ridge, looking out over the valley",
        focal: "50% 55%",
        received: true,
        blurDataURL:
          "data:image/webp;base64,UklGRlYAAABXRUJQVlA4IEoAAADQAQCdASoQAAkABABoJZwAAlhI38UkAAD+xNGu8nvJgqnwQcpoFUByjX1qiTHnDGRdt3ai6ABRudB1PCIL2LUbZo80ZqWRIBoAAA==",
      },
      {
        base: "mount-charleston-winter-3-cinematic-backdrop",
        alt:
          "A wooden footbridge on a snow-covered trail through tall pines on Mount Charleston, with snow still falling.",
        caption: "A trail bridge on Mount Charleston, snowing",
        focal: "50% 60%",
        received: true,
        blurDataURL:
          "data:image/webp;base64,UklGRlQAAABXRUJQVlA4IEgAAACwAQCdASoQAAkABABoJZwAAizH1HoAAP7jw2DTTX/gqFqZlD2WcMHmY8JbnzVW/wHB9kDpAYwxygO9boBHc/uqqsp5bCgAAAA=",
      },
    ],
  },
  calico: {
    scene: "calico",
    label: "Calico Basin",
    dir: "calico",
    frames: [
      {
        base: "calico-basin-1-cinematic-backdrop",
        alt:
          "A wooden boardwalk through meadow grass and trees toward red sandstone and pale mountains at Calico Basin.",
        caption: "The boardwalk at Calico Basin",
        focal: "50% 55%",
        received: true,
        blurDataURL:
          "data:image/webp;base64,UklGRlwAAABXRUJQVlA4IFAAAAAQAgCdASoQAAkABABoJagCdAEeu2AApd14AP6DlIlb5shWdFwPWzi+SHGcoRrYugudrm40wid6U3N5ccXzsyN73hoN93vAIPwvmea+xYAAAA==",
      },
      {
        base: "calico-basin-2-cinematic-backdrop",
        alt:
          "A corridor between two red sandstone walls at Calico Basin, opening onto pale limestone peaks and desert floor under a blue sky.",
        caption: "Looking out through the red rock, Calico Basin",
        focal: "50% 50%",
        received: true,
        blurDataURL:
          "data:image/webp;base64,UklGRlwAAABXRUJQVlA4IFAAAADQAQCdASoQAAkABABoJbACdAC9Fq4qQAD+49Gn/vRLT+msMSd8lyNiirsWux5wtCSA9NTQOlVRgJHlHRqz75cugl0wFuW3XkR2PC2RymgAAA==",
      },
      {
        base: "calico-basin-3-cinematic-backdrop",
        alt:
          "Red and cream sandstone blocks below a layered cliff at Calico Basin, with green desert scrub along the rock face.",
        caption: "Layered sandstone at Calico Basin",
        focal: "50% 55%",
        received: true,
        blurDataURL:
          "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAADQAQCdASoQAAkABABoJbACdADaP5+QgAD+2nMQPTyJ9CD+Jm0xHBB7IvR2mVxCIhYnJyjQAMNVziRut1KdM7sUkAAAAA==",
      },
    ],
  },
  water: {
    scene: "water",
    label: "Hoover Dam, the bypass bridge and Lake Mead",
    dir: "water",
    frames: [
      {
        base: "hoover-dam-1-cinematic-backdrop",
        alt:
          "Hoover Dam seen from the canyon rim, with the curved concrete face, the intake towers, the access road switching back on the left and the reservoir behind showing a pale mineral line above the waterline.",
        caption: "Hoover Dam from the canyon rim",
        focal: "50% 50%",
        received: true,
        blurDataURL:
          "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAAAwAgCdASoQAAkABABoJYgCdAEXf+8EW+gsAAD+0PdQqWDY4n0bXMFmr6j8egRODesOaLu8ZFElo1SRi4L9yCGQtwAAAA==",
      },
      {
        base: "bypass-bridge-1-cinematic-backdrop",
        alt:
          "Aerial view of the Mike O'Callaghan-Pat Tillman Memorial Bridge arching across Black Canyon in low golden light, with Hoover Dam and its intake towers behind it.",
        caption: "The bypass bridge above Black Canyon",
        focal: "50% 50%",
        received: true,
        blurDataURL:
          "data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAADQAQCdASoQAAkABABoJbACdACk/UCgoAD+I/Hk0yqHoTgXQHx243U48jU8rQUGl7RKR+pH5O4ssp519z89aoiOGKx+bZ+cbFLhRJvAAAA=",
      },
      {
        base: "lake-mead-1-cinematic-backdrop",
        alt:
          "Aerial view across Lake Mead, with a covered marina and moored boats on the left shore, rocky islands in the blue water and desert ranges on the far side.",
        caption: "Lake Mead and the marina",
        focal: "50% 52%",
        received: true,
        blurDataURL:
          "data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAADQAQCdASoQAAkABABoJbACdAEOee5f4AD+YRbquPhF05Qosknox8bsPnulgnTU1xdhrxkJe4YtPAEBfOcbQJG5H0AAAA==",
      },
    ],
  },
  arena: {
    scene: "arena",
    label: "T-Mobile Arena and Allegiant Stadium",
    dir: "arena",
    frames: [
      {
        base: "t-mobile-arena-1-cinematic-backdrop",
        alt:
          "T-Mobile Arena in daylight, with its curved glass and copper facade, trees, and a blue sky.",
        caption: "T-Mobile Arena in daylight",
        focal: "50% 45%",
        received: true,
        blurDataURL:
          "data:image/webp;base64,UklGRlIAAABXRUJQVlA4IEYAAAAQAgCdASoQAAkABABoJbACdAEQSbRRH5OAAPfeh9NIr1QLO6ZPtM2mzF2doIU/ld/8Vu8F1C7QRUkRTK7/iddusnB0J8AA",
      },
      {
        base: "t-mobile-arena-2-cinematic-backdrop",
        alt:
          "T-Mobile Arena at dusk with purple entrance lighting, illuminated signs, and traffic light trails outside.",
        caption: "T-Mobile Arena at dusk",
        focal: "50% 45%",
        received: true,
        blurDataURL:
          "data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAAAwAgCdASoQAAkABABoJbACdGuAAuTzS5RjAAD+5DctxMZS16WSv01G8pqPlvg3TCajvVEVdFRFuC7hB8ZO8+JRW70LgashVtOVXqDAAAA=",
      },
      {
        base: "allegiant-stadium-1-cinematic-backdrop",
        alt:
          "Allegiant Stadium at night, its black shell outlined in white light, with the lit Strip towers and the Luxor pyramid behind it.",
        caption: "Allegiant Stadium at night",
        focal: "50% 50%",
        received: true,
        blurDataURL:
          "data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAADQAQCdASoQAAkABABoJQBOgCFsEf8yaAD+8twb2DKG5g7jBBdI5vhBObKvlPp2mEb/L9abfgYAAA==",
      },
      {
        base: "allegiant-stadium-2-cinematic-backdrop",
        alt:
          "Allegiant Stadium at sunrise, with the Luxor pyramid and the Mandalay Bay and Delano towers catching the light behind it and mountains on the horizon.",
        caption: "Allegiant Stadium at sunrise",
        focal: "50% 50%",
        received: true,
        blurDataURL:
          "data:image/webp;base64,UklGRk4AAABXRUJQVlA4IEIAAADwAQCdASoQAAkABABoJQBOgCHiFsFKWgAA/lvZlb8NjoMfTPMxEmN4pMabWHoNlAkHHO/dSanrtAb7llxCs/NzIAA=",
      },
    ],
  },
  speedway: {
    scene: "speedway",
    label: "Las Vegas Motor Speedway",
    dir: "speedway",
    frames: [
      {
        base: "las-vegas-motor-speedway-1-backdrop",
        alt:
          "Aerial view of Las Vegas Motor Speedway, the oval track and grandstand surrounded by parking lots and open desert, with the Strip skyline and mountains on the horizon.",
        caption: "Las Vegas Motor Speedway",
        focal: "50% 58%",
        received: true,
        blurDataURL:
          "data:image/webp;base64,UklGRkQAAABXRUJQVlA4IDgAAADQAQCdASoQAAkABABoJYwCdAEO5G0r0AD+W9dBZHzJXDtNyCX+zKLY9AK1OSgtCXXiF6T+Np4AAA==",
      },
    ],
  },
};

/** Returns only the frames whose source files have actually been supplied. */
export function group(key: GroupKey): ImageGroup {
  const g = GROUPS[key];
  return { ...g, frames: g.frames.filter((f) => f.received) };
}

/** Delivery status, for the manifest and the acceptance gate. */
export function assetStatus() {
  const all = Object.values(GROUPS).flatMap((f) => f.frames);
  return {
    total: all.length,
    received: all.filter((f) => f.received).length,
    outstanding: all.filter((f) => !f.received).map((f) => f.base),
  };
}
