'use client';
import { useState } from 'react';
import Admin from '@/components/Admin';
import NewsUploadPage from '@/components/News';
import Sarthi from '@/components/Sarthi';
import UploadEvent from '@/components/EventUpload';
import ClientTestimonialsAdmin from '@/components/ClientTestimonialsAdmin';
import AnnouncementUpload from '@/components/AnnouncementUpload';
import StartupAdmin from '@/components/StartupAdmin';
import GalleryAdmin from '@/components/GalleryAdmin';
export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputPassword, setInputPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPassword === 'civf2025') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col text-black items-center justify-center min-h-screen bg-gray-100 p-4">
        <h1 className="text-3xl font-bold text-center mb-4">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-4 justify-center">
          <input
            type="password"
            placeholder="Enter password"
            className="px-4 py-2 border text-black rounded w-full"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className='bg-blue-900'>
      <div className=''>
      <h1 className="text-4xl font-bold text-center p-5 pb-0">Board of Directors</h1>
      <Admin />
      <h1 className="text-4xl font-bold text-center p-5 pb-0">CIVF SARTHI</h1>
      <Sarthi />
      <h1 className="text-4xl font-bold text-center p-5 pb-0">Announcements</h1>
      <AnnouncementUpload />
      <h1 className="text-4xl font-bold text-center p-5 pb-0">Startups</h1>
      <StartupAdmin />
      <h1 className="text-4xl font-bold text-center p-5 pb-0">Gallery</h1>
      <GalleryAdmin />
      <h1 className="text-4xl font-bold text-center p-5 pb-0">Testimonials</h1>
      <ClientTestimonialsAdmin />
      <h1 className="text-4xl font-bold text-center p-5 pb-0">News</h1>
      <NewsUploadPage />
      <h1 className="text-4xl font-bold text-center p-5 pb-0">Events</h1>
      <UploadEvent />
      
      </div>
    </div>
  );
}
