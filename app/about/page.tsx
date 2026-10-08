import type { Metadata } from "next";
import CinematicSection from "@/components/v3/CinematicSection";
import Feature from "@/components/v3/Feature";
import { Actions, Body, Btn, Group, H1, H2, PhotoInner, Solid } from "@/components/v3/sections";
import PersonalVideoCollection from "@/components/PersonalVideoCollection";
import { feature, featureImages, frames, palette } from "@/lib/v3";

export const metadata: Metadata = {
  title: "About Jason",
  description:
    "Jason Wheeler brings 30 years of real estate experience to buying, selling, investing and renovation coordination in Las Vegas.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <CinematicSection frames={frames.about} hue={palette.about.hue} align="C" priority>
        <PhotoInner>
          <div className="v3-text">
            <H1>{"More about me"}</H1>
            <Body>{"30 years of real estate experience, helping buyers, sellers, investors, and owners with their property plans."}</Body>
          </div>
        </PhotoInner>
      </CinematicSection>

      <Feature base={feature.about} hue={palette.about.hue} photoSide="right" textAlign="left" photo={featureImages.about}>
        <H2>{"A practical approach to real estate"}</H2>
        <Group>
          <Body>{"Nevada real estate salesperson S.169016, with Blue Diamond Realty."}</Body>
          <Body>
            {
              "My role is real estate and coordination; I connect licensed inspectors and contractors for inspecting and construction. Ongoing property management, legal matters, and tax questions require the appropriate professionals."
            }
          </Body>
        </Group>
      </Feature>

      <Solid colors={{ ...palette.about.s3, hue: "15 28 49" }} align="C">
        <div className="v3-text">
          <H2 id="about-personal-videos">{"My life outside real estate!"}</H2>
          <Group>
            <Body>{"Grappling, fishing, projects, and other videos from my YouTube channel."}</Body>
          </Group>
        </div>
        <div className="v3-personal mt-10 text-left">
          <PersonalVideoCollection initialCount={4} headingId="about-personal-videos" />
        </div>
      </Solid>

      <Solid colors={palette.about.s4} align="C" className="v3-cta">
        <div className="v3-text">
          <H2>{"Get in touch with me"}</H2>
          <Group>
            <Body>{"Tell me about the move, the property, or the question you are working through."}</Body>
            <Actions>
              <Btn href="/contact">{"Get in touch with me"}</Btn>
            </Actions>
          </Group>
        </div>
      </Solid>
    </>
  );
}
