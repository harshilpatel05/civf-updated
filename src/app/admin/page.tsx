'use client';
import { useState } from 'react';
import MembersUpload from '@/components/MembersUpload';
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

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: inputPassword }),
    });

    const data = await res.json();

    if (res.ok && data.success) {
      setIsAuthenticated(true);
    } else {
      alert(data.message || 'Incorrect password');
    }
  } catch (error) {
    console.error('Login failed:', error);
    alert('Something went wrong. Please try again.');
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
      <MembersUpload />
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
