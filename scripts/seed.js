// Run this ONCE after you set up MongoDB Atlas, with:  npm run seed
//
// It fills your empty database with the real CRC Core content that was
// in the old HTML site, so the new site isn't blank on day one.
// Running it again later is safe -- it clears each collection first,
// so you won't end up with duplicates.

require("dotenv").config({ path: ".env.local" });
const { MongoClient } = require("mongodb");

const caseStudies = [
  {
    title: "Featherhead",
    badge: "B2B & B2C",
    market: "E-commerce Brand — USA, Canada & Pakistan",
    points: [
      "Optimized website for higher conversions",
      "Scaled Meta Ads & improved social growth",
      "Featherhead Co. & Featherhead PAK — dual market presence built",
    ],
    videoUrl: "/videos/reel.mp4",
    featured: true,
    order: 1,
  },
  {
    title: "Foresight Apparel",
    badge: "B2B E-Commerce",
    market: "B2B E-commerce — USA & Canada",
    points: [
      "Website enhancement & custom development",
      "Backend improvements & code-level optimization",
    ],
    videoUrl: "/videos/reel.mp4",
    featured: false,
    order: 2,
  },
  {
    title: "Choose-US",
    badge: "Amazon Brand",
    market: "Amazon Brand — USA & Canada",
    points: [
      "Brand identity development",
      "High-converting Amazon listing images",
      "Optimized EBC / A+ content",
    ],
    videoUrl: "/videos/reel.mp4",
    featured: false,
    order: 3,
  },
  {
    title: "Sterling Bloom",
    badge: "Service Business",
    market: "Design & Decor — Service Business",
    points: [
      "Market positioning & strategy consultancy",
      "Social media management & brand presence",
    ],
    videoUrl: "/videos/reel.mp4",
    featured: true,
    order: 4,
  },
];

const blogPosts = [
  {
    title: "Why Most E-commerce Brands Fail in Year One",
    category: "E-commerce",
    excerpt:
      "It's rarely a product problem. Here's the systemic breakdown we see in almost every brand that comes to us stuck — and how to fix it.",
    content:
      "Most founders assume a struggling store means a struggling product. In our experience, that's rarely the real issue. The brands that come to us stuck almost always have a good product buried under a broken system — no clear positioning, a store that isn't built to convert, and marketing that's more guesswork than strategy.\n\nThe pattern shows up the same way every time: traffic without a funnel, ads without creative testing, and a backend that can't keep up once things do start moving. Fixing the product rarely helps. Fixing the system does.\n\nWhat actually moves the needle is treating year one like infrastructure work, not a sprint. Nail the positioning first, build a store that's actually built to convert, and only then start spending on traffic. Brands that skip straight to ads before that foundation exists are the ones we see burn out fastest.",
    date: "June 2025",
    emoji: "📉",
    order: 1,
  },
  {
    title: "The Complete Guide to Shopify Store Optimization",
    category: "Shopify",
    excerpt:
      "Speed, conversion rate, UX — the three pillars that separate a store that converts from one that just exists. A full breakdown.",
    content:
      "A Shopify store existing and a Shopify store converting are two very different things. The gap between them usually comes down to three areas: speed, conversion rate design, and overall user experience.\n\nSpeed matters more than most merchants realize — every extra second of load time measurably costs sales, especially on mobile. Beyond speed, conversion-focused design means clear product photography, frictionless checkout, and trust signals placed where doubt naturally shows up in the buying journey.\n\nUX ties it together: can a first-time visitor find what they want in under 10 seconds? If the answer's no, that's the fix to prioritize before touching anything else — including your ad spend.",
    date: "May 2025",
    emoji: "🛒",
    order: 2,
  },
  {
    title: "How We Scaled a Brand from 0 to $50K/Month on Meta Ads",
    category: "Meta Ads",
    excerpt:
      "The exact framework, creative strategy, and funnel structure we used — and what most brands get completely wrong with paid social.",
    content:
      "Most brands treat Meta Ads like a slot machine — throw budget at it and hope something hits. The brands that actually scale treat it like a system: structured creative testing, a funnel that matches the buyer's actual awareness stage, and disciplined budget allocation based on real data, not gut feeling.\n\nOur approach starts with broad creative testing to find what resonates, then narrows spend toward what's actually working instead of spreading it thin across everything. From there, retargeting and lookalike audiences get layered in once there's real purchase data to build from.\n\nThe biggest mistake we see is brands scaling budget before finding a winning angle. Test small, scale what works, kill what doesn't — that discipline is the entire difference between a brand that plateaus at a few thousand a month and one that breaks past $50K.",
    date: "April 2025",
    emoji: "📊",
    order: 3,
  },
];

