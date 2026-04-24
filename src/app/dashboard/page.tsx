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

  const transcripts = await prisma.transcript.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-8">
      <div className="flex justify-between">
        <h1>Dashboard</h1>
        <LogoutButton />
      </div>

      <UploadForm />

      {transcripts.map((t) => (
        <div key={t.id}>
          <p>{t.text}</p>
        </div>
      ))}
    </div>
  );
}
