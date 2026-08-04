// Small helper functions the public page uses to pull content straight
// from MongoDB on the server (fast, no extra network hop through the API).
// The admin panel, on the other hand, talks to /api/* over fetch() because
// it runs in the browser and needs to add/edit/delete things interactively.

import { getDb } from "./mongodb";

export async function getCaseStudies() {
  const db = await getDb();
  const items = await db.collection("caseStudies").find({}).sort({ order: 1 }).toArray();
  return JSON.parse(JSON.stringify(items)); // strips Mongo's ObjectId into a plain string
}

export async function getBlogPosts() {
  const db = await getDb();
  const items = await db.collection("blogPosts").find({}).sort({ order: 1 }).toArray();
  return JSON.parse(JSON.stringify(items));
}

// Used by the individual blog post page (/blog/[id]).
export async function getBlogPostById(id) {
  const { ObjectId } = await import("mongodb");
  // A malformed or old/deleted id shouldn't crash the page -- just
  // treat it as "not found" and let the page show a friendly message.
  let objectId;
  try {
    objectId = new ObjectId(id);
  } catch {
    return null;
  }

  const db = await getDb();
  const post = await db.collection("blogPosts").findOne({ _id: objectId });
  return post ? JSON.parse(JSON.stringify(post)) : null;
}

export async function getFaqs() {
  const db = await getDb();
  const items = await db.collection("faqs").find({}).sort({ order: 1 }).toArray();
  return JSON.parse(JSON.stringify(items));
}

export async function getServices() {
  const db = await getDb();
  const items = await db.collection("services").find({}).sort({ order: 1 }).toArray();
  return JSON.parse(JSON.stringify(items));
}

export async function getTestimonials() {
  const db = await getDb();
  const items = await db.collection("testimonials").find({}).sort({ order: 1 }).toArray();
  return JSON.parse(JSON.stringify(items));
}
