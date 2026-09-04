import type { Metadata } from "next";
import { Body, ClosingContact, Cta, Display, Section, Shell } from "@/components/primitives";
import VideoLibrary from "@/components/VideoLibrary";
import { CinematicVideo } from "@/components/VideoPlayer";
import { person } from "@/lib/site";
import { fetchVideos, lifestyleVideos } from "@/lib/youtube";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "YouTube Videos",
  description:
    "Walkthrough film from Jason Wheeler's Las Vegas property channel — listings, renovations, rentals and vacant properties, filmed on site.",
  alternates: { canonical: "/videos" },
};

export default async function VideosPage() {
  const videos = await fetchVideos();
  const lifestyle = lifestyleVideos(videos);

  return (
    <>
      <section className="bg-field">
        <Shell>
          <div className="max-w-4xl py-14 sm:py-20">
            <p className="microlabel">YouTube · {person.youtubeHandle}</p>
            <Display level={1} className="mt-7">
              PROPERTIES, FILMED AS THEY WERE
            </Display>
            <p className="measure mt-7 text-[1.0625rem] leading-[1.7] quiet">
              Houses walked and filmed in one piece, without the edit that removes the inconvenient
              rooms. Everything here plays on request and links to the original video.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Cta href={person.youtubeUrl} external>Subscribe on YouTube</Cta>
              <Cta href="/contact" variant="quiet">Contact Jason</Cta>
            </div>
          </div>
        </Shell>
      </section>

      <Section label="Property film">
        <Display level={2} className="max-w-3xl">
          THE LIBRARY
        </Display>
        <Body className="mt-6">
          Grouped by what each one shows — a listing, a finished remodel, an empty unit on possession
          day.
        </Body>
        <VideoLibrary videos={videos} />
      </Section>

      {/* Lifestyle archive. Deliberately its own dark section, far from every
          property module — it never shares a row, grid or cluster with them. */}
      {lifestyle.length > 0 && (
        <Section label="Off the clock" tone="media">
          <Display level={2} className="max-w-3xl">
            NOT PROPERTY
          </Display>
          <p className="measure mt-6 text-[1.0625rem] leading-[1.7] text-field/70">
            The rest of the channel. Nothing to do with real estate.
          </p>
          <div className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
            {lifestyle.slice(0, 6).map((v) => (
              <CinematicVideo key={v.id} video={v} />
            ))}
          </div>
        </Section>
      )}

      <ClosingContact heading="SEEN SOMETHING YOU WANT TO WALK?">
        Ask about any property on the channel, or about one you already own.
      </ClosingContact>
    </>
  );
}
