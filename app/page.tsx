import type { Metadata } from "next";
import CinematicSection from "@/components/v3/CinematicSection";
import Feature from "@/components/v3/Feature";
import { Actions, Body, Btn, Group, H1, H2, PhotoInner, Solid } from "@/components/v3/sections";
import { Deferred, Rise } from "@/components/v3/motion";
import { CinematicVideo } from "@/components/VideoPlayer";
import VideoEmpty from "@/components/VideoEmpty";
import { featured, fetchVideos } from "@/lib/youtube";
import { PINK, feature, featureImages, frames, headshot, palette } from "@/lib/v3";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "Jason Wheeler — Las Vegas real estate",
  description:
    "30 years of real estate experience. Buying, selling, investing and renovation coordination in Las Vegas and Southern Nevada.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const videos = featured(await fetchVideos(), ["renovated", "for-sale"], 3);
  return (
    <>
      <CinematicSection frames={frames.homeHero} hue={palette.home.hue} priority className="v3-home-hero">
        <PhotoInner>
          <div className="v3-text">
            <H1 className="v3-name">{"JASON WHEELER"}</H1>
            <p className="v3-sub">{"BUY, SELL, INVEST, RENOVATE, REPAIR"}</p>
            <Body>
              {
                "Are you buying or selling in Las Vegas or relocating? Looking for Investment Property? Need to do a 1031 exchange? Have a vacant rental or need repairs on a unit? Are you in foreclosure or upside down? These are common issues in Las Vegas. Please contact me, and I will help you."
              }
            </Body>
          </div>
        </PhotoInner>
      </CinematicSection>

      <Feature
        className="v3-feature-home"
        base={feature.home}
        hue={palette.home.hue}
        photoSide="left"
        textAlign="right"
        photo={featureImages.home}
        media={
          <Deferred ratio="1245 / 1556">
          <picture>
            <source type="image/avif" srcSet={headshot.avif} sizes="(min-width: 900px) 320px, 180px" />
            <source type="image/webp" srcSet={headshot.webp} sizes="(min-width: 900px) 320px, 180px" />
            <img src={headshot.fallback} alt={headshot.alt} width={headshot.width} height={headshot.height} loading="lazy" decoding="async" />
          </picture>
          </Deferred>
        }
      >
        <Group>
          <Body>
            {
              "I’m Jason Wheeler, a Las Vegas resident of 25 years, and I have been a real estate professional for 30 years. I started out in the industry in 1996 in sub-prime lending, originating mortgage loans. I’ve been helping buyers, sellers, landlords and tenants accomplish their real estate goals since 2001 as a licensed Realtor. For more than 10 years, I’ve also been flipping houses in Las Vegas. When it comes to the City of Las Vegas, you couldn’t find a better guy to help you with all your Real Estate needs. Real estate is a business I take very seriously, prioritizing your needs and success. I know the entire Vegas Valley as if I were Vegas born."
            }
          </Body>
        </Group>
      </Feature>

      <Solid colors={palette.home.videos} background={PINK}>
        <div className="v3-text">
          <H2>{"My YouTube Videos"}</H2>
          <Group>
            <Body>{"A look at the houses, their layouts, and their condition when filmed."}</Body>
          </Group>
        </div>
        {videos.length ? (
          <div className="v3-video-grid">
            {videos.map((v, i) => (
              <Rise key={v.id} delay={Math.min(180, i * 60)}>
                <CinematicVideo video={v} />
              </Rise>
            ))}
          </div>
        ) : (
          <VideoEmpty />
        )}
        <Actions>
          <Btn href="/videos">{"See all YouTube videos"}</Btn>
        </Actions>
      </Solid>

      <CinematicSection frames={frames.homeContact} hue={palette.home.hue} className="v3-home-contact">
        <PhotoInner>
          <div className="v3-text">
            <H2>{"Get in touch with me"}</H2>
            <Group>
              <Body>{"Tell me what you are working on. An address, an area, or a question is enough to start."}</Body>
              <Actions>
                <Btn href="/contact">{"Get in touch with me"}</Btn>
              </Actions>
            </Group>
          </div>
        </PhotoInner>
      </CinematicSection>
    </>
  );
}
