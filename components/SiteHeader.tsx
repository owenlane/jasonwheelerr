"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, person } from "@/lib/site";
import ThemeToggle from "./ThemeToggle";

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

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/95 backdrop-blur-[2px]">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>

      <div className="mx-auto flex h-16 w-full max-w-[88rem] items-center justify-between gap-6 px-5 sm:px-8 lg:px-14">
        <Link href="/" className="font-display text-base font-bold tracking-[-0.01em] whitespace-nowrap">
          Jason Wheeler
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-4 xl:flex">
          {nav.slice(0, -1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active(item.href) ? "page" : undefined}
              className={`text-[0.8125rem] font-medium transition-colors ${
                active(item.href) ? "text-ink" : "quieter hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Persistent desktop contact affordance. Always available, never gated. */}
        <div className="hidden items-center gap-3 xl:flex">
          <ThemeToggle />
          <Link
            href="/contact"
            className="inline-flex h-10 items-center bg-ink px-5 text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-field transition-colors hover:bg-support"
          >
            Get in touch with me
          </Link>
        </div>

        <div className="flex items-center gap-3 xl:hidden">
          <ThemeToggle />
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center border border-line"
          >
            <span aria-hidden="true" className="flex h-3 w-4 flex-col justify-between">
              <span className={`block h-px w-full bg-ink transition-transform ${open ? "translate-y-[5.5px] rotate-45" : ""}`} />
              <span className={`block h-px w-full bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`block h-px w-full bg-ink transition-transform ${open ? "-translate-y-[5.5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="fixed inset-x-0 top-16 z-50 h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-line bg-paper xl:hidden [-webkit-overflow-scrolling:touch]">
          <nav aria-label="Primary mobile" className="mx-auto w-full max-w-[88rem] px-5 pb-[max(8rem,calc(env(safe-area-inset-bottom)+6rem))] sm:px-8">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active(item.href) ? "page" : undefined}
                className="flex min-h-14 items-center border-b border-line font-display text-base"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-8 flex flex-col gap-3">
              <a href={person.phoneHref} className="flex min-h-12 items-center justify-center btn btn-secondary">
                Call {person.phone}
              </a>
              <a href={`mailto:${person.email}`} className="flex min-h-12 items-center justify-center btn btn-secondary">
                {person.email}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
