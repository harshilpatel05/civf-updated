import { ObjectId } from 'mongodb';
import { getDbAndBucket } from '@/utils/mongodb';

export const runtime = 'nodejs'; // ensure it's not an edge function

export async function GET(req: Request) {
  const { searchParams, pathname } = new URL(req.url, 'http://localhost');
  const id = pathname.split('/').pop();
  const bucketName = searchParams.get('bucket') || 'memberImages';

  if (!id || !ObjectId.isValid(id)) {
    return new Response('Invalid image ID', { status: 400 });
  }

  const { bucket } = await getDbAndBucket(bucketName);
  const objectId = new ObjectId(id);

  const fileExists = await bucket.find({ _id: objectId }).hasNext();
  if (!fileExists) {
    return new Response('Image not found', { status: 404 });
  }

  const stream = bucket.openDownloadStream(objectId);

  return new Response(stream as any, {
    status: 200,
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
