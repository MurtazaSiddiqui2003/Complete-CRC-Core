import { NextResponse } from "next/server";
import { getDb } from "../../../lib/mongodb";

export async function GET() {
  const db = await getDb();
  const items = await db.collection("portfolioSites").find({}).sort({ order: 1 }).toArray();
  return NextResponse.json(items);
}

export async function POST(request) {
  const body = await request.json();
  const db = await getDb();

  const result = await db.collection("portfolioSites").insertOne({
    title: body.title || "",
    url: body.url || "",
    category: body.category || "",
    description: body.description || "",
    embeddable: body.embeddable !== false,
    order: Number(body.order) || 0,
    createdAt: new Date(),
  });

  return NextResponse.json({ ok: true, id: result.insertedId });
}
