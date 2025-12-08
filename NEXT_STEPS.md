# Next Steps - Cloudflare CDN Setup Checklist

## ✅ What's Already Done

- [x] Domain added to Cloudflare
- [x] Nameservers configured
- [x] Code optimizations added (`next.config.ts` with cache headers)
- [x] CDN preconnect hints added (`app/layout.tsx`)
- [x] Video subdomain proxy created (`videos.mydomain.com`)

## 🚀 Next Steps (In Order)

### Step 1: Deploy Your Code Changes

Your code is ready! Deploy to production:

```bash
# If using Vercel
git add .
git commit -m "Add Cloudflare CDN optimizations"
git push

# Or deploy directly via Vercel dashboard
```

**What gets deployed:**
- ✅ Updated `next.config.ts` with video caching headers
- ✅ Updated `app/layout.tsx` with CDN preconnect hints

### Step 2: Create Cloudflare Page Rule

Go to **Cloudflare Dashboard** → **Rules** → **Page Rules** → **Create Page Rule**

**Create this rule:**
- **URL Pattern:** `videos.mydomain.com/*`
- **Settings:**
  - Cache Level: **Cache Everything**
  - Edge Cache TTL: **1 month**
  - Browser Cache TTL: **Respect Existing Headers**

Click **Save and Deploy**

### Step 3: Configure Cloudflare Speed Settings

Go to **Speed** → **Optimization**:

- [ ] Enable **Auto Minify** (HTML, CSS, JavaScript)
- [ ] Enable **Brotli** compression
- [ ] Enable **HTTP/3 (with QUIC)** if available
- [ ] Enable **Early Hints**

### Step 4: Configure Caching Settings

Go to **Caching** → **Configuration**:

- [ ] Set **Caching Level** to **Standard** or **Aggressive**
- [ ] Set **Browser Cache TTL** to **Respect Existing Headers**
- [ ] Enable **Always Online**

### Step 5: Test Your Setup

#### Test 1: Check Video Headers

Open terminal and run:
```bash
curl -I https://videos.mydomain.com/your-video.mp4
```

**Look for:**
- ✅ `Cache-Control: public, max-age=31536000, immutable`
- ✅ `Accept-Ranges: bytes`
- ✅ `CF-Cache-Status: HIT` (after first request)

#### Test 2: Browser Test

1. Open your site in browser
2. Open **DevTools** → **Network** tab
3. Load a page with videos
4. Check video requests:
   - Status should be `200` or `206` (Partial Content)
   - Response headers should show `CF-Cache-Status: HIT` after first load
   - Videos should load faster on subsequent visits

#### Test 3: Cloudflare Analytics

Go to **Analytics** → **Performance**:
- Check cache hit ratio (should be >80% after some traffic)
- Monitor bandwidth savings
- Check response times

### Step 6: (Optional) Use Video Subdomain in Code

If you want to serve videos from `videos.mydomain.com` instead of your main domain:

1. **Update `app/page.tsx`:**

Find the `getBlobUrl` function and update it:

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

2. **Add to `.env.local`:**

```env
NEXT_PUBLIC_VIDEO_DOMAIN=videos.mydomain.com
```

3. **Deploy again**

**Note:** Only do this if you want to route videos through your subdomain. If videos are already loading fine from your main domain, you can skip this step.

### Step 7: Monitor Performance

After 24-48 hours:

1. **Check Cloudflare Analytics:**
   - Cache hit ratio should be >80%
   - Bandwidth savings should be significant
   - Response times should be lower

2. **Test Real User Experience:**
   - Use browser DevTools to check video load times
   - Test from different locations (use VPN if needed)
   - Check mobile performance

3. **Monitor Errors:**
   - Check Cloudflare dashboard for any errors
   - Monitor browser console for video loading issues

## 🎯 Expected Results

After completing these steps:

- ✅ Videos load 50-70% faster
- ✅ Cache hit ratio >80%
- ✅ 60-80% bandwidth savings
- ✅ Faster global performance
- ✅ Better mobile experience

## 🔍 Troubleshooting

### Videos Still Slow?

1. **Check Page Rule is Active:**
   - Go to Page Rules → Verify rule shows "Active"
   - Check rule order (more specific rules first)

2. **Purge Cache:**
   - Go to **Caching** → **Purge Cache** → **Purge Everything**
   - Wait 2-3 minutes and test again

3. **Verify Headers:**
   - Use `curl -I` to check response headers
   - Ensure `Accept-Ranges: bytes` is present

### Cache Not Working?

1. **Check DNS:**
   - Ensure domain shows orange cloud ☁️ (proxied)
   - Verify nameservers are correct

2. **Check Page Rule:**
   - Ensure URL pattern matches your video URLs exactly
   - Verify settings are correct

3. **Wait for Propagation:**
   - Changes can take 5-10 minutes to propagate
   - Clear browser cache and test again

## 📝 Quick Checklist

- [ ] Deploy code changes to production
- [ ] Create Page Rule: `videos.mydomain.com/*`
- [ ] Enable Speed optimizations (Brotli, HTTP/3, etc.)
- [ ] Configure caching settings
- [ ] Test video headers with `curl -I`
- [ ] Test in browser DevTools
- [ ] Monitor Cloudflare Analytics
- [ ] (Optional) Update code to use video subdomain

## 🎉 You're Done!

Once all steps are complete, your videos should be loading significantly faster through Cloudflare's global CDN network!

---

**Need Help?** Check the troubleshooting section or refer to `CLOUDFLARE_OPTIMIZATION.md` for detailed explanations.
