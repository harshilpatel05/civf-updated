import { NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDbAndBucket } from '@/utils/mongodb';

export async function DELETE(req: NextRequest) {
  const { db, bucket } = await getDbAndBucket('memberImages');

  const id = req.nextUrl.pathname.split('/').pop();

  if (!id || !ObjectId.isValid(id)) {
    return new Response(JSON.stringify({ error: 'Invalid ID' }), { status: 400 });
  }

  const member = await db.collection('members').findOne({ _id: new ObjectId(id) });

  if (!member) {
    return new Response(JSON.stringify({ error: 'Member not found' }), { status: 404 });
  }

  if (member.imageId) {
    try {
      await bucket.delete(new ObjectId(member.imageId));
    } catch (err) {
      console.warn('Failed to delete image from GridFS:', err);
    }
  }

  await db.collection('members').deleteOne({ _id: new ObjectId(id) });

  return new Response(JSON.stringify({ message: 'Member deleted' }), { status: 200 });
}
