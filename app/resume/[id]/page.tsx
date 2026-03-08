import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { ResumePreview } from "@/components/ResumePreview";
import fs from "fs";
import path from "path";
import os from "os";

export default async function ResumePage({
  params,
}: {
  params: { id: string };
}) {
  let resume = null;

  if (params.id.startsWith("temp-")) {
    const tempFile = path.join(os.tmpdir(), `${params.id}.json`);
    if (fs.existsSync(tempFile)) {
      resume = JSON.parse(fs.readFileSync(tempFile, 'utf8'));
    }
  } else {
    const { data, error } = await supabase
      .from("resumes")
      .select("*")
      .eq("id", params.id)
      .single();
    if (!error && data) {
      resume = data;
    }
  }

  if (!resume) {
    notFound();
  }

  return (
    <div className="container max-w-5xl py-10">
      <div className="flex flex-col gap-2 mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-bold tracking-tight">Your Generated Resume</h1>
        <p className="text-muted-foreground">
          Review, edit, and download your ATS-friendly resume below.
        </p>
      </div>
      
      <ResumePreview initialResume={resume.generated_resume} resumeId={resume.id} />
    </div>
  );
}
