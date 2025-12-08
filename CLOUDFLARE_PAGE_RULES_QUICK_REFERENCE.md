# Cloudflare Page Rules - Quick Reference (Video-Only Setup)

## ✅ Video-Only Rules (Recommended Setup)

Since images are loading fine, you only need rules for videos. Here are the options:

### Option 1: Using Video Subdomain (Best - Single Rule)

If you have `videos.mydomain.com` set up:

**Single Rule:**
```
videos.mydomain.com/*
```
- Caches everything on your video subdomain
- Settings:
  - Cache Level: **Cache Everything**
  - Edge Cache TTL: **1 month**
  - Browser Cache TTL: **Respect Existing Headers**

### Option 2: Main Domain Video Rules

If videos are on your main domain:

**Rule 1: MP4 Videos**
```
*yourdomain.com/*.mp4
```
- Cache Level: Cache Everything
- Edge Cache TTL: 1 month

**Rule 2: WebM Videos** (if you use WebM)
```
*yourdomain.com/*.webm
```
- Cache Level: Cache Everything
- Edge Cache TTL: 1 month

**Rule 3: Other Video Formats** (if needed)
```
*yourdomain.com/*.mov
```
- Cache Level: Cache Everything
- Edge Cache TTL: 1 month

## ❌ Incorrect Syntax (What Doesn't Work)

These patterns will cause "Target URL contains non-printable characters" error:

```
*yourdomain.com/*.{jpg,jpeg,png}  ❌
*yourdomain.com/*.(jpg|png)       ❌
*yourdomain.com/.*\.jpg$          ❌
```

## 📝 Recommended Video-Only Page Rules Setup

### ✅ Best Option: Using videos.mydomain.com (Single Rule)

Since you have `videos.mydomain.com` set up, this is the simplest:

**Rule 1: Video Subdomain - Cache Everything**
- Pattern: `videos.mydomain.com/*`
- Settings:
  - Cache Level: **Cache Everything**
  - Edge Cache TTL: **1 month** (or longer)
  - Browser Cache TTL: **Respect Existing Headers**

That's it! One rule handles all your videos.

### Alternative: Main Domain Video Rules

If videos are on your main domain instead:

**Rule 1: MP4 Videos**
- Pattern: `*yourdomain.com/*.mp4`
- Cache Level: Cache Everything
- Edge Cache TTL: 1 month

**Rule 2: WebM Videos** (if you use WebM)
- Pattern: `*yourdomain.com/*.webm`
- Cache Level: Cache Everything
- Edge Cache TTL: 1 month

## 🆕 Alternative: Transform Rules (Supports Regex)

If you have Transform Rules available (all Cloudflare plans), you can use regex for videos:

**Transform Rule: Cache All Videos**
- When: `http.request.uri.path matches "\.(mp4|webm|mov)$"`
- Then: Set cache level to Cache Everything

This is useful if videos are on your main domain and you want one rule instead of multiple.

## 💡 Tips

1. **Order Matters**: Page Rules are processed in order (top to bottom). Put more specific rules first.

2. **Limit**: Free plan allows 3 Page Rules, Pro allows 20, Business allows 50.

3. **Test**: After creating rules, test with:
   ```bash
   curl -I https://yourdomain.com/image.jpg
   ```
   Look for `CF-Cache-Status: HIT` after the first request.

4. **Purge Cache**: After creating/changing rules, purge cache:
   - Go to **Caching** → **Purge Cache** → **Purge Everything**
