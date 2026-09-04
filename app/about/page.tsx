import type { Metadata } from "next";
import { Body, ClosingContact, Cta, DataRows, Display, ScopeNote, Section, Shell } from "@/components/primitives";
import { CinematicVideo } from "@/components/VideoPlayer";
import { brokerage, person, scopeBoundaries } from "@/lib/site";
import { fetchVideos, lifestyleVideos } from "@/lib/youtube";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "About Me",
  description:
    "A licensed Nevada real estate salesperson with Blue Diamond Realty, working across Las Vegas and Southern Nevada with buyers, sellers and investors.",
  alternates: { canonical: "/about" },
};

export default async function AboutPage() {
  const videos = await fetchVideos();
  const lifestyle = lifestyleVideos(videos);

  return (
    <>
      <section className="bg-field">
        <Shell>
          <div className="max-w-4xl py-14 sm:py-20">
            <p className="microlabel">{brokerage.name} · {person.market}</p>
            <Display level={1} className="mt-7">
              GO TO THE PROPERTY. LOOK AT IT PROPERLY. SAY WHAT IS THERE.
            </Display>
            <p className="measure mt-7 text-[1.0625rem] leading-[1.7] quiet">
              That is the whole method, and it is less common than it should be.
            </p>
          </div>
        </Shell>
      </section>

      <Section label="The work">
        <Body>
          A great deal of real estate now runs on photographs somebody else selected, descriptions
          somebody else wrote, and second-hand accounts from people with an interest in the outcome.
          This works the other way round — drive out, get inside, walk all of it, and film what is
          there.
        </Body>
        <Body className="mt-5">
          It changes what a client can decide. A buyer in another state sees the house continuously
          instead of in twenty flattering frames. A seller finds out what the property really needs
          before spending money on the wrong work. An owner who has not been inside in years gets a
          current picture rather than a guess.
        </Body>
        <Body className="mt-5">
          It also means being comfortable with property other agents avoid: vacant houses, fixers,
          short sales, notices of default, probate situations, post-tenant turnovers and stalled
          projects. Across the valley that is not an edge case — it is a large part of what changes
          hands.
        </Body>
      </Section>

      <Section label="Professional record" tone="raised">
        <Display level={2} className="max-w-3xl">
          THE DETAILS, CHECKABLE
        </Display>
        <DataRows
          rows={[
            { term: "Brokerage", detail: brokerage.name },
            { term: "Licence", detail: `Nevada real estate salesperson ${person.licenseNumber}` },
            { term: "Market", detail: person.market },
            { term: "Works with", detail: "Buyers, sellers and investors" },
            { term: "Also provides", detail: "Property documentation, preparation and vendor coordination for owners" },
            {
              term: "Film",
              detail: (
                <a href={person.youtubeUrl} target="_blank" rel="noopener noreferrer" className="link-line">
                  {person.youtubeHandle} on YouTube
                </a>
              ),
            },
          ]}
        />
        <ScopeNote label="Professional boundaries" items={scopeBoundaries} />
      </Section>

      {/* Lifestyle content lives here by design, in its own section. */}
      {lifestyle.length > 0 && (
        <Section label="Away from work" tone="media">
          <Display level={2} className="max-w-3xl">
            OFF THE CLOCK
          </Display>
          <p className="measure mt-6 text-[1.0625rem] leading-[1.7] text-field/70">
            What the channel gets up to when it is not inside somebody&rsquo;s house.
          </p>
          <div className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2">
            {lifestyle.slice(0, 2).map((v) => (
              <CinematicVideo key={v.id} video={v} />
            ))}
          </div>
        </Section>
      )}

      <Section label="What to expect">
        <Display level={2} className="max-w-3xl">
          HOW THIS TENDS TO GO
        </Display>
        <DataRows
          rows={[
            { term: "Direct", detail: "If a property is wrong for you, or planned work will not return its cost, you hear that." },
            { term: "Specific", detail: "Observations about an actual property, not general advice about the market." },
            { term: "Documented", detail: "Photographs and film, so you are looking at the same thing." },
            { term: "In its lane", detail: "Questions for an inspector, an attorney or a CPA go to them." },
          ]}
        />
        <div className="mt-10 flex flex-wrap gap-4">
          <Cta href="/videos" variant="outline">YouTube Videos</Cta>
        </div>
      </Section>

      <ClosingContact heading="START A CONVERSATION">
        Buying, selling, investing, or a property here that needs someone to go and look at it.
      </ClosingContact>
    </>
  );
}
