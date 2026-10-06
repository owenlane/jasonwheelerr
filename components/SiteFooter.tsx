import Link from "next/link";
import { Shell } from "./primitives";
import { brokerage, nav, person } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <Shell>
        <div className="grid gap-12 py-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)] lg:py-20">
          <div>
            <p className="font-display text-[0.9375rem] tracking-[0.06em]">JASON WHEELER</p>
            <p className="microlabel mt-3 text-accent">{brokerage.name}</p>
            <p className="measure-tight mt-6 text-[0.9375rem] leading-relaxed text-field/70">
              Buying, selling, investing and renovation coordination in Las Vegas and Southern Nevada.
              Local help for clients here and out of state.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={person.phoneHref}
                className="inline-flex min-h-11 items-center bg-field px-6 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink"
              >
                Call {person.phone}
              </a>
              <a
                href={person.smsHref}
                className="inline-flex min-h-11 items-center border border-field/40 px-6 text-[0.6875rem] font-semibold uppercase tracking-[0.14em]"
              >
                Text
              </a>
            </div>
          </div>

          <nav aria-label="Footer">
            <p className="microlabel text-accent">Pages</p>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[0.9375rem] text-field/80 transition-colors hover:text-field">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/privacy" className="text-[0.9375rem] text-field/80 transition-colors hover:text-field">
                  Privacy
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className="microlabel text-accent">Reach Jason</p>
            <ul className="mt-5 space-y-3 text-[0.9375rem]">
              <li>
                <a href={person.phoneHref} className="link-line text-field/85">{person.phone}</a>
              </li>
              <li>
                <a href={`mailto:${person.email}`} className="link-line text-field/85">{person.email}</a>
              </li>
              <li>
                <a href={person.instagramUrl} target="_blank" rel="noopener noreferrer" className="link-line text-field/85">
                  Instagram {person.instagramHandle}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a href={person.youtubeUrl} target="_blank" rel="noopener noreferrer" className="link-line text-field/85">
                  YouTube {person.youtubeHandle}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Licensing, brokerage, EHO and disclaimer — quiet but fully legible. */}
        <div className="border-t border-white/15 py-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="microlabel text-accent">Licence</p>
              <p className="mt-2 text-[0.8125rem] text-field/70">
                Nevada real estate salesperson {person.licenseNumber} · Public ID {person.publicId}
              </p>
            </div>
            <div>
              <p className="microlabel text-accent">Brokerage</p>
              <p className="mt-2 text-[0.8125rem] text-field/70">{brokerage.name}</p>
            </div>
            <div>
              <p className="microlabel text-accent">Managing broker</p>
              <p className="mt-2 text-[0.8125rem] text-field/70">{brokerage.managingBroker}</p>
            </div>
            <div>
              <p className="microlabel text-accent">Office</p>
              <p className="mt-2 text-[0.8125rem] text-field/70">{brokerage.office}</p>
            </div>
          </div>

          <p className="measure mt-8 text-[0.8125rem] leading-relaxed text-field/60">
            Equal Housing Opportunity. Nothing on this website is legal, tax, accounting,
            property-management or inspection advice, and nothing here is an offer of licensed
            construction services. Information is provided for general reference and is not a
            guarantee of any outcome.
          </p>
          <p className="mt-4 text-[0.8125rem] text-field/60">
            © {new Date().getFullYear()} {person.name}. All rights reserved.
          </p>
        </div>
      </Shell>
    </footer>
  );
}
