"use client";

import { useState } from "react";
import { uploadAndTranscribe } from "../actions/transcribe";
import { useRouter } from "next/navigation";

export default function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append("audio", file);

    await uploadAndTranscribe(formData);

    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <button>Upload</button>
    </form>
  );
}
