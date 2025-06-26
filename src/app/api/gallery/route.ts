import { NextResponse } from 'next/server';
import { getDbAndBucket } from '@/utils/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const { db } = await getDbAndBucket('gallery');
    const images = await db.collection('gallery').find().toArray();
    // Group by title
    const grouped: Record<string, { _id: string; imageUrl: string }[]> = {};
    images.forEach(img => {
      if (!grouped[img.title]) grouped[img.title] = [];
      grouped[img.title].push({
        _id: String(img._id),
        imageUrl: img.imageUrl,
      });
    });
    return NextResponse.json(grouped);
  } catch {
    return new NextResponse('Failed to fetch gallery', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      return new NextResponse('Invalid content type', { status: 400 });
    }
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const files = formData.getAll('images') as File[];
    if (!title || files.length === 0) {
      return new NextResponse('Missing title or images', { status: 400 });
    }
    const { db, bucket } = await getDbAndBucket('gallery');
    const insertedIds: string[] = [];
    for (const file of files) {
      if (!(file instanceof File)) continue;
      const buffer = Buffer.from(await file.arrayBuffer());
      const uploadStream = bucket.openUploadStream(file.name, {
        contentType: file.type,
      });
      uploadStream.end(buffer);
      await new Promise((resolve, reject) => {
        uploadStream.on('finish', resolve);
        uploadStream.on('error', reject);
      });
      const imageUrl = `/api/images/${uploadStream.id}?bucket=gallery`;
      const result = await db.collection('gallery').insertOne({
        title,
        imageUrl,
      });
      insertedIds.push(String(result.insertedId));
    }
    return NextResponse.json({ ids: insertedIds });
  } catch {
    return new NextResponse('Failed to upload images', { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { db, bucket } = await getDbAndBucket('gallery');
    const { id } = await req.json();
    if (!id) return new NextResponse('Missing id', { status: 400 });
    // Remove image from GridFS if present
    const doc = await db.collection('gallery').findOne({ _id: new ObjectId(id) });
    if (doc && doc.imageUrl) {
      const match = doc.imageUrl.match(/images\/(.*?)\?/);
      if (match && match[1]) {
        try { await bucket.delete(new ObjectId(match[1])); } catch {}
      }
    }
    await db.collection('gallery').deleteOne({ _id: new ObjectId(id) });
    return new NextResponse('Deleted', { status: 200 });
  } catch {
    return new NextResponse('Failed to delete image', { status: 500 });
  }
} 