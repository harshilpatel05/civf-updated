import { NextResponse } from 'next/server';
import clientPromise, { getDbAndBucket } from '@/utils/mongodb';
import { ObjectId } from 'mongodb';

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db();
    const testimonial = await db.collection('testimonials').findOne({ _id: new ObjectId(id) });
    if (!testimonial) {
      return new NextResponse('Testimonial not found', { status: 404 });
    }
    // Remove video from GridFS if present
    if (testimonial.video && testimonial.video.filename) {
      const { bucket } = await getDbAndBucket('testimonials');
      // Find the file by filename
      const file = await bucket.find({ filename: testimonial.video.filename }).toArray();
      if (file.length > 0) {
        await bucket.delete(file[0]._id);
      }
    }
    await db.collection('testimonials').deleteOne({ _id: new ObjectId(id) });
    return new NextResponse('Deleted', { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse('Failed to delete testimonial', { status: 500 });
  }
} 