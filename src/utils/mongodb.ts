// utils/mongodb.ts
import { MongoClient, Db, GridFSBucket } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const DB_NAME = 'civf2';

declare global {
  // use `let` instead of `var` for global augmentation
  // eslint-disable-next-line no-var
  let _mongoClientPromise: Promise<MongoClient> | undefined;
}

// Prevents TypeScript errors on global reuse
let globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise?: Promise<MongoClient>;
};

if (!globalWithMongo._mongoClientPromise) {
  const client = new MongoClient(MONGODB_URI);
  globalWithMongo._mongoClientPromise = client.connect();
}

const clientPromise = globalWithMongo._mongoClientPromise!;

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
