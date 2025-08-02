import { MongoClient } from "mongodb";

let client: MongoClient | null = null;

export async function getDb() {
  const uri = process.env.MONGODB_URI;            // read at runtime
  if (!uri) throw new Error("Missing MONGODB_URI");

  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
  const dbName = process.env.MONGODB_DB || "livingbook";
  return client.db(dbName);
}
