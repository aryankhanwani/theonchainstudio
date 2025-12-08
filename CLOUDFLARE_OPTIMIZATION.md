# Cloudflare CDN Optimization Guide

This guide will help you optimize your site for Cloudflare CDN to ensure fast video loading and overall performance.

## ✅ What's Already Configured

1. **Next.js Configuration** (`next.config.ts`):
   - ✅ Cache headers for videos (1 year cache)
   - ✅ Range request support (Accept-Ranges: bytes) for video streaming
   - ✅ Content-Type headers for proper video serving
   - ✅ Cache headers for images, fonts, and static assets

2. **Code Optimizations**:
   - ✅ Lazy loading for videos (only loads when in viewport)
   - ✅ Preload="none" to prevent unnecessary downloads
   - ✅ Intersection Observer for efficient video loading

## 🔧 Cloudflare Dashboard Settings

### 0. **Video Subdomain Setup** (If using `videos.mydomain.com`)

If you've created a proxy at `videos.mydomain.com`, this is excellent for CDN optimization! Here's how to configure it:

**DNS Configuration:**
1. Go to **DNS** → **Records**
2. Ensure `videos` subdomain exists:
   - Type: **CNAME** or **A** (depending on your setup)
   - Name: `videos`
   - Target: Your main domain or origin server
   - Proxy status: **Proxied** (orange cloud ☁️)

**Page Rule for Video Subdomain:**
- URL Pattern: `videos.mydomain.com/*`
- Settings:
  - Cache Level: **Cache Everything**
  - Edge Cache TTL: **1 month**
  - Browser Cache TTL: **Respect Existing Headers**
  - Disable Apps (optional, for better performance)

**Benefits:**
- ✅ Isolated caching rules for videos
- ✅ Better cache hit rates
- ✅ Easier to monitor video-specific traffic
- ✅ Can use different CDN settings for videos vs. main site

**Update Your Code:**
If you want to use `videos.mydomain.com` for all videos, update your `getBlobUrl` function in `app/page.tsx`:

