import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/, // Match SVG files
      use: ['@svgr/webpack'], // Use the SVGR loader
    });

    return config;
  },
  images: {
    domains: ["lh3.googleusercontent.com"], // ✅ add this
  },
  
};

export default nextConfig;
