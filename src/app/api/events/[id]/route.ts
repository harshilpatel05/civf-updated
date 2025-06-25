import { ObjectId } from 'mongodb';
import { getDbAndBucket } from '@/utils/mongodb';

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { db, bucket } = await getDbAndBucket('events'); 
  const id = params.id;

  if (!ObjectId.isValid(id)) {
    return new Response(JSON.stringify({ error: 'Invalid event ID' }), {
      status: 400,
    });
  }

  try {
    const event = await db.collection('events').findOne({ _id: new ObjectId(id) });

    if (!event) {
      return new Response(JSON.stringify({ error: 'Event not found' }), {
        status: 404,
      });
    }

    // Delete the image from GridFS
    if (event.imageId) {
      try {
        await bucket.delete(new ObjectId(event.imageId));
      } catch (err) {
        console.warn('⚠️ Could not delete image from GridFS:', err);
      }
    }

    // Delete the event document
    await db.collection('events').deleteOne({ _id: new ObjectId(id) });

    return new Response(JSON.stringify({ message: 'Event deleted' }), { status: 200 });
  } catch (err) {
    console.error('❌ Error deleting event:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
    });
  }
}
