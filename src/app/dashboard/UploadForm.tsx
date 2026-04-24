"use client";

import { useState } from "react";
import { uploadAndTranscribe } from "../actions/transcribe";
import { useRouter } from "next/navigation";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("audio", file);

      const result = await uploadAndTranscribe(formData);

      if (result.success) {
        setFile(null);
        router.refresh(); 
      }
    } catch (err: any) {
      setError(err.message || "Failed to transcribe audio.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} className="space-y-4">
      {error && <p className="text-red-500 text-sm">{error}</p>}
      
      <div className="flex items-center space-x-4">
        <input
          type="file"
          accept="audio/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100 cursor-pointer"
          required
        />
        <button
          type="submit"
          disabled={!file || loading}
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 transition whitespace-nowrap"
        >
          {loading ? "Transcribing..." : "Transcribe"}
        </button>
      </div>
      <p className="text-xs text-gray-500">Max duration: 1 minute. Formats: .mp3, .wav, .m4a</p>
    </form>
  );
}