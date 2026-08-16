import { NextResponse } from "next/server";
import { GridFSBucket } from "mongodb";
import { getDb } from "../../../../lib/mongodb";

// Part 2 of 2 -- see chunk/route.js for why this exists.
//
// Called once the browser has finished sending every piece of the video.
// This reads all those pieces back out in the right order, glues them
// into one file, and saves THAT into GridFS (MongoDB's system for
// storing files bigger than a normal 16MB document). The temporary
// pieces are deleted afterward so they don't sit around using storage.

const MAX_TOTAL_SIZE = 60 * 1024 * 1024; // 60MB -- comfortable room for a ~30-60 second clip

export async function POST(request) {
  const { uploadId, totalChunks, filename, contentType } = await request.json();

  if (!uploadId || !totalChunks) {
    return NextResponse.json({ error: "Missing upload info." }, { status: 400 });
  }

  const db = await getDb();

  const chunks = await db
    .collection("videoUploadChunks")
    .find({ uploadId: String(uploadId) })
    .sort({ index: 1 })
    .toArray();

  if (chunks.length !== Number(totalChunks)) {
    return NextResponse.json(
      { error: "Some parts of the video didn't arrive. Please try uploading again." },
      { status: 400 }
    );
  }

  // MongoDB can hand back stored binary data either as a plain Buffer or
  // wrapped in a BSON "Binary" object depending on the driver version --
  // this handles both so chunks always concatenate correctly.
  const combined = Buffer.concat(
    chunks.map((c) => (Buffer.isBuffer(c.data) ? c.data : Buffer.from(c.data.buffer)))
  );

  if (combined.length > MAX_TOTAL_SIZE) {
    await db.collection("videoUploadChunks").deleteMany({ uploadId: String(uploadId) });
    return NextResponse.json(
      { error: "That video is too large even after combining (over 60MB). Try a shorter or more compressed clip." },
      { status: 400 }
    );
  }

  const bucket = new GridFSBucket(db, { bucketName: "videos" });
  const uploadStream = bucket.openUploadStream(filename || "video.mp4", {
    contentType: contentType || "video/mp4",
  });

  await new Promise((resolve, reject) => {
    uploadStream.end(combined, (err) => (err ? reject(err) : resolve()));
  });

  // Clean up the temporary pieces now that the real file is saved.
  await db.collection("videoUploadChunks").deleteMany({ uploadId: String(uploadId) });

  return NextResponse.json({ id: uploadStream.id.toString() });
}
