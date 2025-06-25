import { getDbAndBucket } from '@/utils/mongodb';
import { Readable } from 'stream';

export async function POST(req) {
  const { db, bucket } = await getDbAndBucket('news');
  const formData = await req.formData();

  const imageFiles = formData.getAll('images');
  const insertedIds = [];

  for (const file of imageFiles) {
    if (!(file instanceof File)) continue;

    const buffer = Buffer.from(await file.arrayBuffer());
    const stream = Readable.from(buffer);

    const uploadStream = bucket.openUploadStream(file.name);

    await new Promise((resolve, reject) => {
      stream.pipe(uploadStream)
        .on('finish', resolve)
        .on('error', reject);
    });

    const result = await db.collection('news').insertOne({
      imageId: uploadStream.id,
      uploadedAt: new Date(),
    });

    insertedIds.push(result.insertedId);
  }

  return new Response(JSON.stringify({
    message: 'Images uploaded successfully.',
    ids: insertedIds,
  }), {
    status: 201,
  });
}

export async function GET() {
  const { db } = await getDbAndBucket('news');
  const images = await db.collection('news').find({}).toArray();

  const cleaned = images.map((img) => ({
    _id: img._id.toString(),
    imageId: img.imageId.toString(),
    uploadedAt: img.uploadedAt,
  }));

  return new Response(JSON.stringify(cleaned), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
