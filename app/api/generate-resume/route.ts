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

    // Save directly to the Supabase database since serverless platforms do not share /tmp
    const { data: resumeRecord, error: dbError } = await supabase
      .from("resumes")
      .insert({
        name: validatedData.name,
        email: validatedData.email,
        raw_input: validatedData,
        generated_resume: generatedResume,
      })
      .select("id")
      .single();

    if (dbError || !resumeRecord) {
      throw new Error("Failed to save resume securely to database. Please check your Supabase connection.");
    }

    return NextResponse.json({ id: resumeRecord.id });
  } catch (error: unknown) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Something went wrong" },
      { status: 500 }
    );
  }
}
