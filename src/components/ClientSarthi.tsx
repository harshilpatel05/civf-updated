'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type TeamMember = {
  _id: string;
  imageId: string;
};

export default function ClientSarthi() {
  const [members, setMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    fetch('/api/sarthi')
      .then(res => res.json())
      .then((data: TeamMember[]) => setMembers(data))
      .catch(console.error);
  }, []);

  if (members.length === 0) return <p className="text-center mt-10">Loading images...</p>;

  return (
    <div className="bg-rose-200 px-4 py-10 text-center">
      <h1 className="text-4xl text-black font-bold mb-10">CIVF&apos;s Sarathi</h1>
      <div className="flex flex-wrap justify-center gap-6 max-w-7xl mx-auto">
        {members.map((member) => (
          <div
            key={member._id}
            className="bg-white shadow-2xl w-70 h-90 rounded-4xl overflow-hidden flex items-center justify-center relative"
          >
            <Image
              src={`/api/images/${member.imageId}`}
              alt="Sarthi"
              fill
              className="object-contain rounded-xl"
              sizes="(max-width: 768px) 100vw, 280px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
