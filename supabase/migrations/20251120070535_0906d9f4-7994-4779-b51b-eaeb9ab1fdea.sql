-- Change default status for new properties to 'pending'
ALTER TABLE public.properties 
ALTER COLUMN status SET DEFAULT 'pending';

-- Add RLS policy to allow sellers to view their own properties regardless of status
CREATE POLICY "Sellers can view their own properties"
ON public.properties
FOR SELECT
USING (auth.uid() = seller_id);