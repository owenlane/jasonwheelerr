import type { Metadata } from "next";
import CinematicSection from "@/components/v3/CinematicSection";
import Feature, { FeaturePhoto } from "@/components/v3/Feature";
import { Actions, Body, Btn, Group, H1, H2, PhotoInner, Solid } from "@/components/v3/sections";
import { feature, featureImages, frames, palette } from "@/lib/v3";

export const metadata: Metadata = {
  title: "Renovations",
  description:
    "Real estate coordination for vacant, dated, or unfinished properties in Las Vegas, with plans to sell, rent, or hold.",
  alternates: { canonical: "/renovations" },
};

export default function RenovationsPage() {
  return (
    <>
      <CinematicSection frames={frames.renovations} hue={palette.renovations.hue} align="C" priority>
        <PhotoInner>
          <div className="v3-text">
            <H1>{"For Renovations"}</H1>
            <Body>{"I help coordinate preparation around your plans for a vacant, dated, or unfinished property in Las Vegas."}</Body>
            <Actions>
              <Btn href="/contact?intent=renovations">{"Get in touch with me"}</Btn>
            </Actions>
          </div>
        </PhotoInner>
      </CinematicSection>

      <Feature base={feature.renovations2} hue={palette.renovations.hue} mediaSide="left" textAlign="right" faint={featureImages.renovations2} media={<FeaturePhoto img={featureImages.renovations2} />}>
        <H2>{"Sell, rent, or hold."}</H2>
        <Group>
          <Body>
            {
              "A vacant house, a former rental, and an unfinished project can need different kinds of attention. The work should fit what you want to do with the property."
            }
          </Body>
        </Group>
      </Feature>

      <Feature base={feature.renovations3} hue={palette.renovations.hue} mediaSide="right" textAlign="left" faint={featureImages.renovations3} media={<FeaturePhoto img={featureImages.renovations3} />}>
        <H2>{"The right people for the work."}</H2>
        <Group>
          <Body>
            {
              "My role is the real estate side and coordination around your property plan. Licensed contractors perform construction. Inspections, permits, legal questions, and property management stay with the professionals responsible for them."
            }
          </Body>
        </Group>
      </Feature>

      <Solid colors={palette.renovations.s4} align="C" className="v3-cta">
        <div className="v3-text">
          <H2>{"Tell me what's happening with the property"}</H2>
          <Group>
            <Body>{"Tell me the address, current condition, who has access, and whether you want to sell, rent, or hold."}</Body>
            <Actions>
              <Btn href="/contact?intent=renovations">{"Get in touch with me"}</Btn>
            </Actions>
          </Group>
        </div>
      </Solid>
    </>
  );
}
