import { NextResponse } from 'next/server';
import { getDbAndBucket } from '@/utils/mongodb';

// Reduced limits for serverless deployment compatibility
const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB for serverless compatibility
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];

export async function GET() {
  try {
    const { db } = await getDbAndBucket('testimonials');
    const testimonials = await db.collection('testimonials').find().toArray();

    return NextResponse.json(
      testimonials.map((doc) => ({
        _id: String(doc._id),
        name: doc.name,
        person: doc.person,
        testimonial: doc.testimonial,
        vimeoUrl: doc.vimeoUrl || '',
      }))
    );
  } catch (err) {
    console.error(err);
    return new NextResponse('Failed to fetch testimonials', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      return new NextResponse('Invalid content type', { status: 400 });
    }
    
    const formData = await req.formData();
    const name = formData.get('name') as string;
    const person = formData.get('person') as string;
    const testimonial = formData.get('testimonial') as string;
    const vimeoUrl = formData.get('vimeoUrl') as string;

    // Validate required fields
    if (!name || !person || !testimonial) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const { db } = await getDbAndBucket('testimonials');
    const result = await db.collection('testimonials').insertOne({
      name,
      person,
      testimonial,
      vimeoUrl: vimeoUrl || '',
    });
    
    return NextResponse.json({ _id: String(result.insertedId) });
  } catch (err) {
    console.error('Testimonial upload error:', err);
    return new NextResponse('Failed to upload testimonial', { status: 500 });
  }
}
