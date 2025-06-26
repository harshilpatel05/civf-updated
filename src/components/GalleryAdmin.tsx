"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

type GalleryGroup = {
  title: string;
  images: { _id: string; imageUrl: string }[];
};

export default function GalleryAdmin() {
  const [title, setTitle] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [gallery, setGallery] = useState<GalleryGroup[]>([]);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    const res = await fetch("/api/gallery");
    const data = await res.json();
    // Convert grouped object to array
    const groups: GalleryGroup[] = Object.entries(data).map(([title, imgs]) => ({
      title,
      images: imgs as { _id: string; imageUrl: string }[],
    }));
    setGallery(groups);
  };

  const showMessage = (msg: string, type: "success" | "error") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(files);
    setPreviewUrls(files.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || images.length === 0) {
      showMessage("❌ Please enter a title and select images.", "error");
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    images.forEach(img => formData.append("images", img));
    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        showMessage("✅ Images uploaded!", "success");
        setTitle("");
        setImages([]);
        setPreviewUrls([]);
        fetchGallery();
      } else {
        const errorText = await res.text();
        showMessage(`❌ Upload failed: ${errorText}`, "error");
      }
    } catch {
      showMessage("❌ Network error. Please try again.", "error");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    const res = await fetch("/api/gallery", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      showMessage("🗑️ Image deleted!", "success");
      fetchGallery();
    } else {
      showMessage("❌ Failed to delete image.", "error");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="justify-center mt-12 text-black bg-white p-6 rounded-xl shadow-lg w-full max-w-5xl">
        <h1 className="text-2xl font-bold text-center mb-6">Add Gallery Images</h1>
        {message && (
          <div
            className={
              `mb-4 p-3 rounded-lg text-center font-medium ` +
              (messageType === "success"
                ? "bg-green-100 text-green-800 border border-green-300"
                : "bg-red-100 text-red-800 border border-red-300")
            }
          >
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Gallery Title / Category"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
            className="w-full p-2 border text-black placeholder-black border-gray-300 rounded"
          />
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full p-2 border text-black border-gray-300 rounded"
            required
          />
          {previewUrls.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-2 justify-center">
              {previewUrls.map((url, i) => (
                <Image key={i} src={url} alt="Preview" width={120} height={80} className="rounded shadow object-cover" />
              ))}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            Upload Images
          </button>
        </form>
        <h2 className="text-xl font-semibold mt-10 mb-4">Gallery Images</h2>
        {gallery.length === 0 ? (
          <p className="text-gray-500">No images uploaded yet.</p>
        ) : (
          <div className="space-y-10">
            {gallery.map(group => (
              <div key={group.title}>
                <h3 className="text-lg font-bold mb-3 text-black">{group.title}</h3>
                <div className="flex flex-wrap gap-6">
                  {group.images.map(img => (
                    <div key={img._id} className="relative group">
                      <Image src={img.imageUrl} alt={group.title} width={200} height={140} className="rounded shadow object-cover" />
                      <button
                        onClick={() => handleDelete(img._id)}
                        className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded opacity-80 group-hover:opacity-100"
                        title="Delete"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 