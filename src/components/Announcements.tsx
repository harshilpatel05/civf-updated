'use client';
import { useEffect, useState } from 'react';
import ClientAnnouncements from './ClientAnnouncements';

type Announcement = {
  _id: string;
  title: string;
  image?: string;
  file: {
    _id: string;
  };
};

export default function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch('/api/announcements');
        if (!res.ok) throw new Error('Failed to fetch announcements');
        const data = await res.json();
        setAnnouncements(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching announcements:', err);
        setError('Could not load announcements');
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  if (loading) return <div className="text-center py-10">Loading announcements...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
  if (announcements.length === 0) return <div className="text-center py-10">No announcements found.</div>;

  return <ClientAnnouncements announcements={announcements} />;
}
