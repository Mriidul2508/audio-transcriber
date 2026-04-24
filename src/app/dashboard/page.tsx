import { PrismaClient } from "@prisma/client";
import { auth } from "../../lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import UploadForm from "./UploadForm";
import LogoutButton from "./LogoutButton"; // Inline component added below

const prisma = new PrismaClient();

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  const transcripts = await prisma.transcript.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <LogoutButton />
      </div>

      <div className="bg-gray-100 p-6 rounded-lg mb-8">
        <h2 className="text-xl mb-4">Upload Audio (&lt; 1 min)</h2>
        <UploadForm />
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Your Transcripts</h2>
        <div className="space-y-4">
          {transcripts.map((t) => (
            <div key={t.id} className="p-4 border rounded-lg shadow-sm bg-white">
              <p className="text-sm text-gray-500 mb-2">{t.createdAt.toLocaleString()}</p>
              <p className="text-gray-800">{t.text}</p>
            </div>
          ))}
          {transcripts.length === 0 && <p className="text-gray-600">No transcripts found.</p>}
        </div>
      </div>
    </div>
  );
}
