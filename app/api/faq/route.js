import { NextResponse } from "next/server";
import { getDb } from "../../../lib/mongodb";
import { readJson, requiredString, optionalString, safeOrder } from "../../../lib/apiValidation";

export async function GET() {
  const db = await getDb();
  const items = await db.collection("faqs").find({}).sort({ order: 1 }).toArray();
  return NextResponse.json(items);
}

export async function POST(request) {
  const parsed = await readJson(request);
  if (!parsed.ok) return parsed.response;
  const question = requiredString(parsed.body.question, "question", 500);
  const answer = requiredString(parsed.body.answer, "answer", 10000);
  if (!question.ok || !answer.ok) {
    return NextResponse.json({ error: question.error || answer.error }, { status: 400 });
  }

  const db = await getDb();
  const result = await db.collection("faqs").insertOne({
    question: question.value,
    answer: answer.value,
    order: safeOrder(parsed.body.order),
    createdAt: new Date(),
  });
  return NextResponse.json({ ok: true, id: result.insertedId });
}