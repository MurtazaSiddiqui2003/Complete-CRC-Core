import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

export async function readJson(request) {
  try {
    const body = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return { ok: false, response: NextResponse.json({ error: "Invalid request body." }, { status: 400 }) };
    }
    return { ok: true, body };
  } catch {
    return { ok: false, response: NextResponse.json({ error: "Invalid JSON body." }, { status: 400 }) };
  }
}

export function getObjectId(value) {
  return typeof value === "string" && ObjectId.isValid(value) ? new ObjectId(value) : null;
}

export function requiredString(value, field, maxLength = 5000) {
  if (typeof value !== "string" || !value.trim() || value.length > maxLength) {
    return { ok: false, error: `${field} is required and must be at most ${maxLength} characters.` };
  }
  return { ok: true, value: value.trim() };
}

export function optionalString(value, maxLength = 5000) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export function optionalDataUrl(value, maxLength = 3500000) {
  if (typeof value !== "string" || !value.trim()) return "";
  const trimmed = value.trim();
  if (trimmed.length > maxLength || !/^data:image\/(png|jpe?g|webp|gif);base64,/i.test(trimmed)) {
    return "";
  }
  return trimmed;
}

export function safeOrder(value) {
  const n = Number(value);
  return Number.isFinite(n) ? Math.trunc(n) : 0;
}

export function safeStringArray(value, maxItems = 30, maxLength = 1000) {
  if (!Array.isArray(value)) return [];
  return value.filter((item) => typeof item === "string").slice(0, maxItems).map((item) => item.trim().slice(0, maxLength));
}
