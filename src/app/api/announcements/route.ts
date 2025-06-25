import { NextResponse } from 'next/server';
import clientPromise from '@/utils/mongodb';
import { getDbAndBucket } from '@/utils/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const announcements = await db.collection('announcements').find().toArray();

    return NextResponse.json(
      announcements.map((doc) => ({
        _id: String(doc._id),
        title: doc.title || '',
        image: doc.image || '',
        file: {
          _id: doc.file?._id ? String(doc.file._id) : '',
        },
      }))
    );
  } catch (err) {
    console.error(err);
    return new NextResponse('Failed to fetch announcements', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const imageFile = formData.get('image') as File;
    const pdfFile = formData.get('pdfFile') as File;

    if (!title || !imageFile || !pdfFile) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    // Upload image to announcements bucket
    const { bucket: imageBucket } = await getDbAndBucket('announcements');
    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
    const imageUploadStream = imageBucket.openUploadStream(imageFile.name);
    imageUploadStream.end(imageBuffer);
    await new Promise((resolve, reject) => {
      imageUploadStream.on('finish', resolve);
      imageUploadStream.on('error', reject);
    });

    // Upload PDF to announcements bucket
    const { bucket: pdfBucket } = await getDbAndBucket('announcements');
    const pdfBuffer = Buffer.from(await pdfFile.arrayBuffer());
    const pdfUploadStream = pdfBucket.openUploadStream(pdfFile.name);
    pdfUploadStream.end(pdfBuffer);
    await new Promise((resolve, reject) => {
      pdfUploadStream.on('finish', resolve);
      pdfUploadStream.on('error', reject);
    });

    // Save announcement data
    const result = await db.collection('announcements').insertOne({
      title,
      image: `/api/images/${imageUploadStream.id}?bucket=announcements`,
      file: {
        _id: pdfUploadStream.id,
      },
      uploadedAt: new Date(),
    });

    return NextResponse.json({ 
      message: 'Announcement uploaded successfully',
      id: String(result.insertedId)
    });
  } catch (err) {
    console.error(err);
    return new NextResponse('Failed to upload announcement', { status: 500 });
  }
} 