import Link from "next/link";
import { Display, Shell } from "@/components/primitives";
import { nav } from "@/lib/site";

export default function NotFound() {
  return (
    <Shell>
      <div className="page-intro">
        <Display level={1}>That page isn&rsquo;t here</Display>
        <p className="measure mt-6 text-[1.0625rem] leading-[1.7] quiet">
          Choose a section below to keep looking, or get in touch with Jason.
        </p>
        <ul className="mt-10 grid gap-x-10 sm:grid-cols-2">
          {nav.map((item) => (
            <li key={item.href} className="border-t border-line">
              <Link
                href={item.href}
                className="block py-4 font-display text-[1.0625rem] font-semibold hover:opacity-80"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Shell>
  );
}
