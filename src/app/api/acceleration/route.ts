import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import { getDbAndBucket } from '@/utils/mongodb';
import { Readable } from 'node:stream';

type FileMeta = { field: string; filename: string; fileId: unknown };

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
    const founderName = formData.get('founderName') as string;
    const terms = formData.get('terms') as string;
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
    let emailBody = 'Thank you for your submission to the CIVF Acceleration Program.\n\n';
    emailBody += `\n\nYour Application Reference ID: ${uuid}\n`;
    emailBody += 'We have received your application with the following details:\n\n';
    emailBody += `First Name: ${firstName}\n`;
    emailBody += `Last Name: ${lastName}\n`;
    emailBody += `Email: ${email}\n`;
    emailBody += `Phone: ${phone}\n`;
    emailBody += `Equity Stake: ${equityStack}\n`;
    emailBody += `LinkedIn URL: ${linkedInURL}\n`;
    emailBody += `Company Name: ${companyName}\n`;
    emailBody += `Company Website: ${companyWebsite}\n`;
    emailBody += `Other Founders: ${founderName}\n`;
    emailBody += `Product/Service Name: ${productName}\n`;
    emailBody += `Product/Service Description: ${productDescription}\n`;
    emailBody += `Product Demo URL: ${productDemoURL}\n`;
    emailBody += `Number of Employees: ${employees}\n`;
    emailBody += `Primary Contact: ${isPrimary === 'Yes' ? 'Yes' : 'No'}\n`;
    if (nameInvestor && nameInvestor.trim() !== '') {
      emailBody += `Investor Name: ${nameInvestor}\n`;
    }
    if (investmentInINR && investmentInINR.trim() !== '') {
      emailBody += `Investment Amount (INR): ${investmentInINR}\n`;
    }
    if (investmentTime && investmentTime.trim() !== '') {
      emailBody += `Investment Time: ${investmentTime}\n`;
    }
    if (otherInvestors && otherInvestors.trim() !== '') {
      emailBody += `Other Investors: ${otherInvestors}\n`;
    }
    emailBody += '\n\nIf you have any questions, please reply to this email.';
    const applicationData: Record<string, unknown> = {
      firstName,
      lastName,
      email,
      phone,
      equityStack,
      linkedInURL,
      companyName,
      companyWebsite,
      founderName,
      terms,
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
      cc: process.env.MAIL_TO,
      subject: `Received Acceleration Form Submission from ${firstName} ${lastName}`,
      text: emailBody,
    };

    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return new NextResponse('Failed to send email', { status: 500 });
  }
} 
