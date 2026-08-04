// Next.js turns this file into a real /robots.txt automatically.
// It tells search engines: crawl the public site, but stay out of
// /admin and the API routes (nothing there is meant to show up in
// search results anyway).

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api"],
    },
    sitemap: "https://crccore.com/sitemap.xml",
  };
}
