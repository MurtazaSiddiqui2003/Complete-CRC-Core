import { NextResponse } from "next/server";
import { ObjectId, GridFSBucket } from "mongodb";
import { getDb } from "../../../../lib/mongodb";

// PUT    /api/case-studies/:id   -> edit an existing case study
// DELETE /api/case-studies/:id   -> remove a case study

// Deletes a previously-uploaded video from GridFS storage. Called
// whenever a video gets replaced or its case study gets deleted, so
// old, unused clips don't sit around eating your free storage tier.
async function deleteVideoFile(db, videoFileId) {
  if (!videoFileId) return;
  try {
    const bucket = new GridFSBucket(db, { bucketName: "videos" });
    await bucket.delete(new ObjectId(videoFileId));
  } catch {
    // If it's already gone or the id is bad, there's nothing to clean up.
  }
}

export async function PUT(request, { params }) {
  const body = await request.json();
  const db = await getDb();

  const existing = await db.collection("caseStudies").findOne({ _id: new ObjectId(params.id) });

  // If a new video was uploaded (or the video was removed) and there
  // was a different one stored before, delete the old one.
  if (existing?.videoFileId && existing.videoFileId !== body.videoFileId) {
    await deleteVideoFile(db, existing.videoFileId);
  }

  await db.collection("caseStudies").updateOne(
    { _id: new ObjectId(params.id) },
    {
      $set: {
        title: body.title || "",
        badge: body.badge || "",
        market: body.market || "",
        points: body.points || [],
        image: body.image || "",
        videoFileId: body.videoFileId || "",
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

  const existing = await db.collection("caseStudies").findOne({ _id: new ObjectId(params.id) });
  if (existing?.videoFileId) {
    await deleteVideoFile(db, existing.videoFileId);
  }

  await db.collection("caseStudies").deleteOne({ _id: new ObjectId(params.id) });
  return NextResponse.json({ ok: true });
}
