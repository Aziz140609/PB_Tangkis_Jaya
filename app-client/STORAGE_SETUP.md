# Supabase Storage Setup

After running the migration SQL, create the two storage buckets manually:

## Steps

1. Go to **Supabase Dashboard > Storage**
2. Click **New Bucket** for each:

### Bucket 1: `tournament-posters`
- **Name:** `tournament-posters`
- **Public access:** Toggle ON (public read)
- **File size limit:** 5 MB
- **Allowed MIME types:** `image/png, image/jpeg, image/webp`

### Bucket 2: `gallery-photos`
- **Name:** `gallery-photos`
- **Public access:** Toggle ON (public read)
- **File size limit:** 5 MB
- **Allowed MIME types:** `image/png, image/jpeg, image/webp`

## Admin Account

1. Go to **Supabase Dashboard > Authentication > Users**
2. Click **Add User > Create New User**
3. Enter the admin email and password
4. The email/password you set will be used to log in at `/admin/login`
