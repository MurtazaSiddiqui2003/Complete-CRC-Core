import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "../../../../lib/mongodb";
import { readJson } from "../../../../lib/apiValidation";

const STATUSES = ["New", "Contacted", "Consultation", "Booked", "Closed"];

export async function PATCH(request, { params }) {
  if (!ObjectId.isValid(params.id)) return NextResponse.json({ error: "Invalid inquiry id." }, { status: 400 });
  const parsed = await readJson(request);
  if (!parsed.ok) return parsed.response;
  if (!STATUSES.includes(parsed.body.status)) return NextResponse.json({ error: "Invalid status." }, { status: 400 });

  const db = await getDb();
  const result = await db.collection("inquiries").updateOne(
    { _id: new ObjectId(params.id) },
    { $set: { status: parsed.body.status, updatedAt: new Date() } }
  );
  if (!result.matchedCount) return NextResponse.json({ error: "Inquiry not found." }, { status: 404 });
  return NextResponse.json({ ok: true });
}
