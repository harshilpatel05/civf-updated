'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { DragEndEvent } from '@dnd-kit/core';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  arrayMove,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type SarthiImage = {
  _id: string;
  imageId: string;
};

function SortableImage({
  image,
  onDelete,
}: {
  image: SarthiImage;
  onDelete: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: image._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative w-[150px] h-[150px] border rounded overflow-hidden bg-white shadow-md flex flex-col items-center justify-center"
    >
      <Image
        src={`/api/images/${image.imageId}`}
        alt={`Sarthi ${image.imageId}`}
        fill
        className="object-cover"
      />
      <button
        onClick={() => onDelete(image._id)}
        className="absolute bottom-1 left-1 right-1 bg-red-600 text-white text-xs rounded px-2 py-1 hover:bg-red-700"
      >
        Delete
      </button>
    </div>
  );
}

export default function SarthiUploadPage() {
  const [images, setImages] = useState<File[]>([]);
  const [message, setMessage] = useState('');
  const [existingImages, setExistingImages] = useState<SarthiImage[]>([]);
  const [isReordered, setIsReordered] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const res = await fetch('/api/sarthi');
      const data: SarthiImage[] = await res.json();
      setExistingImages(data);
      setIsReordered(false);
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
      const res = await fetch('/api/sarthi', {
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
      const res = await fetch(`/api/sarthi/${id}`, {
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = existingImages.findIndex((i) => i._id === active.id);
    const newIndex = existingImages.findIndex((i) => i._id === over.id);

    const reordered = arrayMove(existingImages, oldIndex, newIndex);
    setExistingImages(reordered);
    setIsReordered(true);
  };

  const handleSaveOrder = async () => {
    const ordered = existingImages.map((img, index) => ({
      _id: img._id,
      order: index,
    }));

    try {
      const res = await fetch('/api/sarthi', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ordered),
      });

      if (res.ok) {
        setMessage('✅ Order saved.');
        setIsReordered(false);
      } else {
        setMessage('❌ Failed to save order.');
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Error saving order.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto text-black mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-6 text-center">Upload Sarthi Images</h1>

      <div className="flex justify-center items-center p-5">
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
      </div>

      <div className="border rounded p-4 max-h-[600px] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4 text-center">Reorder Images</h2>

        {existingImages.length === 0 ? (
          <p className="text-gray-500 text-center">No images uploaded yet.</p>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={existingImages.map((img) => img._id)}
              strategy={rectSortingStrategy}
            >
              <div className="grid grid-cols-6  gap-2 justify-center">
                {existingImages.map((img) => (
                  <SortableImage
                    key={img._id}
                    image={img}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}

        {isReordered && (
          <button
            onClick={handleSaveOrder}
            className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Save New Order
          </button>
        )}
      </div>
    </div>
  );
}
