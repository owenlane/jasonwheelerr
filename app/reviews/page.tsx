import type { Metadata } from "next";
import PhotoStill from "@/components/v3/PhotoStill";
import { H1, PhotoInner } from "@/components/v3/sections";
import { Rise } from "@/components/v3/motion";
import { reviews } from "@/lib/site";
import { frames, palette } from "@/lib/v3";

export const metadata: Metadata = {
  title: "Reviews",
  description: "What clients say about working with Jason Wheeler.",
  alternates: { canonical: "/reviews" },
  openGraph: { title: "Reviews | Jason Wheeler", description: "What clients say about working with Jason Wheeler." },
};

/** JWV3-FINAL-2 R86–R95: one red-rock section — heading, then both reviews in white cards. */
export default function ReviewsPage() {
  return (
    <PhotoStill frame={frames.reviews} hue={palette.reviews.hue} align="C" priority className="v3-reviews">
      <PhotoInner>
        <div className="v3-text">
          <H1>{"What clients say."}</H1>
        </div>
        <Rise className="v3-review-grid">
          {reviews.map((r) => (
            <figure key={r.id} className="v3-review">
              <blockquote>{r.quote}</blockquote>
              <figcaption>
                <p className="v3-review-author">{r.author}</p>
                <p>{r.context}</p>
                <p>{r.date}</p>
              </figcaption>
            </figure>
          ))}
        </Rise>
      </PhotoInner>
    </PhotoStill>
  );
}
