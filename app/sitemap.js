// Next.js turns this file into a real /sitemap.xml automatically.
// It lists the homepage plus every blog post, so search engines can
// find and index individual articles, not just the homepage.

import { getBlogPosts } from "../lib/data";

// Generate this on each request instead of at build time -- otherwise
// Vercel's build step would need a working database connection just to
// build the site, which caused a real deployment failure once before.
export const dynamic = "force-dynamic";

export default async function sitemap() {
  const posts = await getBlogPosts();

  const blogUrls = posts.map((post) => ({
    url: `https://crccore.com/blog/${post._id}`,
    lastModified: post.createdAt ? new Date(post.createdAt) : new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    {
      url: "https://crccore.com",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://crccore.com/portfolio",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...blogUrls,
  ];
}
