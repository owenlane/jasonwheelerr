import type { Metadata } from "next";
import { Body, ClosingContact, Cta, DataRows, Display, Section, Shell, Steps } from "@/components/primitives";
import { VideoGrid } from "@/components/VideoPlayer";
import VideoEmpty from "@/components/VideoEmpty";
import { person } from "@/lib/site";
import { featured, fetchVideos } from "@/lib/youtube";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Buy",
  description:
    "Buyer representation across Las Vegas and Southern Nevada, including buyers who are out of state and need the property walked and filmed before they commit.",
  alternates: { canonical: "/buy" },
};

const steps = [
  { name: "Brief", detail: "The house, the area, the budget and the constraints not yet mentioned." },
  { name: "Shortlist", detail: "Properties that fit, filtered against what the photographs are not showing." },
  { name: "Walk it", detail: "On site in person. Filmed room by room if you cannot be there." },
  { name: "Offer", detail: "Written with what was found on the walkthrough behind it." },
];

export default async function BuyPage() {
  const videos = await fetchVideos();
  const proof = featured(videos, ["for-sale"], 2);

  return (
    <>
      <section className="bg-field">
        <Shell>
          <div className="max-w-4xl py-14 sm:py-20">
            <p className="microlabel">Buyers · {person.market}</p>
            <Display level={1} className="mt-7">
              SEE THE HOUSE BEFORE YOU DECIDE
            </Display>
            <p className="measure mt-7 text-[1.0625rem] leading-[1.7] quiet">
              He goes to the house, looks it over properly, and tells you what he saw before anyone
              writes an offer.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Cta href="/contact?intent=buyer">Contact Jason</Cta>
            </div>
          </div>
        </Shell>
      </section>

      <Section label="Representation" tone="raised">
        <Display level={2} className="max-w-3xl">
          WHAT A BUYER&rsquo;S AGENT SHOULD ACTUALLY DO
        </Display>
        <DataRows
          rows={[
            { term: "Search", detail: "Built around your constraints, not around what is convenient to show." },
            { term: "Showings", detail: "In person, with you — or ahead of you, filmed, if you are not local." },
            { term: "Condition", detail: "Roof, systems, moisture signs, previous work and the yard, recorded as seen." },
            { term: "Offers", detail: "Drafted, submitted and negotiated from what the walkthrough found." },
            { term: "Inspection", detail: "You hire a licensed inspector. Jason meets them and works the outcome." },
            { term: "To close", detail: "Escrow coordination, timelines, final walkthrough and keys." },
          ]}
        />
      </Section>

      <Section label="Out of state">
        <Display level={2} className="max-w-3xl">
          BUYING LAS VEGAS FROM SOMEWHERE ELSE
        </Display>
        <Body className="mt-6">
          Plenty of people buy here without living here. It works when somebody is genuinely standing
          in the house — filming it in one piece, showing what is next door and what the street is
          like, and going back to the water heater when you ask.
        </Body>
        <Steps steps={steps} />
      </Section>

      <Section label="Walkthrough film" tone="media">
        <Display level={2} className="max-w-3xl">
          PROPERTIES ON FILM
        </Display>
        {proof.length > 0 ? <VideoGrid videos={proof} /> : <VideoEmpty tone="media" />}
        <div className="mt-10">
          <Cta href="/videos" variant="onMedia">YouTube Videos</Cta>
        </div>
      </Section>

      <ClosingContact heading="TELL JASON WHAT YOU ARE LOOKING FOR" intent="buyer">
        Area, budget, timeline, and whether you are here or somewhere else.
      </ClosingContact>
    </>
  );
}
