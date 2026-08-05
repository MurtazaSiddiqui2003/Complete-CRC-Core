import { NextResponse } from "next/server";
import { getDb } from "../../../lib/mongodb";

// GET  /api/case-studies      -> used by the homepage AND the admin list page
// POST /api/case-studies      -> used by the admin "add new" form (login required)

export async function GET() {
  const db = await getDb();
  const items = await db
    .collection("caseStudies")
    .find({})
    .sort({ order: 1 })
    .toArray();

  return NextResponse.json(items);
}

export async function POST(request) {
  const body = await request.json();

  const db = await getDb();
  const result = await db.collection("caseStudies").insertOne({
    title: body.title || "",
    badge: body.badge || "",
    market: body.market || "",
    points: body.points || [],
    image: body.image || "",
    videoFileId: body.videoFileId || "",
    videoUrl: body.videoUrl || "/videos/reel.mp4",
    featured: Boolean(body.featured),
    order: Number(body.order) || 0,
    createdAt: new Date(),
  });

  return NextResponse.json({ ok: true, id: result.insertedId });
}
