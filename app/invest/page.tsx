import type { Metadata } from "next";
import CinematicSection from "@/components/v3/CinematicSection";
import { Actions, Body, Btn, ContactTag, H1, H2, PhotoInner, Solid } from "@/components/v3/sections";
import { CinematicVideo } from "@/components/VideoPlayer";
import VideoEmpty from "@/components/VideoEmpty";
import { person } from "@/lib/site";
import { featured, fetchVideos } from "@/lib/youtube";
import { frames, palette } from "@/lib/v3";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Invest",
  description:
    "Help finding investment property in Las Vegas to hold or renovate for resale, with your budget and intended use in mind.",
  alternates: { canonical: "/invest" },
};

export default async function InvestPage() {
  const videos = featured(await fetchVideos(), ["rentals-vacant", "renovated"], 2);
  return (
    <>
      <CinematicSection frames={frames.invest} hue={palette.invest.hue} align="C" priority>
        <PhotoInner>
          <div className="v3-text">
            <H1>{"For Investors"}</H1>
            <Body>{"I help you look for investment property in Las Vegas that fits your budget and the work you’re willing to take on."}</Body>
            <Actions>
              <Btn href="/contact?intent=investor">{"Get in touch with me"}</Btn>
            </Actions>
          </div>
        </PhotoInner>
      </CinematicSection>

      <Solid colors={palette.invest.s2} align="R">
        <div className="v3-text">
          <H2>{"What do you want the property to do?"}</H2>
          <Body>
            {
              "A property to hold and a house to renovate for resale call for different searches. Your budget, timing, and the work you want to take on help define what fits."
            }
          </Body>
        </div>
      </Solid>

      <Solid colors={palette.invest.s3} align="L">
        <div className="v3-text">
          <H2>{"See the condition on film."}</H2>
          <Body>{"Property videos show the condition when filmed."}</Body>
        </div>
        {videos.length ? (
          <div className="v3-video-grid">
            {videos.map((v) => (
              <CinematicVideo key={v.id} video={v} />
            ))}
          </div>
        ) : (
          <VideoEmpty showLink={false} />
        )}
        <Actions>
          <Btn href={person.youtubeUrl}>{"Open the channel"}</Btn>
        </Actions>
      </Solid>

      <Solid colors={palette.invest.s4} align="C">
        <div className="v3-text">
          <ContactTag />
          <H2>{"Tell me what you want to buy."}</H2>
          <Body>{"Tell me the area, budget, intended use, and how much work you’re comfortable taking on."}</Body>
          <Actions>
            <Btn href="/contact?intent=investor">{"Get in touch with me"}</Btn>
          </Actions>
        </div>
      </Solid>
    </>
  );
}
