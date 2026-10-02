import { NextResponse } from "next/server";
import { ObjectId, GridFSBucket } from "mongodb";
import { getDb } from "../../../../lib/mongodb";
import { getObjectId, readJson, requiredString, optionalString, optionalDataUrl, safeOrder, safeStringArray } from "../../../../lib/apiValidation";

async function deleteVideoFile(db, videoFileId) {
  const fileId = getObjectId(videoFileId);
  if (!fileId) return;
  try {
    const bucket = new GridFSBucket(db, { bucketName: "videos" });
    await bucket.delete(fileId);
  } catch {}
}

export async function PUT(request, { params }) {
  const id = getObjectId(params.id);
  if (!id) return NextResponse.json({ error: "Invalid case study id." }, { status: 400 });
  const parsed = await readJson(request);
  if (!parsed.ok) return parsed.response;
  const title = requiredString(parsed.body.title, "title", 200);
  if (!title.ok) return NextResponse.json({ error: title.error }, { status: 400 });

  const db = await getDb();
  const existing = await db.collection("caseStudies").findOne({ _id: id });
  if (!existing) return NextResponse.json({ error: "Case study not found." }, { status: 404 });

  if (existing.videoFileId && existing.videoFileId !== parsed.body.videoFileId) {
    await deleteVideoFile(db, existing.videoFileId);
  }

  await db.collection("caseStudies").updateOne(
    { _id: id },
    { $set: {
      title: title.value,
      badge: optionalString(parsed.body.badge, 100),
      market: optionalString(parsed.body.market, 300),
      points: safeStringArray(parsed.body.points),
      image: optionalDataUrl(parsed.body.image),
      videoFileId: optionalString(parsed.body.videoFileId, 100),
      videoUrl: optionalString(parsed.body.videoUrl, 2000) || "/videos/reel.mp4",
      featured: parsed.body.featured === true,
      order: safeOrder(parsed.body.order)
    } }
  );
  return NextResponse.json({ ok: true });
}

export async function DELETE(request, { params }) {
  const id = getObjectId(params.id);
  if (!id) return NextResponse.json({ error: "Invalid case study id." }, { status: 400 });
  const db = await getDb();
  const existing = await db.collection("caseStudies").findOne({ _id: id });
  if (!existing) return NextResponse.json({ error: "Case study not found." }, { status: 404 });
  if (existing.videoFileId) await deleteVideoFile(db, existing.videoFileId);
  await db.collection("caseStudies").deleteOne({ _id: id });
  return NextResponse.json({ ok: true });
}