import type { Metadata } from "next";
import CinematicSection from "@/components/v3/CinematicSection";
import { Actions, Body, Btn, ContactTag, H1, H2, H3, PhotoInner, Solid } from "@/components/v3/sections";
import VideoLibrary from "@/components/VideoLibrary";
import PersonalVideoCollection from "@/components/PersonalVideoCollection";
import { person } from "@/lib/site";
import { fetchVideos } from "@/lib/youtube";
import { frames, palette } from "@/lib/v3";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "YouTube Videos",
  description: "Property walkthroughs and personal videos from Jason Wheeler’s YouTube channel.",
  alternates: { canonical: "/videos" },
};

export default async function VideosPage() {
  const videos = await fetchVideos();
  return (
    <>
      <CinematicSection frames={frames.videos} hue={palette.videos.hue} align="C" priority>
        <PhotoInner>
          <div className="v3-text">
            <H1>{"YouTube Videos"}</H1>
            <Body>{"Property walkthroughs and a little life outside real estate."}</Body>
          </div>
        </PhotoInner>
      </CinematicSection>

      <Solid colors={palette.videos.s2} align="C">
        <div className="v3-text">
          <H2>{"Take a look through the houses."}</H2>
          <Body>
            {"Layouts, finishes, and visible condition at the time of filming. Contact me for current property details and availability."}
          </Body>
        </div>
        <div className="text-left">
          <VideoLibrary videos={videos} />
        </div>
        <div className="v3-text mt-20">
          <H3 id="personal-videos">{"Away from the properties."}</H3>
          <Body>{"Personal videos on fishing, grappling, everyday projects, and other interests."}</Body>
        </div>
        <div className="mt-10 text-left">
          <PersonalVideoCollection initialCount={10} headingId="personal-videos" />
        </div>
        <Actions>
          <Btn href={person.youtubeUrl}>{"Open the channel"}</Btn>
        </Actions>
      </Solid>

      <Solid colors={palette.videos.s3} align="C">
        <div className="v3-text">
          <ContactTag />
          <H2>{"Have a question about a property?"}</H2>
          <Body>{"Send me the video or the address, and tell me what you would like to know."}</Body>
          <Actions>
            <Btn href="/contact">{"Get in touch with me"}</Btn>
          </Actions>
        </div>
      </Solid>
    </>
  );
}
