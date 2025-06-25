import { ObjectId } from 'mongodb';
import { getDbAndBucket } from '@/utils/mongodb';
import { Readable } from 'stream';

export const runtime = 'nodejs';

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

  const nodeStream = bucket.openDownloadStream(objectId);
  const webStream = Readable.toWeb(nodeStream) as ReadableStream<Uint8Array>;

  return new Response(webStream, {
    status: 200,
    headers: {
      'Content-Type': 'image/jpeg',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
