# Avatar Upload Debugging Guide

## Step 1: Verify Supabase Storage Bucket

1. Go to your Supabase Dashboard
2. Click on **Storage** in the left sidebar
3. Check if `avatars` bucket exists
4. If not, create it:
   - Click "New bucket"
   - Name: `avatars`
   - **IMPORTANT**: Make it PUBLIC (toggle the public option)
   - Click "Create bucket"

## Step 2: Check Bucket Policies

If the bucket exists but uploads fail, check the policies:

1. Click on the `avatars` bucket
2. Go to "Policies" tab
3. You should see policies for INSERT and SELECT
4. If missing, add these policies:

### Policy 1: Allow authenticated users to upload
```sql
CREATE POLICY "Authenticated users can upload avatars"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'avatars');
```

### Policy 2: Allow public read access
```sql
CREATE POLICY "Public can view avatars"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'avatars');
```

### Policy 3: Allow users to update their own avatars
```sql
CREATE POLICY "Users can update own avatars"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'avatars');
```

### Policy 4: Allow users to delete their own avatars
```sql
CREATE POLICY "Users can delete own avatars"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'avatars');
```

## Step 3: Test Upload Locally

1. Run your app locally: `npm run dev`
2. Open browser DevTools (F12)
3. Go to Console tab
4. Navigate to `/dashboard`
5. Select an avatar image
6. Click "Save Profile Changes"
7. Watch the console for logs:
   - `[Avatar] File received:` - Shows file info
   - `[Avatar] Uploading to path:` - Shows upload attempt
   - `[Avatar] Uploaded successfully:` - Shows success
   - `[Avatar Upload Error]` - Shows any errors

## Step 4: Common Issues

### Issue: "Bucket not found"
- Solution: Create the `avatars` bucket in Supabase Storage

### Issue: "Access denied" or "Unauthorized"
- Solution: Make sure the bucket is PUBLIC or add the policies above

### Issue: "File size is 0"
- Solution: Make sure the form has `encType="multipart/form-data"` (already fixed)

### Issue: Avatar shows locally but not after refresh
- Solution: Check that the URL is being saved to the database
- Run this SQL in Supabase SQL Editor:
  ```sql
  SELECT id, full_name, avatar_url FROM profiles;
  ```
- Check if `avatar_url` column has the Supabase storage URL

## Step 5: Manual Test

Try uploading directly in Supabase:

1. Go to Storage → `avatars` bucket
2. Click "Upload file"
3. Upload a test image
4. If this fails, there's a bucket configuration issue
5. If this works, the issue is in the code

## Step 6: Check Environment Variables

Make sure these are set (locally in `.env.local` and in Vercel):

```
NEXT_PUBLIC_SUPABASE_URL=https://xtqmwkvdhxhcresnyntp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_V00OwhLikMpqfC1U07qZ1g_g0As94nA
```

## Expected Console Output (Success)

```
[Avatar] File received: profile.jpg size: 45678 type: image/jpeg
[Avatar] Uploading to path: abc123-1234567890.jpg size: 45678
[Avatar] Uploaded successfully: https://xtqmwkvdhxhcresnyntp.supabase.co/storage/v1/object/public/avatars/abc123-1234567890.jpg
[updateProfile] Saving: { id: 'abc123', username: 'john', full_name: 'John Doe', avatar_url: 'https://xtqmwkvdhxhcresnyntp.supabase.co/storage/v1/object/public/avatars/abc123-1234567890.jpg' }
```
