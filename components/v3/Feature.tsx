import type { CSSProperties, ReactNode } from "react";
import { rgb, type FeatureImage } from "@/lib/v3";
import { Deferred, FeatureFit, KenBurns, RevealCover } from "./motion";

/**
 * JWV3-FINAL-2 FEATURE: one continuous background — opaque same-family base,
 * faint assigned still behind the text (masked), content and a separate
 * foreground media frame. Text first in the DOM (narrow stack: text, then
 * media); at ≥900px the media takes its side.
 */
export default function Feature({
  base,
  hue,
  mediaSide,
  textAlign,
  faint,
  faintOpacity = 0.14,
  media,
  className = "",
  children,
}: {
  base: string;
  hue: string;
  mediaSide: "left" | "right";
  textAlign: "left" | "right";
  faint: FeatureImage;
  faintOpacity?: number;
  /** The foreground frame contents (headshot or service photo). */
  media: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  const style = {
    "--v3-bg": base,
    "--v3-fg": "#FFFFFF",
    "--v3-hue": rgb(hue),
    "--v3-btn-label": base,
    "--faint-op": faintOpacity,
  } as CSSProperties;
  return (
    <section className={`v3 v3-sec v3-feature v3-feature-media-${mediaSide} v3-text-${textAlign} ${className}`} style={style}>
      <div className="v3-bg" aria-hidden="true">
        <div className="v3-faint">
          <KenBurns>
            <Deferred>
            <picture>
              <source type="image/avif" srcSet={faint.avif} sizes="100vw" />
              <source type="image/webp" srcSet={faint.webp} sizes="100vw" />
              <img src={faint.fallback} alt="" width={faint.width} height={faint.height} loading="lazy" decoding="async" style={{ objectPosition: faint.focal }} />
            </picture>
            </Deferred>
          </KenBurns>
        </div>
      </div>
      <div className="v3-content">
        <FeatureFit />
        <div className="v3-feature-grid">
          <div className="v3-feature-text">{children}</div>
          <div className="v3-feature-media">
            <div className="v3-media-frame">
              {media}
              <RevealCover />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Foreground framed photo (same assigned source as the faint still). Decorative scenery: empty alt. */
export function FeaturePhoto({ img, alt = "", sizes = "(min-width: 900px) 470px, 100vw" }: { img: FeatureImage; alt?: string; sizes?: string }) {
  return (
    <Deferred ratio={`${img.width} / ${img.height}`}>
    <picture>
      <source type="image/avif" srcSet={img.avif} sizes={sizes} />
      <source type="image/webp" srcSet={img.webp} sizes={sizes} />
      <img src={img.fallback} alt={alt} width={img.width} height={img.height} loading="lazy" decoding="async" />
    </picture>
    </Deferred>
  );
}
