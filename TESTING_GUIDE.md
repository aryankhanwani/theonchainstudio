# Cloudflare CDN Testing Guide - Multiple Methods

## 🎯 Quick Test Methods (Choose What Works Best)

### Method 1: Browser DevTools (Recommended - No Tools Needed) ⭐

**Steps:**
1. Open your site: `https://yourdomain.com`
2. Press `F12` (or Right-click → Inspect)
3. Go to **Network** tab
4. **Uncheck** "Disable cache" (important!)
5. Reload page (`Ctrl+R`)
6. Find a video file (filter by "mp4")
7. Click on it → Check **Headers** tab

**What to Look For:**

✅ **Response Headers:**
```
CF-Cache-Status: HIT          ← Cache is working!
Cache-Control: public, max-age=31536000, immutable
Accept-Ranges: bytes          ← Range requests enabled
CF-RAY: xxxxx-XXX             ← Confirms Cloudflare
```

✅ **Status Code:**
- `200 OK` - Full video download
- `206 Partial Content` - Range requests working (better!)

✅ **Timing:**
- First load: `CF-Cache-Status: MISS` (slower)
- Reload: `CF-Cache-Status: HIT` (much faster!)

---

### Method 2: Online Header Checkers (No Installation)

#### Option A: HTTP Header Checker
- **URL:** https://www.whatsmyip.org/http-headers/
- **Steps:**
  1. Enter your video URL: `https://videos.mydomain.com/video.mp4`
  2. Click "Check Headers"
  3. Look for Cloudflare headers

#### Option B: WebPageTest
- **URL:** https://www.webpagetest.org/
- **Steps:**
  1. Enter your video URL
  2. Click "Test"
  3. Check "Response Headers" section
  4. Look for `CF-Cache-Status`

#### Option C: Redirect Checker
- **URL:** https://www.redirect-checker.org/
- Enter your video URL
- Check headers and redirects

---

### Method 3: Browser Console (JavaScript)

**Open Console (`F12` → Console tab) and run:**

```javascript
// Test video headers
fetch('https://videos.mydomain.com/your-video.mp4', {method: 'HEAD'})
  .then(response => {
    console.log('✅ Status:', response.status);
    console.log('✅ Cache Status:', response.headers.get('CF-Cache-Status'));
    console.log('✅ Cache-Control:', response.headers.get('Cache-Control'));
    console.log('✅ Accept-Ranges:', response.headers.get('Accept-Ranges'));
    console.log('✅ CF-Ray:', response.headers.get('CF-Ray'));
    
    // Show all headers
    console.log('\n📋 All Headers:');
    response.headers.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
  })
  .catch(error => console.error('❌ Error:', error));
```

**Expected Output:**
```
✅ Status: 200
✅ Cache Status: HIT (or MISS on first load)
✅ Cache-Control: public, max-age=31536000, immutable
✅ Accept-Ranges: bytes
✅ CF-Ray: xxxxx-XXX
```

---

### Method 4: Command Line (Multiple Options)

#### Windows PowerShell:
```powershell
# Simple check
Invoke-WebRequest -Uri "https://videos.mydomain.com/video.mp4" -Method Head

# Detailed headers
$response = Invoke-WebRequest -Uri "https://videos.mydomain.com/video.mp4" -Method Head
$response.Headers | Format-List
```

#### Git Bash / Terminal:
```bash
# Basic headers
curl -I https://videos.mydomain.com/video.mp4

# Verbose (shows more details)
curl -vI https://videos.mydomain.com/video.mp4

# Filter for specific headers
curl -I https://videos.mydomain.com/video.mp4 2>&1 | grep -i "cache\|cf-\|accept-ranges"
```

#### Windows CMD:
```cmd
curl -I https://videos.mydomain.com/video.mp4
```

---

### Method 5: Test Range Requests (Video Streaming)

Range requests are crucial for video performance. Test if they work:

**Browser Method:**
1. Open Network tab
2. Load video
3. Look for status `206 Partial Content` ✅
4. Check `Content-Range` header

**Online Tool:**
- Go to: https://reqbin.com/
- Method: `HEAD`
- URL: Your video URL
- Add Header: `Range: bytes=0-1023`
- Should return `206` status ✅

