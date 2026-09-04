import type { Metadata } from "next";
import { Body, ClosingContact, Cta, DataRows, Display, Section, Shell, Steps } from "@/components/primitives";
import { VideoGrid } from "@/components/VideoPlayer";
import VideoEmpty from "@/components/VideoEmpty";
import { person } from "@/lib/site";
import { featured, fetchVideos } from "@/lib/youtube";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Property Help",
  description:
    "Walkthroughs, photo and video documentation, vacant-property checks, preparation and vendor coordination for owners, landlords and investors with property in Las Vegas — including those who live out of state.",
  alternates: { canonical: "/property-help" },
};

const steps = [
  { name: "Keys", detail: "Access arranged — a key, a code, a lockbox, or meeting whoever holds them." },
  { name: "Walk", detail: "The whole property in person, inside and out." },
  { name: "Document", detail: "Photographs and film of the visible condition, room by room." },
  { name: "Coordinate", detail: "Vendors contacted, scheduled and met on site." },
];

const situations = [
  ["Tenants have left", "Nobody has been inside since. You need to know the state of it before planning anything."],
  ["The house is empty", "Vacant property here does not stay still. It needs checking on and recording."],
  ["An offer arrived", "Someone wants to buy it and you have not seen it in years."],
  ["It needs updating", "You know it is dated. You cannot judge what is worth doing from far away."],
  ["Something broke", "A vendor needs meeting and a repair needs verifying."],
  ["Preparing to rent", "Rent-ready is a specific standard, and reaching it needs someone on the ground."],
];

export default async function PropertyHelpPage() {
  const videos = await fetchVideos();
  const proof = featured(videos, ["rentals-vacant", "renovated"], 2);

  return (
    <>
      <section className="bg-field-2">
        <Shell>
          <div className="grid gap-10 py-14 sm:py-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
            <div>
              <p className="microlabel">Property help · {person.market}</p>
              <Display level={1} className="mt-7">
                YOUR LAS VEGAS EYES ON THE PROPERTY
              </Display>
              <p className="measure mt-7 text-[1.0625rem] leading-[1.7] quiet">
                The owner is somewhere else. The property is here. Something needs attention, and
                every answer so far has come second-hand from someone with no reason to be thorough.
              </p>
              <p className="measure mt-5 text-[1.0625rem] leading-[1.7] quiet">
                Driving out, getting inside, walking the whole thing, filming it, saying what is
                actually there, and lining up the people needed to deal with it.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Cta href="/contact?intent=property-help">Contact Jason</Cta>
              </div>
            </div>
            <DataRows
              rows={[
                { term: "Who it suits", detail: "Owners, landlords and investors with property in Las Vegas" },
                { term: "Most common", detail: "An owner who lives out of state" },
                { term: "What you get", detail: "A walkthrough, photographs, film and a straight account of the condition" },
                { term: "What follows", detail: "Vendors coordinated, the property prepared, or listed" },
              ]}
            />
          </div>
        </Shell>
      </section>

      {/* Out-of-state owner content, absorbed here from the former separate route. */}
      <Section label="Out-of-state owners" id="out-of-state-owners">
        <Display level={2} className="max-w-3xl">
          A PROPERTY YOU HAVE NOT STOOD IN FOR YEARS
        </Display>
        <Body className="mt-6">
          Every question about it costs you either a flight or a guess. Distance turns small property
          problems into expensive ones, mostly because nobody trustworthy is looking.
        </Body>
        <DataRows
          rows={[
            { term: "A current picture", detail: "Photographs and film of the property as it is today." },
            { term: "Independent eyes", detail: "Someone with no stake in selling you a repair, telling you what is there." },
            { term: "Access handled", detail: "Keys, codes and lockboxes managed here so vendors can get in." },
            { term: "Vendors met", detail: "Trades let in, checked on, and the finished work photographed." },
            { term: "Fewer flights", detail: "Most of what needed a trip stops needing one." },
            { term: "A route to selling", detail: "If the decision becomes sell, Jason can represent you on it." },
          ]}
        />
      </Section>

      <Section label="Common situations" tone="raised">
        <Display level={2} className="max-w-3xl">
          WHAT USUALLY PROMPTS THE CALL
        </Display>
        <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {situations.map(([t, d]) => (
            <div key={t} className="border-t border-ink pt-4">
              <h3 className="font-display text-[0.8125rem] uppercase tracking-[0.1em]">{t}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed quiet">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section label="How it runs">
        <Display level={2} className="max-w-3xl">
          KEYS TO DECISION
        </Display>
        <Steps steps={steps} />
        <Body className="mt-12">
          Preparation is ordered for the outcome you have chosen — rent-ready and sale-ready are
          different standards, and paint before flooring wastes the paint. For work needing licensed
          construction you contract the licensed trade directly; the role here is being the person on
          the ground who makes sure it happens.
        </Body>
      </Section>

      <Section label="Walkthrough film" tone="media">
        <Display level={2} className="max-w-3xl">
          WHAT THE RECORD LOOKS LIKE
        </Display>
        {proof.length > 0 ? <VideoGrid videos={proof} /> : <VideoEmpty tone="media" />}
        <div className="mt-10">
          <Cta href="/videos" variant="onMedia">YouTube Videos</Cta>
        </div>
      </Section>

      <ClosingContact heading="TELL JASON ABOUT THE PROPERTY" intent="property-help">
        Where it is, what is going on, and whether you can get here.
      </ClosingContact>
    </>
  );
}
