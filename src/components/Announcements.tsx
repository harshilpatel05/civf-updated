import clientPromise from '../utils/mongodb';
import ClientAnnouncements from './ClientAnnouncements'; 
export default async function Announcements() {
  const client = await clientPromise;
  const db = client.db();
  const announcements = await db.collection('announcements').find({}).toArray();
  const safeAnnouncements = announcements.map((a) => ({
    ...a,
    _id: a._id.toString(),
    file: {
      _id: a.file?._id?.toString() || null,
    },
  }));
  return <ClientAnnouncements announcements={safeAnnouncements} />;
}
