import { NextResponse } from "next/server";
import { getDb } from "../../../lib/mongodb";
import { readJson, requiredString, optionalString, safeOrder, safeStringArray } from "../../../lib/apiValidation";

export async function GET() {
  const db = await getDb();
  const items = await db.collection("caseStudies").find({}).sort({ order: 1 }).toArray();
  return NextResponse.json(items);
}

export async function POST(request) {
  const parsed = await readJson(request);
  if (!parsed.ok) return parsed.response;
  const title = requiredString(parsed.body.title, "title", 200);
  if (!title.ok) return NextResponse.json({ error: title.error }, { status: 400 });

  const db = await getDb();
  const result = await db.collection("caseStudies").insertOne({
    title: title.value,
    badge: optionalString(parsed.body.badge, 100),
    market: optionalString(parsed.body.market, 300),
    points: safeStringArray(parsed.body.points),
    image: optionalString(parsed.body.image, 2000),
    videoFileId: optionalString(parsed.body.videoFileId, 100),
    videoUrl: optionalString(parsed.body.videoUrl, 2000) || "/videos/reel.mp4",
    featured: parsed.body.featured === true,
    order: safeOrder(parsed.body.order),
    createdAt: new Date(),
  });
  return NextResponse.json({ ok: true, id: result.insertedId });
}