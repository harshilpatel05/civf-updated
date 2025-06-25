import { NextResponse } from 'next/server';
import clientPromise from '@/utils/mongodb';
import { getDbAndBucket } from '@/utils/mongodb';

// Reduced limits for serverless deployment compatibility
const MAX_PDF_SIZE = 4 * 1024 * 1024; // 4MB for serverless compatibility
const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB for serverless compatibility
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
const ALLOWED_PDF_TYPES = ['application/pdf'];

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
    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      return new NextResponse('Invalid content type', { status: 400 });
    }

    const formData = await req.formData();
    const title = formData.get('title') as string;
    const imageFile = formData.get('image') as File;
    const pdfFile = formData.get('pdfFile') as File;

    // Validate required fields
    if (!title || !imageFile || !pdfFile) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // Validate image file
    if (imageFile.size > MAX_IMAGE_SIZE) {
      return new NextResponse(`Image file too large. Maximum size is ${MAX_IMAGE_SIZE / (1024 * 1024)}MB for deployment.`, { status: 413 });
    }

    if (!ALLOWED_IMAGE_TYPES.includes(imageFile.type)) {
      return new NextResponse('Invalid image format. Please use JPEG, PNG, GIF, or WebP.', { status: 400 });
    }

    // Validate PDF file
    if (pdfFile.size > MAX_PDF_SIZE) {
      return new NextResponse(`PDF file too large. Maximum size is ${MAX_PDF_SIZE / (1024 * 1024)}MB for deployment. Consider compressing your PDF.`, { status: 413 });
    }

    if (!ALLOWED_PDF_TYPES.includes(pdfFile.type)) {
      return new NextResponse('Invalid file format. Please upload a PDF file.', { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    try {
      // Upload image to announcements bucket
      const { bucket: imageBucket } = await getDbAndBucket('announcements');
      const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
      const imageUploadStream = imageBucket.openUploadStream(imageFile.name, {
        contentType: imageFile.type,
      });
      imageUploadStream.end(imageBuffer);
      await new Promise((resolve, reject) => {
        imageUploadStream.on('finish', resolve);
        imageUploadStream.on('error', reject);
      });

      // Upload PDF to announcements bucket
      const { bucket: pdfBucket } = await getDbAndBucket('announcements');
      const pdfBuffer = Buffer.from(await pdfFile.arrayBuffer());
      const pdfUploadStream = pdfBucket.openUploadStream(pdfFile.name, {
        contentType: pdfFile.type,
      });
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
    } catch (uploadError) {
      console.error('Upload error:', uploadError);
      return new NextResponse('Failed to upload files to storage', { status: 500 });
    }
  } catch (err) {
    console.error('Announcement upload error:', err);
    return new NextResponse('Failed to upload announcement', { status: 500 });
  }
} 