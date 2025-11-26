# Supabase Storage Setup Guide

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in your project details:
   - Name: `theonchainstudio` (or your preferred name)
   - Database Password: (save this securely)
   - Region: Choose closest to your users
5. Wait for the project to be created (takes a few minutes)

## Step 2: Get Your Supabase Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following:
   - **Project URL** (under "Project URL")
   - **anon/public key** (under "Project API keys" → "anon public")

## Step 3: Create Environment Variables

1. Create a `.env.local` file in your project root (if it doesn't exist)
2. Add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

**Example:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 4: Create a Storage Bucket

1. In Supabase dashboard, go to **Storage**
2. Click **"New bucket"**
3. Configure the bucket:
   - **Name**: `videos` (or your preferred name)
   - **Public bucket**: ✅ **Enable this** (so videos are publicly accessible)
   - **File size limit**: Set appropriate limit (e.g., 100MB or 500MB for videos)
   - **Allowed MIME types**: `video/mp4,video/webm,video/quicktime` (optional, for security)
4. Click **"Create bucket"**

## Step 5: Upload Videos to Supabase Storage

### Option A: Using Supabase Dashboard (Easiest)

1. Go to **Storage** → Click on your `videos` bucket
2. Click **"Upload file"**
3. Select your video files (e.g., `IMG_0330-1.mp4`)
4. Wait for upload to complete
5. Copy the file path (e.g., `IMG_0330-1.mp4`)

### Option B: Using Supabase CLI

```bash
# Install Supabase CLI (if not installed)
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Upload a video
supabase storage upload videos IMG_0330-1.mp4 --file ./public/IMG_0330-1.mp4
```

### Option C: Using Code (Programmatic Upload)

You can create an upload utility (useful for admin panels):

```typescript
// lib/upload-video.ts
import { supabase } from './supabase'

export async function uploadVideo(file: File, bucketName: string = 'videos') {
  const fileName = `${Date.now()}-${file.name}`
  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) throw error
  return data.path
}
```

## Step 6: Get Public URLs

Once uploaded, you can get the public URL in two ways:

### Method 1: Using the Helper Function (Recommended)

```typescript
import { getVideoUrl } from '@/lib/supabase'

const videoUrl = getVideoUrl('videos', 'IMG_0330-1.mp4')
// Returns: https://your-project.supabase.co/storage/v1/object/public/videos/IMG_0330-1.mp4
```

### Method 2: Direct URL Format

```
https://{PROJECT_REF}.supabase.co/storage/v1/object/public/{BUCKET_NAME}/{FILE_PATH}
```

Example:
```
https://abcdefghijklmnop.supabase.co/storage/v1/object/public/videos/IMG_0330-1.mp4
```

## Step 7: Update Your Code

Update your `app/page.tsx` to use Supabase URLs:

```typescript
import { getVideoUrl } from '@/lib/supabase'

// In your works array:
const works = [
  {
    id: 'video-1',
    type: 'video' as const,
    cardType: 'landscape' as const,
    videoUrl: getVideoUrl('videos', 'IMG_0330-1.mp4'),
    height: 300
  },
  // ... other items
]
```

Or use the direct URL format if you prefer.

## Step 8: Set Up Storage Policies (Optional but Recommended)

For better security, you can set up Row Level Security (RLS) policies:

1. Go to **Storage** → **Policies**
2. Click on your `videos` bucket
3. Add a policy:
   - **Policy name**: `Public read access`
   - **Allowed operation**: `SELECT`
   - **Policy definition**: 
   ```sql
   true
   ```
   (This allows anyone to read files)

## Troubleshooting

### Videos not loading?
- Check that the bucket is set to **Public**
- Verify the file path is correct
- Check browser console for CORS errors
- Ensure environment variables are set correctly

### Upload errors?
- Check file size limits
- Verify MIME types are allowed
- Check storage quota in Supabase dashboard

## Next Steps

- Consider adding video optimization/compression before upload
- Set up CDN for faster video delivery (Supabase uses CDN by default)
- Add error handling for failed video loads
- Consider using Supabase Edge Functions for video processing