const faqs = [
  {
    question: "What makes CRC Core different from a regular agency?",
    answer:
      "We don't offer isolated services. We build complete growth systems — brand, store, marketing, and operations all connected and working together. Most agencies hand you deliverables. We hand you a running system.",
    order: 1,
  },
  {
    question: "How long does it take to build our system?",
    answer:
      "It depends on what you need. A focused e-commerce store build typically takes 2–4 weeks. A full brand + store + marketing system takes 4–8 weeks. We'll give you a clear timeline after our first call.",
    order: 2,
  },
  {
    question: "Do you work with businesses outside the US?",
    answer:
      "Yes. We've worked with brands across the US, Canada, UAE, Pakistan, and other markets. Our systems are built to scale across geographies — not locked into one market.",
    order: 3,
  },
  {
    question: "What do you need from us to get started?",
    answer:
      "Just your time and context. We start with a discovery call to understand your brand, products, goals, and current situation. From there we map out your system and you approve it before we build anything.",
    order: 4,
  },
  {
    question: "Can I start with just one service?",
    answer:
      "Yes. While our full system gives the best results, we can start with a focused engagement — a store build, a Meta Ads setup, or brand identity work — and expand from there as you grow.",
    order: 5,
  },
  {
    question: "What platforms do you build on?",
    answer:
      "Primarily Shopify and WooCommerce for storefronts, Amazon for marketplace presence, Meta and Google for paid traffic, and tools like Zapier and Make for automation. We use what works best for your brand — not what we're most comfortable with.",
    order: 6,
  },
];

const services = [
  {
    icon: "🏗️",
    title: "Brand Foundation & Product Development",
    items: [
      "Brand strategy & positioning",
      "Product research & validation",
      "Offer creation & pricing strategy",
      "Competitor & market analysis",
    ],
    order: 1,
  },
  {
    icon: "🛒",
    title: "E-commerce Infrastructure & Store Setup",
    items: [
      "Shopify / WooCommerce development",
      "Payment gateway & logistics integration",
      "Conversion-focused UI/UX",
      "Speed & SEO optimization",
    ],
    order: 2,
  },
  {
    icon: "📊",
    title: "Performance Marketing & Growth Systems",
    items: [
      "Meta (Facebook/Instagram) Ads",
      "Google Ads & YouTube Ads",
      "PPC for Amazon",
      "Funnel building & optimization",
    ],
    order: 3,
  },
  {
    icon: "🎬",
    title: "Content, Creatives & Brand Presence",
    items: [
      "Ad creatives (static + video)",
      "Social media content calendar",
      "Listing images, A+ Content & Brand story",
      "UGC & influencer-style content",
    ],
    order: 4,
  },
  {
    icon: "🎧",
    title: "Business Operations & Support Systems",
    items: [
      "Order & inventory management",
      "Customer support workflows",
      "Returns & refund systems",
      "Supplier coordination",
    ],
    order: 5,
  },
  {
    icon: "🤖",
    title: "AI Automation & Workflow Systems",
    items: [
      "AI-powered marketing automation",
      "Chatbots & lead qualification",
      "Workflow automation (Zapier, Make)",
      "Email & SMS automation",
    ],
    order: 6,
  },
];

// No testimonials existed on the old site -- starting empty.
// Add your first one from /admin/testimonials once the site is live.
const testimonials = [];

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is missing. Fill in .env.local first.");
    process.exit(1);
  }

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(process.env.MONGODB_DB || "crccore");

  const collections = { caseStudies, blogPosts, faqs, services, testimonials };

  for (const [name, docs] of Object.entries(collections)) {
    await db.collection(name).deleteMany({});
    if (docs.length > 0) {
      await db.collection(name).insertMany(docs);
    }
    console.log(`Seeded ${docs.length} document(s) into "${name}"`);
  }

  await client.close();
  console.log("Done. Your database now has the real CRC Core content.");
}

seed();
