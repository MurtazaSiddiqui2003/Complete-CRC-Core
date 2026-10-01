import { NextResponse } from "next/server";
import { GridFSBucket } from "mongodb";
import { getDb } from "../../../../lib/mongodb";

const CHUNK_SIZE = 4 * 1024 * 1024;
const MAX_SIZE = 25 * 1024 * 1024;
const MAX_CHUNKS = Math.ceil(MAX_SIZE / CHUNK_SIZE);

function validUploadId(value) {
  return typeof value === "string" && /^[A-Za-z0-9_-]{8,100}$/.test(value);
}

function safeFilename(value) {
  const name = typeof value === "string"
    ? value.split(/[\\/]/).pop()
    : "video.mp4";
  return (name || "video.mp4")
    .replace(/[^A-Za-z0-9._-]/g, "_")
    .slice(0, 120);
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { uploadId, totalChunks, filename, contentType } = body || {};

  if (
    !validUploadId(uploadId) ||
    !Number.isInteger(totalChunks) ||
    totalChunks < 1 ||
    totalChunks > MAX_CHUNKS
  ) {
    return NextResponse.json({ error: "Invalid upload information." }, { status: 400 });
  }

  if (typeof contentType !== "string" || !contentType.startsWith("video/")) {
    return NextResponse.json({ error: "Only video files are allowed." }, { status: 400 });
  }

  const db = await getDb();
  const collection = db.collection("videoUploadChunks");

  const chunks = await collection
    .find({ uploadId })
    .sort({ index: 1 })
    .toArray();

  if (
    chunks.length !== totalChunks ||
    chunks.some((chunk, index) => chunk.index !== index)
  ) {
    return NextResponse.json(
      { error: "Some upload parts are missing. Please upload the video again." },
      { status: 400 }
    );
  }

  const totalSize = chunks.reduce((sum, chunk) => sum + chunk.size, 0);
  if (totalSize > MAX_SIZE) {
    await collection.deleteMany({ uploadId });
    return NextResponse.json(
      { error: "That video is too large. Maximum size is 25MB." },
      { status: 400 }
    );
  }

  const bucket = new GridFSBucket(db, { bucketName: "videos" });
  const uploadStream = bucket.openUploadStream(safeFilename(filename), {
    contentType,
    metadata: { uploadedAt: new Date() },
  });

  try {
    for (const chunk of chunks) {
      uploadStream.write(chunk.data);
    }

    uploadStream.end();

    await new Promise((resolve, reject) => {
      uploadStream.once("finish", resolve);
      uploadStream.once("error", reject);
    });
  } catch (error) {
    try {
      uploadStream.destroy(error);
    } catch {}

    await collection.deleteMany({ uploadId });
    return NextResponse.json(
      { error: "The server couldn't assemble that video." },
      { status: 500 }
    );
  }

  await collection.deleteMany({ uploadId });

  return NextResponse.json({
    id: uploadStream.id.toString(),
    size: totalSize,
  });
}
