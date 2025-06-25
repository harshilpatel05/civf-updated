'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

type EventType = {
  _id: string;
  title?: string;
  description?: string;
  image?: string | null;
  uploadedAt?: string;
};

export default function ClientEvent() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [readMoreId, setReadMoreId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const selectedEvent = events.find((e) => e._id === readMoreId);

  useEffect(() => {
    fetch('/api/events')
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch(console.error);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -1000 : 1000,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <div className="bg-rose-100 relative">
        <div className="text-center py-4">
          <h1 className="text-3xl lg:text-5xl font-extrabold text-gray-800">Events</h1>
        </div>

        <button
          onClick={() => scroll('left')}
          className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-blue-900 px-3 py-2 rounded-l z-10"
        >
          ◀
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-blue-900 px-3 py-2 rounded-r z-10"
        >
          ▶
        </button>

        <div
          ref={scrollRef}
          className="mx-auto px-10 pb-4 flex overflow-x-auto justify-start scroll-smooth hide-scrollbar"
          style={{
            maxWidth: '1200px',
            gap: '16px',
          }}
        >
          {events.map((event) => (
            <div
              key={event._id}
              className="bg-white min-w-[250px] lg:min-w-[300px] h-auto p-6 rounded border border-gray-200 flex flex-col justify-between"
            >
              <div className="flex justify-center mb-4 relative w-60 h-60">
                <Image
                  src={event.image ?? '/placeholder.jpg'}
                  alt={event.title ?? 'Event Image'}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </div>
              <h2 className="text-sm text-center font-semibold text-black mb-2">
                {event.title}
              </h2>
              <button
                onClick={() => setReadMoreId(event._id)}
                className="bg-orange-400 text-white py-1 px-4 rounded hover:bg-orange-500"
              >
                Read More
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="relative bg-white w-full max-w-4xl h-[90vh] rounded p-6 overflow-auto">
            <button
              onClick={() => setReadMoreId(null)}
              className="absolute top-3 right-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              ✕ Close
            </button>
            <div className="flex flex-col items-center space-y-4 mt-8">
              <div className="relative w-80 h-80">
                <Image
                  src={selectedEvent.image ?? '/placeholder.jpg'}
                  alt={selectedEvent.title ?? 'Event Detail Image'}
                  fill
                  className="object-contain shadow-lg"
                  sizes="(max-width: 768px) 100vw, 320px"
                />
              </div>
              <h2 className="text-xl font-bold text-black">{selectedEvent.title}</h2>
              <p className="text-black text-sm">{selectedEvent.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
