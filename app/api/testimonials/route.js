import { NextResponse } from "next/server";
import { getDb } from "../../../lib/mongodb";

export async function GET() {
  const db = await getDb();
  const items = await db.collection("testimonials").find({}).sort({ order: 1 }).toArray();
  return NextResponse.json(items);
}

export async function POST(request) {
  const body = await request.json();
  const db = await getDb();

  const result = await db.collection("testimonials").insertOne({
    name: body.name || "",
    role: body.role || "",
    quote: body.quote || "",
    order: Number(body.order) || 0,
    createdAt: new Date(),
  });

  return NextResponse.json({ ok: true, id: result.insertedId });
}
