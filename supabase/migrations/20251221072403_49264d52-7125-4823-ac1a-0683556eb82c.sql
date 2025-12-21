-- Create storage bucket for illustrations
INSERT INTO storage.buckets (id, name, public) 
VALUES ('illustrations', 'illustrations', true);

-- Policy untuk public read access
CREATE POLICY "Public read access for illustrations" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'illustrations');

-- Policy untuk service role write access
CREATE POLICY "Service role can upload illustrations" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'illustrations');