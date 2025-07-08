'use client'
import { useState, useEffect } from 'react';
import Applications from '@/components/Applications';
import LoginForm from '@/components/LoginForm';

export default function AdminApplication(){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loginStatus = localStorage.getItem('adminLoggedIn');
        if (loginStatus === 'true') {
            setIsLoggedIn(true);
        }
        setIsLoading(false);
    }, []);

    const handleLogin = (success: boolean) => {
        if (success) {
            localStorage.setItem('adminLoggedIn', 'true');
        }
        setIsLoggedIn(success);
    };

    const handleLogout = () => {
        localStorage.removeItem('adminLoggedIn');
        setIsLoggedIn(false);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-blue-900 flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    if (!isLoggedIn) {
        return <LoginForm onLogin={handleLogin} />;
    }

    return(
        <div className="min-h-screen bg-blue-900">
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
            
            <Applications />
        </div>
    )
} 