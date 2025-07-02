/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove problematic experimental settings
  experimental: {
    // serverComponentsExternalPackages: ["@prisma/client"], // Remove this line
  },

  // Keep webpack config simpler
  webpack: (config, { isServer, dev }) => {
    if (isServer && !dev) {
      // Only add externals in production server builds
      config.externals.push("@prisma/client");
    }
    return config;
  },

  // Remove build error ignoring - we want to see real issues
  eslint: {
    ignoreDuringBuilds: false, // Change to false
  },
  typescript: {
    ignoreBuildErrors: false, // Change to false
  },

  // Enable SWC minification
  swcMinify: true,

  // Remove problematic headers
  // Remove outputFileTracing: false - this can cause issues

  // Add proper image configuration
  images: {
    remotePatterns: [],
  },

  // Ensure proper static generation
  trailingSlash: false,

  // Add proper cache headers only for API routes
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
