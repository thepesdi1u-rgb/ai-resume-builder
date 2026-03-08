# AI Resume Builder

A production-ready web application that helps users instantly generate professional, ATS-friendly resumes using AI.

## Built With
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: Shadcn UI
- **Database**: Supabase
- **AI Model**: Groq (Llama 3 70B)
- **Validation**: Zod & React Hook Form
- **Markdown & PDF**: React-Markdown & Html2Pdf

## Project Structure
```text
/app
  /api          # Next.js API Routes (e.g., generate-resume)
  /create       # Resume Input Form Page
  /resume/[id]  # Generated Resume Display page
/components   # React components (Navbar, ResumeForm, ResumePreview, UI elements)
/lib          # Utilities (Supabase client, Groq client, Validators)
/supabase     # SQL schema for Supabase Setup
```

## Getting Started

### 1. External Services Setup

#### Supabase
1. Create a project at [Supabase](https://supabase.com).
2. Go to the SQL Editor and run the queries found in `supabase/schema.sql`.
3. Go to Project Settings -> API, and copy the `Project URL` and `anon public` key.

#### Groq API
1. Create an account at [Groq Console](https://console.groq.com).
2. Generate an API Key.

### 2. Local Environment Setup

1. Clone or download the source code.
2. Ensure you have Node.js installed.
3. Install dependencies:
```bash
npm install
```
4. Create a `.env.local` file in the root directory and add your keys:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GROQ_API_KEY=your_groq_api_key
```
5. Run the development server:
```bash
npm run dev
```
6. Open `http://localhost:3000` to see the application.

## Deployment (Vercel)

This application is ready to be deployed on Vercel:
1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com) and import the repository.
3. In the environment variables section, add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `GROQ_API_KEY` exactly as they are in your `.env.local`.
4. Click Deploy.

## Notes
- To enable downloading resumes as PDF, this app utilizes client-side `html2pdf.js` generation mapping standard web fonts. 
- You may want to configure Row Level Security (RLS) in Supabase if you intend to move this setup to production.
