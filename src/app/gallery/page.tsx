"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Image from "next/image";

type GalleryGroup = {
  title: string;
  images: { _id: string; imageUrl: string }[];
};

export default function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        const groups: GalleryGroup[] = Object.entries(data).map(([title, imgs]) => ({
          title,
          images: imgs as { _id: string; imageUrl: string }[],
        }));
        setGallery(groups);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load gallery");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-rose-50">
      <Header />
      <Navbar />
      <div className="py-12 px-4">
        {loading ? (
          <div className="text-center py-10">Loading gallery...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : gallery.length === 0 ? (
          <div className="text-center py-10">No gallery images found.</div>
        ) : (
          gallery.map((group) => (
            <div key={group.title} className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-10 text-black">{group.title}</h2>
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {group.images.map((img) => (
                  <div key={img._id} className="relative rounded-2xl overflow-hidden shadow-lg group bg-black/10">
                    <Image
                      src={img.imageUrl}
                      alt={group.title}
                      width={500}
                      height={350}
                      className="w-full h-72 object-cover rounded-2xl"
                    />
                    <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white p-4 text-xl font-medium">
                      {group.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
      <Contact />
    </div>
  );
}
