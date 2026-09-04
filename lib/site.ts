/**
 * PROTECTED FACTS
 * Preserved per the Final Design Report, Section 14. Do not alter, expand or
 * invent. No construction, inspection, legal, tax, accounting or
 * property-management services may be presented.
 */

export const SITE_URL = "https://jasonwheeler.vercel.app";

export const person = {
  name: "Jason Wheeler",
  brokerage: "Blue Diamond Realty",
  market: "Las Vegas and Southern Nevada",
  licenseNumber: "S.169016",
  publicId: "226550",
  phone: "714-928-8905",
  phoneHref: "tel:+17149288905",
  smsHref: "sms:+17149288905",
  email: "buyerslv@gmail.com",
  instagramUrl: "https://www.instagram.com/buyerslv/",
  instagramHandle: "@buyerslv",
  youtubeUrl: "https://youtube.com/@jason_wheeler",
  youtubeHandle: "@jason_wheeler",
  youtubeChannelId: "UCDo24FAwYTzD6O0-XlOjwFA",
} as const;

export const brokerage = {
  name: "Blue Diamond Realty",
  managingBroker: "Kimiko Leong",
  office: "6675 S Tenaya Way, Suite 200, Las Vegas, NV 89113",
} as const;

/** Supported experience fact. Stated by the client in the final revision. */
export const yearsExperience = 29;

/**
 * REVIEWS — verbatim client testimonials supplied in the final revision.
 * These are the only reviews on record. Do not invent, edit, embellish, or add
 * to them. `pull` marks the lines flattering enough to surface elsewhere on the
 * site, the way the reference site spreads its strongest quotes.
 */
export type Review = {
  id: string;
  author: string;
  rating: number;
  date: string;
  context: string;
  quote: string;
  pull: string;
};

export const reviews: Review[] = [
  {
    id: "mchampol-2018",
    author: "mchampol",
    rating: 5,
    date: "April 20, 2018",
    context: "Sold a single-family home in 2018 · Tierra de las Palmas, North Las Vegas, NV",
    quote:
      "If you’re looking for an AMAZING realtor then Jason Wheeler is your guy! He made my selling experience absolutely awesome! He always kept me updated on everything and gave me wonderful advice on decisions I had to make. He made the whole selling experience easy, smooth and joyous! Thank you from the bottom of my heart Jason! And I’ll definitely be contacting you when I buy another house!",
    pull: "He made the whole selling experience easy, smooth and joyous.",
  },
  {
    id: "sher765-2017",
    author: "sher765",
    rating: 5,
    date: "March 14, 2017",
    context: "Sold a single-family home in 2017 · Whitney Ranch, Henderson, NV",
    quote:
      "We had an excellent experience with Jason as our realtor. He is very knowledgeable and professional. He made our house sale experience go very smoothly. Would definitely recommend him!",
    pull: "Very knowledgeable and professional. He made our house sale go very smoothly.",
  },
];

export const averageRating =
  reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

/** Scope boundaries. Published as professional disclosure, not marketing. */
export const scopeBoundaries = [
  "Licensed Nevada real estate salesperson. Not a licensed contractor, and no licensed construction work is performed.",
  "Not a property manager, and no property-management services are provided.",
  "Not a home inspector. Walkthrough observations record what is visible and are not an inspection.",
  "No legal, accounting or tax advice.",
] as const;

/** Navigation. Visible order and labels are fixed by the Design Report. */
export const nav = [
  { href: "/buy", label: "Buy" },
  { href: "/sell", label: "Sell" },
  { href: "/invest", label: "Invest" },
  { href: "/property-help", label: "Property Help" },
  { href: "/videos", label: "YouTube Videos" },
  { href: "/about", label: "About Me" },
  { href: "/reviews", label: "Reviews" },
  { href: "/contact", label: "Contact" },
] as const;

export type InquiryIntent = "buyer" | "seller" | "investor" | "property-help" | "general";

/** Intent query values are preserved: ?intent=buyer|seller|investor|property-help */
export const inquiryIntents: { id: InquiryIntent; label: string }[] = [
  { id: "buyer", label: "Buying" },
  { id: "seller", label: "Selling" },
  { id: "investor", label: "Investing" },
  { id: "property-help", label: "Property Help" },
  { id: "general", label: "Something Else" },
];

/**
 * Attach to an individual featured property where an ownership interest exists.
 * Never published as standing site copy.
 */
export const ownershipDisclosure =
  "Ownership interest in this property, and the licensed agent on the sale.";
