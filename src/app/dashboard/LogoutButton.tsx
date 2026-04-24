"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  return (
    <button 
      onClick={async () => {
        await authClient.signOut();
        router.push("/login");
      }}
      className="text-sm font-medium text-red-600 hover:text-red-800 bg-red-50 px-4 py-2 rounded-lg transition"
    >
      Logout
    </button>
  );
}
