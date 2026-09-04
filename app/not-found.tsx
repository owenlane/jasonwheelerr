import Link from "next/link";
import { Display, Shell } from "@/components/primitives";
import { nav } from "@/lib/site";

export default function NotFound() {
  return (
    <Shell>
      <div className="max-w-3xl py-24 sm:py-32">
        <p className="microlabel">Not found</p>
        <Display level={1} className="mt-7">
          THAT PAGE IS NOT HERE
        </Display>
        <p className="measure mt-7 text-[1.0625rem] leading-[1.7] quiet">
          The address may have changed, or the link may be wrong.
        </p>
        <ul className="mt-10 grid gap-x-10 sm:grid-cols-2">
          {nav.map((item) => (
            <li key={item.href} className="border-t border-ink">
              <Link href={item.href} className="block py-4 font-display text-[0.8125rem] uppercase tracking-[0.1em] hover:text-support">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Shell>
  );
}
