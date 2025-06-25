import { ObjectId } from 'mongodb';
import { getDbAndBucket } from '@/utils/mongodb';

export async function DELETE(req, context) {
  const id = context.params.id;
  const { db, bucket } = await getDbAndBucket('memberImages');

  if (!ObjectId.isValid(id)) {
    return new Response(JSON.stringify({ error: 'Invalid ID' }), { status: 400 });
  }

  try {
    const doc = await db.collection('sarthi').findOne({ _id: new ObjectId(id) });

    if (!doc || !doc.imageId) {
      return new Response(JSON.stringify({ error: 'Document or imageId not found' }), {
        status: 404,
      });
    }

    await bucket.delete(new ObjectId(doc.imageId));
    await db.collection('sarthi').deleteOne({ _id: new ObjectId(id) });

    return new Response(JSON.stringify({ message: 'Image and record deleted.' }), {
      status: 200,
    });
  } catch (err) {
    console.error('GridFS delete failed:', err);
    return new Response(JSON.stringify({ error: 'Failed to delete image from storage' }), {
      status: 500,
    });
  }
}
