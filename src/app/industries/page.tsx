'use client';
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Flipbook from "@/components/Flipbook";
import Image from "next/image";
import { useState } from "react";

const centers = [
  {
    name: "Charusat Space Research and Technology Center",
    image: "/Benefits/Services/academia/csrtc.png",
    folder: "csrtc",
    pages: 12,
  },
  {
    name: "CHARUSAT IPR Cell",
    image: "/Benefits/Services/academia/ipr.png",
    folder: "ipr",
    pages: 2,
  },
  {
    name: "BDIPS Labs",
    image: "/Benefits/Services/academia/bdi.png",
    folder: "bdi",
    pages: 16,
  },
  {
    name: "Dr. K. C. Patel R & D Center (KRADLE)",
    image: "/Benefits/Services/academia/kcp.png",
    folder: "kradle",
    pages: 10,
  },
  {
    name: "Pramukh Swami Center of Excellence for Renewable Energy",
    image: "/Benefits/Services/academia/psc.png",
    folder: "psc",
    pages: 6,
  },
  {
    name: "Charusat Pharmaceutical Research Consultancy and Testing Cell",
    image: "/Benefits/Services/academia/phq.png",
    folder: "phq",
    pages: 7,
  },
  {
    name: "Concrete Laboratory Technology",
    image: "/Benefits/Services/academia/ctl.png",
    folder: "ctl",
    pages: 9,
  },
  {
    name: "Environmental Engineering Lab",
    image: "/Benefits/Services/academia/eel.png",
    folder: "eel",
    pages: 5,
  },
  {
    name: "Mechanical Engineering Laboratory",
    image: "/Benefits/Services/academia/mel.png",
    folder: "mel",
    pages: 8,
  },
  {
    name: "Structural Consultancy Cell",
    image: "/Benefits/Services/academia/scc.png",
    folder: "scc",
    pages: 6,
  },
];


export default function IndustriesPage() {
  const [selectedCenter, setSelectedCenter] = useState<typeof centers[0] | null>(null);


  const getPages = (folder: string, count: number) =>
  Array.from({ length: count }, (_, i) => `/flipbooks/${folder}/${i + 1}.jpg`);


  return (
    <div className="min-h-screen bg-rose-50">
      <Header />
      <Navbar />

      <div className="py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Services for Industries</h1>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {centers.map((center) => (
            <div
              key={center.name}
              onClick={() => setSelectedCenter(center)}
              className="bg-white rounded-xl shadow-lg flex flex-col items-center text-center hover:shadow-2xl transition-shadow overflow-hidden cursor-pointer"
            >
              <div className="w-full h-72 relative">
                <Image
                  src={center.image}
                  alt={center.name}
                  fill
                  className="object-cover w-full h-full"
                  style={{ borderTopLeftRadius: '0.75rem', borderTopRightRadius: '0.75rem' }}
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              </div>
              <div className="p-6 w-full">
                <h2 className="font-semibold text-lg md:text-xl text-black truncate" title={center.name}>
                  {center.name}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Contact />

      {/* Flipbook Modal */}
      {selectedCenter && (
  <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center">
    <div className="relative w-[90vw] max-w-5xl bg-white rounded-lg shadow-xl p-4">
      <button
        onClick={() => setSelectedCenter(null)}
        className="absolute top-3 right-4 text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700 z-10"
      >
        ✕ Close
      </button>
      <Flipbook pages={getPages(selectedCenter.folder, selectedCenter.pages)} />
    </div>
  </div>
)}

    </div>
  );
}
