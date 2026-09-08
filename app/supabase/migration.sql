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

-- 7. Create programs table
CREATE TABLE IF NOT EXISTS programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'sports_gymnastics',
  sort_order INT NOT NULL DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view programs"
  ON programs FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert programs"
  ON programs FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can update programs"
  ON programs FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can delete programs"
  ON programs FOR DELETE USING (auth.role() = 'authenticated');

-- 8. Create locations table
CREATE TABLE IF NOT EXISTS locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'AVAILABLE' CHECK (status IN ('AVAILABLE', 'FULL')),
  schedules JSONB NOT NULL DEFAULT '[]',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE locations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view locations"
  ON locations FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert locations"
  ON locations FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can update locations"
  ON locations FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can delete locations"
  ON locations FOR DELETE USING (auth.role() = 'authenticated');

-- 9. Create pricing table
CREATE TABLE IF NOT EXISTS pricing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  price INT NOT NULL,
  period TEXT,
  features JSONB NOT NULL DEFAULT '[]',
  is_popular BOOLEAN NOT NULL DEFAULT false,
  cta_text TEXT NOT NULL DEFAULT 'Pilih Paket',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE pricing ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view pricing"
  ON pricing FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert pricing"
  ON pricing FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can update pricing"
  ON pricing FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can delete pricing"
  ON pricing FOR DELETE USING (auth.role() = 'authenticated');

-- 10. Storage policies for tournament-posters bucket
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
-- 11. Create coaches table
CREATE TABLE IF NOT EXISTS coaches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'Pelatih',
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE coaches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view coaches"
  ON coaches FOR SELECT USING (true);
CREATE POLICY "Authenticated can insert coaches"
  ON coaches FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can update coaches"
  ON coaches FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated can delete coaches"
  ON coaches FOR DELETE USING (auth.role() = 'authenticated');

-- 12. Storage policies for coach-photos bucket
CREATE POLICY "Public can view coach photos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'coach-photos');

CREATE POLICY "Authenticated can upload coach photos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'coach-photos' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated can delete coach photos"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'coach-photos' AND auth.role() = 'authenticated');
