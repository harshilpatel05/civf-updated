"use client";
import { useState, useEffect } from "react";

type Testimonial = {
  _id: string;
  name: string;
  person: string;
  testimonial: string;
  video?: { filename: string } | null;
};

export default function ClientTestimonialsAdmin() {
  const [name, setName] = useState("");
  const [person, setPerson] = useState("");
  const [testimonial, setTestimonial] = useState("");
  const [video, setVideo] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const res = await fetch("/api/testimonials");
    const data = await res.json();
    setTestimonials(data);
  };

  const showMessage = (msg: string, type: "success" | "error") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!name || !person || !testimonial) {
      showMessage("❌ Please fill all required fields.", "error");
      return;
    }

    // Validate video file if present
    if (video) {
      const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB for deployment
      if (video.size > MAX_FILE_SIZE) {
        showMessage(`❌ Video file too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB for deployment. Please compress your video.`, "error");
        return;
      }

      const allowedTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'];
      if (!allowedTypes.includes(video.type)) {
        showMessage("❌ Invalid video format. Please use MP4, WebM, OGG, or QuickTime.", "error");
        return;
      }
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("person", person);
    formData.append("testimonial", testimonial);
    if (video) formData.append("video", video);

    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        showMessage("✅ Testimonial uploaded successfully!", "success");
        setName("");
        setPerson("");
        setTestimonial("");
        setVideo(null);
        fetchTestimonials();
      } else {
        const errorText = await res.text();
        showMessage(`❌ Upload failed: ${errorText}`, "error");
      }
    } catch (err) {
      console.error('Upload error:', err);
      showMessage("❌ Network error. Please try again.", "error");
    }
  };

  const handleDelete = async (_id: string) => {
    const confirmed = confirm("Are you sure you want to delete this testimonial?");
    if (!confirmed) return;
    const res = await fetch(`/api/testimonials/${_id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      showMessage("🗑️ Testimonial deleted successfully!", "success");
      fetchTestimonials();
    } else {
      showMessage("❌ Failed to delete testimonial.", "error");
    }
  };

  return (
    <div className="flex justify-center">
      <div className="justify-center mt-12 text-black bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Add Testimonial</h1>
        
        {/* Enhanced Success/Error Message */}
        {message && (
          <div className={`mb-4 p-3 rounded-lg text-center font-medium ${
            messageType === "success" 
              ? "bg-green-100 text-green-800 border border-green-300" 
              : "bg-red-100 text-red-800 border border-red-300"
          }`}>
            {message}
          </div>
        )}

        <div className="flex flex-col justify-center items-center md:flex-row gap-8">
          <form onSubmit={handleSubmit} className="flex-1 space-y-4 max-w-md">
            <h2 className="text-2xl font-bold text-center">Upload New Testimonial</h2>
            
            {/* Deployment Tips */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <h3 className="text-sm font-semibold text-blue-800 mb-2">📋 Deployment Upload Tips:</h3>
              <ul className="text-xs text-blue-700 space-y-1">
                <li>• <strong>Videos:</strong> Maximum 4MB - Compress videos before uploading</li>
                <li>• <strong>For larger files:</strong> Upload locally first, then deploy</li>
                <li>• <strong>Compression tools:</strong> Use online video compressors if needed</li>
              </ul>
            </div>

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
              placeholder="Person (designation, etc.)"
              value={person}
              onChange={e => setPerson(e.target.value)}
              required
              className="w-full p-2 border text-black placeholder-black border-gray-300 rounded"
            />
            <textarea
              placeholder="Testimonial"
              value={testimonial}
              onChange={e => setTestimonial(e.target.value)}
              required
              className="w-full p-2 border text-black placeholder-black border-gray-300 rounded"
            />
            <input
              type="file"
              accept="video/*"
              onChange={e => setVideo(e.target.files?.[0] || null)}
              className="w-full p-2 placeholder-black text-black border border-gray-300 rounded"
            />
            <p className="text-xs text-gray-500 mt-1">
              Maximum file size: 4MB for deployment. Supported formats: MP4, WebM, OGG, QuickTime
            </p>
            {video && (
              <p className="text-xs text-blue-600">
                Selected: {video.name} ({(video.size / (1024 * 1024)).toFixed(2)}MB)
              </p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
            >
              Upload
            </button>
          </form>
          <div className="w-100 max-h-[400px] overflow-y-auto border rounded p-4">
            <h2 className="text-xl font-semibold mb-4">Existing Testimonials</h2>
            {testimonials.length === 0 ? (
              <p className="text-gray-500">No testimonials uploaded yet.</p>
            ) : (
              <ul className="space-y-4">
                {testimonials.map(t => (
                  <li
                    key={t._id}
                    className="flex items-center justify-between border p-2 rounded"
                  >
                    <div>
                      <p className="font-medium">{t.name}</p>
                      <p className="text-sm text-gray-600">{t.person}</p>
                      <p className="text-xs text-gray-700 italic">{t.testimonial}</p>
                      {t.video?.filename && (
                        <span className="text-xs text-blue-600">[Video]</span>
                      )}
                    </div>
                    <button
                      onClick={() => handleDelete(t._id)}
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