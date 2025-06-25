'use client';

import { useEffect, useRef, useState } from 'react';

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
      } catch {
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
    <div className="bg-gradient-to-r from-blue-50 to-indigo-100 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-center text-4xl font-bold text-gray-800 mb-12">What Our Community Says</h1>
        
        <div className="bg-white rounded-2xl shadow-xl p-8 relative">
          <blockquote className="text-xl italic text-center text-gray-700 mb-6">
            &ldquo;{current.testimonial}&rdquo;
          </blockquote>
          
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-800">{current.name}</p>
            <p className="text-gray-600">{current.person}</p>
          </div>

          {current.video?.filename && (
            <div className="mt-6 text-center">
              <video 
                controls 
                className="mx-auto max-w-full h-auto rounded-lg shadow-md"
                src={`/api/video/${current.video.filename}`}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>

        {testimonials.length > 1 && (
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => scroll('left')}
              disabled={currentIndex === 0}
              className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <i className="fas fa-chevron-left mr-2"></i>Previous
            </button>
            <span className="flex items-center px-4 text-gray-600">
              {currentIndex + 1} of {testimonials.length}
            </span>
            <button
              onClick={() => scroll('right')}
              disabled={currentIndex === testimonials.length - 1}
              className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next<i className="fas fa-chevron-right ml-2"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
