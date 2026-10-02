import { NextResponse } from "next/server";
import { getDb } from "../../../../lib/mongodb";
import { getObjectId, readJson, requiredString, optionalString, safeOrder, safeStringArray } from "../../../../lib/apiValidation";

export async function PUT(request, { params }) {
  const id = getObjectId(params.id);
  if (!id) return NextResponse.json({ error: "Invalid service id." }, { status: 400 });
  const parsed = await readJson(request);
  if (!parsed.ok) return parsed.response;
  const title = requiredString(parsed.body.title, "title", 200);
  if (!title.ok) return NextResponse.json({ error: title.error }, { status: 400 });

  const db = await getDb();
  const result = await db.collection("services").updateOne(
    { _id: id },
    { $set: {
      icon: optionalString(parsed.body.icon, 20) || "⚙️",
      title: title.value,
      items: safeStringArray(parsed.body.items),
      order: safeOrder(parsed.body.order)
    } }
  );
  if (!result.matchedCount) return NextResponse.json({ error: "Service not found." }, { status: 404 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(request, { params }) {
  const id = getObjectId(params.id);
  if (!id) return NextResponse.json({ error: "Invalid service id." }, { status: 400 });
  const db = await getDb();
  const result = await db.collection("services").deleteOne({ _id: id });
  if (!result.deletedCount) return NextResponse.json({ error: "Service not found." }, { status: 404 });
  return NextResponse.json({ ok: true });
}