import { NextResponse } from 'next/server';
import clientPromise, { getDbAndBucket } from '@/utils/mongodb';
import { ObjectId } from 'mongodb';

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
    const videoFile = formData.get('video') as File | null;

    const client = await clientPromise;
    const db = client.db();
    let video = null;
    if (videoFile && videoFile.size > 0) {
      // Store video in GridFS
      const { bucket } = await getDbAndBucket('testimonials');
      const uploadStream = bucket.openUploadStream(videoFile.name, {
        contentType: videoFile.type,
      });
      const arrayBuffer = await videoFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      uploadStream.end(buffer);
      await new Promise((resolve, reject) => {
        uploadStream.on('finish', resolve);
        uploadStream.on('error', reject);
      });
      video = { filename: videoFile.name };
    }
    const result = await db.collection('testimonials').insertOne({
      name,
      person,
      testimonial,
      video,
    });
    return NextResponse.json({ _id: String(result.insertedId) });
  } catch (err) {
    console.error(err);
    return new NextResponse('Failed to upload testimonial', { status: 500 });
  }
}
