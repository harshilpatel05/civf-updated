'use client';
import '@fortawesome/fontawesome-free'
import { useEffect, useRef, useState } from 'react';
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
      .then((data) => {
        const sorted = data
          .map((item: any) => ({
            ...item,
            _id: item._id.toString(),
            imageId: item.imageId?.toString() || '',
            uploadedAt: item.uploadedAt || '',
          }))
          .sort((a: NewsItem, b: NewsItem) =>
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
                <img
        key={currentItem._id}
        src={`/api/images/${currentItem.imageId}?bucket=news`}
        alt="News"
        onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/300?text=Image+Not+Found')}
        className="object-contain w-full h-full transition-all duration-500"
      />
        )}
        <button
          onClick={() => handleManualScroll('left')}
          className="absolute fas fa-arrow-left left-2 top-1/2 transform -translate-y-1/2 bg-blue-900 text-white px-3 py-2 rounded-full z-10"
        >
          
        </button>
        <button
          onClick={() => handleManualScroll('right')}
          className="absolute fas fa-arrow-right right-2 top-1/2 transform -translate-y-1/2 bg-blue-900 text-white px-3 py-2 rounded-full z-10"
        >
          
        </button>
      </div>

    
    </div>
  );
}
