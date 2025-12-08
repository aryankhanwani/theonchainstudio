# Fix CORS Error & 525 Error for Video Subdomain

## 🔴 Problems

**Error 1: CORS Error**
```
Access to fetch at 'https://videos.theonchainstudio.com/bitget-video.mp4' 
from origin 'https://www.theonchainstudio.com' has been blocked by CORS policy: 
No 'Access-Control-Allow-Origin' header is present.
```

**Error 2: 525 Error (Critical!)**
```
HEAD https://videos.theonchainstudio.com/bitget-video.mp4 net::ERR_FAILED 525
```

The **525 error means Cloudflare can't connect to your origin server**. This must be fixed FIRST before CORS will work.

## 🚨 Step 1: Fix 525 Error (Do This First!)

### Check 1: DNS Configuration

1. Go to **Cloudflare Dashboard** → **DNS** → **Records**
2. Find the record for `videos.theonchainstudio.com`
3. **Verify:**
   - ✅ Record exists
   - ✅ Proxy status is **Proxied** (orange cloud ☁️)
   - ✅ Points to correct origin (your server IP or CNAME)

**If record doesn't exist or is wrong:**
- **Type:** CNAME or A
- **Name:** `videos`
- **Target:** Your origin server (same as www subdomain or your server IP)
- **Proxy:** ☁️ **Proxied** (orange cloud)

### Check 2: SSL/TLS Settings

1. Go to **SSL/TLS** → **Overview**
2. **Set encryption mode to:**
   - ✅ **Full** (if origin has valid SSL)
   - ✅ **Full (strict)** (if origin has valid SSL certificate)
   - ❌ NOT "Flexible" (causes 525 errors)

### Check 3: Origin Server

**If `videos.theonchainstudio.com` points to a different server:**

1. **Option A: Point to Same Origin as Main Domain**
   - Set `videos` CNAME to same target as `www`
   - Or point to your main server IP

2. **Option B: Configure Origin Server**
   - Ensure origin server accepts requests for `videos.theonchainstudio.com`
   - Check server logs for connection errors
   - Verify SSL certificate is valid

### Check 4: Test Connection

After fixing DNS/SSL, test:
```bash
curl -I https://videos.theonchainstudio.com/bitget-video.mp4
```

Should return `200` or `206`, NOT `525`.

**Once 525 is fixed, proceed to Step 2 for CORS.**

## ✅ Solution: Add CORS Headers via Cloudflare

### Option 1: Transform Rules (Recommended - Best Method)

1. Go to **Cloudflare Dashboard** → **Rules** → **Transform Rules** → **Modify Response Header**

2. Click **Create rule**

3. **Rule Name:** `Add CORS Headers for Videos`

4. **When incoming requests match:**
   - Field: `URI Path`
   - Operator: `matches regex`
   - Value: `\.(mp4|webm|mov|avi)$`

5. **Then modify response header:**
   - **Action:** Set static
   - **Header name:** `Access-Control-Allow-Origin`
   - **Value:** `https://www.theonchainstudio.com`
   
   **OR for multiple domains:**
   - **Value:** `*` (allows all domains - less secure but simpler)

6. **Add another header:**
   - **Action:** Set static
   - **Header name:** `Access-Control-Allow-Methods`
   - **Value:** `GET, HEAD, OPTIONS`

7. **Add another header:**
   - **Action:** Set static
   - **Header name:** `Access-Control-Allow-Headers`
   - **Value:** `Range, Content-Type`

8. Click **Deploy**

### Option 2: Page Rules (If Transform Rules Not Available)

1. Go to **Rules** → **Page Rules** → **Create Page Rule**

2. **URL Pattern:** `videos.theonchainstudio.com/*`

3. **Settings:**
   - **Cache Level:** Cache Everything
   - **Edge Cache TTL:** 1 month
   - **Browser Cache TTL:** Respect Existing Headers
   - **Add Custom Header:**
     - **Header name:** `Access-Control-Allow-Origin`
     - **Value:** `https://www.theonchainstudio.com`

**Note:** Page Rules have limited header support. Transform Rules are better for CORS.

### Option 3: Workers (Advanced - Most Flexible)

If you need more control, create a Cloudflare Worker:

1. Go to **Workers & Pages** → **Create application** → **Create Worker**

2. Paste this code:

