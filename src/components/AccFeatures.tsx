'use client'
export default function AccFeatures(){
  return (
    <section>
      <div className="bg-white py-5">
        <h1 className="text-3xl lg:text-5xl font-extrabold text-center text-gray-800">
          Why Choose Us?
        </h1>
      
        <div className="p-10 flex flex-row space-x-10">
          <div className="shadow-2xl w-65 h-95 relative">
            <img
              src="/why1.jpg"
              alt="Missing Image"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col">
              
              <h1 className="text-white text-3xl font-bold mt-3 text-center drop-shadow">
                Community
              </h1>
              <p className="text-center font-bold">Starting a company is solitary and challenging. Working with other people going through the same challenges makes a huge difference.</p>
            </div>
          </div>
          <div className="shadow-2xl w-65 h-95 relative">
            <img src="/why2.jpg" alt="Missing Image" className="w-full h-full object-cover" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              
              <h1 className="text-white text-3xl font-bold mt-3 text-center drop-shadow">
                360&#176; Mentorship
              </h1>
              <p>
                CIVF brings in a wide variety of 
                experts focused on marketing, culture, product design, sales, finance, and more.
              </p>
            </div>
          </div>
          <div className="shadow-2xl w-65 h-95 relative">
            <img src="/why3.jpg" alt="Missing Image" className="w-full h-full object-cover" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
             
              <p className="text-white text-2xl font-semibold mt-3 text-center drop-shadow">
                Experienced Team
              </p>
            </div>
          </div>
          <div className="shadow-2xl w-65 h-95 relative">
            <img src="/why4.jpg" alt="Missing Image" className="w-full h-full object-cover" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
             
              <p className="text-white text-2xl font-semibold mt-3 text-center drop-shadow">
                Integral Values
              </p>
            </div>
          </div>
          <div className="shadow-2xl w-65 h-95 relative">
            <img src="/why5.jpg" alt="Missing Image" className="w-full h-full object-cover" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              
              <p className="text-white text-2xl font-semibold mt-3 text-center drop-shadow">
                Strong support system of University
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

