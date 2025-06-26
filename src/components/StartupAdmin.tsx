"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

type Startup = {
  _id: string;
  name: string;
  description: string;
  logoUrl: string;
};

export default function StartupAdmin() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [startups, setStartups] = useState<Startup[]>([]);

  useEffect(() => {
    fetchStartups();
  }, []);

  const fetchStartups = async () => {
    const res = await fetch("/api/startups");
    const data = await res.json();
    setStartups(data);
  };

  const showMessage = (msg: string, type: "success" | "error") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setLogo(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setLogoPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || !logo) {
      showMessage("❌ Please fill all required fields and upload a logo.", "error");
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("logo", logo);
    try {
      const res = await fetch("/api/startups", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        showMessage("✅ Startup added!", "success");
        setName("");
        setDescription("");
        setLogo(null);
        setLogoPreview(null);
        fetchStartups();
      } else {
        const errorText = await res.text();
        showMessage(`❌ Upload failed: ${errorText}`, "error");
      }
    } catch {
      showMessage("❌ Network error. Please try again.", "error");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this startup?")) return;
    const res = await fetch("/api/startups", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      showMessage("🗑️ Startup deleted!", "success");
      fetchStartups();
    } else {
      showMessage("❌ Failed to delete startup.", "error");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="justify-center mt-12 text-black bg-white p-6 rounded-xl shadow-lg w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-center mb-6">Add Startup</h1>
        {message && (
          <div className={`mb-4 p-3 rounded-lg text-center font-medium ${
            messageType === "success"
              ? "bg-green-100 text-green-800 border border-green-300"
              : "bg-red-100 text-red-800 border border-red-300"
          }`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
          <input
            type="text"
            placeholder="Startup Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="w-full p-2 border text-black placeholder-black border-gray-300 rounded"
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
            className="w-full p-2 border text-black placeholder-black border-gray-300 rounded"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="w-full p-2 border text-black border-gray-300 rounded"
            required
          />
          {logoPreview && (
            <div className="flex justify-center mt-2">
              <Image src={logoPreview} alt="Logo Preview" width={96} height={96} className="w-24 h-24 rounded-full object-contain border" style={{ background: '#fff' }} />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
          >
            Add Startup
          </button>
        </form>
        <h2 className="text-xl font-semibold mt-10 mb-4">Existing Startups</h2>
        {startups.length === 0 ? (
          <p className="text-gray-500">No startups added yet.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {startups.map((s) => (
              <li key={s._id} className="border p-4 rounded shadow flex items-center gap-4">
                <Image src={s.logoUrl} alt={s.name} width={64} height={64} className="w-16 h-16 rounded-full object-contain border" style={{ background: '#fff' }} />
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{s.name}</h3>
                  <p className="text-sm text-gray-700">{s.description}</p>
                </div>
                <button
                  onClick={() => handleDelete(s._id)}
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
  );
} 