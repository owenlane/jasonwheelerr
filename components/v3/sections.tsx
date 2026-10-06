import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { Align, SolidColors } from "@/lib/v3";

/**
 * V3 building blocks. Full-width approved colour sections only: no panels,
 * cards or veils behind prose. Copy is supplied by the pages verbatim.
 */
export function Solid({
  colors,
  align = "C",
  className = "",
  id,
  children,
}: {
  colors: SolidColors;
  align?: Align;
  className?: string;
  id?: string;
  children: ReactNode;
}) {
  const style = { "--v3-bg": colors.bg, "--v3-fg": colors.fg } as CSSProperties;
  return (
    <section id={id} className={`v3 v3-solid v3-align-${align} ${className}`} style={style}>
      <div className="v3-wrap">
        <div className="v3-inner">{children}</div>
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

export function H1({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <h1 className={`v3-h1 ${className}`}>{children}</h1>;
}

export function H2({ children, id, className = "" }: { children: ReactNode; id?: string; className?: string }) {
  return (
    <h2 id={id} className={`v3-h2 ${className}`}>
      {children}
    </h2>
  );
}

export function H3({ children, id, className = "" }: { children: ReactNode; id?: string; className?: string }) {
  return (
    <h3 id={id} className={`v3-h3 ${className}`}>
      {children}
    </h3>
  );
}

export function Body({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`v3-body ${className}`}>{children}</p>;
}

/** The single permitted eyebrow, on each page's final Contact section only. */
export function ContactTag() {
  return <p className="v3-tag">Contact</p>;
}

export function Btn({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  if (/^https?:/.test(href)) {
    return (
      <a href={href} className={`v3-btn ${className}`} target="_blank" rel="noopener noreferrer">
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={`v3-btn ${className}`}>
      {children}
    </Link>
  );
}

export function Actions({ children }: { children: ReactNode }) {
  return <div className="v3-actions">{children}</div>;
}
