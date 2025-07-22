'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  arrayMove,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type AnnouncementItem = {
  _id: string;
  title: string;
  image?: string;
  file: {
    _id: string;
  };
};

function SortableAnnouncement({
  announcement,
  index,
  onDelete,
}: {
  announcement: AnnouncementItem;
  index: number;
  onDelete: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: announcement._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="border p-4 rounded shadow bg-gray-50"
    >
      <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-6">
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
                target.src = 'https://via.placeholder.com/96?text=Not+Found';
              }}
            />
          </div>
        )}

        <div className="flex-grow min-w-[200px]">
          <h3 className="text-lg font-semibold text-gray-900">{announcement.title}</h3>
          <p className="text-sm text-gray-600">PDF ID: {announcement.file._id}</p>
        </div>

        <div className="flex flex-col gap-2 items-center md:items-end">
          <button
            onClick={() => onDelete(announcement._id)}
            className="bg-red-600 hover:bg-red-700 text-white text-xs px-4 py-1 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
}

export default function AnnouncementUpload() {
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const sensors = useSensors(useSensor(PointerSensor));

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

    const MAX_PDF_SIZE = 4 * 1024 * 1024;
    const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

    if (image.size > MAX_IMAGE_SIZE) {
      showMessage('❌ Image too large. Max 2MB.', 'error');
      return;
    }
    if (pdfFile.size > MAX_PDF_SIZE) {
      showMessage('❌ PDF too large. Max 4MB.', 'error');
      return;
    }

    const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const allowedPdfTypes = ['application/pdf'];

    if (!allowedImageTypes.includes(image.type)) {
      showMessage('❌ Invalid image format.', 'error');
      return;
    }
    if (!allowedPdfTypes.includes(pdfFile.type)) {
      showMessage('❌ Invalid PDF format.', 'error');
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
        showMessage('✅ Uploaded successfully!', 'success');
        setTitle('');
        setImage(null);
        setPdfFile(null);
        fetchAnnouncements();
      } else {
        const errorText = await res.text();
        showMessage(`❌ Upload failed: ${errorText}`, 'error');
      }
    } catch (err) {
      console.error('Upload error:', err);
      showMessage('❌ Network error. Please try again.', 'error');
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
        showMessage('🗑️ Deleted successfully!', 'success');
        fetchAnnouncements();
      } else {
        showMessage('❌ Failed to delete announcement.', 'error');
      }
    } catch (err) {
      console.error('Delete error:', err);
      showMessage('❌ Failed to delete announcement.', 'error');
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = announcements.findIndex((a) => a._id === active.id);
    const newIndex = announcements.findIndex((a) => a._id === over.id);

    const reordered = arrayMove(announcements, oldIndex, newIndex);
    setAnnouncements(reordered);
  };

  const saveOrder = async () => {
    try {
      const updates = announcements.map((a, i) => ({ _id: a._id, sortOrder: i }));
      const res = await fetch('/api/announcements', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        showMessage('✅ Order updated successfully!', 'success');
        fetchAnnouncements();
      } else {
        showMessage('❌ Failed to save new order.', 'error');
      }
    } catch (err) {
      console.error('Save order error:', err);
      showMessage('❌ Error saving order.', 'error');
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 text-black bg-white rounded shadow space-y-12">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-3xl font-bold text-center text-blue-800">Upload New Announcement</h2>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-800 mb-2">📋 Deployment Upload Tips:</h3>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• <strong>PDFs:</strong> Max 4MB</li>
            <li>• <strong>Images:</strong> Max 2MB</li>
            <li>• <strong>Large Files:</strong> Upload locally first</li>
          </ul>
        </div>

        <input
          type="text"
          placeholder="Announcement Title"
          className="w-full border px-3 py-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <div>
          <label className="block text-sm font-medium">Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full border px-3 py-2 rounded"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">PDF</label>
          <input
            type="file"
            accept=".pdf"
            className="w-full border px-3 py-2 rounded"
            onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
            required
          />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold">
          Upload Announcement
        </button>

        {message && (
          <div className={`p-3 rounded-lg text-center font-medium ${messageType === 'success'
            ? 'bg-green-100 text-green-800 border border-green-300'
            : 'bg-red-100 text-red-800 border border-red-300'
            }`}>
            {message}
          </div>
        )}
      </form>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-center text-blue-800">Existing Announcements</h2>

        {announcements.length === 0 ? (
          <p className="text-center text-gray-500">No announcements uploaded yet.</p>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={announcements.map((a) => a._id)}
              strategy={rectSortingStrategy}
            >
              <ul className="space-y-6">
                {announcements.map((announcement, index) => (
                  <SortableAnnouncement
                    key={announcement._id}
                    announcement={announcement}
                    index={index}
                    onDelete={handleDelete}
                  />
                ))}
              </ul>
            </SortableContext>
          </DndContext>
        )}

        {announcements.length > 1 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={saveOrder}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 font-semibold"
            >
              Save Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
