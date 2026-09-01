-- PB Tangkis Jaya - Supabase Migration Script
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor > New Query)

-- 1. Create tournaments table
CREATE TABLE IF NOT EXISTS tournaments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  event_date DATE NOT NULL,
  poster_url TEXT NOT NULL,
  terms TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'aktif' CHECK (status IN ('aktif', 'selesai')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Create gallery_photos table
CREATE TABLE IF NOT EXISTS gallery_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  caption TEXT NOT NULL,
  event_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Create storage buckets (run via Supabase Dashboard > Storage > New Bucket)
-- Bucket 1: tournament-posters (public access)
-- Bucket 2: gallery-photos (public access)
-- See STORAGE_SETUP.md for manual setup instructions

-- 4. Enable RLS (Row Level Security)
ALTER TABLE tournaments ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_photos ENABLE ROW LEVEL SECURITY;

-- 5. Public read policies (anyone can view)
CREATE POLICY "Public can view tournaments"
  ON tournaments FOR SELECT
  USING (true);

CREATE POLICY "Public can view gallery photos"
  ON gallery_photos FOR SELECT
  USING (true);

-- 6. Authenticated write policies (only logged-in admin can insert/update/delete)
CREATE POLICY "Authenticated can insert tournaments"
  ON tournaments FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated can update tournaments"
  ON tournaments FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated can delete tournaments"
  ON tournaments FOR DELETE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated can insert gallery photos"
  ON gallery_photos FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated can update gallery photos"
  ON gallery_photos FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated can delete gallery photos"
  ON gallery_photos FOR DELETE
  USING (auth.role() = 'authenticated');

-- 7. Storage policies for tournament-posters bucket
CREATE POLICY "Public can view tournament posters"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'tournament-posters');

CREATE POLICY "Authenticated can upload tournament posters"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'tournament-posters' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated can delete tournament posters"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'tournament-posters' AND auth.role() = 'authenticated');

-- 8. Storage policies for gallery-photos bucket
CREATE POLICY "Public can view gallery photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'gallery-photos');

CREATE POLICY "Authenticated can upload gallery photos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'gallery-photos' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated can delete gallery photos"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'gallery-photos' AND auth.role() = 'authenticated');
