-- Run this script in your Supabase SQL Editor to create the leads table
-- URL: https://app.supabase.com -> Project -> SQL Editor -> New Query

CREATE TABLE IF NOT EXISTS public.leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    project_interest VARCHAR(255),
    preferred_date DATE,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow public anonymous inserts from the lead generation form
CREATE POLICY "Allow public insert for lead submissions" 
ON public.leads 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Allow authenticated users (broker admin) to read all leads
CREATE POLICY "Allow authenticated read for leads" 
ON public.leads 
FOR SELECT 
TO authenticated 
USING (true);
