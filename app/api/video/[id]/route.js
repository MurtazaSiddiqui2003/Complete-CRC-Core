import { GridFSBucket, ObjectId } from "mongodb";
import { getDb } from "../../../../lib/mongodb";

// Serves a video that was uploaded through /api/upload-video.
//
// The "Range" header handling below is important, not optional --
// browsers (especially Safari) request videos in chunks so they can
// start playing before the whole file downloads, and so scrubbing the
// progress bar works. Without this, videos would either fail to play
// or you couldn't skip around in them.

export async function GET(request, { params }) {
  const db = await getDb();
  const bucket = new GridFSBucket(db, { bucketName: "videos" });

  let fileId;
  try {
    fileId = new ObjectId(params.id);
  } catch {
    return new Response("Not found", { status: 404 });
  }

  const fileDoc = await db.collection("videos.files").findOne({ _id: fileId });
  if (!fileDoc) {
    return new Response("Not found", { status: 404 });
  }

  const fileSize = fileDoc.length;
  const contentType = fileDoc.contentType || "video/mp4";
  const range = request.headers.get("range");

  // Turns a Node.js readable stream (what GridFS gives us) into the Web
  // Streams format that Next.js Response objects expect.
  function toWebStream(nodeStream) {
    return new ReadableStream({
      start(controller) {
        nodeStream.on("data", (chunk) => controller.enqueue(chunk));
        nodeStream.on("end", () => controller.close());
        nodeStream.on("error", (err) => controller.error(err));
      },
      cancel() {
        nodeStream.destroy();
      },
    });
  }

  if (range) {
    // Example header: "bytes=0-" or "bytes=1000000-2000000"
    const [startStr, endStr] = range.replace(/bytes=/, "").split("-");
    const start = parseInt(startStr, 10);
    const end = endStr ? parseInt(endStr, 10) : fileSize - 1;

    const downloadStream = bucket.openDownloadStream(fileId, { start, end: end + 1 });

    return new Response(toWebStream(downloadStream), {
      status: 206, // "Partial Content"
      headers: {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": String(end - start + 1),
        "Content-Type": contentType,
      },
    });
  }

  // No range requested -- send the whole file.
  const downloadStream = bucket.openDownloadStream(fileId);
  return new Response(toWebStream(downloadStream), {
    headers: {
      "Content-Length": String(fileSize),
      "Content-Type": contentType,
      "Accept-Ranges": "bytes",
    },
  });
}
