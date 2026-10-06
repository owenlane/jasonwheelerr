"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { nav, person } from "@/lib/site";

/** JWV3-FINAL-2 GLASS: route photo-overlay hue for the bar tint (PHOTO-FADE hues). */
const ROUTE_HUE: Record<string, string> = {
  "/": "11 24 48",
  "/buy": "16 43 64",
  "/sell": "20 30 45",
  "/invest": "21 42 50",
  "/renovations": "48 27 21",
  "/videos": "11 27 46",
  "/about": "15 28 49",
  "/reviews": "48 27 21",
  "/contact": "16 36 56",
};

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const active = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const hue = { "--nav-hue": ROUTE_HUE[pathname] ?? ROUTE_HUE["/"] } as CSSProperties;

  return (
    <>
      {/* Fixed glass bar over the hero. No filter/clip on this ancestor; the glass lives on .nav-glass. */}
      <header className="site-header" style={hue}>
        <a href="#main" className="nav-skip">
          Skip to content
        </a>

        <div className="nav-bar">
          <span className="nav-glass" aria-hidden="true" />
          <div className="nav-inner">
            <Link href="/" className="font-display text-base font-bold tracking-[-0.01em] whitespace-nowrap">
              Jason Wheeler
            </Link>

            <nav aria-label="Primary" className="hidden items-center gap-4 xl:flex">
              {nav.slice(0, -1).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active(item.href) ? "page" : undefined}
                  className="nav-link text-[0.8125rem] font-medium"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Persistent desktop contact affordance. Always available, never gated. */}
            <div className="hidden items-center gap-3 xl:flex">
              <Link
                href="/contact"
                className="nav-cta inline-flex h-11 items-center px-5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em]"
              >
                Get in touch with me
              </Link>
            </div>

            <div className="flex items-center gap-3 xl:hidden">
              <button
                ref={toggleRef}
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-nav"
                aria-label={open ? "Close menu" : "Open menu"}
                className="nav-menu-button flex h-11 w-11 items-center justify-center"
              >
                <span aria-hidden="true" className="flex h-3 w-4 flex-col justify-between">
                  <span className={`block h-px w-full bg-white transition-transform ${open ? "translate-y-[5.5px] rotate-45" : ""}`} />
                  <span className={`block h-px w-full bg-white transition-opacity ${open ? "opacity-0" : ""}`} />
                  <span className={`block h-px w-full bg-white transition-transform ${open ? "-translate-y-[5.5px] -rotate-45" : ""}`} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {open && (
        <div id="mobile-nav" className="nav-menu xl:hidden" style={hue}>
          <nav aria-label="Primary mobile" className="mx-auto w-full max-w-[88rem] px-5 pb-[max(2rem,env(safe-area-inset-bottom))] sm:px-8">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active(item.href) ? "page" : undefined}
                className="nav-menu-link flex min-h-14 items-center font-display text-base"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-8 flex flex-col gap-3">
              <a href={person.phoneHref} className="nav-menu-action flex min-h-12 items-center justify-center">
                Call {person.phone}
              </a>
              <a href={`mailto:${person.email}`} className="nav-menu-action flex min-h-12 items-center justify-center">
                {person.email}
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
