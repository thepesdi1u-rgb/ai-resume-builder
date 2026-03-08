import { NextResponse } from "next/server";
import { groq } from "@/lib/groq";
import { supabase } from "@/lib/supabase";
import { resumeFormSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedData = resumeFormSchema.parse(body);

    const prompt = `
You are an expert executive resume writer. Generate a highly professional, ATS-optimized resume based on the following details. 
Return ONLY the raw markdown resume text. Do NOT include any conversation, pleasantries, or extra formatting.

Follow this EXACT markdown structure:

# ${validatedData.name}

${validatedData.email} • ${validatedData.phone} • ${validatedData.location}

## PROFESSIONAL SUMMARY
Write a compelling, ATS-optimized 3-4 sentence professional summary based on this:
${validatedData.summary}

## SKILLS
* Rewrite these skills into a concise, professional list:
${validatedData.skills}

## EXPERIENCE
${validatedData.experience.map(e => `**${e.jobTitle}**, ${e.company} | ${e.duration}
- Convert this description into 3-4 strong, action-oriented bullet points using the PAR (Problem-Action-Result) format where possible. Start each bullet with a strong action verb:
  ${e.description}`).join("\n\n")}

## EDUCATION
${validatedData.education.map(e => `**${e.degree}**, ${e.institution} | ${e.year}`).join("\n\n")}

## PROJECTS
${validatedData.projects?.map(p => `**${p.title}**
- Write 2-3 strong bullet points explaining this project:
  ${p.description}`).join("\n\n") || ""}

## CERTIFICATIONS
${validatedData.certifications ? `- ${validatedData.certifications}` : ""}
`;

    // Call Groq API
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      max_tokens: 2500,
    });

    const generatedResume = chatCompletion.choices[0]?.message?.content || "";

    if (!generatedResume) {
      throw new Error("Failed to generate resume from AI");
    }

    let resumeId = "temp-" + Date.now();
    
    // Save to local filesystem as a fallback hack
    const fs = require('fs');
    const path = require('path');
    const tempDir = path.join(process.cwd(), '.tmp-resumes');
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);
    
    fs.writeFileSync(
      path.join(tempDir, `${resumeId}.json`), 
      JSON.stringify({
        id: resumeId,
        name: validatedData.name,
        email: validatedData.email,
        raw_input: validatedData,
        generated_resume: generatedResume,
      })
    );

    return NextResponse.json({ id: resumeId });
  } catch (error: unknown) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Something went wrong" },
      { status: 500 }
    );
  }
}
