import type { NextConfig } from "next";
const isExport = process.env.NEXT_OUTPUT === 'export';

// Root at cwd so nesting under a parent workspace doesn't misdetect the root.
const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  ...(isExport
    ? {
        output: 'export' as const,
        images: { unoptimized: true },
      }
    : {
        output: 'standalone' as const,
        images: {
          remotePatterns: [
            { protocol: 'https', hostname: 'images.unsplash.com' },
            { protocol: 'https', hostname: 'images.pexels.com' },
          ],
        },
      }),
  typescript: { ignoreBuildErrors: false },
};
export default nextConfig;