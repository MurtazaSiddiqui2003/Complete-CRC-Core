import Script from "next/script";
import "./globals.css";
import { siteConfig } from "../lib/siteConfig";

// This whole block controls how Google, Facebook, Twitter/X, WhatsApp,
// iMessage etc. show your site when it's linked or searched for --
// the title/description in search results, the preview card when
// someone pastes your link in a chat, and so on.
//
// If the real domain ends up being something other than crccore.com,
// just change SITE_URL below -- everything else updates automatically.
const SITE_URL = "https://crccore.com";
const SITE_TITLE = "CRC Core — A Complete Brand & E-Commerce Growth System";
const SITE_DESCRIPTION =
  "CRC Core builds complete brand and e-commerce growth systems — brand foundation, store setup, performance marketing, content, operations, and AI automation, all working together.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    // Any page that sets its own title (e.g. "Case Studies") will show as
    // "Case Studies | CRC Core" automatically because of this template.
    template: "%s | CRC Core",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "CRC Core",
    "e-commerce growth agency",
    "e-commerce systems agency",
    "Shopify store setup and marketing",
    "Amazon brand management agency",
    "Meta Ads management for e-commerce",
    "brand and e-commerce growth system",
    "business automation",
  ],
  authors: [{ name: "CRC Core" }],
  creator: "CRC Core",

  // Open Graph controls the preview card on Facebook, LinkedIn,
  // WhatsApp, iMessage, Slack, Discord, etc.
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "CRC Core",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: `${SITE_URL}/images/logo-wide.png`,
        width: 1200,
        height: 630,
        alt: "CRC Core",
      },
    ],
  },

  // Twitter/X uses its own tags separate from Open Graph.
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/images/logo-wide.png`],
  },

  // Tells Google "yes, index this site and follow its links" -- the
  // default anyway, but explicit is safer than relying on defaults.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },

  icons: {
    icon: "/images/crc-logo.png",
    shortcut: "/images/crc-logo.png",
    apple: "/images/crc-logo.png",
  },

  // The "correct" canonical URL for this page -- prevents duplicate-
  // content issues if the site is ever reachable at more than one URL
  // (e.g. with and without "www").
};

// Structured data (JSON-LD) -- this is what lets Google potentially show
// rich results instead of just a plain blue link. Search engines read
// this, visitors never see it.
//
// This uses "ProfessionalService" -- a more specific type of
// "LocalBusiness" schema, which fits an agency better than a generic
// "Organization" would. The upgrade over a plain Organization: Google
// can show things like a map listing, service area, and reviews for
// LocalBusiness-type schema, which it won't do for a generic Organization.
//
// ONE THING MISSING ON PURPOSE: a street address. Add one below (under
// "address") if CRC Core has a public business address you want
// associated with local search results -- without it, this still works
// fine for basic rich results, just without the map/local-pack features.
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "CRC Core",
  url: SITE_URL,
  logo: `${SITE_URL}/images/crc-logo.png`,
  image: `${SITE_URL}/images/logo-wide.png`,
  description: SITE_DESCRIPTION,
  email: siteConfig.email,
  telephone: siteConfig.phoneDisplay,
  priceRange: "$$",
  // address: {
  //   "@type": "PostalAddress",
  //   streetAddress: "123 Example St",
  //   addressLocality: "Toronto",
  //   addressRegion: "ON",
  //   postalCode: "A1A 1A1",
  //   addressCountry: "CA",
  // },
  sameAs: [siteConfig.instagramUrl, siteConfig.linkedinUrl].filter(Boolean),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Headings use Poppins now instead of the old Bruno Ace SC --
            same bold, modern feel but far more readable, especially at
            small sizes on mobile. Orbitron is kept for numbers/stats. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Orbitron:wght@400;600;700;900&display=swap"
          rel="stylesheet"
        />
        {/* Calendly's popup widget, loaded once here so every page (Hero,
            Contact, etc.) can just call window.Calendly without each
            component loading its own copy of the script. */}
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
        <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
