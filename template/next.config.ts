import type { NextConfig } from "next";

const isExport = process.env.NEXT_OUTPUT === 'export';

const nextConfig: NextConfig = {
  ...(isExport
    ? {
        output: 'export' as const,
        images: { unoptimized: true },
      }
    : {
        output: 'standalone' as const,
      }),
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
