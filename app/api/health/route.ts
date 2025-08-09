export async function GET() {
  return Response.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    env: {
      hasMongoUri: !!process.env.MONGODB_URI,
      mongoDb: process.env.MONGODB_DB,
      nodeEnv: process.env.NODE_ENV,
    }
  });
}
