import type { Metadata } from "next";
import "@fontsource/michroma";
import "@fontsource-variable/manrope";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileContactBar from "@/components/MobileContactBar";
import { brokerage, person, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${person.name} — Las Vegas Real Estate | ${person.brokerage}`,
    template: `%s | ${person.name}`,
  },
  description:
    "Las Vegas real estate for buyers, sellers and investors, with walkthrough film of the actual properties. Blue Diamond Realty, Las Vegas and Southern Nevada.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: `${person.name} — ${person.brokerage}`,
    locale: "en_US",
    url: SITE_URL,
    title: `${person.name} — Las Vegas Real Estate`,
    description:
      "Buyers, sellers and investors across Las Vegas and Southern Nevada, plus property help for owners who are not here.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${person.name} — Las Vegas Real Estate`,
    description: "Las Vegas real estate with walkthrough film of the actual properties.",
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: person.name,
  url: SITE_URL,
  email: `mailto:${person.email}`,
  telephone: person.phone,
  areaServed: [
    { "@type": "City", name: "Las Vegas", addressRegion: "NV", addressCountry: "US" },
    { "@type": "AdministrativeArea", name: "Southern Nevada" },
  ],
  memberOf: {
    "@type": "RealEstateAgent",
    name: brokerage.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: "6675 S Tenaya Way, Suite 200",
      addressLocality: "Las Vegas",
      addressRegion: "NV",
      postalCode: "89113",
      addressCountry: "US",
    },
  },
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "Nevada Real Estate Salesperson Licence",
    identifier: person.licenseNumber,
  },
  sameAs: [person.youtubeUrl, person.instagramUrl],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <SiteHeader />
        {/* Bottom padding clears the mobile sticky contact bar. */}
        <main id="main" className="pb-14 xl:pb-0">
          {children}
        </main>
        <SiteFooter />
        <MobileContactBar />
      </body>
    </html>
  );
}
