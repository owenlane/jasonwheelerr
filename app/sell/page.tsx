import type { Metadata } from "next";
import { Body,ClosingContact,Display,Section,Steps } from "@/components/primitives";
import { PageIntro,PhotoStory,PhotoBand } from "@/components/PhotoSections";
import { VideoGrid } from "@/components/VideoPlayer";
import VideoEmpty from "@/components/VideoEmpty";
import { featured,fetchVideos } from "@/lib/youtube";
export const revalidate=3600;
export const metadata:Metadata={title:"Sell",description:"Help pricing, preparing, and selling the house you have. Las Vegas seller representation for local and out-of-state owners.",alternates:{canonical:"/sell"}};
const situations=[["Ready to list","Start with the house, comparable sales, and the timing you have in mind."],["Dated or mid-project","Look at the current condition before deciding what, if anything, to finish."],["Vacant or a former rental","Review access, visible condition, and the preparation needed for showings."],["Inherited property","Establish who can authorize the sale and where things stand with the estate."],["Owner elsewhere","Arrange access and discuss how you want to receive updates and make decisions."],["A sale that stalled","Review the earlier listing, property condition, and what has changed."]];
export default async function SellPage(){
 const proof=featured(await fetchVideos(),["renovated","for-sale"],2);
 return <>
  <PageIntro label="Selling in Las Vegas" heading="Sell the house you have." description="Help pricing, preparing, and selling the house you have." intent="seller"/>
  <PhotoStory photo={{group:"park",index:1}} label="A starting point" heading="You do not have to fix everything first.">
    <p>A house can be ready for photos, dated, vacant, or partway through a project. Start with it as it is. We can discuss the likely preparation, your timing, and whether selling in its current condition makes sense.</p>
  </PhotoStory>
  <Section label="Your situation"><div className="section-heading"><Display>Where are you starting?</Display><Body className="mt-5">The first step depends on the property and the people involved.</Body></div>
    <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{situations.map(([name,text])=><div key={name} className="border-t pt-5 text-center"><h3 className="text-lg">{name}</h3><p className="mt-3 text-base quiet">{text}</p></div>)}</div>
  </Section>
  <PhotoBand photo={{group:"park",index:0}} label="Pricing and preparation" heading="Put the work in context."><p>Preparation has a cost. Compare the likely work, the available budget, and the local market before choosing a plan. A proposed improvement is not a promise of a higher sale price.</p></PhotoBand>
  <Section label="The selling process"><div className="section-heading"><Display>From seeing it to listing it.</Display></div>
    <Steps steps={[{name:"See it",detail:"Review condition, occupancy, access, and the outcome you are aiming for."},{name:"Scope it",detail:"Separate possible preparation from specialist work that needs estimates or advice."},{name:"Prepare it",detail:"Choose the work you want to authorize, or prepare to market the property as it stands."},{name:"List it",detail:"Agree on pricing and marketing, arrange showings, and review offers through closing."}]}/>
  </Section>
  <Section label="Property walkthroughs" rule={false}><div className="section-heading"><Display>Houses from the video library.</Display><Body className="mt-5">See how layout, finishes, and visible condition come across on film.</Body></div>{proof.length?<VideoGrid videos={proof}/>:<VideoEmpty/>}</Section>
  <ClosingContact heading="Tell me about the house." intent="seller">Send the address, its condition, whether anyone lives there, and whether you are local.</ClosingContact>
 </>;
}
