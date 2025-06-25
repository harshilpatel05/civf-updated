'use client';
import { useState, useEffect } from 'react';

type Member = {
  _id: string;
  name: string;
  position: string;
};

export default function Admin() {
  const [name, setName] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [position, setPosition] = useState('');
  const [message, setMessage] = useState('');
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const res = await fetch('/api/members');
    const data = await res.json();
    setMembers(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      setMessage('Please upload an image.');
      return;
    }
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);
    formData.append('position', position);

    const res = await fetch('/api/members', {
      method: 'POST',
      body: formData,
    });

    const result = await res.json();
    if (res.ok) {
      setMessage(`Uploaded: ${result._id}`);
      setName('');
      setPosition('');
      setImage(null);
      fetchMembers();
    } else {
      setMessage('Upload failed');
    }
  };

  const handleDelete = async (_id: string) => {
    const confirmed = confirm('Are you sure you want to delete this member?');
    if (!confirmed) return;
    const res = await fetch(`/api/members/${_id}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      setMessage(`Deleted member ${_id}`);
      fetchMembers();
    } else {
      setMessage('Failed to delete');
    }
  };

  return (
    <div className="flex justify-center">
      <div className="justify-center mt-12 text-black bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Add Member</h1>

        <div className="flex flex-col justify-center items-center md:flex-row gap-8">
          <form onSubmit={handleSubmit} className="flex-1 space-y-4 max-w-md">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="w-full p-2 border text-black placeholder-black border-gray-300 rounded"
            />

            <input
              type="text"
              placeholder="Position"
              value={position}
              onChange={e => setPosition(e.target.value)}
              required
              className="w-full p-2 text-black placeholder-black border border-gray-300 rounded"
            />

            <input
              type="file"
              accept="image/*"
              onChange={e => setImage(e.target.files?.[0] || null)}
              required
              className="w-full p-2 placeholder-black text-black border border-gray-300 rounded"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
            >
              Upload
            </button>

            {message && <p className="text-sm text-center mt-2">{message}</p>}
          </form>

          <div className="w-100 max-h-[400px] overflow-y-auto border rounded p-4">
            <h2 className="text-xl font-semibold mb-4">Existing Members</h2>
            {members.length === 0 ? (
              <p className="text-gray-500">No members uploaded yet.</p>
            ) : (
              <ul className="space-y-4">
                {members.map(member => (
                  <li
                    key={member._id}
                    className="flex items-center justify-between border p-2 rounded"
                  >
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-gray-600">{member.position}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(member._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
