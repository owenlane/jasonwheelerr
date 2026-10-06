import Link from "next/link";
import type { ReactNode } from "react";

export function Shell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-[88rem] px-5 sm:px-8 lg:px-14 ${className}`}>{children}</div>
  );
}

/**
 * A section. Deliberately has no index number and no dossier label — the V2
 * system forbids 01 / 02 / 03 section branding.
 */
export function Section({
  label,
  children,
  id,
  tone = "field",
  className = "",
  rule = true,
}: {
  label?: string;
  children: ReactNode;
  id?: string;
  tone?: "field" | "raised" | "media";
  className?: string;
  rule?: boolean;
}) {
  const tones = {
    field: "bg-surface text-on-surface",
    raised: "bg-surface-2 text-on-surface",
    media: "bg-surface text-on-surface",
  };
  return (
    <section id={id} className={`${tones[tone]} ${className}`}>
      <Shell>
        <div
          className={`py-16 sm:py-20 lg:py-24 ${
            rule ? (tone === "media" ? "border-t border-line" : "hairline") : ""
          }`}
        >
          {label && <p className="mb-6 text-center text-[0.9375rem] font-medium quiet">{label}</p>}
          {children}
        </div>
      </Shell>
    </section>
  );
}

export function Display({
  children,
  level = 2,
  className = "",
  id,
}: {
  children: ReactNode;
  level?: 1 | 2 | 3;
  className?: string;
  id?: string;
}) {
  const Tag = (`h${level}` as unknown) as "h2";
  const sizes = {
    1: "text-[2.125rem] leading-[1.06] sm:text-[3rem] lg:text-[3.75rem]",
    2: "text-[1.625rem] leading-[1.14] sm:text-[2.125rem] lg:text-[2.5rem]",
    3: "text-[1.3125rem] leading-[1.2]",
  };
  return (
    <Tag id={id} className={`${sizes[level]} ${className}`}>
      {children}
    </Tag>
  );
}

export function Body({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`measure text-[1.0625rem] leading-[1.7] quiet ${className}`}>{children}</p>;
}

/** Sharp, square geometry. No pills, no rounded SaaS buttons. */
export function Cta({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "onMedia" | "quiet";
  className?: string;
  external?: boolean;
}) {
  // V2: sentence case, no tracked-out uppercase. The pill radius is the one
  // rounded shape in the system; photography stays square-cornered.
  const base = "btn";
  const variants = {
    primary: "btn-primary",
    outline: "btn-secondary",
    onMedia: "btn-secondary",
    quiet: "btn-secondary",
  };
  const cls = `${base} ${variants[variant]} ${className}`;
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/** Information rows. Thin rules and hard alignment, not a card grid. */
export function DataRows({
  rows,
  tone = "field",
}: {
  rows: { term: string; detail: ReactNode }[];
  tone?: "field" | "media";
}) {
  return (
    <dl className="mt-10">
      {rows.map((row) => (
        <div
          key={row.term}
          className={`grid gap-x-8 gap-y-1 border-t py-4 sm:grid-cols-[14rem_minmax(0,1fr)] ${
            tone === "media" ? "border-line" : "border-line"
          }`}
        >
          <dt className="pt-1 text-[0.9375rem] font-medium">{row.term}</dt>
          <dd className={`measure text-[0.9375rem] leading-relaxed ${tone === "media" ? "quiet" : "quiet"}`}>
            {row.detail}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Ordered process. Thin-rule columns, no numbered section branding. */
export function Steps({ steps, tone = "field" }: { steps: { name: string; detail: string }[]; tone?: "field" | "media" }) {
  return (
    <ol className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s) => (
        <li key={s.name} className={`border-t pt-4 ${tone === "media" ? "border-line" : "border-ink"}`}>
          <h3 className="font-display text-[1.0625rem] font-semibold">{s.name}</h3>
          <p className={`mt-3 text-[0.9375rem] leading-relaxed ${tone === "media" ? "quiet" : "quiet"}`}>
            {s.detail}
          </p>
        </li>
      ))}
    </ol>
  );
}

export function ScopeNote({ items, label }: { items: readonly string[]; label: string }) {
  return (
    <aside className="mt-12 border-l border-support pl-6">
      <p className="text-[0.9375rem] font-medium">{label}</p>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="measure text-[0.875rem] leading-relaxed quieter">
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}

/** Rating mark. Square ticks, not bubbly stars — keeps the architectural system. */
export function Stars({ rating, tone = "field" }: { rating: number; tone?: "field" | "media" }) {
  const on = tone === "media" ? "text-field" : "text-support";
  const off = tone === "media" ? "text-field/25" : "text-accent/50";
  return (
    <span className="inline-flex items-center gap-1" role="img" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} viewBox="0 0 20 20" aria-hidden="true" className={`h-3.5 w-3.5 fill-current ${i <= Math.round(rating) ? on : off}`}>
          <path d="M10 1.6l2.35 5.14 5.65.55-4.25 3.76 1.25 5.55L10 15.9l-4.95 2.96 1.25-5.55L2.05 7.55l5.6-.55z" />
        </svg>
      ))}
    </span>
  );
}

/**
 * A strong client quote lifted into the page flow. Placed selectively, the way
 * the reference site spreads its best reviews — never as a repeating card grid.
 */
export function PullQuote({
  quote,
  author,
  tone = "field",
}: {
  quote: ReactNode;
  author: string;
  tone?: "field" | "media";
}) {
  const onMedia = tone === "media";
  return (
    <figure className={`border-l-2 pl-6 sm:pl-8 ${onMedia ? "border-current" : "border-support"}`}>
      <Stars rating={5} tone={tone} />
      <blockquote
        className={`pull-quote mt-4 text-[1.25rem] sm:text-[1.5rem] ${onMedia ? "text-field" : "text-ink"}`}
      >
        “{quote}”
      </blockquote>
      <figcaption className="mt-5 text-[0.875rem] quiet">{author}</figcaption>
    </figure>
  );
}

/** End-of-page contact block. Required on core service pages. */
export function ClosingContact({
  heading,
  intent,
  children,
}: {
  heading: string;
  intent?: string;
  children?: ReactNode;
}) {
  const href = intent ? `/contact?intent=${intent}` : "/contact";
  return (
    <Section tone="raised" label="Contact">
      <Display level={2} className="mx-auto max-w-4xl text-center">
        {heading}
      </Display>
      {children && <p className="measure mx-auto mt-6 text-center text-[1.0625rem] leading-[1.7] quiet">{children}</p>}
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Cta href={href}>
          Get in touch with me
        </Cta>
      </div>
    </Section>
  );
}
