'use client'
import Navbar from '@/components/Navbar'
import Header from '@/components/Header'
import Contact from '@/components/Contact'
import Facility from '@/components/Facility'
export default function Facilities() {
    return (
        <div className="bg-white min-h-screen">
            <Header />
            <Navbar />
            <Facility />
            <Contact />

        </div>
    )
}