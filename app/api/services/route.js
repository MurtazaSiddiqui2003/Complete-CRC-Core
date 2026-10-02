import { NextResponse } from "next/server";
import { getDb } from "../../../lib/mongodb";
import { readJson, requiredString, optionalString, safeOrder } from "../../../lib/apiValidation";

export async function GET() {
  const db = await getDb();
  const items = await db.collection("services").find({}).sort({ order: 1 }).toArray();
  return NextResponse.json(items);
}

export async function POST(request) {
  const parsed = await readJson(request);
  if (!parsed.ok) return parsed.response;
  const title = requiredString(parsed.body.title, "title", 200);
  if (!title.ok) return NextResponse.json({ error: title.error }, { status: 400 });

  const db = await getDb();
  const result = await db.collection("services").insertOne({
    icon: optionalString(parsed.body.icon, 20) || "⚙️",
    title: title.value,
    items: Array.isArray(parsed.body.items) ? parsed.body.items.filter((x) => typeof x === "string").slice(0, 30).map((x) => x.trim().slice(0, 500)) : [],
    order: safeOrder(parsed.body.order),
    createdAt: new Date(),
  });
  return NextResponse.json({ ok: true, id: result.insertedId });
}