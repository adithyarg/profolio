-- Migration: Add contact and social link fields to profiles table
-- Run this in Supabase SQL Editor

-- Add new columns for contact information
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS linkedin_url text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS github_url text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS website_url text;

-- Verify columns were added
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'profiles' 
AND column_name IN ('phone', 'email', 'linkedin_url', 'github_url', 'website_url');
