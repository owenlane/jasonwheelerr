import type { Metadata } from "next";
import { Display, Section, Shell } from "@/components/primitives";
import InquiryForm from "@/components/InquiryForm";
import { brokerage, inquiryIntents, person, type InquiryIntent } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Jason Wheeler about buying, selling or investing in Las Vegas, or about a property here that needs someone on the ground.",
  alternates: { canonical: "/contact" },
};

const VALID = new Set<string>(inquiryIntents.map((i) => i.id));

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ intent?: string }>;
}) {
  const params = await searchParams;
  const intent: InquiryIntent =
    params.intent && VALID.has(params.intent) ? (params.intent as InquiryIntent) : "general";

  return (
    <>
      <section className="bg-field">
        <Shell>
          <div className="max-w-4xl py-14 sm:py-20">
            <p className="microlabel">{brokerage.name} · {person.market}</p>
            <Display level={1} className="mt-7">
              CONTACT JASON
            </Display>
            <p className="measure mt-7 text-[1.0625rem] leading-[1.7] quiet">
              A house you want to buy, one you need to sell, a deal you are weighing, or a property
              sitting here that somebody has to go and look at.
            </p>
          </div>
        </Shell>
      </section>

      <Section label="Send a message">
        <div className="grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)]">
          <div>
            <InquiryForm initialIntent={intent} />
          </div>

          <div className="lg:pt-2">
            <p className="microlabel">Or reach him directly</p>
            <ul className="mt-6 space-y-5">
              <li>
                <a href={person.phoneHref} className="font-display text-base transition-colors hover:text-support">
                  {person.phone}
                </a>
                <span className="mt-1 block text-[0.8125rem] quieter">Call</span>
              </li>
              <li>
                <a href={person.smsHref} className="font-display text-base transition-colors hover:text-support">
                  {person.phone}
                </a>
                <span className="mt-1 block text-[0.8125rem] quieter">Text</span>
              </li>
              <li>
                <a href={`mailto:${person.email}`} className="text-[0.9375rem] font-medium link-line">
                  {person.email}
                </a>
                <span className="mt-1 block text-[0.8125rem] quieter">Email</span>
              </li>
              <li>
                <a href={person.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-[0.9375rem] font-medium link-line">
                  {person.instagramHandle}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <span className="mt-1 block text-[0.8125rem] quieter">Instagram</span>
              </li>
              <li>
                <a href={person.youtubeUrl} target="_blank" rel="noopener noreferrer" className="text-[0.9375rem] font-medium link-line">
                  {person.youtubeHandle}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                <span className="mt-1 block text-[0.8125rem] quieter">YouTube</span>
              </li>
            </ul>

            <div className="mt-10 border-t border-accent pt-6">
              <p className="microlabel">Brokerage</p>
              <p className="mt-3 text-[0.875rem] leading-relaxed quiet">
                {brokerage.name}
                <br />
                {brokerage.office}
                <br />
                Managing broker: {brokerage.managingBroker}
              </p>
              <p className="mt-4 text-[0.875rem] leading-relaxed quieter">
                Nevada real estate salesperson {person.licenseNumber} · Public ID {person.publicId}
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
