import { NextResponse } from "next/server";
import { getDb } from "../../../lib/mongodb";
import { readJson, requiredString } from "../../../lib/apiValidation";

const STATUSES = ["New", "Contacted", "Consultation", "Booked", "Closed"];

export async function GET() {
  const db = await getDb();
  const items = await db.collection("inquiries").find({}).sort({ createdAt: -1 }).limit(200).toArray();
  return NextResponse.json(items);
}

export async function POST(request) {
  const parsed = await readJson(request);
  if (!parsed.ok) return parsed.response;

  const name = requiredString(parsed.body.name, "name", 120);
  const email = requiredString(parsed.body.email, "email", 254);
  const message = requiredString(parsed.body.message, "message", 5000);
  if (!name.ok) return NextResponse.json({ error: name.error }, { status: 400 });
  if (!email.ok) return NextResponse.json({ error: email.error }, { status: 400 });
  if (!message.ok) return NextResponse.json({ error: message.error }, { status: 400 });

  const emailValue = email.value.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  const inquiry = {
    name: name.value,
    email: emailValue,
    message: message.value,
    status: "New",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const db = await getDb();
  const result = await db.collection("inquiries").insertOne(inquiry);

  let emailDelivered = false;
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
  if (accessKey) {
    try {
      const form = new FormData();
      form.append("access_key", accessKey);
      form.append("name", name.value);
      form.append("email", emailValue);
      form.append("message", message.value);
      form.append("For", "CRC Core");
      const response = await fetch("https://api.web3forms.com/submit", { method: "POST", body: form });
      const data = await response.json().catch(() => ({}));
      emailDelivered = Boolean(data.success);
    } catch {}
  }

  return NextResponse.json({ ok: true, id: result.insertedId, emailDelivered });
}

export { STATUSES };
