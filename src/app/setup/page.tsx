"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SetupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleSignup = async (e: any) => {
    e.preventDefault();
    setStatus("Creating admin account...");
    
    const { data, error } = await authClient.signUp.email({ 
        email, 
        password, 
        name: "Admin" 
    });

    if (error) {
        setStatus("Error: " + JSON.stringify(error));
    } else {
        setStatus("Success! Admin created. Redirecting to login...");
        setTimeout(() => router.push("/login"), 2000);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-2xl font-bold">Secret Admin Setup</h1>
      <p className="text-sm text-gray-500">Delete this page after creating the account!</p>
      
      <form onSubmit={handleSignup} className="flex flex-col space-y-4 w-80">
        <input 
          type="email" 
          placeholder="Admin Email" 
          onChange={(e)=>setEmail(e.target.value)} 
          className="border p-2 rounded text-black" 
          required 
        />
        <input 
          type="password" 
          placeholder="Admin Password" 
          onChange={(e)=>setPassword(e.target.value)} 
          className="border p-2 rounded text-black" 
          required 
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Create Admin
        </button>
      </form>
      <p className="text-green-600 font-semibold">{status}</p>
    </div>
  );
}
