import { NextResponse } from "next/server";
import { getDb } from "../../../../lib/mongodb";
import { getObjectId, readJson, requiredString, safeOrder } from "../../../../lib/apiValidation";

export async function PUT(request, { params }) {
  const id = getObjectId(params.id);
  if (!id) return NextResponse.json({ error: "Invalid FAQ id." }, { status: 400 });
  const parsed = await readJson(request);
  if (!parsed.ok) return parsed.response;
  const question = requiredString(parsed.body.question, "question", 500);
  const answer = requiredString(parsed.body.answer, "answer", 10000);
  if (!question.ok || !answer.ok) return NextResponse.json({ error: question.error || answer.error }, { status: 400 });

  const db = await getDb();
  const result = await db.collection("faqs").updateOne(
    { _id: id },
    { $set: { question: question.value, answer: answer.value, order: safeOrder(parsed.body.order) } }
  );
  if (!result.matchedCount) return NextResponse.json({ error: "FAQ not found." }, { status: 404 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(request, { params }) {
  const id = getObjectId(params.id);
  if (!id) return NextResponse.json({ error: "Invalid FAQ id." }, { status: 400 });
  const db = await getDb();
  const result = await db.collection("faqs").deleteOne({ _id: id });
  if (!result.deletedCount) return NextResponse.json({ error: "FAQ not found." }, { status: 404 });
  return NextResponse.json({ ok: true });
}