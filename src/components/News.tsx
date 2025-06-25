'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

type UploadedImage = {
  _id: string;
  imageId: string;
};

export default function NewsUploadPage() {
  const [images, setImages] = useState<File[]>([]);
  const [message, setMessage] = useState('');
  const [existingImages, setExistingImages] = useState<UploadedImage[]>([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await fetch('/api/news');
      const data: UploadedImage[] = await res.json();
      setExistingImages(
        data.map((img) => ({
          _id: img._id,
          imageId: img.imageId,
        }))
      );
    } catch (err) {
      console.error('Failed to fetch images', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) {
      setMessage('Please select at least one image.');
      return;
    }

    const formData = new FormData();
    images.forEach((img) => formData.append('images', img));

    try {
      const res = await fetch('/api/news', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();

      if (res.ok) {
        setMessage(`✅ Uploaded ${result.ids.length} image(s).`);
        setImages([]);
        fetchImages();
      } else {
        setMessage('❌ Upload failed.');
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Something went wrong.');
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this image?');
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/news/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setMessage('🗑️ Image deleted.');
        fetchImages();
      } else {
        setMessage('❌ Failed to delete image.');
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Error deleting image.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto text-black mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-6 text-center">Upload News Images</h1>

      <div className="flex flex-col justify-center items-center md:flex-row gap-8">
        <form onSubmit={handleSubmit} className="flex-1 space-y-4 max-w-md">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setImages(Array.from(e.target.files || []))}
            className="w-full border p-2 rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Upload
          </button>

          {message && <p className="text-center text-sm mt-2">{message}</p>}
        </form>

        <div className="w-100 h-120 overflow-y-auto border rounded p-4">
          <h2 className="text-lg font-semibold mb-4">Uploaded News</h2>
          {existingImages.length === 0 ? (
            <p className="text-gray-500">No images uploaded yet.</p>
          ) : (
            <ul className="space-y-4">
              {existingImages.map(({ _id, imageId }) => (
                <li key={_id} className="border p-2 rounded">
                  <div className="relative w-full h-64 mb-2">
                    <Image
                      src={`/api/images/${imageId}?bucket=news`}
                      alt={`News ${imageId}`}
                      layout="fill"
                      objectFit="contain"
                      className="rounded"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/300?text=Image+Not+Found';
                      }}
                    />
                  </div>
                  <button
                    onClick={() => handleDelete(_id)}
                    className="w-full bg-red-500 text-white py-1 rounded hover:bg-red-600 text-sm"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
