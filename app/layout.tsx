import type { Metadata } from "next";
// V2 typefaces. Archivo carries the display weight the V1 Michroma treatment
// lacked; IBM Plex Sans and Mono handle body copy and the numeric spec
// treatment. Both are open-licensed and self-hosted, so no third-party font
// request is made at runtime.
import "@fontsource-variable/archivo";
import "@fontsource-variable/ibm-plex-sans";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileContactBar from "@/components/MobileContactBar";
import { brokerage, person, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${person.name} — Las Vegas real estate and renovations`,
    template: `%s | ${person.name}`,
  },
  description:
    "Jason Wheeler. 30 years of real estate experience. Buying, selling, investing and renovation coordination in Las Vegas and Southern Nevada.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: `${person.name} — ${person.brokerage}`,
    locale: "en_US",
    url: SITE_URL,
    title: `${person.name} — Las Vegas real estate and renovations`,
    description:
      "Buying, selling, investing and renovation coordination in Las Vegas. 30 years of real estate experience.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${person.name} — Las Vegas real estate and renovations`,
    description: "Local help for buyers, sellers, investors, and owners out of state.",
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
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{__html:`try{document.documentElement.dataset.theme=localStorage.getItem("jw-theme")==="dark"?"dark":"light"}catch(e){}`}}/></head>
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
