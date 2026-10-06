import type { Metadata } from "next";
import CinematicSection from "@/components/v3/CinematicSection";
import { Body, Group, H1, H2, PhotoInner, Solid } from "@/components/v3/sections";
import { Rise } from "@/components/v3/motion";
import InquiryForm from "@/components/InquiryForm";
import { brokerage, person, resolveIntent } from "@/lib/site";
import { frames, palette } from "@/lib/v3";

export const metadata: Metadata = {
  title: "Get in touch with me",
  description:
    "Call or text Jason Wheeler at 714-928-8905, or send an inquiry about buying, selling, investing, or renovations.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ intent?: string }> }) {
  const params = await searchParams;
  return (
    <>
      <CinematicSection frames={frames.contact} hue={palette.contact.hue} align="C" priority>
        <PhotoInner>
          <div className="v3-text">
            <H1>{"Get in touch with me"}</H1>
            <Body>{"Call, text, or send a message with an address, an area, or a question."}</Body>
          </div>
        </PhotoInner>
      </CinematicSection>

      <Solid colors={palette.contact.s2} align="L">
        <div className="v3-text">
          <H2>{"Send a message"}</H2>
          <Group>
            <Body>{"Tell me what you have in mind and your timing."}</Body>
          </Group>
        </div>
        <Rise className="v3-form-shell">
          <InquiryForm initialIntent={resolveIntent(params.intent)} />
        </Rise>
      </Solid>

      <Solid colors={palette.contact.s3} align="C" className="v3-cta">
        <div className="v3-text">
          <H2>{"Reach me directly"}</H2>
          <Rise>
          <ul className="v3-direct">
            <li>
              <a href={person.phoneHref}>{person.phone}</a>
              <p>{"Call"}</p>
            </li>
            <li>
              <a href={person.smsHref}>{"Send a text"}</a>
            </li>
            <li>
              <a href={`mailto:${person.email}`}>{person.email}</a>
            </li>
            <li>
              <a href={person.instagramUrl} target="_blank" rel="noopener noreferrer">
                {`Instagram ${person.instagramHandle}`}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a href={person.youtubeUrl} target="_blank" rel="noopener noreferrer">
                {`YouTube ${person.youtubeHandle}`}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
          <div className="v3-brokerage">
            <p className="font-semibold">{brokerage.name}</p>
            <p>{brokerage.office}</p>
            <p>{`Managing broker: ${brokerage.managingBroker}`}</p>
            <p>{`Nevada real estate salesperson ${person.licenseNumber}`}</p>
          </div>
          </Rise>
        </div>
      </Solid>
    </>
  );
}
