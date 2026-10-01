import { NextResponse } from "next/server";
import { getDb } from "../../../lib/mongodb";
import { readJson, requiredString, optionalString, safeOrder } from "../../../lib/apiValidation";

export async function GET() {
  const db = await getDb();
  const items = await db.collection("testimonials").find({}).sort({ order: 1 }).toArray();
  return NextResponse.json(items);
}

export async function POST(request) {
  const parsed = await readJson(request);
  if (!parsed.ok) return parsed.response;
  const name = requiredString(parsed.body.name, "name", 120);
  const quote = requiredString(parsed.body.quote, "quote", 3000);
  if (!name.ok || !quote.ok) {
    return NextResponse.json({ error: name.error || quote.error }, { status: 400 });
  }

  const db = await getDb();
  const result = await db.collection("testimonials").insertOne({
    name: name.value,
    role: optionalString(parsed.body.role, 200),
    quote: quote.value,
    order: safeOrder(parsed.body.order),
    createdAt: new Date(),
  });
  return NextResponse.json({ ok: true, id: result.insertedId });
}