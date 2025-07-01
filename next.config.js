/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Disable ESLint during builds to avoid deployment issues
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript build errors
    ignoreBuildErrors: true,
  },
  experimental: {
    serverComponentsExternalPackages: ["prisma"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
