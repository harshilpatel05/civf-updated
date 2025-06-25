import { getDbAndBucket } from '@/utils/mongodb';
import { Readable } from 'stream';

const BUCKET_NAME = 'events';

export async function POST(req: Request) {
  const { db, bucket } = await getDbAndBucket(BUCKET_NAME);
  const formData = await req.formData();

  const title = formData.get('title');
  const description = formData.get('description');
  const imageFile = formData.get('image');

  if (
    !title || typeof title !== 'string' ||
    !description || typeof description !== 'string' ||
    !(imageFile instanceof File)
  ) {
    return new Response(JSON.stringify({ error: 'Invalid input' }), { status: 400 });
  }

  const buffer = Buffer.from(await imageFile.arrayBuffer());
  const stream = Readable.from(buffer);
  const uploadStream = bucket.openUploadStream(imageFile.name);

  await new Promise((resolve, reject) => {
    stream.pipe(uploadStream)
      .on('finish', resolve)
      .on('error', reject);
  });

  const result = await db.collection('events').insertOne({
    title,
    description,
    imageId: uploadStream.id,
    uploadedAt: new Date(),
  });

  return new Response(JSON.stringify({ message: 'Event uploaded', id: result.insertedId }), {
    status: 201,
  });
}

export async function GET() {
  const { db } = await getDbAndBucket(BUCKET_NAME);

  const events = await db
    .collection('events')
    .find({})
    .sort({ uploadedAt: -1, date: -1 })
    .toArray();

  const safeEvents = events.map((event) => ({
    _id: event._id.toString(),
    title: event.title,
    description: event.description || '',
    image: event.imageId
      ? `/api/images/${event.imageId.toString()}?bucket=${BUCKET_NAME}`
      : '/placeholder.png',
    uploadedAt: event.uploadedAt || event.date || new Date(),
  }));

  return new Response(JSON.stringify(safeEvents), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
