-- Migration: Add education table
-- Run this in Supabase SQL Editor

-- Create education table
CREATE TABLE IF NOT EXISTS public.education (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  degree text not null,
  institution text not null,
  field_of_study text,
  start_date text,
  end_date text,
  grade text,
  location text,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;

-- Add policies
CREATE POLICY "Education is viewable by everyone." ON public.education FOR SELECT USING (true);
CREATE POLICY "Users can insert own education." ON public.education FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own education." ON public.education FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own education." ON public.education FOR DELETE USING (auth.uid() = user_id);

-- Verify table was created
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'education';
