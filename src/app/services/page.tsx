'use client'
import Navbar from '@/components/Navbar'
import Header from '@/components/Header'
import Contact from '@/components/Contact'
import Services from '@/components/Services'
export default function Facilities() {
    return (
        <div className="bg-white min-h-screen">
            <Header />
            <Navbar />
            <Services />
            <Contact />

        </div>
    )
}