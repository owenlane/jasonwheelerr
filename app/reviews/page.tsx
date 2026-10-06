import type { Metadata } from "next";
import CinematicSection from "@/components/v3/CinematicSection";
import { Actions, Body, Btn, ContactTag, H1, H2, PhotoInner, Solid } from "@/components/v3/sections";
import { reviews } from "@/lib/site";
import { frames, palette } from "@/lib/v3";

export const metadata: Metadata = {
  title: "Reviews",
  description: "What clients say about working with Jason Wheeler.",
  alternates: { canonical: "/reviews" },
  openGraph: { title: "Reviews | Jason Wheeler", description: "What clients say about working with Jason Wheeler." },
};

export default function ReviewsPage() {
  return (
    <>
      <CinematicSection frames={frames.reviews} hue={palette.reviews.hue} align="C" priority>
        <PhotoInner>
          <div className="v3-text">
            <H1>{"What clients say."}</H1>
          </div>
        </PhotoInner>
      </CinematicSection>

      <Solid colors={palette.reviews.s2} align="L">
        {reviews.map((r) => (
          <figure key={r.id} className="v3-review">
            <blockquote>{r.quote}</blockquote>
            <figcaption>
              <p className="font-semibold">{r.author}</p>
              <p>{r.context}</p>
              <p>{r.date}</p>
            </figcaption>
          </figure>
        ))}
      </Solid>

      <Solid colors={palette.reviews.s3} align="C">
        <div className="v3-text">
          <ContactTag />
          <H2>{"Get in touch with me"}</H2>
          <Body>{"Tell me what you have in mind."}</Body>
          <Actions>
            <Btn href="/contact">{"Get in touch with me"}</Btn>
          </Actions>
        </div>
      </Solid>
    </>
  );
}
