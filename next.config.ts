import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'fvkusemfgfntpxebubku.supabase.co',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  
  // Compression
  compress: true,
  
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['framer-motion', 'lodash'],
    optimizeCss: true,
  },
  
  // Performance optimizations
  poweredByHeader: false,
  
  // Headers for caching and performance with Cloudflare CDN optimizations
  async headers() {
    return [
      {
        // Images - long cache with Cloudflare CDN
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Accept-Ranges',
            value: 'bytes',
          },
        ],
      },
      {
        // Videos - optimized for Cloudflare CDN with range request support
        source: '/:all*(mp4|webm|mov|avi)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Accept-Ranges',
            value: 'bytes',
          },
          {
            key: 'Content-Type',
            value: 'video/mp4',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Cloudflare CDN optimization headers
          {
            key: 'CF-Cache-Status',
            value: 'HIT',
          },
        ],
      },
      {
        // Fonts - optimize for Cloudflare
        source: '/:all*(woff|woff2|ttf|otf|eot)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
      {
        // CSS and JS - cache with Cloudflare
        source: '/:all*(css|js)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
