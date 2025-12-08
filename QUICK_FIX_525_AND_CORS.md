# Quick Fix: 525 Error + CORS Error

## 🚨 Fix These in Order

### ⚡ Step 1: Fix 525 Error (5 minutes)

**525 = Cloudflare can't reach your server**

**Since your videos are on Vercel:**

1. **Go to Cloudflare Dashboard** → **DNS** → **Records**

2. **Update `videos` record to point to Vercel:**
   ```
   Type: CNAME
   Name: videos
   Target: www.theonchainstudio.com  ← Point to your main domain (Vercel)
   Proxy: ☁️ Proxied (orange cloud)
   ```
   
   **OR if you want to skip subdomain entirely:**
   - Delete the `videos` DNS record
   - Use `www.theonchainstudio.com` for all videos (simpler!)

3. **Go to SSL/TLS** → **Overview**
   - Set to: **Full** or **Full (strict)**
   - Vercel handles SSL automatically, so "Full" should work

4. **Wait 2-3 minutes** for DNS to propagate

5. **Test:**
   ```bash
   curl -I https://videos.theonchainstudio.com/bitget-video.mp4
   ```
   Should return `200` or `206`, NOT `525`
   
   **OR test main domain:**
   ```bash
   curl -I https://www.theonchainstudio.com/bitget-video.mp4
   ```
   This should work immediately since videos are on Vercel!

---

### ⚡ Step 2: Add CORS Headers (5 minutes)

**Once 525 is fixed, add CORS:**

1. **Go to:** Rules → **Transform Rules** → **Modify Response Header**

2. **Click:** Create rule

3. **Rule name:** `CORS for Videos`

4. **When:**
   - Field: `URI Path`
   - Operator: `matches regex`
   - Value: `\.(mp4|webm|mov)$`

5. **Then add headers:**

   **Header 1:**
   - Action: `Set static`
   - Header: `Access-Control-Allow-Origin`
   - Value: `https://www.theonchainstudio.com`

   **Header 2:**
   - Action: `Set static`
   - Header: `Access-Control-Allow-Methods`
   - Value: `GET, HEAD, OPTIONS`

   **Header 3:**
   - Action: `Set static`
   - Header: `Access-Control-Allow-Headers`
   - Value: `Range, Content-Type`

6. **Click:** Deploy

7. **Clear cache:** Caching → Purge Cache → Purge Everything

---

### ✅ Test

**In browser console (`F12` → Console):**
```javascript
fetch('https://videos.theonchainstudio.com/bitget-video.mp4', {method: 'HEAD'})
  .then(r => {
    console.log('Status:', r.status); // Should be 200 or 206
    console.log('CORS:', r.headers.get('Access-Control-Allow-Origin')); // Should show your domain
  });
```

**Expected:**
- ✅ Status: `200` or `206`
- ✅ CORS header present
- ✅ No errors in console

---

## 🔍 Troubleshooting

### Still Getting 525?

**Since videos are on Vercel:**

1. **Check DNS:**
   - Is `videos` record proxied? (orange cloud ☁️)
   - Does it point to `www.theonchainstudio.com`? (should point to Vercel)

2. **Check SSL:**
   - SSL/TLS mode should be "Full" or "Full (strict)"
   - NOT "Flexible"
   - Vercel handles SSL, so "Full" works

3. **Simplest Fix - Use Main Domain:**
   - Delete `videos` DNS record
   - Use `www.theonchainstudio.com/bitget-video.mp4` directly
   - No subdomain needed! Videos already work on main domain

4. **Test main domain first:**
   ```bash
   curl -I https://www.theonchainstudio.com/bitget-video.mp4
   ```
   If this works, your videos are fine - just use main domain!

### Still Getting CORS Error?

1. **Check Transform Rule:**
   - Is it active?
   - Does regex match your video files?

2. **Clear cache:**
   - Cloudflare cache
   - Browser cache (`Ctrl+Shift+Delete`)

3. **Verify header value:**
   - Must match exact domain: `https://www.theonchainstudio.com`
   - Include `https://` and `www.`

---

## 📋 Checklist

- [ ] DNS record `videos` exists and is proxied
- [ ] SSL/TLS mode is "Full" or "Full (strict)"
- [ ] Test returns 200/206 (not 525)
- [ ] Transform Rule created for CORS
- [ ] CORS headers added
- [ ] Cache purged
- [ ] Test in browser console works

---

**Need help?** Check `FIX_CORS_ERROR.md` for detailed instructions.
