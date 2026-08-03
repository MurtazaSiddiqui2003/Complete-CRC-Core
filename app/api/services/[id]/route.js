import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "../../../../lib/mongodb";

export async function PUT(request, { params }) {
  const body = await request.json();
  const db = await getDb();

  await db.collection("services").updateOne(
    { _id: new ObjectId(params.id) },
    {
      $set: {
        icon: body.icon || "⚙️",
        title: body.title || "",
        items: body.items || [],
        order: Number(body.order) || 0,
      },
    }
  );

  return NextResponse.json({ ok: true });
}

export async function DELETE(request, { params }) {
  const db = await getDb();
  await db.collection("services").deleteOne({ _id: new ObjectId(params.id) });
  return NextResponse.json({ ok: true });
}
