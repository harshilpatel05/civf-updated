    import { NextRequest } from 'next/server';
    import { getDbAndBucket } from '@/utils/mongodb';
    import { Readable } from 'stream';
    import { ObjectId } from 'mongodb';

    export async function GET() {
    const { db } = await getDbAndBucket('civf2');
    const members = await db.collection('members').find({}).toArray();

    return new Response(JSON.stringify(members), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
    }

    export async function POST(req) {
    const { db, bucket } = await getDbAndBucket('civf2');

    const formData = await req.formData();
    const name = formData.get('name');
    const imageFile = formData.get('image');
    const position = formData.get('position');

    if (!name || !imageFile || typeof imageFile === 'string') {
        return new Response(JSON.stringify({ error: 'Invalid input' }), { status: 400 });
    }

    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const readableStream = Readable.from(buffer);

    const uploadStream = bucket.openUploadStream(imageFile.name);
    await new Promise((resolve, reject) => {
        readableStream.pipe(uploadStream)
        .on('finish', resolve)
        .on('error', reject);
    });

    const result = await db.collection('members').insertOne({
        name,
        imageId: uploadStream.id,
        position,
    });

    return new Response(JSON.stringify({ message: 'Member added', id: result.insertedId }), {
        status: 201,
    });
    }
