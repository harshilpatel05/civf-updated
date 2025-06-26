import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Image from "next/image";

const centers = [
  {
    name: "Charusat Space Research and Technology Center",
    image: "/Benefits/Services/academia/csrtc.png",
    link: "https://civf.co.in/dearflip-jquery-flipbook/examples/2L1Space.html",
  },
  {
    name: "CHARUSAT IPR Cell",
    image: "/Benefits/Services/academia/ipr.png",
    link: "https://civf.co.in/dearflip-jquery-flipbook/examples/3L1PRCELL9X4.html",
  },
  {
    name: "CHARUSAT ERP Developemt Cell",
    image: "/Benefits/Services/academia/erp.png",
    link: "https://civf.co.in/dearflip-jquery-flipbook/examples/4L1e-Gov.html",
  },
  {
    name: "Dr. K. C. Patel R & D Center (KRADLE)",
    image: "/Benefits/Services/academia/kcp.png",
    link: "https://civf.co.in/dearflip-jquery-flipbook/examples/6L1KRAD.html/",
  },
  {
    name: "Academic Quality Management & Assurance Center",
    image: "/Benefits/Services/academia/acq.png",
    link: "https://civf.co.in/dearflip-jquery-flipbook/examples/ACQMA_NAAC.html",
  },
  {
    name: "Charusat Pharmaceutical Research Consultancy and Testing Cell",
    image: "/Benefits/Services/academia/phq.png",
    link: "https://civf.co.in/dearflip-jquery-flipbook/examples/CHARUSATPharmaceutical.html",
  },
 
];

export default function AcademiaPage() {
  return (
    <div className="min-h-screen bg-rose-50">
      <Header />
      <Navbar />
      <div className="py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Services for Academia</h1>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {centers.map((center) => (
            <a
              key={center.name}
              href={center.link}
              target="_blank"
              rel="noopener noreferrer"
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
            </a>
          ))}
        </div>
      </div>
      <Contact />
    </div>
  );
} 