import type { Metadata } from "next";
import CinematicSection from "@/components/v3/CinematicSection";
import { Actions, Body, Btn, ContactTag, H1, H2, PhotoInner, Solid } from "@/components/v3/sections";
import { frames, palette } from "@/lib/v3";

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

      <Solid colors={palette.renovations.s2} align="R">
        <div className="v3-text">
          <H2>{"Sell, rent, or hold."}</H2>
          <Body>
            {
              "A vacant house, a former rental, and an unfinished project can need different kinds of attention. The work should fit what you want to do with the property."
            }
          </Body>
        </div>
      </Solid>

      <Solid colors={palette.renovations.s3} align="L">
        <div className="v3-text">
          <H2>{"The right people for the work."}</H2>
          <Body>
            {
              "My role is the real estate side and coordination around your property plan. Licensed contractors perform construction. Inspections, permits, legal questions, and property management stay with the professionals responsible for them."
            }
          </Body>
        </div>
      </Solid>

      <Solid colors={palette.renovations.s4} align="C">
        <div className="v3-text">
          <ContactTag />
          <H2>{"Tell me what's happening with the property"}</H2>
          <Body>{"Tell me the address, current condition, who has access, and whether you want to sell, rent, or hold."}</Body>
          <Actions>
            <Btn href="/contact?intent=renovations">{"Get in touch with me"}</Btn>
          </Actions>
        </div>
      </Solid>
    </>
  );
}
