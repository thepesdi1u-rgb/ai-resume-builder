import Groq from 'groq-sdk';

const groqApiKey = process.env.GROQ_API_KEY;

if (!groqApiKey) {
  console.warn("Warning: GROQ_API_KEY environment variable is not set. Resumes cannot be generated.");
}

export const groq = new Groq({
  apiKey: groqApiKey || "dummy_key", // Groq requires a string, but it will fail on the API side if it's dummy
});
