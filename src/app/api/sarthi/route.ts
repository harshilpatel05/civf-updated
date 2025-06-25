import { getDbAndBucket } from '@/utils/mongodb';
import { Readable } from 'stream';
import { ObjectId } from 'mongodb';

export async function POST(req: Request) {
  const { db, bucket } = await getDbAndBucket('memberImages');
  const formData = await req.formData();
  const imageFiles = formData.getAll('images');
  const insertedIds: ObjectId[] = [];

  for (const file of imageFiles) {
    if (!(file instanceof File)) continue;

    const buffer = Buffer.from(await file.arrayBuffer());
    const stream = Readable.from(buffer);
    const uploadStream = bucket.openUploadStream(file.name);

    await new Promise((resolve, reject) => {
      stream.pipe(uploadStream).on('finish', resolve).on('error', reject);
    });

    const result = await db.collection('sarthi').insertOne({
      imageId: uploadStream.id,
      uploadedAt: new Date(),
    });

    insertedIds.push(result.insertedId);
  }

  return new Response(JSON.stringify({
    message: 'Images uploaded successfully.',
    ids: insertedIds,
  }), { status: 201 });
}

type VerifiedEntry = {
  _id: string;
  imageId: string;
  uploadedAt: Date;
};

export async function GET() {
  const { db, bucket } = await getDbAndBucket('memberImages');
  const entries = await db.collection('sarthi').find({}).toArray();
  const verified: VerifiedEntry[] = [];

  for (const entry of entries) {
    const exists = await bucket.find({ _id: entry.imageId }).hasNext();
    if (exists) {
      verified.push({
        _id: entry._id.toString(),
        imageId: entry.imageId.toString(),
        uploadedAt: entry.uploadedAt,
      });
    }
  }

  return new Response(JSON.stringify(verified), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

