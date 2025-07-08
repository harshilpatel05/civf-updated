'use client'
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isBenefitsDropdownOpen, setIsBenefitsDropdownOpen] = useState(false);
  const [isCivfDropdownOpen, setIsCivfDropdownOpen] = useState(false);
  const [isContactDropdownOpen, setIsContactDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const toggleBenefitsDropdown = () => {
    setIsBenefitsDropdownOpen(prev => !prev);
  };

  const toggleCivfDropdown = () => {
    setIsCivfDropdownOpen(prev => !prev);
  };

  const toggleContactDropdown = () => {
    setIsContactDropdownOpen(prev => !prev);
  };

  return (
    <div>
      
      <nav className="flex bg-blue-900 w-full justify-center flex-wrap text-white text-base relative">
      <Link href="/" className="bg-blue-900 hover:bg-orange-500 transition p-3">Home</Link>
      <Link href="/supporters" className="bg-blue-900 hover:bg-orange-500 transition p-3">Our Supporters</Link>
        <Link href="/aboutUs" className="bg-blue-900 hover:bg-orange-500 transition p-3">About Us</Link>

        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="bg-blue-900 flex hover:bg-orange-500 transition p-3 text-white"
          >
            Acceleration Program <div className='scale-80 px-1'>▼</div>
          </button>

          {isDropdownOpen && (
            <div className="absolute bg-blue-900 w-48 shadow-lg mt-1 z-10">
              <Link href="/accelaration-program#accFeatures" className="block px-4 py-2 hover:bg-orange-500">
                About Program
              </Link>
              <Link href="/accelaration-program#flow" className="block px-4 py-2 hover:bg-orange-500">
                Application Process
              </Link>
              <Link href="/accelaration-program#form" className="block px-4 py-2 hover:bg-orange-500">
                Apply to Program
              </Link>
              <Link href="/application-status" className="block px-4 py-2 hover:bg-orange-500">
                Check Application Status
              </Link>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={toggleBenefitsDropdown}
            className="bg-blue-900 flex hover:bg-orange-500 transition p-3 text-white"
          >
            Benefits <div className='scale-80 px-1'>▼</div>
          </button>
          {isBenefitsDropdownOpen && (
            <div className="absolute bg-blue-900 w-48 shadow-lg mt-1 z-10">
              <Link href="/facilities" className="block px-4 py-2 hover:bg-orange-500">
                Facilities
              </Link>
              <Link href="/services" className="block px-4 py-2 hover:bg-orange-500">
                Services
              </Link>
            </div>
          )}
        </div>

        <Link href="/startup" className="bg-blue-900 hover:bg-orange-500 transition p-3">Start-Up Portfolio</Link>
        <div className="relative">
          <button
            onClick={toggleCivfDropdown}
            className="bg-blue-900 flex hover:bg-orange-500 transition p-3 text-white"
          >
            CIVF Services <div className='scale-80 px-1'>▼</div>
          </button>
          {isCivfDropdownOpen && (
            <div className="absolute bg-blue-900 w-48 shadow-lg mt-1 z-10">
              <Link href="/industries" className="block px-4 py-2 hover:bg-orange-500">
                For Industries
              </Link>
              <Link href="/academia" className="block px-4 py-2 hover:bg-orange-500">
                For Academia
              </Link>
            </div>
          )}
        </div>
        <Link href="/career" className="bg-blue-900 hover:bg-orange-500 transition p-3">Career at CIVF</Link>
        <div className="relative">
          <button
            onClick={toggleContactDropdown}
            className="bg-blue-900 flex hover:bg-orange-500 transition p-3 text-white"
          >
            Contact <div className='scale-80 px-1'>▼</div>
          </button>
          {isContactDropdownOpen && (
            <div className="absolute bg-blue-900 w-48 shadow-lg mt-1 z-10">
              <Link href="/contact" className="block px-4 py-2 hover:bg-orange-500">
                Contact Us
              </Link>
              <Link href="/faq" className="block px-4 py-2 hover:bg-orange-500">
                FAQs
              </Link>
              <Link href="/gallery" className="block px-4 py-2 hover:bg-orange-500">
                Gallery
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
