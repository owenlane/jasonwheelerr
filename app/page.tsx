import Link from "next/link";
import type { Metadata } from "next";
import { Body,Cta,Display,Section,Shell,Steps,ClosingContact } from "@/components/primitives";
import CinematicSequence from "@/components/CinematicSequence";
import { PhotoStory } from "@/components/PhotoSections";
import { VideoGrid } from "@/components/VideoPlayer";
import VideoEmpty from "@/components/VideoEmpty";
import { person,yearsExperience } from "@/lib/site";
import { featured,fetchVideos } from "@/lib/youtube";
import { group } from "@/lib/images";
export const revalidate=3600;
export const metadata:Metadata={title:"Jason Wheeler — Las Vegas real estate",description:"29 years of real estate experience. Buying, selling, investing and renovation coordination in Las Vegas and Southern Nevada.",alternates:{canonical:"/"}};
const doors=[
  {href:"/buy",label:"Buy",detail:"From the search to closing, with someone local on your side."},
  {href:"/sell",label:"Sell",detail:"Help pricing, preparing, and selling the house you have."},
  {href:"/invest",label:"Invest",detail:"Local real estate guidance for rentals, fixers, and your next investment property."},
  {href:"/renovations",label:"Renovations",detail:"Help getting a vacant, dated, or unfinished property ready to sell, rent, or hold."},
];
export default async function HomePage(){
  const strip=group("strip");const proof=featured(await fetchVideos(),["renovated","for-sale"],3);
  return <>
    <section className="home-hero"><CinematicSequence frames={strip.frames} dir={strip.dir}/><div className="hero-copy"><Shell><div className="hero-panel">
      <p className="microlabel quiet">{person.name} · {person.brokerage}</p>
      <h1 className="text-[2.125rem] sm:text-[3rem] lg:text-[3.75rem]">I sell and renovate houses in Las Vegas.</h1>
      <p className="mt-6 quiet">{yearsExperience} years of real estate experience.</p>
      <ul className="mx-auto mt-6 grid max-w-xl gap-1 text-base quiet">
        <li>Buying here, whether you live nearby or out of state.</li><li>Selling a home, as it is or with some preparation.</li><li>Looking at a rental, a fixer, or another investment.</li><li>Owning a property here while living somewhere else.</li>
      </ul>
      <div className="mt-8 flex flex-wrap justify-center gap-3"><Cta href="/contact">Get in touch with me</Cta><Cta href="/videos" variant="outline">YouTube Videos</Cta></div>
    </div></Shell></div></section>
    <Section label="Where to begin" tone="raised" rule={false}>
      <ul className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">{doors.map(d=><li key={d.href}><Link href={d.href} className="service-card"><h2>{d.label}</h2><p>{d.detail}</p></Link></li>)}</ul>
    </Section>
    <PhotoStory photo={{group:"calico",index:0}} label="Local help" heading="When the property is here and you are not." href="/contact?intent=renovations">
      <p>You do not need to have everything figured out before we talk. Start with the address, the condition, and what you want to do with it. We can work out what needs a visit and what comes next.</p>
    </PhotoStory>
    <Section label="Keys, walk, film, decide">
      <div className="section-heading"><Display>A practical place to start.</Display><Body className="mt-5">The property and your plans set the direction. Here is how an on-site review can help.</Body></div>
      <Steps steps={[{name:"Keys",detail:"Arrange access with the owner or the person authorized to provide it."},{name:"Walk",detail:"Look at the rooms, the visible condition, and anything that needs closer attention."},{name:"Film",detail:"Use a walkthrough and photos to make the discussion more useful, especially from out of state."},{name:"Decide",detail:"Review the information together and choose the next real estate step."}]}/>
    </Section>
    <Section label="YouTube Videos" rule={false}>
      <div className="section-heading"><Display>Properties, filmed as they were.</Display><Body className="mt-5">Walkthroughs from the channel. A look at the houses, their layouts, and their condition when filmed.</Body></div>
      {proof.length?<VideoGrid videos={proof}/>:<VideoEmpty/>}
      <div className="mt-10 text-center"><Cta href="/videos" variant="outline">See all YouTube videos</Cta></div>
    </Section>
    <PhotoStory photo={{group:"water",index:2}} reverse label="More than a standard sale" heading="A different situation still has a starting point.">
      <p>Vacant rentals, inherited property, auctions, and 1031 exchanges all raise different questions. I can help with the property and transaction side, with legal and tax questions handled by the appropriate professional.</p>
      <div className="mt-7 flex flex-wrap justify-end gap-3"><Cta href="/sell" variant="outline">Selling</Cta><Cta href="/invest" variant="outline">Investing</Cta></div>
    </PhotoStory>
    <ClosingContact heading="Get in touch with me">Tell me what you are working on. An address, an area, or a question is enough to start.</ClosingContact>
  </>;
}
