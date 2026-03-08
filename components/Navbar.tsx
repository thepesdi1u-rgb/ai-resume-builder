import Link from "next/link";
import { Sparkles, FileText } from "lucide-react";
import { Button } from "./ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex bg-primary text-primary-foreground p-1.5 rounded-lg">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="font-bold text-xl inline-block">AI ResumeBuilder</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Log in
          </Link>
          <Link href="/signup">
            <Button variant="outline" className="gap-2">
              Sign Up
            </Button>
          </Link>
          <Link href="/create">
            <Button className="gap-2">
              <FileText className="h-4 w-4" />
              Create Resume
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
