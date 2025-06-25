'use client';
import { useEffect, useRef, useState } from 'react';
export default function ClientAnnouncements({ announcements }: { announcements: any[] }) {
  const [readMoreId, setReadMoreId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const selectedAnnouncement = announcements.find(a => a._id === readMoreId);
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth',
      });
    }
  };
 useEffect (()=>{
  if (readMoreId !== null) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
 })
  return (
    <>
      <div className="bg-gradient-to-tr from-blue-900 from-10% pb-8 to-orange-600 relative">
        <div className="w-full text-center py-4">
          <h1 className="text-3xl lg:text-5xl font-extrabold text-center text-white">Announcements</h1>
        </div>
        <button
          onClick={() => scroll('left')}
          className="absolute fas fa-arrow-left left-5 top-1/2 transform -translate-y-1/2 bg-blue-900 px-3 py-2 rounded-l z-10"
        >
          
        </button>
        <button
          onClick={() => scroll('right')}
          className="absolute fas fa-arrow-right right-5 top-1/2 transform -translate-y-1/2 bg-blue-900 px-3 py-2 rounded-r z-10"
        >
          
        </button>
        <div
          ref={scrollRef}
          className="flex flex-row space-x-1 mx-10 px-4 pb-4 overflow-x-auto scroll-smooth"
        >
          {announcements.map((announcement: any) => (
            <div
  key={announcement._id}
  className="bg-white shadow-xl  w-60 h-100 m-2 p-4 rounded border border-gray-200 flex flex-col justify-between"
>
  <div className="flex justify-center m-2">
    <div className="w-45 h-45 flex justify-center items-center overflow-hidden">
  <img
    src={announcement.image || '/placeholder.jpg'}
    onError={(e) => (e.currentTarget.src = '/placeholder.jpg')}
    alt="Announcement"
    className="max-h-full max-w-full object-contain"
  />
</div>

  </div>
  <div className="flex-grow flex flex-col justify-between">
    <h2 className="text-sm text-black text-center font-semibold mb-2">{announcement.title}</h2>
    <div className="flex justify-center mt-auto">
      <button
        onClick={() => setReadMoreId(announcement._id)}
        className="bg-orange-400 text-sm text-white py-2 px-5 rounded-lg hover:bg-orange-600 transition-all"
      >
        Read More
      </button>
    </div>
  </div>
</div>

          ))}
        </div>
      </div>

      {selectedAnnouncement && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="relative w-full max-w-5xl h-[90vh] bg-white rounded shadow-lg overflow-hidden">
            <button
              onClick={() => setReadMoreId(null)}
              className="absolute top-13 right-5 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 z-10"
            >
              ✕ Close
            </button>
            <iframe
  src={`/api/files/${selectedAnnouncement.file._id}`}
  title="PDF Viewer"
  width="100%"
  height="100%"
  style={{ border: 'none' }}
/>

          </div>
        </div>
      )}
    </>
  );
}
