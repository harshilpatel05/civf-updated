'use client';
import { useEffect, useRef, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });
export default function Clienttestimonials({ testimonials }: { testimonials: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: 'left' | 'right') => {
    const cardWidth =
      scrollRef.current?.firstChild instanceof HTMLElement
        ? scrollRef.current.firstChild.clientWidth
        : 0;
    const newIndex =
      direction === 'left'
        ? Math.max(0, currentIndex - 1)
        : Math.min(testimonials.length - 1, currentIndex + 1);
    setCurrentIndex(newIndex);
    scrollRef.current?.scrollTo({
      left: cardWidth * newIndex,
      behavior: 'smooth',
    });
  };
  return (
    <div className="relative bg-[url('/backdrop.png')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-white/95 z-0"></div>
      <div className="relative z-10 p-8">
        <div className="w-full text-center py-4">
          <h1 className="text-3xl lg:text-5xl font-extrabold text-gray-800">
            Testimonials
          </h1>
        </div>
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-6 mt-6 min-h-[400px]">
          <div className="w-full lg:w-1/2 flex justify-center items-center p-6">
            <div className="w-full max-w-2xl">
              {testimonials[currentIndex]?.video?.filename ? (
                <ReactPlayer
                  url={`/api/video/${testimonials[currentIndex].video.filename}`}
                  controls
                  playing={true}
                  muted={true}
                  width="100%"
                  height="auto"
                  config={{
                    file: {
                      attributes: {
                        controlsList: 'nodownload nofullscreen noremoteplayback',
                        disablePictureInPicture: true,
                      },
                    },
                  }}
                />
              ) : (
                <p className="text-white">No video available</p>
              )}
            </div>
          </div>
          <div className="w-full lg:w-1/2 relative flex items-center">
            <button
              onClick={() => scroll('left')}
              className="absolute fas fa-arrow-left left-0 top-1/2 -translate-y-1/2 z-20 bg-blue-900 text-white px-3 py-2 rounded-l"
            >
              
            </button>
            <button
              onClick={() => scroll('right')}
              className="absolute fas fa-arrow-right right-0 top-1/2 -translate-y-1/2 z-20 bg-blue-900 text-white px-3 py-2 rounded-r"
            >
              
            </button>
            <div
              ref={scrollRef}
              className="flex flex-nowrap overflow-x-hidden scroll-smooth h-full px-10 w-full"
            >
              {testimonials.map((testimonial: any) => (
                <div
                  key={testimonial._id}
                  className="min-w-full flex flex-col px-10 justify-center items-center h-full"
                >
                  <h1 className="text-2xl px-5 text-gray-600 italic text-center mb-2">
                    &quot;{testimonial.testimonial}&quot;
                  </h1>
                  <div className="flex justify-center">
                    <div className="bg-black w-60 h-1"></div>
                  </div>
                  <h2 className="text-xl px-5 text-black text-center mt-2">
                    {testimonial.name}
                  </h2>
                  <h2 className="text-xl italic px-5 text-black/80 text-center mt-2">
                    -{testimonial.person}
                  </h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
