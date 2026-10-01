import { NextResponse } from "next/server";
import { getDb } from "../../../../lib/mongodb";
import { getObjectId, readJson, requiredString, optionalString, safeOrder } from "../../../../lib/apiValidation";

export async function PUT(request, { params }) {
  const id = getObjectId(params.id);
  if (!id) return NextResponse.json({ error: "Invalid testimonial id." }, { status: 400 });
  const parsed = await readJson(request);
  if (!parsed.ok) return parsed.response;
  const name = requiredString(parsed.body.name, "name", 120);
  const quote = requiredString(parsed.body.quote, "quote", 3000);
  if (!name.ok || !quote.ok) return NextResponse.json({ error: name.error || quote.error }, { status: 400 });

  const db = await getDb();
  const result = await db.collection("testimonials").updateOne(
    { _id: id },
    { $set: {
      name: name.value,
      role: optionalString(parsed.body.role, 200),
      quote: quote.value,
      order: safeOrder(parsed.body.order)
    } }
  );
  if (!result.matchedCount) return NextResponse.json({ error: "Testimonial not found." }, { status: 404 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(request, { params }) {
  const id = getObjectId(params.id);
  if (!id) return NextResponse.json({ error: "Invalid testimonial id." }, { status: 400 });
  const db = await getDb();
  const result = await db.collection("testimonials").deleteOne({ _id: id });
  if (!result.deletedCount) return NextResponse.json({ error: "Testimonial not found." }, { status: 404 });
  return NextResponse.json({ ok: true });
}