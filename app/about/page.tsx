import type { Metadata } from "next";
import { Body,ClosingContact,DataRows,Display,Section } from "@/components/primitives";
import { PageIntro,PhotoStory,PhotoDuo,PhotoBand } from "@/components/PhotoSections";
import PersonalVideoCollection from "@/components/PersonalVideoCollection";
import { person,yearsExperience } from "@/lib/site";
export const metadata:Metadata={title:"About Jason",description:"Jason Wheeler brings 29 years of real estate experience to buying, selling, investing and renovation coordination in Las Vegas.",alternates:{canonical:"/about"}};
export default function AboutPage(){
 return <>
  <PageIntro label="About Jason Wheeler" heading="Go to the property. Look at it properly. Say what is there." description={`${yearsExperience} years of real estate experience. Buying, selling, investing, and helping owners work out what comes next.`}/>
  <PhotoStory photo={{group:"arena",index:0}} label="Las Vegas and Southern Nevada" heading="Local experience. A practical approach."><p>I am Jason Wheeler, with {person.brokerage}. I work with buyers, sellers, investors, and owners who need someone local to help with their property.</p><p>The conversation starts with what you are trying to do. From there, we can look at the house, the market, and the real estate steps involved.</p></PhotoStory>
  <Section label="How I work"><div className="section-heading"><Display>Useful information before a decision.</Display><Body className="mt-5">A property makes more sense when you can see its layout and condition. Walkthroughs, photos, and specific questions help keep the discussion about the house itself.</Body></div>
    <DataRows rows={[{term:"Buying and selling",detail:"Search criteria, pricing, preparation, showings, offers, and the steps through closing."},{term:"Investment property",detail:"Real estate guidance around rentals, fixers, vacant properties, auctions, and exchange purchases."},{term:"Owners out of state",detail:"Local access and property information, with coordination around the next step you choose."},{term:"Renovation coordination",detail:"Help connecting the preparation of a property with the plan to sell, rent, or hold it."}]}/>
  </Section>
  <PhotoDuo photos={[{group:"arena",index:1},{group:"arena",index:3}]}/>
  <Section label="The role"><div className="section-heading"><Display>Clear about who handles what.</Display></div><DataRows rows={[{term:"Real estate",detail:`Nevada real estate salesperson ${person.licenseNumber}, with ${person.brokerage}.`},{term:"Property condition",detail:"A walkthrough records what is visible. A licensed inspector evaluates the home and its systems."},{term:"Construction",detail:"Licensed contractors assess and carry out construction work. My role is coordination and the real estate plan."},{term:"Management and advice",detail:"Ongoing property management, legal matters, and tax questions need the appropriate professionals."}]}/></Section>
  <PhotoBand photo={{group:"arena",index:2}} label="Around the valley" heading="There is more to Las Vegas."><p>The city, the desert, the mountains, and the water are all part of this place. These views run throughout the site alongside the real estate work.</p></PhotoBand>
  <Section label="Off the clock" rule={false}><div className="section-heading"><Display id="about-personal-videos">A little more of everyday life.</Display><Body className="mt-5">Grappling, fishing, projects, and other videos from my personal channel.</Body></div><div className="mt-10"><PersonalVideoCollection initialCount={4} headingId="about-personal-videos"/></div></Section>
  <ClosingContact heading="Get in touch with me">Tell me about the move, the property, or the question you are working through.</ClosingContact>
 </>;
}
