import { NextResponse } from 'next/server';
import { getDbAndBucket } from '@/utils/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const { db } = await getDbAndBucket('startups');
    const startups = await db.collection('startups').find().toArray();
    return NextResponse.json(
      startups.map((doc) => ({
        _id: String(doc._id),
        name: doc.name,
        description: doc.description,
        logoUrl: doc.logoUrl,
      }))
    );
  } catch {
    return new NextResponse('Failed to fetch startups', { status: 500 });
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
    const description = formData.get('description') as string;
    const logoFile = formData.get('logo') as File;
    if (!name || !description || !logoFile) {
      return new NextResponse('Missing required fields', { status: 400 });
    }
    // Store logo in GridFS
    const { db, bucket } = await getDbAndBucket('startups');
    const buffer = Buffer.from(await logoFile.arrayBuffer());
    const uploadStream = bucket.openUploadStream(logoFile.name, {
      contentType: logoFile.type,
    });
    uploadStream.end(buffer);
    await new Promise((resolve, reject) => {
      uploadStream.on('finish', resolve);
      uploadStream.on('error', reject);
    });
    const logoUrl = `/api/images/${uploadStream.id}?bucket=startups`;
    // Save startup document
    const result = await db.collection('startups').insertOne({
      name,
      description,
      logoUrl,
    });
    return NextResponse.json({ _id: String(result.insertedId) });
  } catch {
    return new NextResponse('Failed to add startup', { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { db, bucket } = await getDbAndBucket('startups');
    const { id } = await req.json();
    if (!id) return new NextResponse('Missing id', { status: 400 });
    // Remove logo from GridFS if present
    const startup = await db.collection('startups').findOne({ _id: new ObjectId(id) });
    if (startup && startup.logoUrl) {
      const match = startup.logoUrl.match(/images\/(.*?)\?/);
      if (match && match[1]) {
        try { await bucket.delete(new ObjectId(match[1])); } catch {}
      }
    }
    await db.collection('startups').deleteOne({ _id: new ObjectId(id) });
    return new NextResponse('Deleted', { status: 200 });
  } catch {
    return new NextResponse('Failed to delete startup', { status: 500 });
  }
} 