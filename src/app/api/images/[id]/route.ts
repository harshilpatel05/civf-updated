import { ObjectId } from 'mongodb';
import { getDbAndBucket } from '@/utils/mongodb';
export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop();
  const bucketName = url.searchParams.get('bucket') || 'memberImages';
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
  const readable = new ReadableStream({
    start(controller) {
      stream.on('data', (chunk) => controller.enqueue(chunk));
      stream.on('end', () => controller.close());
      stream.on('error', (err) => controller.error(err));
    },
  });
  return new Response(readable, {
    status: 200,
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
