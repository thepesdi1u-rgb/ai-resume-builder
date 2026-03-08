import { NextResponse } from "next/server";
import { groq } from "@/lib/groq";

export async function POST(request: Request) {
  try {
    const { resume } = await request.json();

    const prompt = `
You are an expert ATS (Applicant Tracking System) programmed to score resumes out of 100.
Evaluate this resume based on formatting, action verbs, measurable results, keyword optimization, and overall layout.
Identify areas of improvement.

Resume Content:
${resume}

Respond ONLY in valid JSON format with the following exact structure:
{
  "score": 85,
  "feedback": ["Short actionable feedback 1", "Short actionable feedback 2", "Short actionable feedback 3"]
}
`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.1,
      response_format: { type: "json_object" },
    });

    const responseContent = chatCompletion.choices[0]?.message?.content || "{}";
    const result = JSON.parse(responseContent);

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error("ATS Check Error:", error);
    return NextResponse.json(
      { error: "Failed to check ATS score" },
      { status: 500 }
    );
  }
}
