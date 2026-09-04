import type { Metadata } from "next";
import { Body, ClosingContact, Cta, DataRows, Display, Section, Shell, Steps } from "@/components/primitives";
import { VideoGrid } from "@/components/VideoPlayer";
import VideoEmpty from "@/components/VideoEmpty";
import { person } from "@/lib/site";
import { featured, fetchVideos } from "@/lib/youtube";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Invest",
  description:
    "Representation for investors buying rentals, fixers and distressed property in Las Vegas and Southern Nevada, with the property walked and filmed on site.",
  alternates: { canonical: "/invest" },
};

const steps = [
  { name: "Criteria", detail: "Strategy, budget, target areas, and how much work you will genuinely take on." },
  { name: "Screening", detail: "Candidates filtered before they cost you time." },
  { name: "On site", detail: "Walked and filmed. Roof, systems, layout, and what was done badly." },
  { name: "Execute", detail: "Offer, inspection, escrow — and coordination of the work afterwards." },
];

export default async function InvestPage() {
  const videos = await fetchVideos();
  const proof = featured(videos, ["renovated", "rentals-vacant"], 2);

  return (
    <>
      <section className="bg-field">
        <Shell>
          <div className="max-w-4xl py-14 sm:py-20">
            <p className="microlabel">Investors · {person.market}</p>
            <Display level={1} className="mt-7">
              SOMEONE HAS BEEN INSIDE IT ALREADY
            </Display>
            <p className="measure mt-7 text-[1.0625rem] leading-[1.7] quiet">
              Investing at a distance means trusting somebody else&rsquo;s description of a building.
              This works the other way round: walked, filmed, and an honest account of the condition —
              including when the numbers do not survive contact with the house.
            </p>
            <div className="mt-9">
              <Cta href="/contact?intent=investor">Contact Jason</Cta>
            </div>
          </div>
        </Shell>
      </section>

      <Section label="Where this helps" tone="raised">
        <Display level={2} className="max-w-3xl">
          THE PROPERTY THIS SUITS
        </Display>
        <DataRows
          rows={[
            { term: "Buy and hold", detail: "Rental candidates, assessed for what they cost to keep tenanted." },
            { term: "Fixers", detail: "Houses that need real work — walked, filmed and scoped before an offer." },
            { term: "Distressed", detail: "Short sales and as-is property, where being on site early matters most." },
            { term: "Post-tenant", detail: "Turnovers where nobody has seen the inside since the tenants left." },
            { term: "From out of state", detail: "Full film so a remote decision is made on evidence." },
            { term: "Already owned", detail: "Ongoing property help on units you hold here." },
          ]}
        />
      </Section>

      <Section label="How it runs">
        <Display level={2} className="max-w-3xl">
          FROM CRITERIA TO KEYS
        </Display>
        <Steps steps={steps} />
        <Body className="mt-12">
          Owning it afterwards from another state is a logistics problem that repeats. Vendors get
          met on site, turnovers get documented, and the property gets back to rentable or sale-ready
          without you flying in for each step.
        </Body>
        <div className="mt-8">
          <Cta href="/property-help" variant="outline">Property Help</Cta>
        </div>
      </Section>

      <Section label="Walkthrough film" tone="media">
        <Display level={2} className="max-w-3xl">
          FIXERS, VACANTS AND FINISHED WORK
        </Display>
        {proof.length > 0 ? <VideoGrid videos={proof} /> : <VideoEmpty tone="media" />}
        <div className="mt-10">
          <Cta href="/videos" variant="onMedia">YouTube Videos</Cta>
        </div>
      </Section>

      <ClosingContact heading="SEND YOUR CRITERIA" intent="investor">
        Strategy, budget, target areas, and how much work you are willing to take on.
      </ClosingContact>
    </>
  );
}
