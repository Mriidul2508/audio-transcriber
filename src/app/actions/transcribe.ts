"use server";

import { GoogleGenAI } from "@google/genai";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function uploadAndTranscribe(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) throw new Error("Unauthorized");

  const file = formData.get("audio") as File;
  if (!file) throw new Error("No file");

  const buffer = await file.arrayBuffer();
  const base64 = Buffer.from(buffer).toString("base64");

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [{
      role: "user",
      parts: [
        { text: "Transcribe audio and return only text." },
        { inlineData: { data: base64, mimeType: file.type } }
      ]
    }]
  });

  const text = response.text || "Failed";

  await prisma.transcript.create({
    data: {
      text,
      userId: session.user.id,
    },
  });

  return { success: true };
}
