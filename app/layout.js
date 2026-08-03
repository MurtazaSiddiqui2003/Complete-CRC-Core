import "./globals.css";

export const metadata = {
  title: "CRC Core — A Complete Brand & E-Commerce System",
  description: "We are CRC Core",
  keywords: "CRC CORE, E-commerce, marketing, content, marketing agency, brand",
  icons: { icon: "/images/crc-logo.png" },
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
      </head>
      <body>{children}</body>
    </html>
  );
}
