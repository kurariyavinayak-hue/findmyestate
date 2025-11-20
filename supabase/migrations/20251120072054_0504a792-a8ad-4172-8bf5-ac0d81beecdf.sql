-- Add 'rejected' as a valid status for properties
-- First, we need to check the current constraint and update it
ALTER TABLE public.properties 
DROP CONSTRAINT IF EXISTS properties_status_check;

-- Add the constraint with the new 'rejected' status
ALTER TABLE public.properties 
ADD CONSTRAINT properties_status_check 
CHECK (status IN ('available', 'pending', 'sold', 'rejected'));