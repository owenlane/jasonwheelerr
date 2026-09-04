import type { Metadata } from "next";
import { Body, Display, Section, Shell } from "@/components/primitives";
import { person } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What this website collects, why, and what happens to it.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <section className="bg-field">
        <Shell>
          <div className="max-w-3xl py-14 sm:py-20">
            <p className="microlabel">Privacy</p>
            <Display level={1} className="mt-7">
              WHAT THIS SITE DOES WITH YOUR INFORMATION
            </Display>
            <p className="measure mt-7 text-[1.0625rem] leading-[1.7] quiet">
              This describes the actual behaviour of this website. It claims nothing that is not true
              of how the site is built.
            </p>
          </div>
        </Shell>
      </section>

      <Section label="What is collected">
        <Display level={2}>INFORMATION YOU ENTER</Display>
        <Body className="mt-6">
          The contact form asks for your name, email address and, optionally, a phone number and a
          message, along with what your inquiry is about and how you would prefer to be answered.
          Nothing else is requested.
        </Body>
        <Body className="mt-5">
          When you submit the form, the details are sent to Jason by email so he can reply. They are
          not stored in a database on this site.
        </Body>
      </Section>

      <Section label="How it is used" tone="raised">
        <Display level={2}>WHAT HAPPENS TO IT</Display>
        <Body className="mt-6">
          Information you send is used to answer your inquiry and to carry out any work you go on to
          engage Jason for. It is not sold, and it is not added to a marketing list.
        </Body>
        <Body className="mt-5">
          Relevant details may need to be shared with people involved in your transaction — a lender,
          an escrow officer, an inspector or a contractor — where that is necessary to do the work
          you have asked for.
        </Body>
      </Section>

      <Section label="This website">
        <Display level={2}>HOSTING, COOKIES AND VIDEO</Display>
        <Body className="mt-6">
          The site is hosted on Vercel, which processes standard server request information such as
          IP addresses in order to serve pages and protect against abuse.
        </Body>
        <Body className="mt-5">
          No advertising or tracking cookies are set, and no third-party analytics run on this site.
        </Body>
        <Body className="mt-5">
          Video thumbnails load from YouTube&rsquo;s image servers. A video player is only loaded
          after you choose to play something, and video links open on YouTube, where Google&rsquo;s
          own privacy terms apply rather than these.
        </Body>
      </Section>

      <Section label="Your choices" tone="media">
        <Display level={2}>ASKING ABOUT YOUR INFORMATION</Display>
        <p className="measure mt-6 text-[1.0625rem] leading-[1.7] text-field/75">
          To have an inquiry deleted, or to ask what is held, email{" "}
          <a href={`mailto:${person.email}`} className="link-line text-field">{person.email}</a>.
        </p>
        <p className="measure mt-5 text-[0.9375rem] leading-relaxed text-field/60">
          Real estate records connected to an actual transaction are subject to record-keeping
          obligations that apply to licensees and brokerages in Nevada, so those cannot always be
          deleted on request.
        </p>
      </Section>
    </>
  );
}
