export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getDb } from "../../../lib/mongodb";
import { readJson, optionalString } from "../../../lib/apiValidation";

const DEFAULTS = {
  heroEyebrow: "The Center That Scales Everything",
  heroTitle: "A Complete Brand & E-Commerce System",
  heroDescription: "We build scalable systems for brands that want real growth. Marketing. Operations. Sourcing. All working together.",
  heroPrimaryCta: "Book a Consultation",
  heroSecondaryCta: "See Our Work",
  aboutEyebrow: "Who We Are",
  aboutTitle: "We are not a service agency. We are a system builder.",
  aboutDescription: "CRC Core combines marketing, operations, and sourcing into one unified system designed for scalable growth — not fragmented freelancers and disconnected tools.",
  storyEyebrow: "Our Story",
  storyTitle: "The CRC Core Origin",
  storyDescription: "We started with a simple observation — great products were dying inside broken systems. We built CRC Core to fix that.",
  problemEyebrow: "The Real Problem",
  problemTitle: "Brands don't fail because of bad products.",
  problemDescription: "They fail because of broken systems. Random efforts with no structure lead to one place — stuck.",
  contactEyebrow: "Ready to Scale?",
  contactTitle: "One system. Built to scale.",
  contactDescription: "Tell us about your brand and let's talk about what it would take to build your complete growth system.",
  footerDescription: "We build scalable systems for brands that want real growth. Marketing. Operations. Sourcing — all working together.",
  footerTagline: "The Center That Scales Everything",
};

function clean(body) {
  return Object.fromEntries(Object.keys(DEFAULTS).map((field) => [
    field,
    optionalString(body?.[field], 1000),
  ]));
}

export async function GET() {
  const db = await getDb();
  const saved = await db.collection("siteContent").findOne({ key: "homepage" });
  return NextResponse.json({ ...DEFAULTS, ...(saved || {}) });
}

export async function PUT(request) {
  const parsed = await readJson(request);
  if (!parsed.ok) return parsed.response;
  const values = clean(parsed.body);
  const db = await getDb();
  await db.collection("siteContent").updateOne(
    { key: "homepage" },
    { $set: { ...values, key: "homepage", updatedAt: new Date() } },
    { upsert: true }
  );
  return NextResponse.json({ ok: true, ...values });
}
