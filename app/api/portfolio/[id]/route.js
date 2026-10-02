import { NextResponse } from "next/server";
import { getDb } from "../../../../lib/mongodb";
import { getObjectId, readJson, requiredString, optionalString, safeOrder } from "../../../../lib/apiValidation";

export async function PUT(request, { params }) {
  const id = getObjectId(params.id);
  if (!id) return NextResponse.json({ error: "Invalid portfolio id." }, { status: 400 });
  const parsed = await readJson(request);
  if (!parsed.ok) return parsed.response;
  const title = requiredString(parsed.body.title, "title", 200);
  const url = requiredString(parsed.body.url, "url", 2000);
  if (!title.ok || !url.ok) return NextResponse.json({ error: title.error || url.error }, { status: 400 });

  const db = await getDb();
  const result = await db.collection("portfolioSites").updateOne(
    { _id: id },
    { $set: {
      title: title.value,
      url: url.value,
      category: optionalString(parsed.body.category, 100),
      description: optionalString(parsed.body.description, 2000),
      embeddable: parsed.body.embeddable !== false,
      order: safeOrder(parsed.body.order)
    } }
  );
  if (!result.matchedCount) return NextResponse.json({ error: "Portfolio item not found." }, { status: 404 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(request, { params }) {
  const id = getObjectId(params.id);
  if (!id) return NextResponse.json({ error: "Invalid portfolio id." }, { status: 400 });
  const db = await getDb();
  const result = await db.collection("portfolioSites").deleteOne({ _id: id });
  if (!result.deletedCount) return NextResponse.json({ error: "Portfolio item not found." }, { status: 404 });
  return NextResponse.json({ ok: true });
}