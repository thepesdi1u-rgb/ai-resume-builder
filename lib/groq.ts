import Groq from 'groq-sdk';

const groqApiKey = process.env.GROQ_API_KEY || "dummy_key";

export const groq = new Groq({
  apiKey: groqApiKey,
});
