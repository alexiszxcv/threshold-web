import { MongoClient, Db } from "mongodb";

let client: MongoClient | null = null;
let connecting: Promise<MongoClient> | null = null;

export async function getClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;         // read at runtime
  if (!uri) throw new Error("Missing MONGODB_URI");

  if (client) return client;
  if (!connecting) {
    connecting = (async () => {
      const c = new MongoClient(uri);
      await c.connect();
      client = c;
      return c;
    })();
  }
  return connecting;
}

export async function getDb(name = process.env.MONGODB_DB || "threshold"): Promise<Db> {
  const c = await getClient();
  return c.db(name);
}
