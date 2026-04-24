"use client";
import { authClient } from "../../lib/auth-client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  
  return (
    <button 
      onClick={async () => {
        await authClient.signOut();
        router.push("/login");
        router.refresh();
      }}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
    >
      Logout
    </button>
  );
}
