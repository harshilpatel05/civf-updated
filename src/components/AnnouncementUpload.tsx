'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

type AnnouncementItem = {
  _id: string;
  title: string;
  image?: string;
  file: {
    _id: string;
  };
};

export default function AnnouncementUpload() {
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const res = await fetch('/api/announcements');
      const data = await res.json();
      setAnnouncements(data);
    } catch (err) {
      console.error('Failed to fetch announcements:', err);
    }
  };

  const showMessage = (msg: string, type: 'success' | 'error') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !image || !pdfFile) {
      showMessage('❌ Please fill all fields.', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);
    formData.append('pdfFile', pdfFile);

    try {
      const res = await fetch('/api/announcements', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        showMessage('✅ Announcement uploaded successfully!', 'success');
        setTitle('');
        setImage(null);
        setPdfFile(null);
        fetchAnnouncements();
      } else {
        showMessage('❌ Upload failed. Please try again.', 'error');
      }
    } catch (err) {
      console.error(err);
      showMessage('❌ Upload error.', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this announcement?');
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/announcements/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        showMessage('🗑️ Announcement deleted successfully!', 'success');
        fetchAnnouncements();
      } else {
        showMessage('❌ Failed to delete announcement.', 'error');
      }
    } catch (err) {
      console.error('Delete error:', err);
      showMessage('❌ Failed to delete announcement.', 'error');
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 text-black bg-white rounded shadow space-y-10">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-bold text-center">Upload New Announcement</h2>

        <input
          type="text"
          placeholder="Announcement Title"
          className="w-full border px-3 py-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <div>
          <label className="block text-sm font-medium mb-2">Announcement Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full border px-3 py-2 rounded"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">PDF File</label>
          <input
            type="file"
            accept=".pdf"
            className="w-full border px-3 py-2 rounded"
            onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Upload Announcement
        </button>

        {/* Enhanced Success/Error Message */}
        {message && (
          <div className={`p-3 rounded-lg text-center font-medium ${
            messageType === 'success' 
              ? 'bg-green-100 text-green-800 border border-green-300' 
              : 'bg-red-100 text-red-800 border border-red-300'
          }`}>
            {message}
          </div>
        )}
      </form>

      <div>
        <h2 className="text-xl font-bold mb-4 text-center">Existing Announcements</h2>
        {announcements.length === 0 ? (
          <p className="text-center text-gray-500">No announcements uploaded yet.</p>
        ) : (
          <ul className="space-y-6">
            {announcements.map((announcement) => (
              <li key={announcement._id} className="border p-4 rounded shadow">
                <div className="flex items-center gap-4">
                  {announcement.image && (
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <Image
                        src={announcement.image}
                        alt={announcement.title}
                        fill
                        className="object-contain rounded"
                        sizes="96px"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/96?text=Image+Not+Found';
                        }}
                      />
                    </div>
                  )}
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold">{announcement.title}</h3>
                    <p className="text-sm text-gray-600">PDF ID: {announcement.file._id}</p>
                  </div>
                  <button
                    onClick={() => handleDelete(announcement._id)}
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
} 