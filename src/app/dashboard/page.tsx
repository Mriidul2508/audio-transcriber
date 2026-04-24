import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import UploadForm from "./UploadForm";
import LogoutButton from "./LogoutButton";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) redirect("/login");

  // Fetch transcripts ordered by newest first
  const transcripts = await prisma.transcript.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Transcription Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-500">Logged in as {session.user.name || "Admin"}</span>
          <LogoutButton />
        </div>
      </nav>

      <main className="max-w-6xl mx-auto p-6 mt-6">
        {/* Upload Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">New Transcription</h2>
          <UploadForm />
        </div>

        {/* Transcripts Matrix / Grid */}
        <div className="mb-4 flex justify-between items-end">
          <h2 className="text-lg font-semibold text-gray-800">Your Transcripts</h2>
          <span className="text-sm text-gray-500 bg-gray-200 px-3 py-1 rounded-full">Total: {transcripts.length}</span>
        </div>

        {transcripts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200 text-gray-500">
            No transcripts found. Upload an audio file to get started!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {transcripts.map(t => (
              <div key={t.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col h-64">
                <div className="text-xs text-gray-400 mb-3 border-b pb-2 flex justify-between">
                  <span>ID: {t.id.slice(-6)}</span>
                  <span>{new Date(t.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="text-gray-700 text-sm overflow-y-auto pr-2 flex-grow custom-scrollbar">
                  {t.text}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
