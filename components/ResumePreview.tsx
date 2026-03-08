"use client";

import { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Download, Edit2, Save, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

interface ResumePreviewProps {
  initialResume: string;
  resumeId: string;
}

export function ResumePreview({ initialResume, resumeId }: ResumePreviewProps) {
  const [content, setContent] = useState(initialResume);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [atsScore, setAtsScore] = useState<{ score: number; feedback: string[] } | null>(null);
  const [isCheckingAts, setIsCheckingAts] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("resumes")
        .update({ generated_resume: content })
        .eq("id", resumeId);

      if (error) throw error;
      toast.success("Resume updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save resume.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCheckAts = async () => {
    setIsCheckingAts(true);
    try {
      const res = await fetch("/api/check-ats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume: content })
      });
      if (!res.ok) throw new Error("Failed to check ATS score");
      const data = await res.json();
      setAtsScore(data);
      toast.success("ATS check complete!");
    } catch {
      toast.error("Failed to check ATS score.");
    } finally {
      setIsCheckingAts(false);
    }
  };

  const handleDownload = async () => {
    if (typeof window !== "undefined") {
      const html2pdf = (await import("html2pdf.js")).default;
      const element = resumeRef.current;
      if (!element) return;

      const opt = {
        margin: 10,
        filename: 'resume.pdf',
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
      };

      html2pdf().set(opt).from(element).save();
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-4 bg-muted/50 p-4 rounded-xl border">
        {isEditing ? (
          <Button onClick={handleSave} disabled={isSaving} className="gap-2">
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            Save Changes
          </Button>
        ) : (
          <Button onClick={() => setIsEditing(true)} variant="outline" className="gap-2">
            <Edit2 className="h-4 w-4" />
            Edit Resume
          </Button>
        )}
        <Button 
          onClick={handleCheckAts} 
          variant="outline" 
          className="gap-2 ml-auto border-blue-600/30 text-blue-600 bg-blue-50 hover:bg-blue-100 ring-offset-background"
          disabled={isCheckingAts}
        >
          {isCheckingAts ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
          Check ATS Score
        </Button>
        <Button onClick={handleDownload} variant="default" className="gap-2 bg-primary">
          <Download className="h-4 w-4" />
          Download PDF
        </Button>
      </div>

      {atsScore && (
        <div className="bg-card border rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-5 mb-5">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 text-2xl font-bold shrink-0">
              {atsScore.score}
            </div>
            <div>
              <h3 className="text-xl font-semibold">ATS Match Score</h3>
              <p className="text-muted-foreground text-sm">Based on industry standard ATS parsing principles</p>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">Feedback & Suggestions</h4>
            <ul className="space-y-1">
              {atsScore.feedback.map((item, i) => (
                <li key={i} className="flex gap-2 text-sm text-foreground">
                  <span className="text-blue-500 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="border rounded-xl bg-card shadow-sm overflow-hidden">
        {isEditing ? (
          <div className="p-4 bg-muted/20">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[800px] font-mono text-sm leading-relaxed"
            />
          </div>
        ) : (
          <div 
            className="w-full shrink-0 shadow-[0_20px_50px_rgba(0,0,0,0.1)] mx-auto border border-stone-200/50" 
            style={{ 
              minHeight: '1056px', 
              width: '816px', 
              padding: '1in',
              backgroundColor: '#FCFBF8',
              color: '#1C1917'
            }} 
            ref={resumeRef}
          >
            <div 
              className="prose prose-sm prose-stone max-w-none prose-h1:text-[2.5rem] prose-h1:font-serif prose-h1:text-center prose-h1:mb-0 prose-h1:text-[#1c1917] prose-h1:tracking-tight prose-h2:text-[1.15rem] prose-h2:font-serif prose-h2:border-b-[1.5px] prose-h2:border-stone-800/80 prose-h2:pb-1 prose-h2:mt-6 prose-h2:mb-3 prose-h2:text-[#1c1917] prose-h2:tracking-wider prose-h2:uppercase prose-p:my-1 prose-p:leading-relaxed prose-p:first-of-type:text-center prose-p:first-of-type:mb-6 prose-p:first-of-type:text-stone-600 prose-ul:my-1 prose-li:my-0.5 prose-strong:font-bold prose-strong:text-[#1c1917] text-[10.5pt]" 
              style={{ fontFamily: '"Georgia", "Times New Roman", Times, serif' }}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
