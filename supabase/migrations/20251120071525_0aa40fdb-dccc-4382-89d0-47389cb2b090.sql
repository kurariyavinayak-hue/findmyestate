-- Allow admins to view all properties
CREATE POLICY "Admins can view all properties"
ON public.properties
FOR SELECT
USING (has_role(auth.uid(), 'admin'));