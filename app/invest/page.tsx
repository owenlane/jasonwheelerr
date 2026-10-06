import type { Metadata } from "next";
import { Body,ClosingContact,DataRows,Display,Section,Steps } from "@/components/primitives";
import { PageIntro,PhotoStory,PhotoBand,PhotoFigure } from "@/components/PhotoSections";
import { VideoGrid } from "@/components/VideoPlayer";
import VideoEmpty from "@/components/VideoEmpty";
import { featured,fetchVideos } from "@/lib/youtube";
export const revalidate=3600;
export const metadata:Metadata={title:"Invest",description:"Local real estate guidance for Las Vegas rentals, fixers, vacant properties, auctions, and investment purchases.",alternates:{canonical:"/invest"}};
export default async function InvestPage(){
 const proof=featured(await fetchVideos(),["rentals-vacant","renovated"],2);
 return <>
  <PageIntro label="Investment property" heading="Look at the numbers. Look at the house." description="Local real estate guidance for rentals, fixers, vacant properties, and your next investment purchase." intent="investor"/>
  <PhotoBand photo={{group:"water",index:2}} label="Start with your criteria" heading="What do you want the property to do?"><p>A hold and a renovation for resale call for different searches. Tell me the budget, the area, the type of property, and how much work you are prepared to take on.</p></PhotoBand>
  <Section label="The property behind the listing"><div className="section-heading"><Display>The photos are a starting point.</Display><Body className="mt-5">A useful review connects the listing details to the actual house. Where access is available, visible condition, layout, and unfinished work all belong in the conversation.</Body></div>
    <DataRows rows={[{term:"Rentals and vacant homes",detail:"Consider occupancy, current condition, and possible preparation before the next use. Ongoing management needs its own plan."},{term:"Fixers and renovation projects",detail:"Compare the purchase price with the work you are considering. Specialist assessments and written estimates help you judge the scope."},{term:"Auction purchases",detail:"Review the available property information, auction requirements, and access limitations before deciding whether to bid."},{term:"1031 exchanges",detail:"Coordinate the real estate search and transaction with your qualified intermediary and tax adviser."},{term:"Title questions",detail:"Work with the title company and your attorney to understand what must be resolved. Quiet title is a legal process."}]}/>
  </Section>
  <PhotoStory photo={{group:"water",index:1}} reverse label="Scope and costs" heading="Put the condition beside the asking price."><p>Purchase price is one part of the decision. Repairs, holding costs, financing, and the exit plan need their own numbers. I can help with the real estate comparison; projected rent, resale value, and returns remain estimates.</p></PhotoStory>
  <Section label="A clear role">
    <div className="grid items-center gap-12 md:grid-cols-2"><div><Display>Real estate representation.</Display><Body className="mt-5">This is not a fund or a property-management service. You choose the investment and decide what to spend. Licensed trades handle construction, and your legal, tax, and financial advisers handle their respective questions.</Body></div><PhotoFigure photo={{group:"water",index:0}}/></div>
  </Section>
  <Section label="Bring the criteria" tone="raised"><div className="section-heading"><Display>Make the search specific.</Display></div><Steps steps={[{name:"Area and budget",detail:"Where you want to buy and the amount available for the purchase and work."},{name:"Hold or resale",detail:"Your intended use and the timeline you are working toward."},{name:"Condition and occupancy",detail:"The work you can take on and whether an occupied property fits your plans."},{name:"After closing",detail:"Who will handle repairs, leasing, and ongoing management if needed."}]}/></Section>
  <Section label="Property videos" rule={false}><div className="section-heading"><Display>See the condition on film.</Display></div>{proof.length?<VideoGrid videos={proof}/>:<VideoEmpty/>}</Section>
  <ClosingContact heading="Tell me what you want to buy." intent="investor">Include the area, budget, intended use, and the work you are comfortable taking on.</ClosingContact>
 </>;
}
