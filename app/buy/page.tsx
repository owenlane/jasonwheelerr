import type { Metadata } from "next";
import CinematicSection from "@/components/v3/CinematicSection";
import { Actions, Body, Btn, ContactTag, H1, H2, PhotoInner, Solid } from "@/components/v3/sections";
import { frames, palette } from "@/lib/v3";

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

      <Solid colors={palette.buy.s2} align="L">
        <div className="v3-text">
          <H2>{"A buying experience you're satisfied with"}</H2>
          <Body>
            {
              "The search should fit your budget, preferred areas, and the house you want. I help you understand the property and the terms of an offer. If you’re buying from out of state, walkthrough video and condition notes can help where access allows."
            }
          </Body>
        </div>
      </Solid>

      <Solid colors={palette.buy.s3} align="C">
        <div className="v3-text">
          <ContactTag />
          <H2>{"Tell me what you’re looking for."}</H2>
          <Body>{"Tell me the area, your budget, your timing, and whether you’re here or buying from somewhere else."}</Body>
          <Actions>
            <Btn href="/contact?intent=buyer">{"Get in touch with me"}</Btn>
          </Actions>
        </div>
      </Solid>
    </>
  );
}
