"use client";

import { useState } from "react";
import { uploadAndTranscribe } from "../actions/transcribe";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("audio", file);

    try {
      await uploadAndTranscribe(formData);
      setFile(null); // Clear file after success
      window.location.reload(); // Refresh to show new transcript
    } catch (error) {
      alert("Transcription failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <input 
        type="file" 
        accept="audio/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)} 
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      <button 
        disabled={!file || loading}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap transition"
      >
        {loading ? "Processing via Gemini..." : "Upload & Transcribe"}
      </button>
    </form>
  );
}
