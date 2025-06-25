import { MongoClient, GridFSBucket } from 'mongodb';
import { NextResponse } from 'next/server';
const uri = process.env.MONGODB_URI;
const dbName = 'civf2';
export async function GET(req, { params }) {
  const { filename } = await params;
  const range = req.headers.get('range');

  if (!range) {
    return new NextResponse('Requires Range header', { status: 400 });
  }
  const client = await MongoClient.connect(uri);
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
    'Cache-Control': 'public, max-age=86400'
  };
  const stream = bucket.openDownloadStreamByName(filename, { start, end });
  return new NextResponse(stream, {
    status: 206,
    headers,
  });
}
