import { ResumeForm } from "@/components/ResumeForm";

export default function CreateResumePage() {
  return (
    <div className="container max-w-4xl py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create your Resume</h1>
          <p className="text-muted-foreground mt-2">
            Fill in your professional details below. Our AI will instantly craft an ATS-optimized resume.
          </p>
        </div>
        <ResumeForm />
      </div>
    </div>
  );
}