```typescript
const getBlobUrl = (filename: string): string => {
  // Use video subdomain if configured
  const videoDomain = process.env.NEXT_PUBLIC_VIDEO_DOMAIN || '';
  if (videoDomain) {
    return `https://${videoDomain}/${filename}`;
  }
  
  // Fallback to blob storage or local
  const baseUrl = process.env.NEXT_PUBLIC_BLOB_STORAGE_URL || '';
  if (baseUrl) {
    const cleanBaseUrl = baseUrl.replace(/\/$/, '');
    const encodedFilename = encodeURIComponent(filename);
    return `${cleanBaseUrl}/${encodedFilename}`;
  }
  
  return `/${filename}`;
};
```

Then set `NEXT_PUBLIC_VIDEO_DOMAIN=videos.mydomain.com` in your `.env.local`

### 1. **Caching Configuration**

Go to **Caching** → **Configuration** in your Cloudflare dashboard:

- **Caching Level**: Set to **Standard** or **Aggressive**
- **Browser Cache TTL**: Set to **Respect Existing Headers** (we're setting cache headers in Next.js)
- **Always Online**: Enable this for better availability

### 2. **Speed Optimizations**

Go to **Speed** → **Optimization**:

- ✅ **Auto Minify**: Enable for HTML, CSS, and JavaScript
- ✅ **Brotli**: Enable (better compression than gzip)
- ✅ **HTTP/2**: Should be enabled by default
- ✅ **HTTP/3 (with QUIC)**: Enable if available
- ✅ **Early Hints**: Enable for faster page loads

### 3. **Network Settings**

Go to **Network**:

- ✅ **HTTP/2**: Enabled
- ✅ **HTTP/3 (with QUIC)**: Enable
- ✅ **0-RTT Connection Resumption**: Enable
- ✅ **IP Geolocation**: Enable (helps with routing)

### 4. **Page Rules** (Important for Videos!)

Create page rules for optimal video caching. **Note:** Cloudflare Page Rules use wildcards (`*`), not regex patterns.

**Option A: Using Your Video Subdomain (Recommended - Single Rule!)**

Since you have `videos.mydomain.com` set up, this is the simplest approach:

**Rule 1: Cache All Videos on Subdomain**
- URL Pattern: `videos.mydomain.com/*`
- Settings:
  - Cache Level: **Cache Everything**
  - Edge Cache TTL: **1 month** (or longer)
  - Browser Cache TTL: **Respect Existing Headers**

That's it! One rule handles all your videos. Since images are loading fine, you don't need image rules.

**Option B: Using Main Domain (If videos are on main domain)**

**Rule 1: Cache MP4 Videos**
- URL Pattern: `*yourdomain.com/*.mp4`
- Settings:
  - Cache Level: **Cache Everything**
  - Edge Cache TTL: **1 month** (or longer)
  - Browser Cache TTL: **Respect Existing Headers`

**Rule 2: Cache WebM Videos** (if you use WebM)
- URL Pattern: `*yourdomain.com/*.webm`
- Settings:
  - Cache Level: **Cache Everything**
  - Edge Cache TTL: **1 month`

**Alternative: Use Transform Rules (Newer Feature - Supports Regex)**

If you have access to Transform Rules (available on all plans), you can use regex patterns:

**Transform Rule: Cache All Videos**
- When: `http.request.uri.path matches "\.(mp4|webm|mov)$"`
- Then: Set cache level to **Cache Everything**

### 5. **Transform Rules** (Optional but Recommended)

Create transform rules to add headers:

**Rule: Add CORS Headers for Videos**
- When: `http.request.uri.path matches "\.(mp4|webm|mov)$"`
- Then: Set static response header
  - Header name: `Access-Control-Allow-Origin`
  - Value: `*`

### 6. **Argo Smart Routing** (Optional - Paid Feature)

If you have a Pro plan or higher:
- Enable **Argo Smart Routing** for better global performance
- This routes traffic through Cloudflare's optimized network paths

### 7. **Image Optimization** (Optional - Paid Feature)

If you have a Pro plan or higher:
- Enable **Cloudflare Images** or **Polish** for automatic image optimization
- This can significantly reduce image load times

## 🚀 Additional Optimizations

### Video-Specific Optimizations

1. **Use WebM format** (smaller file size):
   - Consider converting videos to WebM format for better compression
   - WebM files are typically 30-50% smaller than MP4

2. **Video Compression**:
   - Use tools like HandBrake or FFmpeg to compress videos
   - Target bitrate: 2-5 Mbps for web videos
   - Resolution: Match your display requirements (1080p is usually sufficient)

3. **Multiple Video Qualities**:
   - Consider serving different video qualities based on connection speed
   - Use the `<source>` tag with multiple formats

### Performance Monitoring

1. **Cloudflare Analytics**:
   - Monitor cache hit ratio (should be >80% for static assets)
   - Check bandwidth savings
   - Monitor response times

2. **Real User Monitoring (RUM)**:
   - Enable Cloudflare Web Analytics (free) to track real user performance
   - Monitor Core Web Vitals

## 📊 Testing Your Setup

After configuring Cloudflare:

1. **Test Cache Headers**:
   ```bash
   curl -I https://yourdomain.com/Vertical.mp4
   ```
   Look for:
   - `Cache-Control: public, max-age=31536000, immutable`
   - `Accept-Ranges: bytes`
   - `CF-Cache-Status: HIT` (after first request)

2. **Test Video Loading**:
   - Open browser DevTools → Network tab
   - Load a page with videos
   - Check that videos are served from Cloudflare CDN
   - Verify range requests are working (you'll see 206 Partial Content responses)

3. **Check Cloudflare Dashboard**:
   - Go to **Analytics** → **Performance**
   - Verify cache hit ratio is high (>80%)
   - Check that bandwidth is being saved

## 🔍 Troubleshooting

### "Target URL contains non-printable characters" Error?

This error occurs when using unsupported syntax in Page Rules. **Cloudflare Page Rules don't support:**
- ❌ Curly braces: `*.{jpg,png}` 
- ❌ Regex patterns: `.*\.(jpg|png)$`
- ❌ Multiple extensions in one pattern

**Solution:** Create separate Page Rules for each file extension:
- ✅ `*yourdomain.com/*.jpg`
- ✅ `*yourdomain.com/*.png`
- ✅ `*yourdomain.com/*.webp`

Or use **Transform Rules** (newer feature) which supports regex patterns.

### Videos Not Caching?

1. Check Page Rules are applied correctly
2. Verify cache headers are being sent (use curl or browser DevTools)
3. Ensure videos are in the `/public` folder (Next.js serves these as static assets)

### Slow Video Loading?

1. Check Cloudflare cache status in response headers
2. Verify range requests are working (206 status codes)
3. Consider enabling Cloudflare's video streaming features (if on Pro plan)
4. Check video file sizes - compress if needed

### Cache Not Working?

1. Clear Cloudflare cache: **Caching** → **Purge Cache** → **Purge Everything**
2. Wait a few minutes and test again
3. Verify your domain is properly proxied (orange cloud icon in DNS settings)

## 📝 Next Steps

1. ✅ Configure Cloudflare dashboard settings above
2. ✅ Create Page Rules for video caching
3. ✅ Test video loading performance
4. ✅ Monitor Cloudflare Analytics
5. ✅ Consider upgrading to Pro plan for additional features (Argo, Polish, etc.)

## 🎯 Expected Results

After proper configuration:
- **Video load time**: 50-70% faster
- **Cache hit ratio**: >80% for static assets
- **Bandwidth savings**: 60-80% reduction
- **Global performance**: Faster for international users

---

**Need Help?** Check Cloudflare's documentation or their support team for assistance with specific settings.
