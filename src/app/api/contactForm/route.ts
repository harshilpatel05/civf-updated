import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, email, contactNumber, purpose } = await req.json();

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
      from: process.env.SMTP_USER,
      to: 'civf@charusat.ac.in', 
      subject: `Query Submitted by ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nContact Number: ${contactNumber}\nMessage: ${purpose}`,
      replyTo: email,
    };
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Message sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending contact form email:', error);
    return NextResponse.json({ message: 'Failed to send message' }, { status: 500 });
  }
} 