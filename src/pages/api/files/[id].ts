import clientPromise from '../../../utils/mongodb';
import { ObjectId, GridFSBucket } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).send('Invalid file ID');
  }

  try {
    const client = await clientPromise;
    const db = client.db();
    const bucket = new GridFSBucket(db);

    const fileId = new ObjectId(id);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="announcement.pdf"');

    const downloadStream = bucket.openDownloadStream(fileId);
    downloadStream.on('error', (err) => {
      console.error('Stream error:', err);
      res.status(404).send('File not found');
    });

    downloadStream.pipe(res);
  } catch (err) {
    console.error('API error:', err);
    res.status(500).send('Internal server error');
  }
}