```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Fetch the video from origin
  const response = await fetch(request)
  
  // Clone the response to modify headers
  const newResponse = new Response(response.body, response)
  
  // Add CORS headers
  newResponse.headers.set('Access-Control-Allow-Origin', 'https://www.theonchainstudio.com')
  newResponse.headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS')
  newResponse.headers.set('Access-Control-Allow-Headers', 'Range, Content-Type')
  newResponse.headers.set('Access-Control-Expose-Headers', 'Content-Range, Content-Length, Accept-Ranges')
  
  // Handle OPTIONS preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: newResponse.headers
    })
  }
  
  return newResponse
}
```

3. **Routes:**
   - Pattern: `videos.theonchainstudio.com/*`
   - Zone: `theonchainstudio.com`

## 🔧 Quick Fix: Update Your Code (Temporary Workaround)

If you can't configure Cloudflare immediately, you can proxy videos through your Next.js app:

### Create API Route: `app/api/video-proxy/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const videoPath = searchParams.get('path');
  
  if (!videoPath) {
    return NextResponse.json({ error: 'Video path required' }, { status: 400 });
  }
  
  const videoUrl = `https://videos.theonchainstudio.com/${videoPath}`;
  
  try {
    const response = await fetch(videoUrl, {
      headers: {
        'Range': request.headers.get('Range') || '',
      },
    });
    
    const videoData = await response.arrayBuffer();
    
    return new NextResponse(videoData, {
      status: response.status,
      headers: {
        'Content-Type': 'video/mp4',
        'Access-Control-Allow-Origin': '*',
        'Accept-Ranges': 'bytes',
        'Content-Range': response.headers.get('Content-Range') || '',
        'Content-Length': response.headers.get('Content-Length') || '',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch video' }, { status: 500 });
  }
}
```

Then update your video URLs to use the proxy:
```typescript
const videoUrl = `/api/video-proxy?path=${encodeURIComponent('bitget-video.mp4')}`;
```

**Note:** This adds an extra hop, so Cloudflare Transform Rules are better.

## 📝 Step-by-Step: Transform Rules (Recommended)

1. **Login to Cloudflare Dashboard**
2. **Select your domain:** `theonchainstudio.com`
3. **Go to:** Rules → Transform Rules → Modify Response Header
4. **Click:** Create rule
5. **Rule name:** `CORS for Videos`
6. **When:** 
   - Field: `URI Path`
   - Operator: `matches regex`
   - Value: `\.(mp4|webm|mov)$`
7. **Then:**
   - Action: `Set static`
   - Header: `Access-Control-Allow-Origin`
   - Value: `https://www.theonchainstudio.com`
8. **Add more headers:**
   - `Access-Control-Allow-Methods`: `GET, HEAD, OPTIONS`
   - `Access-Control-Allow-Headers`: `Range, Content-Type`
   - `Access-Control-Expose-Headers`: `Content-Range, Content-Length, Accept-Ranges`
9. **Deploy**

## ✅ Test After Fix

Run this in browser console:
```javascript
fetch('https://videos.theonchainstudio.com/bitget-video.mp4', {method: 'HEAD'})
  .then(r => {
    console.log('✅ CORS Header:', r.headers.get('Access-Control-Allow-Origin'));
    console.log('✅ Status:', r.status);
  });
```

Should show: `Access-Control-Allow-Origin: https://www.theonchainstudio.com`

## 🎯 Expected Result

After adding CORS headers:
- ✅ No more CORS errors
- ✅ Videos load from subdomain
- ✅ Range requests work
- ✅ Fast CDN caching still works

## 🔍 Troubleshooting

### Still Getting CORS Error?

1. **Check Transform Rule is Active:**
   - Go to Transform Rules
   - Verify rule shows "Active" status

2. **Clear Cloudflare Cache:**
   - Caching → Purge Cache → Purge Everything
   - Wait 2-3 minutes

3. **Verify Header Value:**
   - Make sure `Access-Control-Allow-Origin` matches your exact domain
   - Include `https://` and `www.` if that's your domain

4. **Check Browser Cache:**
   - Hard refresh: `Ctrl+Shift+R`
   - Or clear browser cache

### 525 Error?

The 525 error suggests SSL/connection issue. Check:
1. **DNS Settings:**
   - Ensure `videos.theonchainstudio.com` is proxied (orange cloud ☁️)
   - Verify DNS record exists

2. **SSL/TLS Settings:**
   - SSL/TLS → Overview
   - Set to "Full" or "Full (strict)"

3. **Origin Server:**
   - Ensure origin server is accessible
   - Check if it requires authentication

## 📚 Additional Resources

- Cloudflare Transform Rules: https://developers.cloudflare.com/rules/transform/
- CORS Guide: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
