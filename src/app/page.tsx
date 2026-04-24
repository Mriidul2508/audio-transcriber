import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6">
        Audio Transcription Portal
      </h1>

      <div className="space-x-4">
        <Link href="/login" className="bg-gray-300 px-6 py-2 rounded">
          Login
        </Link>

        <Link href="/dashboard" className="bg-blue-600 text-white px-6 py-2 rounded">
          Dashboard
        </Link>
      </div>
    </div>
  );
}
