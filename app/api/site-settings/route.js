import { NextResponse } from "next/server";
import { getDb } from "../../../lib/mongodb";
import { readJson, optionalString } from "../../../lib/apiValidation";

const DEFAULTS = {
  siteName: "CRC Core",
  tagline: "A Complete Brand & E-Commerce Growth System",
  email: "",
  phone: "",
  location: "",
  instagram: "",
  facebook: "",
  linkedin: "",
  whatsapp: "",
  metaTitle: "CRC Core — A Complete Brand & E-Commerce Growth System",
  metaDescription: "",
  ogImage: "/images/logo-wide.png",
};

function clean(body) {
  const fields = Object.keys(DEFAULTS);
  return Object.fromEntries(fields.map((field) => [field, optionalString(body[field], field === "metaDescription" ? 1000 : 500)]));
}

export async function GET() {
  const db = await getDb();
  const saved = await db.collection("siteSettings").findOne({ key: "global" });
  return NextResponse.json({ ...DEFAULTS, ...(saved || {}) });
}

export async function PUT(request) {
  const parsed = await readJson(request);
  if (!parsed.ok) return parsed.response;
  const values = clean(parsed.body);
  const db = await getDb();
  await db.collection("siteSettings").updateOne(
    { key: "global" },
    { $set: { ...values, key: "global", updatedAt: new Date() } },
    { upsert: true }
  );
  return NextResponse.json({ ok: true, ...values });
}
