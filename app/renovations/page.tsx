import type { Metadata } from "next";
import { Body,ClosingContact,Display,Section,Steps } from "@/components/primitives";
import { PageIntro,PhotoStory,PhotoBand,PhotoFigure } from "@/components/PhotoSections";
import { VideoGrid } from "@/components/VideoPlayer";
import VideoEmpty from "@/components/VideoEmpty";
import { featured,fetchVideos } from "@/lib/youtube";
export const revalidate=3600;
export const metadata:Metadata={title:"Renovations",description:"Help getting a vacant, dated, or unfinished property ready to sell, rent, or hold. Local renovation coordination in Las Vegas.",alternates:{canonical:"/renovations"}};
const prompts=[
  ["The property is empty","Arrange access and look at the visible condition. A walkthrough, photos, and notes can give you a starting point for preparation."],
  ["A tenant has moved out","Review the condition after possession is available and discuss what needs attention before the next use."],
  ["A project is unfinished","Look at the work completed and what remains. A written scope from the appropriate trades helps separate the next decisions."],
  ["You are preparing to sell","Compare possible preparation with listing the property as it stands. Choose the work before committing a budget."],
];
export default async function RenovationsPage(){
 const proof=featured(await fetchVideos(),["renovated","rentals-vacant"],2);
 return <>
  <PageIntro label="Renovations" heading="A plan for the property you have." description="Help getting a vacant, dated, or unfinished property ready to sell, rent, or hold." intent="renovations"/>
  <PhotoStory photo={{group:"calico",index:1}} label="For owners here and away" heading="When the property is here and you are not."><p>Start with the address and what is happening. Local access, a look at the condition, and a conversation about your plans can help turn an open question into a practical next step.</p></PhotoStory>
  <Section label="What brings you here"><div className="section-heading"><Display>Start with the situation.</Display></div><div className="mt-10 grid gap-8 sm:grid-cols-2">{prompts.map(([title,detail])=><article key={title} className="border-t pt-6"><h3 className="text-xl">{title}</h3><p className="mt-4 quiet">{detail}</p></article>)}</div></Section>
  <PhotoBand photo={{group:"calico",index:0}} label="Choose the next use" heading="Sell, rent, or hold."><p>The work should fit the plan. Preparation for a sale may differ from what you want before another tenancy or a longer hold. Decide the direction before deciding the finishes.</p></PhotoBand>
  <Section label="From access to a decision"><div className="section-heading"><Display>Know what you are authorizing.</Display></div><Steps steps={[{name:"See the property",detail:"Arrange authorized access and review the visible condition."},{name:"Discuss the scope",detail:"Identify the work you are considering and which specialists need to assess it."},{name:"Review estimates",detail:"Compare the proposed work, cost, and timing before you authorize vendors."},{name:"Choose what is next",detail:"Coordinate the agreed preparation with your plan to list, rent, or hold."}]}/></Section>
  <Section label="Coordination"><div className="grid items-center gap-12 md:grid-cols-2"><PhotoFigure photo={{group:"calico",index:2}}/><div><Display>The right people for the work.</Display><Body className="mt-5">My role is the real estate side and coordination around your property plan. Licensed contractors perform construction. Inspections, permits, legal questions, and property management stay with the professionals responsible for them.</Body><Body className="mt-5">If the property is part of an estate or has a title issue, access and authorization come first. Your attorney and title company can establish what is required.</Body></div></div></Section>
  <Section label="Property walkthroughs" rule={false}><div className="section-heading"><Display>Look at the details.</Display><Body className="mt-5">The video library shows properties and their visible condition when filmed. It can help frame the questions you want to ask about your own property.</Body></div>{proof.length?<VideoGrid videos={proof}/>:<VideoEmpty/>}</Section>
  <ClosingContact heading="Tell me what is happening with the property." intent="renovations">The address, current condition, who has access, and whether you want to sell, rent, or hold.</ClosingContact>
 </>;
}
