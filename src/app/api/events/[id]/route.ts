import { ObjectId } from 'mongodb';
import { getDbAndBucket } from '@/utils/mongodb';
import { NextRequest } from 'next/server';

export async function DELETE(req: NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop(); // gets [id] from /api/events/[id]

  if (!id || !ObjectId.isValid(id)) {
    return new Response(JSON.stringify({ error: 'Invalid event ID' }), {
      status: 400,
    });
  }

  const { db, bucket } = await getDbAndBucket('events');

  try {
    const event = await db.collection('events').findOne({ _id: new ObjectId(id) });

    if (!event) {
      return new Response(JSON.stringify({ error: 'Event not found' }), {
        status: 404,
      });
    }

    if (event.imageId) {
      try {
        await bucket.delete(new ObjectId(event.imageId));
      } catch (err) {
        console.warn('⚠️ Could not delete image from GridFS:', err);
      }
    }

    await db.collection('events').deleteOne({ _id: new ObjectId(id) });

    return new Response(JSON.stringify({ message: 'Event deleted' }), { status: 200 });
  } catch (err) {
    console.error('❌ Error deleting event:', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
    });
  }
}
