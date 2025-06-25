import { NextResponse } from 'next/server';
import clientPromise from '@/utils/mongodb';
import { ObjectId } from 'mongodb';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    if (!id) {
      return new NextResponse('Missing announcement ID', { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    
    const result = await db.collection('announcements').deleteOne({
      _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
      return new NextResponse('Announcement not found', { status: 404 });
    }

    return NextResponse.json({ message: 'Announcement deleted successfully' });
  } catch (err) {
    console.error(err);
    return new NextResponse('Failed to delete announcement', { status: 500 });
  }
} 