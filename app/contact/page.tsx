import type { Metadata } from "next";
import { Section } from "@/components/primitives";
import { PageIntro,PhotoBand } from "@/components/PhotoSections";
import InquiryForm from "@/components/InquiryForm";
import { brokerage,person,resolveIntent } from "@/lib/site";
export const metadata:Metadata={title:"Get in touch with me",description:"Call or text Jason Wheeler at 714-928-8905, or send an inquiry about buying, selling, investing, or renovations.",alternates:{canonical:"/contact"}};
export default async function ContactPage({searchParams}:{searchParams:Promise<{intent?:string}>}){
 const params=await searchParams;
 return <>
  <PageIntro label={`${brokerage.name} · Las Vegas`} heading="Get in touch with me" description="Call, text, or send a message. Tell me about the property or what you are looking for."/>
  <PhotoBand photo={{group:"speedway",index:0}} label="Las Vegas and Southern Nevada" heading="Start wherever you are."><p>An address, an area, or a question is enough to begin. Let me know whether you are local and what timing you have in mind.</p></PhotoBand>
  <Section label="Send a message"><div className="grid gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,.65fr)]">
    <InquiryForm initialIntent={resolveIntent(params.intent)}/>
    <aside className="pt-10"><h2 className="text-xl">Reach me directly</h2><ul className="mt-6 space-y-5">
      <li><a href={person.phoneHref} className="link-line">{person.phone}</a><p className="text-sm quiet">Call</p></li>
      <li><a href={person.smsHref} className="link-line">Send a text</a></li>
      <li><a href={`mailto:${person.email}`} className="link-line">{person.email}</a></li>
      <li><a href={person.instagramUrl} target="_blank" rel="noopener noreferrer" className="link-line">Instagram {person.instagramHandle}<span className="sr-only"> (opens in a new tab)</span></a></li>
      <li><a href={person.youtubeUrl} target="_blank" rel="noopener noreferrer" className="link-line">YouTube {person.youtubeHandle}<span className="sr-only"> (opens in a new tab)</span></a></li>
    </ul><div className="mt-10 border-t pt-6 text-sm quiet"><h3 className="text-base text-ink">{brokerage.name}</h3><p className="mt-3">{brokerage.office}</p><p className="mt-3">Managing broker: {brokerage.managingBroker}</p><p className="mt-3">Nevada real estate salesperson {person.licenseNumber}</p></div></aside>
  </div></Section>
 </>;
}
