import type { CSSProperties, ReactNode } from "react";
import { rgb, type Align, type CineFrame } from "@/lib/v3";
import { Deferred, KenBurns } from "./motion";

/**
 * A still photo section (Invest § 2 full-bleed, Reviews sole section):
 * one source, its P(a/b) overlay, PHOTO-FADE edges and a bounded Ken Burns
 * on the decorative image only. No rotation timer.
 */
export default function PhotoStill({
  frame,
  hue,
  align = "C",
  priority = false,
  className = "",
  children,
}: {
  frame: CineFrame;
  hue: string;
  align?: Align;
  priority?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const style = { "--v3-hue": rgb(hue), "--v3-bg": hue, "--v3-fg": "#FFFFFF", "--v3-btn-label": hue } as CSSProperties;
  return (
    <section className={`v3 v3-sec v3-photo v3-still v3-align-${align} ${className}`} style={style}>
      <div className="v3-bg" aria-hidden="true">
        <div className="v3-frames">
          <div className="v3-frame" style={{ opacity: 1, "--o-a": frame.a, "--o-b": frame.b } as CSSProperties}>
            <KenBurns>
              <MaybeDeferred defer={!priority}>
              <picture>
                <source type="image/avif" srcSet={frame.avif} sizes="100vw" />
                <source type="image/webp" srcSet={frame.webp} sizes="100vw" />
                  <img src={frame.fallback} alt="" width={1920} height={1080} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} decoding="async" style={{ objectPosition: frame.focal }} />
              </picture>
              </MaybeDeferred>
            </KenBurns>
            <div className="v3-overlay" />
          </div>
        </div>
        <div className="v3-edge" />
      </div>
      <div className="v3-content">{children}</div>
    </section>
  );
}

/** The § 1 still (LCP) loads immediately; a below-fold still waits for page load. */
function MaybeDeferred({ defer, children }: { defer: boolean; children: ReactNode }) {
  return defer ? <Deferred>{children}</Deferred> : <>{children}</>;
}
