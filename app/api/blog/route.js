import { NextResponse } from "next/server";
import { getDb } from "../../../lib/mongodb";
import { readJson, requiredString, optionalString, safeOrder } from "../../../lib/apiValidation";

export async function GET() {
  const db = await getDb();
  const items = await db.collection("blogPosts").find({}).sort({ order: 1 }).toArray();
  return NextResponse.json(items);
}

export async function POST(request) {
  const parsed = await readJson(request);
  if (!parsed.ok) return parsed.response;
  const title = requiredString(parsed.body.title, "title", 200);
  const content = requiredString(parsed.body.content, "content", 30000);
  if (!title.ok || !content.ok) {
    return NextResponse.json({ error: title.error || content.error }, { status: 400 });
  }

  const db = await getDb();
  const result = await db.collection("blogPosts").insertOne({
    title: title.value,
    category: optionalString(parsed.body.category, 100),
    excerpt: optionalString(parsed.body.excerpt, 1000),
    content: content.value,
    date: optionalString(parsed.body.date, 100),
    emoji: optionalString(parsed.body.emoji, 20) || "📝",
    order: safeOrder(parsed.body.order),
    createdAt: new Date(),
  });
  return NextResponse.json({ ok: true, id: result.insertedId });
}