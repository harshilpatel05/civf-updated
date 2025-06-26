'use client';

import { useEffect, useRef, useState } from 'react';

type Testimonial = {
  _id: string;
  name: string;
  person: string;
  testimonial: string;
  vimeoUrl?: string;
};

// TypeScript: declare window.YT and window.onYouTubeIframeAPIReady
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: any;
  }
}

export default function ClientTestimonial() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch('/api/testimonials');
        if (!res.ok) throw new Error('Failed to fetch');
        const data: Testimonial[] = await res.json();
        setTestimonials(data);
        setLoading(false);
      } catch {
        setError('Could not load testimonials');
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading testimonials...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (testimonials.length === 0) return <p className="text-center mt-10">No testimonials found.</p>;

  const current = testimonials[currentIndex];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-100 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-center text-4xl font-bold text-gray-800 mb-12">Testimonials</h1>
        <div className="bg-white rounded-2xl shadow-xl p-8 relative flex flex-col md:flex-row items-center md:items-stretch gap-8">
          {/* Video on the left */}
          {current.vimeoUrl && current.vimeoUrl.trim() !== '' && (
            <div className="w-full md:w-1/2 flex justify-center items-center">
              <div className="aspect-w-16 aspect-h-9 w-full max-w-2xl mx-auto">
                <iframe
                  src={getVimeoEmbedUrl(current.vimeoUrl)}
                  allow="autoplay; fullscreen; picture-in-picture"
                  className="w-full h-[480px] rounded-lg shadow-md"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
          {/* Testimonial on the right */}
          <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left">
            <blockquote className="text-xl md:text-2xl italic text-gray-700 mb-4">
              &ldquo;{current.testimonial}&rdquo;
            </blockquote>
            <div className="mt-2 text-sm text-gray-600">
              <div className="font-semibold">{current.name}</div>
              <div>{current.person}</div>
            </div>
          </div>
        </div>
        {testimonials.length > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
              disabled={currentIndex === 0}
              className="bg-blue-600 text-white text-3xl px-6 py-4 rounded-full shadow-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ← <span className="text-base align-middle ml-2">Previous</span>
            </button>
            <div className="flex-1 flex justify-center">
              <span className="flex items-center px-4 text-gray-600 text-base">
                {currentIndex + 1} of {testimonials.length}
              </span>
            </div>
            <button
              onClick={() => setCurrentIndex(Math.min(testimonials.length - 1, currentIndex + 1))}
              disabled={currentIndex === testimonials.length - 1}
              className="bg-blue-600 text-white text-3xl px-6 py-4 rounded-full shadow-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span className="text-base align-middle mr-2">Next</span> →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper to convert a Vimeo URL to an embed URL with autoplay, mute, and minimal controls
function getVimeoEmbedUrl(url?: string) {
  if (!url) return '';
  // Extract the video ID from various Vimeo URL formats
  const match = url.match(/(?:vimeo\.com\/(?:.*\/)?|player\.vimeo\.com\/video\/)(\d+)/);
  if (match && match[1]) {
    return `https://player.vimeo.com/video/${match[1]}?autoplay=1&muted=1&title=0&byline=0&portrait=0&controls=1`;
  }
  return '';
}
