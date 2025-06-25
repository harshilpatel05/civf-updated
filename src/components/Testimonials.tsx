import clientPromise from '../utils/mongodb';
import ClientTestimonial from './ClientTestimonials';

function sanitizeGridFSFile(file: any) {
  if (!file) return null;

  return {
    _id: file._id?.toString() || '',
    length: file.length || 0,
    chunkSize: file.chunkSize || 0,
    uploadDate: file.uploadDate instanceof Date
      ? file.uploadDate.toISOString()
      : null,
    filename: file.filename || '',
    metadata: file.metadata || {},
  };
}

function sanitizeTestimonial(doc: any) {
  return {
    _id: doc._id.toString(),
    name: doc.name || '',
    person:doc.person || '',
    testimonial: doc.testimonial || '',
    video: sanitizeGridFSFile(doc.video),
    // add any additional fields you use in the UI
  };
}

export default async function Event() {
  const client = await clientPromise;
  const db = client.db();
  const testimonials = await db.collection('testimonials').find({}).toArray();

  const safeTestimonials = testimonials.map(sanitizeTestimonial);

  return <ClientTestimonial testimonials={safeTestimonials} />;
}
