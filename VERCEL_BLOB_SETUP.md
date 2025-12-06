# Vercel Blob Storage Setup Guide

## Step 1: Install Dependencies

The `@vercel/blob` package has already been installed.

## Step 2: Get Your Vercel Blob Storage URL

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Navigate to your project
3. Go to **Storage** → **Blob**
4. If you haven't created a blob store yet:
   - Click **"Create Blob Store"**
   - Give it a name (e.g., `theonchainstudio-assets`)
   - Select a region closest to your users
5. Once created, you'll see your blob store URL in the format:
   ```
   https://[account-id].public.blob.vercel-storage.com
   ```

## Step 3: Upload Your Files

### Option A: Using Vercel Dashboard
1. In your blob store, click **"Upload"**
2. Upload all your media files:
   - `1080horizontal.mp4`
   - `1Inch x Yellow Media.mp4`
   - `bitget-podcast.png`
   - `bitget-video.mp4`
   - `Cilliz.png`
   - `Conquestapr.png`
   - `delorean-thumbnail.png`
   - `Unplugged with NEIL TRAILER.mp4`
   - `yellow-allinone-ecosystem-v3-portrait.mp4`
   - `IMG_4874.PNG`
   - `Thumbnail-YT.jpg`
   - And any other files you need

### Option B: Using Vercel CLI
```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# Upload files (one at a time)
vercel blob put public/1080horizontal.mp4
vercel blob put "public/1Inch x Yellow Media.mp4"
# ... repeat for all files
```

### Option C: Using Code (Programmatic Upload)
Create an upload script or API route:

```typescript
// app/api/upload/route.ts
import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get('file') as File;
  
  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const blob = await put(file.name, file, {
    access: 'public',
  });

  return NextResponse.json({ url: blob.url });
}
```

## Step 4: Set Environment Variables

1. Create a `.env.local` file in your project root (if it doesn't exist)
2. Add your Vercel Blob storage URL:

```env
NEXT_PUBLIC_BLOB_STORAGE_URL=https://[your-account-id].public.blob.vercel-storage.com
```

**Example:**
```env
NEXT_PUBLIC_BLOB_STORAGE_URL=https://abc123xyz.public.blob.vercel-storage.com
```

3. For server-side operations (optional), you can also add:
```env
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxxxxxxxxx
```

To get your token:
- Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- Or use: `vercel env pull .env.local` (after linking your project)

## Step 5: Verify Setup

The code is already configured to use Vercel Blob storage. The `getBlobUrl()` function will:
- Use `NEXT_PUBLIC_BLOB_STORAGE_URL` if set
- Fall back to local paths if not configured

## Step 6: Deploy

When deploying to Vercel:
1. Make sure your environment variable `NEXT_PUBLIC_BLOB_STORAGE_URL` is set in Vercel Dashboard
2. Go to your project → Settings → Environment Variables
3. Add the variable for Production, Preview, and Development environments

## File Naming

The code uses the exact filenames you have. Make sure the filenames in Vercel Blob match exactly:
- `1080horizontal.mp4`
- `1Inch x Yellow Media.mp4` (spaces are handled automatically)
- `bitget-podcast.png`
- `bitget-video.mp4`
- `Cilliz.png`
- `Conquestapr.png`
- `delorean-thumbnail.png`
- `Unplugged with NEIL TRAILER.mp4`
- `yellow-allinone-ecosystem-v3-portrait.mp4`
- `IMG_4874.PNG`
- `Thumbnail-YT.jpg`

## Troubleshooting

### Files not loading?
- Check that `NEXT_PUBLIC_BLOB_STORAGE_URL` is set correctly
- Verify files are uploaded to Vercel Blob
- Check browser console for 404 errors
- Ensure filenames match exactly (case-sensitive)

### Environment variable not working?
- Restart your dev server after adding `.env.local`
- Make sure the variable starts with `NEXT_PUBLIC_` for client-side access
- Check that `.env.local` is in your project root

### Need to update files?
- Re-upload files with the same name to replace them
- Or delete and re-upload if needed
- URLs will remain the same if filenames don't change

