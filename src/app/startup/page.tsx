"use client";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Image from "next/image";

interface Startup {
  _id: string;
  name: string;
  description: string;
  logoUrl: string;
}

export default function StartupPage() {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/startups")
      .then((res) => res.json())
      .then((data) => {
        setStartups(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Could not load startups");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-10">Loading startups...</div>;

  return (
    <div className="min-h-screen bg-rose-50">
      <Header />
      <Navbar />
      <div className="py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Our Startups</h1>
        {error ? (
          <div className="text-center text-red-500 py-10">{error}</div>
        ) : startups.length === 0 ? (
          <div className="text-center py-10">No startups found.</div>
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {startups.map((s) => (
              <div
                key={s._id}
                className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition-shadow"
              >
                <Image
                  src={s.logoUrl}
                  alt={s.name}
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-full object-contain mb-4 border shadow"
                  style={{ background: '#fff' }}
                />
                <h2 className="font-extrabold text-xl md:text-2xl text-left w-full mb-2 text-black">
                  {s.name}
                </h2>
                <p className="text-gray-800 text-left w-full mb-2 text-base md:text-lg">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Contact />
    </div>
  );
}
