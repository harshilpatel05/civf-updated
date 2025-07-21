import { getDbAndBucket } from '@/utils/mongodb';
import { Readable } from 'stream';
import { ObjectId } from 'mongodb';

export async function POST(req: Request) {
  const { db, bucket } = await getDbAndBucket('memberImages');
  const formData = await req.formData();
  const imageFiles = formData.getAll('images');
  const insertedIds: ObjectId[] = [];

  const currentMaxOrder = await db.collection('sarthi')
    .find()
    .sort({ order: -1 })
    .limit(1)
    .toArray();

  let nextOrder = currentMaxOrder[0]?.order + 1 || 0;

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
      order: nextOrder++,
    });

    insertedIds.push(result.insertedId);
  }

  return new Response(JSON.stringify({
    message: 'Images uploaded successfully.',
    ids: insertedIds,
  }), { status: 201 });
}


export async function GET() {
  const { db, bucket } = await getDbAndBucket('memberImages');
  const entries = await db.collection('sarthi').find({}).sort({ order: 1 }).toArray();

  const verified = await Promise.all(entries.map(async (entry) => {
    const exists = await bucket.find({ _id: entry.imageId }).hasNext();
    if (!exists) return null;
    return {
      _id: entry._id.toString(),
      imageId: entry.imageId.toString(),
      uploadedAt: entry.uploadedAt,
    };
  }));

  return new Response(JSON.stringify(verified.filter(Boolean)), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}



export async function PATCH(req: Request) {
  const { db } = await getDbAndBucket('memberImages');
  const updates = await req.json(); // e.g., [{ _id: '...', order: 0 }, { _id: '...', order: 1 }]

  const bulkOps = updates.map(({ _id, order }: { _id: string, order: number }) => ({
    updateOne: {
      filter: { _id: new ObjectId(_id) },
      update: { $set: { order } },
    },
  }));

  await db.collection('sarthi').bulkWrite(bulkOps);

  return new Response(JSON.stringify({ message: 'Order updated successfully' }), { status: 200 });
}
