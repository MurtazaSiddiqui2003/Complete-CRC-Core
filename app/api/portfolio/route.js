import { NextResponse } from "next/server";
import { getDb } from "../../../lib/mongodb";
import { readJson, requiredString, optionalString, safeOrder } from "../../../lib/apiValidation";

export async function GET() {
  const db = await getDb();
  const items = await db.collection("portfolioSites").find({}).sort({ order: 1 }).toArray();
  return NextResponse.json(items);
}

export async function POST(request) {
  const parsed = await readJson(request);
  if (!parsed.ok) return parsed.response;
  const title = requiredString(parsed.body.title, "title", 200);
  const url = requiredString(parsed.body.url, "url", 2000);
  if (!title.ok || !url.ok) {
    return NextResponse.json({ error: title.error || url.error }, { status: 400 });
  }

  const db = await getDb();
  const result = await db.collection("portfolioSites").insertOne({
    title: title.value,
    url: url.value,
    category: optionalString(parsed.body.category, 100),
    description: optionalString(parsed.body.description, 2000),
    embeddable: parsed.body.embeddable !== false,
    order: safeOrder(parsed.body.order),
    createdAt: new Date(),
  });
  return NextResponse.json({ ok: true, id: result.insertedId });
}