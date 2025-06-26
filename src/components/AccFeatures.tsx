'use client';

import Image from 'next/image';

export default function AccFeatures() {
  return (
    <section>
      <div className="bg-white py-5">
        <h1 className="text-3xl lg:text-5xl font-extrabold text-center text-gray-800">
        Features of the Program
        </h1>

        <div className="p-10 flex flex-row space-x-10">
          <div className="shadow-2xl w-65 h-95 relative">
            <Image
              src="/why1.jpg"
              alt="Missing Image"
              fill
              className="w-full h-full object-cover"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4 w-full">
              <h1 className="text-white text-3xl font-bold mt-3 text-center drop-shadow">
                Community
              </h1>
              <p className="text-center font-semibold text-sm sm:text-base max-w-[90%] break-words">
                Starting a company is solitary and challenging. Working with other people going through the same challenges makes a huge difference.
              </p>
            </div>
          </div>

          <div className="shadow-2xl w-65 h-95 relative">
            <Image
              src="/why2.jpg"
              alt="Missing Image"
              fill
              className="w-full h-full object-cover"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4 w-full">
              <h1 className="text-white text-3xl font-bold mt-3 text-center drop-shadow">
                360&#176; Mentorship
              </h1>
              <p className="text-center font-semibold text-sm sm:text-base max-w-[90%] break-words">
                CIVF brings in a wide variety of experts focused on marketing, culture, product design, sales, finance, and more.
              </p>
            </div>
          </div>

          <div className="shadow-2xl w-65 h-95 relative">
            <Image
              src="/why3.jpg"
              alt="Missing Image"
              fill
              className="w-full h-full object-cover"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4 w-full">
              <h1 className="text-white text-2xl font-bold mt-3 text-center drop-shadow">
                Hands On Support
                </h1>
              <p className="text-center font-semibold text-sm sm:text-base max-w-[90%] break-words">We&apos;ll work together on your business and product strategy, growth metrics and investor pitches.</p>
            </div>
          </div>

          <div className="shadow-2xl w-65 h-95 relative">
            <Image
              src="/why4.jpg"
              alt="Missing Image"
              fill
              className="w-full h-full object-cover"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4 w-full">
              <h1 className="text-white text-2xl font-bold mt-3 text-center drop-shadow">
                Network
              </h1>
              <p className="text-center font-semibold text-sm sm:text-base max-w-[90%] break-words">You&apos;ll have access to several founders, mentors and our own staff. Thanks to our massive network, businesses can build relationships and partnerships that wouldn&apos;t be possible at their size without CIVF.</p>
            </div>
          </div>

          <div className="shadow-2xl w-65 h-95 relative">
            <Image
              src="/why5.jpg"
              alt="Missing Image"
              fill
              className="w-full h-full object-cover"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-4 w-full">
              <h1 className="text-white text-2xl font-bold mt-3 text-center drop-shadow">
                  Money
              </h1>
              <p className="text-center font-semibold text-sm sm:text-base max-w-[90%] break-words">CIVF&apos;s network will help you connect with investors.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
