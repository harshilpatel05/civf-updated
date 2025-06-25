// app/components/Event.tsx
'use client';

import clientPromise from '../utils/mongodb';
import ClientTestimonial from './ClientTestimonials';

type GridFSFile = {
  filename: string;
};

type Testimonial = {
  _id: string;
  name: string;
  person: string;
  testimonial: string;
  video?: GridFSFile | null;
};

function sanitizeGridFSFile(file: any): GridFSFile | null {
  if (!file || !file.filename) return null;
  return { filename: String(file.filename) };
}

function sanitizeTestimonial(doc: any): Testimonial {
  return {
    _id: String(doc._id),
    name: doc.name || '',
    person: doc.person || '',
    testimonial: doc.testimonial || '',
    video: sanitizeGridFSFile(doc.video),
  };
}

export default async function Event() {
  const client = await clientPromise;
  const db = client.db();
  const testimonials = await db.collection('testimonials').find({}).toArray();
  const safeTestimonials: Testimonial[] = testimonials.map(sanitizeTestimonial);

  return <ClientTestimonial testimonials={safeTestimonials} />;
}
