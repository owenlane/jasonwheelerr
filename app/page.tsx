import Link from "next/link";
import type { Metadata } from "next";
import { Body, ClosingContact, Cta, DataRows, Display, PullQuote, Section, Shell, Steps } from "@/components/primitives";
import { VideoGrid, HeroVideo } from "@/components/VideoPlayer";
import VideoEmpty from "@/components/VideoEmpty";
import { brokerage, person, reviews } from "@/lib/site";
import { featured, fetchVideos, propertyVideos } from "@/lib/youtube";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `${person.name} — Las Vegas Real Estate | ${person.brokerage}`,
  description:
    "Las Vegas real estate for buyers, sellers and investors, with walkthrough film of the actual properties. Blue Diamond Realty, Las Vegas and Southern Nevada.",
  alternates: { canonical: "/" },
};

/** Cinematic title cards. Buy carries the strongest emphasis, Sell the second. */
const routes = [
  {
    href: "/buy",
    label: "Buy",
    kicker: "For buyers",
    detail: "Find a home here with a real walkthrough first — not just the listing photos.",
    weight: "lead",
  },
  {
    href: "/sell",
    label: "Sell",
    kicker: "For sellers",
    detail: "List it — even if it needs work first.",
    weight: "second",
  },
  {
    href: "/invest",
    label: "Invest",
    kicker: "For investors",
    detail: "Rentals, fixers and distressed property.",
    weight: "rest",
  },
  {
    href: "/property-help",
    label: "Property Help",
    kicker: "For owners away",
    detail: "Eyes on your Las Vegas property while you are somewhere else.",
    weight: "rest",
  },
] as const;

const process = [
  { name: "Keys", detail: "Access arranged — a key, a code, a lockbox, or meeting whoever holds them." },
  { name: "Walk", detail: "The whole property, in person, inside and out." },
  { name: "Film", detail: "Photographs and video of what is visibly there, room by room." },
  { name: "Decide", detail: "Buy, sell, rent or hold, with the condition already on record." },
];

function TitleCard({
  href,
  label,
  kicker,
  detail,
  weight,
}: {
  href: string;
  label: string;
  kicker: string;
  detail: string;
  weight: "lead" | "second" | "rest";
}) {
  const lead = weight === "lead";
  const second = weight === "second";
  return (
    <Link
      href={href}
      className={`title-card group flex flex-col justify-end p-6 sm:p-8 ${
        lead ? "min-h-[15rem] sm:min-h-[17rem] lg:col-span-2" : second ? "min-h-[14rem]" : "min-h-[12rem]"
      }`}
    >
      <p className="microlabel text-accent">{kicker}</p>
      <span
        className={`card-rule mt-4 block h-px w-8 bg-accent/70 ${lead ? "" : ""}`}
        aria-hidden="true"
      />
      <h2
        className={`mt-4 font-display text-field ${
          lead ? "text-[2.25rem] sm:text-[3.25rem]" : second ? "text-[1.75rem] sm:text-[2.25rem]" : "text-[1.375rem] sm:text-[1.625rem]"
        }`}
      >
        {label}
      </h2>
      <p
        className={`mt-3 text-[0.9375rem] leading-relaxed text-field/70 ${lead ? "max-w-md" : "max-w-xs"}`}
      >
        {detail}
      </p>
      <span className="mt-5 inline-flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-field/80">
        Open
        <span className="card-arrow inline-block opacity-60" aria-hidden="true">→</span>
      </span>
    </Link>
  );
}

