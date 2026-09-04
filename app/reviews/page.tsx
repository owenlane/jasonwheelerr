import type { Metadata } from "next";
import { ClosingContact, Cta, Display, Section, Shell, Stars } from "@/components/primitives";
import { averageRating, person, reviews, yearsExperience } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "Verified client reviews for Jason Wheeler, a Las Vegas real estate agent with Blue Diamond Realty and 29 years of experience across Southern Nevada.",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  return (
    <>
      <section className="bg-field">
        <Shell>
          <div className="max-w-4xl py-14 sm:py-20">
            <p className="microlabel">Reviews · {person.market}</p>
            <Display level={1} className="mt-7">
              WHAT CLIENTS SAY
            </Display>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <span className="flex items-center gap-3">
                <Stars rating={averageRating} />
                <span className="font-display text-[1.25rem]">{averageRating.toFixed(1)}</span>
              </span>
              <span className="microlabel">
                {reviews.length} verified {reviews.length === 1 ? "review" : "reviews"}
              </span>
              <span className="hidden h-4 w-px bg-accent sm:block" aria-hidden="true" />
              <span className="microlabel">{yearsExperience} years in Las Vegas real estate</span>
            </div>
            <p className="measure mt-7 text-[1.0625rem] leading-[1.7] quiet">
              {yearsExperience} years selling across the valley. These are the words of clients Jason
              has represented — kept exactly as they were written.
            </p>
          </div>
        </Shell>
      </section>

      <Section label="Client reviews" tone="raised" rule={false}>
        <div className="grid gap-x-12 gap-y-14 lg:grid-cols-2">
          {reviews.map((r) => (
            <figure key={r.id} className="flex flex-col border-t border-ink pt-6">
              <div className="flex items-center justify-between gap-4">
                <Stars rating={r.rating} />
                <span className="microlabel">{r.date}</span>
              </div>
              <blockquote className="pull-quote mt-6 text-[1.1875rem] leading-[1.4] text-ink sm:text-[1.375rem]">
                “{r.quote}”
              </blockquote>
              <figcaption className="mt-7">
                <p className="font-display text-[0.9375rem] tracking-[0.02em]">{r.author}</p>
                <p className="microlabel mt-2">{r.context}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-16 border-t border-accent/60 pt-8">
          <p className="measure text-[0.9375rem] leading-relaxed quiet">
            More of the work speaks for itself on film — every walkthrough is the actual property,
            room by room.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Cta href="/videos" variant="outline">
              Watch the walkthroughs
            </Cta>
            <Cta href="/contact" variant="quiet">
              Contact Jason
            </Cta>
          </div>
        </div>
      </Section>

      <ClosingContact heading="WORK WITH JASON">
        Buying, selling, investing, or a property here that needs someone to go and look at it — start
        with a message and he will get back to you.
      </ClosingContact>
    </>
  );
}
