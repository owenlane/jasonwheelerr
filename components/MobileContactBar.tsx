import Link from "next/link";
import { person } from "@/lib/site";

/**
 * Mobile sticky actions: Call + Contact page.
 * Page content reserves space for this via padding on <main>, so it never
 * obscures content or the footer.
 */
export default function MobileContactBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-accent bg-field/97 backdrop-blur-[2px] xl:hidden">
      <a
        href={person.phoneHref}
        className="flex min-h-14 items-center justify-center border-r border-accent text-[0.75rem] font-semibold uppercase tracking-[0.14em]"
      >
        Call
      </a>
      <Link
        href="/contact"
        className="flex min-h-14 items-center justify-center bg-ink text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-field"
      >
        Contact
      </Link>
    </div>
  );
}
