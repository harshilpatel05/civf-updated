'use client';
import HTMLFlipBook from 'react-pageflip';
import Image from 'next/image';

type FlipbookProps = {
  pages: string[];
};

export default function Flipbook({ pages }: FlipbookProps) {
  return (
    <div className="flex justify-center items-center">
      <HTMLFlipBook
        width={400}
        height={600}
        size="fixed"
        minWidth={315}
        maxWidth={1000}
        minHeight={400}
        maxHeight={1536}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        className="shadow-xl"
        drawShadow={true}
        flippingTime={1000}
        startPage={0}
        useMouseEvents={true}
        clickEventForward={true}
        usePortrait={false}
        startZIndex={0}
        autoSize={true}
        showPageCorners={true}
        disableFlipByClick={false}
        swipeDistance={30}
        style={{ margin: 'auto' }}
      >
        {pages.map((src, index) => (
          <div key={index} className="bg-white w-full h-full flex items-center justify-center">
            <Image
              src={src}
              alt={`Page ${index + 1}`}
              width={400}
              height={600}
              className="object-contain max-h-full max-w-full"
            />
          </div>
        ))}
      </HTMLFlipBook>
    </div>
  );
}
