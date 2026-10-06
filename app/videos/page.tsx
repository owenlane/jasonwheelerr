import type { Metadata } from "next";
import { Body,ClosingContact,Display,Section } from "@/components/primitives";
import { PageIntro } from "@/components/PhotoSections";
import VideoLibrary from "@/components/VideoLibrary";
import PersonalVideoCollection from "@/components/PersonalVideoCollection";
import { fetchVideos } from "@/lib/youtube";
export const revalidate=3600;
export const metadata:Metadata={title:"YouTube Videos",description:"Property walkthroughs and personal videos from Jason Wheeler’s YouTube channel.",alternates:{canonical:"/videos"}};
export default async function VideosPage(){
 const videos=await fetchVideos();
 return <>
  <PageIntro label="Jason Wheeler" heading="YouTube Videos" description="Properties, filmed as they were. Walkthroughs from the channel, followed by a little life outside real estate."/>
  <Section label="The property library" rule={false}><div className="section-heading"><Display>Take a look through the houses.</Display><Body className="mt-5">Layouts, finishes, and visible condition at the time of filming. Contact me for current property details and availability.</Body></div><VideoLibrary videos={videos}/></Section>
  <Section label="Off the clock"><div className="section-heading"><Display id="personal-videos">Away from the properties.</Display><Body className="mt-5">Personal videos on fishing, grappling, everyday projects, and other interests.</Body></div><div className="mt-10"><PersonalVideoCollection initialCount={10} headingId="personal-videos"/></div></Section>
  <ClosingContact heading="Have a question about a property?">Send me the video or the address, and tell me what you would like to know.</ClosingContact>
 </>;
}
