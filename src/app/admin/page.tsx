'use client';
import { useState, useEffect } from 'react';
import MembersUpload from '@/components/MembersUpload';
import NewsUploadPage from '@/components/News';
import Sarthi from '@/components/Sarthi';
import UploadEvent from '@/components/EventUpload';
import ClientTestimonialsAdmin from '@/components/ClientTestimonialsAdmin';
import AnnouncementUpload from '@/components/AnnouncementUpload';
import StartupAdmin from '@/components/StartupAdmin';
import GalleryAdmin from '@/components/GalleryAdmin';
import LoginForm from '@/components/LoginForm';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const loginStatus = localStorage.getItem('adminLoggedIn');
    if (loginStatus === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (success: boolean) => {
    if (success) {
      localStorage.setItem('adminLoggedIn', 'true');
    }
    setIsAuthenticated(success);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-black">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className='bg-blue-900 min-h-screen'>
      {/* Header with logout button */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-black">CIVF Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-sm text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </div>

      <div className=''>
        <h1 className="text-4xl font-bold text-center p-5 pb-0 text-white">Board of Directors</h1>
        <MembersUpload />
        <h1 className="text-4xl font-bold text-center p-5 pb-0 text-white">CIVF SARTHI</h1>
        <Sarthi />
        <h1 className="text-4xl font-bold text-center p-5 pb-0 text-white">Announcements</h1>
        <AnnouncementUpload />
        <h1 className="text-4xl font-bold text-center p-5 pb-0 text-white">Startups</h1>
        <StartupAdmin />
        <h1 className="text-4xl font-bold text-center p-5 pb-0 text-white">Gallery</h1>
        <GalleryAdmin />
        <h1 className="text-4xl font-bold text-center p-5 pb-0 text-white">Testimonials</h1>
        <ClientTestimonialsAdmin />
        <h1 className="text-4xl font-bold text-center p-5 pb-0 text-white">News</h1>
        <NewsUploadPage />
        <h1 className="text-4xl font-bold text-center p-5 pb-0 text-white">Events</h1>
        <UploadEvent />
      </div>
    </div>
  );
}
