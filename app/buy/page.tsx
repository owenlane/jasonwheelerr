import type { Metadata } from "next";
import CinematicSection from "@/components/v3/CinematicSection";
import Feature, { FeaturePhoto } from "@/components/v3/Feature";
import { Actions, Body, Btn, Group, H1, H2, PhotoInner, Solid } from "@/components/v3/sections";
import { feature, featureImages, frames, palette } from "@/lib/v3";

export const metadata: Metadata = {
  title: "Buy",
  description:
    "Buyer representation in Las Vegas for buyers here and out of state, with a search tied to your budget, plans, and property needs.",
  alternates: { canonical: "/buy" },
};

export default function BuyPage() {
  return (
    <>
      <CinematicSection frames={frames.buy} hue={palette.buy.hue} align="C" priority>
        <PhotoInner>
          <div className="v3-text">
            <H1>{"For Buyers"}</H1>
            <Body>{"I help buyers find a home that fits their budget, their plans, and the way they want to live."}</Body>
            <Actions>
              <Btn href="/contact?intent=buyer">{"Get in touch with me"}</Btn>
            </Actions>
          </div>
        </PhotoInner>
      </CinematicSection>

      <Feature className="v3-feature-buy" base={feature.buy} hue={palette.buy.hue} mediaSide="right" textAlign="left" faint={featureImages.buy} media={<FeaturePhoto img={featureImages.buy} />}>
        <H2>{"A buying experience you're satisfied with"}</H2>
        <Group>
          <Body>
            {
              "The search should fit your budget, preferred areas, and the house you want. I help you understand the property and the terms of an offer. If you’re buying from out of state, walkthrough video and condition notes can help where access allows."
            }
          </Body>
        </Group>
      </Feature>

      <Solid colors={palette.buy.s3} align="C" className="v3-cta">
        <div className="v3-text">
          <H2>{"Tell me what you’re looking for."}</H2>
          <Group>
            <Body>{"Tell me the area, your budget, your timing, and whether you’re here or buying from somewhere else."}</Body>
            <Actions>
              <Btn href="/contact?intent=buyer">{"Get in touch with me"}</Btn>
            </Actions>
          </Group>
        </div>
      </Solid>
    </>
  );
}
