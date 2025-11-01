-- Drop the existing policy
DROP POLICY IF EXISTS "Anyone can view available properties" ON public.properties;

-- Create a new policy that explicitly allows both authenticated and anonymous users
CREATE POLICY "Public can view available properties"
ON public.properties
FOR SELECT
TO public
USING (status = 'available');