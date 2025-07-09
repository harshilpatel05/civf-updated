import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import { getDbAndBucket } from '@/utils/mongodb';
import { Readable } from 'node:stream';

type FileMeta = { field: string; filename: string; fileId: unknown };
export async function GET(){
  try{
    const {db} = await getDbAndBucket('applications');
    const applications = await db.collection('applications').find().toArray()
    return NextResponse.json(
      applications.map((doc)=>({
        _id:String(doc._id),
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
        status: doc.status,
        nameInvestor: doc.nameInvestor,
        otherInvestors: doc.otherInvestors, 
        file: {
          _id: doc.file?._id ? String(doc.file._id) : '',
        },
      }))
    );
  }catch(err){
    console.error(err);
    return new NextResponse('Failed to fetch applications')
  }
}
export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      return new NextResponse('Invalid content type', { status: 400 });
    }
    const formData = await req.formData();
    const entries = Array.from(formData.entries());
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const equityStack = formData.get('equityStack') as string;
    const linkedInURL = formData.get('linkedInURL') as string;
    const companyName = formData.get('componyName') as string;
    const companyWebsite = formData.get('companyWebsite') as string;
    const coFounder = formData.get('founderName') as string;
    const productName = formData.get('productName') as string;
    const productDescription = formData.get('productDescription') as string;
    const productDemoURL = formData.get('productDemoURL') as string;
    const employees = formData.get('employees') as string;
    const isPrimary = formData.get('isPrimary') as string;
    const nameInvestor = formData.get('nameInvestor') as string;
    const investmentInINR = formData.get('investmentInINR') as string;
    const investmentTime = formData.get('investmentTime') as string;
    const otherInvestors = formData.get('otherInvestors') as string;
    const filesMeta: FileMeta[] = [];
    const fileLines: string[] = [];
    const { db, bucket } = await getDbAndBucket('applications');
    for (const [key, value] of entries) {
      if (value instanceof File) {
        fileLines.push(`- ${key}: ${value.name}`);
        const stream = value.stream();
        const reader = stream.getReader();
        const nodeReadable = new Readable({
          async read() {
            try {
              const { done, value: chunk } = await reader.read();
              if (done) {
                this.push(null);
              } else {
                this.push(Buffer.from(chunk));
              }
            } catch (err) {
              this.destroy(err as Error);
            }
          }
        });
        const uploadStream = bucket.openUploadStream(value.name, {
          metadata: { field: key, originalName: value.name }
        });
        await new Promise((resolve, reject) => {
          nodeReadable.on('error', reject);
          uploadStream.on('error', reject);
          uploadStream.on('finish', resolve);
          nodeReadable.pipe(uploadStream);
        });
        filesMeta.push({
          field: key,
          filename: value.name,
          fileId: uploadStream.id
        });
      }
    }
    const uuid = uuidv4();
    const emailBody = `
    <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333; line-height: 1.6;">
      <p>Dear ${companyName}, Thank you for submitting your application for the <strong>CIVF Acceleration Program</strong>. 
      We are pleased to confirm that your application has been received.</p>
      Your unique tracking ID is: ${uuid}. 
      <p>You can use this ID to check the status of your application by visiting the CIVF website: Acceleration Program > Track Application or directly via this link.
      We wish you the very best in your entrepreneurial journey.</p>

     <p> Best regards,
      <strong>CIVF</strong></p>
      
  
    </div>
  `;
  
    const applicationData: Record<string, unknown> = {
      firstName,
      lastName,
      email,
      phone,
      equityStack,
      linkedInURL,
      companyName,
      companyWebsite,
      coFounder,
      productName,
      productDescription,
      productDemoURL,
      employees,
      isPrimary,
      uuid,
      status: 'Pending',
    };
    if (nameInvestor && nameInvestor.trim() !== '') {
      applicationData.nameInvestor = nameInvestor;
    }
    if (investmentInINR && investmentInINR.trim() !== '') {
      applicationData.investmentInINR = investmentInINR;
    }
    if (investmentTime && investmentTime.trim() !== '') {
      applicationData.investmentTime = investmentTime;
    }
    if (otherInvestors && otherInvestors.trim() !== '') {
      applicationData.otherInvestors = otherInvestors;
    }
    if (filesMeta.length > 0) {
      applicationData.files = filesMeta;
    }
    await db.collection('applications').insertOne(applicationData);
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    const mailOptions = {
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: email, 
      subject: `Received Acceleration Form Submission from ${firstName} ${lastName}`,
      html: emailBody,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true, uuid: uuid });
  } catch (error) {
    console.error(error);
    return new NextResponse('Failed to send email', { status: 500 });
  }
} 
