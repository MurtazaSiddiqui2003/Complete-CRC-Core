// This file's only job: open ONE connection to MongoDB and reuse it
// everywhere else in the app, instead of reconnecting on every request.
//
// Every API route and every page that needs data imports `getDb()` from
// here. You should basically never need to touch this file.

import { MongoClient } from "mongodb";

// Everything below only runs the FIRST time getDb() is actually called by
// a request -- never at import/build time. This matters because Vercel's
// build step scans/imports every file to figure out your routes, and if
// this file threw an error just from being imported (like it used to),
// it could fail the whole deployment even before any real request came in.
let clientPromise;
let indexesPromise;

async function ensureIndexes(db) {
  if (!indexesPromise) {
    indexesPromise = Promise.all([
      db.collection("caseStudies").createIndex({ order: 1 }),
      db.collection("blogPosts").createIndex({ order: 1 }),
      db.collection("faqs").createIndex({ order: 1 }),
      db.collection("services").createIndex({ order: 1 }),
      db.collection("portfolioSites").createIndex({ order: 1 }),
      db.collection("testimonials").createIndex({ order: 1 }),
    ]).catch((error) => {
      indexesPromise = null;
      throw error;
    });
  }
  return indexesPromise;
}

async function getClientPromise() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error(
      "Missing MONGODB_URI. Add it in .env.local (locally) or in your Vercel project's Environment Variables (when deployed)."
    );
  }

  if (!clientPromise) {
    // In development, Next.js reloads files a lot, which would normally
    // open a new MongoDB connection every time. We stash the connection
    // on `global` so it survives those reloads and we don't run out of
    // connections.
    if (process.env.NODE_ENV === "development") {
      if (!global._mongoClientPromise) {
        global._mongoClientPromise = new MongoClient(uri).connect();
      }
      clientPromise = global._mongoClientPromise;
    } else {
      clientPromise = new MongoClient(uri).connect();
    }
  }

  return clientPromise;
}

// Call this from any server file to get a ready-to-use database handle:
//   const db = await getDb();
//   const posts = await db.collection("blogPosts").find().toArray();
export async function getDb() {
  const client = await getClientPromise();
  const dbName = process.env.MONGODB_DB || "crccore";
  const db = client.db(dbName);
  await ensureIndexes(db);
  return db;
}
