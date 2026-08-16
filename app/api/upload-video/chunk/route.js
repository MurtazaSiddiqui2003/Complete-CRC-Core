import { NextResponse } from "next/server";
import { getDb } from "../../../../lib/mongodb";

// Part 1 of 2 for uploading a video (see finalize/route.js for part 2).
//
// WHY THIS EXISTS: Vercel's free hosting plan rejects any single request
// bigger than ~4.5MB, before our code even sees it. A 20-30 second video
// is almost always bigger than that. So instead of sending the whole
// file in one request, the browser slices it into small pieces (a few
// MB each) and sends them one at a time to THIS route, which just saves
// each piece. Once every piece has arrived, /finalize stitches them back
// together into one real video file.

export async function POST(request) {
  const formData = await request.formData();
  const chunk = formData.get("chunk");
  const uploadId = formData.get("uploadId");
  const index = formData.get("index");

  if (!chunk || !uploadId || index === null) {
    return NextResponse.json({ error: "Missing chunk data." }, { status: 400 });
  }

  const buffer = Buffer.from(await chunk.arrayBuffer());

  const db = await getDb();
  await db.collection("videoUploadChunks").insertOne({
    uploadId: String(uploadId),
    index: Number(index),
    data: buffer,
    createdAt: new Date(),
  });

  return NextResponse.json({ ok: true });
}
