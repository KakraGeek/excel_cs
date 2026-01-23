/**
 * Next.js config (CommonJS).
 * Using CJS avoids the "exports is not defined" error from the TS config.
 * 
 * Performance optimizations:
 * - Image optimization with WebP and responsive sizes
 * - Compression enabled
 * - Bundle analyzer available via ANALYZE env var
 * 
 * Story: 7.3 - Performance Optimization
 */
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure Next.js uses the correct workspace root.
  // This fixes the warning about selecting the wrong root
  // when multiple lockfiles exist on the machine.
  turbopack: {
    root: __dirname,
  },
  
  // Image optimization configuration
  images: {
    // Enable image optimization (default: true)
    formats: ['image/avif', 'image/webp'],
    // Allow images from external domains (Unsplash, etc.)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.vercel.app',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
        pathname: '/**',
      },
    ],
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Image sizes for different breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Minimum cache time (in seconds)
    minimumCacheTTL: 60,
  },
  
  // Compression
  compress: true,
  
  // Experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
};

module.exports = nextConfig;