**JavaScript Test:**
```javascript
fetch('https://videos.mydomain.com/video.mp4', {
  headers: {'Range': 'bytes=0-1023'}
})
.then(r => {
  console.log('Status:', r.status); // Should be 206
  console.log('Content-Range:', r.headers.get('Content-Range'));
});
```

---

### Method 6: Speed Comparison Test

**Before/After Cache Test:**

1. **First Load (Cache MISS):**
   - Clear browser cache (`Ctrl+Shift+Delete`)
   - Open Network tab
   - Load page
   - Note video load time (e.g., 2.5 seconds)

2. **Second Load (Cache HIT):**
   - Reload page (`F5`) - DON'T clear cache
   - Check same video
   - Should load much faster (e.g., 0.3 seconds) ✅

**Compare:**
- First: `CF-Cache-Status: MISS` (slower)
- Second: `CF-Cache-Status: HIT` (faster!)

---

### Method 7: Cloudflare Dashboard

**Real-time Analytics:**
1. Go to Cloudflare Dashboard
2. **Analytics** → **Performance**
   - Check Cache Hit Ratio (should be >80%)
   - Monitor Bandwidth Savings
   - Check Response Times

3. **Analytics** → **Web Traffic**
   - See live requests
   - Check cache status per request

4. **Caching** → **Configuration**
   - Verify settings are correct

---

### Method 8: Mobile Testing

**Chrome DevTools Mobile Emulation:**
1. Press `F12`
2. Click device icon (`Ctrl+Shift+M`)
3. Select device (iPhone, Android)
4. Test video loading
5. Check Network tab

**Real Mobile Device:**
- Open site on phone
- Use browser developer tools
- Or remote debugging (Chrome: `chrome://inspect`)

---

### Method 9: Geographic Testing

**Test from Different Locations:**

**Online Tool:**
- https://www.geopeeker.com/
- Enter your video URL
- Test from multiple countries
- All should load fast (CDN advantage!)

**VPN Method:**
- Connect to VPN in different country
- Test video loading speed
- Should be fast from anywhere ✅

---

### Method 10: Video Playback Test

**Check Actual Playback:**
1. Open video in browser
2. Right-click video → **Inspect Element**
3. Check video element source
4. Verify video plays smoothly
5. Check for buffering

**Performance Metrics:**
- Open DevTools → **Performance** tab
- Record while loading video
- Check:
  - Load time
  - Network requests
  - Rendering performance

---

## ✅ Success Indicators

Your CDN is working correctly if you see:

✅ **Headers:**
- `CF-Cache-Status: HIT` (after first load)
- `CF-Ray: xxxxx-XXX` (Cloudflare is serving)
- `Accept-Ranges: bytes` (range requests enabled)
- `Cache-Control: public, max-age=31536000`

✅ **Performance:**
- Second load is 50-70% faster
- Status `206` for video requests (range requests)
- Low latency from anywhere in the world

✅ **Cloudflare Dashboard:**
- Cache hit ratio >80%
- Significant bandwidth savings
- Lower response times

---

## 🔍 Troubleshooting Tests

### Test Cache Purge:
```javascript
// In browser console
fetch('https://videos.mydomain.com/video.mp4', {method: 'HEAD'})
  .then(r => console.log('Cache:', r.headers.get('CF-Cache-Status')));
// Should show MISS after purge, HIT after reload
```

### Test Different Videos:
- Test multiple video files
- Check all return proper headers
- Verify all are cached

### Test Different Browsers:
- Chrome
- Firefox
- Safari
- Edge
- All should show Cloudflare headers

---

## 📊 Quick Test Checklist

- [ ] Browser DevTools shows `CF-Cache-Status: HIT`
- [ ] `Accept-Ranges: bytes` header present
- [ ] Second load is faster than first
- [ ] Status code `206` for video requests
- [ ] Cloudflare Analytics shows cache hits
- [ ] Videos load fast from different locations
- [ ] Mobile performance is good

---

**Tip:** Start with **Method 1 (Browser DevTools)** - it's the easiest and shows everything you need!
