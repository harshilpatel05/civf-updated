import { ObjectId } from 'mongodb';
import { getDbAndBucket } from '@/utils/mongodb';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { db, bucket } = await getDbAndBucket('news');
  const id = params.id;

  if (!bucket) {
    return new Response(JSON.stringify({ error: 'GridFS bucket not initialized' }), {
      status: 500,
    });
  }

  if (!ObjectId.isValid(id)) {
    return new Response(JSON.stringify({ error: 'Invalid ID' }), {
      status: 400,
    });
  }

  try {
    const newsDoc = await db.collection('news').findOne({ _id: new ObjectId(id) });

    if (!newsDoc || !newsDoc.imageId) {
      return new Response(JSON.stringify({ error: 'Image record not found' }), {
        status: 404,
      });
    }

    await bucket.delete(new ObjectId(newsDoc.imageId));
    await db.collection('news').deleteOne({ _id: new ObjectId(id) });

    return new Response(JSON.stringify({ message: 'Image and record deleted.' }), {
      status: 200,
    });
  } catch (err) {
    console.error('Error deleting news image:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
    });
  }
}
