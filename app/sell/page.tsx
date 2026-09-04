import type { Metadata } from "next";
import { Body, ClosingContact, Cta, DataRows, Display, PullQuote, Section, Shell, Steps } from "@/components/primitives";
import { VideoGrid } from "@/components/VideoPlayer";
import VideoEmpty from "@/components/VideoEmpty";
import { person, reviews } from "@/lib/site";
import { featured, fetchVideos } from "@/lib/youtube";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Sell",
  description:
    "Seller representation across Las Vegas and Southern Nevada, including empty properties and houses that need work before they are ready to list.",
  alternates: { canonical: "/sell" },
};

const steps = [
  { name: "See it", detail: "The property is walked and its condition recorded before anyone talks price." },
  { name: "Scope", detail: "What earns its money back before listing, and what does not." },
  { name: "Prepare", detail: "Cleaning, repairs and updates coordinated on the ground, in order." },
  { name: "List", detail: "Priced against comparable sales and against this property's real condition." },
];

const situations = [
  ["Inherited", "Full of belongings, unclear condition, several people deciding from different cities."],
  ["Long-term rental", "Years of tenants, deferred maintenance, no recent picture of the inside."],
  ["Vacant a while", "Empty houses develop their own problems. They get looked at before listing."],
  ["Stalled project", "Half-finished work that needs scoping honestly before more money goes in."],
  ["Dated but sound", "Nothing wrong, just old. The question is which updates are worth doing."],
  ["Owner elsewhere", "You cannot get here to sort it out."],
];

export default async function SellPage() {
  const videos = await fetchVideos();
  const proof = featured(videos, ["renovated", "for-sale"], 2);

  return (
    <>
      <section className="bg-field">
        <Shell>
          <div className="max-w-4xl py-14 sm:py-20">
            <p className="microlabel">Sellers · {person.market}</p>
            <Display level={1} className="mt-7">
              SELL THE HOUSE YOU HAVE
            </Display>
            <p className="measure mt-7 text-[1.0625rem] leading-[1.7] quiet">
              Empty, dated, half-finished, or still full of someone&rsquo;s things is welcome here. We
              start with a walkthrough, then decide what the house actually needs.
            </p>
            <div className="mt-9">
              <Cta href="/contact?intent=seller">Contact Jason</Cta>
            </div>
          </div>
        </Shell>
      </section>

      <Section label="Representation" tone="raised">
        <Display level={2} className="max-w-3xl">
          THE FIRST STEP IS A WALKTHROUGH
        </Display>
        <Body className="mt-6">
          Before anyone names a number, the property is walked and documented. Then the price has
          something real under it.
        </Body>
        <DataRows
          rows={[
            { term: "Walkthrough first", detail: "Seen and documented before anything is priced or promised." },
            { term: "Preparation", detail: "A specific list of what to do and what to skip, with the reasoning." },
            { term: "Coordination", detail: "Cleaners, handymen and trades scheduled and met on site." },
            { term: "Pricing", detail: "Comparable sales, current competition, and this property's condition." },
            { term: "Marketing", detail: "Photography and film that represent the property truthfully." },
            { term: "Negotiation", detail: "Offers and repair requests worked from a documented record." },
          ]}
        />
      </Section>

      <Section label="Not ready yet" id="not-ready">
        <Display level={2} className="max-w-3xl">
          &ldquo;IT NEEDS WORK BEFORE ANYONE SHOULD SEE IT&rdquo;
        </Display>
        <Body className="mt-6">
          Rarely as bad as the owner fears. Sometimes the honest answer is to list as it stands,
          because the work costs more than it returns. Sometimes a week of cleaning and three repairs
          changes the outcome.
        </Body>
        <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {situations.map(([t, d]) => (
            <div key={t} className="border-t border-ink pt-4">
              <h3 className="font-display text-[0.8125rem] uppercase tracking-[0.1em]">{t}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed quiet">{d}</p>
            </div>
          ))}
        </div>
        <Steps steps={steps} />
      </Section>

      <Section label="From a seller" tone="raised">
        <PullQuote quote={reviews[1].pull} author={reviews[1].author} />
        <div className="mt-8">
          <Cta href="/reviews" variant="outline">
            Read the reviews
          </Cta>
        </div>
      </Section>

      <Section label="Walkthrough film" tone="media">
        <Display level={2} className="max-w-3xl">
          FINISHED WORK ON FILM
        </Display>
        {proof.length > 0 ? <VideoGrid videos={proof} /> : <VideoEmpty tone="media" />}
        <div className="mt-10">
          <Cta href="/videos" variant="onMedia">YouTube Videos</Cta>
        </div>
      </Section>

      <ClosingContact heading="DESCRIBE THE PROPERTY" intent="seller">
        Where it is and you’d like to sell.
      </ClosingContact>
    </>
  );
}
