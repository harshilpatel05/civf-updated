'use client';

import Image from 'next/image';
import Navbar from './Navbar';
import Header from './Header';

export default function Hero() {
  const data = [
    { number: '₹7.44 Cr+', title: 'Startup Funds Raised', color: 'purple'},
    { number: '45+', title: 'Startups Incubated', color: 'sky' },
    { number: '₹1.4 Cr+', title: 'Grant Disbursed', color: 'rose'},
    { number: '12+', title: 'Social Innovations', color: 'yellow' },
    { number: '30+', title: 'Patents Filed', color: 'green' },
    { number: '41', title: 'Industry Mentors', color: 'blue' },
    { number: '800+', title: 'Donors', color: 'purple' },
    { number: '6', title: 'VC Firms', color: 'pink' },
    { number: '10', title: 'Corporate Partners', color: 'sky' },
    { number: '9987', title: 'Awareness Programs', color: 'sky' },
    { number: '436', title: 'Expert Talks', color: 'rose' },
    { number: '481', title: 'Project Supported', color: 'yellow' },
    { number: '236', title: 'Proof of Concept Supported', color: 'green' },
    { number: '136', title: 'Sanctioned for Financial Support', color: 'blue' },
    { number: '42', title: 'Eligible for Seed Money', color: 'purple' },
    { number: '29', title: 'Companies Registered', color: 'pink' },
   
  ];

  const colorMap: Record<string, string> = {
    sky: 'text-sky-600',
    rose: 'text-rose-600',
    yellow: 'text-yellow-600',
    green: 'text-green-600',
    blue: 'text-blue-600',
    purple: 'text-purple-600',
    pink: 'text-pink-600',
  };

  return (
    <div>
      <div className="bg-gradient-to-tr from-blue-900 from-10% to-orange-600 min-h-screen">
        <Header />
        <Navbar />

        <div className="container mx-auto px-6 lg:grid lg:grid-cols-2 lg:gap-10 items-center">
          <div>
            <h1 className="text-5xl text-shadow-black font-extrabold text-white">
              CHARUSAT Innovative Ventures Foundation
            </h1>
            <p className="lg:text-2xl text-shadow-black text-white mt-4 text-justify">
              We are an Accelerator with a wide network of investors, mentors,
              and successful entrepreneurs who are willing to invest their time,
              expertise and money in helping enterprises to flourish. We also
              extend services for Enterprises’ Growth.
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <Image
              src="/hero-1.svg"
              className="p-5"
              width={500}
              height={500}
              alt="Hero Illustration"
            />
          </div>
        </div>
      </div>

      {/* Vision & Mission Section */}
      <div className="relative bg-[url('/missionBg.jpg')] bg-cover bg-center w-full h-96 flex flex-row space-x-10 items-center justify-center">
        <div className="absolute w-full inset-0 bg-black/40"></div>

        <div className="relative flex-col bg-blue-900/60 backdrop-blur-2xl shadow-2xl p-5 h-90 z-10 max-w-md px-6 text-center text-white">
          <h1 className="text-5xl font-bold mt-10 mb-4">Vision</h1>
          <p className="text-2xl leading-relaxed">
            To emerge as a foremost organization leveraging innovation for the benefit
            of society through supporting new ventures.
          </p>
        </div>

        <div className="relative bg-blue-900/60 backdrop-blur-2xl shadow-2xl p-5 h-90 z-10 max-w-md px-6 text-center text-white">
          <h1 className="text-5xl font-bold mt-9 mb-4">Mission</h1>
          <p className="text-2xl leading-relaxed">
            To create a vibrant ecosystem to accelerate the growth of start-ups. To
            facilitate commercialization of IPR of the University for Societal
            Development.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-rose-200 py-10">
        <h1 className="text-3xl lg:text-5xl font-extrabold text-center text-gray-800">
          Why Choose Us?
        </h1>

        <div className="p-10 flex flex-row space-x-10 justify-center">
          {[
            { src: '/why1.jpg', icon: '/icons/handshake.svg', label: 'Huge Network' },
            { src: '/why2.jpg', icon: '/icons/crowd.svg', label: 'Flexibility' },
            { src: '/why3.jpg', icon: '/icons/crowd2.svg', label: 'Experienced Team' },
            { src: '/why4.jpg', icon: '/icons/thumbsup.svg', label: 'Integral Values' },
            { src: '/why5.jpg', icon: '/icons/handshake2.svg', label: 'Strong support system of University' },
          ].map(({ src, icon, label }) => (
            <div key={label} className="shadow-2xl w-65 h-95 relative">
              <div className="w-full h-full relative">
                <Image
                  src={src}
                  alt={label}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="bg-white p-6 rounded-full">
                  <Image src={icon} alt="icon" height={52} width={52} />
                </div>
                <p className="text-white text-2xl font-semibold mt-3 text-center drop-shadow">
                  {label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-14 bg-rose-50 flex flex-col content-center justify-center">
        <h1 className="text-3xl mb-10 lg:text-5xl font-extrabold text-center text-gray-800">
          CIVF in Numbers
        </h1>
        <div className="lg:w-5/6 mx-auto flex flex-wrap justify-center items-center gap-x-10 gap-y-7">
          {data.map((item) => (
            <div key={item.title} className="p-16 w-56 h-56 mx-auto bg-white rounded-full flex flex-col justify-center items-center">
              <h1 className={`text-5xl font-bold ${colorMap[item.color]}`}>
                {item.number}
              </h1>
              <h3 className="text-xl text-gray-800 my-4 mx-auto text-center">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
