import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-900 p-8">
      <h1 className="text-4xl font-bold mb-4">Audio Transcription Portal</h1>
      <p className="text-lg text-gray-600 mb-8">Internship Assignment Submission</p>
      
      <div className="space-x-4">
        <Link 
          href="/login" 
          className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition"
        >
          Admin Login
        </Link>
        <Link 
          href="/dashboard" 
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}