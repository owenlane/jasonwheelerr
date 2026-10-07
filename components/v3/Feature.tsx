import type { CSSProperties, ReactNode } from "react";
import { rgb, type FeatureImage } from "@/lib/v3";
import { Deferred, KenBurns, RevealCover } from "./motion";

/**
 * JWV3-FINAL-3 SPLIT-BG: one landscape per section as the actual background.
 * ≥900px: solid half behind the text, photo plane on the other half with one
 * stationary nine-stop mask across the centred seam (C ± min(6% W, 86.4px)).
 * <900px: text first, then the same photo as an edge-to-edge 16:9 band with an
 * internal top seam. Opacity .84, no scrim. Only Home keeps a foreground frame
 * (the approved headshot); service sections have no framed photo.
 */
export default function Feature({
  base,
  hue,
  photoSide,
  textAlign,
  photo,
  media,
  className = "",
  children,
}: {
  base: string;
  hue: string;
  photoSide: "left" | "right";
  textAlign: "left" | "right";
  photo: FeatureImage;
  /** Home only: the foreground portrait frame contents. */
  media?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  const style = {
    "--v3-bg": base,
    "--v3-fg": "#FFFFFF",
    "--v3-hue": rgb(hue),
    "--v3-btn-label": base,
  } as CSSProperties;
  return (
    <section className={`v3 v3-sec v3-feature v3-split v3-photo-${photoSide} v3-text-${textAlign} ${className}`} style={style}>
      <div className="v3-bg" aria-hidden="true" />
      <div className="v3-content">
        <div className="v3-feature-grid">
          <div className="v3-feature-text">{children}</div>
          <div className="v3-feature-media">
            <div className="v3-split-plane" aria-hidden="true">
              <div className="v3-split-photo">
                <KenBurns>
                  <Deferred>
                    <picture>
                      <source type="image/avif" srcSet={photo.avif} sizes="(min-width: 900px) 60vw, 100vw" />
                      <source type="image/webp" srcSet={photo.webp} sizes="(min-width: 900px) 60vw, 100vw" />
                      <img src={photo.fallback} alt="" width={photo.width} height={photo.height} loading="lazy" decoding="async" style={{ objectPosition: photo.focal }} />
                    </picture>
                  </Deferred>
                </KenBurns>
              </div>
            </div>
            {media && (
              <div className="v3-media-frame">
                {media}
                <RevealCover />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
