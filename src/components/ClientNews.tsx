'use client';

import '@fortawesome/fontawesome-free';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

type NewsItem = {
  _id: string;
  imageId: string;
  uploadedAt: string;
};

export default function ClientNews() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [readMoreId, setReadMoreId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const selectedNews = newsItems.find(item => item._id === readMoreId);

  useEffect(() => {
    fetch('/api/news')
      .then((res) => res.json())
      .then((data: unknown[]) => {
        const sorted = data
          .map((item: unknown) => {
            const n = item as Partial<NewsItem> & { _id: string };
            return {
              ...n,
              _id: n._id?.toString() ?? '',
              imageId: n.imageId?.toString() ?? '',
              uploadedAt: n.uploadedAt ?? '',
            };
          })
          .sort((a, b) =>
            new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
          );
        setNewsItems(sorted);
      })
      .catch(console.error);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    document.body.style.overflow = readMoreId !== null ? 'hidden' : '';
  }, [readMoreId]);

  return (
    <>
      <div className="bg-blue-900 pb-8 relative">
        <div className="w-full text-center py-4">
          <h1 className="text-3xl lg:text-5xl font-extrabold text-center text-white">
            News & Highlights
          </h1>
        </div>

        <div className="flex items-center justify-center w-full relative">
          <button
            onClick={() => scroll('left')}
            className="bg-white text-blue-900 text-3xl px-6 py-4 rounded-full z-10 shadow-lg mx-2"
          >
            ←
          </button>
          <div
            ref={scrollRef}
            className="flex flex-row space-x-1 px-4 pb-4 overflow-x-auto scroll-smooth"
            style={{ maxWidth: '90vw' }}
          >
            {newsItems.map((newsItem) => (
              <div
                key={newsItem._id}
                className="bg-white shadow-xl w-120 h-130 m-2 p-4 rounded border border-gray-200 flex flex-col justify-between"
              >
                <div className="flex justify-center m-2">
                  <div className="w-100 h-100 relative flex justify-center items-center overflow-hidden">
                    <Image
                      src={`/api/images/${newsItem.imageId}?bucket=news`}
                      alt="News"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/300?text=Image+Not+Found';
                      }}
                      fill
                      className="object-contain w-full h-full"
                    />
                  </div>
                </div>

                <div className="flex-grow flex flex-col justify-between">
                  <h2 className="text-sm text-black text-center font-semibold mb-2">
                  </h2>
                  <div className="flex justify-center mt-auto">
                    <button
                      onClick={() => setReadMoreId(newsItem._id)}
                      className="bg-rose-400 text-sm text-white py-2 px-5 rounded-lg hover:bg-rose-600 transition-all"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => scroll('right')}
            className="bg-white text-blue-900 text-3xl px-6 py-4 rounded-full z-10 shadow-lg mx-2"
          >
            →
          </button>
        </div>
      </div>

      {selectedNews && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="relative w-full max-w-5xl h-[90vh] bg-white rounded shadow-lg overflow-hidden">
            <button
              onClick={() => setReadMoreId(null)}
              className="absolute top-4 right-5 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 z-10"
            >
              ✕ Close
            </button>
            <div className="w-full h-full flex items-center justify-center p-8">
              <Image
                src={`/api/images/${selectedNews.imageId}?bucket=news`}
                alt="News"
                fill
                className="object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/300?text=Image+Not+Found';
                }}
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
