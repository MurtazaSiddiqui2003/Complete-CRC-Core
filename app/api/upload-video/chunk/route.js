import { NextResponse } from "next/server";
import { getDb } from "../../../../lib/mongodb";

const CHUNK_SIZE = 4 * 1024 * 1024;
const MAX_SIZE = 25 * 1024 * 1024;
const MAX_CHUNKS = Math.ceil(MAX_SIZE / CHUNK_SIZE);

function validUploadId(value) {
  return typeof value === "string" && /^[A-Za-z0-9_-]{8,100}$/.test(value);
}

export async function POST(request) {
  const formData = await request.formData();
  const chunk = formData.get("chunk");
  const uploadId = formData.get("uploadId");
  const index = Number(formData.get("index"));

  if (!(chunk instanceof File) || !validUploadId(uploadId) || !Number.isInteger(index)) {
    return NextResponse.json({ error: "Invalid upload chunk." }, { status: 400 });
  }

  if (index < 0 || index >= MAX_CHUNKS || chunk.size > CHUNK_SIZE) {
    return NextResponse.json({ error: "Invalid chunk size or index." }, { status: 400 });
  }

  const db = await getDb();
  const collection = db.collection("videoUploadChunks");

  await collection.createIndex(
    { createdAt: 1 },
    { expireAfterSeconds: 3600 }
  );
  await collection.createIndex(
    { uploadId: 1, index: 1 },
    { unique: true }
  );

  const data = Buffer.from(await chunk.arrayBuffer());

  await collection.updateOne(
    { uploadId, index },
    {
      $set: {
        data,
        size: data.length,
        createdAt: new Date(),
      },
      $setOnInsert: { uploadId, index },
    },
    { upsert: true }
  );

  return NextResponse.json({ ok: true });
}
