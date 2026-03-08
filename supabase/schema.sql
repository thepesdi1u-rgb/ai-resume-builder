-- Enable the UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create resumes table
CREATE TABLE public.resumes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  raw_input JSONB NOT NULL,
  generated_resume TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Note: Depending on your security requirements, you may want to enable Row Level Security (RLS)
-- ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
-- 
-- CREATE POLICY "Allow public read access" ON public.resumes FOR SELECT USING (true);
-- CREATE POLICY "Allow public insert access" ON public.resumes FOR INSERT WITH CHECK (true);
