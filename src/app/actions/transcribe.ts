"use server"

import { GoogleGenAI } from '@google/genai';
import { PrismaClient } from '@prisma/client';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const prisma = new PrismaClient();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function uploadAndTranscribe(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const file = formData.get('audio') as File;
  if (!file) throw new Error("No audio file provided");

  const buffer = await file.arrayBuffer();
  const base64Data = Buffer.from(buffer).toString('base64');

  const response = await ai.models.generateContent({
    model: 'gemini-1.5-flash',
    contents: [{
      role: 'user',
      parts: [
        { text: 'You are a transcription assistant. Transcribe the following audio accurately. Return ONLY the transcript text, nothing else.' },
        { inlineData: { data: base64Data, mimeType: file.type } }
      ]
    }]
  });

  const transcriptText = response.text || "Transcription failed.";

  await prisma.transcript.create({
    data: {
      text: transcriptText,
      userId: session.user.id,
    }
  });

  return { success: true, text: transcriptText };
}
