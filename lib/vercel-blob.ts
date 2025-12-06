import { list } from '@vercel/blob';

// Get the base URL for Vercel Blob storage
// This will be set via environment variable: BLOB_READ_WRITE_TOKEN
export function getBlobUrl(filename: string): string {
  // If you have a direct base URL, use this:
  const baseUrl = process.env.NEXT_PUBLIC_BLOB_STORAGE_URL || '';
  
  if (baseUrl) {
    // Remove trailing slash if present
    const cleanBaseUrl = baseUrl.replace(/\/$/, '');
    // Encode filename for URL (handles spaces and special characters)
    const encodedFilename = encodeURIComponent(filename);
    return `${cleanBaseUrl}/${encodedFilename}`;
  }
  
  // Fallback: construct URL from Vercel Blob pattern
  // Format: https://[account-id].public.blob.vercel-storage.com/[filename]
  // You'll need to set NEXT_PUBLIC_BLOB_STORAGE_URL in your .env.local
  return `/assets/${filename}`;
}

// Get all blob URLs (useful for listing all files)
export async function getAllBlobUrls(prefix?: string): Promise<Record<string, string>> {
  try {
    const { blobs } = await list({
      prefix,
      limit: 1000, // Adjust as needed
    });
    
    const urlMap: Record<string, string> = {};
    blobs.forEach(blob => {
      urlMap[blob.pathname] = blob.url;
    });
    
    return urlMap;
  } catch (error) {
    console.error('Error fetching blobs:', error);
    return {};
  }
}

// Get a specific blob URL by filename
export async function getBlobUrlByName(filename: string): Promise<string | null> {
  try {
    const { blobs } = await list({
      limit: 1000,
    });
    
    const blob = blobs.find(b => b.pathname === filename || b.pathname.endsWith(`/${filename}`));
    return blob?.url || null;
  } catch (error) {
    console.error('Error fetching blob:', error);
    return null;
  }
}

