-- Add tax_receipt_url column to properties table
ALTER TABLE public.properties
ADD COLUMN tax_receipt_url TEXT;