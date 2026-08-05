import { NextResponse } from "next/server";
import { GridFSBucket } from "mongodb";
import { getDb } from "../../../lib/mongodb";

// Videos are stored using GridFS -- MongoDB's system for files bigger
// than a normal 16MB document limit. It splits the file into small
// chunks behind the scenes, but from our side it's still "just MongoDB",
// same database, no extra account.
//
// This route is for UPLOADING. See /api/video/[id]/route.js for how
// videos get served back out (with proper seeking/scrubbing support).

const MAX_SIZE = 25 * 1024 * 1024; // 25MB -- generous for a ~30 second clip

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!file) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      {
        error:
          "That video is too large (over 25MB). Keep clips short (~30 seconds) and export at 720p or lower to stay under the limit.",
      },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const db = await getDb();
  const bucket = new GridFSBucket(db, { bucketName: "videos" });

  const uploadStream = bucket.openUploadStream(file.name, {
    contentType: file.type || "video/mp4",
  });

  await new Promise((resolve, reject) => {
    uploadStream.end(buffer, (err) => (err ? reject(err) : resolve()));
  });

  return NextResponse.json({ id: uploadStream.id.toString() });
}
