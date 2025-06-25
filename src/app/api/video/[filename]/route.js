import { MongoClient, GridFSBucket } from 'mongodb';
import { NextResponse } from 'next/server';

const uri = process.env.MONGODB_URI;
// Use the same DB name as the rest of the app, fallback to 'civf2' if not set
const dbName = process.env.DB_NAME || 'civf2';

export async function GET(req, { params }) {
  try {
    const { filename } = await params; // Await params in Next.js 15
    
    // Decode the filename in case it's URL encoded
    const decodedFilename = decodeURIComponent(filename);
    console.log('Requested filename:', filename);
    console.log('Decoded filename:', decodedFilename);
    
    const range = req.headers.get('range');

    if (!range) {
      return new NextResponse('Requires Range header', { status: 400 });
    }

    if (!uri) {
      console.error('MONGODB_URI not configured');
      return new NextResponse('Database not configured', { status: 500 });
    }

    const client = await MongoClient.connect(uri);
    
    try {
      const db = client.db(dbName);
      const bucket = new GridFSBucket(db, { bucketName: 'testimonials' });
      
      // Find the file using the decoded filename
      const files = await bucket.find({ filename: decodedFilename }).toArray();
      console.log(`Found ${files.length} files for filename: ${decodedFilename}`);
      
      if (!files || files.length === 0) {
        console.log(`File not found: ${decodedFilename}`);
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
      const nodeStream = bucket.openDownloadStreamByName(decodedFilename, { start, end });
      const webStream = new ReadableStream({
        start(controller) {
          nodeStream.on('data', (chunk) => controller.enqueue(chunk));
          nodeStream.on('end', () => controller.close());
          nodeStream.on('error', (err) => {
            console.error('Stream error:', err);
            controller.error(err);
          });
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
  } catch (error) {
    console.error('Video route error:', error);
    return new NextResponse(`Internal server error: ${error.message}`, { status: 500 });
  }
}
