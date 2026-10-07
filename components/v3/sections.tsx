import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { Align, SolidColors } from "@/lib/v3";
import { MagneticPill, RevealHeading, Rise } from "./motion";

/**
 * V3 building blocks. Every section has one decorative background layer
 * (.v3-bg — base colour, photos, overlays, seams) beneath its content
 * (.v3-content). No panels, cards or veils behind prose.
 */
export function Solid({
  colors,
  align = "C",
  className = "",
  id,
  background,
  children,
}: {
  colors: SolidColors & { hue?: string };
  align?: Align;
  className?: string;
  id?: string;
  /** Optional CSS background (e.g. Home § 3 PINK gradient) replacing the flat base. */
  background?: string;
  children: ReactNode;
}) {
  const style = {
    "--v3-bg": colors.bg,
    "--v3-fg": colors.fg,
    ...(colors.hue ? { "--v3-hue": colors.hue } : {}),
    ...(background ? { "--v3-bg-paint": background } : {}),
  } as CSSProperties;
  return (
    <section id={id} className={`v3 v3-sec v3-solid v3-align-${align} ${className}`} style={style}>
      <div className="v3-bg" aria-hidden="true" />
      <div className="v3-content">
        <div className="v3-wrap">
          <div className="v3-inner">{children}</div>
        </div>
      </div>
    </section>
  );
}

/** Content wrapper inside a photo section. */
export function PhotoInner({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className="v3-wrap">
      <div className={`v3-inner ${className}`}>{children}</div>
    </div>
  );
}

/** Hero h1: whole-headline load translation via CSS (no line mask). */
export function H1({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h1 className={`v3-h1 ${className}`}>{children}</h1>;
}

/** Below-hero section heading with the split-line reveal. */
export function H2({ children, id, className = "" }: { children: string; id?: string; className?: string }) {
  return <RevealHeading as="h2" text={children} id={id} className={`v3-h2 ${className}`} />;
}

export function H3({ children, id, className = "" }: { children: string; id?: string; className?: string }) {
  return <RevealHeading as="h3" text={children} id={id} className={`v3-h3 ${className}`} />;
}

export function Body({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`v3-body ${className}`}>{children}</p>;
}

/** Body/actions group that rises once on entry (kept separate from the heading's own reveal). */
export function Group({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <Rise className={className}>{children}</Rise>;
}

/** Primary action: stable outer hit/focus target, magnetic inner visual layer. */
export function Btn({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  const pill = <MagneticPill>{children}</MagneticPill>;
  if (/^https?:/.test(href)) {
    return (
      <a href={href} className={`v3-btn-wrap ${className}`} target="_blank" rel="noopener noreferrer">
        {pill}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={`v3-btn-wrap ${className}`}>
      {pill}
    </Link>
  );
}

export function Actions({ children }: { children: ReactNode }) {
  return <div className="v3-actions">{children}</div>;
}
