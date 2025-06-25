import { NextResponse } from 'next/server';
import clientPromise from '@/utils/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const rawTestimonials = await db.collection('testimonials').find({}).toArray();

    const testimonials = rawTestimonials.map((doc) => ({
      _id: doc._id.toString(),
      name: doc.name || '',
      person: doc.person || '',
      testimonial: doc.testimonial || '',
      video: doc.video?.filename ? { filename: doc.video.filename } : undefined,
    }));

    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}
