import type { Metadata } from "next";
import { ClosingContact,Section,Stars } from "@/components/primitives";
import { PageIntro,PhotoBand } from "@/components/PhotoSections";
import { reviews } from "@/lib/site";
export const metadata:Metadata={title:"Reviews",description:"What clients say about working with Jason Wheeler.",alternates:{canonical:"/reviews"},openGraph:{title:"Reviews | Jason Wheeler",description:"What clients say about working with Jason Wheeler."}};
export default function ReviewsPage(){
 return <>
  <PageIntro label="Client reviews" heading="What clients say." description="Their experience, in their own words."/>
  <Section rule={false}><div className="grid gap-x-12 gap-y-14 lg:grid-cols-2">{reviews.map(r=><figure key={r.id} className="flex flex-col border-t pt-6">
    <Stars rating={r.rating}/><blockquote className="mt-6 font-display text-xl leading-relaxed">“{r.quote}”</blockquote>
    <figcaption className="mt-7"><p className="font-medium">{r.author}</p><p className="mt-2 text-sm quiet">{r.context}</p><p className="mt-1 text-sm quiet">{r.date}</p></figcaption>
  </figure>)}</div></Section>
  <PhotoBand photo={{group:"calico",index:1}} label="Your next step" heading="A conversation about your property."><p>Buying, selling, investing, or preparing a house for what comes next.</p></PhotoBand>
  <ClosingContact heading="Get in touch with me">Tell me what you have in mind.</ClosingContact>
 </>;
}
