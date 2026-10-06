import type { Metadata } from "next";
import CinematicSection from "@/components/v3/CinematicSection";
import { Actions, Body, Btn, ContactTag, H1, H2, PhotoInner, Solid } from "@/components/v3/sections";
import { frames, palette } from "@/lib/v3";

export const metadata: Metadata = {
  title: "Sell",
  description: "Help selling your Las Vegas house, whether it is ready, dated, vacant, or unfinished.",
  alternates: { canonical: "/sell" },
};

export default function SellPage() {
  return (
    <>
      <CinematicSection frames={frames.sell} hue={palette.sell.hue} align="R" priority>
        <PhotoInner>
          <div className="v3-text">
            <H1>{"For Sellers"}</H1>
            <Body>{"I help owners sell in Las Vegas, whether the house is ready, dated, vacant, or partway through a project."}</Body>
            <Actions>
              <Btn href="/contact?intent=seller">{"Get in touch with me"}</Btn>
            </Actions>
          </div>
        </PhotoInner>
      </CinematicSection>

      <Solid colors={palette.sell.s2} align="L">
        <div className="v3-text">
          <H2>{"You do not have to fix everything first."}</H2>
          <Body>
            {
              "A dated house, a former rental, or an unfinished project doesn’t have to be fixed up before we talk. I can help you weigh selling as it stands against doing some preparation. Inherited homes and houses that didn’t sell the first time are part of that conversation, too."
            }
          </Body>
        </div>
      </Solid>

      <Solid colors={palette.sell.s3} align="C">
        <div className="v3-text">
          <ContactTag />
          <H2>{"Tell me about the house."}</H2>
          <Body>{"Send the address, its condition, whether anyone lives there, and whether you are local."}</Body>
          <Actions>
            <Btn href="/contact?intent=seller">{"Get in touch with me"}</Btn>
          </Actions>
        </div>
      </Solid>
    </>
  );
}
