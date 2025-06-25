'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

type GridFSFile = {
  filename: string;
};

type Testimonial = {
  _id: string;
  name: string;
  person: string;
  testimonial: string;
  video?: GridFSFile | null;
};

export default function ClientTestimonial() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch('/api/testimonials');
        if (!res.ok) throw new Error('Failed to fetch');
        const data: Testimonial[] = await res.json();
        setTestimonials(data);
        setLoading(false);
      } catch (err) {
        setError('Could not load testimonials');
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current || testimonials.length === 0) return;

    const cardWidth =
      scrollRef.current?.firstChild instanceof HTMLElement
        ? scrollRef.current.firstChild.clientWidth
        : 0;

    const newIndex =
      direction === 'left'
        ? Math.max(0, currentIndex - 1)
        : Math.min(testimonials.length - 1, currentIndex + 1);

    setCurrentIndex(newIndex);
    scrollRef.current.scrollTo({
      left: cardWidth * newIndex,
      behavior: 'smooth',
    });
  };

  if (loading) return <p className="text-center mt-10">Loading testimonials...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (testimonials.length === 0) return <p className="text-center mt-10">No testimonials found.</p>;

  const current = testimonials[currentIndex];

  return (
    <div className="p-8">
      <h1 className="text-center text-4xl font-bold mb-4">Testimonials</h1>
      <div className="w-full max-w-2xl mx-auto">
        {current?.video?.filename ? (
          <ReactPlayer
            url={`/api/video/${current.video.filename}`}
            controls
            playing={false}
            muted
            width="100%"
          />
        ) : (
          <p className="text-center text-gray-500">No video available</p>
        )}
        <blockquote className="mt-4 text-xl italic text-center">
          “{current.testimonial}”
        </blockquote>
        <p className="text-center font-bold mt-2">{current.name}</p>
        <p className="text-center text-gray-600">{current.person}</p>
      </div>
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => scroll('left')}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          ←
        </button>
        <button
          onClick={() => scroll('right')}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          →
        </button>
      </div>
    </div>
  );
}
