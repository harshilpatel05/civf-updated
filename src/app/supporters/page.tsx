'use client'
import Image from "next/image";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import ClientSarthi from "@/components/ClientSarthi"
import Contact from "@/components/Contact";

export default function SupportersPage() {
    return (
        <div>
            <Header />
            <Navbar />
            <div className="bg-blue-900 min-h-screen">
                <div><h1 className="text-4xl font-bold text-center p-5">Startup Ecosystem</h1></div>
                <div className="flex flex-col items-center justify-center">
                    <Image src="/sponsors/sponsors_page-0001.jpg" alt="Supporters" width={1000} height={1000} />
                    <Image src="/sponsors/sponsors_page-0002.jpg" alt="Supporters" width={1000} height={1000} />
                    <Image src="/sponsors/sponsors_page-0003.jpg" alt="Supporters" width={1000} height={1000} />
                    <Image src="/sponsors/sponsors_page-0004.jpg" alt="Supporters" width={1000} height={1000} />
                </div>
                <div>
                    <ClientSarthi/>
                </div>
            </div>
            <Contact />
        </div>
    )
}