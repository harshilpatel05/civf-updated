'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

type TeamMember = {
  _id: string;
  name: string;
  imageId: string;
  position: string;
};

export default function ClientMembers() {
  const [members, setMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    fetch('/api/members')
      .then(res => res.json())
      .then((data: TeamMember[]) => setMembers(data))
      .catch(console.error);
  }, []);

  if (members.length === 0) return <p className="text-center mt-10">Loading members...</p>;

  return (
    <div className="text-center bg-rose-200 px-4 py-8">
      <h1 className="text-4xl text-black font-bold mb-8">Board of Directors</h1>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-6 max-w-6xl mx-auto">
        {members.map((member) => (
          <div
            key={member._id}
            className="bg-white rounded-3xl shadow-2xl w-64 h-80 flex flex-col items-center justify-center px-4"
          >
            <div className="w-40 h-40 relative overflow-hidden rounded-full border border-black mb-4">
              <Image
                src={`/api/images/${member.imageId}`}
                alt={member.name}
                fill
                className="object-cover rounded-full"
                sizes="160px"
              />
            </div>
            <div className="font-bold text-lg text-black text-center p-2">{member.name}</div>
            <div className="outline-1 outline-black w-45"></div>
            <div className="font-bold text-sm text-black text-center p-2">{member.position}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
