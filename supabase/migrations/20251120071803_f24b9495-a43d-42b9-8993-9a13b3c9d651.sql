-- Allow admins to update all properties
CREATE POLICY "Admins can update all properties"
ON public.properties
FOR UPDATE
USING (has_role(auth.uid(), 'admin'))
WITH CHECK (has_role(auth.uid(), 'admin'));