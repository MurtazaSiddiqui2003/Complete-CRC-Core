import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "../../../../lib/mongodb";

// PUT    /api/case-studies/:id   -> edit an existing case study
// DELETE /api/case-studies/:id   -> remove a case study

export async function PUT(request, { params }) {
  const body = await request.json();
  const db = await getDb();

  await db.collection("caseStudies").updateOne(
    { _id: new ObjectId(params.id) },
    {
      $set: {
        title: body.title || "",
        badge: body.badge || "",
        market: body.market || "",
        points: body.points || [],
        image: body.image || "",
        videoUrl: body.videoUrl || "/videos/reel.mp4",
        featured: Boolean(body.featured),
        order: Number(body.order) || 0,
      },
    }
  );

  return NextResponse.json({ ok: true });
}

export async function DELETE(request, { params }) {
  const db = await getDb();
  await db.collection("caseStudies").deleteOne({ _id: new ObjectId(params.id) });
  return NextResponse.json({ ok: true });
}
