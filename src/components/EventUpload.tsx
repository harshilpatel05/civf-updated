'use client';

import { useEffect, useState } from 'react';

type EventItem = {
  _id: string;
  title: string;
  description: string;
  image: string | null;
  uploadedAt: string;
};

export default function AdminEventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/events');
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error('Failed to fetch events:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !image) {
      setMessage('❌ Please fill all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);

    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();

      if (res.ok) {
        setMessage('✅ Event uploaded.');
        setTitle('');
        setDescription('');
        setImage(null);
        fetchEvents();
      } else {
        setMessage(`❌ ${result.error || 'Upload failed'}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Upload error.');
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this event?');
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
      });
      const result = await res.json();

      if (res.ok) {
        setMessage('✅ Event deleted.');
        fetchEvents();
      } else {
        setMessage(`❌ ${result.error}`);
      }
    } catch (err) {
      console.error('Delete error:', err);
      setMessage('❌ Failed to delete event.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 text-black bg-white rounded shadow space-y-10">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-bold text-center">Upload New Event</h2>

        <input
          type="text"
          placeholder="Event Title"
          className="w-full border px-3 py-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Event Description"
          className="w-full border px-3 py-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          className="w-full"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Upload Event
        </button>

        {message && <p className="text-center text-sm mt-2">{message}</p>}
      </form>

      <div>
        <h2 className="text-xl font-bold mb-4 text-center">Existing Events</h2>
        {events.length === 0 ? (
          <p className="text-center text-gray-500">No events uploaded yet.</p>
        ) : (
          <ul className="space-y-6">
            {events.map((event) => (
              <li key={event._id} className="border p-4 rounded shadow">
                {event.image && (
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full max-h-[300px] object-contain mb-3 rounded"
                    onError={(e) =>
                      (e.currentTarget as HTMLImageElement).src = '/https://via.placeholder.com/300?text=Image+Not+Found'
                    }
                  />
                )}
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <p className="text-gray-700 mb-2">{event.description}</p>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 text-sm"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
