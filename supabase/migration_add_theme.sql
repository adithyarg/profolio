-- Add theme column to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS theme VARCHAR(50) DEFAULT 'modern';

-- Add comment
COMMENT ON COLUMN profiles.theme IS 'Portfolio theme selection: modern, minimal, creative, professional, bold';