export default async function HomePage() {
  const videos = await fetchVideos();
  const proof = featured(videos, ["for-sale", "renovated"], 3);
  const hero = propertyVideos(videos)[0];
  const spread = reviews[0];

  return (
    <>
      {/* FIRST VIEWPORT — Contact Jason dominant. Playback is user-initiated. */}
      <section className="bg-field">
        <Shell>
          <div className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)] lg:gap-16 lg:py-20">
            <div className="rise">
              <p className="microlabel">
                {brokerage.name} · Las Vegas &amp; Southern Nevada · Licence {person.licenseNumber}
              </p>
              <Display level={1} className="mt-7">
                SEE THE HOUSE BEFORE YOU DECIDE
              </Display>
              <p className="measure mt-7 text-[1.0625rem] leading-[1.7] quiet">
                Buying, selling and investing across the valley — with the property walked and filmed
                before anyone has to make a decision about it.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Cta href="/contact" className="min-w-[13rem]">
                  Contact Jason
                </Cta>
                <Link href="/videos" className="link-line text-[0.9375rem] font-medium">
                  Watch walkthrough videos here!
                </Link>
              </div>

              <p className="mt-6 text-[0.9375rem] quieter">
                Or call{" "}
                <a href={person.phoneHref} className="link-line text-ink font-medium">
                  {person.phone}
                </a>{" "}
                · {" "}
                <a href={`mailto:${person.email}`} className="link-line text-ink">
                  {person.email}
                </a>
              </p>
            </div>

            {/* Same walkthrough video, now playable in place — not resized. */}
            <div className="rise rise-2 relative aspect-[4/3] w-full overflow-hidden bg-media lg:aspect-[5/4]">
              {hero ? (
                <HeroVideo video={hero} label="From the walkthrough archive" />
              ) : (
                <span className="absolute inset-0 flex items-end p-6">
                  <span className="microlabel text-accent">Walkthrough archive on YouTube</span>
                </span>
              )}
            </div>
          </div>
        </Shell>
      </section>

      {/* SERVICE ROUTING — cinematic title cards. Organises, never outranks Contact. */}
      <Section label="Where to begin">
        <div className="grid gap-5 sm:gap-6 lg:grid-cols-2">
          {routes.map((r) => (
            <TitleCard key={r.href} {...r} />
          ))}
        </div>
      </Section>

      {/* PROPERTY PROOF — 2–3 cinematic walkthrough videos, below the hero. */}
      <Section label="Walkthrough film" tone="media">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Display level={2} className="max-w-2xl">
            THE PROPERTIES, AS THEY ACTUALLY WERE
          </Display>
          <Cta href="/videos" variant="onMedia">
            YouTube Videos
          </Cta>
        </div>
        <p className="measure mt-6 text-[1.0625rem] leading-[1.7] text-field/70">
          A full walkthrough of each property.
        </p>
        {proof.length > 0 ? <VideoGrid videos={proof} /> : <VideoEmpty tone="media" />}
      </Section>

      {/* CLIENT PROOF — one strong review spread onto the homepage. */}
      <Section label="What clients say" tone="raised">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)] lg:items-center lg:gap-16">
          <PullQuote quote={spread.pull} author={spread.author} />
          <div>
            <p className="measure text-[0.9375rem] leading-relaxed quiet">
              Two decades and more of Las Vegas sales, and clients who kept the receipts.
            </p>
            <div className="mt-6">
              <Cta href="/reviews" variant="outline">
                Read the reviews
              </Cta>
            </div>
          </div>
        </div>
      </Section>

      {/* HOW IT WORKS */}
      <Section label="How it works">
        <Display level={2} className="max-w-3xl">
          FROM A SET OF KEYS TO A DECISION
        </Display>
        <Body className="mt-6">
          Not every property needs every step. This is the shape of it when the work runs end to end.
        </Body>
        <Steps steps={process} />
      </Section>

      {/* PROPERTY HELP */}
      <Section label="Property help" tone="raised">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <div>
            <Display level={2}>WHEN THE PROPERTY IS HERE AND YOU ARE NOT</Display>
            <Body className="mt-6">
              Tenants have gone, an offer has arrived, or something needs attention — and every answer
              so far has come second-hand. Jason goes to the property, walks it, films it, says what is
              there, and lines up the people needed to deal with it.
            </Body>
            <div className="mt-9 flex flex-wrap gap-3">
              <Cta href="/property-help" variant="outline">
                How it works
              </Cta>
              <Cta href="/contact?intent=property-help" variant="quiet">
                Ask about a property
              </Cta>
            </div>
          </div>
          <DataRows
            rows={[
              { term: "Who it suits", detail: "Owners, landlords and investors with property in Las Vegas" },
              { term: "Most common", detail: "Someone who lives out of state" },
              { term: "What you get", detail: "A walkthrough, photographs, video and a straight account of the condition" },
              { term: "Then", detail: "Vendors coordinated, the property prepared, or listed" },
            ]}
          />
        </div>
      </Section>

      <ClosingContact heading="TELL JASON WHAT YOU ARE DEALING WITH">
        A house you want to buy, one you need to sell, a deal you are weighing, or a property sitting
        empty that somebody has to go and look at.
      </ClosingContact>
    </>
  );
}
