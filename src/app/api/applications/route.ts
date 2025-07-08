import { NextResponse } from 'next/server';
import { getDbAndBucket } from '@/utils/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const { db } = await getDbAndBucket('applications');
    const applications = await db.collection('applications').find().toArray();
    
    return NextResponse.json(
      applications.map((doc) => ({
        _id: String(doc._id),
        firstName: doc.firstName,
        lastName: doc.lastName,
        email: doc.email,
        phone: doc.phone,
        equityStack: doc.equityStack,
        linkedIn: doc.linkedInURL,
        companyName: doc.companyName,
        companyWebsite: doc.companyWesbite,
        coFounder: doc.founderName,
        productName: doc.productName,
        productDescription: doc.productDescription,
        productDemoURL: doc.productDemoURL,
        employees: doc.employees,
        isPrimary: doc.isPrimary,
        uuid: doc.uuid,
        status: doc.status || 'Pending',
        nameInvestor: doc.nameInvestor || '',
        otherInvestors: doc.otherInvestors || '',
        investmentInINR: doc.investmentInINR || '',
        investmentTime: doc.investmentTime || '',
        files: doc.files || [],
        createdAt: doc.createdAt || doc._id.getTimestamp(),
      }))
    );
  } catch (err) {
    console.error(err);
    return new NextResponse('Failed to fetch applications', { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, status } = await req.json();
    
    if (!id || !status) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    const { db } = await getDbAndBucket('applications');
    
    const result = await db.collection('applications').updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );

    if (result.matchedCount === 0) {
      return new NextResponse('Application not found', { status: 404 });
    }

    return NextResponse.json({ message: 'Application status updated successfully' });
  } catch (err) {
    console.error(err);
    return new NextResponse('Failed to update application status', { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    
    if (!id) {
      return new NextResponse('Missing application ID', { status: 400 });
    }

    const { db, bucket } = await getDbAndBucket('applications');
    
    // First, get the application to find associated files
    const application = await db.collection('applications').findOne({ _id: new ObjectId(id) });
    
    if (!application) {
      return new NextResponse('Application not found', { status: 404 });
    }

    // Delete associated files from GridFS if they exist
    if (application.files && application.files.length > 0) {
      for (const file of application.files) {
        try {
          if (file.fileId) {
            await bucket.delete(new ObjectId(file.fileId));
          }
        } catch (fileErr) {
          console.error('Error deleting file:', fileErr);
          // Continue with application deletion even if file deletion fails
        }
      }
    }

    // Delete the application
    const result = await db.collection('applications').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return new NextResponse('Application not found', { status: 404 });
    }

    return NextResponse.json({ message: 'Application deleted successfully' });
  } catch (err) {
    console.error(err);
    return new NextResponse('Failed to delete application', { status: 500 });
  }
} 