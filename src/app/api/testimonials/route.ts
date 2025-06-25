import { NextResponse } from 'next/server';
import clientPromise from '@/utils/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const testimonials = await db.collection('testimonials').find().toArray();

    return NextResponse.json(
      testimonials.map((doc) => ({
        _id: String(doc._id),
        name: doc.name,
        person: doc.person,
        testimonial: doc.testimonial,
        video: doc.video?.filename ? { filename: doc.video.filename } : null,
      }))
    );
  } catch (err) {
    console.error(err);
    return new NextResponse('Failed to fetch testimonials', { status: 500 });
  }
}
