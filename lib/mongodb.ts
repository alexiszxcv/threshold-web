import { MongoClient, Db } from "mongodb";

let client: MongoClient | null = null;
let connecting: Promise<MongoClient> | null = null;

export async function getClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;         // read at runtime
  if (!uri) throw new Error("Missing MONGODB_URI");

  if (client) return client;
  if (!connecting) {
    connecting = (async () => {
      const c = new MongoClient(uri, {
        serverSelectionTimeoutMS: 5000,
        connectTimeoutMS: 10000,
        socketTimeoutMS: 0,
        maxPoolSize: 10,
        retryWrites: true,
        maxIdleTimeMS: 30000,
        // SSL/TLS settings for Cloud compatibility
        tls: true,
        tlsAllowInvalidCertificates: false,
        authSource: 'admin',
      });
      await c.connect();
      
      // Test the connection
      await c.db("admin").command({ ismaster: 1 });
      console.log("MongoDB connected successfully");
      
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
