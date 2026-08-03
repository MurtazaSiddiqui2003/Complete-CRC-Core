// This file's only job: open ONE connection to MongoDB and reuse it
// everywhere else in the app, instead of reconnecting on every request.
//
// Every API route and every page that needs data imports `getDb()` from
// here. You should basically never need to touch this file.

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "crccore";

if (!uri) {
  throw new Error(
    "Missing MONGODB_URI. Copy .env.local.example to .env.local and fill it in."
  );
}

// In development, Next.js reloads files a lot, which would normally open a
// new MongoDB connection every time. We stash the connection on `global`
// so it survives those reloads and we don't run out of connections.
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  const client = new MongoClient(uri);
  clientPromise = client.connect();
}

// Call this from any server file to get a ready-to-use database handle:
//   const db = await getDb();
//   const posts = await db.collection("blogPosts").find().toArray();
export async function getDb() {
  const client = await clientPromise;
  return client.db(dbName);
}
