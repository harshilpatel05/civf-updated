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
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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

  useEffect(() => {
    if (newsItems.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % newsItems.length);
      }, 5000);

      return () => clearInterval(intervalRef.current as NodeJS.Timeout);
    }
  }, [newsItems]);

  const handleManualScroll = (direction: 'left' | 'right') => {
    if (newsItems.length === 0) return;

    setCurrentIndex((prevIndex) =>
      direction === 'left'
        ? (prevIndex - 1 + newsItems.length) % newsItems.length
        : (prevIndex + 1) % newsItems.length
    );
  };

  const currentItem = newsItems[currentIndex];

  return (
    <div className="bg-rose-100 relative w-full py-10 flex flex-col items-center">
      <h1 className="text-3xl lg:text-5xl font-extrabold text-gray-800 mb-8 text-center">
        News & Highlights
      </h1>

      <div className="relative w-full max-w-[600px] h-[450px] flex items-center justify-center overflow-hidden bg-white rounded-3xl shadow-xl border border-gray-300">
        {currentItem && (
          <div className="relative w-full h-full">
            <Image
              key={currentItem._id}
              src={`/api/images/${currentItem.imageId}?bucket=news`}
              alt="News"
              fill
              className="object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/300?text=Image+Not+Found';
              }}
              sizes="(max-width: 600px) 100vw, 600px"
            />
          </div>
        )}
        <button
          onClick={() => handleManualScroll('left')}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-blue-900 text-white px-3 py-2 rounded-full z-10"
        >
          ◀
        </button>
        <button
          onClick={() => handleManualScroll('right')}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-900 text-white px-3 py-2 rounded-full z-10"
        >
          ▶
        </button>
      </div>
    </div>
  );
}
