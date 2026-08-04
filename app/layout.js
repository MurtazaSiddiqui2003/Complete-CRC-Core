import "./globals.css";

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
    "e-commerce agency",
    "brand growth system",
    "Shopify development",
    "Meta Ads management",
    "Amazon brand management",
    "e-commerce marketing agency",
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
        url: "/images/logo-wide.png",
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
    images: ["/images/logo-wide.png"],
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
  alternates: {
    canonical: SITE_URL,
  },
};

// Structured data (JSON-LD) -- this is what lets Google show rich
// results (business name, logo, contact info) instead of just a plain
// blue link. Search engines read this, visitors never see it.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CRC Core",
  url: SITE_URL,
  logo: `${SITE_URL}/images/crc-logo.png`,
  description: SITE_DESCRIPTION,
  email: "saeed@crccore.com",
  telephone: "+1-416-616-9901",
  sameAs: [],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Same two brand fonts the old site used. Loaded here once for
            the whole app instead of in every page. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bruno+Ace+SC&family=Orbitron:wght@400;600;700;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
