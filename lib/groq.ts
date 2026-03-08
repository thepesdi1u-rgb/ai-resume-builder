import Groq from 'groq-sdk';

// Safely grab the key and remove any accidental quotes or surrounding spaces the USER may have pasted in Vercel
const rawKey = process.env.GROQ_API_KEY || "";
const cleanApiKey = rawKey.replace(/['"]/g, '').trim();

if (!cleanApiKey || cleanApiKey === "dummy_key") {
  console.warn("Warning: GROQ_API_KEY environment variable is not set correctly. Resumes cannot be generated.");
}

export const groq = new Groq({
  apiKey: cleanApiKey || "dummy_key", // Fallback to avoid build crashing if completely missing
});
