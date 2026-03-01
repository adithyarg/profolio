# Deployment Guide

## Database Migration (IMPORTANT - Run First!)

If you already have your Supabase database set up, you need to add the `username` column:

1. Go to your Supabase Dashboard → SQL Editor
2. Copy and paste the contents of `supabase/migration_add_username.sql`
3. Click "Run"

If you're setting up fresh, just run `supabase/schema.sql` as normal.

## Supabase Storage Setup

Create these PUBLIC buckets in Supabase Storage:

1. Go to Storage in Supabase Dashboard
2. Create bucket: `avatars` (set to PUBLIC)
3. Create bucket: `certificates` (set to PUBLIC)

## Vercel Deployment

### 1. Add Environment Variables

In Vercel Project Settings → Environment Variables, add:

```
NEXT_PUBLIC_SUPABASE_URL=https://xtqmwkvdhxhcresnyntp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_V00OwhLikMpqfC1U07qZ1g_g0As94nA
```

Select all environments: Production, Preview, Development

### 2. Deploy

Push your code to GitHub and Vercel will auto-deploy, or run:

```bash
git add .
git commit -m "Fix avatar upload and add username support"
git push
```

### 3. Verify

After deployment:
- Visit your site
- Try uploading an avatar
- Check that it persists after refresh
- Test the username field

## Troubleshooting

### Avatar not saving?
- Check Supabase Storage → `avatars` bucket exists and is PUBLIC
- Check browser console for errors
- Verify environment variables are set in Vercel

### Username errors?
- Run the migration SQL if you have an existing database
- Check that the `username` column exists in `profiles` table

### Build warnings?
- These are mostly ESLint warnings and won't break the app
- TypeScript errors are ignored via `next.config.mjs`
