import { MongoClient, GridFSBucket } from 'mongodb';
import { NextResponse } from 'next/server';
const uri = process.env.MONGODB_URI;
const dbName = 'civf2';

export async function GET(req, { params }) {
  const { filename } = params; // Remove await, params is not a promise
  const range = req.headers.get('range');

  if (!range) {
    return new NextResponse('Requires Range header', { status: 400 });
  }

  const client = await MongoClient.connect(uri);
  try {
    const db = client.db(dbName);
    const bucket = new GridFSBucket(db, { bucketName: 'videos' });
    const files = await bucket.find({ filename }).toArray();
    if (!files || files.length === 0) {
      return new NextResponse('File not found', { status: 404 });
    }
    const file = files[0];
    const videoSize = file.length;
    const start = Number(range.replace(/\D/g, ''));
    const CHUNK_SIZE = 4 * 1024 * 1024;
    const end = Math.min(start + CHUNK_SIZE - 1, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
      'Content-Range': `bytes ${start}-${end}/${videoSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength.toString(),
      'Content-Type': 'video/mp4',
      'Cache-Control': 'public, max-age=86400',
    };
    // Convert Node.js stream to Web Streams API ReadableStream
    const nodeStream = bucket.openDownloadStreamByName(filename, { start, end });
    const webStream = new ReadableStream({
      start(controller) {
        nodeStream.on('data', (chunk) => controller.enqueue(chunk));
        nodeStream.on('end', () => controller.close());
        nodeStream.on('error', (err) => controller.error(err));
      },
      cancel() {
        nodeStream.destroy();
      },
    });
    return new NextResponse(webStream, {
      status: 206,
      headers,
    });
  } finally {
    await client.close();
  }
}
