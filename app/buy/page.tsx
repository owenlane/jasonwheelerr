import type { Metadata } from "next";
import { Body,ClosingContact,DataRows,Display,Section,Steps } from "@/components/primitives";
import { PageIntro,PhotoStory,PhotoDuo } from "@/components/PhotoSections";
import { VideoGrid } from "@/components/VideoPlayer";
import VideoEmpty from "@/components/VideoEmpty";
import { featured,fetchVideos } from "@/lib/youtube";
export const revalidate=3600;
export const metadata:Metadata={title:"Buy",description:"From the search to closing, with someone local on your side. Buyer representation in Las Vegas for local and out-of-state clients.",alternates:{canonical:"/buy"}};
export default async function BuyPage(){
  const proof=featured(await fetchVideos(),["for-sale"],2);
  return <>
    <PageIntro label="Buying in Las Vegas" heading="See the house before you decide." description="From the search to closing, with someone local on your side." intent="buyer">
      <p className="measure mt-5 quiet">First home, another home, a move to Nevada, or an investment purchase. We start with what you need and what you want to spend.</p>
    </PageIntro>
    <PhotoStory photo={{group:"charleston",index:1}} label="Buying from out of state" heading="Buying Las Vegas from somewhere else.">
      <p>The search can begin before you are here. We can discuss the areas, narrow down properties, and arrange showings around your plans. Where access allows, walkthrough video and condition notes can help you decide what is worth seeing in person.</p>
      <p>Tell me whether you can visit and when. That helps us choose how to handle showings, inspections, and the closing arrangements.</p>
    </PhotoStory>
    <Section label="Buyer representation">
      <div className="section-heading"><Display>What a buyer’s agent should actually do.</Display><Body className="mt-5">Keep the search tied to your criteria and help you understand the property before you commit.</Body></div>
      <DataRows rows={[
        {term:"Build a shortlist",detail:"Compare properties against your budget, preferred areas, layout, and deal-breakers. Start with a list that gives us something specific to discuss."},
        {term:"Arrange showings",detail:"Plan in-person visits or discuss walkthrough photos and film when you are away. Access depends on the property and the seller."},
        {term:"Look at condition",detail:"Note what is visible, what appears updated, and what needs a closer look. A licensed home inspector evaluates the systems and inspection findings."},
        {term:"Work through the offer",detail:"Review comparable sales, proposed terms, contingencies, and deadlines. You decide what to offer and which terms you are comfortable with."},
        {term:"Follow through to closing",detail:"Coordinate the real estate steps with the lender, escrow, and other professionals. Review inspection responses and keep the remaining decisions clear."},
      ]}/>
    </Section>
    <PhotoDuo photos={[{group:"charleston",index:0},{group:"charleston",index:2}]}/>
    <Section label="Before the search" tone="raised">
      <div className="section-heading"><Display>Tell me what matters to you.</Display></div>
      <Steps steps={[{name:"Budget",detail:"Your price range and how you plan to buy. Financing questions belong with your lender."},{name:"Area",detail:"Where you want to look and which everyday destinations matter to you."},{name:"The house",detail:"Bedrooms, layout, space, condition, and anything you are not willing to take on."},{name:"Timing",detail:"When you want to move, whether you are local, and when you can be on site."}]}/>
    </Section>
    <Section label="Properties on film" rule={false}><div className="section-heading"><Display>Take a look inside.</Display><Body className="mt-5">Examples from the property video library. Ask about current availability and details on any property that interests you.</Body></div>{proof.length?<VideoGrid videos={proof}/>:<VideoEmpty/>}</Section>
    <ClosingContact heading="Tell me what you’re looking for." intent="buyer">The area, your budget, your timeline, and whether you are here or buying from somewhere else.</ClosingContact>
  </>;
}
