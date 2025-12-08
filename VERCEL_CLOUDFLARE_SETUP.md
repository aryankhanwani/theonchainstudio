# Vercel + Cloudflare Setup for Videos

## 🎯 Your Setup

- **Videos are on Vercel** (Vercel Blob Storage or `/public` folder)
- **Domain:** `theonchainstudio.com` (main domain)
- **Video Subdomain:** `videos.theonchainstudio.com` (for CDN)

## ✅ Correct DNS Configuration for Vercel

### Option 1: Point Video Subdomain to Vercel (Recommended)

Since your videos are on Vercel, the `videos` subdomain should point to **Vercel**, not a separate server.

**In Cloudflare DNS:**

1. **Go to:** DNS → Records

2. **For `videos` subdomain, you have two options:**

   **Option A: CNAME to Vercel (If Vercel supports subdomains)**
   ```
   Type: CNAME
   Name: videos
   Target: cname.vercel-dns.com
   Proxy: ☁️ Proxied (orange cloud)
   ```

   **Option B: CNAME to Main Domain (Simpler)**
   ```
   Type: CNAME
   Name: videos
   Target: www.theonchainstudio.com
   Proxy: ☁️ Proxied (orange cloud)
   ```
   
   This makes `videos.theonchainstudio.com` serve the same content as your main domain, but you can still apply different Cloudflare rules.

### Option 2: Use Main Domain (No Subdomain Needed)

If videos are in your `/public` folder on Vercel, they're already accessible at:
- `https://www.theonchainstudio.com/bitget-video.mp4`

**You don't need a separate subdomain!** Just use your main domain and apply Cloudflare rules there.

---

## 🔧 Recommended Setup for Vercel

### Setup 1: Use Main Domain (Simplest)

**No DNS changes needed!**

1. **Videos are already at:** `https://www.theonchainstudio.com/bitget-video.mp4`
2. **Create Cloudflare Page Rule:**
   - Pattern: `www.theonchainstudio.com/*.mp4`
   - Cache Everything, Edge Cache TTL: 1 month

3. **Add CORS headers via Transform Rule:**
   - Pattern: `www.theonchainstudio.com` + URI Path matches `\.(mp4|webm)$`
   - Header: `Access-Control-Allow-Origin: *` (same origin, so CORS not needed, but good to have)

### Setup 2: Use Video Subdomain (If You Want Separation)

**If you want `videos.theonchainstudio.com` to work:**

1. **In Vercel Dashboard:**
   - Go to your project → Settings → Domains
   - Add domain: `videos.theonchainstudio.com`
   - Vercel will provide DNS instructions

2. **In Cloudflare DNS:**
   - Add CNAME record pointing to Vercel's provided target
   - Proxy: ☁️ Proxied

3. **In Cloudflare:**
   - Create Page Rule: `videos.theonchainstudio.com/*` → Cache Everything
   - Add CORS Transform Rule (if needed)

---

## 🚨 Fixing Your Current 525 Error

The 525 error happens because `videos.theonchainstudio.com` DNS record is pointing to the wrong place.

### Quick Fix:

**Option A: Point to Main Domain**
1. Go to Cloudflare → DNS → Records
2. Find `videos` record
3. Change target to: `www.theonchainstudio.com`
4. Keep Proxy: ☁️ Proxied
5. Wait 2-3 minutes

**Option B: Point to Vercel**
1. Check Vercel Dashboard → Settings → Domains
2. See what DNS records Vercel wants
3. Update Cloudflare DNS accordingly
4. Or add `videos.theonchainstudio.com` as a domain in Vercel

**Option C: Remove Subdomain, Use Main Domain**
1. Delete `videos` DNS record
2. Use `www.theonchainstudio.com` for all videos
3. Update your code to use main domain

---

## 💡 Best Practice for Vercel + Cloudflare

### Recommended: Use Main Domain

**Why:**
- ✅ Simpler setup (no subdomain needed)
- ✅ Videos already work: `www.theonchainstudio.com/video.mp4`
- ✅ Vercel handles SSL automatically
- ✅ Cloudflare can still cache and optimize

**Steps:**
1. **No DNS changes needed** - videos already accessible
2. **Create Cloudflare Page Rule:**
   ```
   Pattern: www.theonchainstudio.com/*.mp4
   Cache: Cache Everything
   Edge Cache TTL: 1 month
   ```
3. **Add Transform Rule for CORS (if needed):**
   ```
   When: www.theonchainstudio.com + URI Path matches \.(mp4|webm)$
   Header: Access-Control-Allow-Origin: *
   ```

### Alternative: Use Subdomain (If You Want Separation)

**Only if you specifically want `videos.theonchainstudio.com`:**

1. **Add domain in Vercel:**
   - Project → Settings → Domains
   - Add: `videos.theonchainstudio.com`
   - Follow Vercel's DNS instructions

2. **Update Cloudflare DNS:**
   - Point `videos` CNAME to Vercel's target
   - Proxy: ☁️ Proxied

3. **Configure Cloudflare:**
   - Page Rule for caching
   - Transform Rule for CORS

---

## 🔍 Check Your Current Setup

**To see where videos are actually served from:**

1. **Check your code:**
   - Look at `app/page.tsx` → `getBlobUrl()` function
   - What URL does it return?

2. **Check Vercel:**
   - Are videos in `/public` folder?
   - Or in Vercel Blob Storage?
   - What's the base URL?

3. **Test current URLs:**
   ```bash
   # Test main domain
   curl -I https://www.theonchainstudio.com/bitget-video.mp4
   
   # Test subdomain
   curl -I https://videos.theonchainstudio.com/bitget-video.mp4
   ```

---

## ✅ Quick Fix for Your Situation

**Since videos are on Vercel, here's the fastest fix:**

### Step 1: Fix DNS (Choose One)

**Option A: Point to Main Domain**
```
DNS Record:
Type: CNAME
Name: videos
Target: www.theonchainstudio.com
Proxy: ☁️ Proxied
```

**Option B: Remove Subdomain, Use Main Domain**
- Delete `videos` DNS record
- Update code to use `www.theonchainstudio.com` for videos

### Step 2: Add CORS Headers

1. **Go to:** Cloudflare → Rules → Transform Rules → Modify Response Header
2. **Create rule:**
   - When: URI Path matches `\.(mp4|webm|mov)$`
   - Header: `Access-Control-Allow-Origin: *`
   - Header: `Access-Control-Allow-Methods: GET, HEAD, OPTIONS`

### Step 3: Test

```javascript
// In browser console
fetch('https://www.theonchainstudio.com/bitget-video.mp4', {method: 'HEAD'})
  .then(r => console.log('Status:', r.status, 'CORS:', r.headers.get('Access-Control-Allow-Origin')));
```

---

## 📝 Summary

**For Vercel-hosted videos:**
- ✅ **Simplest:** Use main domain (`www.theonchainstudio.com`)
- ✅ **No separate DNS needed** for subdomain
- ✅ **Vercel handles SSL** automatically
- ✅ **Cloudflare can cache** via Page Rules
- ✅ **Add CORS** via Transform Rules if needed

**You probably don't need `videos.theonchainstudio.com` at all!** Just use your main domain and apply Cloudflare caching rules.
