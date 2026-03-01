-- Migration: Fix certificate issue_date column type
-- Run this if you already have the certificates table

-- Change issue_date from date to text type
ALTER TABLE public.certificates ALTER COLUMN issue_date TYPE text;

-- Also fix awards table date column
ALTER TABLE public.awards ALTER COLUMN date TYPE text;

-- Verify the changes
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'certificates' AND column_name = 'issue_date';

SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'awards' AND column_name = 'date';
