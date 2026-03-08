import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileText, Sparkles, Zap, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 md:px-6">
        <div className="space-y-4 max-w-3xl">
          <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm bg-primary/10 text-primary mb-4 font-medium">
            <span className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Powered by Groq Llama 3 AI
            </span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl/none">
            Build your professional resume in seconds
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Stand out to employers with an ATS-friendly, expertly crafted resume generated instantly from your details using advanced AI.
          </p>
        </div>
        <div className="flex flex-col gap-3 min-[400px]:flex-row mt-8">
          <Link href="/create">
            <Button size="lg" className="gap-2 h-12 px-8 text-base">
              Create Resume with AI
              <Sparkles className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid gap-8 mt-20 md:grid-cols-3 max-w-5xl">
          <div className="flex flex-col items-center space-y-2 border rounded-xl p-6 bg-card text-card-foreground shadow-sm">
            <div className="p-3 bg-primary/10 text-primary rounded-full mb-2">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Lightning Fast</h3>
            <p className="text-muted-foreground text-center">
              Generate a full comprehensive resume in literally seconds using Groq&apos;s high-speed inference.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 border rounded-xl p-6 bg-card text-card-foreground shadow-sm">
            <div className="p-3 bg-primary/10 text-primary rounded-full mb-2">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">ATS-Friendly</h3>
            <p className="text-muted-foreground text-center">
              Clean, professional formatting that guarantees your resume passes through Applicant Tracking Systems.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 border rounded-xl p-6 bg-card text-card-foreground shadow-sm">
            <div className="p-3 bg-primary/10 text-primary rounded-full mb-2">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Secure Storage</h3>
            <p className="text-muted-foreground text-center">
              Your resume data is securely saved so you can come back, edit, and download it later.
            </p>
          </div>
        </div>
      </main>
      <footer className="py-6 border-t md:px-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row text-center md:text-left">
          <p className="text-sm leading-loose text-muted-foreground">
            Built with Next.js, Shadcn UI, Groq AI, and Supabase.
          </p>
        </div>
      </footer>
    </div>
  );
}
