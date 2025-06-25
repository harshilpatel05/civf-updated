// utils/mongodb.ts
import { MongoClient, Db, GridFSBucket } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'civf2';

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient>;

if (!global._mongoClientPromise) {
  const client = new MongoClient(MONGODB_URI);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

/**
 * Get the MongoDB database and a GridFSBucket with a dynamic bucket name.
 */
export async function getDbAndBucket(bucketName: string): Promise<{
  db: Db;
  bucket: GridFSBucket;
}> {
  const client = await clientPromise;
  const db = client.db(DB_NAME);
  const bucket = new GridFSBucket(db, { bucketName });
  return { db, bucket };
}

export default clientPromise;
